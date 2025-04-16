import React, { useState, useEffect } from 'react';
import { Table, Input, Card, Row, Col, Pagination } from 'antd';
import HomeSearchIcon from '@/assets/icons/countries/HomeSearchIcon';
import styles from './Countries.module.scss';

const Countries = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dataSource = [
    {
      key: 1,
      name: 'United States',
      capital: 'Washington, D.C.',
      population: 331002651,
      area: 9833520,
      flag: 'https://restcountries.com/data/usa.svg',
    },
    {
      key: 2,
      name: 'Canada',
      capital: 'Ottawa',
      population: 37742154,
      area: 9984670,
      flag: 'https://restcountries.com/data/can.svg',
    },
    {
      key: 3,
      name: 'Brazil',
      capital: 'Brasília',
      population: 212559417,
      area: 8515767,
      flag: 'https://restcountries.com/data/bra.svg',
    },
    {
      key: 4,
      name: 'United Kingdom',
      capital: 'London',
      population: 67886011,
      area: 243610,
      flag: 'https://restcountries.com/data/gbr.svg',
    },
    {
      key: 5,
      name: 'France',
      capital: 'Paris',
      population: 65273511,
      area: 551695,
      flag: 'https://restcountries.com/data/fra.svg',
    },
    {
      key: 6,
      name: 'Germany',
      capital: 'Berlin',
      population: 83783942,
      area: 357386,
      flag: 'https://restcountries.com/data/deu.svg',
    },
    {
      key: 7,
      name: 'Italy',
      capital: 'Rome',
      population: 60461826,
      area: 301340,
      flag: 'https://restcountries.com/data/ita.svg',
    },
    {
      key: 8,
      name: 'Spain',
      capital: 'Madrid',
      population: 46754778,
      area: 505992,
      flag: 'https://restcountries.com/data/esp.svg',
    },
    {
      key: 9,
      name: 'Australia',
      capital: 'Canberra',
      population: 25499884,
      area: 7692024,
      flag: 'https://restcountries.com/data/aus.svg',
    },
    {
      key: 10,
      name: 'New Zealand',
      capital: 'Wellington',
      population: 4822233,
      area: 268838,
      flag: 'https://restcountries.com/data/nzl.svg',
    },
    {
      key: 11,
      name: 'Japan',
      capital: 'Tokyo',
      population: 126476461,
      area: 377975,
      flag: 'https://restcountries.com/data/jpn.svg',
    },
    {
      key: 12,
      name: 'China',
      capital: 'Beijing',
      population: 1439323776,
      area: 9596961,
      flag: 'https://restcountries.com/data/chn.svg',
    },
    {
      key: 13,
      name: 'Russia',
      capital: 'Moscow',
      population: 144478050,
      area: 17098242,
      flag: 'https://restcountries.com/data/rus.svg',
    },
    {
      key: 14,
      name: 'India',
      capital: 'New Delhi',
      population: 1380004385,
      area: 3287263,
      flag: 'https://restcountries.com/data/ind.svg',
    },
    {
      key: 15,
      name: 'Mexico',
      capital: 'Mexico City',
      population: 128932753,
      area: 1964375,
      flag: 'https://restcountries.com/data/mex.svg',
    },
    {
      key: 16,
      name: 'Argentina',
      capital: 'Buenos Aires',
      population: 45195774,
      area: 2780400,
      flag: 'https://restcountries.com/data/arg.svg',
    },
    {
      key: 17,
      name: 'Egypt',
      capital: 'Cairo',
      population: 102334404,
      area: 1002450,
      flag: 'https://restcountries.com/data/egy.svg',
    },
    {
      key: 18,
      name: 'South Africa',
      capital: 'Pretoria',
      population: 59308690,
      area: 1221037,
      flag: 'https://restcountries.com/data/zaf.svg',
    },
    {
      key: 19,
      name: 'Sweden',
      capital: 'Stockholm',
      population: 10099265,
      area: 450295,
      flag: 'https://restcountries.com/data/swe.svg',
    },
    {
      key: 20,
      name: 'Norway',
      capital: 'Oslo',
      population: 5421241,
      area: 385207,
      flag: 'https://restcountries.com/data/nor.svg',
    },
  ];

  const currentData = dataSource.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const columns = [
    {
      title: 'Flag',
      dataIndex: 'flag',
      key: 'flag',
      render: (flag: string) => (
        <img src={flag} alt="Flag" style={{ width: '40px' }} />
      ),
    },
    {
      title: 'Country Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Capital',
      dataIndex: 'capital',
      key: 'capital',
    },
    {
      title: 'Population',
      dataIndex: 'population',
      key: 'population',
      render: (population: number) => population.toLocaleString(),
    },
    {
      title: 'Area (km²)',
      dataIndex: 'area',
      key: 'area',
      render: (area: number) => area.toLocaleString(),
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Input
          prefix={<HomeSearchIcon />}
          className={styles.searchInput}
          placeholder="Search countries"
        />
      </div>
      {isMobile ? (
        <div className={styles.cardsContainer}>
          <Row gutter={[16, 16]}>
            {currentData.map((country) => (
              <Col xs={24} key={country.key}>
                <Card className={styles.card} hoverable>
                  <div className={styles.cardHeader}>
                    <h2>{country.name}</h2>
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className={styles.flag}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Capital:</span>
                        <span>{country.capital}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Population:</span>
                        <span>{country.population.toLocaleString()}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Area:</span>
                        <span>{country.area.toLocaleString()} km²</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={dataSource.length}
            onChange={handlePageChange}
            style={{ marginTop: '16px', textAlign: 'center' }}
          />
        </div>
      ) : (
        <Table
          dataSource={currentData}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: dataSource.length,
            onChange: handlePageChange,
          }}
          rowKey="key"
        />
      )}
    </div>
  );
};

export default Countries;
