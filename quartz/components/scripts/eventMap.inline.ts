function setupEventAtlas(): void {
  for (const atlas of document.querySelectorAll<HTMLElement>(".event-atlas")) {
    if (atlas.dataset.ready === "true") continue
    atlas.dataset.ready = "true"

    const periodButtons = Array.from(atlas.querySelectorAll<HTMLButtonElement>("[data-era-target]"))
    const layers = Array.from(atlas.querySelectorAll<HTMLElement>("[data-era]"))
    const date = atlas.querySelector<HTMLElement>("[data-era-date]:not([data-era])")
    const eraTitle = atlas.querySelector<HTMLElement>("[data-era-title]:not([data-era])")
    const detailKicker = atlas.querySelector<HTMLElement>("[data-detail-kicker]")
    const detailTitle = atlas.querySelector<HTMLElement>("[data-detail-title]")
    const detailSummary = atlas.querySelector<HTMLElement>("[data-detail-summary]")
    const detailLink = atlas.querySelector<HTMLAnchorElement>("[data-detail-link]")

    const showEraSummary = (layer: HTMLElement) => {
      if (detailKicker) detailKicker.textContent = "Обзор периода"
      if (detailTitle) detailTitle.textContent = layer.dataset.eraTitle ?? ""
      if (detailSummary) detailSummary.textContent = layer.dataset.eraSummary ?? ""
      if (detailLink) {
        detailLink.hidden = true
        detailLink.removeAttribute("href")
      }
    }

    const activateEra = (id: string, focusTab = false) => {
      const layer = layers.find((candidate) => candidate.dataset.era === id)
      if (!layer) return

      for (const candidate of layers) {
        const active = candidate === layer
        candidate.hidden = !active
        candidate.classList.toggle("is-active", active)
      }

      for (const button of periodButtons) {
        const active = button.dataset.eraTarget === id
        button.classList.toggle("is-active", active)
        button.setAttribute("aria-selected", String(active))
        if (active && focusTab) button.focus()
      }

      if (date) date.textContent = layer.dataset.eraDate ?? ""
      if (eraTitle) eraTitle.textContent = layer.dataset.eraTitle ?? ""
      showEraSummary(layer)
    }

    const selectMarker = (marker: HTMLButtonElement) => {
      const activeLayer = marker.closest<HTMLElement>("[data-era]")
      activeLayer
        ?.querySelectorAll<HTMLButtonElement>(".event-marker")
        .forEach((candidate) => candidate.classList.toggle("is-selected", candidate === marker))

      if (detailKicker) detailKicker.textContent = marker.dataset.markerKicker ?? "Событие"
      if (detailTitle) detailTitle.textContent = marker.dataset.markerTitle ?? ""
      if (detailSummary) detailSummary.textContent = marker.dataset.markerSummary ?? ""
      if (detailLink) {
        const href = marker.dataset.markerHref
        detailLink.hidden = !href
        if (href) detailLink.href = href
      }
    }

    periodButtons.forEach((button, index) => {
      const onClick = () => activateEra(button.dataset.eraTarget ?? "")
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
        event.preventDefault()
        const direction = event.key === "ArrowRight" ? 1 : -1
        const next = (index + direction + periodButtons.length) % periodButtons.length
        activateEra(periodButtons[next].dataset.eraTarget ?? "", true)
      }
      button.addEventListener("click", onClick)
      button.addEventListener("keydown", onKeyDown)
      window.addCleanup?.(() => {
        button.removeEventListener("click", onClick)
        button.removeEventListener("keydown", onKeyDown)
      })
    })

    atlas.querySelectorAll<HTMLButtonElement>(".event-marker").forEach((marker) => {
      const onSelect = () => selectMarker(marker)
      marker.addEventListener("click", onSelect)
      marker.addEventListener("focus", onSelect)
      window.addCleanup?.(() => {
        marker.removeEventListener("click", onSelect)
        marker.removeEventListener("focus", onSelect)
      })
    })
  }
}

document.addEventListener("nav", setupEventAtlas)
setupEventAtlas()
