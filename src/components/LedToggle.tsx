import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export const LedToggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={cn(
        "fixed top-4 right-4 p-3 rounded-full transition-all duration-300",
        "bg-secondary/50 backdrop-blur-sm border-2",
        isOn ? "border-primary text-primary" : "border-primary/30 text-primary/50"
      )}
    >
      <Lightbulb className={cn("w-6 h-6", isOn && "animate-pulse")} />
    </button>
  );
};