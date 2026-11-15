<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthLoadingOverlay from '../components/AuthLoadingOverlay.vue'
import AuthLayout from '../components/AuthLayout.vue'
import { registerDemoAccount } from '../utils/authSession.js'

const router = useRouter()
const route = useRoute()
const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const capsLockOn = ref(false)
const errors = ref({})
const feedback = ref('')
const isLoading = ref(false)
const loadingStep = ref(0)
const loadingSteps = [
  'Preparando sua experiência',
  'Carregando orientações sobre a fauna',
  'Organizando os recursos da plataforma',
]
let loadingTimers = []

onBeforeUnmount(() => {
  loadingTimers.forEach(clearTimeout)
})

function clearErrors() {
  errors.value = {}
  feedback.value = ''
}

function updateCapsLock(event) {
  capsLockOn.value = event.getModifierState('CapsLock')
}

async function handleSubmit() {
  const validationErrors = {}

  if (!username.value.trim()) {
    validationErrors.username = 'Informe seu nome de usuário.'
  }

  if (!email.value.trim()) {
    validationErrors.email = 'Informe seu e-mail.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    validationErrors.email = 'Informe um endereço de e-mail válido.'
  }

  if (password.value.length < 8) {
    validationErrors.password = 'A senha deve ter pelo menos 8 caracteres.'
  }

  if (!passwordConfirmation.value) {
    validationErrors.passwordConfirmation = 'Confirme sua senha.'
  } else if (password.value !== passwordConfirmation.value) {
    validationErrors.passwordConfirmation = 'As senhas não correspondem.'
  }

  errors.value = validationErrors

  if (Object.keys(validationErrors).length) {
    return
  }

  try {
    await registerDemoAccount({
      username: username.value,
      email: email.value,
      password: password.value,
    })
  } catch (error) {
    feedback.value =
      error instanceof Error ? error.message : 'Não foi possível concluir o cadastro local.'
    return
  }

  isLoading.value = true
  loadingStep.value = 0
  loadingTimers.forEach(clearTimeout)
  loadingTimers = [
    setTimeout(() => {
      loadingStep.value = 1
    }, 550),
    setTimeout(() => {
      loadingStep.value = 2
    }, 1100),
    setTimeout(() => {
      const redirect = route.query.redirect
      const destination =
        typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')
          ? redirect
          : '/'
      router.replace(destination)
    }, 1900),
  ]
}
</script>

<template>
  <AuthLayout
    eyebrow="Faça parte da mudança"
    title="A natureza precisa de quem se importa."
    description="Crie sua conta para acompanhar informações e orientações sobre a proteção da fauna silvestre."
  >
    <div class="AuthFormHeading">
      <p class="AuthFormEyebrow">SOS FAUNA</p>
      <h2>Criar conta</h2>
      <p>Preencha seus dados para começar.</p>
    </div>

    <form class="AuthForm AuthForm--register" novalidate @submit.prevent="handleSubmit">
      <div class="AuthField">
        <label for="register-username">Nome de usuário</label>
        <input
          id="register-username"
          v-model="username"
          class="AuthPlainInput"
          type="text"
          name="username"
          autocomplete="username"
          placeholder="Escolha um nome de usuário"
          :aria-invalid="Boolean(errors.username)"
          :aria-describedby="errors.username ? 'register-username-error' : undefined"
          @input="clearErrors"
        />
        <p v-if="errors.username" id="register-username-error" class="AuthFieldError">
          {{ errors.username }}
        </p>
      </div>

      <div class="AuthField">
        <label for="register-email">E-mail</label>
        <input
          id="register-email"
          v-model="email"
          class="AuthPlainInput"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="voce@email.com"
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="errors.email ? 'register-email-error' : undefined"
          @input="clearErrors"
        />
        <p v-if="errors.email" id="register-email-error" class="AuthFieldError">
          {{ errors.email }}
        </p>
      </div>

      <div class="AuthField">
        <label for="register-password">Senha</label>
        <div class="AuthInputWrap" :class="{ 'AuthInputWrap--invalid': errors.password }">
          <input
            id="register-password"
            v-model="password"
            class="AuthPlainInput"
            :type="showPassword ? 'text' : 'password'"
            name="new-password"
            autocomplete="new-password"
            placeholder="Mínimo de 8 caracteres"
            :aria-invalid="Boolean(errors.password)"
            :aria-describedby="errors.password ? 'register-password-error' : undefined"
            @keydown="updateCapsLock"
            @keyup="updateCapsLock"
            @blur="capsLockOn = false"
            @input="clearErrors"
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
        <p v-if="errors.password" id="register-password-error" class="AuthFieldError">
          {{ errors.password }}
        </p>
        <p v-if="capsLockOn" class="AuthCapsLock" role="status">
          * Caps Lock ativado
        </p>
      </div>

      <div class="AuthField">
        <label for="register-password-confirmation">Confirmar senha</label>
        <input
          id="register-password-confirmation"
          v-model="passwordConfirmation"
          class="AuthPlainInput"
          :type="showPassword ? 'text' : 'password'"
          name="password-confirmation"
          autocomplete="new-password"
          placeholder="Digite a senha novamente"
          :aria-invalid="Boolean(errors.passwordConfirmation)"
          :aria-describedby="
            errors.passwordConfirmation ? 'register-password-confirmation-error' : undefined
          "
          @keydown="updateCapsLock"
          @keyup="updateCapsLock"
          @blur="capsLockOn = false"
          @input="clearErrors"
        />
        <p
          v-if="errors.passwordConfirmation"
          id="register-password-confirmation-error"
          class="AuthFieldError"
        >
          {{ errors.passwordConfirmation }}
        </p>
      </div>

      <button class="AuthSubmit" type="submit">
        Criar conta
        <span aria-hidden="true">→</span>
      </button>

      <p v-if="feedback" class="AuthStatus AuthStatus--error" role="alert">
        {{ feedback }}
      </p>

      <p class="AuthDemoNote">
        Conta demonstrativa: seus dados ficam neste navegador; a senha não é salva em texto.
      </p>

      <p class="AuthAccountPrompt">
        Já possui uma conta?
        <RouterLink to="/login">Entrar</RouterLink>
      </p>
    </form>

    <AuthLoadingOverlay
      :visible="isLoading"
      :welcome="'Bem-vindo, ' + username.trim() + '!'"
      :step="loadingStep"
      :steps="loadingSteps"
      disclaimer="Demonstração local: seu acesso foi salvo somente neste navegador."
    />
  </AuthLayout>
</template>
