<script setup>
import AuthLoadingOverlay from './components/AuthLoadingOverlay.vue'
import { isNavigationLoading } from './utils/navigationLoading.js'

const navigationSteps = ['Verificando acesso às ocorrências']
</script>

<template>
  <RouterView />
  <AuthLoadingOverlay
    :visible="isNavigationLoading"
    welcome="Só um instante"
    :step="0"
    :steps="navigationSteps"
    disclaimer="Preparando o acesso à sua conta."
  />
</template>
