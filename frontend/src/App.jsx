import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import {
  AddProducts,
  Category,
  Home,
  Login,
  NotFound,
  Order,
  Products,
  EditProducts,
} from './pages';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
        errorElement: <NotFound />,
      },
      {
        path: '/dashboard',
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: '/products',
        element: <Products />,
        errorElement: <NotFound />,
      },
      {
        path: '/products/add',
        element: <AddProducts />,
        errorElement: <NotFound />,
      },
      {
        path: '/products/edit/:id',
        element: <EditProducts />,
        errorElement: <NotFound />,
      },
      {
        path: '/category',
        element: <Category />,
        errorElement: <NotFound />,
      },
      {
        path: '/order',
        element: <Order />,
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#ebe5e5',
            color: '#0e0e0e',
          },
        }}
      />
    </>
  );
}

export default App;
