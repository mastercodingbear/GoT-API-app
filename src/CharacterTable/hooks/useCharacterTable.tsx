import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../../Shared/hooks/useDebounce'
import { Character } from '../types'

interface ReturnType {
  characters: Character[]
  page: number
  pageSize: number
  totalPage: number
  isLoading: boolean
  filterGender: string
  filterCulture: string
  handleChangePage: (page: number) => void
  handleChangePageSize: (pageSize: number) => void
  handleChangeCulture: (culture: string) => void
  handleChangeGender: (gender: string) => void
}

const useCharacterTable = (
  queryPage: number,
  queryPageSize: number,
  queryGender: string,
  queryCulture: string
): ReturnType => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [page, setPage] = useState<number>(queryPage)
  const [pageSize, setPageSize] = useState<number>(queryPageSize)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [filterGender, setFilterGender] = useState<string>(queryGender)
  const [filterCulture, setFilterCulture] = useState<string>(queryCulture)

  const navigate = useNavigate()

  const debouncedCultureTerm: string = useDebounce<string>(filterCulture, 300)

  const getCharacters = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      const requestParams = new URLSearchParams()
      requestParams.set('page', page.toString())
      requestParams.set('pageSize', pageSize.toString())
      if (debouncedCultureTerm !== '') {
        requestParams.set('culture', debouncedCultureTerm)
      }
      if (filterGender !== '') {
        requestParams.set('gender', filterGender)
      }
      const response = await fetch(
        `https://anapioficeandfire.com/api/characters?${requestParams.toString()}`
      ).then(async (res) => {
        const lastQuery = res.headers
          .get('link')
          ?.split(', ')
          .pop()
          ?.split('>;')[0]
          .split('characters')[1]
        const queryParams = new URLSearchParams(lastQuery)
        setTotalPage(parseInt(queryParams.get('page') ?? '1'))
        return await res.json()
      })
      setLoading(false)
      navigate(`/characters?${requestParams.toString()}`)
      setPage(page)
      setPageSize(pageSize)
      setCharacters(response)
    } catch (error) {
      console.error(error)
    }
  }, [page, pageSize, debouncedCultureTerm, filterGender])

  useEffect(() => {
    getCharacters().catch((err) => console.error(err))
  }, [getCharacters])

  const handleChangePage = (page: number): void => {
    setPage(page)
  }

  const handleChangePageSize = (pageSize: number): void => {
    setPageSize(pageSize)
    setPage(1)
  }

  const handleChangeCulture = (culture: string): void => {
    setFilterCulture(culture)
    setPage(1)
  }

  const handleChangeGender = (gender: string): void => {
    setFilterGender(gender)
    setPage(1)
  }

  return {
    characters,
    page,
    pageSize,
    totalPage,
    isLoading,
    filterGender,
    filterCulture,
    handleChangePage,
    handleChangePageSize,
    handleChangeCulture,
    handleChangeGender
  }
}

export default useCharacterTable
