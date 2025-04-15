'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Layout, Menu } from 'antd';

import SideChartsIcon from '@/assets/icons/layout/SideChartsIcon';
import SideCountriesIcon from '@/assets/icons/layout/SideCountriesIcon';
import TypoLogo from '@/public/images/TypoLogo.svg';

import styles from './MainLayout.module.scss';
import Image from 'next/image';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const routeHeaderMap: { [key: string]: string } = {
    '/': 'Dashboard',
    '/countries': 'Countries',
  };

  const selectedKey =
    Object.keys(routeHeaderMap).find((key) =>
      key !== '/' ? pathname.startsWith(key) : pathname === key,
    ) || pathname;

  const handleMenuClick = (e: any) => {
    router.push(e.key);
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
          selectedKeys={[selectedKey]}
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
          <div className={styles.settingsButtonContainer}>
            {/* <LogoutButton /> */}
          </div>
        </div>
      </Sider>

      <Layout className={styles.mainLayout}>
        <Header className={styles.header}>
          <h1 className={styles.headerTitle}>
            {routeHeaderMap[pathname] || 'Center Name'}
          </h1>
          <div className={styles.iconsContainer}></div>
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
