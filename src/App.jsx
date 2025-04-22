import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import { Toaster } from 'sonner'
import MainPage from './pages/MainPage'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />
    },
  ]);

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            color: 'white',
          },
          classNames: {
            error: '!bg-red-400',
            success: '!bg-green-400',
            warning: '!bg-yellow-400',
            info: '!bg-blue-400',
          },
        }}
      />
      <div className='max-w-screen-lg mx-auto my-10'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App;
