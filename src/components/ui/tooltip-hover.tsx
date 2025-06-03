"use client"

import { useState } from "react";

export const useTooltipOnTruncate = () => {
    const [tooltipState, setTooltipState] = useState<{
      show: boolean;
      text: string;
      position: { x: number; y: number };
    }>({
      show: false,
      text: '',
      position: { x: 0, y: 0 }
    });
  
    const isTextTruncated = (element: HTMLElement): boolean => {
      return element.scrollWidth > element.clientWidth;
    };
  
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, text: string) => {
      const target = e.currentTarget;
      
      if (isTextTruncated(target)) {
        const rect = target.getBoundingClientRect();
        setTooltipState({
          show: true,
          text: text,
          position: {
            x: rect.left + rect.width / 2,
            y: rect.top - 10
          }
        });
      }
    };
  
    const handleMouseLeave = () => {
      setTooltipState(prev => ({ ...prev, show: false }));
    };
  
    const TooltipComponent = () => (
      tooltipState.show ? (
        <div
          className="fixed z-50 px-2 py-1 text-xs text-white bg-blue-base rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full transition-opacity duration-200"
          style={{
            left: tooltipState.position.x,
            top: tooltipState.position.y,
          }}
        >
          {tooltipState.text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      ) : null
    );
  
    return {
      handleMouseEnter,
      handleMouseLeave,
      TooltipComponent
    };
  };