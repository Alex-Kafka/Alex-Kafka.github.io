import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Хроники Расколотых Островов",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ru-RU",
    baseUrl: "Alex-Kafka.github.io",
    ignorePatterns: ["private", "templates", ".obsidian", "_system", ".chronicler.vault.json"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: "Cinzel",
        header: "Cinzel",
        body: "Literata",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f4efe4",
          lightgray: "#e7decc",
          gray: "#9a8c78",
          darkgray: "#403832",
          dark: "#21191a",
          secondary: "#7d2431",
          tertiary: "#9c713c",
          highlight: "rgba(125, 36, 49, 0.12)",
          textHighlight: "#d7b46a66",
        },
        darkMode: {
          light: "#151112",
          lightgray: "#2a2224",
          gray: "#746568",
          darkgray: "#d8cfc2",
          dark: "#f3eadb",
          secondary: "#d36a78",
          tertiary: "#c79a5c",
          highlight: "rgba(211, 106, 120, 0.14)",
          textHighlight: "#c79a5c55",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents({ minEntries: 0 }),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
