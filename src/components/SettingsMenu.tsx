import { useState } from "react";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sensitivity, setSensitivity] = useState(50);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 p-3 rounded-full bg-secondary/50 backdrop-blur-sm border-2 border-primary/30 text-primary/50 hover:text-primary hover:border-primary transition-colors duration-300"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-md p-6 rounded-t-2xl bg-secondary/95 backdrop-blur-sm border-t-2 border-x-2 border-primary/30",
          "transition-all duration-300 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <h2 className="text-primary text-xl font-bold mb-6">Settings</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-primary/80 text-sm">Joystick Sensitivity</label>
            <input
              type="range"
              min="0"
              max="100"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-primary/60">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <button
            className="w-full py-2 rounded bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors"
          >
            Select Bluetooth Device
          </button>
        </div>
      </div>
    </>
  );
};