import React from 'react'

interface Props {
  culture: string
  onFilterChanged: (culture: string) => void
}

const FilterCulture: React.FC<Props> = ({ culture, onFilterChanged }) => {
  return (
    <div className="flex items-center">
      <span className="text-slate-700 dark:text-slate-400 mr-2">
        Filter culture by:
      </span>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        value={culture}
        onChange={(e) => onFilterChanged(e.target.value)}
      />
    </div>
  )
}

export default FilterCulture
