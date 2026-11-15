<template>
  <footer class="site-footer">
    <div class="container footer-content">
      <section class="footer-about">
        <RouterLink class="footer-brand" to="/">SOS FAUNA</RouterLink>
        <p>
          Informação e orientação para a proteção dos animais silvestres e a
          convivência responsável com a fauna.
        </p>
        <span class="footer-location">Guarapuava – PR</span>
      </section>

      <nav class="footer-nav" aria-label="Navegação do rodapé">
        <h2>Navegação</h2>
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/sobre">Sobre</RouterLink>
        <RouterLink to="/orientacoes">Orientações</RouterLink>
        <RouterLink to="/faq">FAQ</RouterLink>
      </nav>

      <section class="footer-contacts">
        <h2>Contatos e atendimento</h2>
        <p>Secretaria Municipal do Meio Ambiente (SEMAG)</p>
        <p>Instituto Água e Terra (IAT) e Polícia Ambiental</p>
        <p>CETRAS CEDETEG – Unicentro</p>
        <RouterLink class="footer-contact-link" to="/ajuda">
          Consulte orientações de atendimento →
        </RouterLink>
      </section>

      <p class="footer-note">
        A SOS FAUNA é informativa e não substitui os serviços oficiais de
        atendimento e resgate.
      </p>
    </div>
  </footer>
</template>
