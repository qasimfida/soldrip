import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "lg" | "md" | "sm";
}

export function Container({ children, className, size = "lg", ...props }: ContainerProps) {
  return (
    <div
      className={cn("w-full  mx-auto px-5", size === "lg" ? "max-w-[1400px]" : size === "md" ? "max-w-[1048px]" : "max-w-[600px]", className)}
      {...props}
    >
      {children}
    </div>
  );
} 