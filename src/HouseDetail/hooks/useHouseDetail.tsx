import { useCallback, useEffect, useState } from 'react'
import { House } from '../types'

interface ReturnType {
  houseDetail: House | undefined
  isLoading: boolean
}

const useHouseDetail = (houseId: number): ReturnType => {
  const [houseDetail, setHouseDetail] = useState<House>()
  const [isLoading, setLoading] = useState<boolean>(true)

  const getHouseDetails = useCallback(async (): Promise<void> => {
    setLoading(true)
    const data = await fetch(
      `https://anapioficeandfire.com/api/houses/${houseId}`
    ).then(async (res) => await res.json())
    setLoading(false)
    setHouseDetail(data)
  }, [])

  useEffect(() => {
    getHouseDetails().catch((err) => console.error(err))
  }, [])

  return { houseDetail, isLoading }
}

export default useHouseDetail
