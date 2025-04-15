import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './ComparisonChart.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const fakeData = [
  { name: 'USA', population: 331893745, area: 9833517 },
  { name: 'China', population: 1444216107, area: 9596961 },
  { name: 'India', population: 1393409038, area: 3287263 },
  { name: 'Russia', population: 145934460, area: 17098246 },
  { name: 'Brazil', population: 212559417, area: 8515767 },
];

const ComparisonChart = () => {
  const labels = fakeData.map((item) => item.name);
  const populationData = fakeData.map((item) => item.population);
  const areaData = fakeData.map((item) => item.area);

  const data = {
    labels,
    datasets: [
      {
        label: 'Population',
        data: populationData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y1',
        tension: 0.4,
      },
      {
        label: 'Area (km²)',
        data: areaData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y2',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Population and Area Comparison',
        color: '#faf5fa',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Population',
        },
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Area (km²)',
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ComparisonChart;
