<?php
// api.php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'config.php';

// Atur default fetch mode ke ASSOC agar mempermudah pembacaan objek di JS
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'cek_sesi':
        if (isset($_SESSION['user'])) {
            echo json_encode(["status" => "success", "user" => $_SESSION['user']]);
        } else {
            echo json_encode(["status" => "error", "message" => "Belum login"]);
        }
        break;

    case 'register':
        $input = json_decode(file_get_contents('php://input'), true);
        if (empty($input['name']) || empty($input['email']) || empty($input['password'])) {
            echo json_encode(["status" => "error", "message" => "Data pendaftaran tidak lengkap"]);
            exit;
        }
        try {
            $hashedPassword = password_hash($input['password'], PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :pass)");
            $stmt->execute([
                ':name' => $input['name'],
                ':email' => $input['email'],
                ':pass' => $hashedPassword
            ]);
            echo json_encode(["status" => "success"]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => "Email sudah terdaftar atau terjadi kesalahan sistem."]);
        }
        break;

    case 'login':
        $input = json_decode(file_get_contents('php://input'), true);
        if (empty($input['email']) || empty($input['password'])) {
            echo json_encode(["status" => "error", "message" => "Email dan password wajib diisi"]);
            exit;
        }
        try {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
            $stmt->execute([':email' => $input['email']]);
            $user = $stmt->fetch();

            if ($user && password_verify($input['password'], $user['password'])) {
                unset($user['password']); // Hapus hash password demi keamanan data transfer
                
                // Tambahkan key is_verified secara dinamis di session agar selaras dengan app.js
                $user['is_verified'] = ($user['verification_status'] === 'approved');
                
                $_SESSION['user'] = $user;
                echo json_encode(["status" => "success", "user" => $user]);
            } else {
                echo json_encode(["status" => "error", "message" => "Email atau kata sandi Anda salah!"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'logout':
        session_destroy();
        echo json_encode(["status" => "success"]);
        break;

    case 'submit_kyc':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!isset($_SESSION['user'])) {
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit;
        }

        // OPTIMASI KEAMANAN: Melakukan sanitasi input dan pemotongan spasi kosong (trim)
        $nik     = isset($input['nik']) ? trim($input['nik']) : '';
        $address = isset($input['address']) ? trim(strip_tags($input['address'])) : '';
        $no_telp = isset($input['no_telp']) ? trim(strip_tags($input['no_telp'])) : '';

        // REVISI: Validasi kelengkapan berkas KYC termasuk nomor telepon
        if (empty($nik) || empty($address) || empty($no_telp) || strlen($nik) !== 16) {
            echo json_encode(["status" => "error", "message" => "Data KYC tidak lengkap, NIK harus 16 digit, dan Nomor Telepon wajib diisi."]);
            exit;
        }
        try {
            // REVISI: Ditambahkan update ke kolom no_telp database
            $stmt = $pdo->prepare("UPDATE users SET nik = :nik, address = :addr, no_telp = :telepon, verification_status = 'pending' WHERE id = :id");
            $stmt->execute([
                ':nik' => $nik,
                ':addr' => $address,
                ':telepon' => $no_telp,
                ':id' => $_SESSION['user']['id']
            ]);
            
            // Sinkronisasi session lokal di server
            $_SESSION['user']['verification_status'] = 'pending';
            $_SESSION['user']['is_verified'] = false;
            $_SESSION['user']['nik'] = $nik;
            $_SESSION['user']['address'] = $address;
            $_SESSION['user']['no_telp'] = $no_telp; // REVISI: Simpan ke session

            echo json_encode(["status" => "success"]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'get_jobs':
        try {
            // REVISI OPTIMASI: Menarik u.no_telp sebagai owner_phone agar bisa diarahkan langsung via WhatsApp oleh pekerja
            $stmt = $pdo->query("SELECT j.*, u.name as owner_name, u.no_telp as owner_phone FROM jobs j JOIN users u ON j.owner_id = u.id ORDER BY j.created_at DESC");
            echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'create_job':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!isset($_SESSION['user'])) {
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit;
        }
        try {
            $stmt = $pdo->prepare("INSERT INTO jobs (title, category, subcategory, city, article, gross_budget, net_budget, owner_id, status) VALUES (:title, :cat, :sub, :city, :art, :gross, :net, :owner_id, 'open')");
            $stmt->execute([
                ':title' => $input['title'],
                ':cat' => $input['category'],
                ':sub' => $input['subcategory'],
                ':city' => $input['city'],
                ':art' => $input['article'],
                ':gross' => $input['gross_budget'],
                ':net' => $input['net_budget'],
                ':owner_id' => $_SESSION['user']['id']
            ]);
            echo json_encode(["status" => "success"]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'take_job':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!isset($_SESSION['user'])) {
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit;
        }
        try {
            // Pessimistic Locking menggunakan FOR UPDATE untuk mencegah Race Condition
            $pdo->beginTransaction();
            $stmt = $pdo->prepare("SELECT status, owner_id FROM jobs WHERE id = :id FOR UPDATE");
            $stmt->execute([':id' => $input['job_id']]);
            $job = $stmt->fetch();

            if (!$job) {
                $pdo->rollBack();
                echo json_encode(["status" => "error", "message" => "Pekerjaan tidak ditemukan."]);
                exit;
            }

            if ($job['owner_id'] == $_SESSION['user']['id']) {
                $pdo->rollBack();
                echo json_encode(["status" => "error", "message" => "Anda tidak bisa mengambil pekerjaan yang Anda buat sendiri!"]);
                exit;
            }

            if ($job['status'] === 'open') {
                $update = $pdo->prepare("UPDATE jobs SET worker_id = :worker_id, status = 'ongoing' WHERE id = :id");
                $update->execute([':worker_id' => $_SESSION['user']['id'], ':id' => $input['job_id']]);
                $pdo->commit();
                echo json_encode(["status" => "success"]);
            } else {
                $pdo->rollBack();
                echo json_encode(["status" => "error", "message" => "Maaf, pekerjaan ini baru saja diambil orang lain!"]);
            }
        } catch (PDOException $e) {
            if ($pdo->inTransaction()) $pdo->rollBack();
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'complete_job':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!isset($_SESSION['user'])) {
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit;
        }
        try {
            $stmt = $pdo->prepare("UPDATE jobs SET status = 'completed' WHERE id = :id AND worker_id = :worker_id");
            $stmt->execute([
                ':id' => $input['job_id'],
                ':worker_id' => $_SESSION['user']['id']
            ]);
            
            if ($stmt->rowCount() > 0) {
                echo json_encode(["status" => "success"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Gagal mengubah status. Anda bukan pekerja tugas ini."]);
            }
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'submit_review':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!isset($_SESSION['user'])) {
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit;
        }
        try {
            $stmt = $pdo->prepare("INSERT INTO reviews (job_id, user_id, rating, comment) VALUES (:job_id, :user_id, :rating, :comment)");
            $stmt->execute([
                ':job_id' => $input['job_id'],
                ':user_id' => $_SESSION['user']['id'],
                ':rating' => $input['rating'],
                ':comment' => $input['comment']
            ]);
            echo json_encode(["status" => "success"]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => "Gagal mengirim ulasan atau Anda sudah mengulas tugas ini."]);
        }
        break;

    case 'get_cities':
        echo json_encode(["status" => "error", "message" => "Gunakan data internal JS"]);
        break;

    case 'get_categories':
        echo json_encode(["status" => "error", "message" => "Gunakan data internal JS"]);
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Aksi tidak valid"]);
        break;
}
?>