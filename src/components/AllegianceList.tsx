import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  allegiances: string[];
};

const AllegianceList: React.FC<Props> = ({ allegiances }) => {
  const getHouseId = (allegiance: string) => {
    return allegiance.split('/').pop();
  };
  return (
    <React.Fragment>
      {allegiances.length
        ? allegiances.map((allegiance, index) => (
            <div key={`allegiance-${index}`}>
              <Link to={`/houses/${getHouseId(allegiance)}`}>
                {getHouseId(allegiance)}
              </Link>
            </div>
          ))
        : 'No allegiances'}
    </React.Fragment>
  );
};

export default AllegianceList;
