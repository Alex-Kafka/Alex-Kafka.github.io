function resetEntitySidebar(): void {
  const sidebar = document.querySelector<HTMLElement>(".sidebar.right")
  if (sidebar) sidebar.scrollTop = 0
}

document.addEventListener("nav", resetEntitySidebar)
resetEntitySidebar()
