import { BASE_URLS } from '../constants/urls';

const API_BASE_URL = `https://restcountries.com/`;

const ENDPOINTS = {
  countriesData: {
    getAll: () => `${API_BASE_URL}/v3.1/all`,
  },
};

export default ENDPOINTS;
