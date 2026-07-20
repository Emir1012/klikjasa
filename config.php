<?php
// config.php - File Koneksi Database KlikJasa menggunakan PDO
$host     = "localhost";
$username = "root"; 
$password = "";     
// REVISI: Diselaraskan dengan nama database di berkas SQL (jasa_platform)
$database = "jasa_platform"; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        // Konfigurasi default fetch mode menjadi objek asosiatif (array) sudah di-handle di sini
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    // Jika koneksi gagal, kirim respons JSON agar tidak merusak format API
    header("Content-Type: application/json");
    echo json_encode(["status" => "error", "message" => "Koneksi database gagal: " . $e->getMessage()]);
    exit;
}
?>