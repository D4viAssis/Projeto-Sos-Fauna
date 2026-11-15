<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  welcome: {
    type: String,
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
  steps: {
    type: Array,
    required: true,
  },
  disclaimer: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Transition name="auth-loading">
    <div
      v-if="visible"
      class="AuthLoadingOverlay"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <section class="AuthLoadingCard">
        <p class="AuthLoadingBrand">SOS FAUNA</p>
        <span class="AuthLoader" aria-hidden="true"></span>
        <p class="AuthLoadingWelcome">{{ welcome }}</p>
        <h2>Carregando seus recursos</h2>
        <p class="AuthLoadingMessage">{{ steps[step] }}...</p>
        <div
          class="AuthLoadingProgress"
          role="progressbar"
          :aria-valuenow="Math.round(((step + 1) / steps.length) * 100)"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Carregamento demonstrativo"
        >
          <span :style="{ width: `${((step + 1) / steps.length) * 100}%` }"></span>
        </div>
        <p class="AuthLoadingDisclaimer">{{ disclaimer }}</p>
      </section>
    </div>
  </Transition>
</template>
