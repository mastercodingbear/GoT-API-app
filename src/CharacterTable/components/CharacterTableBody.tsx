import React from 'react'
import { Character } from '../types'
import CharacterTableRow from './CharacterTableRow'
import NoResult from '../../Shared/components/NoResult'

interface Props {
  characters: Character[]
}

const CharacterTableBody: React.FC<Props> = ({ characters }) => {
  return (
    <React.Fragment>
      {characters.length > 0 ? (
        characters.map((row, index) => (
          <CharacterTableRow character={row} key={`character-${index}`} />
        ))
      ) : (
        <NoResult />
      )}
    </React.Fragment>
  )
}

export default CharacterTableBody
