import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { House } from '../state/types';

const HouseDetail: React.FC = () => {
  const params = useParams();
  const houseId = params.houseId;

  const [houseDetail, setHouseDetail] = useState<House>();
  const getHouseDetails = async () => {
    const data = await fetch(
      `https://anapioficeandfire.com/api/houses/${houseId}`
    ).then(async (res) => await res.json());
    console.log(data);
    setHouseDetail(data);
  };
  useEffect(() => {
    getHouseDetails();
  }, []);
  return (
    <React.Fragment>
      <h1>House Detail</h1>
      <h5>Name: {houseDetail?.name}</h5>
      <h5>Region: {houseDetail?.region}</h5>
      <h5>Coat of Arms: {houseDetail?.coatOfArms}</h5>
      <h5>Words: {houseDetail?.words}</h5>
      <h5>Titles: {houseDetail?.titles.join(', ')}</h5>
      <h5>Seats: {houseDetail?.seats.join(', ')}</h5>
      <h5>Has died out: {houseDetail?.diedOut}</h5>
      <h5>Has overlord: {houseDetail?.overlord}</h5>
      <h5>Number of Cadet Branches: {houseDetail?.cadetBranches}</h5>
    </React.Fragment>
  );
};

export default HouseDetail;
