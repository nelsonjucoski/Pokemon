import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/home';
import Battle from './pages/battle';
import Victory from './pages/victory';
import Defeat from './pages/defeat';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/victory",
    element: <Victory />
  },
  {
    path: "/battle",
    element: <Battle />
  },
  {
    path: "/defeat",
    element: <Defeat />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
