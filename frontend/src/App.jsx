import { useState } from 'react'
import AppRoutes from "./routes/app-routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <>
      <div>
      <AppRoutes />
      <ToastContainer/>
      </div>
    </>
  )
}

export default App
