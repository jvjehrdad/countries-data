import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { randomColor } from '@/core/utils';
import styles from './AreaChart.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const fakeData = [
  { name: 'Russia', area: 17098246 },
  { name: 'Canada', area: 9984670 },
  { name: 'USA', area: 9833517 },
  { name: 'China', area: 9596961 },
  { name: 'Brazil', area: 8515767 },
  { name: 'Australia', area: 7692024 },
  { name: 'India', area: 3287263 },
  { name: 'Argentina', area: 2780400 },
  { name: 'Kazakhstan', area: 2724900 },
  { name: 'Algeria', area: 2381741 },
];

const AreaChart = () => {
  const labels = fakeData.map((item) => item.name);
  const areas = fakeData.map((item) => item.area);

  const barColors = fakeData.map(() => randomColor());
  const data = {
    labels,
    datasets: [
      {
        label: 'Area (km²)',
        data: areas,
        backgroundColor: barColors,
      },
    ],
  };
  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: '10 Countries with the Largest Area',
        color: '#faf5fa',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AreaChart;
