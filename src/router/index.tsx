import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts';
import Home from '../pages/Home/home';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import UserOrders from '../pages/UserOrders/UserOrders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'product/:id',
        element: <ProductDetails />,
      },
      {
        path: 'orders',
        element: <UserOrders />,
      },
    ],
  },
]);