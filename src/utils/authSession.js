const ACCOUNTS_KEY = 'sos-fauna-demo-accounts'
const CURRENT_USER_KEY = 'sos-fauna-demo-user'
const PASSWORD_ITERATIONS = 120000
const encoder = new TextEncoder()

function getStorage() {
  if (typeof window === 'undefined') {
    throw new Error('O cadastro local está disponível somente no navegador.')
  }

  return window.localStorage
}

function readAccounts() {
  const serializedAccounts = getStorage().getItem(ACCOUNTS_KEY)
  if (!serializedAccounts) return []

  let accounts
  try {
    accounts = JSON.parse(serializedAccounts)
  } catch {
    throw new Error('Os dados locais de cadastro estão inválidos. Limpe os dados do site.')
  }

  if (
    !Array.isArray(accounts) ||
    accounts.some(
      (account) =>
        !account ||
        typeof account.username !== 'string' ||
        typeof account.email !== 'string' ||
        typeof account.salt !== 'string' ||
        typeof account.passwordHash !== 'string',
    )
  ) {
    throw new Error('Os dados locais de cadastro estão inválidos. Limpe os dados do site.')
  }

  return accounts
}

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function fromHex(value) {
  const bytes = new Uint8Array(value.length / 2)
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(value.slice(index * 2, index * 2 + 2), 16)
  }
  return bytes
}

async function hashPassword(password, salt) {
  const cryptoApi = globalThis.crypto
  if (!cryptoApi?.subtle || !cryptoApi.getRandomValues) {
    throw new Error('Este navegador não oferece suporte ao cadastro local seguro.')
  }

  const key = await cryptoApi.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const derivedBits = await cryptoApi.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: fromHex(salt),
      iterations: PASSWORD_ITERATIONS,
      hash: 'SHA-256',
    },
    key,
    256,
  )

  return toHex(new Uint8Array(derivedBits))
}

function createSalt() {
  const cryptoApi = globalThis.crypto
  if (!cryptoApi?.getRandomValues) {
    throw new Error('Este navegador não oferece suporte ao cadastro local seguro.')
  }

  const salt = new Uint8Array(16)
  cryptoApi.getRandomValues(salt)
  return toHex(salt)
}

export function getDemoUser() {
  return getStorage().getItem(CURRENT_USER_KEY) || ''
}

export async function registerDemoAccount({ username, email, password }) {
  const storage = getStorage()
  const accounts = readAccounts()
  const normalizedUsername = username.trim()
  const normalizedEmail = email.trim().toLowerCase()

  const accountAlreadyExists = accounts.some(
    (account) =>
      account.username.toLowerCase() === normalizedUsername.toLowerCase() ||
      account.email.toLowerCase() === normalizedEmail,
  )
  if (accountAlreadyExists) {
    throw new Error('Este nome de usuário ou e-mail já está cadastrado neste navegador.')
  }

  const salt = createSalt()
  const passwordHash = await hashPassword(password, salt)
  const account = {
    username: normalizedUsername,
    email: normalizedEmail,
    salt,
    passwordHash,
  }

  storage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]))
  storage.setItem(CURRENT_USER_KEY, normalizedUsername)
  return normalizedUsername
}

export async function loginDemoUser({ identifier, password }) {
  const normalizedIdentifier = identifier.trim().toLowerCase()
  const account = readAccounts().find(
    (savedAccount) =>
      savedAccount.username.toLowerCase() === normalizedIdentifier ||
      savedAccount.email.toLowerCase() === normalizedIdentifier,
  )

  if (!account) {
    throw new Error('Não encontramos uma conta com esse usuário ou e-mail neste navegador.')
  }

  const submittedHash = await hashPassword(password, account.salt)
  if (submittedHash !== account.passwordHash) {
    throw new Error('A senha informada não corresponde a esta conta.')
  }

  getStorage().setItem(CURRENT_USER_KEY, account.username)
  return account.username
}

export function clearDemoUser() {
  getStorage().removeItem(CURRENT_USER_KEY)
}
