import React from 'react';
import { SidebarBlock } from '../sidebar-block/SidebarBlock';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { blocksData } from '../../data/blocksData';
import './sidebar.css';

export const Sidebar = () => {
  const { sidebarList, isRuntime } = useSelector((state: RootState) => state.construct);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, blockType: string) => {
    e.dataTransfer.setData('blockType', blockType);
  };

  const sidebarClassNames = ['sidebar', isRuntime ? 'sidebar--disabled' : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={sidebarClassNames}>
      {sidebarList.map((block) => (
        <SidebarBlock
          key={block.id}
          draggable
          data={blocksData[block.blockType]}
          isGrid={block.blockType === 'numbers'}
          isDisplay={block.blockType === 'display'}
          onDragStart={(e) => onDragStart(e, block.blockType)}
          isOnCanvas={block.isOnCanvas}
          isDisabled={block.isOnCanvas}
        />
      ))}
    </div>
  );
};
