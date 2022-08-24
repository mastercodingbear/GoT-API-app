import React from 'react';
import { Character } from '../state/types';
import AllegianceList from './AllegianceList';

type Props = {
  character: Character;
};

const CharacterTableRow: React.FC<Props> = ({ character }) => {
  const convertNameToAlias = () => {
    const name = character.name ? character.name + ', ' : '';
    const alias = character?.aliases ?? [];
    return `${name}${alias.join(', ')}`;
  };

  let alive;
  if (!character.born && !character.died) {
    alive = 'Unknown';
  } else if (!character.born) {
    alive = 'No';
  }
  if (character.born && character.died) {
    const bornYears =
      character.born
        .match(/\d+/g)
        ?.map((num) => parseInt(num))
        .sort((a, b) => a - b)
        .pop() ?? 0;
    const diedYears =
      character.died
        .match(/\d+/g)
        ?.map((num) => parseInt(num))
        .sort((a, b) => a - b)
        .pop() ?? 0;
    const age = diedYears - bornYears;
    alive = `No, died at ${age} years old`;
  } else if (character.born && !character.died) {
    alive = 'Yes';
  }

  return (
    <React.Fragment>
      <tr>
        <td>{convertNameToAlias()}</td>
        <td>{alive}</td>
        <td>{character.gender}</td>
        <td>{character.culture || 'Unknown'}</td>
        <td>
          <AllegianceList allegiances={character.allegiances} />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default CharacterTableRow;
