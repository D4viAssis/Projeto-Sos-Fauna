<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { clearDemoUser, getDemoUser } from '../utils/authSession.js'

const router = useRouter()
const demoUser = ref(getDemoUser())
const isProfileMenuOpen = ref(false)

function signOut() {
  clearDemoUser()
  demoUser.value = ''
  isProfileMenuOpen.value = false

  if (router.currentRoute.value.meta.requiresAuth) {
    router.replace('/login')
  }
}
</script>

<template>
  <header class="site-header">
    <div class="container header-content">
      <RouterLink class="brand" to="/" aria-label="SOS FAUNA - Página inicial">
        <span class="brand-sos">S0S</span>
        <span class="brand-name">Fauna</span>
      </RouterLink>

      <nav class="main-nav" aria-label="Navegação principal">
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/sobre">Sobre</RouterLink>
        <RouterLink to="/orientacoes">Orientações</RouterLink>
        <RouterLink to="/ocorrencias">Ocorrências</RouterLink>
        <RouterLink to="/faq">FAQ</RouterLink>
        <RouterLink to="/ajuda">Ajuda</RouterLink>
        <div v-if="demoUser" class="nav-profile-wrap">
          <button
            class="nav-login nav-profile"
            type="button"
            :aria-expanded="isProfileMenuOpen"
            aria-controls="nav-profile-menu"
            @click="isProfileMenuOpen = !isProfileMenuOpen"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.7" />
              <path
                d="M4.5 21a7.5 7.5 0 0 1 15 0"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
            <span class="nav-profile-name">{{ demoUser }}</span>
            <span aria-hidden="true">⌄</span>
          </button>
          <div v-if="isProfileMenuOpen" id="nav-profile-menu" class="nav-profile-menu">
            <p>Sessão demonstrativa</p>
            <button type="button" @click="signOut">Sair</button>
          </div>
        </div>
        <RouterLink v-else class="nav-login" to="/login">Entrar</RouterLink>
      </nav>
    </div>
  </header>
</template>
