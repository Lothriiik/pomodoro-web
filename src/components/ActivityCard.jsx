import React from 'react';

const CARD_THEMES = {
  pink: {
    dot: "bg-primaryPink",
    time: "text-primaryPink/40",
    cycles: "text-primaryPink/50",
    background: "bg-primaryPink/10"
  },
  purple: {
    dot: "bg-primaryPurple",
    time: "text-primaryPurple/40",
    cycles: "text-primaryPurple/50",
    background: "bg-primaryPurple/10"
  },
  green: {
    dot: "bg-primaryGreen",
    time: "text-primaryGreen/40",
    cycles: "text-primaryGreen/50",
    background: "bg-primaryGreen/10"
  },
  red: {
    dot: "bg-primaryRed",
    time: "text-primaryRed/40",
    cycles: "text-primaryRed/50",
    background: "bg-primaryRed/10"
  },
  orange: {
    dot: "bg-primaryOrange",
    time: "text-primaryOrange/40",
    cycles: "text-primaryOrange/50",
    background: "bg-primaryOrange/10"
  },
  yellow: {
    dot: "bg-primaryYellow",
    time: "text-primaryYellow/40",
    cycles: "text-primaryYellow/50",
    background: "bg-primaryYellow/10"
  },
  blue: {
    dot: "bg-primaryBlue",
    time: "text-primaryBlue/40",
    cycles: "text-primaryBlue/50",
    background: "bg-primaryBlue/10"
  },
};

const getTheme = (color) => CARD_THEMES[color] || CARD_THEMES.purple;

export const ActivityCard = ({ time, title, tag, cycles, color }) => {
  const theme = getTheme(color);

  return (
    <div className={`flex flex-col justify-between p-3 mb-2 rounded-lg border border-white/5 ${theme.background} h-[clamp(5rem,17vh,7rem)] w-[clamp(6.25rem,8vw,16rem)] shrink-0 transition-all hover:brightness-110`}>
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${theme.dot}`} />
        <span className={`text-xs ${theme.time}`}>{time}</span>
      </div>
      
      <h4 className="text-white text-sm font-medium leading-tight line-clamp-2">
        {title}
      </h4>
      
      <div className="flex justify-between text-[10px] mt-1 items-center">
        <span className="text-gray-400 pr-1">{tag}</span>
        <div className="flex flex-col items-center leading-none shrink-0">
          <span className={`${theme.cycles} font-bold`}>{cycles}</span>
          <span className={`${theme.cycles}`}>ciclos</span>
        </div>
      </div>
    </div>
  );
};

export const ActivityCardReduced = ({ time, title, cycles, color }) => {
  const theme = getTheme(color);

  return (
    <div className={`flex flex-col gap-2 p-3 mb-2 rounded-lg border border-white/5 ${theme.background} h-22 w-[clamp(6.25rem,8vw,16rem)] shrink-0 transition-all hover:brightness-110`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${theme.dot}`} />
          <span className={`text-xs ${theme.time}`}>{time}</span>
        </div>
        <span className={`${theme.cycles} text-xs font-bold`}>{cycles}</span>
      </div>
      
      <h4 className="text-white text-sm font-medium ">
        {title}
      </h4>
    </div>
  );
};