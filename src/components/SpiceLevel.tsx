import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export const SpiceLevel = ({ level, className }: { level: number; className?: string }) => (
  <div className={cn("flex items-center gap-0.5", className)} aria-label={`Spice level ${level} of 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Flame
        key={i}
        className={cn("h-3.5 w-3.5", i < level ? "fill-primary text-primary" : "text-muted-foreground/30")}
      />
    ))}
  </div>
);
