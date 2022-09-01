import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../Shared/components/Button'
import Loading from '../Shared/components/Loading'
import useHouseDetail from './hooks/useHouseDetail'

const HouseDetail: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const houseId: number = parseInt(params.houseId ?? '1')

  const { houseDetail, isLoading } = useHouseDetail(houseId)

  return (
    <React.Fragment>
      <Button
        text="Go back"
        onClick={() => navigate(-1)}
        className="flex justify-self-start"
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full px-4 text-slate-500 dark:text-slate-400">
          <h3 className="text-3xl font-bold mb-4">House Detail</h3>
          <div className="grid grid-cols-6">
            <b className="col-span-2 text-right">Name of the House: </b>
            <span className="col-span-4">{houseDetail?.name}</span>
            <b className="col-span-2 text-right">Region: </b>
            <span className="col-span-4">{houseDetail?.region}</span>
            <b className="col-span-2 text-right">Coat of Arms: </b>
            <span className="col-span-4">{houseDetail?.coatOfArms}</span>
            <b className="col-span-2 text-right">Words: </b>
            <span className="col-span-4">{houseDetail?.words}</span>
            <b className="col-span-2 text-right">Titles: </b>
            <span className="col-span-4">{houseDetail?.titles.join(', ')}</span>
            <b className="col-span-2 text-right">Seats: </b>
            <span className="col-span-4">{houseDetail?.seats.join(', ')}</span>
            <b className="col-span-2 text-right">Has died out: </b>
            <span className="col-span-4">{houseDetail?.diedOut}</span>
            <b className="col-span-2 text-right">Has overlord: </b>
            <div className="col-span-4">{houseDetail?.overlord}</div>
            <b className="col-span-2 text-right">Number of Cadet Branches: </b>
            <span className="col-span-4">
              {houseDetail?.cadetBranches.length}
            </span>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default HouseDetail
