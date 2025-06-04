export const kampusBerdampakProjectsData = [
  { month: 'Jul', projects: 3, applications: 8 },
  { month: 'Agu', projects: 6, applications: 15 },
  { month: 'Sep', projects: 9, applications: 22 },
  { month: 'Okt', projects: 12, applications: 28 },
  { month: 'Nov', projects: 15, applications: 35 },
  { month: 'Des', projects: 18, applications: 42 },
  { month: 'Jan', projects: 20, applications: 45 }
];

export const facultyActivitiesData = [
  { month: 'Jul', courses: 2, sks: 6, honorarium: 4.5 },
  { month: 'Agu', courses: 5, sks: 15, honorarium: 11.2 },
  { month: 'Sep', courses: 8, sks: 24, honorarium: 16.8 },
  { month: 'Okt', courses: 10, sks: 29, honorarium: 20.3 },
  { month: 'Nov', courses: 12, sks: 32, honorarium: 22.1 },
  { month: 'Des', courses: 14, sks: 36, honorarium: 25.2 },
  { month: 'Jan', courses: 15, sks: 40, honorarium: 28.0 }
];

export const researchMetricsData = [
  { month: 'Jul', submissions: 1, processed: 0, completed: 0 },
  { month: 'Agu', submissions: 3, processed: 1, completed: 1 },
  { month: 'Sep', submissions: 5, processed: 3, completed: 2 },
  { month: 'Okt', submissions: 8, processed: 5, completed: 4 },
  { month: 'Nov', submissions: 12, processed: 8, completed: 6 },
  { month: 'Des', submissions: 15, processed: 10, completed: 8 },
  { month: 'Jan', submissions: 18, processed: 12, completed: 10 }
];

export const showcaseMetricsData = [
  { month: 'Jul', events: 1, participants: 30, achievements: 2 },
  { month: 'Agu', events: 2, participants: 55, achievements: 3 },
  { month: 'Sep', events: 3, participants: 80, achievements: 4 },
  { month: 'Okt', events: 4, participants: 110, achievements: 6 },
  { month: 'Nov', events: 5, participants: 140, achievements: 8 },
  { month: 'Des', events: 6, participants: 170, achievements: 10 },
  { month: 'Jan', events: 7, participants: 200, achievements: 12 }
];

export const industryRevenueData = [
  { month: 'Jul', collaboration: 1, programs: 3 },
  { month: 'Agu', collaboration: 2, programs: 5 },
  { month: 'Sep', collaboration: 3, programs: 7 },
  { month: 'Okt', collaboration: 3, programs: 9 },
  { month: 'Nov', collaboration: 4, programs: 11 },
  { month: 'Des', collaboration: 4, programs: 13 },
  { month: 'Jan', collaboration: 5, programs: 15 }
];

export const projectsData = [
  {
    id: 1,
    title: "E-Commerce UMKM Kalimantan",
    student: "Andika Pratama",
    prodi: "Sistem Informasi",
    angkatan: "2021",
    status: "Live",
    url: "andika-ecommerce.kampus-berdampak.fsti-itk.ac.id",
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    description: "Platform e-commerce untuk mempromosikan produk UMKM Kalimantan dengan fitur pembayaran digital dan manajemen stok terintegrasi.",
    features: ['Multi-vendor marketplace', 'Payment gateway', 'Inventory management', 'Analytics dashboard'],
    timeline: { start: "2024-08-01", end: "2024-11-15", duration: "4 bulan" },
    mentor: "Aidil Saputra Kirsan, M.Tr.Kom",
    github: "https://github.com/andika/ecommerce-kalimantan",
    demo: "https://andika-ecommerce.kampus-berdampak.fsti-itk.ac.id",
    progress: 100,
    category: "Web Development"
  },
  {
    id: 2,
    title: "Smart Irrigation System",
    student: "Sari Lestari",
    prodi: "Teknik Elektro",
    angkatan: "2022",
    status: "Development",
    url: "sari-irrigation.kampus-berdampak.fsti-itk.ac.id",
    tech: ['Arduino', 'Python', 'MQTT', 'InfluxDB'],
    description: "Sistem irigasi pintar berbasis IoT untuk pertanian kelapa sawit di Kalimantan dengan sensor kelembapan dan kontrol otomatis.",
    features: ['Real-time monitoring', 'Automated irrigation', 'Mobile alerts', 'Weather integration'],
    timeline: { start: "2024-09-01", end: "2024-12-20", duration: "4 bulan" },
    mentor: "Dr. Rina Marwanti",
    github: "https://github.com/sari/smart-irrigation",
    demo: "https://sari-irrigation.kampus-berdampak.fsti-itk.ac.id",
    progress: 80,
    category: "IoT & Hardware"
  },
  {
    id: 3,
    title: "E-Learning Bahasa Dayak",
    student: "Joko Susilo",
    prodi: "Informatika",
    angkatan: "2021",
    status: "Testing",
    url: "joko-elearning.kampus-berdampak.fsti-itk.ac.id",
    tech: ['Vue.js', 'Laravel', 'MySQL', 'PWA'],
    description: "Platform pembelajaran daring untuk pelestarian bahasa Dayak dengan modul interaktif dan kamus digital.",
    features: ['Interactive modules', 'Digital dictionary', 'Offline access', 'Progress tracking'],
    timeline: { start: "2024-07-15", end: "2024-11-30", duration: "4.5 bulan" },
    mentor: "Dr. Yohanes Khoirul",
    github: "https://github.com/joko/elearning-dayak",
    demo: "https://joko-elearning.kampus-berdampak.fsti-itk.ac.id",
    progress: 85,
    category: "Education Technology"
  },
  {
    id: 4,
    title: "AI Traffic Management Balikpapan",
    student: "Rina Kartika",
    prodi: "Informatika",
    angkatan: "2022",
    status: "Development",
    url: "rina-traffic.kampus-berdampak.fsti-itk.ac.id",
    tech: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI'],
    description: "Sistem manajemen lalu lintas berbasis AI untuk mengurangi kemacetan di Balikpapan dengan analisis real-time dari CCTV.",
    features: ['Traffic prediction', 'Real-time analysis', 'Incident detection', 'Dashboard reporting'],
    timeline: { start: "2024-08-15", end: "2024-12-15", duration: "4 bulan" },
    mentor: "Aidil Saputra Kirsan, M.Tr.Kom",
    github: "https://github.com/rina/ai-traffic",
    demo: "https://rina-traffic.kampus-berdampak.fsti-itk.ac.id",
    progress: 70,
    category: "AI & Machine Learning"
  },
  {
    id: 5,
    title: "Digital Twin Pabrik Kelapa Sawit",
    student: "Budi Santoso",
    prodi: "Teknik Elektro",
    angkatan: "2020",
    status: "Live",
    url: "budi-digitaltwin.kampus-berdampak.fsti-itk.ac.id",
    tech: ['Unity', 'IoT', 'Python', 'PostgreSQL'],
    description: "Digital twin untuk monitoring dan optimasi produksi pabrik kelapa sawit di Kalimantan Timur.",
    features: ['Real-time monitoring', 'Production optimization', '3D visualization', 'Predictive analytics'],
    timeline: { start: "2024-07-01", end: "2024-10-30", duration: "4 bulan" },
    mentor: "Dr. Rina Marwanti",
    github: "https://github.com/budi/digital-twin-cpo",
    demo: "https://budi-digitaltwin.kampus-berdampak.fsti-itk.ac.id",
    progress: 100,
    category: "Industrial Technology"
  },
  {
    id: 6,
    title: "Fintech untuk UMKM Balikpapan",
    student: "Lina Permatasari",
    prodi: "Bisnis Digital",
    angkatan: "2021",
    status: "Testing",
    url: "lina-fintech.kampus-berdampak.fsti-itk.ac.id",
    tech: ['React Native', 'Node.js', 'Blockchain', 'MongoDB'],
    description: "Aplikasi fintech untuk UMKM di Balikpapan dengan fitur pinjaman mikro dan manajemen keuangan digital.",
    features: ['Micro-lending', 'Digital payments', 'Financial tracking', 'Credit scoring'],
    timeline: { start: "2024-08-15", end: "2024-12-01", duration: "3.5 bulan" },
    mentor: "Dr. Linda Permata",
    github: "https://github.com/lina/fintech-umkm",
    demo: "https://lina-fintech.kampus-berdampak.fsti-itk.ac.id",
    progress: 90,
    category: "Fintech"
  },
  {
    id: 7,
    title: "Smart Tourism App Kalimantan",
    student: "Dewi Anggraini",
    prodi: "Sistem Informasi",
    angkatan: "2022",
    status: "Research",
    url: "dewi-tourism.kampus-berdampak.fsti-itk.ac.id",
    tech: ['Flutter', 'Firebase', 'Maps API', 'AI'],
    description: "Aplikasi pariwisata cerdas dengan rekomendasi destinasi berbasis AI dan tur virtual untuk wisata Kalimantan.",
    features: ['AI recommendations', 'Virtual tours', 'Local guide booking', 'Offline maps'],
    timeline: { start: "2024-09-01", end: "2025-01-15", duration: "4.5 bulan" },
    mentor: "Dr. Yohanes Khoirul",
    github: "https://github.com/dewi/smart-tourism-kalimantan",
    demo: "https://dewi-tourism.kampus-berdampak.fsti-itk.ac.id",
    progress: 60,
    category: "Mobile Development"
  }
];

export const facultyData = [
  {
    id: 1,
    name: "Aidil Saputra Kirsan, M.Tr.Kom",
    role: "Dosen Praktisi - Cloud Computing",
    expertise: ["Cloud Computing", "Wireless Sensor Networks", "Mobile Applications", "Network Administration"],
    industryExp: "Dosen Tamu di Kanagawa Institute of Technology, Jepang (2022-2023)",
    rating: 4.9,
    honorariumPerSKS: 650000,
    availability: "Senin-Kamis 13:00-16:00",
    email: "aidil@lecturer.fsti-itk.ac.id",
    phone: "+62 812-3456-7890",
    totalSKS: 6,
    totalHonorarium: 3900000,
    activeCourses: 2,
    prodi: "Sistem Informasi",
    certifications: ["AWS Certified Solutions Architect", "Cisco CCNA", "Google Cloud Associate"],
    languages: ["Indonesian", "English"],
    bio: "Dosen praktisi dengan pengalaman di cloud computing dan jaringan nirkabel. Mengajar Cloud Computing dan Jaringan Nirkabel di FSTI ITK.",
    teachingCourses: [
      { code: "SI601", name: "Cloud Computing", sks: 3, students: 35, semester: "Ganjil 2024" },
      { code: "SI602", name: "Jaringan Nirkabel", sks: 3, students: 30, semester: "Ganjil 2024" }
    ],
    practisiMengajarProgram: {
      year: "2024",
      category: "Teknologi Informasi",
      funding: "Kemendikbud-Ristek",
      duration: "1 Tahun Akademik"
    }
  },
  {
    id: 2,
    name: "Dr. Rina Marwanti",
    role: "Dosen Praktisi - Industrial IoT",
    expertise: ["Industrial IoT", "Smart Manufacturing", "Automation Systems", "Data Analytics"],
    industryExp: "Konsultan Teknologi di PT Pupuk Kalimantan Timur (2019-2022)",
    rating: 4.8,
    honorariumPerSKS: 700000,
    availability: "Selasa-Jumat 10:00-13:00",
    email: "rina.marwanti@lecturer.fsti-itk.ac.id",
    phone: "+62 813-9876-5432",
    totalSKS: 6,
    totalHonorarium: 4200000,
    activeCourses: 2,
    prodi: "Teknik Elektro",
    certifications: ["Certified IoT Professional", "Industrial Automation Expert"],
    languages: ["Indonesian", "English"],
    bio: "Spesialis Industrial IoT dengan pengalaman di industri kelapa sawit dan petrokimia. Mengajar IoT Systems dan Industrial Automation di FSTI ITK.",
    teachingCourses: [
      { code: "TE501", name: "Industrial IoT Systems", sks: 3, students: 32, semester: "Ganjil 2024" },
      { code: "TE502", name: "Smart Manufacturing", sks: 3, students: 28, semester: "Genap 2024" }
    ],
    practisiMengajarProgram: {
      year: "2024",
      category: "Teknologi Industri",
      funding: "Kemendikbud-Ristek",
      duration: "1 Tahun Akademik"
    }
  },
  {
    id: 3,
    name: "Dr. Yohanes Khoirul",
    role: "Dosen Praktisi - Artificial Intelligence",
    expertise: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Data Science"],
    industryExp: "AI Engineer di PT Pertamina (2020-2023)",
    rating: 4.7,
    honorariumPerSKS: 750000,
    availability: "Senin-Rabu 14:00-17:00",
    email: "yohanes.khoirul@lecturer.fsti-itk.ac.id",
    phone: "+62 811-2468-1357",
    totalSKS: 6,
    totalHonorarium: 4500000,
    activeCourses: 2,
    prodi: "Informatika",
    certifications: ["TensorFlow Developer", "Google AI Professional", "AWS Machine Learning"],
    languages: ["Indonesian", "English"],
    bio: "Pakar AI dengan pengalaman di analisis data industri migas. Mengajar Machine Learning dan Computer Vision di FSTI ITK.",
    teachingCourses: [
      { code: "IF501", name: "Machine Learning", sks: 3, students: 38, semester: "Ganjil 2024" },
      { code: "IF502", name: "Computer Vision", sks: 3, students: 35, semester: "Genap 2024" }
    ],
    practisiMengajarProgram: {
      year: "2024",
     category: "Artificial Intelligence",
      funding: "Kemendikbud-Ristek",
      duration: "1 Tahun Akademik"
    }
  },
  {
    id: 4,
    name: "Dr. Linda Permata",
    role: "Dosen Praktisi - Fintech & Digital Business",
    expertise: ["Financial Technology", "Digital Business", "Blockchain", "E-Commerce"],
    industryExp: "Digital Innovation Lead di Bank Kalimantan (2021-2024)",
    rating: 4.6,
    honorariumPerSKS: 680000,
    availability: "Kamis-Sabtu 10:00-15:00",
    email: "linda.permata@lecturer.fsti-itk.ac.id",
    phone: "+62 814-1357-2468",
    totalSKS: 6,
    totalHonorarium: 4080000,
    activeCourses: 2,
    prodi: "Bisnis Digital",
    certifications: ["Certified Fintech Professional", "Digital Transformation Specialist"],
    languages: ["Indonesian", "English"],
    bio: "Spesialis fintech dan bisnis digital dengan pengalaman di perbankan. Mengajar Financial Technology dan Digital Business di FSTI ITK.",
    teachingCourses: [
      { code: "BD501", name: "Financial Technology", sks: 3, students: 40, semester: "Ganjil 2024" },
      { code: "BD502", name: "Digital Business Strategy", sks: 3, students: 37, semester: "Genap 2024" }
    ],
    practisiMengajarProgram: {
      year: "2024",
      category: "Bisnis Digital",
      funding: "Kemendikbud-Ristek",
      duration: "1 Tahun Akademik"
    }
  }
];

export const researchData = [
  {
    id: 1,
    title: "Efisiensi Jaringan Sensor Nirkabel untuk Monitoring Perkebunan Kelapa Sawit",
    authors: ["Aidil Saputra Kirsan, M.Tr.Kom", "Andika Pratama", "Sari Lestari"],
    type: "Publikasi",
    category: "Jurnal Internasional",
    year: 2024,
    citations: 12,
    downloads: 180,
    status: "Published",
    journal: "Journal of Wireless Sensor Networks",
    quartile: "Q2",
    sintaScore: "S2",
    googleScholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=id&user=lzQbWuEAAAAJ",
    doi: "10.1016/j.jwsn.2024.02.010",
    abstract: "Penelitian ini mengembangkan jaringan sensor nirkabel untuk monitoring perkebunan kelapa sawit di Kalimantan dengan fokus pada efisiensi energi dan prediksi panen.",
    keywords: ["Wireless Sensor Networks", "Palm Oil Plantation", "Energy Efficiency", "Kalimantan"],
    funding: "Hibah DIKTI 2024 - Rp75.000.000",
    collaborations: ["PT SMART Tbk", "Universitas Mulawarman"],
    implementation: "Diuji coba di 2 perkebunan di Kalimantan Timur",
    socialImpact: "Mendukung efisiensi produksi 20+ kebun kelapa sawit",
    sisterEntry: "SISTER-2024-ITK-002",
    reportUrl: "aidil-research.fsti-itk.ac.id/wsn-palmoil-2024.pdf"
  },
  {
    id: 2,
    title: "Aplikasi Fintech untuk UMKM Berbasis Blockchain",
    authors: ["Dr. Linda Permata", "Lina Permatasari"],
    type: "HKI",
    category: "Paten",
    year: 2024,
    citations: 0,
    downloads: 0,
    status: "Dalam Proses DJKI",
    patentNumber: "Menunggu Nomor DJKI",
    applicationDate: "2024-04-01",
    djkiStatus: "Substantive Examination",
    estimatedGrant: "2025-Q3",
    abstract: "Aplikasi fintech berbasis blockchain untuk memberikan akses keuangan yang lebih mudah bagi UMKM di Kalimantan.",
    keywords: ["Fintech", "Blockchain", "UMKM", "Kalimantan"],
    applicant: "Institut Teknologi Kalimantan",
    inventors: ["Dr. Linda Permata", "Lina Permatasari"],
    scope: "Indonesia",
    djkiReference: "P00202400890",
    patentCost: "Rp18.000.000 (ditanggung ITK)",
    commercialization: "Negosiasi dengan Bank Kalimantan",
    implementation: "Pilot project di 15 UMKM Balikpapan",
    economicImpact: "Potensi pendapatan Rp300 juta/tahun",
    reportUrl: "linda-research.fsti-itk.ac.id/fintech-blockchain-2024.pdf"
  },
  {
    id: 3,
    title: "Optimasi Produksi Kelapa Sawit dengan Industrial IoT",
    authors: ["Dr. Rina Marwanti", "Budi Santoso"],
    type: "Publikasi",
    category: "Jurnal Nasional",
    year: 2024,
    citations: 6,
    downloads: 120,
    status: "Published",
    journal: "Jurnal Teknologi Industri",
    quartile: "S2",
    sintaScore: "S2",
    googleScholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=id&user=xyz456",
    doi: "10.30871/jti.v12i2.1234",
    abstract: "Penelitian ini mengembangkan sistem IoT untuk optimasi produksi CPO dengan efisiensi hingga 85% di pabrik kelapa sawit.",
    keywords: ["Industrial IoT", "Palm Oil", "Production Optimization", "Kalimantan"],
    funding: "Hibah ITK 2024 - Rp60.000.000",
    collaborations: ["PT Astra Agro Lestari", "PT SMART Tbk"],
    implementation: "Diimplementasikan di 2 pabrik di Kalimantan Timur",
    socialImpact: "Meningkatkan produktivitas 5 pabrik kelapa sawit",
    sisterEntry: "SISTER-2024-ITK-003",
    reportUrl: "rina-research.fsti-itk.ac.id/iot-palmoil-2024.pdf"
  }
];

export const industryPartnersData = [
  {
    id: 1,
    name: "PT Smart Digital Kalimantan",
    type: "IT Solutions Provider",
    sector: "Technology",
    size: "Medium (200+ employees)",
    established: 2021,
    contact: {
      person: "Bambang Wijaya",
      position: "Chief Technology Officer",
      email: "bambang.wijaya@smartdigital-kalimantan.com",
      phone: "+62 541-555-0123"
    },
    location: "Balikpapan, Kalimantan Timur",
    website: "https://smartdigital-kalimantan.com",
    activePrograms: 3,
    collaborationValue: 45000000,
    partnershipType: "Strategic Academic Partner",
    collaborationTypes: ["Magang Mahasiswa", "Hibah Penelitian", "Guest Lecture"],
    keyPrograms: [
      { title: "Program Magang Software Developer", value: 18000000, duration: "6 bulan", beneficiaries: 6, type: "Internship" },
      { title: "Hibah Penelitian IoT", value: 20000000, duration: "1 tahun", beneficiaries: 4, type: "Research Grant" },
      { title: "Guest Lecture Series", value: 7000000, duration: "1 semester", beneficiaries: 80, type: "Knowledge Sharing" }
    ],
    facultyEngaged: ["Aidil Saputra Kirsan, M.Tr.Kom", "Dr. Rina Marwanti"],
    studentInternships: 6,
    graduatesHired: 3,
    satisfactionRating: 4.7,
    mouStatus: "Active",
    mouSigned: "2023-03-15",
    mouExpiry: "2026-03-15"
  },
  {
    id: 2,
    name: "Bank Kalimantan Digital",
    type: "Financial Institution",
    sector: "Banking & Finance",
    size: "Large (500+ employees)",
    established: 1995,
    contact: {
      person: "Siti Aminah",
      position: "Head of Digital Innovation",
      email: "siti.aminah@bankkaldig.co.id",
      phone: "+62 541-555-6789"
    },
    location: "Samarinda, Kalimantan Timur",
    website: "https://bankkaldig.co.id",
    activePrograms: 2,
    collaborationValue: 35000000,
    partnershipType: "Industry Partner",
    collaborationTypes: ["Hibah Penelitian", "Magang Mahasiswa"],
    keyPrograms: [
      { title: "Hibah Penelitian Fintech", value: 25000000, duration: "1 tahun", beneficiaries: 5, type: "Research Grant" },
      { title: "Program Magang Digital Banking", value: 10000000, duration: "6 bulan", beneficiaries: 4, type: "Internship" }
    ],
    facultyEngaged: ["Dr. Linda Permata"],
    studentInternships: 4,
    graduatesHired: 2,
    satisfactionRating: 4.8,
    mouStatus: "Active",
    mouSigned: "2023-06-01",
    mouExpiry: "2025-06-01"
  },
  {
    id: 3,
    name: "PT Pupuk Kalimantan Timur",
    type: "Manufacturing Company",
    sector: "Chemical Industry",
    size: "Large (2000+ employees)",
    established: 1977,
    contact: {
      person: "Indra Gunawan",
      position: "Technology Director",
      email: "indra.gunawan@pkt.co.id",
      phone: "+62 541-555-3456"
    },
    location: "Bontang, Kalimantan Timur",
    website: "https://pupukkaltim.com",
    activePrograms: 2,
    collaborationValue: 40000000,
    partnershipType: "Industry Partner",
    collaborationTypes: ["Hibah Penelitian", "Magang Mahasiswa"],
    keyPrograms: [
      { title: "Hibah Penelitian Industry 4.0", value: 30000000, duration: "1 tahun", beneficiaries: 6, type: "Research Grant" },
      { title: "Program Magang Process Control", value: 10000000, duration: "6 bulan", beneficiaries: 4, type: "Internship" }
    ],
    facultyEngaged: ["Dr. Rina Marwanti"],
    studentInternships: 4,
    graduatesHired: 2,
    satisfactionRating: 4.9,
    mouStatus: "Active",
    mouSigned: "2023-04-01",
    mouExpiry: "2026-04-01"
  }
];

export const eventsData = [
  {
    id: 1,
    title: "Seminar Nasional: Teknologi untuk Industri Kelapa Sawit",
    type: "Seminar",
    date: "2024-07-15",
    time: "09:00-12:00",
    venue: "Auditorium FSTI ITK",
    speaker: "Dr. Rina Marwanti",
    participants: 120,
    capacity: 150,
    status: "Completed",
    description: "Seminar tentang penerapan teknologi IoT dan AI dalam industri kelapa sawit di Kalimantan.",
    topics: ["Industrial IoT", "Palm Oil Industry", "Smart Manufacturing"],
    outcomes: ["Networking industri-akademik", "Kolaborasi riset"],
    materials: "slides-palmoil-tech.fsti-itk.ac.id/jul2024.pdf",
    photos: "gallery.fsti-itk.ac.id/seminar-jul2024",
    feedback: 4.6,
    certificates: 100
  },
  {
    id: 2,
    title: "Tech Talk: AI untuk Fintech di Indonesia Timur",
    type: "Tech Talk",
    date: "2024-08-20",
    time: "14:00-16:00",
    venue: "Ruang Serbaguna FSTI",
    speaker: "Dr. Linda Permata",
    participants: 80,
    capacity: 100,
    status: "Completed",
    description: "Diskusi tentang aplikasi AI dalam pengembangan fintech untuk wilayah Indonesia Timur.",
    topics: ["Artificial Intelligence", "Financial Technology", "Regional Development"],
    outcomes: ["Knowledge sharing", "Industry insights"],
    materials: "slides-ai-fintech.fsti-itk.ac.id/aug2024.pdf",
    photos: "gallery.fsti-itk.ac.id/techtalk-aug2024",
    feedback: 4.5,
    certificates: 70
  },
  {
    id: 3,
    title: "Workshop IoT untuk Smart Manufacturing",
    type: "Workshop",
    date: "2024-09-10",
    time: "10:00-15:00",
    venue: "Lab IoT FSTI ITK",
    speaker: "Aidil Saputra Kirsan, M.Tr.Kom",
    participants: 60,
    capacity: 80,
    status: "Completed",
    description: "Pelatihan praktis tentang implementasi IoT untuk smart manufacturing di industri Kalimantan.",
    topics: ["IoT", "Smart Manufacturing", "Industry 4.0"],
    outcomes: ["Skill development", "Industry collaboration"],
    materials: "slides-iot-workshop.fsti-itk.ac.id/sep2024.pdf",
    photos: "gallery.fsti-itk.ac.id/workshop-sep2024",
    feedback: 4.7,
    certificates: 55
  }
];

export const achievementsData = [
  {
    id: 1,
    title: "Juara 1 Kompetisi Gemastik 2024 Kategori Data Mining",
    achiever: "Tim Data Analytics FSTI (Andika, Sari, Joko)",
    type: "Prestasi Mahasiswa",
    level: "Nasional",
    date: "2024-10-15",
    organizer: "Kemendikbud-Ristek",
    description: "Tim mahasiswa FSTI ITK meraih juara 1 Gemastik dengan solusi data mining untuk prediksi produktivitas kelapa sawit.",
    impact: "Pengakuan nasional untuk inovasi FSTI ITK",
    prize: "Rp25.000.000 + Pembinaan Inkubator",
    prodi: "Sistem Informasi",
    mentor: "Aidil Saputra Kirsan, M.Tr.Kom",
    mediaUrl: "news.fsti-itk.ac.id/gemastik-2024-winner",
    certificateUrl: "achievements.fsti-itk.ac.id/gemastik-2024-cert.pdf",
    category: "Academic Competition"
  },
  {
    id: 2,
    title: "Best Innovation Award Fintech Challenge 2024",
    achiever: "Lina Permatasari",
    type: "Prestasi Mahasiswa",
    level: "Nasional",
    date: "2024-09-20",
    organizer: "Bank Indonesia",
    description: "Solusi fintech untuk UMKM meraih penghargaan inovasi terbaik di tingkat nasional.",
    impact: "Meningkatkan reputasi FSTI ITK di bidang fintech",
    prize: "Rp20.000.000 + Inkubasi Startup",
    prodi: "Bisnis Digital",
    mentor: "Dr. Linda Permata",
    mediaUrl: "news.fsti-itk.ac.id/fintech-award-2024",
    certificateUrl: "achievements.fsti-itk.ac.id/fintech-2024-cert.pdf",
    category: "Fintech Innovation"
  },
  {
    id: 3,
    title: "Juara 2 Hackathon Smart City Balikpapan 2024",
    achiever: "Tim Urban Tech (Rina, Dewi)",
    type: "Prestasi Mahasiswa",
    level: "Regional",
    date: "2024-11-01",
    organizer: "Pemkot Balikpapan",
    description: "Solusi manajemen lalu lintas cerdas untuk Kota Balikpapan.",
    impact: "Kontribusi untuk smart city Balikpapan",
    prize: "Rp15.000.000 + Implementasi Pilot Project",
    prodi: "Informatika",
    mentor: "Dr. Yohanes Khoirul",
    mediaUrl: "news.fsti-itk.ac.id/hackathon-2024",
    certificateUrl: "achievements.fsti-itk.ac.id/hackathon-2024-cert.pdf",
    category: "Smart City"
  }
];

export const newsArticlesData = [
  {
    id: 1,
    title: "FSTI ITK Luncurkan Program Kampus Berdampak",
    author: "Tim Publikasi FSTI ITK",
    date: "2024-08-01",
    category: "Launching",
    excerpt: "FSTI ITK meluncurkan program Kampus Berdampak untuk mendukung IKU 2, 3, dan 5 dengan fokus industri Kalimantan.",
    content: "Fakultas Sains dan Teknologi Informasi ITK meresmikan program Kampus Berdampak untuk mendukung pembelajaran berbasis proyek dan kolaborasi industri...",
    image: "news-images.fsti-itk.ac.id/kampus-berdampak-launching-2024.jpg",
    readTime: "4 menit",
    views: 1200,
    tags: ["Kampus Berdampak", "FSTI ITK", "Industry Collaboration"],
    url: "news.fsti-itk.ac.id/kampus-berdampak-launching-2024"
  },
  {
    id: 2,
    title: "FSTI ITK Jalin Kerjasama dengan PT Smart Digital Kalimantan",
    author: "Tim Publikasi FSTI ITK",
    date: "2024-09-15",
    category: "Collaboration",
    excerpt: "FSTI ITK menandatangani MoU dengan PT Smart Digital Kalimantan untuk magang dan penelitian IoT.",
    content: "Kerjasama ini mencakup program magang untuk 6 mahasiswa dan hibah penelitian senilai Rp20 juta...",
    image: "news-images.fsti-itk.ac.id/mou-smartdigital-2024.jpg",
    readTime: "3 menit",
    views: 950,
    tags: ["Industry Partnership", "IoT Research", "Student Internship"],
    url: "news.fsti-itk.ac.id/mou-smartdigital-2024"
  },
  {
    id: 3,
    title: "Mahasiswa FSTI ITK Raih Juara Gemastik 2024",
    author: "Tim Publikasi FSTI ITK",
    date: "2024-10-20",
    category: "Achievement",
    excerpt: "Tim Data Analytics FSTI ITK meraih juara 1 di Gemastik 2024 kategori Data Mining.",
    content: "Tim yang dibimbing oleh Aidil Saputra Kirsan, M.Tr.Kom berhasil mengembangkan solusi prediksi produktivitas kelapa sawit...",
    image: "news-images.fsti-itk.ac.id/gemastik-2024.jpg",
    readTime: "3 menit",
    views: 1400,
    tags: ["Gemastik", "Data Mining", "Student Achievement"],
    url: "news.fsti-itk.ac.id/gemastik-2024-winner"
  }
];

export const tabs = [
  { id: 'kampus-berdampak', label: 'Kampus Berdampak', icon: 'Users', color: 'bg-blue-500', url: 'kampus-berdampak.fsti-itk.ac.id' },
  { id: 'faculty', label: 'Portal Dosen', icon: 'BookOpen', color: 'bg-purple-500', url: 'faculty.fsti-itk.ac.id' },
  { id: 'research', label: 'Repositori Riset', icon: 'Award', color: 'bg-green-500', url: 'research.fsti-itk.ac.id' },
  { id: 'industry', label: 'Kolaborasi Industri', icon: 'Building', color: 'bg-orange-500', url: 'industry.fsti-itk.ac.id' },
  { id: 'showcase', label: 'Pameran & Prestasi', icon: 'Star', color: 'bg-pink-500', url: 'showcase.fsti-itk.ac.id' }
];