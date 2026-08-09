import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FilePath, FullSlug, resolveRelative, slugifyFilePath } from "../util/path"
import style from "./styles/eventMap.scss"
// @ts-ignore
import script from "./scripts/eventMap.inline"

type MapKey = "world" | "rivendalos"
type MarkerKind = "city" | "party" | "army" | "threat" | "place"
type RouteKind = "imperial" | "party" | "hostile" | "trade"

type EventMarker = {
  id: string
  kind: MarkerKind
  x: number
  y: number
  glyph: string
  image?: FilePath
  accent?: string
  title: string
  kicker: string
  summary: string
  slug?: FullSlug
}

type EventRoute = {
  id: string
  kind: RouteKind
  x1: number
  y1: number
  cx: number
  cy: number
  x2: number
  y2: number
  label: string
  accent?: string
}

type Era = {
  id: string
  date: string
  navTitle: string
  title: string
  map: MapKey
  summary: string
  markers: EventMarker[]
  routes: EventRoute[]
}

const eras: Era[] = [
  {
    id: "arrival",
    date: "21 год до О.И.",
    navTitle: "Прибытие",
    title: "Экспедиция достигает архипелага",
    map: "world",
    summary:
      "Корабли Дориана проходят через эфирную бурю и оказываются у восточного острова. Обратный путь в Фаэрун исчезает, а выжившие начинают основывать первые поселения.",
    markers: [
      {
        id: "dorian-expedition",
        kind: "party",
        x: 88,
        y: 17,
        glyph: "◆",
        accent: "#e2b45b",
        title: "Экспедиция Дориана",
        kicker: "Флот · прибытие",
        summary:
          "Корабли адмирала Дориана появляются у будущих имперских земель после перехода через эфирную бурю.",
        slug: "История/Экспедиция-Дориана" as FullSlug,
      },
      {
        id: "first-settlement",
        kind: "city",
        x: 72,
        y: 23,
        glyph: "♜",
        image: "Изображения/Флаги/Флаг Империи Дориана.png" as FilePath,
        accent: "#e2b45b",
        title: "Будущий Дориан-Лэнд",
        kicker: "Поселение",
        summary: "Укреплённое поселение экспедиции позднее станет столицей Империи Дориана.",
        slug: "Локации/Дориан-Лэнд" as FullSlug,
      },
      {
        id: "bronze-realms",
        kind: "army",
        x: 81,
        y: 50,
        glyph: "♞",
        title: "Земли бронзовых драконов",
        kicker: "Древняя сила",
        summary:
          "Восточный остров ещё хранит государства бронзовых драконов, чья война с людьми только начинается.",
        slug: "История/Война-с-бронзовыми-драконами" as FullSlug,
      },
      {
        id: "mystic-storm-arrival",
        kind: "place",
        x: 51,
        y: 43,
        glyph: "◈",
        title: "Мистический шторм",
        kicker: "Неизменная область",
        summary: "Шторм отрезает архипелаг от внешнего мира и ломает привычные морские маршруты.",
        slug: "Локации/Мистический-шторм" as FullSlug,
      },
    ],
    routes: [
      {
        id: "arrival-route",
        kind: "imperial",
        accent: "#e2b45b",
        x1: 85.5,
        y1: 18,
        cx: 80,
        cy: 14,
        x2: 75,
        y2: 22,
        label: "Путь экспедиции",
      },
    ],
  },
  {
    id: "dragon-war",
    date: "До 0 О.И.",
    navTitle: "Война драконов",
    title: "Война и основание Империи",
    map: "world",
    summary:
      "Поселения Дориана расширяются по восточному острову. Война с бронзовыми драконами заканчивается их гибелью, а новый порядок получает имя своего основателя.",
    markers: [
      {
        id: "dorian-army",
        kind: "army",
        x: 74,
        y: 35,
        glyph: "⚔",
        accent: "#e2b45b",
        title: "Войско Дориана",
        kicker: "Армия · наступление",
        summary: "Человеческие войска продвигаются на юг восточного острова под властью Дориана.",
        slug: "Персонажи/Дориан" as FullSlug,
      },
      {
        id: "dragon-host",
        kind: "army",
        x: 79,
        y: 61,
        glyph: "♞",
        title: "Бронзовые драконы",
        kicker: "Армия · оборона",
        summary:
          "Последние силы бронзовых драконов сопротивляются продвижению людей. Современные хроники спорят о причинах войны.",
        slug: "История/Война-с-бронзовыми-драконами" as FullSlug,
      },
      {
        id: "dorian-land-founded",
        kind: "city",
        x: 69,
        y: 18,
        glyph: "♜",
        image: "Изображения/Флаги/Флаг Империи Дориана.png" as FilePath,
        accent: "#e2b45b",
        title: "Дориан-Лэнд",
        kicker: "Столица · основание",
        summary:
          "Северная крепость становится столицей нового государства и центром имперской власти.",
        slug: "Миры/Империя-Дориана" as FullSlug,
      },
      {
        id: "asmodeus-first-death",
        kind: "threat",
        x: 84,
        y: 46,
        glyph: "✦",
        image: "Изображения/Портреты/Дейомас.png" as FilePath,
        accent: "#9c78d8",
        title: "Падение Асмодея",
        kicker: "Перелом войны",
        summary:
          "Дориан четвертует бронзового дракона Асмодея и казнит его, однако смерть не завершает их противостояние.",
        slug: "Персонажи/Асмодей" as FullSlug,
      },
    ],
    routes: [
      {
        id: "imperial-push",
        kind: "imperial",
        accent: "#e2b45b",
        x1: 74.5,
        y1: 39,
        cx: 76,
        cy: 47,
        x2: 78.3,
        y2: 56.5,
        label: "Продвижение людей",
      },
    ],
  },
  {
    id: "deyomas",
    date: "≈ 20 О.И.",
    navTitle: "Поход Дейомаса",
    title: "Алмазное сердце и рождение всадников",
    map: "world",
    summary:
      "Примерно восемьсот лет назад Дейомас собирает спутников в Дориан-Лэнде и ведёт корабль к водовороту. Поход заканчивается победой над Дорианом и превращением погибших друзей во всадников.",
    markers: [
      {
        id: "deyomas-party",
        kind: "party",
        x: 72,
        y: 20,
        glyph: "◆",
        image: "Изображения/Портреты/Дейомас.png" as FilePath,
        accent: "#9c78d8",
        title: "Дейомас и спутники",
        kicker: "Группа · начало похода",
        summary:
          "Дейомас встречает спутников на пристани Дориан-Лэнда и объявляет охоту за алмазным сердцем.",
        slug: "История/Хроника-Дейомаса" as FullSlug,
      },
      {
        id: "soul-prison",
        kind: "place",
        x: 50,
        y: 55,
        glyph: "◈",
        title: "Тюрьма душ",
        kicker: "Скрытая область",
        summary:
          "За водоворотом скрыта пещера, где Дориан намеревался похоронить алмазное сердце короля драконов.",
        slug: "Локации/Тюрьма-душ" as FullSlug,
      },
      {
        id: "dorian-champions",
        kind: "army",
        x: 66,
        y: 47,
        glyph: "⚔",
        image: "Изображения/Флаги/Флаг Империи Дориана.png" as FilePath,
        accent: "#e2b45b",
        title: "Имперские чемпионы",
        kicker: "Охрана · Тюрьма душ",
        summary: "Воины Империи и магическая защита удерживают проход к сердцу.",
        slug: "История/Путешествие-Дейомаса" as FullSlug,
      },
      {
        id: "riders-born",
        kind: "threat",
        x: 44,
        y: 63,
        glyph: "✦",
        image: "Изображения/Арты/Всадник.jpg" as FilePath,
        accent: "#9c78d8",
        title: "Пять бессмертных всадников",
        kicker: "Новая сила",
        summary:
          "После гибели спутников Асмодей использует сердце матери и возвращает друзей как бессмертных всадников.",
        slug: "Организации/Бессмертные-всадники" as FullSlug,
      },
    ],
    routes: [
      {
        id: "deyomas-voyage",
        kind: "party",
        accent: "#9c78d8",
        x1: 69.5,
        y1: 23,
        cx: 58,
        cy: 25,
        x2: 52,
        y2: 51,
        label: "Путь к водовороту",
      },
    ],
  },
  {
    id: "campaigns-846",
    date: "846 О.И.",
    navTitle: "Три кампании",
    title: "Киллёрн, Фарман и Ривендалос",
    map: "world",
    summary:
      "События трёх игр разворачиваются параллельно: герои Киллёрна раскрывают заговор Асмодея, охотники входят в туманный Фарман, а Алый Орден оказывается внутри восстания Ривендалоса.",
    markers: [
      {
        id: "killern-heroes",
        kind: "party",
        x: 29,
        y: 20,
        glyph: "◆",
        image: "Изображения/Портреты/Алия.png" as FilePath,
        accent: "#6fb69a",
        title: "Герои Киллёрна",
        kicker: "Группа · Киллёрн",
        summary:
          "Алия, Эрдогаст, Хильдегарта и Шэд расследуют Железную чуму и вступают в борьбу за власть в городе.",
        slug: "История/Хроника-Киллёрна" as FullSlug,
      },
      {
        id: "velisatr-army",
        kind: "army",
        x: 38,
        y: 31,
        glyph: "⚔",
        accent: "#d6636f",
        title: "Армия Велисатра",
        kicker: "Армия · движение",
        summary:
          "После переворота лич Велисатр ведёт войско к Киллёрну, стремясь уничтожить новую власть.",
        slug: "История/Осада-Киллёрна" as FullSlug,
      },
      {
        id: "farman-hunters",
        kind: "party",
        x: 48,
        y: 37,
        glyph: "◆",
        accent: "#6c9fbb",
        title: "Охотники Фармана",
        kicker: "Группа · положение неизвестно",
        summary:
          "Путники входят в легендарный город, появившийся в тумане. Его точное место на карте остаётся неподтверждённым.",
        slug: "История/Хроника-Фармана" as FullSlug,
      },
      {
        id: "scarlet-order-846",
        kind: "party",
        x: 81,
        y: 68,
        glyph: "◆",
        image: "Изображения/Портреты/Сзималли Отлаш.png" as FilePath,
        accent: "#c95063",
        title: "Отряд Алого Ордена",
        kicker: "Группа · Ривендалос",
        summary:
          "Семеро Алых служат канцлеру Болафу, но после победы сепаратистов покидают город, не приняв методы местной ячейки.",
        slug: "История/Хроника-Алого-Ордена" as FullSlug,
      },
    ],
    routes: [
      {
        id: "velisatr-march",
        kind: "hostile",
        accent: "#d6636f",
        x1: 36,
        y1: 29,
        cx: 35,
        cy: 24,
        x2: 31,
        y2: 22,
        label: "Марш на Киллёрн",
      },
      {
        id: "scarlet-retreat",
        kind: "party",
        accent: "#c95063",
        x1: 81,
        y1: 66,
        cx: 85,
        cy: 72,
        x2: 88,
        y2: 78,
        label: "Бегство из города",
      },
    ],
  },
  {
    id: "rivendalos",
    date: "846–847 О.И.",
    navTitle: "Ривендалос",
    title: "Падение города и наступление Хвори",
    map: "rivendalos",
    summary:
      "Подробная карта показывает путь Алого Ордена от захваченного Ривендалоса через островную тюрьму и Кормчий лес к заставе Воргира, а затем — к месту временной победы над Хворью.",
    markers: [
      {
        id: "rivendalos-city",
        kind: "city",
        x: 50,
        y: 43,
        glyph: "♜",
        title: "Ривендалос",
        kicker: "Город · власть сепаратистов",
        summary:
          "После гибели канцлера Болафа сепаратисты захватывают город. Алые не переходят на их сторону.",
        slug: "Локации/Ривендалос" as FullSlug,
      },
      {
        id: "island-prison",
        kind: "place",
        x: 50,
        y: 76,
        glyph: "◈",
        title: "Островная тюрьма",
        kicker: "Последняя имперская крепость",
        summary: "Герои убивают Безликого и отвергают созданную им армию сломленных узников.",
        slug: "Персонажи/Безликий-Ривендалоса" as FullSlug,
      },
      {
        id: "vorgir-outpost",
        kind: "city",
        x: 86,
        y: 78,
        glyph: "♜",
        title: "Застава Воргира",
        kicker: "Военный лагерь",
        summary:
          "Алые достигают заставы, где ночью видят общий сон о всаднике, а утром сталкиваются с поднятыми мертвецами.",
        slug: "Локации/Застава-Воргира" as FullSlug,
      },
      {
        id: "scarlet-order-route",
        kind: "party",
        x: 62,
        y: 60,
        glyph: "◆",
        image: "Изображения/Портреты/Сзималли Отлаш.png" as FilePath,
        accent: "#c95063",
        title: "Семеро Алых",
        kicker: "Группа · движение",
        summary:
          "Сзималли, Гаррет Стальной, Лиара, Даррия, Морякус, Ланселис и Луций движутся через Кормчий лес.",
        slug: "Организации/Алый-Орден" as FullSlug,
      },
      {
        id: "plague-form",
        kind: "threat",
        x: 72,
        y: 76,
        glyph: "✦",
        image: "Изображения/Арты/Хворь.jpg" as FilePath,
        accent: "#9c78d8",
        title: "Хворь и всадник",
        kicker: "Угроза · временно уничтожена",
        summary:
          "В безымянной деревне герои разрушают физическое воплощение Хвори и оболочку всадника, напоминающего Лорен.",
        slug: "История/Нашествие-Хвори" as FullSlug,
      },
      {
        id: "vorgir-force",
        kind: "army",
        x: 84,
        y: 48,
        glyph: "⚔",
        image: "Изображения/Флаги/Флаг Империи Дориана.png" as FilePath,
        accent: "#d6636f",
        title: "Силы Воргира",
        kicker: "Смешанный гарнизон",
        summary: "На пути к заставе встречаются имперские знаки и снаряжение бывших сепаратистов.",
        slug: "Персонажи/Воргир" as FullSlug,
      },
    ],
    routes: [
      {
        id: "toward-vorgir",
        kind: "party",
        accent: "#c95063",
        x1: 65,
        y1: 61,
        cx: 76,
        cy: 55,
        x2: 82.5,
        y2: 75.5,
        label: "К заставе",
      },
    ],
  },
  {
    id: "current",
    date: "847 О.И.",
    navTitle: "Нынешний год",
    title: "Мир после первых побед над Хворью",
    map: "world",
    summary:
      "Киллёрном управляет сенат, Эрдогаст возвращается из Башни знаний, Шэд идёт к Империи, а семеро Алых несут канцлерам предупреждение о Хвори и бессмертных всадниках.",
    markers: [
      {
        id: "killern-senate",
        kind: "city",
        x: 29,
        y: 20,
        glyph: "♜",
        image: "Изображения/Портреты/Алия.png" as FilePath,
        accent: "#6fb69a",
        title: "Сенат Киллёрна",
        kicker: "Город · новая власть",
        summary:
          "Алия ведёт государственные дела, Хильдегарта отвечает за оборону вместе с Мальтусом, а место Эрдогаста остаётся свободным.",
        slug: "Организации/Сенат-Киллёрна" as FullSlug,
      },
      {
        id: "erdogast-return",
        kind: "party",
        x: 21,
        y: 31,
        glyph: "◆",
        image: "Изображения/Портреты/Эрдогаст.png" as FilePath,
        accent: "#72a9b5",
        title: "Эрдогаст возвращается",
        kicker: "Один путник · движение",
        summary:
          "После посещения Башни знаний Эрдогаст принимает решение вернуться в Киллёрн. Сейчас он ещё в пути.",
        slug: "Персонажи/Эрдогаст" as FullSlug,
      },
      {
        id: "shaed-pilgrimage",
        kind: "party",
        x: 45,
        y: 34,
        glyph: "◆",
        image: "Изображения/Портреты/Шэд.png" as FilePath,
        accent: "#8f78cf",
        title: "Паломничество Шэда",
        kicker: "Один путник · движение",
        summary: "Шэд покинул Киллёрн и направился в сторону Империи.",
        slug: "Персонажи/Шэд" as FullSlug,
      },
      {
        id: "scarlet-warning",
        kind: "party",
        x: 77,
        y: 59,
        glyph: "◆",
        image: "Изображения/Портреты/Сзималли Отлаш.png" as FilePath,
        accent: "#c95063",
        title: "Алый Орден несёт предупреждение",
        kicker: "Семеро путников · движение",
        summary:
          "Все семеро выживших направляются к одному из канцлеров Империи, чтобы рассказать о Хвори и всадниках.",
        slug: "Организации/Алый-Орден" as FullSlug,
      },
      {
        id: "plague-rivendalos",
        kind: "threat",
        x: 88,
        y: 77,
        glyph: "✦",
        image: "Изображения/Арты/Хворь.jpg" as FilePath,
        accent: "#9c78d8",
        title: "Хворь у Ривендалоса",
        kicker: "Угроза · способна вернуться",
        summary:
          "Физическое тело Хвори уничтожено лишь временно. Болезнь и всадники остаются действующей угрозой.",
        slug: "Бестиарий/Хворь" as FullSlug,
      },
      {
        id: "federation-guilds",
        kind: "city",
        x: 31,
        y: 69,
        glyph: "♜",
        image: "Изображения/Флаги/Флаг Федерации.png" as FilePath,
        accent: "#d8aa52",
        title: "Федерация трёх гильдий",
        kicker: "Государство · торговые пути",
        summary:
          "Пираты, маги и каменщики поддерживают порядок и свободный рынок на юго-западном острове.",
        slug: "Миры/Остров-Федерации" as FullSlug,
      },
    ],
    routes: [
      {
        id: "erdogast-home",
        kind: "party",
        accent: "#72a9b5",
        x1: 22.5,
        y1: 29.5,
        cx: 24,
        cy: 23,
        x2: 27.2,
        y2: 22.8,
        label: "Возвращение в Киллёрн",
      },
      {
        id: "shaed-east",
        kind: "party",
        accent: "#8f78cf",
        x1: 45,
        y1: 34,
        cx: 56,
        cy: 28,
        x2: 69,
        y2: 24,
        label: "Путь Шэда",
      },
      {
        id: "scarlet-to-capital",
        kind: "imperial",
        accent: "#c95063",
        x1: 76.6,
        y1: 55.5,
        cx: 75,
        cy: 42,
        x2: 72,
        y2: 27,
        label: "Доклад канцлеру",
      },
    ],
  },
]

const mapAssets: Record<MapKey, FilePath> = {
  world: "Миры/Острова.PNG" as FilePath,
  rivendalos: "Изображения/Арты/Карта игры алого ордена 2.png" as FilePath,
}

const markerKindLabels: Record<MarkerKind, string> = {
  city: "Город или государство",
  party: "Группа персонажей",
  army: "Армия",
  threat: "Угроза",
  place: "Особое место",
}

const routeKindColors: Record<RouteKind, string> = {
  imperial: "#e2b45b",
  party: "#75c8e7",
  hostile: "#e06d78",
  trade: "#d8b862",
}

function routePath(route: EventRoute): string {
  return `M ${route.x1} ${route.y1} Q ${route.cx} ${route.cy} ${route.x2} ${route.y2}`
}

const EventMap: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug !== ("История/Карта-событий" as FullSlug)) return null

  const assetHref = (asset: FilePath) =>
    resolveRelative(fileData.slug!, slugifyFilePath(asset) as FullSlug)
  const pageHref = (slug?: FullSlug) => (slug ? resolveRelative(fileData.slug!, slug) : "")
  const firstEra = eras[0]

  return (
    <section class="event-atlas" aria-labelledby="event-atlas-title">
      <header class="event-atlas-header">
        <div>
          <span class="event-atlas-eyebrow">Состояние мира</span>
          <h2 id="event-atlas-title">Летопись на карте</h2>
          <p>
            Выберите период, затем наведите курсор на знак или нажмите на него. Стрелки показывают
            известное направление движения.
          </p>
        </div>
        <div class="event-atlas-date" aria-live="polite">
          <span data-era-date>{firstEra.date}</span>
          <strong data-era-title>{firstEra.title}</strong>
        </div>
      </header>

      <div class="event-atlas-timeline" role="tablist" aria-label="Периоды истории">
        {eras.map((era, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={index === 0 ? "true" : "false"}
            aria-controls={`event-era-${era.id}`}
            class={index === 0 ? "is-active" : ""}
            data-era-target={era.id}
          >
            <span>{era.date}</span>
            <strong>{era.navTitle}</strong>
          </button>
        ))}
      </div>

      <div class="event-atlas-layout">
        <div class="event-atlas-map-shell">
          <div class="event-atlas-map" aria-live="polite">
            {eras.map((era, eraIndex) => (
              <div
                id={`event-era-${era.id}`}
                class={`event-atlas-layer ${eraIndex === 0 ? "is-active" : ""}`}
                data-era={era.id}
                data-map={era.map}
                data-era-date={era.date}
                data-era-title={era.title}
                data-era-summary={era.summary}
                role="tabpanel"
                hidden={eraIndex !== 0}
              >
                <img
                  src={assetHref(mapAssets[era.map])}
                  alt=""
                  loading={eraIndex === 0 ? "eager" : "lazy"}
                />
                <div class="event-atlas-vignette" aria-hidden="true"></div>
                <svg
                  class="event-atlas-routes"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-label="Направления движения"
                >
                  <defs>
                    {era.routes.map((route) => {
                      const routeColor = route.accent ?? routeKindColors[route.kind]
                      return (
                        <marker
                          id={`event-arrow-${era.id}-${route.id}`}
                          markerWidth="7"
                          markerHeight="7"
                          refX="5.6"
                          refY="3"
                          orient="auto"
                          markerUnits="strokeWidth"
                        >
                          <path d="M 0 0 L 0 6 L 6 3 Z" style={{ fill: routeColor }}></path>
                        </marker>
                      )
                    })}
                  </defs>
                  {era.routes.map((route) => {
                    const routeColor = route.accent ?? routeKindColors[route.kind]
                    const path = routePath(route)
                    return (
                      <g style={{ "--atlas-route-color": routeColor } as any}>
                        <path class="event-route-shadow" d={path}></path>
                        <path
                          class={`event-route event-route--${route.kind}`}
                          d={path}
                          marker-end={`url(#event-arrow-${era.id}-${route.id})`}
                        >
                          <title>{route.label}</title>
                        </path>
                      </g>
                    )
                  })}
                </svg>

                {era.markers.map((marker) => {
                  const edgeClass =
                    marker.x > 74 ? "is-right-edge" : marker.x < 26 ? "is-left-edge" : ""
                  const verticalClass = marker.y < 36 ? "is-top-edge" : ""
                  return (
                    <button
                      type="button"
                      class={`event-marker event-marker--${marker.kind} ${marker.image ? "has-image" : ""} ${edgeClass} ${verticalClass}`}
                      style={
                        {
                          left: `${marker.x}%`,
                          top: `${marker.y}%`,
                          "--marker-color": marker.accent,
                        } as any
                      }
                      data-marker-title={marker.title}
                      data-marker-kicker={marker.kicker}
                      data-marker-summary={marker.summary}
                      data-marker-href={pageHref(marker.slug)}
                      aria-label={`${markerKindLabels[marker.kind]}: ${marker.title}`}
                    >
                      <span class="event-marker-pulse" aria-hidden="true"></span>
                      <span class="event-marker-core" aria-hidden="true">
                        {marker.image ? (
                          <img src={assetHref(marker.image)} alt="" loading="lazy" />
                        ) : (
                          marker.glyph
                        )}
                      </span>
                      <span class="event-marker-tooltip" role="tooltip">
                        <small>{marker.kicker}</small>
                        <strong>{marker.title}</strong>
                        <span>{marker.summary}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          <div class="event-atlas-legend" aria-label="Условные обозначения">
            <span class="legend-city">Город</span>
            <span class="legend-party">Группа</span>
            <span class="legend-army">Армия</span>
            <span class="legend-threat">Угроза</span>
            <span class="legend-route">Движение</span>
          </div>
        </div>

        <aside class="event-atlas-detail" aria-live="polite">
          <span class="event-detail-kicker" data-detail-kicker>
            Обзор периода
          </span>
          <h3 data-detail-title>{firstEra.title}</h3>
          <p data-detail-summary>{firstEra.summary}</p>
          <a class="internal event-detail-link" data-detail-link href="" hidden>
            Открыть статью
          </a>
          <div class="event-detail-hint">
            <span>Наведение</span>
            <p>Показывает краткую справку прямо на карте.</p>
            <span>Нажатие</span>
            <p>Закрепляет сведения в этой панели.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}

EventMap.css = style
EventMap.afterDOMLoaded = script

export default (() => EventMap) satisfies QuartzComponentConstructor
