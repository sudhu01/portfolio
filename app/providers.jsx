"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

