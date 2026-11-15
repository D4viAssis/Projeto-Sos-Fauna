<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthLoadingOverlay from '../components/AuthLoadingOverlay.vue'
import AuthLayout from '../components/AuthLayout.vue'
import { loginDemoUser } from '../utils/authSession.js'

const router = useRouter()
const route = useRoute()
const isOccurrenceAccess = computed(
  () =>
    typeof route.query.redirect === 'string' &&
    route.query.redirect.startsWith('/ocorrencias'),
)
const identifier = ref('')
const password = ref('')
const showPassword = ref(false)
const capsLockOn = ref(false)
const errors = ref({})
const feedback = ref('')
const feedbackType = ref('info')
const isSubmitting = ref(false)
const isLoading = ref(false)
const loadingStep = ref(0)
const loadingSteps = [
  'Verificando seus dados',
  'Carregando orientações sobre a fauna',
  'Preparando seu acesso',
]

function clearFeedback() {
  errors.value = {}
  feedback.value = ''
}

async function handleSubmit() {
  const validationErrors = {}

  if (!identifier.value.trim()) {
    validationErrors.identifier = 'Informe seu e-mail ou nome de usuário.'
  }

  if (!password.value) {
    validationErrors.password = 'Informe sua senha.'
  }

  errors.value = validationErrors
  feedback.value = ''

  if (Object.keys(validationErrors).length) return

  isSubmitting.value = true
  isLoading.value = true
  loadingStep.value = 0
  try {
    await loginDemoUser({
      identifier: identifier.value,
      password: password.value,
    })
    loadingStep.value = 1
    await new Promise((resolve) => setTimeout(resolve, 450))
    loadingStep.value = 2
    await new Promise((resolve) => setTimeout(resolve, 450))
    const redirect = route.query.redirect
    const destination =
      typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')
        ? redirect
        : '/'
    await router.replace(destination)
  } catch (error) {
    isLoading.value = false
    feedbackType.value = 'error'
    feedback.value =
      error instanceof Error ? error.message : 'Não foi possível concluir o login local.'
  } finally {
    isSubmitting.value = false
  }
}

function showRecoveryNotice() {
  errors.value = {}
  feedbackType.value = 'info'
  feedback.value =
    'A recuperação de senha estará disponível quando a autenticação for integrada.'
}

function updateCapsLock(event) {
  capsLockOn.value = event.getModifierState('CapsLock')
}

</script>

<template>
  <AuthLayout
    :eyebrow="isOccurrenceAccess ? 'Acesso às ocorrências' : 'Proteção começa com informação'"
    :title="isOccurrenceAccess ? 'Entre para continuar.' : 'Bem-vindo de volta!'"
    :description="
      isOccurrenceAccess
        ? 'Entre na sua conta para registrar e acompanhar ocorrências da fauna silvestre.'
        : 'Acesse sua conta para continuar acompanhando orientações e conteúdos sobre a fauna silvestre.'
    "
  >
    <div class="AuthFormHeading">
      <p class="AuthFormEyebrow">SOS FAUNA</p>
      <h2>Entrar</h2>
      <p v-if="isOccurrenceAccess">
        Entre na sua conta para registrar e acompanhar ocorrências da fauna silvestre.
      </p>
      <p v-else>Acesse sua conta para continuar.</p>
    </div>

    <form class="AuthForm" novalidate @submit.prevent="handleSubmit">
      <div class="AuthField">
        <label for="login-identifier">E-mail ou nome de usuário</label>
        <div class="AuthInputWrap" :class="{ 'AuthInputWrap--invalid': errors.identifier }">
          <svg
            class="AuthInputIcon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
          <input
            id="login-identifier"
            v-model="identifier"
            type="text"
            name="username"
            autocomplete="username"
            placeholder="Digite seu e-mail ou usuário"
            :aria-invalid="Boolean(errors.identifier)"
            :aria-describedby="errors.identifier ? 'login-identifier-error' : undefined"
            @input="clearFeedback"
          />
        </div>
        <p v-if="errors.identifier" id="login-identifier-error" class="AuthFieldError">
          {{ errors.identifier }}
        </p>
      </div>

      <div class="AuthField">
        <label for="login-password">Senha</label>
        <div class="AuthInputWrap" :class="{ 'AuthInputWrap--invalid': errors.password }">
          <svg
            class="AuthInputIcon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="4"
              y="10"
              width="16"
              height="11"
              rx="2"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
          <input
            id="login-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            autocomplete="current-password"
            placeholder="Digite sua senha"
            :aria-invalid="Boolean(errors.password)"
            :aria-describedby="errors.password ? 'login-password-error' : undefined"
            @keydown="updateCapsLock"
            @keyup="updateCapsLock"
            @blur="capsLockOn = false"
            @input="clearFeedback"
          />
          <button
            class="AuthPasswordToggle"
            type="button"
            :aria-pressed="showPassword"
            :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Ocultar' : 'Mostrar' }}
          </button>
        </div>
        <p v-if="errors.password" id="login-password-error" class="AuthFieldError">
          {{ errors.password }}
        </p>
        <p v-if="capsLockOn" class="AuthCapsLock" role="status">
          * Caps Lock ativado
        </p>
      </div>

      <div class="AuthFormOptions">
        <button class="AuthTextButton" type="button" @click="showRecoveryNotice">
          Esqueci minha senha
        </button>
      </div>

      <button class="AuthSubmit" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Verificando...' : 'Entrar' }}
        <span v-if="!isSubmitting" aria-hidden="true">→</span>
      </button>

      <p
        v-if="feedback"
        class="AuthStatus"
        :class="{ 'AuthStatus--error': feedbackType === 'error' }"
        :role="feedbackType === 'error' ? 'alert' : 'status'"
        aria-live="polite"
      >
        {{ feedback }}
      </p>

      <p class="AuthAccountPrompt">
        Ainda não possui uma conta?
        <RouterLink :to="{ name: 'cadastro', query: route.query }">Criar conta</RouterLink>
      </p>
    </form>

    <AuthLoadingOverlay
      :visible="isLoading"
      welcome="Bem-vindo de volta!"
      :step="loadingStep"
      :steps="loadingSteps"
      disclaimer="Login demonstrativo: seu acesso fica salvo neste navegador."
    />
  </AuthLayout>
</template>
