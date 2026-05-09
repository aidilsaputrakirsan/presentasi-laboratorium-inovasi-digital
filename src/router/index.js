
import { createRouter, createWebHistory } from 'vue-router'

const DashboardView = () => import('../views/DashboardView.vue')
const PengajaranView = () => import('../views/PengajaranView.vue')
const RisetKaryaView = () => import('../views/RisetKaryaView.vue')
const PengabdianView = () => import('../views/PengabdianView.vue')
const SdmPakarView = () => import('../views/SdmPakarView.vue')
const FundingView = () => import('../views/FundingView.vue')

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { title: 'Ringkasan' }
  },
  {
    path: '/pengajaran',
    name: 'Pengajaran',
    component: PengajaranView,
    meta: { title: 'Pengajaran' }
  },
  {
    path: '/penelitian',
    name: 'Penelitian',
    component: RisetKaryaView,
    meta: { title: 'Penelitian' }
  },
  {
    path: '/pengabdian',
    name: 'Pengabdian',
    component: PengabdianView,
    meta: { title: 'Pengabdian' }
  },
  {
    path: '/sdm-pakar',
    name: 'SdmPakar',
    component: SdmPakarView,
    meta: { title: 'SDM & Pakar' }
  },
  {
    path: '/funding',
    name: 'Funding',
    component: FundingView,
    meta: { title: 'Pendanaan' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - SITRIA`
  next()
})

export default router
