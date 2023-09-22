import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NewPage from './NewPages/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'new',
    element: <NewPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

