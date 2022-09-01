import React from 'react'
import Button from '../../Shared/components/Button'

interface Props {
  page: number
  pageSize: number
  totalPage: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

const Pagination: React.FC<Props> = ({
  page,
  pageSize,
  totalPage,
  onPageChange,
  onPageSizeChange
}) => {
  const moveToFirst = (): void => {
    onPageChange(1)
  }
  const moveToLast = (): void => {
    onPageChange(totalPage)
  }
  const moveToNext = (): void => {
    const nextPage = page + 1 <= totalPage ? page + 1 : totalPage
    onPageChange(nextPage)
  }
  const moveToPrev = (): void => {
    const prevPage = page - 1 >= 1 ? page - 1 : 1
    onPageChange(prevPage)
  }

  return (
    <div className="flex flex-row justify-between">
      <span className="text-slate-700 dark:text-slate-400">
        <b>{page}</b> page of <b>{totalPage}</b> pages
      </span>
      <div className="flex flex-row gap-x-2 items-center">
        <span className="text-slate-700 dark:text-slate-400 font-semibold">
          Rows per page:{' '}
        </span>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          value={pageSize}
          onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
        >
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <Button onClick={moveToFirst} text="First" />
        <Button onClick={moveToPrev} disabled={page === 1} text="Prev" />
        <Button
          onClick={moveToNext}
          disabled={page === totalPage}
          text="Next"
        />
        <Button onClick={moveToLast} text="Last" />
      </div>
    </div>
  )
}

export default Pagination
