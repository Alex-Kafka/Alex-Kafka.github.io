import { JSX } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FilePath, FullSlug, resolveRelative, slugifyFilePath } from "../util/path"
import { classNames } from "../util/lang"
import style from "./styles/entityCard.scss"

type ImageMetadata = {
  fileName: string
  alt: string
}

const hiddenKeys = new Set([
  "title",
  "image",
  "socialImage",
  "cover",
  "subtitle",
  "tags",
  "tag",
  "aliases",
  "alias",
  "description",
  "socialDescription",
  "secret",
  "publish",
  "draft",
  "cssclasses",
  "cssclass",
  "created",
  "date",
  "modified",
  "lastmod",
  "updated",
  "published",
  "publishDate",
  "lang",
  "enableToc",
  "comments",
])

function getImageMetadata(rawImage: unknown, fallbackAlt: string): ImageMetadata | undefined {
  if (typeof rawImage === "string") {
    const wikiImage = rawImage.match(/^\[\[([^\]|,]+)(?:\||,\s*["']?([^\]]+?)["']?)?\]\]$/)
    if (wikiImage) {
      return {
        fileName: wikiImage[1].trim(),
        alt: wikiImage[2]?.replace(/["']$/, "").trim() || fallbackAlt,
      }
    }
    return { fileName: rawImage, alt: fallbackAlt }
  }

  if (Array.isArray(rawImage)) {
    const imageEntry = Array.isArray(rawImage[0]) ? rawImage[0] : rawImage
    if (typeof imageEntry[0] === "string") {
      return {
        fileName: imageEntry[0],
        alt: typeof imageEntry[1] === "string" ? imageEntry[1] : fallbackAlt,
      }
    }
  }

  return undefined
}

function findAssetPath(fileName: string, assetFiles: FilePath[]): FilePath | undefined {
  const normalizedName = fileName.replaceAll("\\", "/").replace(/^\.\//, "").toLocaleLowerCase()
  const baseName = normalizedName.split("/").at(-1)

  return (
    assetFiles.find((path) => path.toLocaleLowerCase() === normalizedName) ??
    assetFiles.find((path) => path.toLocaleLowerCase().endsWith(`/${normalizedName}`)) ??
    assetFiles.find((path) => path.toLocaleLowerCase().split("/").at(-1) === baseName)
  )
}

function pageHref(
  target: string,
  fileData: QuartzComponentProps["fileData"],
  allFiles: QuartzComponentProps["allFiles"],
): string | undefined {
  const page = allFiles.find(
    (candidate) =>
      candidate.frontmatter?.title?.toLocaleLowerCase() === target.toLocaleLowerCase() ||
      candidate.slug?.split("/").at(-1)?.toLocaleLowerCase() === target.toLocaleLowerCase(),
  )

  if (!page?.slug || !fileData.slug) return undefined
  return resolveRelative(fileData.slug, page.slug)
}

function renderValue(
  value: unknown,
  fileData: QuartzComponentProps["fileData"],
  allFiles: QuartzComponentProps["allFiles"],
): JSX.Element | string {
  const plainValue = Array.isArray(value) ? value.join(", ") : String(value)
  const parts: (JSX.Element | string)[] = []
  const linkPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = linkPattern.exec(plainValue)) !== null) {
    if (match.index > cursor) parts.push(plainValue.slice(cursor, match.index))

    const target = match[1].trim()
    const label = match[2]?.trim() || target
    const href = pageHref(target, fileData, allFiles)
    parts.push(
      href ? (
        <a class="internal" href={href}>
          {label}
        </a>
      ) : (
        label
      ),
    )
    cursor = match.index + match[0].length
  }

  if (cursor < plainValue.length) parts.push(plainValue.slice(cursor))
  return parts.length > 0 ? <>{parts}</> : plainValue
}

const EntityCard: QuartzComponent = ({
  ctx,
  fileData,
  allFiles,
  displayClass,
}: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter as Record<string, unknown> | undefined
  if (!frontmatter || fileData.slug === "index") return null

  const title = String(frontmatter.title ?? "Статья")
  const subtitle = typeof frontmatter.subtitle === "string" ? frontmatter.subtitle : undefined
  const rawImage = frontmatter.image ?? frontmatter.cover ?? frontmatter.socialImage
  const image = getImageMetadata(rawImage, title)
  const assetPath = image ? findAssetPath(image.fileName, ctx.allFiles) : undefined
  const imageHref =
    assetPath && fileData.slug
      ? resolveRelative(fileData.slug, slugifyFilePath(assetPath) as FullSlug)
      : undefined
  const tag = Array.isArray(frontmatter.tags) ? String(frontmatter.tags[0] ?? "") : ""
  const section = fileData.slug?.split("/")[0]?.replaceAll("-", " ")
  const kind = tag || section || "Статья"
  const properties = Object.entries(frontmatter).filter(
    ([key, value]) => !hiddenKeys.has(key) && value !== undefined && value !== null && value !== "",
  )

  return (
    <aside class={classNames(displayClass, "entity-card")} aria-label={`Карточка: ${title}`}>
      <div class="entity-card-header">
        <span class="entity-card-kind">{kind}</span>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {imageHref && (
        <figure class="entity-card-portrait">
          <img src={imageHref} alt={image?.alt ?? title} loading="eager" />
          <figcaption>{image?.alt ?? title}</figcaption>
        </figure>
      )}

      {properties.length > 0 && (
        <dl class="entity-card-properties">
          {properties.flatMap(([key, value]) => [
            <dt>{key}</dt>,
            <dd>{renderValue(value, fileData, allFiles)}</dd>,
          ])}
        </dl>
      )}
    </aside>
  )
}

EntityCard.css = style

export default (() => EntityCard) satisfies QuartzComponentConstructor
