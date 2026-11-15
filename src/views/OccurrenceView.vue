<script setup>
import { ref } from 'vue'
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getDemoUser } from '../utils/authSession.js'
import {
  deleteOccurrenceReport,
  loadOccurrenceReports,
  saveOccurrenceReport,
} from '../utils/occurrenceReports.js'

const occurrence = ref({
  location: '',
  animalType: '',
  condition: '',
  description: '',
})
const errors = ref({})
const feedback = ref('')
const feedbackType = ref('info')
const reports = ref([])
const storageError = ref('')
const animalTypeLabels = {
  ave: 'Ave',
  mamifero: 'Mamífero',
  reptil: 'Réptil',
  anfibio: 'Anfíbio',
  outro: 'Outro',
  'nao-sei': 'Não sei identificar',
}
const conditionLabels = {
  'aparentemente-saudavel': 'Aparentemente saudável',
  ferido: 'Ferido ou debilitado',
  risco: 'Em área de risco',
  desconhecida: 'Não sabe informar',
}
const currentUsername = getDemoUser()

try {
  reports.value = loadOccurrenceReports().filter(
    (report) => report.ownerUsername === currentUsername,
  )
} catch (error) {
  storageError.value =
    error instanceof Error ? error.message : 'Não foi possível carregar os registros locais.'
}

function clearFeedback() {
  errors.value = {}
  feedback.value = ''
  feedbackType.value = 'info'
}

function handleSubmit() {
  const validationErrors = {}

  if (!occurrence.value.location.trim()) {
    validationErrors.location = 'Informe o local da ocorrência.'
  }

  if (!occurrence.value.animalType) {
    validationErrors.animalType = 'Selecione uma opção ou marque que não sabe identificar.'
  }

  if (!occurrence.value.condition) {
    validationErrors.condition = 'Selecione a condição observada.'
  }

  if (!occurrence.value.description.trim()) {
    validationErrors.description = 'Descreva brevemente o que aconteceu.'
  }

  errors.value = validationErrors
  feedback.value = ''
  feedbackType.value = 'info'

  if (Object.keys(validationErrors).length) return

  try {
    const savedReport = saveOccurrenceReport({
      ...occurrence.value,
      ownerUsername: currentUsername,
    })
    reports.value = [savedReport, ...reports.value]
    occurrence.value = {
      location: '',
      animalType: '',
      condition: '',
      description: '',
    }
    feedback.value =
      'Relato salvo neste navegador. Ele não foi enviado aos serviços de atendimento.'
  } catch (error) {
    feedbackType.value = 'error'
    feedback.value =
      error instanceof Error ? error.message : 'Não foi possível salvar o relato localmente.'
  }
}

function removeReport(report) {
  if (!window.confirm('Deseja excluir este relato salvo neste navegador?')) return

  try {
    reports.value = deleteOccurrenceReport(report.id, currentUsername).filter(
      (savedReport) => savedReport.ownerUsername === currentUsername,
    )
    feedbackType.value = 'info'
    feedback.value = 'Relato excluído do armazenamento local.'
  } catch (error) {
    feedbackType.value = 'error'
    feedback.value =
      error instanceof Error ? error.message : 'Não foi possível excluir o relato.'
  }
}

function formatReportDate(createdAt) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(createdAt))
}
</script>

<template>
  <div>
    <AppHeader />

    <main>
      <section class="page-hero OccurrenceHero">
        <div class="container page-hero-content">
          <p class="eyebrow">Registrar ocorrência</p>
          <h1>Conte o que você observou.</h1>
          <p>
            Informe os detalhes que conseguir observar de um local seguro.
            Não se aproxime nem tente tocar ou capturar o animal.
          </p>
        </div>
      </section>

      <section class="section OccurrenceSection">
        <div class="container OccurrenceContainer">
          <div class="OccurrenceIntro">
            <p class="eyebrow">Relato da situação</p>
            <h2>O que aconteceu?</h2>
            <p>
              Não precisa identificar a espécie com precisão. Se não souber,
              escolha “Não sei identificar”.
            </p>
            <div class="OccurrenceNotice">
              <strong>Importante:</strong> este formulário é demonstrativo e
              salva os relatos apenas neste navegador. Eles não são enviados
              aos serviços de atendimento. Para atendimento, consulte os
              <RouterLink to="/ajuda">canais de ajuda</RouterLink>.
            </div>
          </div>

          <form class="OccurrenceForm" novalidate @submit.prevent="handleSubmit">
            <div class="OccurrenceField OccurrenceField--wide">
              <label for="occurrence-location">Local da ocorrência</label>
              <input
                id="occurrence-location"
                v-model="occurrence.location"
                type="text"
                autocomplete="street-address"
                placeholder="Rua, bairro ou ponto de referência"
                :aria-invalid="Boolean(errors.location)"
                :aria-describedby="errors.location ? 'occurrence-location-error' : undefined"
                @input="clearFeedback"
              />
              <p
                v-if="errors.location"
                id="occurrence-location-error"
                class="OccurrenceError"
              >
                {{ errors.location }}
              </p>
            </div>

            <div class="OccurrenceField">
              <label for="occurrence-animal">Tipo de animal</label>
              <select
                id="occurrence-animal"
                v-model="occurrence.animalType"
                :aria-invalid="Boolean(errors.animalType)"
                :aria-describedby="errors.animalType ? 'occurrence-animal-error' : undefined"
                @change="clearFeedback"
              >
                <option disabled value="">Selecione uma opção</option>
                <option value="ave">Ave</option>
                <option value="mamifero">Mamífero</option>
                <option value="reptil">Réptil</option>
                <option value="anfibio">Anfíbio</option>
                <option value="outro">Outro</option>
                <option value="nao-sei">Não sei identificar</option>
              </select>
              <p
                v-if="errors.animalType"
                id="occurrence-animal-error"
                class="OccurrenceError"
              >
                {{ errors.animalType }}
              </p>
            </div>

            <div class="OccurrenceField">
              <label for="occurrence-condition">Condição observada</label>
              <select
                id="occurrence-condition"
                v-model="occurrence.condition"
                :aria-invalid="Boolean(errors.condition)"
                :aria-describedby="
                  errors.condition ? 'occurrence-condition-error' : undefined
                "
                @change="clearFeedback"
              >
                <option disabled value="">Selecione uma opção</option>
                <option value="aparentemente-saudavel">Aparentemente saudável</option>
                <option value="ferido">Ferido ou debilitado</option>
                <option value="risco">Em área de risco</option>
                <option value="desconhecida">Não sei informar</option>
              </select>
              <p
                v-if="errors.condition"
                id="occurrence-condition-error"
                class="OccurrenceError"
              >
                {{ errors.condition }}
              </p>
            </div>

            <div class="OccurrenceField OccurrenceField--wide">
              <label for="occurrence-description">Descrição</label>
              <textarea
                id="occurrence-description"
                v-model="occurrence.description"
                rows="5"
                placeholder="Conte o que observou, sem se aproximar do animal."
                :aria-invalid="Boolean(errors.description)"
                :aria-describedby="
                  errors.description ? 'occurrence-description-error' : undefined
                "
                @input="clearFeedback"
              ></textarea>
              <p
                v-if="errors.description"
                id="occurrence-description-error"
                class="OccurrenceError"
              >
                {{ errors.description }}
              </p>
            </div>

            <div class="OccurrenceFormFooter OccurrenceField--wide">
              <button class="button button-primary" type="submit">
                Registrar ocorrência
                <span aria-hidden="true">→</span>
              </button>
              <p
                v-if="feedback"
                class="OccurrenceFeedback"
                :class="{ 'OccurrenceFeedback--error': feedbackType === 'error' }"
                :role="feedbackType === 'error' ? 'alert' : 'status'"
                aria-live="polite"
              >
                {{ feedback }}
              </p>
            </div>
          </form>

          <section class="OccurrenceReports OccurrenceField--wide">
            <header class="OccurrenceReportsHeading">
              <div>
                <p class="eyebrow">Relatos locais</p>
                <h2>Ocorrências registradas</h2>
              </div>
              <p>Os cards ficam salvos somente neste navegador.</p>
            </header>

            <p v-if="storageError" class="OccurrenceFeedback OccurrenceFeedback--error" role="alert">
              {{ storageError }}
            </p>
            <p v-else-if="reports.length === 0" class="OccurrenceEmpty">
              Ainda não há relatos registrados.
            </p>
            <div v-else class="OccurrenceReportList">
              <article
                v-for="report in reports"
                :key="report.id"
                class="OccurrenceReportCard"
              >
                <header class="OccurrenceReportHeader">
                  <span class="OccurrenceReportAvatar" aria-hidden="true">SF</span>
                  <div class="OccurrenceReportIdentity">
                    <strong>{{ report.ownerUsername }}</strong>
                    <time :datetime="report.createdAt">
                      {{ formatReportDate(report.createdAt) }}
                    </time>
                  </div>
                  <span class="OccurrenceReportBadge">Local</span>
                  <button
                    class="OccurrenceReportDelete"
                    type="button"
                    :aria-label="`Excluir ocorrência de ${formatReportDate(report.createdAt)}`"
                    @click="removeReport(report)"
                  >
                    Excluir
                  </button>
                </header>
                <p class="OccurrenceReportSummary">
                  {{ animalTypeLabels[report.animalType] || report.animalType }}
                  ·
                  {{ conditionLabels[report.condition] || report.condition }}
                </p>
                <p class="OccurrenceReportLocation">{{ report.location }}</p>
                <p class="OccurrenceReportDescription">{{ report.description }}</p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
