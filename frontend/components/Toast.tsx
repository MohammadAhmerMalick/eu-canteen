'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = () => {
  return (
    <ToastContainer
      draggable
      newestOnTop
      closeOnClick
      hideProgressBar
      autoClose={3000}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      toastClassName={() =>
        'relative m-4 flex min-h-12 cursor-pointer justify-between overflow-hidden rounded-3xl bg-white p-2 text-sm text-black shadow md:m-0 md:mb-4 md:min-h-16 rounded-se-sm'
      }
    />
  )
}

export default Toast
