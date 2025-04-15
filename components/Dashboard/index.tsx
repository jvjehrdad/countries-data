import React from 'react';

import styles from './Dashboard.module.scss';
import PopulationChart from '../PopulationChart';
import AreaChart from '../AreaChart';
import ContinentPopulationChart from '../ContinentPopulationChart';
import ComparisonChart from '../ComparisonChart';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <PopulationChart />
        <AreaChart />
        <ContinentPopulationChart />
        <ComparisonChart />
      </div>
    </div>
  );
};

export default Dashboard;
