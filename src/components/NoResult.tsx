import React from 'react'

const NoResult: React.FC = () => {
  return (
    <tr>
      <td
        className="text-slate-500 dark:text-slate-400 py-4 font-semibold"
        colSpan={5}
      >
        No Result
      </td>
    </tr>
  )
}

export default NoResult
