import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function getSiteUrl() {
  const configuredUrl = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL

  if (!configuredUrl) return null

  const normalizedUrl = configuredUrl.includes('://')
    ? configuredUrl
    : `https://${configuredUrl}`

  return normalizedUrl.replace(/\/+$/, '')
}

function siteMetadataPlugin() {
  const siteUrl = getSiteUrl()
  const metadataBlock = /<!-- SITE_URL_METADATA_START -->([\s\S]*?)<!-- SITE_URL_METADATA_END -->/g

  return {
    name: 'site-url-metadata',
    transformIndexHtml(html) {
      if (!siteUrl) return html.replace(metadataBlock, '')

      return html
        .replace(metadataBlock, '$1')
        .replaceAll('__SITE_URL__', siteUrl)
    },
    generateBundle() {
      if (!siteUrl) return

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n  </url>\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), siteMetadataPlugin()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
