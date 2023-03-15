import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import './button.css';

type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  symbol: string;
  isOnCanvas: boolean | undefined;
};

export const Button = ({ symbol, isOnCanvas, ...props }: ButtonProps) => {
  const isRuntime = useSelector((state: RootState) => state.construct.isRuntime);

  const buttonClassNames = [
    'button',
    !isRuntime ? 'button--disabled' : null,
    symbol === '=' ? 'button--blue' : null,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={buttonClassNames} {...props}>
      {symbol}
    </button>
  );
};
