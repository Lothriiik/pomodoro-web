import { useState, useRef } from "react"
import Timer from "@/components/Timer"
import TaskArea from "@/components/TaskArea"

export default function Pomodoro() {
  const [activeTaskId, setActiveTaskId] = useState(null);
  const timerRef = useRef(null);

  const handlePlayTask = (taskId) => {
    setActiveTaskId(taskId);
    if (timerRef.current) {
      timerRef.current.start();
    }
  };

  const handleTimerReset = () => {
    setActiveTaskId(null);
  };

  return (
    <div className="flex items-center md:flex-row flex-col-reverse h-full">
      <div className="flex flex-col h-full mb-8 md:mb-0">
        <TaskArea activeTaskId={activeTaskId} onPlayTask={handlePlayTask} />
      </div>
      <div className="flex w-full justify-center mt-12 mb-4 md:mt-0">
        <Timer ref={timerRef} onReset={handleTimerReset} />
      </div>
    </div>
  )
}
