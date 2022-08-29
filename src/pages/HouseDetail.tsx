import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/HouseDetail.css';
import { House } from '../state/types';

const HouseDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const houseId = params.houseId;

  const [houseDetail, setHouseDetail] = useState<House>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const getHouseDetails = async () => {
    setLoading(true);
    const data = await fetch(
      `https://anapioficeandfire.com/api/houses/${houseId}`
    ).then(async (res) => await res.json());
    setLoading(false);
    setHouseDetail(data);
  };
  useEffect(() => {
    getHouseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <button className="go-back" onClick={() => navigate(-1)}>
        Go back
      </button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>House Detail</h1>
          <div className="field">
            <strong>Name of the House: </strong>
            {houseDetail?.name}
          </div>
          <div className="field">
            <strong>Region: </strong>
            {houseDetail?.region}
          </div>
          <div className="field">
            <strong>Coat of Arms: </strong>
            {houseDetail?.coatOfArms}
          </div>
          <div className="field">
            <strong>Words: </strong>
            {houseDetail?.words}
          </div>
          <div className="field">
            <strong>Titles: </strong>
            {houseDetail?.titles.join(', ')}
          </div>
          <div className="field">
            <strong>Seats: </strong>
            {houseDetail?.seats.join(', ')}
          </div>
          <div className="field">
            <strong>Has died out: </strong>
            {houseDetail?.diedOut}
          </div>
          <div className="field">
            <strong>Has overlord: </strong>
            {houseDetail?.overlord}
          </div>
          <div className="field">
            <strong>Number of Cadet Branches: </strong>
            {houseDetail?.cadetBranches.length}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default HouseDetail;
