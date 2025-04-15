'use client';

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';

import SideChartsIcon from '@/assets/icons/layout/SideChartsIcon';
import SideCountriesIcon from '@/assets/icons/layout/SideCountriesIcon';
import TypoLogo from '@/public/images/TypoLogo.svg';

import styles from './MainLayout.module.scss';
import Image from 'next/image';

import Dashboard from '../../Dashboard';
import Countries from '../../Countries';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [activeKey, setActiveKey] = useState('/');

  const routeMap: Record<
    string,
    { label: string; component: React.ReactNode }
  > = {
    '/': { label: 'Dashboard', component: <Dashboard /> },
    '/countries': { label: 'Countries', component: <Countries /> },
  };

  const handleMenuClick = (e: any) => {
    setActiveKey(e.key);
  };

  const currentRoute = routeMap[activeKey] || {
    label: 'Center Name',
    component: null,
  };

  return (
    <Layout className={styles.container}>
      <Sider
        width={250}
        breakpoint="lg"
        collapsedWidth="80"
        className={styles.sider}
      >
        <div className={styles.logoContainer}>
          <Image
            src={TypoLogo}
            className={styles.logo}
            alt="Nation Scope Logo"
          />
        </div>
        <Menu
          className={styles.sideMenu}
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={handleMenuClick}
          items={[
            {
              key: '/',
              label: 'Dashboard',
              icon: <SideChartsIcon />,
            },
            {
              key: '/countries',
              label: 'Countries',
              icon: <SideCountriesIcon />,
            },
          ]}
        />
        <div className={styles.settingsButton}>
          <div className={styles.settingsButtonContainer}></div>
        </div>
      </Sider>

      <Layout className={styles.mainLayout}>
        <Header className={styles.header}>
          <h1 className={styles.headerTitle}>{currentRoute.label}</h1>
          <div className={styles.iconsContainer}></div>
        </Header>
        <Content className={styles.content}>{currentRoute.component}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
