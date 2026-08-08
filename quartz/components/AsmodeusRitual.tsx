import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/asmodeusRitual.scss"

// @ts-ignore
import guardScript from "./scripts/asmodeusGuard.inline"
// @ts-ignore
import ritualScript from "./scripts/asmodeusRitual.inline"

const AsmodeusRitual: QuartzComponent = () => null

AsmodeusRitual.css = style
AsmodeusRitual.beforeDOMLoaded = guardScript
AsmodeusRitual.afterDOMLoaded = ritualScript

export default (() => AsmodeusRitual) satisfies QuartzComponentConstructor
