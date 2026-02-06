// Auto-generated prodi registry
import siLecturers from './sistem-informasi/lecturers.json'
import siSintaData from './sistem-informasi/sinta_data.json'
import siExpertiseData from './sistem-informasi/expertise_data.json'
import siClustersData from './sistem-informasi/clusters_data.json'

import bdLecturers from './bisnis-digital/lecturers.json'
import bdSintaData from './bisnis-digital/sinta_data.json'
import bdExpertiseData from './bisnis-digital/expertise_data.json'
import bdClustersData from './bisnis-digital/clusters_data.json'

export const prodiRegistry = {
  'sistem-informasi': {
    config: siLecturers,
    sintaData: siSintaData,
    expertiseData: siExpertiseData,
    clustersData: siClustersData,
  },
  'bisnis-digital': {
    config: bdLecturers,
    sintaData: bdSintaData,
    expertiseData: bdExpertiseData,
    clustersData: bdClustersData,
  },
  // Placeholder entries for prodi without data yet
  'teknik-elektro': { config: null },
  'informatika': { config: null },
  'teknik-biomedis': { config: null },
  'magister-manajemen-teknologi': { config: null },
  'fisika': { config: null },
  'matematika': { config: null },
  'statistika': { config: null },
  'ilmu-aktuaria': { config: null },
}

export const prodiList = [
  // Jurusan Teknik Elektro, Informatika, dan Bisnis
  { slug: 'sistem-informasi', name: 'Sistem Informasi', code: 'SI', jurusan: 'Teknik Elektro, Informatika, dan Bisnis', hasData: true },
  { slug: 'bisnis-digital', name: 'Bisnis Digital', code: 'BD', jurusan: 'Teknik Elektro, Informatika, dan Bisnis', hasData: true },
  { slug: 'teknik-elektro', name: 'Teknik Elektro', code: 'TE', jurusan: 'Teknik Elektro, Informatika, dan Bisnis', hasData: false },
  { slug: 'informatika', name: 'Informatika', code: 'IF', jurusan: 'Teknik Elektro, Informatika, dan Bisnis', hasData: false },
  { slug: 'teknik-biomedis', name: 'Teknik Biomedis', code: 'TB', jurusan: 'Teknik Elektro, Informatika, dan Bisnis', hasData: false },
  { slug: 'magister-manajemen-teknologi', name: 'Magister Manajemen Teknologi', code: 'MMT', jurusan: 'Teknik Elektro, Informatika, dan Bisnis', hasData: false },
  // Jurusan Sains dan Analitika Data
  { slug: 'fisika', name: 'Fisika', code: 'FIS', jurusan: 'Sains dan Analitika Data', hasData: false },
  { slug: 'matematika', name: 'Matematika', code: 'MAT', jurusan: 'Sains dan Analitika Data', hasData: false },
  { slug: 'statistika', name: 'Statistika', code: 'STAT', jurusan: 'Sains dan Analitika Data', hasData: false },
  { slug: 'ilmu-aktuaria', name: 'Ilmu Aktuaria', code: 'AKT', jurusan: 'Sains dan Analitika Data', hasData: false },
]
