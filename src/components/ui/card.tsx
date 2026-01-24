import * as React from "react"
import cn from "@/utils/cn"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl bg-blue-300/10 border border-blue-300/10 shadow",
        className
      )}
      {...props}
    />
  )
}

function CardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex mt-5 h-25 w-25 items-center justify-center rounded-full bg-blue-500",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("mt-4 text-lg font-semibold text-center ", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-center text-sm text-muted-foreground mb-6 px-4", className)}
      {...props}
    />
  )
}

export { Card, CardIcon, CardTitle, CardDescription }
