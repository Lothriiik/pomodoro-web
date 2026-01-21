import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Button } from "./ui/button";
import { TIMER_MODES as STATIC_TIMER_MODES } from "../mocks/timerMock";
import { USERS_MOCK, CURRENT_USER_ID } from "../mocks/userMock";

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

const Timer = forwardRef(({ onReset }, ref) => {
  const [currentUser, setCurrentUser] = useState(USERS_MOCK.find(u => u.id === CURRENT_USER_ID) || USERS_MOCK[0]);

  useEffect(() => {
    const handleUpdate = () => {
      const updatedUser = USERS_MOCK.find(u => u.id === CURRENT_USER_ID) || USERS_MOCK[0];
      setCurrentUser({ ...updatedUser });
    };
    window.addEventListener('user-preferences-updated', handleUpdate);
    return () => window.removeEventListener('user-preferences-updated', handleUpdate);
  }, []);

  const preferences = currentUser.preferences;

  const timerModes = {
    foco: { ...STATIC_TIMER_MODES.foco, time: preferences.pomodoroLength * 60 },
    pausaCurta: { ...STATIC_TIMER_MODES.pausaCurta, time: preferences.shortBreak * 60 },
    pausaLonga: { ...STATIC_TIMER_MODES.pausaLonga, time: preferences.longBreak * 60 },
  };

  const [mode, setMode] = useState("foco");
  const [time, setTime] = useState(timerModes.foco.time);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning && !finished) {
      setTime(timerModes[mode].time);
    }
  }, [preferences.pomodoroLength, preferences.shortBreak, preferences.longBreak]);


  useImperativeHandle(ref, () => ({
    start: () => {
      setIsRunning(true);
      setFinished(false);
    },
    stop: () => setIsRunning(false),
    reset: () => resetTime()
  }));

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
    setTime(timerModes[newMode].time);
    setIsRunning(false);
    setFinished(false);
    clearInterval(intervalRef.current);
    if (onReset) onReset();
  }

  function resetTime() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setIsRunning(false);
    setFinished(false);
    setTime(timerModes[mode].time);
    if (onReset) onReset();
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
      setTime(timerModes[mode].time);
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
    <div className="flex flex-col justify-between h-[350px] w-full max-w-[360px] md:max-w-none md:w-[430px] md:h-[420px]">
      <div className="flex justify-between">
        {Object.entries(timerModes).map(([key, value]) => (
          <Button
            key={key}
            size="xg"
            variant={mode === key ? value.color : "cinza"}
            activeColor={timerModes[mode].color}
            onClick={() => changeMode(key)}
          >
            {value.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-center">
        <p className="text-white font-extrabold text-6xl md:text-8xl">
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
          variant={timerModes[mode].color}
          onClick={toggleTimer}
        >
          {finished ? "Reiniciar" : isRunning ? "Pausar" : "Iniciar"}
        </Button>

        {time !== timerModes[mode].time && (
          <Button
            size="padrao"
            variant={timerModes[mode].color}
            onClick={resetTime}
          >
            Resetar
          </Button>
        )}
      </div>

      <div className="flex justify-center">
        <p className="text-gray-default text-sm md:text-md">Sem sessões hoje</p>
      </div>
      {finished && (
        <div className="text-center text-white font-semibold">
          Tempo encerrado ✅
        </div>
      )}
    </div>
  );
});

export default Timer;
