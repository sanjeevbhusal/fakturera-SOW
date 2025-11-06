import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000')
      const data = await response.json()
      setData(data)
    }
    fetchData()
  }, [])

  return (
    <>
      <h1>{data?.message}</h1>
    </>
  )
}

export default App
