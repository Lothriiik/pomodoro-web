'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

interface CustomBarChartProps {
  title: string
  data?: { name: string; value: number }[]
}

const defaultData = [
  { name: 'Dom', value: 40 },
  { name: 'Seg', value: 65 },
  { name: 'Ter', value: 55 },
  { name: 'Qua', value: 80 },
  { name: 'Qui', value: 45 },
  { name: 'Sex', value: 45 },
  { name: 'Sab', value: 45 },
]

export default function CustomBarChart({ title, data = defaultData }: CustomBarChartProps) {
  return (
    <div className="w-full h-full p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-neutral-400">{title}</h2>
      <ResponsiveContainer width={800} height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#9D8DF1" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
