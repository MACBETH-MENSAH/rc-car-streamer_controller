import { useEffect } from "react";
import { VirtualJoystick } from "@/components/VirtualJoystick";
import { LedToggle } from "@/components/LedToggle";
import { SettingsMenu } from "@/components/SettingsMenu";

const Index = () => {
  // Force landscape orientation with proper type checking
  useEffect(() => {
    const lockOrientation = async () => {
      try {
        if (screen.orientation && 'lock' in screen.orientation) {
          await (screen.orientation as any).lock('landscape');
        } else {
          console.log("Screen orientation lock not supported on this device");
        }
      } catch (error) {
        console.log("Failed to lock orientation:", error);
      }
    };
    lockOrientation();
  }, []);

  const handleMovementJoystick = (x: number, y: number) => {
    console.log("Movement:", { x, y });
  };

  const handleCameraJoystick = (x: number, y: number) => {
    console.log("Camera:", { x, y });
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Mock video feed background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black to-secondary/20" />
      
      <LedToggle />
      <SettingsMenu />

      <div className="absolute inset-0 flex items-center justify-between px-12">
        <VirtualJoystick
          onChange={handleMovementJoystick}
          label="Movement"
        />
        <VirtualJoystick
          onChange={handleCameraJoystick}
          label="Camera"
        />
      </div>
    </div>
  );
};

export default Index;