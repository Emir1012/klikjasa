// Konfigurasi API global
const API_URL = "api.php";

const DataMasterModule = {
    // 1. DATA MASTER LOKAL (Sebagai fallback jika API backend bermasalah/offline)
    CITIES: [
        { id: 1, name: "Jakarta" },
        { id: 2, name: "Surabaya" },
        { id: 3, name: "Bandung" },
        { id: 4, name: "Medan" },
        { id: 5, name: "Semarang" },
        { id: 6, name: "Makassar" },
        { id: 7, name: "Palembang" },
        { id: 8, name: "Yogyakarta" },
        { id: 9, name: "Denpasar" }
    ],

    CATEGORIES: [
        { id: 1, name: "Jasa Kebersihan (Cleaning)" },
        { id: 2, name: "Jasa Antar/Jemput & Logistik" },
        { id: 3, name: "Jasa Servis & Perbaikan (Teknisi)" },
        { id: 4, name: "Jasa Konstruksi & Pertukangan" },
        { id: 5, name: "Jasa Kesehatan & Kecantikan" },
        { id: 6, name: "Jasa Edukasi & Les Privat" },
        { id: 7, name: "Jasa Kreatif & Desain Grafis" },
        { id: 8, name: "Jasa Event & Rumah Tangga" },
        { id: 9, name: "Jasa IT & Pemrograman" }
    ],

    // 2. INITIALIZATION FUNCTION
    init() {
        this.muatKotaDanKategori();
    },

    // 3. FUNGSI SINKRONISASI FRONTEND & BACKEND
    async muatKotaDanKategori() {
        let kotaData = this.CITIES;
        let kategoriData = this.CATEGORIES; // Menggunakan data lokal Multi Jasa sebagai default awal

        // Ambil Data Wilayah/Kota dari Backend API
        try {
            const res = await fetch(`${API_URL}?action=get_cities`);
            const resJson = await res.json();

            if (resJson.status === "success" && resJson.data.length > 0) {
                kotaData = resJson.data;
            }
        } catch (e) {
            console.warn("Gagal mengambil kota dari DB, menggunakan data lokal JS.", e);
        }

        // Ambil Data Kategori dari Backend API agar Sinkron dengan Database
        try {
            const resCat = await fetch(`${API_URL}?action=get_categories`);
            const resCatJson = await resCat.json();

            if (resCatJson.status === "success" && resCatJson.data.length > 0) {
                kategoriData = resCatJson.data;
            }
        } catch (e) {
            console.warn("Gagal mengambil kategori dari DB, menggunakan data lokal Multi Jasa JS.", e);
        }

        // Render Data ke Elemen Dropdown UI HTML
        const fCity = document.getElementById('filter-city');
        const fCat = document.getElementById('filter-category');
        const jCat = document.getElementById('job-category');
        const jCity = document.getElementById('job-city');

        // Suntik data Kota ke Dropdown HTML
        let cityHtml = '<option value="">Semua Kota/Kabupaten</option>';
        kotaData.forEach(c => cityHtml += `<option value="${c.name}">${c.name}</option>`);
        if (fCity) fCity.innerHTML = cityHtml;
        if (jCity) jCity.innerHTML = cityHtml;

        // Suntik data Kategori ke Dropdown HTML
        let catHtml = '<option value="">Semua Kategori</option>';
        kategoriData.forEach(cat => catHtml += `<option value="${cat.name}">${cat.name}</option>`);
        if (fCat) fCat.innerHTML = catHtml;
        if (jCat) jCat.innerHTML = catHtml;
    }
};

// Jalankan modul saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    DataMasterModule.init();
});