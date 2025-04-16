'use client';

import React, { useState, useLayoutEffect } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import SideChartsIcon from '@/assets/icons/layout/SideChartsIcon';
import SideCountriesIcon from '@/assets/icons/layout/SideCountriesIcon';
import TypoLogo from '@/public/images/TypoLogo.svg';
import styles from './MainLayout.module.scss';
import Image from 'next/image';
import Dashboard from '../../Dashboard';
import Countries from '../../Countries';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activeKey, setActiveKey] = useState('/');
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  const routeMap: Record<
    string,
    { label: string; component: React.ReactNode }
  > = {
    '/': { label: 'Dashboard', component: <Dashboard /> },
    '/countries': { label: 'Countries', component: <Countries /> },
  };

  const handleMenuClick = (e: any) => {
    setActiveKey(e.key);
    setMobileMenuVisible(false);
  };

  const currentRoute = routeMap[activeKey] || {
    label: 'Center Name',
    component: null,
  };

  return (
    <Layout className={styles.container}>
      {!isMobile && (
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
              { key: '/', label: 'Dashboard', icon: <SideChartsIcon /> },
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
      )}
      {isMobile && (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
          bodyStyle={{ padding: 10 }}
        >
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            onClick={handleMenuClick}
            items={[
              { key: '/', label: 'Dashboard', icon: <SideChartsIcon /> },
              {
                key: '/countries',
                label: 'Countries',
                icon: <SideCountriesIcon />,
              },
            ]}
          />
        </Drawer>
      )}
      <Layout
        className={isMobile ? styles.mobileMainLayout : styles.mainLayout}
      >
        <Header className={styles.header}>
          <h1 className={styles.headerTitle}>{currentRoute.label}</h1>
          {isMobile && (
            <Button
              type="text"
              onClick={() => setMobileMenuVisible(true)}
              className={styles.mobileMenuButton}
            >
              <MenuOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </Button>
          )}
        </Header>
        <Content className={styles.content}>{currentRoute.component}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
