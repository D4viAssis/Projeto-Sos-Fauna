<script setup>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'

const questions = [
  {
    question: 'Encontrei um filhote sozinho. Devo levá-lo?',
    answer:
      'Não retire o filhote do local. Em muitos casos, os pais estão por perto. Observe de longe e, se ele estiver ferido ou em risco, peça orientação a um serviço especializado.',
  },
  {
    question: 'Posso oferecer comida ou água?',
    answer:
      'Não. Alimentos e água inadequados podem prejudicar o animal, e a tentativa de aproximação pode causar estresse ou acidentes.',
  },
  {
    question: 'O animal parece ferido. O que devo fazer?',
    answer:
      'Mantenha pessoas e animais domésticos afastados. Não tente capturá-lo ou transportá-lo; entre em contato com o órgão ambiental ou serviço de fauna da sua região.',
  },
  {
    question: 'O que fazer se encontrar uma serpente?',
    answer:
      'Não se aproxime, não tente capturá-la e não tente matá-la. Afaste as pessoas e chame o serviço competente da região.',
  },
  {
    question: 'Que informações devo passar ao pedir ajuda?',
    answer:
      'Informe o local, se a área é urbana ou rural, como o animal parece e se há ferimentos ou perigo. Não se aproxime para obter esses dados.',
  },
  {
    question: 'O que fazer se encontrar um animal em uma rua ou rodovia?',
    answer:
      'Priorize sua segurança. Não entre na via nem tente parar o trânsito; avise os serviços responsáveis pelo local.',
  },
  {
    question: 'Posso levar o animal silvestre para casa?',
    answer:
      'Não tente recolher ou transportar o animal por conta própria. Mantenha distância e peça orientação a um serviço especializado.',
  },
  {
    question: 'Para onde o animal vai depois do resgate?',
    answer:
      'A destinação é definida por profissionais após avaliação. Animais silvestres podem ser reabilitados e devolvidos a um ambiente adequado; animais domésticos seguem os serviços de proteção animal.',
  },
]
</script>

<template>
  <div>
    <AppHeader />

    <main>
      <section class="page-hero FaqHero">
        <div class="container page-hero-content">
          <p class="eyebrow">Perguntas frequentes</p>
          <h1>Dúvidas sobre animais silvestres?</h1>
          <p>
            Encontre respostas rápidas e saiba quando procurar orientação
            especializada.
          </p>
        </div>
      </section>

      <section class="section section-faq">
        <div class="container faq-page-content">
          <div class="faq-list">
            <details v-for="item in questions" :key="item.question">
              <summary>{{ item.question }}</summary>
              <p>{{ item.answer }}</p>
            </details>
          </div>
          <aside class="faq-help">
            <p class="eyebrow">Ainda precisa de ajuda?</p>
            <h2>Fale com um serviço especializado da sua região.</h2>
            <RouterLink class="button button-primary" to="/ajuda">
              Ver opções de ajuda
            </RouterLink>
          </aside>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
