import React from 'react';
import { Character } from '../state/types';
import CharacterTableRow from './CharacterTableRow';

type Props = {
  characters: Character[];
};

const CharacterTableBody: React.FC<Props> = ({ characters }) => {
  return (
    <React.Fragment>
      {characters.map((row, index) => (
        <CharacterTableRow character={row} key={`character-${index}`} />
      ))}
    </React.Fragment>
  );
};

export default CharacterTableBody;
