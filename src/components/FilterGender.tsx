import React from 'react'

interface Props {
  gender: string
  onFilterChanged: (gender: string) => void
}

const FilterGender: React.FC<Props> = ({ gender, onFilterChanged }) => {
  return (
    <div className="flex items-center">
      <span className="text-slate-700 dark:text-slate-400 mr-2">
        Filter gender by:
      </span>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        value={gender}
        onChange={(e) => onFilterChanged(e.target.value)}
      >
        <option>Any</option>
        <option>Male</option>
        <option>Female</option>
      </select>
    </div>
  )
}

export default FilterGender
