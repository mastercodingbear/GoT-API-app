import React from 'react'
import { Character } from '../state/types'
import AllegianceList from './AllegianceList'

interface Props {
  character: Character
}

const CharacterTableRow: React.FC<Props> = ({ character }) => {
  const convertNameToAlias = (): string => {
    const alias = character?.aliases ?? []
    const name = character.name !== '' ? character.name + ', ' : ''
    return `${name}${alias.join(', ')}`
  }

  let alive
  if (character.born === '' && character.died === '') {
    alive = 'Unknown'
  } else if (character.born === '') {
    alive = 'No'
  }
  if (character.born !== '' && character.died !== '') {
    const bornYears =
      character.born
        .match(/\d+/g)
        ?.map((num) => parseInt(num))
        .sort((a, b) => a - b)
        .pop() ?? 0
    const diedYears =
      character.died
        .match(/\d+/g)
        ?.map((num) => parseInt(num))
        .sort((a, b) => a - b)
        .pop() ?? 0
    const age = diedYears - bornYears
    alive = `No, died at ${age} years old`
  } else if (character.born !== '' && character.died === '') {
    alive = 'Yes'
  }

  return (
    <React.Fragment>
      <tr>
        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
          {convertNameToAlias()}
        </td>
        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
          {alive}
        </td>
        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
          {character.gender}
        </td>
        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
          {character.culture !== '' ? character.culture : 'Unknown'}
        </td>
        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
          <AllegianceList allegiances={character.allegiances} />
        </td>
      </tr>
    </React.Fragment>
  )
}

export default CharacterTableRow
