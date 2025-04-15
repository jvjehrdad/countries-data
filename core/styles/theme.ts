import themeJson from './theme.json';
import { theme as antdTheme } from 'antd';

const theme = {
  ...themeJson,
  algorithm: antdTheme.darkAlgorithm,
};

export default theme;
