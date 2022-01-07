import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from './utils/theme';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
