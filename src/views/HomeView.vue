<script setup>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'

const pages = [
  {
    title: 'Sobre a SOS FAUNA',
    description:
      'Conheça a proposta de informação e conscientização sobre a vida silvestre.',
    route: '/sobre',
    link: 'Conheça a plataforma',
  },
  {
    title: 'Orientações',
    description:
      'Veja como agir com segurança ao encontrar um animal silvestre.',
    route: '/orientacoes',
    link: 'Ver orientações',
  },
  {
    title: 'Ajuda',
    description:
      'Saiba quais informações reunir e onde buscar atendimento especializado.',
    route: '/ajuda',
    link: 'Encontrar ajuda',
  },
]
</script>

<template>
  <div>
    <AppHeader />

    <main>
      <section class="hero">
        <div class="container hero-content">
          <div class="hero-copy">
            <p class="eyebrow">SOS FAUNA</p>
            <h1>Como agir ao encontrar um animal silvestre</h1>
            <p class="hero-description">
              Orientações de segurança, informações sobre a fauna e caminhos
              para buscar atendimento especializado.
            </p>
            <div class="hero-actions">
              <RouterLink class="button button-primary" to="/orientacoes">
                Encontrei um animal
                <span aria-hidden="true">→</span>
              </RouterLink>
              <RouterLink class="button button-secondary" to="/sobre">
                Conheça a SOS FAUNA
              </RouterLink>
            </div>
          </div>

          <aside class="HomeOccurrenceCallout">
            <p class="HomeOccurrenceEyebrow">Ajude a proteger a fauna</p>
            <h2>Presenciou uma ocorrência?</h2>
            <p>
              Registre o local e o que observou para organizar as informações
              da situação.
            </p>
            <RouterLink
              class="button button-primary HomeOccurrenceButton"
              to="/ocorrencias"
            >
              Registrar ocorrência
              <span aria-hidden="true">→</span>
            </RouterLink>
          </aside>
        </div>
      </section>

      <section class="section section-home-explore">
        <div class="container">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Explore</p>
              <h2>Informações sobre a fauna silvestre.</h2>
            </div>
          </div>

          <div class="topic-grid">
            <article v-for="page in pages" :key="page.route" class="topic">
              <h3>{{ page.title }}</h3>
              <p>{{ page.description }}</p>
              <RouterLink :to="page.route">
                {{ page.link }} <span aria-hidden="true">→</span>
              </RouterLink>
            </article>
          </div>
        </div>
      </section>

    </main>

    <AppFooter />
  </div>
</template>
