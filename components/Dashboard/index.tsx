import React from 'react';

import styles from './Dashboard.module.scss';
import PopulationChart from '../PopulationChart';
import AreaChart from '../AreaChart';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <PopulationChart />
        <AreaChart />
      </div>
    </div>
  );
};

export default Dashboard;
