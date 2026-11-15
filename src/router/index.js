import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FaqView from '../views/FaqView.vue'
import GuidanceView from '../views/GuidanceView.vue'
import HelpView from '../views/HelpView.vue'
import LoginView from '../views/LoginView.vue'
import OccurrenceView from '../views/OccurrenceView.vue'
import RegisterView from '../views/RegisterView.vue'
import { getDemoUser } from '../utils/authSession.js'
import { isNavigationLoading } from '../utils/navigationLoading.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: AboutView,
    },
    {
      path: '/orientacoes',
      name: 'orientacoes',
      component: GuidanceView,
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqView,
    },
    {
      path: '/ajuda',
      name: 'ajuda',
      component: HelpView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: RegisterView,
    },
    {
      path: '/ocorrencias',
      name: 'ocorrencias',
      component: OccurrenceView,
      meta: { requiresAuth: true },
    },
    {
      path: '/registrar-ocorrencia',
      redirect: { name: 'ocorrencias' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !getDemoUser()) {
    isNavigationLoading.value = true
    await new Promise((resolve) => setTimeout(resolve, 650))
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }
})

router.afterEach(() => {
  isNavigationLoading.value = false
})

router.onError(() => {
  isNavigationLoading.value = false
})

export default router
