"use client"

import { Button } from "./ui/button"

export default function Timer() {
  

  return (
    <div className="flex flex-col justify-between w-[430px] h-[420px]">
        <div className="flex justify-between">
            <Button variant="cinza" size="xg">Foco</Button>
            <Button variant="cinza" size="xg">Pausa Curta</Button>
            <Button variant="cinza" size="xg">Pausa Longa</Button>

        </div>
        <div className="flex justify-center">
            <p className="text-white font-extrabold text-8xl">25:00</p>
        </div>
        <div className="flex justify-between">
            <Button variant="azul" size="fixedsm">+ 25 min</Button>
            <Button variant="azul" size="fixedsm">+ 10 min</Button>
            <Button variant="azul" size="fixedsm">+ 5 min</Button>
            <Button variant="azul" size="fixedsm">+ 1 min</Button>
        </div>
        <div className="flex justify-center">
            <Button variant="roxo" size="padrao">Iniciar</Button>
        </div>
        <div className="flex justify-center">
            <p className="text-gray-default">Sem sessões hoje</p>
        </div>
    </div>
  )
}
