"use client"

import React, { createContext, useContext, useEffect, useMemo, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"

import idMessages from "@/messages/id.json"
import enMessages from "@/messages/en.json"

export type Locale = "id" | "en"

export type Messages = typeof idMessages

const allMessages: Record<Locale, Messages> = {
  id: idMessages,
  en: enMessages,
}

interface I18nContextValue {
  locale: Locale
  messages: Messages
  t: (path: string, fallback?: string) => string
  tRaw: <T = unknown>(path: string, fallback?: T) => T
  switchLocale: (targetLocale: Locale) => void
  getHref: (href: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getNestedValue(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== "object") return undefined
  const parts = path.split(".")
  let current: unknown = obj
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return undefined
    }
  }
  return current
}

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const pathname = usePathname() || "/"
  const router = useRouter()

  // Derive locale from pathname (English routes are prefixed with /en)
  const locale: Locale = useMemo(() => {
    if (pathname === "/en" || pathname.startsWith("/en/")) {
      return "en"
    }
    return initialLocale || "id"
  }, [pathname, initialLocale])

  // Sync <html lang="..."> attribute for accessibility and crawlers
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
    }
  }, [locale])

  const messages = allMessages[locale]

  const t = useCallback(
    (path: string, fallback?: string): string => {
      const val = getNestedValue(messages, path)
      if (typeof val === "string") return val
      if (typeof val === "number" || typeof val === "boolean") return String(val)
      return fallback !== undefined ? fallback : path
    },
    [messages]
  )

  const tRaw = useCallback(
    <T = unknown,>(path: string, fallback?: T): T => {
      const val = getNestedValue(messages, path)
      if (val !== undefined) return val as T
      return fallback as T
    },
    [messages]
  )

  const switchLocale = useCallback(
    (targetLocale: Locale) => {
      if (targetLocale === locale) return

      // Persist selection via cookie and localStorage
      if (typeof document !== "undefined") {
        document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`
        try {
          localStorage.setItem("NEXT_LOCALE", targetLocale)
        } catch {
          // ignore localStorage access errors
        }
      }

      const currentHash = typeof window !== "undefined" ? window.location.hash : ""
      let targetPath = "/"

      if (targetLocale === "en") {
        if (pathname === "/") {
          targetPath = "/en"
        } else if (!pathname.startsWith("/en")) {
          targetPath = `/en${pathname}`
        } else {
          targetPath = pathname
        }
      } else {
        // Switching to id
        if (pathname === "/en" || pathname === "/en/") {
          targetPath = "/"
        } else if (pathname.startsWith("/en/")) {
          targetPath = pathname.replace(/^\/en/, "")
        } else {
          targetPath = pathname
        }
      }

      const finalUrl = `${targetPath}${currentHash}`
      router.push(finalUrl)
    },
    [locale, pathname, router]
  )

  const getHref = useCallback(
    (href: string): string => {
      const isEn = locale === "en"

      // External or empty links
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return href
      }

      // Hash links: e.g. "#hero" or "#tentang"
      if (href.startsWith("#")) {
        const isHomePage = isEn ? pathname === "/en" : pathname === "/"
        if (isHomePage) {
          return href
        }
        return isEn ? `/en${href}` : `/${href}`
      }

      // Root path
      if (href === "/") {
        return isEn ? "/en" : "/"
      }

      // Internal paths e.g. "/blog" or "/blog/1"
      if (isEn) {
        if (href.startsWith("/en")) return href
        return `/en${href}`
      } else {
        if (href.startsWith("/en/")) return href.replace(/^\/en/, "")
        if (href === "/en") return "/"
        return href
      }
    },
    [locale, pathname]
  )

  const contextValue = useMemo<I18nContextValue>(
    () => ({
      locale,
      messages,
      t,
      tRaw,
      switchLocale,
      getHref,
    }),
    [locale, messages, t, tRaw, switchLocale, getHref]
  )

  return (
    <I18nContext.Provider value={contextValue}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return ctx
}
