import React from 'react';
import type { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import './display.css';

type DisplayProps = {
  isOnCanvas: boolean | undefined;
};

export const Display = ({ isOnCanvas }: DisplayProps) => {
  const { nextValue } = useSelector((state: RootState) => state.calc);
  const displayClassNames = ['display', nextValue && nextValue?.length >= 9 ? 'display--font-sm' : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={displayClassNames}>
      {isOnCanvas ? (
        <div className='display__next'>{nextValue}</div>
      ) : (
        <div className='display__next'>0</div>
      )}
    </div>
  );
};
