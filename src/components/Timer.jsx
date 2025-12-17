import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

const MODES = {
  foco: { label: "Foco", time: 25 * 60, color: "roxo" },
  pausaCurta: { label: "Pausa Curta", time: 5 * 60, color: "laranja" },
  pausaLonga: { label: "Pausa Longa", time: 15 * 60, color: "verde" },
};

function playBeep(type = "foco") {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = type === "foco" ? 880 : 440;
  gain.gain.value = 0.2;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.5);
}

export default function Timer() {
  const [mode, setMode] = useState("foco");
  const [time, setTime] = useState(MODES.foco.time);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    if (hrs > 0) {
      return `${String(hrs).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  } 


  function addMinutes(minutes) {
    setTime(prev => prev + minutes * 60);
  }

  function changeMode(newMode) {
    setMode(newMode);
    setTime(MODES[newMode].time);
    setIsRunning(false);
    setFinished(false);
    clearInterval(intervalRef.current);
  }

  function resetTime() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setIsRunning(false);
    setFinished(false);
    setTime(MODES[mode].time);
  }

  function tick() {
    setTime(prev => {
      if (prev <= 1) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setFinished(true);
        playBeep(mode);
        return 0;
      }
      return prev - 1;
    });
  }



  function toggleTimer() {
    if (finished) {
      setTime(MODES[mode].time);
      setFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning(prev => !prev);
    }
  }

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return;
    }

    setTime(prev => {
      if (prev <= 1) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setFinished(true);
        playBeep(mode);
        return 0;
      }
      return prev - 1;
    });

    intervalRef.current = setInterval(() => {
        setTime(prev => {
        if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setFinished(true);
            playBeep(mode);
            return 0;
        }
        return prev - 1;
        });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);


  return (
    <div className="flex flex-col justify-between w-[430px] h-[420px]">
      <div className="flex justify-between">
        {Object.entries(MODES).map(([key, value]) => (
          <Button
            key={key}
            size="xg"
            variant={mode === key ? value.color : "cinza"}
            activeColor={MODES[mode].color}
            onClick={() => changeMode(key)}
          >
            {value.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-center">
        <p className="text-white font-extrabold text-8xl">
          {formatTime(time)}
        </p>
      </div>

      <div className="flex justify-between">
        <Button size="fixedsm" variant="letraCinza" onClick={() => addMinutes(25)}>+25 min</Button>
        <Button size="fixedsm" variant="letraCinza" onClick={() => addMinutes(10)}>+10 min</Button>
        <Button size="fixedsm" variant="letraCinza" onClick={() => addMinutes(5)}>+5 min</Button>
        <Button size="fixedsm" variant="letraCinza" onClick={() => addMinutes(1)}>+1 min</Button>
      </div>

      <div className="flex justify-center gap-4">
        <Button
            size="padrao"
            variant={MODES[mode].color}
            onClick={toggleTimer}
        >
            {finished ? "Reiniciar" : isRunning ? "Pausar" : "Iniciar"}
        </Button>

        {time !== MODES[mode].time && (
            <Button
            size="padrao"
            variant={MODES[mode].color}
            onClick={resetTime}
            >
            Resetar
            </Button>
        )}
        </div>

      <div className="flex justify-center">
        <p className="text-gray-default">Sem sessões hoje</p>
      </div>
      {finished && (
        <div className="text-center text-white font-semibold">
          Tempo encerrado ✅
        </div>
      )}
    </div>
  );
}
