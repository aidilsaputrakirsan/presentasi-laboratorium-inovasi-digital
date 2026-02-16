
import { createRouter, createWebHistory } from 'vue-router'

// Views will be lazy-loaded
const DashboardView = () => import('../views/DashboardView.vue')
const GalleryView = () => import('../views/GalleryView.vue')
const CollaborationView = () => import('../views/CollaborationView.vue')
const RoadmapView = () => import('../views/RoadmapView.vue')
const ExpertiseView = () => import('../views/ExpertiseView.vue')
const FundingView = () => import('../views/FundingView.vue')
const AccreditationView = () => import('../views/AccreditationView.vue')

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { title: 'Dashboard' }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: GalleryView,
    meta: { title: 'Koleksi Karya' }
  },
  {
    path: '/collaboration',
    name: 'Collaboration',
    component: CollaborationView,
    meta: { title: 'Kolaborasi Riset' }
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    component: RoadmapView,
    meta: { title: 'Roadmap Penelitian' }
  },
  {
    path: '/expertise',
    name: 'Expertise',
    component: ExpertiseView,
    meta: { title: 'Cari Pakar' }
  },
  {
    path: '/funding',
    name: 'Funding',
    component: FundingView,
    meta: { title: 'Dana & Hibah' }
  },
  {
    path: '/accreditation',
    name: 'Accreditation',
    component: AccreditationView,
    meta: { title: 'DTPS Akreditasi' }
  },

  // --- V2 Public SaaS Routes ---
  {
    path: '/v2',
    component: () => import('../layouts/PublicLayout.vue'),
    children: [
      {
        path: '', // /v2
        component: () => import('../views/v2/LandingPage.vue'),
        meta: { title: 'SINTA Intelligence' }
      },
      {
        path: 'login',
        component: () => import('../views/v2/LoginPage.vue'),
        meta: { title: 'Login - SINTA Intelligence' }
      },
      {
        path: 'dashboard',
        component: () => import('../views/v2/DashboardV2.vue'),
        meta: { title: 'Smart Dashboard' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - SINTA Pulse`
  next()
})

export default router
