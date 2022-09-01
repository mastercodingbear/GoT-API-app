import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  allegiances: string[]
}

const AllegianceList: React.FC<Props> = ({ allegiances }) => {
  const getHouseId = (allegiance: string): string => {
    return allegiance.split('/').pop() ?? ''
  }
  return (
    <React.Fragment>
      {allegiances.length > 0 ? allegiances.map((allegiance) => (
            <Link
              className="text-sky-400 block"
              to={`/houses/${getHouseId(allegiance)}`}
              key={`allegiance-${getHouseId(allegiance)}`}
            >
              {getHouseId(allegiance)}
            </Link>
      )) : 'No allegiances'}
    </React.Fragment>
  )
}

export default AllegianceList
