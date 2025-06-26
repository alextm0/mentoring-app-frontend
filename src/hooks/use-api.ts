import { useState, useEffect } from 'react'

// Simple hook for API calls - UI state only
export function useApi<T>(apiCall: () => Promise<{ data: T; success: boolean }>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiCall()
      .then(response => {
        if (response.success) {
          setData(response.data)
        } else {
          setError('Failed to load data')
        }
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
} 