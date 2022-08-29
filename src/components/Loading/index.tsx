import React from 'react';
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <tr>
      <td className="loading" colSpan={5}>
        Loading...
      </td>
    </tr>
  );
};

export default Loading;
