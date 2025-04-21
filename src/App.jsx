import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);

export default App;
