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
        'relative m-4 flex min-h-12 cursor-pointer items-center justify-between overflow-hidden rounded-3xl rounded-se-sm bg-white px-4 py-2 text-sm text-black shadow md:m-0 md:mb-4 md:min-h-16'
      }
    />
  )
}

export default Toast
