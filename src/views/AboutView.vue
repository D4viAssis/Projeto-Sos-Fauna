<script setup>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'

const institutions = [
  {
    name: 'SEMAG',
    description:
      'Secretaria Municipal do Meio Ambiente de Guarapuava, referência local para orientações ambientais.',
  },
  {
    name: 'IAT',
    description:
      'Instituto Água e Terra, órgão estadual relacionado à gestão ambiental e à proteção da fauna no Paraná.',
  },
  {
    name: 'Polícia Ambiental',
    description:
      'Atua em ocorrências e situações que envolvem a proteção ambiental e da fauna silvestre.',
  },
  {
    name: 'CETRAS CEDETEG – Unicentro',
    description:
      'Serviço regional de referência para atendimento de animais silvestres. Confirme orientações e disponibilidade antes de se deslocar.',
  },
]

const objectives = [
  'Orientar sobre como agir ao encontrar animais silvestres.',
  'Informar sobre riscos e cuidados necessários.',
  'Indicar caminhos para buscar atendimento responsável.',
  'Conscientizar sobre preservação e biodiversidade.',
]
</script>

<template>
  <div>
    <AppHeader />

    <main>
      <div class="AboutTopBackdrop">
        <section class="page-hero AboutHero">
          <div class="container AboutHeroContent">
            <div class="AboutHeroText">
              <h1 class="AboutTitle">Sobre Nós</h1>
            </div>
            <div class="AboutHeroFeature">
              <p class="eyebrow">Nosso propósito</p>
              <h2 class="AboutSubtitle">A natureza precisa de quem se importa.</h2>
              <p class="AboutHeroDescription">
                Uma iniciativa dedicada à proteção da vida silvestre, promovendo
                informação, conscientização e cuidado com a fauna.
              </p>
            </div>
          </div>
        </section>

        <section class="section AboutIntro">
          <div class="container">
            <article class="AboutIntroCard">
              <div class="AboutIntroHeading">
                <p class="eyebrow">O que é</p>
                <h2 class="AboutTitle">Uma fonte de informação para proteger a fauna.</h2>
              </div>
              <div class="AboutDescription">
                <p>
                  A SOS FAUNA reúne orientações sobre como agir ao encontrar um
                  animal silvestre, quais riscos considerar e onde buscar
                  atendimento especializado.
                </p>
                <p>
                  Sua finalidade é apoiar a população com informações claras,
                  incentivar decisões seguras e promover o respeito à
                  biodiversidade. A plataforma não realiza resgates nem substitui
                  a avaliação dos órgãos responsáveis.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section class="section AboutMission">
          <div class="container">
            <article class="AboutMissionCard">
              <div class="AboutMissionStatement">
                <p class="eyebrow">Nossa missão</p>
                <h2 class="AboutTitle">Promover cuidado, respeito e proteção à vida silvestre.</h2>
              </div>
              <div class="AboutObjectives">
                <p class="eyebrow">Nossos objetivos</p>
                <ol class="AboutObjectivesList">
                  <li v-for="(objective, index) in objectives" :key="objective">
                    <span class="AboutObjectiveNumber">0{{ index + 1 }}</span>
                    <span>{{ objective }}</span>
                  </li>
                </ol>
              </div>
            </article>
          </div>
        </section>
      </div>

      <section class="section AboutImportance">
        <div class="container">
          <article class="AboutImportanceCard">
            <div class="AboutImportanceHeading">
              <p class="eyebrow">Por que proteger?</p>
              <h2 class="AboutTitle">Animais silvestres são essenciais para o equilíbrio da natureza.</h2>
            </div>
            <p class="AboutDescription">
              Cada espécie tem um papel nos ambientes naturais. Proteger a fauna
              ajuda a conservar a biodiversidade, os habitats e os ciclos da
              natureza. Respeitar os animais, evitar a captura e não comprar
              espécies silvestres são atitudes que contribuem para essa proteção.
            </p>
          </article>
        </div>
      </section>

      <section class="section AboutInstitutions">
        <div class="container">
          <div class="AboutInstitutionsHeading">
            <p class="eyebrow">Rede de atendimento</p>
            <h2 class="AboutTitle">Instituições e serviços de referência.</h2>
            <p class="AboutDescription">
              Estes órgãos e serviços podem orientar sobre ocorrências com
              animais. A menção não representa parceria ou vínculo oficial com
              a SOS FAUNA.
            </p>
          </div>

          <div class="InstitutionGrid">
            <article
              v-for="institution in institutions"
              :key="institution.name"
              class="Institution"
            >
              <h3 class="InstitutionTitle">{{ institution.name }}</h3>
              <p class="InstitutionDescription">{{ institution.description }}</p>
            </article>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
