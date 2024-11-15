import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface DataErrorProps {
  error: any
  message: string
}

const DataError = ({ error, message }: DataErrorProps) => {
  console.log({ dataError: error })

  useEffect(() => {
    toast.error(message)
  }, [message])

  return <div>{message}</div>
}

export default DataError
