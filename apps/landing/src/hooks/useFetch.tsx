import { useEffect, useState } from 'react'

const useFetch = (url: string, requestInfo?: RequestInit) => {
  const [data, setdata] = useState(null)
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState('')

  useEffect(() => {
    fetch(url, requestInfo)
      .then((res) => res.json())
      .then((data) => {
        seterror(data.error)
        setdata(data)
        setloading(false)
      })
  }, [url])

  return { data, error, loading }
}

export default useFetch
