'use client'

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const colors = {
  background: '#14171B', // Fundo escuro
  textPrimary: '#FFFFFF', // Texto claro
  textSecondary: '#A0A0A0', // Texto secundário (cinza)
  gridLine: '#333333', // Linhas de grade
  purpleLow: '#4B2070', // Roxo mais claro
  purpleMid: '#7B39A8', // Roxo médio
  purpleHigh: '#A857D0', // Roxo mais escuro
  purpleExtreme: '#D076FF', // Roxo bem vibrante
};

interface LineChartData {
  [key: string]: any; 
}

function generateLineData(): LineChartData[] {
  const data: LineChartData[] = [];
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
  ];

  let currentValue = 50;
  let currentValue2 = 70;
  let currentValue3 = 30; // nova linha

  for (let i = 0; i < months.length; i++) {
    currentValue += (Math.random() - 0.5) * 20;
    currentValue2 += (Math.random() - 0.5) * 15;
    currentValue3 += (Math.random() - 0.5) * 25;

    currentValue = Math.max(0, Math.min(currentValue, 100));
    currentValue2 = Math.max(0, Math.min(currentValue2, 100));
    currentValue3 = Math.max(0, Math.min(currentValue3, 100));

    data.push({
      name: months[i],
      value: Math.round(currentValue),
      value2: Math.round(currentValue2),
      value3: Math.round(currentValue3), 
    });
  }

  return data;
}


interface LineChartComponentProps {
  title?: string;
}

const CustomLineChart: React.FC<LineChartComponentProps> = ({
  title = 'Progresso Mensal',
}) => {
  const [data, setData] = React.useState<LineChartData[]>([]);

  React.useEffect(() => {

    setData(generateLineData());
  }, []);

  if (data.length === 0) {
    return (
      <div
        className="p-4 rounded-lg shadow-md flex justify-center items-center h-full"
        style={{ backgroundColor: colors.background, color: colors.textPrimary }}
      >
        Carregando dados do gráfico...
      </div>
    );
  }

  return (
    <div
      className="rounded-lg w-280"
      style={{ backgroundColor: colors.background, color: colors.textPrimary }}
    >
      <h2 className="text-xl font-semibold mb-4 ml-8">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
          <XAxis
            dataKey="name" // Usamos 'name' como dataKey para o eixo X
            stroke={colors.textSecondary}
            tick={{ fill: colors.textSecondary }}
          />
          <YAxis
            stroke={colors.textSecondary}
            tick={{ fill: colors.textSecondary }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              borderColor: colors.gridLine,
              color: colors.textPrimary,
            }}
            itemStyle={{ color: colors.textPrimary }}
          />
          <Legend wrapperStyle={{ color: colors.textPrimary }} />
          <Line
            dot={false}
            type="monotone"
            dataKey="value" // primeira linha
            stroke={colors.purpleExtreme}
            strokeWidth={2}

          />

          <Line
            type="monotone"
            dataKey="value2" // segunda linha
            stroke={colors.purpleMid}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="value3"
            stroke="#b8cdf8"
            strokeWidth={2}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;