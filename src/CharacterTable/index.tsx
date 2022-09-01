import React from 'react'
import { useLocation } from 'react-router-dom'
import CharacterTableBody from './components/CharacterTableBody'
import Pagination from './components/Pagination'
import FilterGender from './components/FilterGender'
import FilterCulture from './components/FilterCulture'
import Loading from '../Shared/components/Loading'
import useCharacterTable from './hooks/useCharacterTable'

const CharacterTable: React.FC = () => {
  const queryParams = new URLSearchParams(useLocation().search)
  const queryPage = parseInt(queryParams.get('page') ?? '1')
  const queryPageSize = parseInt(queryParams.get('pageSize') ?? '25')
  const queryGender = queryParams.get('gender') ?? 'Any'
  const queryCulture = queryParams.get('culture') ?? ''

  const {
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
  } = useCharacterTable(queryPage, queryPageSize, queryGender, queryCulture)

  return (
    <React.Fragment>
      <h3 className="text-3xl font-bold dark:text-slate-200">
        Character Table
      </h3>
      <div className="w-full">
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPage={totalPage}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
        />
        <div className="flex justify-between my-4">
          <FilterGender
            gender={filterGender}
            onFilterChanged={handleChangeGender}
          />
          <FilterCulture
            culture={filterCulture}
            onFilterChanged={handleChangeCulture}
          />
        </div>
        <table className="w-full border-collapse border border-slate-500">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left w-4/12">
                Character
              </th>
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left w-2/12">
                Alive
              </th>
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left w-2/12">
                Gender
              </th>
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left w-2/12">
                Culture
              </th>
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left w-2/12">
                Allegiances
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  className="border-slate-300 dark:border-slate-700 py-4"
                  colSpan={5}
                >
                  <Loading />
                </td>
              </tr>
            ) : (
              <CharacterTableBody characters={characters} />
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default CharacterTable
