<script setup>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'

const firstSteps = [
  {
    number: '01',
    title: 'Observe de longe',
    image: '/assets/images/ambientenatural.png',
    imageAlt: 'Animal silvestre em seu ambiente natural',
    description:
      'Evite cercar ou assustar o animal. Não se aproxime para identificar a espécie.',
  },
  {
    number: '02',
    title: 'Mantenha o local seguro',
    image: '/assets/images/trafico.png',
    imageAlt: 'Cena relacionada à proteção da fauna silvestre',
    description:
      'Afaste crianças e animais domésticos. Não toque, capture, transporte ou ofereça alimento e água.',
  },
  {
    number: '03',
    title: 'Procure orientação',
    image: '/assets/images/cuidado.webp',
    imageAlt: 'Cuidados com um animal silvestre',
    description:
      'Se o animal estiver ferido, em risco ou não conseguir sair sozinho, contate um serviço especializado.',
  },
]

const situations = [
  {
    title: 'Animal aparentemente saudável',
    description:
      'Se ele apenas apareceu no quintal e não parece ferido, mantenha distância e deixe uma rota de saída livre, sem tentar conduzi-lo.',
  },
  {
    title: 'Animal ferido ou debilitado',
    description:
      'Não faça curativos nem tente levá-lo para casa. Afaste pessoas e pets e peça orientação ao órgão ambiental ou serviço de fauna.',
  },
  {
    title: 'Animal em rua ou rodovia',
    description:
      'Priorize sua segurança. Não entre na via nem tente parar o trânsito; avise os serviços responsáveis pelo local.',
  },
  {
    title: 'Queimada, enchente ou deslizamento',
    description:
      'Afaste-se da área de risco e siga as orientações das equipes de emergência. Não entre em áreas perigosas para alcançar animais.',
  },
  {
    title: 'Filhote sozinho',
    description:
      'Não o retire do local: os pais podem estar por perto. Observe de longe e, se estiver ferido ou em risco, peça orientação a um serviço especializado.',
  },
  {
    title: 'Serpentes e animais potencialmente perigosos',
    description:
      'Não tente capturar, matar ou transportar. Mantenha distância e chame o serviço competente da região.',
  },
]
</script>

<template>
  <div>
    <AppHeader />

    <main>
      <section class="page-hero GuidanceHero">
        <div class="container page-hero-content">
          <p class="eyebrow">Orientações</p>
          <h1>Encontrou um animal silvestre?</h1>
          <p>
            A primeira atitude é manter a calma, proteger as pessoas ao redor e
            evitar qualquer contato com o animal.
          </p>
        </div>
      </section>

      <section class="section section-guidance">
        <div class="container">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Primeiros cuidados</p>
              <h2>O que fazer</h2>
            </div>
            <p>
              Animais silvestres podem reagir ao medo ou à dor. Uma tentativa
              de ajuda sem preparo pode causar ferimentos.
            </p>
          </div>

          <div class="topic-grid">
            <article
              v-for="step in firstSteps"
              :key="step.number"
              class="topic GuidanceStepCard"
            >
              <img class="GuidanceStepImage" :src="step.image" :alt="step.imageAlt" />
              <span class="topic-number">{{ step.number }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Cada situação pede cuidado</p>
              <h2>Orientações para diferentes encontros.</h2>
            </div>
          </div>

          <div class="situation-list">
            <article
              v-for="situation in situations"
              :key="situation.title"
              class="situation-item"
            >
              <h3>{{ situation.title }}</h3>
              <p>{{ situation.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="help-section GuidanceHelp">
        <div class="container help-content">
          <div>
            <p class="eyebrow">Precisa de atendimento?</p>
            <h2>Peça ajuda a uma equipe especializada.</h2>
          </div>
          <div class="help-copy">
            <p>
              Ao entrar em contato, informe onde o animal está, se a área é
              urbana ou rural, como ele parece e se há ferimentos ou riscos.
              Não se aproxime para obter esses dados.
            </p>
            <RouterLink class="button button-light" to="/ajuda">
              Ver opções de ajuda
            </RouterLink>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
