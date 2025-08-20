import React from "react";

interface InputErrorTooltipProps {
  message: string;
}

export function InputErrorTooltip({ message }: InputErrorTooltipProps) {
  return (
    <div className="absolute left-0 -bottom-8 bg-white text-red-500 text-xs rounded px-2 py-1 shadow-md border border-neutral-200 whitespace-nowrap z-20">
      {message}
    </div>
  );
}
