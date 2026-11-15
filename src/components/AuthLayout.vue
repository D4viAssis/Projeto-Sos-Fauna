<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <main class="AuthPage">
    <section class="AuthShell">
      <aside class="AuthBrandPanel">
        <header class="AuthBrandHeader">
          <RouterLink class="AuthBrand" to="/" aria-label="SOS FAUNA - Página inicial">
            <span>SOS</span>
            <span>FAUNA</span>
          </RouterLink>
          <RouterLink class="AuthHomeLink" to="/">
            <span aria-hidden="true">←</span>
            Página inicial
          </RouterLink>
        </header>

        <div class="AuthBrandCopy">
          <p class="AuthBrandEyebrow">{{ eyebrow }}</p>
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
        </div>

        <p class="AuthBrandCaption">Informação também é uma forma de proteção.</p>
      </aside>

      <section class="AuthFormPanel">
        <div class="AuthFormContent">
          <slot />
        </div>
      </section>
    </section>
  </main>
</template>
