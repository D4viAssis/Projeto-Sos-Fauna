<script setup>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <div>
    <AppHeader />

    <main>
      <section class="page-hero HelpHero">
        <div class="container page-hero-content">
          <p class="eyebrow">Ajuda e atendimento</p>
          <h1>Saiba a quem recorrer.</h1>
          <p>
            O atendimento depende da espécie, da situação e do município.
            Procure sempre os canais oficiais e siga a orientação da equipe
            responsável.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Canais de atendimento</p>
              <h2>Onde buscar orientação em Guarapuava e região.</h2>
            </div>
            <p>
              Confirme os canais e a disponibilidade antes de se deslocar.
              Nunca transporte um animal sem orientação profissional.
            </p>
          </div>

          <div class="topic-grid">
            <article class="topic HelpChannel">
              <h3>Órgão ambiental municipal</h3>
              <p>
                Em Guarapuava, procure a Secretaria Municipal de Meio Ambiente
                (SEMAG) para orientações sobre os serviços locais.
              </p>
            </article>
            <article class="topic HelpChannel">
              <h3>IAT e Polícia Ambiental</h3>
              <p>
                Os órgãos ambientais estaduais podem orientar sobre ocorrências
                com fauna e encaminhar ao serviço adequado.
              </p>
            </article>
            <article class="topic HelpChannel">
              <h3>CETRAS CEDETEG – Unicentro</h3>
              <p>
                O centro de triagem é uma referência regional para atendimento
                de animais silvestres. Confirme previamente como proceder.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="section section-guidance">
        <div class="container help-details">
          <div>
            <p class="eyebrow">Ao comunicar uma ocorrência</p>
            <h2>Quais informações ajudam no atendimento?</h2>
          </div>
          <ul class="information-list">
            <li>Seu nome e uma forma de contato, se solicitado pelo serviço.</li>
            <li>O local exato ou um ponto de referência próximo.</li>
            <li>Se a área é urbana ou rural e se há perigo imediato.</li>
            <li>
              Como o animal parece: ave, mamífero, réptil ou outro, se souber.
            </li>
            <li>Se aparenta estar ferido, debilitado ou em condição desconhecida.</li>
          </ul>
          <p class="guidance-note">
            Não se aproxime para conferir a espécie ou os ferimentos. Informe
            apenas o que conseguir observar de um local seguro.
          </p>
        </div>
      </section>

      <section class="help-section EmergencyHelp">
        <div class="container help-content">
          <div>
            <p class="eyebrow">Acidente com animal peçonhento?</p>
            <h2>Cuide primeiro da segurança das pessoas.</h2>
          </div>
          <div class="help-copy">
            <p>
              Afaste-se do animal e procure atendimento médico imediatamente.
              Não tente capturá-lo para identificação. Em uma emergência de
              saúde no Brasil, ligue para o SAMU pelo número 192.
            </p>
            <a class="button button-secondary" href="tel:192">Ligar para o SAMU · 192</a>
          </div>
        </div>
      </section>

      <section class="section HelpAfterRescue">
        <div class="container help-details">
          <div>
            <p class="eyebrow">Depois do resgate</p>
            <h2>A destinação é definida por profissionais.</h2>
          </div>
          <p class="help-detail-copy">
            Após avaliação e cuidados adequados, animais silvestres podem ser
            reabilitados e devolvidos a um ambiente apropriado. Animais
            domésticos devem ser encaminhados pelos serviços de proteção
            animal. A decisão depende das condições de cada animal e das
            orientações das autoridades responsáveis.
          </p>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
