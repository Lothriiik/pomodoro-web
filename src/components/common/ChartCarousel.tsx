'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import React, { useEffect, useRef } from 'react'
import CustomLineChart from './CustomLineChart'
import CustomBarChart from './CustomBarChart'

export default function ChartCarousel() {
  const sliderRef = useRef(null)
  const [sliderInstanceRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next()
    }, 4000)

    return () => clearInterval(interval)
  }, [slider])

  return (
    <div ref={sliderInstanceRef} className="keen-slider h-screen" id="slider">
      <div className="keen-slider__slide flex">
        <CustomLineChart title="Pedidos por Mês" />
      </div>
      <div className="keen-slider__slide flex">
        <CustomBarChart title="Usuários Ativos" />
      </div>
      <div className="keen-slider__slide flex">
        <CustomLineChart title="Vendas por Região" />
      </div>
      <div className="keen-slider__slide flex">
        <CustomBarChart title="Conversões por Dispositivo" />
      </div>
    </div>
  )
}
