import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import Router from "./router"

import "styles/index.scss";
import "styles/fontStyles.css";
import 'react-tooltip/dist/react-tooltip.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router/>
)