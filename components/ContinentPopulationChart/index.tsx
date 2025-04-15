import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { randomColor } from '@/core/utils';
import styles from './ContinentPopulationChart.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const continentData = [
  { continent: 'Asia', population: 4700000000 },
  { continent: 'Africa', population: 1340000000 },
  { continent: 'Europe', population: 747000000 },
  { continent: 'North America', population: 368000000 },
  { continent: 'South America', population: 430000000 },
  { continent: 'Oceania', population: 42000000 },
];

const ContinentPopulationChart = () => {
  const labels = continentData.map((item) => item.continent);
  const populations = continentData.map((item) => item.population);
  const colors = continentData.map(() => randomColor());

  const data = {
    labels,
    datasets: [
      {
        label: 'Population Share',
        data: populations,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Continent Population Share',
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
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ContinentPopulationChart;
