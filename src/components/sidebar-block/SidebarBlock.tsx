import React from 'react';
import './sidebarBlock.css';
import { Button, Display } from '../';
import { useDispatch } from 'react-redux';
import { addNum, operation, calculation } from './../../features/calcSlice';

type SidebarBlockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isDisplay: boolean;
  data?: string[];
  isGrid: boolean | undefined;
  isOnCanvas?: boolean;
  isDisabled?: boolean;
  isOnDragEnter?: boolean;
};

export const SidebarBlock = ({
  isDisplay,
  data,
  isGrid,
  isOnCanvas,
  isDisabled,
  isOnDragEnter,
  ...props
}: SidebarBlockProps) => {
  const dispatch = useDispatch();

  const sidebarBlockClassNames = [
    'sidebar-block',
    isDisabled ? 'sidebar-block--disabled' : null,
    isOnCanvas ? 'sidebar-block--onCanvas' : null,
    isGrid ? 'sidebar-block--grid' : 'sidebar-block--flex',
    isOnDragEnter ? 'sidebar-block__insert--up' : null
  ]
    .filter(Boolean)
    .join(' ');

  const buttonHandler = (symbol: string) => {
    if (!isOnCanvas) return;

    if (!isFinite(parseFloat(symbol)) && symbol !== '=' && symbol !== '.') {
      dispatch(operation(symbol));
    }
    if (isFinite(parseFloat(symbol)) || symbol === '.') {
      dispatch(addNum(symbol));
    }
    if (symbol === '=') {
      dispatch(calculation());
    }
  };

  if (!isDisplay) {
    return (
      <div className={sidebarBlockClassNames} {...props}>
        {data?.map((item) => (
          <Button
            key={item}
            symbol={item}
            isOnCanvas={isOnCanvas}
            onClick={() => buttonHandler(item)}
          />
        ))}
      </div>
    );
  }

  /////////////////////////////////////////
  return (
    <div className={sidebarBlockClassNames} {...props}>
      <Display isOnCanvas={isOnCanvas} />
    </div>
  );
};
