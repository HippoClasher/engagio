"use client"

import Image from "next/image"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className = "", width = 120, height = 40 }: LogoProps) {
  return (
    <>
      {/* Light theme logo */}
      <Image
        src="/engagio-logo-light.svg"
        alt="Engagio"
        width={width}
        height={height}
        className={`block dark:hidden ${className}`}
        priority
      />

      {/* Dark theme logo */}
      <Image
        src="/engagio-logo-dark.svg"
        alt="Engagio"
        width={width}
        height={height}
        className={`hidden dark:block ${className}`}
        priority
      />
    </>
  )
}
