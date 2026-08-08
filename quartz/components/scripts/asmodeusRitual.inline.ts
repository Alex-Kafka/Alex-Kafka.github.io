const CANON_SEGMENT = "sealed-canon-7e4c"
const UNLOCK_KEY = "shattered-isles:asmodeus-ritual"
const UNLOCK_VALUE = "deyomas"
const ASMODEUS = ["А", "С", "М", "О", "Д", "Е", "Й"]
const RITUAL_ORDER = [4, 5, 6, 3, 2, 0, 1]

function canonIsUnlocked(): boolean {
  try {
    return window.localStorage.getItem(UNLOCK_KEY) === UNLOCK_VALUE
  } catch {
    return false
  }
}

function siteRoot(): URL {
  const homeLink = document.querySelector<HTMLAnchorElement>(".page-title a")
  const root = new URL(homeLink?.href ?? ".", window.location.href)
  if (!root.pathname.endsWith("/")) root.pathname += "/"
  return root
}

function canonHref(): string {
  return new URL(CANON_SEGMENT, siteRoot()).href
}

function addCanonNavigation(): void {
  if (!canonIsUnlocked()) return

  for (const explorer of document.querySelectorAll<HTMLElement>(".explorer-ul")) {
    if (explorer.querySelector(".canon-nav-entry")) continue

    const item = document.createElement("li")
    item.className = "canon-nav-entry"

    const link = document.createElement("a")
    link.className = "internal canon-nav-link"
    link.href = canonHref()
    link.dataset.for = `${CANON_SEGMENT}/index`
    link.textContent = "Запретная хроника"
    link.setAttribute("aria-label", "Открыть запретную хронику")

    item.appendChild(link)
    explorer.prepend(item)
  }
}

function addRevelation(title: HTMLElement): void {
  if (document.querySelector(".canon-revelation")) return

  const revelation = document.createElement("aside")
  revelation.className = "canon-revelation"
  revelation.innerHTML = `
    <span class="canon-revelation-kicker">Девятая печать пала</span>
    <p>Имя изменилось. Память — нет.</p>
  `

  const link = document.createElement("a")
  link.className = "internal canon-revelation-link"
  link.href = canonHref()
  link.textContent = "Войти в запретную хронику"
  revelation.appendChild(link)

  title.insertAdjacentElement("afterend", revelation)
}

function showUnlockedState(title: HTMLElement): void {
  title.textContent = "Дейомас"
  title.classList.add("ritual-complete")
  title.dataset.ritualReady = "true"
  addRevelation(title)
  addCanonNavigation()
}

function setupAsmodeusRitual(): void {
  addCanonNavigation()

  const pageTitle = document.querySelector<HTMLElement>(".article-title")
  if (!pageTitle || pageTitle.textContent?.trim() !== "Асмодей") return
  if (pageTitle.dataset.ritualReady === "true") return

  if (canonIsUnlocked()) {
    showUnlockedState(pageTitle)
    return
  }

  pageTitle.dataset.ritualReady = "true"
  pageTitle.classList.add("asmodeus-ritual-title")
  pageTitle.setAttribute("aria-label", "Имя Асмодея. Каждую букву можно нажать отдельно.")
  pageTitle.textContent = ""

  const status = document.createElement("span")
  status.className = "ritual-status"
  status.setAttribute("aria-live", "polite")

  let progress = 0
  const letters: HTMLButtonElement[] = []

  const resetRitual = () => {
    progress = 0
    for (const letter of letters) {
      letter.classList.remove("ritual-letter-selected")
      letter.disabled = false
    }
    pageTitle.classList.remove("ritual-error")
    void pageTitle.offsetWidth
    pageTitle.classList.add("ritual-error")
    status.textContent = "Печать отвергает неверное имя."
  }

  for (const [index, character] of ASMODEUS.entries()) {
    const letter = document.createElement("button")
    letter.type = "button"
    letter.className = "ritual-letter"
    letter.textContent = character
    letter.setAttribute("aria-label", `Буква ${character}`)

    const onClick = () => {
      if (index !== RITUAL_ORDER[progress]) {
        resetRitual()
        return
      }

      letter.classList.add("ritual-letter-selected")
      letter.disabled = true
      progress += 1
      status.textContent = `Названо букв: ${progress} из ${RITUAL_ORDER.length}`

      if (progress === RITUAL_ORDER.length) {
        try {
          window.localStorage.setItem(UNLOCK_KEY, UNLOCK_VALUE)
        } catch {
          return
        }
        window.setTimeout(() => showUnlockedState(pageTitle), 320)
      }
    }

    letter.addEventListener("click", onClick)
    window.addCleanup?.(() => letter.removeEventListener("click", onClick))
    letters.push(letter)
    pageTitle.appendChild(letter)
  }

  pageTitle.insertAdjacentElement("afterend", status)
}

document.addEventListener("nav", setupAsmodeusRitual)
setupAsmodeusRitual()
