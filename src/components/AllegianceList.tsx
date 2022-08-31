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
            <div key={`allegiance-${getHouseId(allegiance)}`}>
              <Link to={`/houses/${getHouseId(allegiance)}`}>
                {getHouseId(allegiance)}
              </Link>
            </div>
      )) : 'No allegiances'}
    </React.Fragment>
  )
}

export default AllegianceList
