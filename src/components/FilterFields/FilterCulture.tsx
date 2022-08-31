import React from 'react'
import './Filter.css'

interface Props {
  culture: string
  onFilterChanged: (culture: string) => void
}

const FilterCulture: React.FC<Props> = ({ culture, onFilterChanged }) => {
  return (
    <div className="filter-culture">
      Filter culture by:{' '}
      <input
        type="text"
        value={culture}
        onChange={(e) => onFilterChanged(e.target.value)}
      />
    </div>
  )
}

export default FilterCulture
