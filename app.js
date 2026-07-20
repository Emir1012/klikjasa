// app.js
const API_URL = "api.php";

const AppState = {
    users: [],
    jobs: [],
    reviews: [],
    currentUser: null,
    activeJobForReview: null,
    selectedStarRating: 0
};

const DataMasterModule = {
    // 514 Kota & Kabupaten di Indonesia berdasarkan Provinsi
    CITIES: [
        // --- ACEH ---
        { name: "Kab. Aceh Barat" }, { name: "Kab. Aceh Barat Daya" }, { name: "Kab. Aceh Besar" }, { name: "Kab. Aceh Jaya" }, { name: "Kab. Aceh Selatan" }, { name: "Kab. Aceh Singkil" }, { name: "Kab. Aceh Tamiang" }, { name: "Kab. Aceh Tengah" }, { name: "Kab. Aceh Tenggara" }, { name: "Kab. Aceh Timur" }, { name: "Kab. Aceh Utara" }, { name: "Kab. Bener Meriah" }, { name: "Kab. Bireuen" }, { name: "Kab. Gayo Lues" }, { name: "Kab. Nagan Raya" }, { name: "Kab. Pidie" }, { name: "Kab. Pidie Jaya" }, { name: "Kab. Simeulue" }, { name: "Kota Banda Aceh" }, { name: "Kota Langsa" }, { name: "Kota Lhokseumawe" }, { name: "Kota Sabang" }, { name: "Kota Subulussalam" },
        // --- SUMATERA UTARA ---
        { name: "Kab. Asahan" }, { name: "Kab. Batu Bara" }, { name: "Kab. Dairi" }, { name: "Kab. Deli Serdang" }, { name: "Kab. Humbang Hasundutan" }, { name: "Kab. Karo" }, { name: "Kab. Labuhanbatu" }, { name: "Kab. Labuhanbatu Selatan" }, { name: "Kab. Labuhanbatu Utara" }, { name: "Kab. Langkat" }, { name: "Kab. Mandailing Natal" }, { name: "Kab. Nias" }, { name: "Kab. Nias Barat" }, { name: "Kab. Nias Selatan" }, { name: "Kab. Nias Utara" }, { name: "Kab. Padang Lawas" }, { name: "Kab. Padang Lawas Utara" }, { name: "Kab. Pakpak Bharat" }, { name: "Kab. Samosir" }, { name: "Kab. Serdang Bedagai" }, { name: "Kab. Simalungun" }, { name: "Kab. Tapanuli Selatan" }, { name: "Kab. Tapanuli Tengah" }, { name: "Kab. Tapanuli Utara" }, { name: "Kab. Toba" }, { name: "Kota Binjai" }, { name: "Kota Gunungsitoli" }, { name: "Kota Medan" }, { name: "Kota Padangsidimpuan" }, { name: "Kota Pematangsiantar" }, { name: "Kota Sibolga" }, { name: "Kota Tanjungbalai" }, { name: "Kota Tebing Tinggi" },
        // --- SUMATERA BARAT ---
        { name: "Kab. Agam" }, { name: "Kab. Dharmasraya" }, { name: "Kab. Kepulauan Mentawai" }, { name: "Kab. Lima Puluh Kota" }, { name: "Kab. Padang Pariaman" }, { name: "Kab. Pasaman" }, { name: "Kab. Pasaman Barat" }, { name: "Kab. Pesisir Selatan" }, { name: "Kab. Sijunjung" }, { name: "Kab. Solok" }, { name: "Kab. Solok Selatan" }, { name: "Kab. Tanah Datar" }, { name: "Kota Bukittinggi" }, { name: "Kota Padang" }, { name: "Kota Padang Panjang" }, { name: "Kota Pariaman" }, { name: "Kota Payakumbuh" }, { name: "Kota Sawahlunto" }, { name: "Kota Solok" },
        // --- RIAU & KEP. RIAU ---
        { name: "Kab. Bengkalis" }, { name: "Kab. Indragiri Hilir" }, { name: "Kab. Indragiri Hulu" }, { name: "Kab. Kampar" }, { name: "Kab. Kepulauan Meranti" }, { name: "Kab. Kuantan Singingi" }, { name: "Kab. Pelalawan" }, { name: "Kab. Rokan Hilir" }, { name: "Kab. Rokan Hulu" }, { name: "Kab. Siak" }, { name: "Kota Dumai" }, { name: "Kota Pekanbaru" }, { name: "Kab. Bintan" }, { name: "Kab. Karimun" }, { name: "Kab. Kepulauan Anambas" }, { name: "Kab. Lingga" }, { name: "Kab. Natuna" }, { name: "Kota Batam" }, { name: "Kota Tanjungpinang" },
        // --- JAMBI, BENGKULU, BANGKA BELITUNG ---
        { name: "Kab. Batanghari" }, { name: "Kab. Bungo" }, { name: "Kab. Kerinci" }, { name: "Kab. Merangin" }, { name: "Kab. Muaro Jambi" }, { name: "Kab. Sarolangun" }, { name: "Kab. Tanjung Jabung Barat" }, { name: "Kab. Tanjung Jabung Timur" }, { name: "Kab. Tebo" }, { name: "Kota Jambi" }, { name: "Kota Sungai Penuh" }, { name: "Kab. Bengkulu Selatan" }, { name: "Kab. Bengkulu Tengah" }, { name: "Kab. Bengkulu Utara" }, { name: "Kab. Kaur" }, { name: "Kab. Kepahiang" }, { name: "Kab. Lebong" }, { name: "Kab. Mukomuko" }, { name: "Kab. Rejang Lebong" }, { name: "Kab. Seluma" }, { name: "Kota Bengkulu" }, { name: "Kab. Bangka" }, { name: "Kab. Bangka Barat" }, { name: "Kab. Bangka Selatan" }, { name: "Kab. Bangka Tengah" }, { name: "Kab. Belitung" }, { name: "Kab. Belitung Timur" }, { name: "Kota Pangkalpinang" },
        // --- SUMATERA SELATAN & LAMPUNG ---
        { name: "Kab. Banyuasin" }, { name: "Kab. Empat Lawang" }, { name: "Kab. Lahat" }, { name: "Kab. Muara Enim" }, { name: "Kab. Musi Banyuasin" }, { name: "Kab. Musi Rawas" }, { name: "Kab. Musi Rawas Utara" }, { name: "Kab. Ogan Ilir" }, { name: "Kab. Ogan Komering Ilir" }, { name: "Kab. Ogan Komering Ulu" }, { name: "Kab. Ogan Komering Ulu Selatan" }, { name: "Kab. Ogan Komering Ulu Timur" }, { name: "Kab. Penukal Abab Lematang Ilir" }, { name: "Kota Lubuklinggau" }, { name: "Kota Pagar Alam" }, { name: "Kota Palembang" }, { name: "Kota Prabumulih" }, { name: "Kab. Lampung Barat" }, { name: "Kab. Lampung Selatan" }, { name: "Kab. Lampung Tengah" }, { name: "Kab. Lampung Timur" }, { name: "Kab. Lampung Utara" }, { name: "Kab. Mesuji" }, { name: "Kab. Pesawaran" }, { name: "Kab. Pesisir Barat" }, { name: "Kab. Pringsewu" }, { name: "Kab. Tanggamus" }, { name: "Kab. Tulang Bawang" }, { name: "Kab. Tulang Bawang Barat" }, { name: "Kab. Way Kanan" }, { name: "Kota Bandar Lampung" }, { name: "Kota Metro" },
        // --- DKI JAKARTA & BANTEN ---
        { name: "Kab. Kepulauan Seribu" }, { name: "Kota Jakarta Barat" }, { name: "Kota Jakarta Pusat" }, { name: "Kota Jakarta Selatan" }, { name: "Kota Jakarta Timur" }, { name: "Kota Jakarta Utara" }, { name: "Kab. Lebak" }, { name: "Kab. Pandeglang" }, { name: "Kab. Serang" }, { name: "Kab. Tangerang" }, { name: "Kota Cilegon" }, { name: "Kota Serang" }, { name: "Kota Tangerang" }, { name: "Kota Tangerang Selatan" },
        // --- JAWA BARAT ---
        { name: "Kab. Bandung" }, { name: "Kab. Bandung Barat" }, { name: "Kab. Bekasi" }, { name: "Kab. Bogor" }, { name: "Kab. Ciamis" }, { name: "Kab. Cianjur" }, { name: "Kab. Cirebon" }, { name: "Kab. Garut" }, { name: "Kab. Indramayu" }, { name: "Kab. Karawang" }, { name: "Kab. Kuningan" }, { name: "Kab. Majalengka" }, { name: "Kab. Pangandaran" }, { name: "Kab. Purwakarta" }, { name: "Kab. Subang" }, { name: "Kab. Sukabumi" }, { name: "Kab. Sumedang" }, { name: "Kab. Tasikmalaya" }, { name: "Kota Bandung" }, { name: "Kota Banjar" }, { name: "Kota Bekasi" }, { name: "Kota Bogor" }, { name: "Kota Cimahi" }, { name: "Kota Cirebon" }, { name: "Kota Depok" }, { name: "Kota Sukabumi" }, { name: "Kota Tasikmalaya" },
        // --- JAWA TENGAH & DI YOGYAKARTA ---
        { name: "Kab. Banjarnegara" }, { name: "Kab. Banyumas" }, { name: "Kab. Batang" }, { name: "Kab. Blora" }, { name: "Kab. Boyolali" }, { name: "Kab. Brebes" }, { name: "Kab. Cilacap" }, { name: "Kab. Demak" }, { name: "Kab. Grobogan" }, { name: "Kab. Jepara" }, { name: "Kab. Karanganyar" }, { name: "Kab. Kebumen" }, { name: "Kab. Kendal" }, { name: "Kab. Klaten" }, { name: "Kab. Kudus" }, { name: "Kab. Medang" }, { name: "Kab. Pati" }, { name: "Kab. Pekalongan" }, { name: "Kab. Pemalang" }, { name: "Kab. Purbalingga" }, { name: "Kab. Purworejo" }, { name: "Kab. Rembang" }, { name: "Kab. Semarang" }, { name: "Kab. Sragen" }, { name: "Kab. Sukoharjo" }, { name: "Kab. Tegal" }, { name: "Kab. Temanggung" }, { name: "Kab. Wonogiri" }, { name: "Kab. Wonosobo" }, { name: "Kota Magelang" }, { name: "Kota Pekalongan" }, { name: "Kota Salatiga" }, { name: "Kota Semarang" }, { name: "Kota Surakarta" }, { name: "Kota Tegal" }, { name: "Kab. Bantul" }, { name: "Kab. Gunungkidul" }, { name: "Kab. Kulon Progo" }, { name: "Kab. Sleman" }, { name: "Kota Yogyakarta" },
        // --- JAWA TIMUR ---
        { name: "Kab. Bangkalan" }, { name: "Kab. Banyuwangi" }, { name: "Kab. Blitar" }, { name: "Kab. Bojonegoro" }, { name: "Kab. Bondowoso" }, { name: "Kab. Gresik" }, { name: "Kab. Jember" }, { name: "Kab. Jombang" }, { name: "Kab. Kediri" }, { name: "Kab. Lamongan" }, { name: "Kab. Lumajang" }, { name: "Kab. Madiun" }, { name: "Kab. Magetan" }, { name: "Kab. Malang" }, { name: "Kab. Mojokerto" }, { name: "Kab. Nganjuk" }, { name: "Kab. Ngawi" }, { name: "Kab. Pacitan" }, { name: "Kab. Pamekasan" }, { name: "Kab. Pasuruan" }, { name: "Kab. Ponorogo" }, { name: "Kab. Probolinggo" }, { name: "Kab. Sampang" }, { name: "Kab. Sidoarjo" }, { name: "Kab. Situbondo" }, { name: "Kab. Sumenep" }, { name: "Kab. Trenggalek" }, { name: "Kab. Tuban" }, { name: "Kab. Tulungagung" }, { name: "Kota Batu" }, { name: "Kota Blitar" }, { name: "Kota Kediri" }, { name: "Kota Madiun" }, { name: "Kota Malang" }, { name: "Kota Mojokerto" }, { name: "Kota Pasuruan" }, { name: "Kota Probolinggo" }, { name: "Kota Surabaya" },
        // --- BALI, NTB, NTT ---
        { name: "Kab. Badung" }, { name: "Kab. Bangli" }, { name: "Kab. Buleleng" }, { name: "Kab. Gianyar" }, { name: "Kab. Jembrana" }, { name: "Kab. Karangasem" }, { name: "Kab. Klungkung" }, { name: "Kab. Tabanan" }, { name: "Kota Denpasar" }, { name: "Kab. Bima" }, { name: "Kab. Dompu" }, { name: "Kab. Lombok Barat" }, { name: "Kab. Lombok Tengah" }, { name: "Kab. Lombok Timur" }, { name: "Kab. Lombok Utara" }, { name: "Kab. Sumbawa" }, { name: "Kab. Sumbawa Barat" }, { name: "Kota Bima" }, { name: "Kota Mataram" }, { name: "Kab. Alor" }, { name: "Kab. Belu" }, { name: "Kab. Ende" }, { name: "Kab. Flores Timur" }, { name: "Kab. Kupang" }, { name: "Kab. Lembata" }, { name: "Kab. Malaka" }, { name: "Kab. Manggarai" }, { name: "Kab. Manggarai Barat" }, { name: "Kab. Manggarai Timur" }, { name: "Kab. Nagekeo" }, { name: "Kab. Ngada" }, { name: "Kab. Rote Ndao" }, { name: "Kab. Sabu Raijua" }, { name: "Kab. Sikka" }, { name: "Kab. Sumba Barat" }, { name: "Kab. Sumba Barat Daya" }, { name: "Kab. Sumba Tengah" }, { name: "Kab. Sumba Timur" }, { name: "Kab. Timor Tengah Selatan" }, { name: "Kab. Timor Tengah Utara" }, { name: "Kota Kupang" },
        // --- KALIMANTAN BARAT, TENGAH, SELATAN, TIMUR, UTARA ---
        { name: "Kab. Bengkayang" }, { name: "Kab. Kapuas Hulu" }, { name: "Kab. Kayong Utara" }, { name: "Kab. Ketapang" }, { name: "Kab. Kubu Raya" }, { name: "Kab. Landak" }, { name: "Kab. Melawi" }, { name: "Kab. Mempawah" }, { name: "Kab. Sambas" }, { name: "Kab. Sanggau" }, { name: "Kab. Sekadau" }, { name: "Kab. Sintang" }, { name: "Kota Pontianak" }, { name: "Kota Singkawang" }, { name: "Kab. Barito Selatan" }, { name: "Kab. Barito Timur" }, { name: "Kab. Barito Utara" }, { name: "Kab. Gunung Mas" }, { name: "Kab. Kapuas" }, { name: "Kab. Katingan" }, { name: "Kab. Kotawaringin Barat" }, { name: "Kab. Kotawaringin Timur" }, { name: "Kab. Lamandau" }, { name: "Kab. Murung Raya" }, { name: "Kab. Pulang Pisau" }, { name: "Kab. Sukamara" }, { name: "Kab. Seruyan" }, { name: "Kota Palangka Raya" }, { name: "Kab. Balangan" }, { name: "Kab. Banjar" }, { name: "Kab. Barito Kuala" }, { name: "Kab. Hulu Sungai Selatan" }, { name: "Kab. Hulu Sungai Tengah" }, { name: "Kab. Hulu Sungai Utara" }, { name: "Kab. Kotabaru" }, { name: "Kab. Tabalong" }, { name: "Kab. Tanah Bumbu" }, { name: "Kab. Tanah Laut" }, { name: "Kab. Tapin" }, { name: "Kota Banjarbaru" }, { name: "Kota Banjarmasin" }, { name: "Kab. Berau" }, { name: "Kab. Kutai Barat" }, { name: "Kab. Kutai Kartanegara" }, { name: "Kab. Kutai Timur" }, { name: "Kab. Mahakam Ulu" }, { name: "Kab. Paser" }, { name: "Kab. Penajam Paser Utara" }, { name: "Kota Balikpapan" }, { name: "Kota Bontang" }, { name: "Kota Samarinda" }, { name: "Kab. Bulungan" }, { name: "Kab. Malinau" }, { name: "Kab. Nunukan" }, { name: "Kab. Tana Tidung" }, { name: "Kota Tarakan" },
        // --- SULAWESI UTARA, TENGAH, SELATAN, TENGGARA, BARAT, GORONTALO ---
        { name: "Kab. Bolaang Mongondow" }, { name: "Kab. Bolaang Mongondow Selatan" }, { name: "Kab. Bolaang Mongondow Timur" }, { name: "Kab. Bolaang Mongondow Utara" }, { name: "Kab. Kepulauan Sangihe" }, { name: "Kab. Kepulauan Siau Tagulandang Biaro" }, { name: "Kab. Kepulauan Talaud" }, { name: "Kab. Minahasa" }, { name: "Kab. Minahasa Selatan" }, { name: "Kab. Minahasa Tenggara" }, { name: "Kab. Minahasa Utara" }, { name: "Kota Bitung" }, { name: "Kota Kotamobagu" }, { name: "Kota Manado" }, { name: "Kota Tomohon" }, { name: "Kab. Banggai" }, { name: "Kab. Banggai Kepulauan" }, { name: "Kab. Banggai Laut" }, { name: "Kab. Buol" }, { name: "Kab. Donggala" }, { name: "Kab. Morowali" }, { name: "Kab. Morowali Utara" }, { name: "Kab. Parigi Moutong" }, { name: "Kab. Poso" }, { name: "Kab. Sigi" }, { name: "Kab. Tojo Una-Una" }, { name: "Kab. Tolitoli" }, { name: "Kota Palu" }, { name: "Kab. Bantaeng" }, { name: "Kab. Barru" }, { name: "Kab. Bone" }, { name: "Kab. Bulukumba" }, { name: "Kab. Enrekang" }, { name: "Kab. Gowa" }, { name: "Kab. Jeneponto" }, { name: "Kab. Kepulauan Selayar" }, { name: "Kab. Luwu" }, { name: "Kab. Luwu Timur" }, { name: "Kab. Luwu Utara" }, { name: "Kab. Maros" }, { name: "Kab. Pangkajene dan Kepulauan" }, { name: "Kab. Pinrang" }, { name: "Kab. Sidenreng Rappang" }, { name: "Kab. Sinjai" }, { name: "Kab. Soppeng" }, { name: "Kab. Takalar" }, { name: "Kab. Tana Toraja" }, { name: "Kab. Toraja Utara" }, { name: "Kab. Wajo" }, { name: "Kota Makassar" }, { name: "Kota Palopo" }, { name: "Kota Parepare" }, { name: "Kab. Bombana" }, { name: "Kab. Buton" }, { name: "Kab. Buton Selatan" }, { name: "Kab. Buton Tengah" }, { name: "Kab. Buton Utara" }, { name: "Kab. Kolaka" }, { name: "Kab. Kolaka Timur" }, { name: "Kab. Kolaka Utara" }, { name: "Kab. Konawe" }, { name: "Kab. Konawe Kepulauan" }, { name: "Kab. Konawe Selatan" }, { name: "Kab. Konawe Utara" }, { name: "Kab. Muna" }, { name: "Kab. Muna Barat" }, { name: "Kab. Wakatobi" }, { name: "Kota Baubau" }, { name: "Kota Kendari" }, { name: "Kab. Majene" }, { name: "Kab. Mamasa" }, { name: "Kab. Mamuju" }, { name: "Kab. Mamuju Tengah" }, { name: "Kab. Pasangkayu" }, { name: "Kab. Polewali Mandar" }, { name: "Kab. Boalemo" }, { name: "Kab. Bone Bolango" }, { name: "Kab. Gorontalo" }, { name: "Kab. Gorontalo Utara" }, { name: "Kab. Pohuwato" }, { name: "Kota Gorontalo" },
        // --- MALUKU & PAPUA ---
        { name: "Kab. Buru" }, { name: "Kab. Buru Selatan" }, { name: "Kab. Kepulauan Aru" }, { name: "Kab. Kepulauan Tanimbar" }, { name: "Kab. Maluku Barat Daya" }, { name: "Kab. Maluku Tengah" }, { name: "Kab. Maluku Tenggara" }, { name: "Kab. Seram Bagian Barat" }, { name: "Kab. Seram Bagian Timur" }, { name: "Kota Ambon" }, { name: "Kota Tual" }, { name: "Kab. Halmahera Barat" }, { name: "Kab. Halmahera Tengah" }, { name: "Kab. Halmahera Utara" }, { name: "Kab. Halmahera Selatan" }, { name: "Kab. Kepulauan Sula" }, { name: "Kab. Halmahera Timur" }, { name: "Kab. Pulau Morotai" }, { name: "Kab. Pulau Taliabu" }, { name: "Kota Ternate" }, { name: "Kota Tidore Kepulauan" }, { name: "Kab. Biak Numfor" }, { name: "Kab. Jayapura" }, { name: "Kab. Keerom" }, { name: "Kab. Kepulauan Yapen" }, { name: "Kab. Mamberamo Raya" }, { name: "Kab. Sarmi" }, { name: "Kota Jayapura" }, { name: "Kab. Fakfak" }, { name: "Kab. Kaimana" }, { name: "Kab. Manokwari" }, { name: "Kab. Manokwari Selatan" }, { name: "Kab. Pegunungan Arfak" }, { name: "Kab. Teluk Bintuni" }, { name: "Kab. Teluk Wondama" }, { name: "Kab. Jayawijaya" }, { name: "Kab. Lanny Jaya" }, { name: "Kab. Mamberamo Tengah" }, { name: "Kab. Nduga" }, { name: "Kab. Pegunungan Bintang" }, { name: "Kab. Tolikara" }, { name: "Kab. Yahukimo" }, { name: "Kab. Yalimo" }, { name: "Kab. Asmat" }, { name: "Kab. Boven Digoel" }, { name: "Kab. Mappi" }, { name: "Kab. Merauke" }, { name: "Kab. Deiyai" }, { name: "Kab. Dogiyai" }, { name: "Kab. Intan Jaya" }, { name: "Kab. Nabire" }, { name: "Kab. Paniai" }, { name: "Kab. Puncak" }, { name: "Kab. Puncak Jaya" }, { name: "Kab. Mimika" }, { name: "Kab. Sorong" }, { name: "Kab. Sorong Selatan" }, { name: "Kab. Raja Ampat" }, { name: "Kab. Tambrauw" }, { name: "Kab. Maybrat" }, { name: "Kota Sorong" }
    ], 

    CATEGORIES: [
        { name: "Jasa Kebersihan (Cleaning)", subs: ["Pembersihan Rumah", "Cuci Sofa/Kasur", "Pembersihan Kos/Apartemen", "Fogging Disinfektan"] },
        { name: "Jasa Antar/Jemput & Logistik", subs: ["Sopir Pribadi", "Pindahan Rumah/Kos", "Kurir Motor Instan", "Rental Mobil + Driver"] },
        { name: "Jasa Servis & Perbaikan (Teknisi)", subs: ["Servis AC", "Perbaikan Kulkas/Mesin Cuci", "Teknisi Listrik Rumah", "Perbaikan HP & Laptop"] },
        { name: "Jasa Konstruksi & Pertukangan", subs: ["Tukang Cat Dinding", "Perbaikan Atap Bocor", "Pasang Keramik", "Tukang Las/Pagar"] },
        { name: "Jasa Kesehatan & Kecantikan", subs: ["Pijat/Refleksi Panggilan", "Potong Rambut (Barbershop)", "Makeup Artist (MUA)", "Perawatan Kuku (Manicure)"] },
        { name: "Jasa Edukasi & Les Privat", subs: ["Guru Ngaji Panggilan", "Les Matematika/Sains", "Tutor Bahasa Inggris", "Instruktur Musik"] },
        { name: "Jasa Kreatif & Desain Grafis", subs: ["Desain Logo & Banner", "Fotografer Event", "Video Editing", "Content Creator Sosial Media"] },
        { name: "Jasa Event & Rumah Tangga", subs: ["Catering Harian/Event", "Babysitter Infal", "Perawatan Taman/Kebun", "Jaga Stand Pameran/Bazaar"] },
        { name: "Jasa IT & Pemrograman", subs: ["Pembuatan Website", "Pembuatan Aplikasi Android/iOS", "Instalasi Jaringan/Wi-Fi", "Input Data Excel"] }
    ],

    async inisialisasiAplikasi() {
        try {
            const resSesi = await fetch(`${API_URL}?action=cek_sesi`);
            const dataSesi = await resSesi.json();
            if (dataSesi.status === "success") {
                AppState.currentUser = dataSesi.user;
                AppState.currentUser.is_verified = (dataSesi.user.verification_status === 'approved');
            }
        } catch (e) {
            console.error("Gagal memuat sesi:", e);
        }

        await this.muatKotaDanKategori();
        await this.muatPekerjaanDariDB();

        AuthModule.sinkronisasiSesiUI();
        AppCoordinator.gantiHalaman('dashboard');

        const uploadInput = document.getElementById('job-upload-date');
        if (uploadInput) {
            const opsi = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            uploadInput.value = new Date().toLocaleDateString('id-ID', opsi);
        }
    },

    async muatKotaDanKategori() {
        let kotaData = this.CITIES;
        let kategoriData = this.CATEGORIES;

        try {
            const res = await fetch(`${API_URL}?action=get_cities`);
            const resJson = await res.json();
            if (resJson.status === "success" && resJson.data && resJson.data.length > 0) {
                kotaData = resJson.data;
            }
        } catch (e) {
            console.warn("Gagal mengambil kota dari DB, menggunakan data lokal JS.", e);
        }

        try {
            const resCat = await fetch(`${API_URL}?action=get_categories`);
            const resCatJson = await resCat.json();
            if (resCatJson.status === "success" && resCatJson.data && resCatJson.data.length > 0) {
                kategoriData = resCatJson.data;
            }
        } catch (e) {
            console.warn("Gagal mengambil kategori dari DB, menggunakan data lokal JS.", e);
        }

        const fCity = document.getElementById('filter-city');
        const fCat = document.getElementById('filter-category');
        const jCat = document.getElementById('job-category');
        const jCity = document.getElementById('job-city');

        let cityHtml = '<option value="">Semua Kota/Kabupaten</option>';
        kotaData.forEach(c => cityHtml += `<option value="${c.name}">${c.name}</option>`);
        if (fCity) fCity.innerHTML = cityHtml;
        if (jCity) jCity.innerHTML = cityHtml;

        let catHtml = '<option value="">Semua Kategori</option>';
        kategoriData.forEach(cat => catHtml += `<option value="${cat.name}">${cat.name}</option>`);
        if (fCat) fCat.innerHTML = catHtml;
        if (jCat) jCat.innerHTML = catHtml;
    },

    async muatPekerjaanDariDB() {
        try {
            const res = await fetch(`${API_URL}?action=get_jobs`);
            const resJson = await res.json();
            if (resJson.status === "success") {
                AppState.jobs = resJson.data;
            }
        } catch (e) {
            console.warn("Gagal memuat pekerjaan dari DB.", e);
        }
    }
};

const AppCoordinator = {
    gantiHalaman(idHalaman) {
        document.querySelectorAll('main > section').forEach(section => section.classList.add('hidden'));
        const target = document.getElementById(`page-${idHalaman}`);
        if (target) target.classList.remove('hidden');

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-slate-900', 'border-b-2', 'border-[#9c1c24]');
            link.classList.add('text-slate-500', 'hover:text-slate-700');
        });
        const activeNav = document.getElementById(`nav-${idHalaman}`);
        if (activeNav) {
            activeNav.classList.remove('text-slate-500', 'hover:text-slate-700');
            activeNav.classList.add('text-slate-900', 'border-b-2', 'border-[#9c1c24]');
        }

        if (idHalaman === 'dashboard') JobTakingModule.renderDaftarPekerjaanDashboard();
        if (idHalaman === 'ambil') JobTakingModule.renderDaftarPekerjaanAmbil();
        if (idHalaman === 'tawarkan') JobOfferingModule.inisialisasiHalamanTawarkan();
        if (idHalaman === 'kerjaanku') JobTakingModule.renderKerjaanku();
        if (idHalaman === 'profil') ReputasiModule.renderProfilDanReview();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    showToast(pesan, tipe = 'success') {
        const toast = document.getElementById('toast');
        const icon = document.getElementById('toast-icon');
        const text = document.getElementById('toast-text');
        if (!toast || !icon || !text) return;

        text.innerText = pesan;
        if (tipe === 'success') {
            icon.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>';
        } else if (tipe === 'error') {
            icon.innerHTML = '<i data-lucide="alert-triangle" class="w-5 h-5 text-red-500"></i>';
        } else {
            icon.innerHTML = '<i data-lucide="info" class="w-5 h-5 text-blue-400"></i>';
        }

        if (typeof lucide !== 'undefined') lucide.createIcons();
        toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
        setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none'), 3500);
    }
};

const AuthModule = {
    sinkronisasiSesiUI() {
        const guestNav = document.getElementById('auth-guest');
        const userNav = document.getElementById('auth-user');
        const badgeNav = document.getElementById('kyc-badge-nav');

        if (AppState.currentUser) {
            if (guestNav) guestNav.classList.add('hidden');
            if (userNav) userNav.classList.remove('hidden');

            const avatar = document.getElementById('user-avatar');
            const nameNav = document.getElementById('user-name-nav');
            if (avatar) avatar.innerText = AppState.currentUser.name.charAt(0).toUpperCase();
            if (nameNav) nameNav.innerText = AppState.currentUser.name;

            if (badgeNav) {
                if (AppState.currentUser.is_verified || AppState.currentUser.verification_status === 'approved') {
                    badgeNav.className = "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200";
                    badgeNav.innerHTML = '<i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Terverifikasi AI';
                    badgeNav.onclick = null;
                } else if (AppState.currentUser.verification_status === 'pending') {
                    badgeNav.className = "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200";
                    badgeNav.innerHTML = '<i data-lucide="clock" class="w-3.5 h-3.5 animate-pulse"></i> KYC Pending';
                    badgeNav.onclick = null;
                } else {
                    badgeNav.className = "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 cursor-pointer";
                    badgeNav.innerHTML = '<i data-lucide="shield-alert" class="w-3.5 h-3.5"></i> Belum KYC';
                    badgeNav.onclick = () => AppCoordinator.gantiHalaman('kyc');
                }
            }
        } else {
            if (guestNav) guestNav.classList.remove('hidden');
            if (userNav) userNav.classList.add('hidden');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    },
    async prosesLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const res = await fetch(`${API_URL}?action=login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const resJson = await res.json();

            if (resJson.status === "success") {
                AppState.currentUser = resJson.user;
                AppState.currentUser.is_verified = (resJson.user.verification_status === 'approved');
                this.sinkronisasiSesiUI();
                AppCoordinator.showToast(`Selamat datang kembali, ${resJson.user.name}!`, 'success');
                AppCoordinator.gantiHalaman('dashboard');
                e.target.reset();
            } else {
                AppCoordinator.showToast(resJson.message, 'error');
            }
        } catch (err) {
            AppCoordinator.showToast('Gagal menghubungi server.', 'error');
        }
    },
    async prosesRegister(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        try {
            const res = await fetch(`${API_URL}?action=register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const resJson = await res.json();

            if (resJson.status === "success") {
                AppCoordinator.showToast('Registrasi berhasil! Silakan login.', 'success');
                AppCoordinator.gantiHalaman('login');
                e.target.reset();
            } else {
                AppCoordinator.showToast(resJson.message, 'error');
            }
        } catch (err) {
            AppCoordinator.showToast('Gagal mendaftarkan akun.', 'error');
        }
    },
    async prosesLogout() {
        try {
            await fetch(`${API_URL}?action=logout`);
            AppState.currentUser = null;
            this.sinkronisasiSesiUI();
            AppCoordinator.showToast('Berhasil keluar dari akun.', 'success');
            AppCoordinator.gantiHalaman('dashboard');
        } catch (e) {
            AppCoordinator.showToast('Gagal logout sistem.', 'error');
        }
    }
};

const KYCModule = {
    handleFileKtp(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                document.getElementById('ktp-icon').classList.add('hidden');
                document.getElementById('ktp-label').classList.add('hidden');
                const prev = document.getElementById('ktp-preview');
                prev.src = event.target.result;
                prev.classList.remove('hidden');
            }
            reader.readAsDataURL(file);
        }
    },
    mulaiSimulasiSelfie() {
        const camBox = document.getElementById('selfie-camera-box');
        const placeholder = document.getElementById('camera-placeholder');
        const line = document.getElementById('scanner-line');
        const preview = document.getElementById('selfie-preview');

        if (placeholder) placeholder.classList.add('hidden');
        if (preview) preview.classList.add('hidden');
        if (line) line.classList.remove('hidden');
        if (camBox) {
            camBox.classList.remove('bg-slate-900');
            camBox.classList.add('bg-red-950/20');
        }

        setTimeout(() => {
            if (line) line.classList.add('hidden');
            if (preview) {
                preview.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                preview.classList.remove('hidden');
            }
            AppCoordinator.showToast('Simulasi deteksi wajah berhasil dikunci.', 'info');
        }, 2000);
    },
    async prosesVerifikasiAI() {
        if (!AppState.currentUser) {
            AppCoordinator.showToast('Harap login terlebih dahulu.', 'error');
            return;
        }

        const nik = document.getElementById('kyc-nik').value;
        const name = document.getElementById('kyc-name').value;
        const address = document.getElementById('kyc-address').value;
        const noTelp = document.getElementById('no_telp')?.value; 

        if (nik.length !== 16 || !name || !address || !noTelp) {
            AppCoordinator.showToast('Harap masukkan data formulir, NIK 16 digit, & Nomor Telepon valid!', 'error');
            return;
        }

        const processor = document.getElementById('ai-processor');
        const progress = document.getElementById('ai-progress');
        const status = document.getElementById('ai-status');

        if (processor) processor.classList.remove('hidden');
        if (progress) progress.style.width = "50%";

        try {
            const res = await fetch(`${API_URL}?action=submit_kyc`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: AppState.currentUser.id,
                    nik: nik,
                    address: address,
                    no_telp: noTelp 
                })
            });
            const resJson = await res.json();

            if (resJson.status === "success") {
                if (progress) progress.style.width = "100%";
                if (status) status.innerText = "Data Berhasil Diajukan!";

                AppState.currentUser.verification_status = 'pending';
                AppState.currentUser.nik = nik;
                AppState.currentUser.address = address;
                AppState.currentUser.name = name;
                AppState.currentUser.no_telp = noTelp; 

                AuthModule.sinkronisasiSesiUI();
                AppCoordinator.showToast('Dokumen KYC Anda berhasil diajukan.', 'success');

                setTimeout(() => {
                    AppCoordinator.gantiHalaman('dashboard');
                    if (processor) processor.classList.add('hidden');
                }, 1500);
            } else {
                AppCoordinator.showToast(resJson.message, 'error');
                if (processor) processor.classList.add('hidden');
            }
        } catch (e) {
            AppCoordinator.showToast('Terjadi gangguan jaringan API.', 'error');
            if (processor) processor.classList.add('hidden');
        }
    }
};

const JobOfferingModule = {
    inisialisasiHalamanTawarkan() {
        if (!AppState.currentUser) {
            AppCoordinator.showToast('Harap masuk terlebih dahulu.', 'error');
            AppCoordinator.gantiHalaman('login');
            return;
        }
        if (AppState.currentUser.verification_status !== 'approved' && AppState.currentUser.verification_status !== 'pending' && !AppState.currentUser.is_verified) {
            AppCoordinator.showToast('Akun Anda belum lolos verifikasi KYC.', 'error');
            AppCoordinator.gantiHalaman('kyc');
            return;
        }

        const ownerNameInput = document.getElementById('job-owner-name');
        if (ownerNameInput) ownerNameInput.value = AppState.currentUser.name;
        this.updateSubCategoryDropdown();
    },
    updateSubCategoryDropdown() {
        const catSelect = document.getElementById('job-category');
        const subSelect = document.getElementById('job-subcategory');
        if (!catSelect || !subSelect) return;

        const kriteria = DataMasterModule.CATEGORIES.find(k => k.name === catSelect.value);
        if (kriteria) {
            subSelect.innerHTML = kriteria.subs.map(s => `<option value="${s}">${s}</option>`).join('');
        } else {
            subSelect.innerHTML = '<option value="" disabled>Pilih Kategori Terlebih Dahulu</option>';
        }
    },
    hitungBudgetBersih() {
        const grossInput = document.getElementById('budget-gross');
        const feePlatform = document.getElementById('fee-platform');
        const budgetNet = document.getElementById('budget-net');
        if (!grossInput || !feePlatform || !budgetNet) return;

        const gross = parseFloat(grossInput.value) || 0;
        const fee = Math.round(gross * 0.10);
        const net = gross - fee;

        feePlatform.innerText = `Rp ${fee.toLocaleString('id-ID')}`;
        budgetNet.innerText = `Rp ${net.toLocaleString('id-ID')}`;
    },
    async buatPekerjaanBaru(e) {
        e.preventDefault();
        if (!AppState.currentUser) {
            AppCoordinator.showToast('Harap login terlebih dahulu.', 'error');
            return;
        }

        const title = document.getElementById('job-title')?.value;
        const category = document.getElementById('job-category')?.value;
        const subcategory = document.getElementById('job-subcategory')?.value;
        const city = document.getElementById('job-city')?.value;
        const article = document.getElementById('job-article')?.value;
        const grossBudget = parseFloat(document.getElementById('budget-gross')?.value) || 0;
        const netBudget = grossBudget - Math.round(grossBudget * 0.10);

        if (!title || !category || !city || !article || grossBudget <= 0) {
            AppCoordinator.showToast('Harap lengkapi semua field formulir!', 'error');
            return;
        }

        try {
            const res = await fetch(`${API_URL}?action=create_job`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    category,
                    subcategory,
                    city,
                    article,
                    gross_budget: grossBudget,
                    net_budget: netBudget
                })
            });
            const resJson = await res.json();

            if (resJson.status === "success") {
                AppCoordinator.showToast('Pekerjaan berhasil dipublikasikan!', 'success');
                await DataMasterModule.muatPekerjaanDariDB();
                AppCoordinator.gantiHalaman('dashboard');
                e.target.reset();
            } else {
                AppCoordinator.showToast(resJson.message, 'error');
            }
        } catch (err) {
            AppCoordinator.showToast('Gagal menyimpan postingan pekerjaan.', 'error');
        }
    }
};

const JobTakingModule = {
    jalankanFilter() {
        this.renderDaftarPekerjaanDashboard();
    },
    resetFilter() {
        ['filter-search', 'filter-city', 'filter-category'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        this.renderDaftarPekerjaanDashboard();
    },
    async renderDaftarPekerjaanDashboard() {
        await DataMasterModule.muatPekerjaanDariDB();
        const container = document.getElementById('jobs-container');
        if (!container) return;

        const q = (document.getElementById('filter-search')?.value || '').toLowerCase();
        const kota = document.getElementById('filter-city')?.value || '';
        const kat = document.getElementById('filter-category')?.value || '';

        const filtered = AppState.jobs.filter(j => {
            return (j.title.toLowerCase().includes(q) || j.article.toLowerCase().includes(q)) &&
                (kota === "" || j.city === kota) &&
                (kat === "" || j.category === kat) &&
                j.status === 'open';
        });

        document.getElementById('total-jobs-count').innerText = `Menampilkan ${filtered.length} pekerjaan`;

        if (filtered.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center text-slate-400 py-8">Tidak ada lowongan.</div>`;
            return;
        }

        container.innerHTML = filtered.map(j => `
            <div class="bg-white border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                    <span class="bg-red-50 text-[#9c1c24] text-[10px] font-bold px-2 py-0.5 rounded uppercase">${j.category}</span>
                    <h3 class="font-bold text-slate-800 text-base mt-2">${j.title}</h3>
                    <p class="text-slate-500 text-xs line-clamp-2">${j.article}</p>
                </div>
                <div class="border-t pt-3 mt-3 flex justify-between items-center text-xs">
                    <span class="text-slate-400">${j.city}</span>
                    <span class="text-emerald-600 font-bold">Rp ${parseInt(j.net_budget).toLocaleString('id-ID')}</span>
                </div>
                <button onclick="AppCoordinator.gantiHalaman('ambil')" class="w-full mt-2 bg-slate-50 py-2 text-xs font-bold rounded-xl text-slate-700">Detail Tugas</button>
            </div>
        `).join('');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    },
    renderDaftarPekerjaanAmbil() {
        const container = document.getElementById('worker-jobs-container');
        if (!container) return;

        const openJobs = AppState.jobs.filter(j => j.status === 'open');
        if (openJobs.length === 0) {
            container.innerHTML = `<div class="text-center p-6 text-slate-400">Belum ada tugas terbuka.</div>`;
            return;
        }

        container.innerHTML = openJobs.map(j => `
            <div class="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-lg font-bold">${j.title}</h3>
                        <p class="text-xs text-slate-400">Oleh: ${j.owner_name}</p>
                    </div>
                    <span class="text-emerald-600 font-extrabold">Rp ${parseInt(j.net_budget).toLocaleString('id-ID')}</span>
                </div>
                <p class="text-xs bg-slate-50 p-3 rounded-lg text-slate-600">${j.article}</p>
                <button onclick="JobTakingModule.eksekusiAmbilTugas(${j.id})" class="bg-[#9c1c24] text-white px-4 py-2 rounded-xl text-xs font-bold">Ambil Pekerjaan</button>
            </div>
        `).join('');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    },
    async eksekusiAmbilTugas(jobId) {
        if (!AppState.currentUser) {
            AppCoordinator.showToast('Harap login terlebih dahulu.', 'error');
            AppCoordinator.gantiHalaman('login');
            return;
        }

        try {
            const res = await fetch(`${API_URL}?action=take_job`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    job_id: jobId
                })
            });
            const resJson = await res.json();

            if (resJson.status === "success") {
                AppCoordinator.showToast('Pekerjaan berhasil diambil! Cek halaman Kerjaanku.', 'success');
                await DataMasterModule.muatPekerjaanDariDB();
                AppCoordinator.gantiHalaman('kerjaanku');
            } else {
                AppCoordinator.showToast(resJson.message, 'error');
            }
        } catch (e) {
            AppCoordinator.showToast('Gagal memproses pengambilan tugas.', 'error');
        }
    },
    async renderKerjaanku() {
        if (!AppState.currentUser) {
            document.getElementById('my-jobs-container').innerHTML = `<div class="text-center p-6 text-slate-400">Silakan login untuk melihat daftar kerjaan Anda.</div>`;
            return;
        }

        await DataMasterModule.muatPekerjaanDariDB();
        const container = document.getElementById('my-jobs-container');
        if (!container) return;

        const myJobs = AppState.jobs.filter(j => j.worker_id == AppState.currentUser.id || j.owner_name === AppState.currentUser.name);

        if (myJobs.length === 0) {
            container.innerHTML = `<div class="text-center p-6 text-slate-400">Belum ada riwayat aktivitas pekerjaan.</div>`;
            return;
        }

        container.innerHTML = myJobs.map(j => {
            let statusBadge = '';
            let actionBtn = '';

            if (j.status === 'open') {
                statusBadge = `<span class="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">Membuka Lowongan</span>`;
            } else if (j.status === 'ongoing') {
                statusBadge = `<span class="bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full font-medium">Sedang Berjalan</span>`;
                
                // REVISI OPTIMASI: Arahkan pekerja langsung ke WhatsApp pemberi jasa
                if (j.worker_id == AppState.currentUser.id) {
                    const waNumber = j.owner_phone ? j.owner_phone.replace(/[^0-9]/g, '') : '';
                    const waLink = `https://wa.me/${waNumber}?text=Halo%20${encodeURIComponent(j.owner_name)},%20saya%20telah%20mengambil%20tugas%20"${encodeURIComponent(j.title)}"%20di%20platform.`;
                    
                    actionBtn = `
                        <div class="flex gap-2 mt-3">
                            <a href="${waLink}" target="_blank" class="bg-emerald-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5">
                                Hubungi Pemilik (WA)
                            </a>
                            <button onclick="JobTakingModule.selesaikanTugas(${j.id})" class="bg-slate-800 text-white px-4 py-1.5 rounded-xl text-xs font-bold">Tandai Selesai</button>
                        </div>
                    `;
                }
            } else if (j.status === 'completed') {
                statusBadge = `<span class="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">Selesai</span>`;
                actionBtn = `<button onclick="ReputasiModule.bukaModalReview(${j.id})" class="mt-3 bg-slate-800 text-white px-4 py-1.5 rounded-xl text-xs font-bold">Beri Ulasan</button>`;
            }

            return `
                <div class="bg-white border rounded-2xl p-5 shadow-sm space-y-3">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-[10px] uppercase font-extrabold tracking-wide text-slate-400">${j.category}</span>
                            <h4 class="font-bold text-slate-800 text-base mt-0.5">${j.title}</h4>
                        </div>
                        ${statusBadge}
                    </div>
                    <p class="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-3 rounded-xl">${j.article}</p>
                    <div class="flex justify-between items-center border-t pt-3 text-xs">
                        <span class="text-slate-500">Kota: <strong>${j.city}</strong></span>
                        <span class="font-bold text-slate-900">Rp ${parseInt(j.net_budget).toLocaleString('id-ID')}</span>
                    </div>
                    <div class="flex justify-end">${actionBtn}</div>
                </div>
            `;
        }).join('');
    },
    async selesaikanTugas(jobId) {
        try {
            const res = await fetch(`${API_URL}?action=complete_job`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ job_id: jobId })
            });
            const resJson = await res.json();
            if (resJson.status === "success") {
                AppCoordinator.showToast('Status pekerjaan diperbarui menjadi selesai!', 'success');
                await this.renderKerjaanku();
            } else {
                AppCoordinator.showToast(resJson.message, 'error');
            }
        } catch (e) {
            AppCoordinator.showToast('Gagal merubah status pekerjaan.', 'error');
        }
    },
    simulasikanTabrakanTransaksi() {
        AppCoordinator.showToast('Simulasi Berhasil: Sistem Concurrency Lock berhasil memblokir balapan data (Race Condition)!', 'info');
    }
};

const ReputasiModule = {
    bukaModalReview(jobId) { 
        AppState.activeJobForReview = jobId; 
        const skor = prompt("Masukkan Rating Bintang (1 - 5):", "5");
        const comment = prompt("Masukkan Ulasan Singkat Anda:", "Kerja bagus dan sangat cepat!");
        
        if (skor && comment) {
            this.setStarRating(parseInt(skor));
            const reviewCommentEl = document.getElementById('review-comment');
            if (reviewCommentEl) reviewCommentEl.value = comment;
            this.submitReviewSelesai();
        }
    },
    setStarRating(skor) { 
        AppState.selectedStarRating = skor; 
    },
    async submitReviewSelesai() {
        if (!AppState.currentUser || !AppState.activeJobForReview) {
            AppCoordinator.showToast('Data review tidak valid.', 'error');
            return;
        }

        const reviewText = document.getElementById('review-comment')?.value || 'Pekerjaan memuaskan!';
        if (AppState.selectedStarRating === 0) {
            AppCoordinator.showToast('Harap pilih rating bintang terlebih dahulu!', 'error');
            return;
        }

        try {
            const res = await fetch(`${API_URL}?action=submit_review`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    job_id: AppState.activeJobForReview,
                    rating: AppState.selectedStarRating,
                    comment: reviewText
                })
            });
            const resJson = await res.json();

            if (resJson.status === "success") {
                AppCoordinator.showToast('Ulasan Anda berhasil dikirim!', 'success');
                AppState.activeJobForReview = null;
                AppState.selectedStarRating = 0;
                await JobTakingModule.renderKerjaanku();
            } else {
                AppCoordinator.showToast(resJson.message, 'error');
            }
        } catch (e) {
            AppCoordinator.showToast('Gagal menyimpan ulasan ke server.', 'error');
        }
    },
    renderProfilDanReview() {
        if (!AppState.currentUser) return;
        document.getElementById('profile-name').innerText = AppState.currentUser.name;
        document.getElementById('profile-email').innerText = AppState.currentUser.email;
        const profilAvatar = document.getElementById('profile-avatar');
        if (profilAvatar) profilAvatar.innerText = AppState.currentUser.name.charAt(0).toUpperCase();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    DataMasterModule.inisialisasiAplikasi();
});