import React, { useState } from 'react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { 
  Users, BookOpen, Award, Building, TrendingUp, FileText, Calendar, Globe, Shield, Zap,
  Search, Plus, Eye, Download, Clock, CheckCircle, User, Star, Filter, Target,
  GitBranch, X, ArrowRight, Mail, Phone, ExternalLink, Upload, Send, Code,
  Edit, Save, Trash2, Settings, Bell, MessageCircle, DollarSign, MapPin,
  Video, FileCheck, AlertCircle, PlayCircle, PauseCircle, BarChart3,
  Database, Smartphone, Monitor, Wifi, CreditCard, Calendar as CalendarIcon
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('mbkm');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showPortfolioGenerator, setShowPortfolioGenerator] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showPartnershipForm, setShowPartnershipForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProdi, setFilterProdi] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeView, setActiveView] = useState('dashboard'); // for different views within platforms

  // Enhanced data dengan bahasa Indonesia
  const mbkmProjectsData = [
    { month: 'Jul', projects: 5, applications: 12 },
    { month: 'Agu', projects: 12, applications: 28 },
    { month: 'Sep', projects: 18, applications: 45 },
    { month: 'Okt', projects: 25, applications: 62 },
    { month: 'Nov', projects: 30, applications: 85 }
  ];

  const facultyActivitiesData = [
    { month: 'Jul', courses: 2, sks: 6, honorarium: 4.5 },
    { month: 'Agu', courses: 5, sks: 15, honorarium: 11.2 },
    { month: 'Sep', courses: 8, sks: 24, honorarium: 16.8 },
    { month: 'Okt', courses: 10, sks: 29, honorarium: 20.3 },
    { month: 'Nov', courses: 10, sks: 29, honorarium: 22.1 }
  ];

  const researchMetricsData = [
    { month: 'Jul', submissions: 1, processed: 0, completed: 0 },
    { month: 'Agu', submissions: 3, processed: 1, completed: 1 },
    { month: 'Sep', submissions: 5, processed: 3, completed: 2 },
    { month: 'Okt', submissions: 8, processed: 5, completed: 4 },
    { month: 'Nov', submissions: 12, processed: 8, completed: 6 }
  ];

  const industryRevenueData = [
    { month: 'Jul', collaboration: 15, programs: 2, students: 8 },
    { month: 'Agu', collaboration: 35, programs: 4, students: 18 },
    { month: 'Sep', collaboration: 65, programs: 8, students: 28 },
    { month: 'Okt', collaboration: 95, programs: 12, students: 38 },
    { month: 'Nov', collaboration: 115, programs: 15, students: 45 }
  ];

  // Enhanced projects data
  const projectsData = [
    {
      id: 1,
      title: "E-Commerce Platform Produk Kalimantan",
      student: "Rizky Pratama",
      prodi: "Sistem Informasi",
      angkatan: "2021",
      status: "Live",
      url: "rizky-ecommerce.mbkm.fsti-itk.ac.id",
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      description: "Platform e-commerce untuk mempromosikan produk UMKM Kalimantan dengan fitur pembayaran digital dan sistem manajemen inventory yang terintegrasi.",
      features: ['Multi-vendor marketplace', 'Payment gateway', 'Inventory management', 'Analytics dashboard'],
      timeline: { start: "2024-08-01", end: "2024-11-15", duration: "4 bulan" },
      mentor: "Dr. Ahmad Susanto",
      github: "https://github.com/rizky/ecommerce-kalimantan",
      demo: "https://demo.ecommerce-kalimantan.com",
      progress: 100,
      category: "Web Development"
    },
    {
      id: 2,
      title: "Smart Tourism Kalimantan",
      student: "Siti Nurhaliza",
      prodi: "Informatika",
      angkatan: "2020",
      status: "Development",
      url: "siti-tourism.mbkm.fsti-itk.ac.id",
      tech: ['Vue.js', 'Laravel', 'MySQL', 'Maps API'],
      description: "Aplikasi mobile dan web untuk wisata cerdas Kalimantan dengan fitur AI recommendation, virtual tour, dan integrasi dengan pemandu wisata lokal.",
      features: ['AR virtual tour', 'AI recommendation', 'Local guide booking', 'Offline maps'],
      timeline: { start: "2024-09-01", end: "2024-12-20", duration: "4 bulan" },
      mentor: "Maya Sari, M.Kom",
      github: "https://github.com/siti/smart-tourism",
      demo: "https://beta.smart-tourism.com",
      progress: 75,
      category: "Mobile Development"
    },
    {
      id: 3,
      title: "IoT Monitoring Kelapa Sawit",
      student: "Ahmad Fauzi",
      prodi: "Teknik Elektro",
      angkatan: "2021",
      status: "Live",
      url: "ahmad-iot.mbkm.fsti-itk.ac.id",
      tech: ['Arduino', 'Python', 'InfluxDB', 'Grafana'],
      description: "Sistem monitoring IoT untuk perkebunan kelapa sawit dengan sensor kelembaban, pH tanah, dan cuaca yang terintegrasi dengan dashboard real-time.",
      features: ['Real-time monitoring', 'Predictive analytics', 'Mobile alerts', 'Weather integration'],
      timeline: { start: "2024-07-15", end: "2024-10-30", duration: "3.5 bulan" },
      mentor: "Prof. Budi Santoso",
      github: "https://github.com/ahmad/iot-sawit",
      demo: "https://monitoring.iot-sawit.com",
      progress: 100,
      category: "IoT & Hardware"
    },
    {
      id: 4,
      title: "Sistem Manajemen Desa Digital",
      student: "Indira Sari",
      prodi: "Sistem Informasi",
      angkatan: "2022",
      status: "Testing",
      url: "indira-desa.mbkm.fsti-itk.ac.id",
      tech: ['React', 'Firebase', 'PWA', 'Chart.js'],
      description: "Aplikasi Progressive Web App untuk digitalisasi administrasi desa dengan fitur surat online, keuangan desa, dan data kependudukan.",
      features: ['Digital documents', 'Financial tracking', 'Population data', 'Mobile-first design'],
      timeline: { start: "2024-08-15", end: "2024-12-01", duration: "3.5 bulan" },
      mentor: "Dr. Linda Permata",
      github: "https://github.com/indira/desa-digital",
      demo: "https://demo.desa-digital.com",
      progress: 85,
      category: "Government Tech"
    },
    {
      id: 5,
      title: "AI Chatbot Bahasa Dayak",
      student: "David Kurniawan",
      prodi: "Informatika",
      angkatan: "2021",
      status: "Research",
      url: "david-chatbot.mbkm.fsti-itk.ac.id",
      tech: ['Python', 'TensorFlow', 'NLP', 'FastAPI'],
      description: "Chatbot berbasis AI untuk melestarikan bahasa Dayak dengan fitur pembelajaran interaktif dan kamus digital bahasa Dayak-Indonesia.",
      features: ['Natural Language Processing', 'Voice recognition', 'Cultural content', 'Learning games'],
      timeline: { start: "2024-09-01", end: "2025-01-15", duration: "4.5 bulan" },
      mentor: "Dr. Yohanes Khoirul",
      github: "https://github.com/david/ai-chatbot-dayak",
      demo: "https://beta.chatbot-dayak.com",
      progress: 45,
      category: "AI & Machine Learning"
    }
  ];

  // Faculty data
  const facultyData = [
    {
      id: 1,
      name: "Dr. Ahmad Susanto",
      role: "Dosen Praktisi - Cloud Computing",
      expertise: ["Cloud Computing", "DevOps", "System Architecture", "Enterprise Solutions"],
      industryExp: "Senior Solutions Architect di PT Telkom Indonesia (2018-2021)",
      rating: 4.9,
      honorariumPerSKS: 750000,
      availability: "Senin-Kamis 14:00-17:00",
      email: "ahmad.susanto@lecturer.itk.ac.id",
      phone: "+62 812-3456-7890",
      totalSKS: 8,
      totalHonorarium: 6000000,
      activeCourses: 3,
      prodi: "Sistem Informasi",
      certifications: ["AWS Certified", "Google Cloud Professional", "CISSP"],
      languages: ["Indonesian", "English", "Mandarin"],
      bio: "Dosen praktisi dengan 15+ tahun pengalaman industri cloud computing. Mengajar mata kuliah Cloud Architecture, DevOps, dan System Integration melalui Program Praktisi Mengajar.",
      teachingCourses: [
        { code: "SI601", name: "Cloud Computing Architecture", sks: 3, students: 45, semester: "Ganjil 2024" },
        { code: "SI602", name: "DevOps Implementation", sks: 2, students: 38, semester: "Ganjil 2024" },
        { code: "SI603", name: "Enterprise System Design", sks: 3, students: 42, semester: "Genap 2024" }
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
      name: "Maya Sari, M.Kom",
      role: "Dosen Praktisi - Mobile Development",
      expertise: ["Mobile Development", "React Native", "Flutter", "UI/UX Design"],
      industryExp: "Senior Mobile Developer di Gojek (2019-2022)",
      rating: 4.8,
      honorariumPerSKS: 650000,
      availability: "Selasa-Jumat 13:00-16:00",
      email: "maya.sari@lecturer.itk.ac.id",
      phone: "+62 813-9876-5432",
      totalSKS: 6,
      totalHonorarium: 3900000,
      activeCourses: 2,
      prodi: "Informatika",
      certifications: ["Google Mobile Developer", "Flutter Certified", "AWS Mobile"],
      languages: ["Indonesian", "English"],
      bio: "Mantan lead developer di unicorn startup dengan pengalaman mengembangkan aplikasi mobile untuk jutaan pengguna. Mengajar pengembangan aplikasi mobile modern dan user experience design.",
      teachingCourses: [
        { code: "IF501", name: "Mobile Application Development", sks: 3, students: 52, semester: "Ganjil 2024" },
        { code: "IF502", name: "User Interface Design", sks: 3, students: 47, semester: "Genap 2024" }
      ],
      practisiMengajarProgram: {
        year: "2024",
        category: "Teknologi Informasi",
        funding: "Kemendikbud-Ristek",
        duration: "1 Tahun Akademik"
      }
    },
    {
      id: 3,
      name: "Prof. Budi Santoso",
      role: "Dosen Praktisi - IoT & Industry 4.0",
      expertise: ["Internet of Things", "Embedded Systems", "Sensor Networks", "Industrial Automation"],
      industryExp: "Chief Technology Officer di PT Industri Teknologi (2015-2020)",
      rating: 5.0,
      honorariumPerSKS: 850000,
      availability: "Senin-Rabu 09:00-12:00",
      email: "budi.santoso@lecturer.itk.ac.id",
      phone: "+62 811-2468-1357",
      totalSKS: 9,
      totalHonorarium: 7650000,
      activeCourses: 3,
      prodi: "Teknik Elektro",
      certifications: ["Cisco IoT", "Industrial IoT Professional", "PMP Certified"],
      languages: ["Indonesian", "English", "German"],
      bio: "Professor dengan 20+ tahun pengalaman di industri manufaktur dan IoT. Mengajar mata kuliah IoT, Industry 4.0, dan Smart Manufacturing Systems.",
      teachingCourses: [
        { code: "TE501", name: "Internet of Things", sks: 3, students: 41, semester: "Ganjil 2024" },
        { code: "TE502", name: "Industry 4.0 Implementation", sks: 3, students: 35, semester: "Ganjil 2024" },
        { code: "TE503", name: "Smart Manufacturing Systems", sks: 3, students: 28, semester: "Genap 2024" }
      ],
      practisiMengajarProgram: {
        year: "2024",
        category: "Teknologi Industri",
        funding: "Kemendikbud-Ristek",
        duration: "1 Tahun Akademik"
      }
    },
    {
      id: 4,
      name: "Dr. Linda Permata",
      role: "Dosen Praktisi - Digital Government",
      expertise: ["E-Government", "Digital Policy", "Public Administration Tech", "Data Analytics"],
      industryExp: "Digital Transformation Lead di Pemkot Balikpapan (2020-2023)",
      rating: 4.7,
      honorariumPerSKS: 700000,
      availability: "Kamis-Sabtu 10:00-15:00",
      email: "linda.permata@lecturer.itk.ac.id",
      phone: "+62 814-1357-2468",
      totalSKS: 6,
      totalHonorarium: 4200000,
      activeCourses: 2,
      prodi: "Sistem Informasi",
      certifications: ["Certified Government CIO", "Digital Transformation Professional"],
      languages: ["Indonesian", "English"],
      bio: "Spesialis transformasi digital pemerintahan dengan track record implementasi e-government di berbagai daerah. Mengajar Digital Government dan Public Service Innovation.",
      teachingCourses: [
        { code: "SI501", name: "Digital Government Systems", sks: 3, students: 39, semester: "Ganjil 2024" },
        { code: "SI502", name: "Public Service Innovation", sks: 3, students: 44, semester: "Genap 2024" }
      ],
      practisiMengajarProgram: {
        year: "2024",
        category: "Administrasi Publik Digital",
        funding: "Kemendikbud-Ristek", 
        duration: "1 Tahun Akademik"
      }
    }
  ];

  // Research data
  const researchData = [
    {
      id: 1,
      title: "Implementasi Machine Learning untuk Prediksi Cuaca Ekstrem di Kalimantan Timur",
      authors: ["Dr. Maya Sari", "Ahmad Fauzi", "Siti Nurhaliza"],
      type: "Publikasi",
      category: "Jurnal Internasional",
      year: 2024,
      citations: 23,
      downloads: 456,
      status: "Published",
      journal: "Journal of Climate Informatics",
      quartile: "Q1",
      sintaScore: "S1",
      googleScholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=id&user=abc123",
      doi: "10.1016/j.climateinf.2024.03.015",
      abstract: "Penelitian ini mengembangkan model machine learning untuk memprediksi cuaca ekstrem di Kalimantan Timur menggunakan data historis 20 tahun. Model ensemble learning yang dikembangkan mampu memprediksi cuaca ekstrem dengan akurasi 94.2%.",
      keywords: ["Machine Learning", "Weather Prediction", "Extreme Weather", "Kalimantan", "Climate Change"],
      funding: "Hibah Penelitian Fundamental DIKTI 2024 - Rp150.000.000",
      collaborations: ["BMKG", "Universitas Mulawarman", "Universitas Lambung Mangkurat"],
      implementation: "Model telah diimplementasikan di 5 stasiun cuaca BMKG Kaltim",
      socialImpact: "Membantu 200+ petani dalam perencanaan tanam dan panen",
      sisterEntry: "SISTER-2024-ITK-001",
      reportUrl: "ahmad-research.fsti-itk.ac.id/weather-prediction-2024.pdf"
    },
    {
      id: 2,
      title: "Sistem Monitoring IoT untuk Optimasi Produktivitas Kelapa Sawit",
      authors: ["Prof. Budi Santoso", "Dr. Ahmad Susanto"],
      type: "HKI",
      category: "Paten",
      year: 2024,
      citations: 0,
      downloads: 0,
      status: "Dalam Proses DJKI",
      patentNumber: "Menunggu Nomor DJKI",
      applicationDate: "2024-03-15",
      djkiStatus: "Substantive Examination",
      estimatedGrant: "2025-Q2",
      abstract: "Sistem monitoring berbasis IoT yang mengintegrasikan sensor kelembaban, pH, nutrisi tanah, dan kondisi cuaca untuk optimasi produktivitas kelapa sawit. Sistem dilengkapi dengan algoritma prediktif untuk rekomendasi pemupukan dan penyiraman.",
      keywords: ["IoT", "Palm Oil", "Agriculture", "Sensor Network", "Productivity Optimization"],
      applicant: "Institut Teknologi Kalimantan",
      inventors: ["Prof. Budi Santoso", "Dr. Ahmad Susanto", "Ir. Bambang Wijaya"],
      scope: "Indonesia",
      djkiReference: "P00202400789",
      patentCost: "Rp25.000.000 (ditanggung ITK)",
      commercialization: "Negosiasi lisensi dengan PT Perkebunan Nusantara XIII",
      implementation: "Prototype diuji di kebun percobaan ITK",
      economicImpact: "Potensi peningkatan produktivitas 15-20%",
      reportUrl: "budi-research.fsti-itk.ac.id/iot-palm-oil-patent-2024.pdf"
    },
    {
      id: 3,
      title: "Digitalisasi UMKM Kalimantan melalui Platform E-Commerce Terintegrasi",
      authors: ["Dr. Linda Permata", "Maya Sari, M.Kom", "Tim PkM FSTI"],
      type: "PkM",
      category: "Pengabdian Masyarakat",
      year: 2024,
      citations: 8,
      downloads: 234,
      status: "Completed",
      location: "Samarinda, Balikpapan, Bontang",
      duration: "6 bulan",
      budget: "Rp250.000.000 (Hibah PkM DIKTI)",
      abstract: "Program pengabdian masyarakat untuk digitalisasi UMKM di Kalimantan Timur melalui pelatihan dan implementasi platform e-commerce. Program melibatkan 150 UMKM dengan fokus pada produk kerajinan dan makanan khas Kalimantan.",
      beneficiaries: "150 UMKM, 300 pengrajin, 50 kelompok usaha",
      activities: ["Pelatihan digital marketing", "Pembuatan website e-commerce", "Pelatihan manajemen inventory", "Pendampingan 3 bulan"],
      outcomes: "75% UMKM meningkat omzet 40-60%, 90% UMKM aktif menggunakan platform digital",
      partnerships: ["Dinas Koperasi Kaltim", "Bank Kaltimtara", "Kadin Kaltim"],
      sustainability: "Platform tetap aktif dengan dukungan komunitas UMKM",
      mediaOutlets: ["Tribun Kaltim", "Antara Kaltim", "Kaltim Post"],
      sisterEntry: "SISTER-2024-ITK-PkM-003",
      lppmApproval: "LPPM/ITK/2024/PkM/087",
      reportUrl: "linda-research.fsti-itk.ac.id/pkm-umkm-digital-2024.pdf",
      monitoringUrl: "pkm-umkm.fsti-itk.ac.id"
    },
    {
      id: 4,
      title: "Blockchain-based Supply Chain Management untuk Industri Kelapa Sawit",
      authors: ["Dr. Ahmad Susanto", "Prof. Budi Santoso", "Dr. Yohanes Khoirul"],
      type: "Publikasi",
      category: "Jurnal Nasional Terakreditasi",
      year: 2024,
      citations: 15,
      downloads: 312,
      status: "Published",
      journal: "Jurnal Teknologi Industri Pertanian Indonesia",
      sintaScore: "S2",
      sintaUrl: "https://sinta.kemdikbud.go.id/journals/detail?id=4567",
      issn: "2089-6131",
      volume: "Vol. 33 No. 1",
      pages: "15-28",
      abstract: "Implementasi teknologi blockchain untuk transparansi dan traceability supply chain kelapa sawit dari kebun hingga konsumen akhir. Sistem memungkinkan tracking real-time dan verifikasi sustainable palm oil certification.",
      keywords: ["Blockchain", "Supply Chain", "Palm Oil", "Traceability", "Sustainability"],
      implementation: "Pilot project di 3 perusahaan kelapa sawit Kaltim",
      collaboration: ["PT SMART Tbk", "PT Astra Agro Lestari", "RSPO Indonesia"],
      funding: "Hibah Penelitian Terapan DIKTI 2024 - Rp200.000.000",
      businessImpact: "Peningkatan premium price 10-15% untuk certified sustainable palm oil",
      sisterEntry: "SISTER-2024-ITK-002",
      reportUrl: "ahmad-research.fsti-itk.ac.id/blockchain-supply-chain-2024.pdf"
    },
    {
      id: 5,
      title: "Penghargaan Best Paper Award - International Conference on Tropical Agriculture Technology",
      authors: ["Maya Sari, M.Kom", "Dr. Linda Permata"],
      type: "Penghargaan",
      category: "International Recognition",
      year: 2024,
      citations: 0,
      downloads: 0,
      status: "Received",
      conference: "International Conference on Tropical Agriculture Technology 2024",
      location: "Kuala Lumpur, Malaysia",
      paperTitle: "AI-Driven Crop Yield Prediction for Sustainable Agriculture in Tropical Regions",
      recognition: "Best Paper Award out of 280 submissions",
      committee: "International Association of Agricultural Engineers",
      significance: "Meningkatkan reputasi internasional ITK dan FSTI",
      followup: "Invited sebagai keynote speaker di konferensi 2025",
      mediaCoverage: "Featured in IEEE Computer Society Newsletter",
      newsUrl: "maya-achievement.fsti-itk.ac.id/best-paper-2024.html",
      certificateUrl: "maya-achievement.fsti-itk.ac.id/certificate-best-paper-2024.pdf",
      itkNewsUrl: "https://itk.ac.id/news/dosen-fsti-raih-best-paper-award-malaysia",
      sintaPoints: "+25 poin SINTA untuk ITK"
    }
  ];

  // Industry partners data
  const industryPartnersData = [
    {
      id: 1,
      name: "PT Teknologi Nusantara",
      type: "IT Solutions Provider",
      sector: "Technology",
      size: "Enterprise (500+ employees)",
      established: 2020,
      contact: {
        person: "Bambang Wijaya",
        position: "Chief Technology Officer",
        email: "bambang.wijaya@teknologi-nusantara.com",
        phone: "+62 541-555-0123"
      },
      location: "Balikpapan, Kalimantan Timur",
      website: "https://teknologi-nusantara.com",
      activePrograms: 5,
      collaborationValue: 85000000,
      partnershipType: "Strategic Academic Partner",
      collaborationTypes: ["Magang Mahasiswa", "Hibah Penelitian", "Guest Lecture", "Donasi Lab"],
      keyPrograms: [
        { title: "Program Magang Software Developer", value: 25000000, duration: "6 bulan", beneficiaries: 15, type: "Internship" },
        { title: "Hibah Penelitian Cloud Computing", value: 40000000, duration: "1 tahun", beneficiaries: 8, type: "Research Grant" },
        { title: "Donasi Software Development Tools", value: 20000000, duration: "Permanent", beneficiaries: 200, type: "Facility Donation" }
      ],
      facultyEngaged: ["Dr. Ahmad Susanto", "Maya Sari, M.Kom"],
      studentInternships: 15,
      graduatesHired: 8,
      satisfactionRating: 4.8,
      mouStatus: "Active",
      mouSigned: "2023-03-15",
      mouExpiry: "2026-03-15"
    },
    {
      id: 2,
      name: "CV Digital Borneo",
      type: "Software Development",
      sector: "Digital Services",
      size: "Medium (50-200 employees)",
      established: 2021,
      contact: {
        person: "Sarah Kusuma",
        position: "Managing Director", 
        email: "sarah.kusuma@digitalborneo.id",
        phone: "+62 542-555-0456"
      },
      location: "Samarinda, Kalimantan Timur",
      website: "https://digitalborneo.id",
      activePrograms: 3,
      collaborationValue: 45000000,
      partnershipType: "Academic Collaboration",
      collaborationTypes: ["Magang Mahasiswa", "Final Project Mentoring", "Job Fair"],
      keyPrograms: [
        { title: "Program Magang Mobile Developer", value: 20000000, duration: "4 bulan", beneficiaries: 12, type: "Internship" },
        { title: "Mentoring Tugas Akhir", value: 15000000, duration: "1 tahun", beneficiaries: 20, type: "Academic Support" },
        { title: "Job Fair & Recruitment", value: 10000000, duration: "Annual", beneficiaries: 150, type: "Career Development" }
      ],
      facultyEngaged: ["Maya Sari, M.Kom", "Dr. Linda Permata"],
      studentInternships: 12,
      graduatesHired: 6,
      satisfactionRating: 4.7,
      mouStatus: "Active",
      mouSigned: "2023-08-20",
      mouExpiry: "2025-08-20"
    },
    {
      id: 3,
      name: "PT Kalimantan Energy Innovation",
      type: "Energy & Mining Technology",
      sector: "Energy",
      size: "Large (200-500 employees)",
      established: 2019,
      contact: {
        person: "Dr. Ir. Agus Setiawan",
        position: "Innovation Director",
        email: "agus.setiawan@kaleng-innovation.com",
        phone: "+62 548-555-0789"
      },
      location: "Bontang, Kalimantan Timur", 
      website: "https://kaleng-innovation.com",
      activePrograms: 4,
      collaborationValue: 120000000,
      partnershipType: "Research & Innovation Partner",
      collaborationTypes: ["Hibah Penelitian", "Program Beasiswa", "Donasi Lab IoT", "Training"],
      keyPrograms: [
        { title: "Hibah Penelitian Smart Grid", value: 60000000, duration: "2 tahun", beneficiaries: 10, type: "Research Grant" },
        { title: "Beasiswa Mahasiswa Teknik", value: 30000000, duration: "Annual", beneficiaries: 6, type: "Scholarship" },
        { title: "Donasi Lab IoT Industry 4.0", value: 30000000, duration: "Permanent", beneficiaries: 180, type: "Facility Donation" }
      ],
      facultyEngaged: ["Prof. Budi Santoso", "Dr. Ahmad Susanto"],
      studentInternships: 10,
      graduatesHired: 4,
      satisfactionRating: 4.9,
      mouStatus: "Active", 
      mouSigned: "2022-11-10",
      mouExpiry: "2025-11-10"
    },
    {
      id: 4,
      name: "Bank Kalimantan Digital",
      type: "Financial Technology",
      sector: "Banking & Finance", 
      size: "Enterprise (1000+ employees)",
      established: 2018,
      contact: {
        person: "Rini Handayani",
        position: "Head of Digital Innovation",
        email: "rini.handayani@bankkaldig.co.id",
        phone: "+62 541-555-0321"
      },
      location: "Balikpapan, Kalimantan Timur",
      website: "https://bankkaldig.co.id",
      activePrograms: 3,
      collaborationValue: 65000000,
      partnershipType: "Industry Collaboration",
      collaborationTypes: ["Program CSR", "Beasiswa", "Guest Lecture", "Recruitment"],
      keyPrograms: [
        { title: "Program CSR Digital Literacy", value: 35000000, duration: "1 tahun", beneficiaries: 100, type: "CSR Program" },
        { title: "Beasiswa Prestasi Akademik", value: 20000000, duration: "Annual", beneficiaries: 8, type: "Scholarship" },
        { title: "Guest Lecture Fintech", value: 10000000, duration: "Semester", beneficiaries: 80, type: "Academic Support" }
      ],
      facultyEngaged: ["Dr. Ahmad Susanto", "Dr. Linda Permata"],
      studentInternships: 8,
      graduatesHired: 12,
      satisfactionRating: 4.6,
      mouStatus: "Active",
      mouSigned: "2023-01-25", 
      mouExpiry: "2026-01-25"
    }
  ];

  const tabs = [
    { id: 'mbkm', label: 'Platform MBKM', icon: Users, color: 'bg-blue-500', url: 'mbkm.fsti-itk.ac.id' },
    { id: 'faculty', label: 'Portal Dosen', icon: BookOpen, color: 'bg-purple-500', url: 'faculty.fsti-itk.ac.id' },
    { id: 'research', label: 'Repositori Riset', icon: Award, color: 'bg-green-500', url: 'research.fsti-itk.ac.id' },
    { id: 'industry', label: 'Kolaborasi Industri', icon: Building, color: 'bg-orange-500', url: 'industry.fsti-itk.ac.id' }
  ];

  // Filter functions
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesProdi = filterProdi === 'all' || project.prodi === filterProdi;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesProdi && matchesStatus;
  });

  // Shared Components
  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend, onClick }) => (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-105' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
          {trend && (
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+{trend}% dari bulan lalu</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color.replace('text', 'bg').replace('600', '100')}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  // MBKM Components
  const ProjectCard = ({ project, onClick }) => {
    const getStatusColor = (status) => {
      switch(status) {
        case 'Live': return 'bg-green-100 text-green-800';
        case 'Development': return 'bg-blue-100 text-blue-800';
        case 'Testing': return 'bg-yellow-100 text-yellow-800';
        case 'Research': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 cursor-pointer transform hover:scale-102" onClick={() => onClick(project)}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 flex-1 mr-2">{project.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-1">Oleh: <span className="font-medium">{project.student}</span></p>
          <p className="text-xs text-gray-500 mb-2">{project.prodi} • Angkatan {project.angkatan}</p>
          
          <div className="flex items-center mb-2">
            <Clock className="h-3 w-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">Durasi: {project.timeline.duration}</span>
            <div className="ml-auto">
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{project.progress}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.tech.slice(0, 3).map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{tech}</span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">+{project.tech.length - 3}</span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
            <Globe className="h-4 w-4 mr-1" />
            {project.url}
          </button>
          <div className="flex space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Eye className="h-4 w-4 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ExternalLink className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProjectDetailModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Deskripsi Proyek</h3>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Fitur Utama</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Teknologi yang Digunakan</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Timeline Pengerjaan</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Mulai: {new Date(project.timeline.start).toLocaleDateString('id-ID')}</span>
                      <span className="text-sm text-gray-600">Selesai: {new Date(project.timeline.end).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">Progress: {project.progress}%</span>
                      <span className="text-sm text-gray-600">Durasi: {project.timeline.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Info Mahasiswa</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{project.student}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{project.prodi}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">Angkatan {project.angkatan}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Pembimbing</h3>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold text-sm">
                        {project.mentor.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{project.mentor}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                    onClick={() => window.open(project.demo, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Lihat Demo
                  </button>
                  <button 
                    className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    <GitBranch className="h-4 w-4 mr-2" />
                    Source Code
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Faculty Components
  const FacultyCard = ({ faculty, onClick }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => onClick(faculty)}>
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
          <span className="text-purple-600 font-bold text-lg">
            {faculty.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{faculty.name}</h3>
          <p className="text-sm text-gray-600 mb-1">{faculty.role}</p>
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < faculty.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="text-sm text-gray-600 ml-2">({faculty.rating}/5)</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-2"><strong>Keahlian:</strong></p>
        <div className="flex flex-wrap gap-1">
          {faculty.expertise.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">{skill}</span>
          ))}
          {faculty.expertise.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">+{faculty.expertise.length - 3}</span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-1"><strong>Pengalaman Industri:</strong></p>
        <p className="text-xs text-gray-600">{faculty.industryExp}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-purple-600">{faculty.totalSKS}</div>
          <div className="text-xs text-gray-500">Total SKS</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">Rp{(faculty.totalHonorarium/1000000).toFixed(1)} Juta</div>
          <div className="text-xs text-gray-500">Honorarium</div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
          Lihat Profil
        </button>
        <button 
          className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setShowBookingForm(true);
            setSelectedFaculty(faculty);
          }}
        >
          Info Mata Kuliah
        </button>
      </div>
    </div>
  );

  const FacultyDetailModal = ({ faculty, onClose }) => {
    if (!faculty) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Profil Dosen Praktisi</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mr-6">
                      <span className="text-purple-600 font-bold text-2xl">
                        {faculty.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{faculty.name}</h3>
                      <p className="text-gray-600 mb-2">{faculty.role}</p>
                      <p className="text-sm text-gray-500">{faculty.prodi}</p>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < faculty.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">({faculty.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{faculty.bio}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Keahlian & Sertifikasi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {faculty.expertise.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Sertifikasi</h4>
                      <div className="space-y-1">
                        {faculty.certifications.map((cert, i) => (
                          <div key={i} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm text-gray-700">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Mata Kuliah yang Diampu</h3>
                  <div className="space-y-3">
                    {faculty.teachingCourses.map((course, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-800">{course.name}</h4>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {course.sks} SKS
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Kode:</strong> {course.code}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Mahasiswa:</strong> {course.students} orang • <strong>Semester:</strong> {course.semester}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Program Praktisi Mengajar</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Kemendikbud-Ristek Program</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Tahun:</span>
                        <span className="ml-2 font-medium">{faculty.practisiMengajarProgram.year}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Kategori:</span>
                        <span className="ml-2 font-medium">{faculty.practisiMengajarProgram.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Durasi:</span>
                        <span className="ml-2 font-medium">{faculty.practisiMengajarProgram.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Pendanaan:</span>
                        <span className="ml-2 font-medium">{faculty.practisiMengajarProgram.funding}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Kontak</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{faculty.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{faculty.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{faculty.availability}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Statistik Pengajaran</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total SKS</span>
                      <span className="text-sm font-medium">{faculty.totalSKS} SKS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Honorarium Total</span>
                      <span className="text-sm font-medium">Rp {(faculty.totalHonorarium/1000000).toFixed(1)} Juta</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Mata Kuliah Aktif</span>
                      <span className="text-sm font-medium">{faculty.activeCourses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Honorarium per SKS</span>
                      <span className="text-sm font-medium">Rp {(faculty.honorariumPerSKS/1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
                    onClick={() => {
                      setShowBookingForm(true);
                      setSelectedFaculty(faculty);
                    }}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Lihat Jadwal Mengajar
                  </button>
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Kontak Dosen
                  </button>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Silabus Mata Kuliah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Research Components
  const ResearchCard = ({ research, onClick }) => {
    const getTypeColor = (type) => {
      switch(type) {
        case 'Publikasi': return 'bg-blue-100 text-blue-800';
        case 'HKI': return 'bg-purple-100 text-purple-800';
        case 'PkM': return 'bg-green-100 text-green-800';
        case 'Penghargaan': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getStatusColor = (status) => {
      switch(status) {
        case 'Published': return 'bg-green-50 text-green-700';
        case 'Dalam Proses DJKI': return 'bg-orange-50 text-orange-700';
        case 'Completed': return 'bg-blue-50 text-blue-700';
        case 'Received': return 'bg-purple-50 text-purple-700';
        default: return 'bg-gray-50 text-gray-700';
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 cursor-pointer" onClick={() => onClick(research)}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 flex-1 mr-2 line-clamp-2">{research.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(research.type)}`}>
            {research.type}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-2">Authors: {research.authors.join(', ')}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500">Tahun: {research.year}</span>
          {research.sintaScore && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">SINTA {research.sintaScore}</span>
          )}
          {research.sisterEntry && (
            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">SISTER</span>
          )}
          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(research.status)}`}>
            {research.status}
          </span>
        </div>

        {research.funding && (
          <div className="mb-2">
            <span className="text-xs text-gray-500">Funding: </span>
            <span className="text-xs text-green-700 font-medium">
              {research.funding.split(' - ')[0]}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {research.keywords?.slice(0, 3).map((keyword, i) => (
            <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">{keyword}</span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            Lihat Detail
          </button>
          <div className="flex space-x-2">
            {research.reportUrl && (
              <button className="p-1 hover:bg-gray-100 rounded" title="Download Report">
                <Download className="h-4 w-4 text-gray-500" />
              </button>
            )}
            {(research.googleScholarUrl || research.sintaUrl) && (
              <button className="p-1 hover:bg-gray-100 rounded" title="External Link">
                <ExternalLink className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Industry Components  
  const PartnerCard = ({ partner, onClick }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => onClick(partner)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
            <Building className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{partner.name}</h3>
            <p className="text-sm text-gray-600">{partner.type}</p>
            <p className="text-xs text-gray-500">{partner.location}</p>
          </div>
        </div>
        <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
          Since {partner.established}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-orange-600">{partner.activePrograms}</div>
          <div className="text-xs text-gray-500">Program Aktif</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">Rp{(partner.collaborationValue/1000000).toFixed(0)} Juta</div>
          <div className="text-xs text-gray-500">Nilai Kolaborasi</div>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-600">{partner.studentInternships}</div>
          <div className="text-xs text-gray-500">Mahasiswa</div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-2"><strong>Jenis Kolaborasi:</strong></p>
        <div className="flex flex-wrap gap-1">
          {partner.collaborationTypes.slice(0, 2).map((type, i) => (
            <span key={i} className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs">{type}</span>
          ))}
          {partner.collaborationTypes.length > 2 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">+{partner.collaborationTypes.length - 2}</span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">MoU Status:</span>
          <span className={`text-xs px-2 py-1 rounded ${
            partner.mouStatus === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {partner.mouStatus}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">Berlaku hingga:</span>
          <span className="text-xs text-gray-600">{new Date(partner.mouExpiry).toLocaleDateString('id-ID')}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
          Lihat Program
        </button>
        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Ajukan Kerjasama
        </button>
      </div>
    </div>
  );

  // Form Components
  const ApplicationForm = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Formulir Aplikasi MBKM</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Masukkan nama lengkap" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NIM</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Contoh: 11190910000xxx" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Program Studi</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sistem Informasi</option>
                  <option>Informatika</option>
                  <option>Teknik Elektro</option>
                  <option>Bisnis Digital</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Angkatan</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kegiatan MBKM</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Magang Pengembang (3-6 bulan)</option>
                <option>Riset Independen (1 semester)</option>
                <option>Proyek Kemanusiaan (3-4 bulan)</option>
                <option>Studi Independen Bersertifikat</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul Proyek yang Diinginkan</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Contoh: Sistem E-Commerce untuk UMKM Kalimantan" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi & Motivasi</label>
              <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Jelaskan mengapa Anda tertarik dengan proyek ini dan bagaimana proyek ini akan memberikan dampak..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload CV & Portfolio</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drag & drop files atau <span className="text-blue-600 cursor-pointer">browse</span></p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC max 10MB</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Batal
              </button>
              <button type="submit" className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Send className="h-4 w-4 mr-2" />
                Kirim Aplikasi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const CourseInfoForm = ({ faculty, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        <div className="border-b p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Informasi Mata Kuliah</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold">{faculty?.name}</h3>
            <p className="text-sm text-gray-600">{faculty?.role}</p>
            <p className="text-sm text-green-600 font-medium">Honorarium: Rp {faculty?.honorariumPerSKS?.toLocaleString()}/SKS</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mata Kuliah yang Diminati</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                {faculty?.teachingCourses?.map((course, i) => (
                  <option key={i}>{course.code} - {course.name} ({course.sks} SKS)</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                  <option>Ganjil 2024</option>
                  <option>Genap 2024</option>
                  <option>Ganjil 2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hari</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                  <option>Senin</option>
                  <option>Selasa</option>
                  <option>Rabu</option>
                  <option>Kamis</option>
                  <option>Jumat</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Tersedia</label>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {faculty?.availability}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Program Praktisi Mengajar</label>
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <p><strong>Tahun:</strong> {faculty?.practisiMengajarProgram?.year}</p>
                <p><strong>Kategori:</strong> {faculty?.practisiMengajarProgram?.category}</p>
                <p><strong>Pendanaan:</strong> {faculty?.practisiMengajarProgram?.funding}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Tutup
              </button>
              <button type="submit" className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Download Silabus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Additional Form Components
  const SubmissionForm = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Submit Karya Ilmiah</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Karya Ilmiah</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
                <option>Publikasi Jurnal</option>
                <option>Pengajuan HKI/Paten (via DJKI)</option>
                <option>Laporan PkM</option>
                <option>Penghargaan/Recognition</option>
                <option>Laporan Penelitian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul Karya</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" placeholder="Masukkan judul penelitian/karya" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Authors/Inventors</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" placeholder="Nama penulis/inventor (pisahkan dengan koma)" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tahun</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
                  <option>Published</option>
                  <option>Accepted</option>
                  <option>Under Review</option>
                  <option>Submitted</option>
                  <option>Dalam Proses DJKI</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Journal/Venue/Institution</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" placeholder="Nama jurnal, konferensi, atau institusi" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SINTA Score (jika ada)</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
                  <option value="">Tidak Ada</option>
                  <option>S1</option>
                  <option>S2</option>
                  <option>S3</option>
                  <option>S4</option>
                  <option>S5</option>
                  <option>S6</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Funding Source</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
                  <option>Hibah DIKTI</option>
                  <option>Hibah Internal ITK</option>
                  <option>Industry Partner</option>
                  <option>Self Funded</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Abstract/Deskripsi</label>
              <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" placeholder="Abstrak penelitian atau deskripsi karya..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" placeholder="Keywords (pisahkan dengan koma)" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Dokumen</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drag & drop PDF atau <span className="text-green-600 cursor-pointer">browse</span></p>
                <p className="text-xs text-gray-400 mt-1">PDF max 50MB • Untuk HKI: sertakan dokumen DJKI</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Sistem Terintegrasi</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Auto SISTER entry</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>SINTA compliance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>LPPM approval workflow</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>DJKI process tracking</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Batal
              </button>
              <button type="submit" className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                <Send className="h-4 w-4 mr-2" />
                Submit ke Sistem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const PartnershipForm = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Pengajuan Kerjasama Akademik</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Perusahaan</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="PT/CV Nama Perusahaan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Industri</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500">
                  <option>Technology</option>
                  <option>Manufacturing</option>
                  <option>Energy</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ukuran Perusahaan</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500">
                  <option>Startup (&lt;50 employees)</option>
                  <option>Medium (50-200 employees)</option>
                  <option>Large (200-500 employees)</option>
                  <option>Enterprise (500+ employees)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="Kota, Provinsi" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kerjasama yang Diinginkan</label>
              <div className="grid grid-cols-2 gap-2">
                {['Magang Mahasiswa', 'Hibah Penelitian', 'Program Beasiswa', 'Guest Lecture', 'Donasi Lab/Software', 'Program CSR', 'Job Fair & Recruitment', 'Training Program'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Program/Layanan yang Dapat Disediakan</label>
              <textarea rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="Jelaskan program kerjasama atau kontribusi yang dapat perusahaan berikan untuk pengembangan akademik..."></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="Nama & Jabatan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="contact@company.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimasi Nilai Program Kerjasama</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500">
                <option>&lt; Rp 20 Juta (Program kecil)</option>
                <option>Rp 20-50 Juta (Program sedang)</option>
                <option>Rp 50-100 Juta (Program besar)</option>
                <option>&gt; Rp 100 Juta (Program strategis)</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Batal
              </button>
              <button type="submit" className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center">
                <Send className="h-4 w-4 mr-2" />
                Ajukan Kerjasama
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const PortfolioGenerator = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Generator Portfolio Digital</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Informasi Personal</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Nama Lengkap" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                  <input type="text" placeholder="Tagline/Bio" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                  <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                  <input type="text" placeholder="No. Telepon" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Proyek MBKM</h3>
                <div className="space-y-3">
                  {filteredProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{project.title}</p>
                        <p className="text-xs text-gray-500">{project.tech.join(', ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Template</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Modern', 'Minimalis', 'Kreatif', 'Profesional'].map((template) => (
                    <div key={template} className="border border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                      <p className="text-sm font-medium">{template}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Preview Portfolio</h3>
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold">Nama Mahasiswa</h4>
                  <p className="text-gray-600">Full Stack Developer</p>
                  <div className="flex justify-center space-x-4 mt-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <Phone className="h-4 w-4 text-gray-500" />
                    <Globe className="h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Proyek Unggulan</h5>
                  <div className="space-y-2">
                    {filteredProjects.slice(0, 2).map((project) => (
                      <div key={project.id} className="border border-gray-200 rounded p-2">
                        <p className="font-medium text-sm">{project.title}</p>
                        <p className="text-xs text-gray-500">{project.tech.slice(0, 3).join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Keahlian</h5>
                  <div className="flex flex-wrap gap-1">
                    {['React', 'Node.js', 'Python', 'Laravel'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Batal
            </button>
            <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Platform Renderers
  const renderMBKMPlatform = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Mahasiswa Aktif" value="85" subtitle="Peserta MBKM" color="text-blue-600" trend="12" />
        <StatCard icon={FileText} title="Proyek Deployed" value="30+" subtitle="Aplikasi Live" color="text-green-600" trend="25" />
        <StatCard icon={Award} title="Sertifikat Diterbitkan" value="15" subtitle="Digital Blockchain" color="text-purple-600" trend="8" />
        <StatCard icon={TrendingUp} title="Tingkat Keberhasilan" value="78%" subtitle="Job Interview Rate" color="text-orange-600" trend="15" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari proyek, mahasiswa, atau teknologi..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" value={filterProdi} onChange={(e) => setFilterProdi(e.target.value)}>
              <option value="all">Semua Prodi</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Informatika">Informatika</option>
              <option value="Teknik Elektro">Teknik Elektro</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Semua Status</option>
              <option value="Live">Live</option>
              <option value="Development">Development</option>
              <option value="Testing">Testing</option>
              <option value="Research">Research</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={() => setShowApplicationForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Daftar MBKM
          </button>
          <button onClick={() => setShowPortfolioGenerator(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Buat Portfolio
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Sertifikat Digital
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pertumbuhan Proyek & Aplikasi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mbkmProjectsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="projects" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="applications" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori Proyek Populer</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Web Development', value: 12, color: '#3B82F6' },
                  { name: 'Mobile Development', value: 8, color: '#10B981' },
                  { name: 'IoT & Hardware', value: 6, color: '#F59E0B' },
                  { name: 'AI & Machine Learning', value: 4, color: '#8B5CF6' }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {[
                  { name: 'Web Development', value: 12, color: '#3B82F6' },
                  { name: 'Mobile Development', value: 8, color: '#10B981' },
                  { name: 'IoT & Hardware', value: 6, color: '#F59E0B' },
                  { name: 'AI & Machine Learning', value: 4, color: '#8B5CF6' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Program MBKM Internal Lab</h3>
            <p className="text-blue-100 mb-4">Magang 3-6 bulan dengan proyek industri nyata dan mentoring intensif</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-blue-100">Slot Tersedia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-blue-100">Mentor</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-blue-100">Job Placement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8/5</div>
                <div className="text-sm text-blue-100">Rating Alumni</div>
              </div>
            </div>
          </div>
          <button onClick={() => setShowApplicationForm(true)} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center">
            <ArrowRight className="h-4 w-4 mr-2" />
            Daftar Sekarang
          </button>
        </div>
      </div>
    </div>
  );

  const renderFacultyPortal = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Dosen Praktisi" value="12" subtitle="Active Consultants" color="text-purple-600" trend="15" />
        <StatCard icon={Building} title="Mitra Industri" value="7" subtitle="Active Partnerships" color="text-blue-600" trend="20" />
        <StatCard icon={DollarSign} title="Total Honorarium" value="Rp22 Juta" subtitle="Semester ini" color="text-green-600" trend="15" />
        <StatCard icon={CalendarIcon} title="Total SKS" value="29" subtitle="Semester ini" color="text-orange-600" trend="8" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Dosen Praktisi Aktif</h3>
          <div className="flex space-x-2">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Dosen
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Laporan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {facultyData.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} onClick={setSelectedFaculty} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pertumbuhan SKS & Honorarium</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={facultyActivitiesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sks" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="honorarium" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Teaching Faculty</h3>
          <div className="space-y-4">
            {facultyData.slice(0, 3).map((faculty, index) => (
              <div key={faculty.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{faculty.name}</p>
                    <p className="text-xs text-gray-500">{faculty.totalSKS} SKS mengajar</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">Rp{(faculty.totalHonorarium/1000000).toFixed(1)} Juta</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < faculty.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Program Praktisi Mengajar</h3>
            <p className="text-purple-100 mb-4">Dosen berpengalaman industri untuk pembelajaran yang relevan</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">29</div>
                <div className="text-sm text-purple-100">Total SKS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10</div>
                <div className="text-sm text-purple-100">Mata Kuliah</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-purple-100">Student Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Rp22 Juta</div>
                <div className="text-sm text-purple-100">Honorarium Semester</div>
              </div>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Daftar Praktisi
          </button>
        </div>
      </div>
    </div>
  );

  const renderResearchRepository = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={FileText} title="Karya Ilmiah" value="15" subtitle="Publikasi & Laporan" color="text-green-600" trend="20" />
        <StatCard icon={Award} title="HKI Diproses" value="3" subtitle="Via DJKI" color="text-blue-600" trend="15" />
        <StatCard icon={Target} title="Program PkM" value="8" subtitle="Community Impact" color="text-purple-600" trend="30" />
        <StatCard icon={TrendingUp} title="SINTA Score" value="S2" subtitle="ITK Ranking" color="text-orange-600" trend="5" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Sistem Dokumentasi Riset FSTI</h3>
          <div className="flex space-x-2">
            <button onClick={() => setShowSubmissionForm(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Submit Karya Ilmiah
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export SISTER
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {researchData.map((research) => (
            <ResearchCard key={research.id} research={research} onClick={setSelectedResearch} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress Riset & Dokumentasi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={researchMetricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="submissions" stroke="#10B981" strokeWidth={3} name="Submissions" />
              <Line type="monotone" dataKey="processed" stroke="#3B82F6" strokeWidth={3} name="Processed" />
              <Line type="monotone" dataKey="completed" stroke="#8B5CF6" strokeWidth={3} name="Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori Karya Ilmiah</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Publikasi Jurnal', value: 8, color: '#10B981' },
                  { name: 'HKI & Paten', value: 3, color: '#3B82F6' },
                  { name: 'Laporan PkM', value: 8, color: '#8B5CF6' },
                  { name: 'Penghargaan', value: 2, color: '#F59E0B' }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {[
                  { name: 'Publikasi Jurnal', value: 8, color: '#10B981' },
                  { name: 'HKI & Paten', value: 3, color: '#3B82F6' },
                  { name: 'Laporan PkM', value: 8, color: '#8B5CF6' },
                  { name: 'Penghargaan', value: 2, color: '#F59E0B' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Sistem Dokumentasi Riset FSTI</h3>
            <p className="text-green-100 mb-4">Terintegrasi dengan SINTA, SISTER, dan DJKI untuk compliance nasional</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">SISTER</div>
                <div className="text-sm text-green-100">Integration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">SINTA</div>
                <div className="text-sm text-green-100">Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">DJKI</div>
                <div className="text-sm text-green-100">HKI Process</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">LPPM</div>
                <div className="text-sm text-green-100">Approval</div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowSubmissionForm(true)}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Submit Karya Ilmiah
          </button>
        </div>
      </div>
    </div>
  );

  const renderIndustryCollaboration = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Building} title="Mitra Aktif" value="4" subtitle="Active Partners" color="text-orange-600" trend="15" />
        <StatCard icon={FileText} title="Program Kolaborasi" value="15" subtitle="Ongoing Programs" color="text-blue-600" trend="20" />
        <StatCard icon={DollarSign} title="Nilai Kolaborasi" value="Rp315 Juta" subtitle="Program Kerjasama" color="text-green-600" trend="25" />
        <StatCard icon={Users} title="Mahasiswa Terlibat" value="45" subtitle="Magang & Program" color="text-purple-600" trend="30" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Mitra Industri & Program Kerjasama</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowPartnershipForm(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajukan Kerjasama
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Laporan MoU
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {industryPartnersData.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} onClick={setSelectedPartner} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pertumbuhan Kolaborasi & Program</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={industryRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="collaboration" stroke="#F97316" fill="#F97316" fillOpacity={0.6} />
              <Area type="monotone" dataKey="programs" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Program Kolaborasi per Partner</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={industryPartnersData.slice(0, 4)} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="activePrograms" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Platform Kerjasama Industri</h3>
            <p className="text-orange-100 mb-4">Membangun ekosistem kolaborasi akademik-industri yang berkelanjutan</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">MoU</div>
                <div className="text-sm text-orange-100">Based Partnership</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm text-orange-100">Students Involved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-orange-100">Active Programs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-orange-100">Partnership Success</div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowPartnershipForm(true)}
            className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
          >
            Ajukan Kerjasama
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Lab Inovasi Digital</h1>
                  <p className="text-sm text-gray-600">FSTI - Institut Teknologi Kalimantan</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">Sistem Online</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-lg font-bold text-green-600">99.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? `${tab.color} text-white shadow-lg transform scale-105`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:block">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* URL Display */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-sm">
              https://{tabs.find(tab => tab.id === activeTab)?.url}
            </span>
            <div className="flex items-center space-x-1 ml-4">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-400">Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h2>
          <p className="text-gray-600 mt-1">
            {activeTab === 'mbkm' && 'Memberdayakan mahasiswa dengan pengalaman deployment aplikasi nyata (IKU 2)'}
            {activeTab === 'faculty' && 'Mengelola dosen praktisi dengan pengalaman industri untuk pembelajaran berkualitas (IKU 3)'}
            {activeTab === 'research' && 'Membuat riset FSTI dapat diakses secara global dan berdampak (IKU 5)'}
            {activeTab === 'industry' && 'Memfasilitasi kerjasama akademik-industri yang berkelanjutan dan saling menguntungkan (IKU 3)'}
          </p>
        </div>

        {/* Platform Content */}
        {activeTab === 'mbkm' && renderMBKMPlatform()}
        {activeTab === 'faculty' && renderFacultyPortal()}
        {activeTab === 'research' && renderResearchRepository()}
        {activeTab === 'industry' && renderIndustryCollaboration()}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                © 2025 Lab Inovasi Digital FSTI ITK. Mendukung pencapaian IKU 2, 3, dan 5.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Powered by:</span>
              <span className="text-sm bg-blue-600 px-2 py-1 rounded">Biznet VPS</span>
              <span className="text-sm bg-purple-600 px-2 py-1 rounded">React</span>
              <span className="text-sm bg-green-600 px-2 py-1 rounded">Node.js</span>
            </div>
          </div>
        </div>
      </div>

      {/* All Modals */}
      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {selectedFaculty && <FacultyDetailModal faculty={selectedFaculty} onClose={() => setSelectedFaculty(null)} />}
      {showApplicationForm && <ApplicationForm onClose={() => setShowApplicationForm(false)} />}
      {showPortfolioGenerator && <PortfolioGenerator onClose={() => setShowPortfolioGenerator(false)} />}
      {showBookingForm && <CourseInfoForm faculty={selectedFaculty} onClose={() => setShowBookingForm(false)} />}
      {showSubmissionForm && <SubmissionForm onClose={() => setShowSubmissionForm(false)} />}
      {showPartnershipForm && <PartnershipForm onClose={() => setShowPartnershipForm(false)} />}
    </div>
  );
};

export default App;