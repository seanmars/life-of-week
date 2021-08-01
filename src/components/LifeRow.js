import React from 'react';

const LifeRow = (props) => {
  const { children } = props;

  return (<div className="life-row">
    {children}
  </div>);
};

export { LifeRow };