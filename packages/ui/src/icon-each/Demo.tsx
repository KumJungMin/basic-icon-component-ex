import React from 'react';

import Add from './Add';
export default function Demo() {
  return (
    <div>
      <Add theme="outline" size="32" color="#000000" />
      <Add theme="outline" size="32" color={["#000000", "blue"]} />
    </div>
  );
}