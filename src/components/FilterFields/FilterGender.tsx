import React from 'react';

type Props = {
  gender: string;
  onFilterChanged: (gender: string) => void;
};

const FilterGender: React.FC<Props> = ({ gender, onFilterChanged }) => {
  return (
    <React.Fragment>
      Filter gender by:{' '}
      <select value={gender} onChange={(e) => onFilterChanged(e.target.value)}>
        <option>Any</option>
        <option>Male</option>
        <option>Female</option>
      </select>
    </React.Fragment>
  );
};

export default FilterGender;
