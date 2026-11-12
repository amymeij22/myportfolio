"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 768

function subscribeToBreakpoint(breakpoint: number, callback: () => void) {
  const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

export function useIsMobile(): boolean {
  return React.useSyncExternalStore(
    (callback) => subscribeToBreakpoint(MOBILE_BREAKPOINT, callback),
    () => window.innerWidth < MOBILE_BREAKPOINT,
    () => false
  )
}

export function useMobile(breakpoint = MOBILE_BREAKPOINT): boolean {
  return React.useSyncExternalStore(
    (callback) => subscribeToBreakpoint(breakpoint, callback),
    () => window.innerWidth < breakpoint,
    () => false
  )
}
