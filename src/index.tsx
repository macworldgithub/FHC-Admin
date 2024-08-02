import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { PageNotFound } from './pages/PageNotFound';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Categories } from './pages/Categories';
import { Products } from './pages/Products';
import { SubCategories } from './pages/SubCategories';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Categories />,
        path: "/categories",
      },
      {
        element: <SubCategories />,
        path: "/subcategories",
      },
      {
        element: <Products />,
        path: "/products",
      },
    ],
    errorElement: <PageNotFound />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
