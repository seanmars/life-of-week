import React from 'react';
import clsx from 'clsx';

const Square = (props) => {
  const { state } = props;

  const getStateClass = (state) => {
    return `life-${state}`;
  };

  return (
    <>
      <span className={clsx('square', getStateClass(state))}>
      </span>
    </>
  );
};

export { Square };