import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VirtualJoystickProps {
  onChange?: (x: number, y: number) => void;
  className?: string;
  label: string;
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({
  onChange,
  className,
  label,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number, clientY: number) => {
    if (!baseRef.current) return;
    setIsDragging(true);
    const rect = baseRef.current.getBoundingClientRect();
    updatePosition(clientX - rect.left, clientY - rect.top);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    updatePosition(clientX - rect.left, clientY - rect.top);
  };

  const handleEnd = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    onChange?.(0, 0);
  };

  const updatePosition = (x: number, y: number) => {
    if (!baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    let deltaX = x - centerX;
    let deltaY = y - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = rect.width / 3;
    
    if (distance > maxDistance) {
      const angle = Math.atan2(deltaY, deltaX);
      deltaX = Math.cos(angle) * maxDistance;
      deltaY = Math.sin(angle) * maxDistance;
    }
    
    setPosition({ x: deltaX, y: deltaY });
    
    // Normalize values between -1 and 1
    const normalizedX = deltaX / maxDistance;
    const normalizedY = deltaY / maxDistance;
    onChange?.(normalizedX, normalizedY);
  };

  useEffect(() => {
    const handleMouseUp = () => handleEnd();
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        ref={baseRef}
        className="relative w-32 h-32 rounded-full bg-secondary/50 backdrop-blur-sm border-2 border-primary/30"
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      >
        <div
          ref={joystickRef}
          className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8 rounded-full bg-primary/80 backdrop-blur-sm border-2 border-primary cursor-grab active:cursor-grabbing transition-transform duration-75"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        />
      </div>
      <span className="text-primary text-sm font-medium">{label}</span>
    </div>
  );
};