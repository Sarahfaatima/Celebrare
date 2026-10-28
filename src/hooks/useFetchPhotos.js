import { useEffect, useState } from 'react'

const PHOTOS_URL = 'https://picsum.photos/v2/list?limit=30'

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPhotos() {
      try {
        const response = await fetch(PHOTOS_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()
        setPhotos(data)
        setError(null)
        setLoading(false)
      } catch (err) {
        //  A catch block puts the message into error and sets loading to false
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      }
    }

    loadPhotos()

    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}