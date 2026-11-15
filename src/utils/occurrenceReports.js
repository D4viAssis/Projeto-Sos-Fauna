const OCCURRENCE_REPORTS_KEY = 'sos-fauna-occurrence-reports'

function getStorage() {
  if (typeof window === 'undefined') {
    throw new Error('Os registros locais estão disponíveis somente no navegador.')
  }

  return window.localStorage
}

export function loadOccurrenceReports() {
  const serializedReports = getStorage().getItem(OCCURRENCE_REPORTS_KEY)
  if (!serializedReports) return []

  let reports
  try {
    reports = JSON.parse(serializedReports)
  } catch {
    throw new Error('Os registros locais estão inválidos. Limpe os dados do site.')
  }

  if (
    !Array.isArray(reports) ||
    reports.some(
      (report) =>
        !report ||
        typeof report.id !== 'string' ||
        typeof report.createdAt !== 'string' ||
        typeof report.location !== 'string' ||
        typeof report.animalType !== 'string' ||
        typeof report.condition !== 'string' ||
        typeof report.description !== 'string',
    )
  ) {
    throw new Error('Os registros locais estão inválidos. Limpe os dados do site.')
  }

  return reports
}

export function saveOccurrenceReport(report) {
  const storage = getStorage()
  const reports = loadOccurrenceReports()
  if (!report.ownerUsername) {
    throw new Error('Entre na sua conta para registrar uma ocorrência.')
  }

  const savedReport = {
    ...report,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  }

  storage.setItem(OCCURRENCE_REPORTS_KEY, JSON.stringify([savedReport, ...reports]))
  return savedReport
}

export function deleteOccurrenceReport(id, ownerUsername) {
  const storage = getStorage()
  const reports = loadOccurrenceReports()
  const reportExists = reports.some(
    (report) => report.id === id && report.ownerUsername === ownerUsername,
  )

  if (!reportExists) {
    throw new Error('Este relato não foi encontrado na sua lista.')
  }

  const remainingReports = reports.filter(
    (report) => !(report.id === id && report.ownerUsername === ownerUsername),
  )
  storage.setItem(OCCURRENCE_REPORTS_KEY, JSON.stringify(remainingReports))
  return remainingReports
}
