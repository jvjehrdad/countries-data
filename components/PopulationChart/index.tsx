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
import { randomColor } from '../../core/utils';
import styles from './PopulationChart.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const fakeData = [
  { name: 'China', population: 1444216107 },
  { name: 'India', population: 1393409038 },
  { name: 'USA', population: 331893745 },
  { name: 'Indonesia', population: 273523621 },
  { name: 'Pakistan', population: 220892331 },
  { name: 'Brazil', population: 212559417 },
  { name: 'Nigeria', population: 206139587 },
  { name: 'Bangladesh', population: 164689383 },
  { name: 'Russia', population: 145934460 },
  { name: 'Mexico', population: 128932753 },
];

const PopulationChart = () => {
  const labels = fakeData.map((item) => item.name);
  const populations = fakeData.map((item) => item.population);

  const barColors = fakeData.map(() => randomColor());

  const data = {
    labels,
    datasets: [
      {
        label: 'Population',
        data: populations,
        backgroundColor: barColors,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '10 Countries with the Largest Population',
        color: '#faf5fa',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PopulationChart;
