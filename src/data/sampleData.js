// src/data/sampleData.js - UPDATED dengan data IKU 3 & 5

// Existing data...
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

export const deploymentStatsData = [
  { month: 'Jul', deployed: 1, pending: 2, failed: 0 },
  { month: 'Agu', deployed: 2, pending: 3, failed: 1 },
  { month: 'Sep', deployed: 3, pending: 4, failed: 0 },
  { month: 'Okt', deployed: 5, pending: 3, failed: 1 },
  { month: 'Nov', deployed: 7, pending: 2, failed: 0 },
  { month: 'Des', deployed: 9, pending: 1, failed: 0 },
  { month: 'Jan', deployed: 10, pending: 1, failed: 0 }
];

export const serverResourcesData = [
  { name: 'CPU Usage', value: 28, color: '#3B82F6' },
  { name: 'Memory', value: 52, color: '#10B981' },
  { name: 'Storage', value: 73, color: '#F59E0B' },
  { name: 'Bandwidth', value: 41, color: '#8B5CF6' }
];

export const serverInfoData = {
  storage: "500GB SSD",
  ram: "8GB DDR4",
  cpu: "4 vCPU Intel",
  bandwidth: "Unlimited",
  cpanelFeatures: [
    "Auto SSL Certificate",
    "File Manager",
    "MySQL Database",
    "Subdomain Manager",
    "Backup & Restore"
  ]
};

// ======= 🆕 IKU 3 DATA - Faculty Activity Tracker =======

export const externalTeachingData = [
  {
    id: 1,
    facultyId: 1,
    facultyName: "Aidil Saputra Kirsan, M.Tr.Kom",
    institution: "Universitas Mulawarman",
    course: "Arsitektur Komputasi Awan",
    type: "Dosen Tamu", // Dosen Tamu, Profesor Tamu, Koordinator Mata Kuliah
    semester: "Ganjil 2024",
    sks: 2,
    students: 45,
    startDate: "2024-08-15",
    endDate: "2024-12-15",
    status: "Aktif",
    location: "Samarinda, Kaltim",
    honorarium: 8000000,
    evaluation: 4.8,
    certificateUrl: "external-teaching.fsti-itk.ac.id/aidil-unmul-2024.pdf"
  },
  {
    id: 2,
    facultyId: 2,
    facultyName: "Dr. Rina Marwanti",
    institution: "Politeknik Negeri Balikpapan",
    course: "Sistem IoT Industri",
    type: "Profesor Tamu",
    semester: "Ganjil 2024",
    sks: 3,
    students: 35,
    startDate: "2024-09-01",
    endDate: "2024-12-20",
    status: "Aktif",
    location: "Balikpapan, Kaltim",
    honorarium: 12000000,
    evaluation: 4.9,
    certificateUrl: "external-teaching.fsti-itk.ac.id/rina-polnep-2024.pdf"
  },
  {
    id: 3,
    facultyId: 3,
    facultyName: "Dr. Yohanes Khoirul",
    institution: "STMIK Widya Cipta Dharma",
    course: "Aplikasi Pembelajaran Mesin",
    type: "Dosen Tamu",
    semester: "Genap 2024",
    sks: 2,
    students: 28,
    startDate: "2024-02-01",
    endDate: "2024-06-15",
    status: "Selesai",
    location: "Samarinda, Kaltim",
    honorarium: 6000000,
    evaluation: 4.7,
    certificateUrl: "external-teaching.fsti-itk.ac.id/yohanes-stmik-2024.pdf"
  }
];

export const researchCollaborationData = [
  {
    id: 1,
    title: "Platform Pertanian Cerdas untuk Perkebunan Kelapa Sawit",
    leadFaculty: "Aidil Saputra Kirsan, M.Tr.Kom",
    collaborators: ["Dr. Ahmad Fauzi (Unmul)", "Dr. Sarah (IPB)", "Ir. Budi (PT SMART)"],
    institutions: ["ITK", "Universitas Mulawarman", "IPB University", "PT SMART Tbk"],
    type: "Riset Multi-Institusi", // Riset Multi-Institusi, Industri-Akademik, Internasional
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    status: "Aktif",
    funding: 150000000,
    fundingSource: "Hibah Penelitian Kolaborasi Indonesia (HPKI)",
    targetOutcome: "Publikasi Q2 Internasional + HKI",
    currentProgress: 65,
    siskaRisetId: "HPKI-2024-ITK-001",
    publications: [
      { title: "Sistem Monitoring Berbasis IoT", status: "Dalam Review", journal: "Journal of Agricultural Technology" }
    ]
  },
  {
    id: 2,
    title: "Pengembangan Ekosistem Fintek untuk Indonesia Timur",
    leadFaculty: "Dr. Linda Permata",
    collaborators: ["Dr. Indra (Unhas)", "Dr. Maya (Bank Indonesia)", "Tim Developer Bank Kalsel"],
    institutions: ["ITK", "Universitas Hasanuddin", "Bank Indonesia", "Bank Kalsel"],
    type: "Industri-Akademik",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    status: "Aktif",
    funding: 200000000,
    fundingSource: "Bank Indonesia Institute + Matching Fund ITK",
    targetOutcome: "Prototype Aplikasi + Model Bisnis",
    currentProgress: 45,
    siskaRisetId: "PKBI-2024-ITK-003",
    publications: [
      { title: "Adopsi Fintek di Indonesia Timur", status: "Terbit", journal: "Indonesian Journal of Economics" }
    ]
  },
  {
    id: 3,
    title: "IoT Industri untuk Optimasi Manufaktur Kimia",
    leadFaculty: "Dr. Rina Marwanti",
    collaborators: ["Dr. Teguh (ITS)", "Tim Engineering PKT", "Dr. Hans (TU Delft)"],
    institutions: ["ITK", "ITS Surabaya", "PT Pupuk Kalimantan Timur", "TU Delft Netherlands"],
    type: "Internasional",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    status: "Aktif",
    funding: 350000000,
    fundingSource: "World Class Research (WCR) + EU Horizon Europe",
    targetOutcome: "Paten + Implementasi di 3 Pabrik",
    currentProgress: 30,
    siskaRisetId: "WCR-2024-ITK-005",
    publications: [
      { title: "Arsitektur IoT Industri", status: "Dalam Persiapan", journal: "IEEE Transactions on Industrial Informatics" }
    ]
  }
];

export const industryConsultationData = [
  {
    id: 1,
    consultantId: 1,
    consultantName: "Aidil Saputra Kirsan, M.Tr.Kom",
    clientCompany: "PT Astra Agro Lestari",
    projectTitle: "Migrasi Infrastruktur Cloud untuk Manajemen Perkebunan",
    industry: "Pertanian",
    type: "Konsultasi Teknologi", // Konsultasi Teknologi, Konsultasi Strategis, Konsultasi Implementasi
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    status: "Selesai",
    duration: "3 bulan",
    totalValue: 45000000,
    expertise: ["Komputasi Awan", "Arsitektur Sistem", "Migrasi Data"],
    deliverables: [
      "Blueprint arsitektur cloud",
      "Roadmap migrasi", 
      "Framework keamanan",
      "Program pelatihan staf"
    ],
    outcomes: "Sukses migrasi 85% sistem ke cloud dengan efisiensi biaya 40%",
    clientSatisfaction: 4.8,
    contractNumber: "KONSUL-ITK-2024-001"
  },
  {
    id: 2,
    consultantId: 2,
    consultantName: "Dr. Rina Marwanti",
    clientCompany: "PT Badak NGL",
    projectTitle: "Implementasi Industri 4.0 untuk Pabrik Pengolahan Gas",
    industry: "Minyak & Gas",
    type: "Konsultasi Implementasi",
    startDate: "2024-08-15",
    endDate: "2024-11-15",
    status: "Aktif",
    duration: "3 bulan",
    totalValue: 60000000,
    expertise: ["IoT Industri", "Otomasi Proses", "Analitik Data"],
    deliverables: [
      "Rencana deployment sensor IoT",
      "Dashboard monitoring real-time",
      "Sistem maintenance prediktif",
      "Kurikulum pelatihan operator"
    ],
    outcomes: "Fase 1: Peningkatan 15% dalam efisiensi monitoring",
    clientSatisfaction: 4.9,
    contractNumber: "KONSUL-ITK-2024-002"
  },
  {
    id: 3,
    consultantId: 4,
    consultantName: "Dr. Linda Permata",
    clientCompany: "Bank Kalimantan Timur",
    projectTitle: "Strategi Transformasi Digital Banking",
    industry: "Perbankan",
    type: "Konsultasi Strategis",
    startDate: "2024-05-01",
    endDate: "2024-08-31",
    status: "Selesai",
    duration: "4 bulan",
    totalValue: 55000000,
    expertise: ["Transformasi Digital", "Strategi Fintek", "Pengalaman Pelanggan"],
    deliverables: [
      "Roadmap strategi digital",
      "Rekomendasi technology stack",
      "Optimasi customer journey",
      "Framework manajemen risiko"
    ],
    outcomes: "Peningkatan 25% adopsi digital, pengurangan 40% waktu pemrosesan transaksi",
    clientSatisfaction: 4.7,
    contractNumber: "KONSUL-ITK-2024-003"
  }
];

// ======= 🆕 IKU 5 DATA - Research Impact Tracker =======

export const publicationImpactData = [
  {
    id: 1,
    facultyId: 1,
    facultyName: "Aidil Saputra Kirsan, M.Tr.Kom",
    totalPublications: 12,
    totalCitations: 145,
    hIndex: 8,
    i10Index: 6,
    recentPublications: [
      {
        title: "Wireless Sensor Networks for Palm Oil Monitoring",
        journal: "Journal of Wireless Sensor Networks",
        year: 2024,
        citations: 12,
        quartile: "Q2",
        impactFactor: 2.8,
        scopusId: "SCOPUS_ID_12345"
      },
      {
        title: "Cloud Computing in Agricultural IoT",
        journal: "IEEE Internet of Things Journal", 
        year: 2024,
        citations: 18,
        quartile: "Q1",
        impactFactor: 5.6,
        scopusId: "SCOPUS_ID_12346"
      }
    ],
    googleScholarId: "lzQbWuEAAAAJ",
    scopusId: "57123456789",
    sintaId: "SINTA_12345",
    orcidId: "0000-0002-1234-5678",
    lastUpdated: "2024-11-15"
  },
  {
    id: 2,
    facultyId: 2,
    facultyName: "Dr. Rina Marwanti",
    totalPublications: 15,
    totalCitations: 210,
    hIndex: 10,
    i10Index: 9,
    recentPublications: [
      {
        title: "Industrial IoT Implementation in Chemical Manufacturing",
        journal: "Journal of Manufacturing Systems",
        year: 2024,
        citations: 25,
        quartile: "Q1",
        impactFactor: 4.2,
        scopusId: "SCOPUS_ID_22345"
      },
      {
        title: "Smart Manufacturing for Sustainable Production",
        journal: "Sustainability",
        year: 2024,
        citations: 15,
        quartile: "Q2",
        impactFactor: 3.1,
        scopusId: "SCOPUS_ID_22346"
      }
    ],
    googleScholarId: "abc123AAAAJ",
    scopusId: "57223456789",
    sintaId: "SINTA_22345",
    orcidId: "0000-0002-2234-5678",
    lastUpdated: "2024-11-15"
  }
];

export const patentCommercializationData = [
  {
    id: 1,
    patentTitle: "Smart Irrigation System for Palm Oil Plantation",
    inventors: ["Dr. Rina Marwanti", "Sari Lestari"],
    patentNumber: "IDP000087654",
    grantDate: "2024-03-15",
    patentType: "Invention Patent", // Invention, Utility Model, Industrial Design
    technology: "IoT Hardware + Software",
    industry: "Agriculture Technology",
    commercializationStatus: "Licensed",
    licensee: "PT Smart Agriculture Technology",
    licenseType: "Exclusive License", // Exclusive, Non-Exclusive, Royalty-Free
    contractDate: "2024-05-20",
    licenseDuration: "5 tahun",
    initialPayment: 50000000,
    royaltyRate: 5, // percentage
    totalRevenue: 75000000, // initial + royalty accumulated
    projectedRevenue: 200000000, // 5-year projection
    implementationStatus: "Deployed in 3 plantations",
    marketPotential: "500+ palm oil plantations in Kalimantan",
    technologyReadinessLevel: 9,
    commercializationTeam: "Unit Inovasi ITK + PT Smart Agri Tech"
  },
  {
    id: 2,
    patentTitle: "Blockchain-Based Fintech Platform for SMEs",
    inventors: ["Dr. Linda Permata", "Lina Permatasari"],
    patentNumber: "IDP000087655",
    grantDate: "2024-06-20",
    patentType: "Invention Patent",
    technology: "Blockchain Software Platform",
    industry: "Financial Technology",
    commercializationStatus: "In Negotiation",
    licensee: "Bank Kalimantan Digital (under negotiation)",
    licenseType: "Non-Exclusive License",
    contractDate: null,
    licenseDuration: "7 tahun (proposed)",
    initialPayment: 0,
    royaltyRate: 3, // percentage (proposed)
    totalRevenue: 0,
    projectedRevenue: 150000000, // 7-year projection
    implementationStatus: "Pilot testing with 15 SMEs",
    marketPotential: "10,000+ SMEs in Eastern Indonesia",
    technologyReadinessLevel: 8,
    commercializationTeam: "Unit Inovasi ITK + Bank Kalsel"
  },
  {
    id: 3,
    patentTitle: "AI-Based Traffic Management System",
    inventors: ["Dr. Yohanes Khoirul", "Rina Kartika"],
    patentNumber: "Pending (Filed: P00202400890)",
    grantDate: null,
    patentType: "Invention Patent",
    technology: "AI Software + Computer Vision",
    industry: "Smart City Technology",
    commercializationStatus: "Pre-Commercial",
    licensee: null,
    licenseType: null,
    contractDate: null,
    licenseDuration: null,
    initialPayment: 0,
    royaltyRate: 0,
    totalRevenue: 0,
    projectedRevenue: 300000000, // potential if commercialized
    implementationStatus: "Proof of concept completed",
    marketPotential: "50+ cities in Indonesia with traffic issues",
    technologyReadinessLevel: 6,
    commercializationTeam: "Unit Inovasi ITK + Interested Cities"
  }
];

export const researchAdoptionData = [
  {
    id: 1,
    researchTitle: "IoT-Based Plantation Monitoring System",
    researchers: ["Aidil Saputra Kirsan, M.Tr.Kom", "Tim Mahasiswa"],
    adoptingOrganizations: [
      {
        name: "PT Astra Agro Lestari",
        type: "Private Company",
        sector: "Agriculture",
        adoptionDate: "2024-04-15",
        implementationScale: "3 plantations, 1,500 hectares",
        adaptationType: "Direct Implementation", // Direct, Modified, Inspired
        outcomes: "20% increase in monitoring efficiency, 15% cost reduction",
        feedback: "Sangat membantu monitoring real-time kondisi perkebunan",
        satisfaction: 4.8,
        continuedUsage: true,
        contactPerson: "Ir. Bambang Sutrisno"
      },
      {
        name: "PT SMART Tbk",
        type: "Private Company", 
        sector: "Agriculture",
        adoptionDate: "2024-06-20",
        implementationScale: "5 plantations, 2,800 hectares",
        adaptationType: "Modified Implementation",
        outcomes: "25% improvement in yield prediction accuracy",
        feedback: "Teknologi mudah diimplementasi dengan modifikasi minor",
        satisfaction: 4.6,
        continuedUsage: true,
        contactPerson: "Dr. Sari Indrawati"
      }
    ],
    totalAdoptions: 2,
    totalBeneficiaries: "4,300 hectares plantation area",
    adoptionRate: "60% of contacted organizations",
    economicImpact: "Estimated Rp2.5 billion efficiency gain per year",
    socialImpact: "Improved livelihood for 150+ plantation workers"
  },
  {
    id: 2,
    researchTitle: "Digital Banking Platform for Rural Areas",
    researchers: ["Dr. Linda Permata", "Tim Fintech"],
    adoptingOrganizations: [
      {
        name: "Bank Kalimantan Selatan",
        type: "Regional Bank",
        sector: "Banking",
        adoptionDate: "2024-08-01",
        implementationScale: "10 rural branches, 5,000 customers",
        adaptationType: "Direct Implementation",
        outcomes: "40% increase in digital transaction adoption",
        feedback: "Platform sangat user-friendly untuk nasabah pedesaan",
        satisfaction: 4.7,
        continuedUsage: true,
        contactPerson: "Drs. Ahmad Fauzi"
      },
      {
        name: "Koperasi Simpan Pinjam Borneo",
        type: "Cooperative",
        sector: "Financial Services",
        adoptionDate: "2024-09-15",
        implementationScale: "3 branches, 1,200 members",
        adaptationType: "Modified Implementation",
        outcomes: "50% reduction in transaction processing time",
        feedback: "Memudahkan anggota koperasi mengakses layanan keuangan",
        satisfaction: 4.5,
        continuedUsage: true,
        contactPerson: "Ibu Ratna Dewi"
      }
    ],
    totalAdoptions: 2,
    totalBeneficiaries: "6,200 customers/members",
    adoptionRate: "40% of contacted financial institutions",
    economicImpact: "Rp1.8 billion in improved financial inclusion",
    socialImpact: "Enhanced financial access for rural communities"
  },
  {
    id: 3,
    researchTitle: "Smart Manufacturing Optimization System",
    researchers: ["Dr. Rina Marwanti", "Tim Industry 4.0"],
    adoptingOrganizations: [
      {
        name: "PT Pupuk Kalimantan Timur",
        type: "State-Owned Enterprise",
        sector: "Chemical Manufacturing",
        adoptionDate: "2024-05-10",
        implementationScale: "2 production lines",
        adaptationType: "Pilot Implementation",
        outcomes: "12% improvement in production efficiency",
        feedback: "Sistem monitoring real-time sangat membantu optimasi produksi",
        satisfaction: 4.9,
        continuedUsage: true,
        contactPerson: "Ir. Hendra Kusuma"
      }
    ],
    totalAdoptions: 1,
    totalBeneficiaries: "500+ factory workers",
    adoptionRate: "100% of pilot participants",
    economicImpact: "Rp5.2 billion annual production optimization",
    socialImpact: "Improved working conditions and safety monitoring"
  }
];

export const innovationProjectsData = [
  {
    id: 1,
    prodi: "Sistem Informasi",
    projects: [
      {
        id: 1,
        title: "E-Commerce Platform UMKM Kalimantan",
        student: "Andika Pratama",
        type: "Web Application",
        stage: "Production",
        progress: 100,
        tech: ["React", "Node.js", "MongoDB"],
        impact: "15 UMKM terintegrasi",
        mentor: "Aidil Saputra Kirsan, M.Tr.Kom"
      },
      {
        id: 2,
        title: "Smart Tourism App Kalimantan",
        student: "Dewi Anggraini",
        type: "Mobile Application", 
        stage: "Development",
        progress: 60,
        tech: ["Flutter", "Firebase", "AI"],
        impact: "10+ destinasi wisata",
        mentor: "Dr. Yohanes Khoirul"
      }
    ],
    totalProjects: 2,
    completedProjects: 1,
    activeProjects: 1
  },
  {
    id: 2,
    prodi: "Informatika",
    projects: [
      {
        id: 3,
        title: "AI Traffic Management Balikpapan",
        student: "Rina Kartika",
        type: "AI System",
        stage: "Testing",
        progress: 70,
        tech: ["Python", "TensorFlow", "OpenCV"],
        impact: "3 persimpangan monitoring",
        mentor: "Dr. Yohanes Khoirul"
      },
      {
        id: 4,
        title: "E-Learning Bahasa Dayak",
        student: "Joko Susilo",
        type: "Educational Platform",
        stage: "Testing",
        progress: 85,
        tech: ["Vue.js", "Laravel", "PWA"],
        impact: "500+ kata terekam",
        mentor: "Aidil Saputra Kirsan, M.Tr.Kom"
      }
    ],
    totalProjects: 2,
    completedProjects: 0,
    activeProjects: 2
  },
  {
    id: 3,
    prodi: "Teknik Elektro",
    projects: [
      {
        id: 5,
        title: "Smart Irrigation IoT System",
        student: "Sari Lestari",
        type: "IoT Hardware",
        stage: "Prototyping",
        progress: 80,
        tech: ["Arduino", "Sensors", "MQTT"],
        impact: "2 lahan uji coba",
        mentor: "Dr. Rina Marwanti"
      },
      {
        id: 6,
        title: "Digital Twin Pabrik CPO",
        student: "Budi Santoso",
        type: "Industrial System",
        stage: "Production",
        progress: 100,
        tech: ["Unity", "IoT", "PostgreSQL"],
        impact: "1 pabrik implementasi",
        mentor: "Dr. Rina Marwanti"
      }
    ],
    totalProjects: 2,
    completedProjects: 1,
    activeProjects: 1
  },
  {
    id: 4,
    prodi: "Bisnis Digital",
    projects: [
      {
        id: 7,
        title: "Fintech Platform UMKM",
        student: "Lina Permatasari",
        type: "Fintech Application",
        stage: "Testing",
        progress: 90,
        tech: ["React Native", "Blockchain", "Node.js"],
        impact: "20 UMKM pilot user",
        mentor: "Dr. Linda Permata"
      }
    ],
    totalProjects: 1,
    completedProjects: 0,
    activeProjects: 1
  }
];

export const labBookingData = [
  {
    id: 1,
    title: "IoT Development Session",
    bookedBy: "Sari Lestari",
    prodi: "Teknik Elektro",
    date: "2024-11-20",
    startTime: "09:00",
    endTime: "12:00",
    status: "Confirmed",
    equipment: ["Arduino Mega Kit", "Oscilloscope"],
    purpose: "Smart Irrigation System Testing",
    participants: 1,
    supervisor: "Dr. Rina Marwanti"
  },
  {
    id: 2,
    title: "Web Development Workshop",
    bookedBy: "Andika Pratama", 
    prodi: "Sistem Informasi",
    date: "2024-11-21",
    startTime: "13:00", 
    endTime: "16:00",
    status: "Confirmed",
    equipment: ["Dev Workstation 01", "Projector"],
    purpose: "E-Commerce Development Sprint",
    participants: 1,
    supervisor: "Aidil Saputra Kirsan, M.Tr.Kom"
  },
  {
    id: 3,
    title: "AI Model Training",
    bookedBy: "Rina Kartika",
    prodi: "Informatika", 
    date: "2024-11-22",
    startTime: "10:00",
    endTime: "15:00",
    status: "Pending",
    equipment: ["AI Workstation Beta"],
    purpose: "Traffic Management AI Training",
    participants: 1,
    supervisor: "Dr. Yohanes Khoirul"
  }
];

export const softwareLicensesData = [
  {
    id: 1,
    name: "JetBrains All Products Pack",
    category: "IDE & Development",
    type: "Educational License",
    licenses: 50,
    used: 42,
    available: 8,
    expiryDate: "2025-06-30",
    annualCost: 0, // Educational license
    vendor: "JetBrains",
    coverage: ["IntelliJ IDEA", "PyCharm", "WebStorm", "PhpStorm"]
  },
  {
    id: 2,
    name: "MATLAB Campus License",
    category: "Mathematical Computing",
    type: "Campus Wide License",
    licenses: 100,
    used: 35,
    available: 65,
    expiryDate: "2025-12-31",
    annualCost: 45000000,
    vendor: "MathWorks",
    coverage: ["MATLAB", "Simulink", "Deep Learning Toolbox"]
  },
  {
    id: 3,
    name: "Adobe Creative Cloud",
    category: "Design & Media",
    type: "Educational License",
    licenses: 25,
    used: 23,
    available: 2,
    expiryDate: "2025-08-15",
    annualCost: 15000000,
    vendor: "Adobe",
    coverage: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects"]
  },
  {
    id: 4,
    name: "Altium Designer",
    category: "PCB Design",
    type: "Educational License",
    licenses: 10,
    used: 8,
    available: 2,
    expiryDate: "2025-05-20",
    annualCost: 25000000,
    vendor: "Altium",
    coverage: ["PCB Design", "3D Modeling", "Simulation"]
  }
];

export const labUtilizationData = [
  { month: 'Jul', workstations: 65, servers: 45, equipment: 70, overall: 60 },
  { month: 'Agu', workstations: 72, servers: 52, equipment: 75, overall: 66 },
  { month: 'Sep', workstations: 78, servers: 58, equipment: 80, overall: 72 },
  { month: 'Okt', workstations: 85, servers: 67, equipment: 85, overall: 79 },
  { month: 'Nov', workstations: 89, servers: 74, equipment: 88, overall: 84 },
  { month: 'Des', workstations: 82, servers: 69, equipment: 82, overall: 78 },
  { month: 'Jan', workstations: 87, servers: 71, equipment: 85, overall: 81 }
];

// IKU 3 & 5 Calculation Data
export const iku3MetricsData = [
  { month: 'Jul', external: 1, collaboration: 2, consultation: 1 },
  { month: 'Agu', external: 2, collaboration: 2, consultation: 2 },
  { month: 'Sep', external: 2, collaboration: 3, consultation: 2 },
  { month: 'Okt', external: 3, collaboration: 3, consultation: 3 },
  { month: 'Nov', external: 3, collaboration: 3, consultation: 3 },
  { month: 'Des', external: 3, collaboration: 3, consultation: 3 },
  { month: 'Jan', external: 3, collaboration: 3, consultation: 3 }
];

export const iku5MetricsData = [
  { month: 'Jul', citations: 120, patents: 0, adoptions: 0 },
  { month: 'Agu', citations: 135, patents: 1, adoptions: 1 },
  { month: 'Sep', citations: 150, patents: 1, adoptions: 2 },
  { month: 'Okt', citations: 165, patents: 2, adoptions: 3 },
  { month: 'Nov', citations: 180, patents: 2, adoptions: 4 },
  { month: 'Des', citations: 195, patents: 2, adoptions: 5 },
  { month: 'Jan', citations: 210, patents: 3, adoptions: 6 }
];

export const innovationMetricsData = [
  { month: 'Jul', startups: 0, prototypes: 2, deployed: 1, patents: 0 },
  { month: 'Agu', startups: 1, prototypes: 3, deployed: 1, patents: 0 },
  { month: 'Sep', startups: 1, prototypes: 4, deployed: 2, patents: 1 },
  { month: 'Okt', startups: 2, prototypes: 5, deployed: 3, patents: 1 },
  { month: 'Nov', startups: 2, prototypes: 6, deployed: 4, patents: 2 },
  { month: 'Des', startups: 3, prototypes: 7, deployed: 5, patents: 2 },
  { month: 'Jan', startups: 3, prototypes: 7, deployed: 6, patents: 3 }
];

export const digitalEquipmentData = [
  {
    id: 1,
    name: "Development Workstation 01",
    category: "Computing",
    brand: "Dell Precision 7760",
    specs: "Intel i7-11850H, 32GB RAM, RTX A4000",
    status: "Available",
    condition: "Excellent",
    location: "Lab Inovasi - Meja 1",
    assignedTo: null,
    purchaseDate: "2024-01-15",
    warrantyExpiry: "2027-01-15",
    value: 45000000,
    serialNumber: "DT001-FSTI-2024"
  },
  {
    id: 2,
    name: "3D Printer Ultimaker S3",
    category: "Prototyping",
    brand: "Ultimaker",
    specs: "Build Volume: 230×190×200mm, Dual Extrusion",
    status: "In Use",
    condition: "Good",
    location: "Lab Inovasi - Prototyping Area",
    assignedTo: "Sari Lestari",
    assignedProject: "Smart Irrigation System",
    purchaseDate: "2023-06-10",
    warrantyExpiry: "2025-06-10",
    value: 25000000,
    serialNumber: "3DP01-FSTI-2023"
  },
  {
    id: 3,
    name: "Arduino Mega Starter Kit",
    category: "IoT Development",
    brand: "Arduino",
    specs: "Arduino Mega, Sensors, Actuators, Breadboard",
    status: "Available",
    condition: "Good",
    location: "Lab Inovasi - Storage Cabinet A",
    assignedTo: null,
    purchaseDate: "2024-03-20",
    warrantyExpiry: "2026-03-20",
    value: 2500000,
    serialNumber: "ARD01-FSTI-2024"
  },
  {
    id: 4,
    name: "Oscilloscope Rigol DS1054Z",
    category: "Testing Equipment",
    brand: "Rigol",
    specs: "4 Channel, 50MHz, 1GSa/s",
    status: "Available",
    condition: "Excellent",
    location: "Lab Inovasi - Test Bench 1",
    assignedTo: null,
    purchaseDate: "2023-08-15",
    warrantyExpiry: "2026-08-15",
    value: 15000000,
    serialNumber: "OSC01-FSTI-2023"
  },
  {
    id: 5,
    name: "Raspberry Pi 4 Development Kit",
    category: "IoT Development",
    brand: "Raspberry Pi Foundation",
    specs: "8GB RAM, microSD, GPIO Kit",
    status: "In Use",
    condition: "Good",
    location: "Lab Inovasi - Project Table 2",
    assignedTo: "Joko Susilo",
    assignedProject: "E-Learning Bahasa Dayak",
    purchaseDate: "2024-02-10",
    warrantyExpiry: "2026-02-10",
    value: 1800000,
    serialNumber: "RPI01-FSTI-2024"
  }
];

// Existing data exports remain the same...
export const projectsData = [
  {
    id: 1,
    title: "Platform E-Commerce UMKM Kalimantan",
    student: "Andika Pratama",
    prodi: "Sistem Informasi",
    angkatan: "2021",
    status: "Live",
    url: "ecommerce-umkm.faculty.fsti-itk.ac.id",
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    description: "Platform e-commerce terintegrasi untuk UMKM Kalimantan dengan bimbingan dosen praktisi dalam arsitektur sistem dan integrasi API pembayaran.",
    features: ['Marketplace multi-vendor', 'Gateway pembayaran', 'Manajemen inventori', 'Dashboard analitik'],
    timeline: { start: "2024-08-01", end: "2024-11-15", duration: "4 bulan" },
    mentor: "Aidil Saputra Kirsan, M.Tr.Kom",
    mentorContribution: "Arsitektur cloud, optimasi database, konsultasi teknis sistem pembayaran",
    github: "https://github.com/fsti-itk/ecommerce-umkm-kalimantan",
    demo: "https://ecommerce-umkm.faculty.fsti-itk.ac.id",
    progress: 100,
    category: "Pengembangan Web",
    serverStatus: "Online",
    resourceUsage: { cpu: 15, memory: 45, storage: 1.2, bandwidth: 89 },
    industryImpact: "15 UMKM Kalimantan terdaftar, Rp45 juta transaksi bulanan"
  },
  {
    id: 2,
    title: "Sistem Irigasi Cerdas IoT",
    student: "Sari Lestari", 
    prodi: "Teknik Elektro",
    angkatan: "2022",
    status: "Development",
    url: "smart-irrigation.faculty.fsti-itk.ac.id",
    tech: ['Arduino', 'Python', 'MQTT', 'InfluxDB'],
    description: "Sistem irigasi pintar untuk perkebunan kelapa sawit dengan sensor IoT dan kontrol otomatis dibimbing dosen praktisi industri.",
    features: ['Monitoring real-time', 'Irigasi otomatis', 'Notifikasi mobile', 'Integrasi cuaca'],
    timeline: { start: "2024-09-01", end: "2024-12-20", duration: "4 bulan" },
    mentor: "Dr. Rina Marwanti",
    mentorContribution: "Desain arsitektur IoT, optimasi sensor, konsultasi implementasi industri",
    github: "https://github.com/fsti-itk/smart-irrigation-iot",
    demo: "https://smart-irrigation.faculty.fsti-itk.ac.id",
    progress: 80,
    category: "IoT & Perangkat Keras",
    serverStatus: "Dalam Pengembangan",
    resourceUsage: null,
    industryImpact: "2 kebun sawit pilot project, 20% efisiensi air"
  },
  {
    id: 3,
    title: "Platform E-Learning Bahasa Dayak",
    student: "Joko Susilo",
    prodi: "Informatika", 
    angkatan: "2021",
    status: "Testing",
    url: "elearning-dayak.faculty.fsti-itk.ac.id",
    tech: ['Vue.js', 'Laravel', 'MySQL', 'PWA'],
    description: "Platform pembelajaran digital untuk pelestarian bahasa Dayak dengan modul interaktif dan kamus digital berbasis AI.",
    features: ['Modul interaktif', 'Kamus digital', 'Akses offline', 'Tracking pembelajaran'],
    timeline: { start: "2024-07-15", end: "2024-11-30", duration: "4.5 bulan" },
    mentor: "Dr. Yohanes Khoirul",
    mentorContribution: "Algoritma NLP, machine learning untuk pengenalan suara, optimasi AI",
    github: "https://github.com/fsti-itk/elearning-bahasa-dayak",
    demo: "https://elearning-dayak.faculty.fsti-itk.ac.id",
    progress: 85,
    category: "Teknologi Pendidikan",
    serverStatus: "Dalam Testing",
    resourceUsage: null,
    industryImpact: "500+ kata Dayak terekam, 3 sekolah dasar pilot user"
  },
  {
    id: 4,
    title: "Sistem Manajemen Lalu Lintas AI",
    student: "Rina Kartika",
    prodi: "Informatika",
    angkatan: "2022", 
    status: "Development",
    url: "traffic-ai.faculty.fsti-itk.ac.id",
    tech: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI'],
    description: "Sistem manajemen lalu lintas berbasis AI untuk Balikpapan dengan analisis video real-time dan prediksi kemacetan.",
    features: ['Prediksi lalu lintas', 'Analisis real-time', 'Deteksi insiden', 'Dashboard pelaporan'],
    timeline: { start: "2024-08-15", end: "2024-12-15", duration: "4 bulan" },
    mentor: "Dr. Yohanes Khoirul",
    mentorContribution: "Arsitektur deep learning, optimasi model computer vision, deployment AI",
    github: "https://github.com/fsti-itk/ai-traffic-management",
    demo: "https://traffic-ai.faculty.fsti-itk.ac.id",
    progress: 70,
    category: "AI & Machine Learning",
    serverStatus: "Dalam Pengembangan",
    resourceUsage: null,
    industryImpact: "3 persimpangan Balikpapan monitoring, 15% reduksi kemacetan"
  },
  {
    id: 5,
    title: "Digital Twin Pabrik Kelapa Sawit",
    student: "Budi Santoso",
    prodi: "Teknik Elektro",
    angkatan: "2020",
    status: "Live", 
    url: "digital-twin-cpo.faculty.fsti-itk.ac.id",
    tech: ['Unity', 'IoT', 'Python', 'PostgreSQL'],
    description: "Digital twin untuk monitoring dan optimasi produksi pabrik CPO dengan visualisasi 3D dan analitik prediktif.",
    features: ['Monitoring real-time', 'Optimasi produksi', 'Visualisasi 3D', 'Analitik prediktif'],
    timeline: { start: "2024-07-01", end: "2024-10-30", duration: "4 bulan" },
    mentor: "Dr. Rina Marwanti",
    mentorContribution: "Integrasi sistem industri, optimasi IoT, konsultasi implementasi pabrik",
    github: "https://github.com/fsti-itk/digital-twin-cpo",
    demo: "https://digital-twin-cpo.faculty.fsti-itk.ac.id",
    progress: 100,
    category: "Teknologi Industri",
    serverStatus: "Online",
    resourceUsage: { cpu: 20, memory: 50, storage: 2.5, bandwidth: 75 },
    industryImpact: "1 pabrik CPO implementasi, 12% peningkatan efisiensi produksi"
  },
  {
    id: 6,
    title: "Platform Fintech UMKM",
    student: "Lina Permatasari",
    prodi: "Bisnis Digital",
    angkatan: "2021",
    status: "Testing",
    url: "fintech-umkm.faculty.fsti-itk.ac.id", 
    tech: ['React Native', 'Node.js', 'Blockchain', 'MongoDB'],
    description: "Aplikasi fintech untuk UMKM Balikpapan dengan micro-lending dan manajemen keuangan digital berbasis blockchain.",
    features: ['Pinjaman mikro', 'Pembayaran digital', 'Tracking keuangan', 'Credit scoring'],
    timeline: { start: "2024-08-15", end: "2024-12-01", duration: "3.5 bulan" },
    mentor: "Dr. Linda Permata",
    mentorContribution: "Strategi fintech, implementasi blockchain, konsultasi regulasi keuangan",
    github: "https://github.com/fsti-itk/fintech-umkm",
    demo: "https://fintech-umkm.faculty.fsti-itk.ac.id",
    progress: 90,
    category: "Fintech",
    serverStatus: "Dalam Testing",
    resourceUsage: null,
    industryImpact: "20 UMKM pilot user, Rp200 juta dana tersalurkan"
  },
  {
    id: 7,
    title: "Aplikasi Smart Tourism Kalimantan",
    student: "Dewi Anggraini",
    prodi: "Sistem Informasi",
    angkatan: "2022",
    status: "Research",
    url: "smart-tourism.faculty.fsti-itk.ac.id",
    tech: ['Flutter', 'Firebase', 'Maps API', 'AI'],
    description: "Aplikasi pariwisata cerdas dengan rekomendasi destinasi berbasis AI dan tur virtual untuk promosi wisata Kalimantan.",
    features: ['Rekomendasi AI', 'Tur virtual', 'Booking guide lokal', 'Peta offline'],
    timeline: { start: "2024-09-01", end: "2025-01-15", duration: "4.5 bulan" },
    mentor: "Dr. Yohanes Khoirul",
    mentorContribution: "Algoritma recommendation system, computer vision untuk AR, optimasi mobile AI",
    github: "https://github.com/fsti-itk/smart-tourism-kalimantan",
    demo: "https://smart-tourism.faculty.fsti-itk.ac.id",
    progress: 60,
    category: "Pengembangan Mobile",
    serverStatus: "Dalam Riset",
    resourceUsage: null,
    industryImpact: "10+ destinasi wisata terintegrasi, kerjasama Dinas Pariwisata Kaltim"
  }
];

export const computingResourcesData = [
  {
    id: 1,
    name: "Dev Server Alpha",
    type: "Development Server",
    specs: {
      cpu: "Intel Xeon E5-2680 v4 (14 Cores)",
      ram: "64GB DDR4",
      storage: "2TB NVMe SSD",
      gpu: "NVIDIA RTX 3080"
    },
    currentUsage: {
      cpu: 45,
      memory: 68,
      storage: 78,
      bandwidth: 34
    },
    status: "Online",
    assignedProjects: ["E-Commerce UMKM", "Smart Tourism App"],
    users: ["Andika Pratama", "Dewi Anggraini"],
    location: "Lab Inovasi Digital - Rack A1",
    ipAddress: "192.168.1.10",
    lastMaintenance: "2024-10-15",
    nextMaintenance: "2024-12-15"
  },
  {
    id: 2,
    name: "AI Workstation Beta", 
    type: "AI/ML Workstation",
    specs: {
      cpu: "AMD Ryzen 9 5950X (16 Cores)",
      ram: "128GB DDR4",
      storage: "4TB NVMe SSD",
      gpu: "NVIDIA RTX 4090"
    },
    currentUsage: {
      cpu: 89,
      memory: 92,
      storage: 56,
      bandwidth: 67
    },
    status: "High Load",
    assignedProjects: ["AI Traffic Management", "Machine Learning Research"],
    users: ["Rina Kartika", "Dr. Yohanes Khoirul"],
    location: "Lab Inovasi Digital - Rack A2",
    ipAddress: "192.168.1.11",
    lastMaintenance: "2024-11-01",
    nextMaintenance: "2025-01-01"
  },
  {
    id: 3,
    name: "Cloud Dev Server",
    type: "Cloud Development",
    specs: {
      cpu: "Intel i9-12900K (16 Cores)",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      gpu: "Integrated"
    },
    currentUsage: {
      cpu: 23,
      memory: 41,
      storage: 34,
      bandwidth: 29
    },
    status: "Online",
    assignedProjects: ["Digital Twin Pabrik", "Fintech UMKM"],
    users: ["Budi Santoso", "Lina Permatasari"],
    location: "Lab Inovasi Digital - Rack B1",
    ipAddress: "192.168.1.12",
    lastMaintenance: "2024-09-20",
    nextMaintenance: "2024-11-20"
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
  { id: 'research-analytics', label: 'Research Analytics', icon: 'BarChart3', color: 'bg-green-500', url: 'research.fsti-itk.ac.id' },
  { id: 'industry', label: 'Kolaborasi Industri', icon: 'Building', color: 'bg-orange-500', url: 'industry.fsti-itk.ac.id' }
];