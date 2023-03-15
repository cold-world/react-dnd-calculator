import React, { useState } from 'react';
import { blocksData } from '../../data/blocksData';
import { SidebarBlock } from '../sidebar-block/SidebarBlock';
import { useDispatch, useSelector } from 'react-redux';
import { addToCanvas, BlockType, deleteFromCanvas } from '../../features/constructSlice';
import { reset } from '../../features/calcSlice';
import { v4 } from 'uuid';
import type { RootState } from '../../store/store';
import { ButtonSwitcher } from '../ui/button-switcher/buttonSwitcher';
import './canvas.css';

export const Canvas = () => {
  const { canvasList, sidebarList } = useSelector((state: RootState) => state.construct);
  const isRuntime = useSelector((state: RootState) => state.construct.isRuntime);

  const dispatch = useDispatch();
  const [onDragEnterBlock, setOnDragEnterBlock] = useState<string | null>(null);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>, blockType: BlockType | 'canvas') => {
    e.stopPropagation();
    setOnDragEnterBlock(blockType);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOnDragEnterBlock(null);

    const blockType = e.dataTransfer.getData('blockType');
    const blockInCanvas = canvasList.find((item) => item.blockType === blockType);
    const indexBlockInCanvas = canvasList.findIndex((item) => item.blockType === blockType);
    const blockInSidebar = sidebarList.find((item) => item.blockType === blockType);
    if (onDragEnterBlock === blockType) return;
    if (blockInCanvas?.blockType === 'display') return;

    if (indexBlockInCanvas > -1) {
      if (onDragEnterBlock === 'canvas') {
        dispatch(deleteFromCanvas(canvasList[indexBlockInCanvas]));
        blockInCanvas && dispatch(addToCanvas({ block: blockInCanvas, position: -1 }));
      }
      if (onDragEnterBlock !== 'canvas' && onDragEnterBlock !== 'display') {
        dispatch(deleteFromCanvas(canvasList[indexBlockInCanvas]));
        const block = canvasList.find((item) => item.blockType === onDragEnterBlock);
        const position =
          block && canvasList.findIndex((item) => item.blockType === block.blockType);
        blockInCanvas &&
          dispatch(
            addToCanvas({ block: blockInCanvas, position: position !== undefined ? position : 0 })
          );
      }
    }

    if (indexBlockInCanvas === -1) {
      if (onDragEnterBlock === 'canvas') {
        blockInSidebar && dispatch(addToCanvas({ block: blockInSidebar, position: -1 }));
      }

      if (onDragEnterBlock !== 'canvas' && onDragEnterBlock !== 'display') {
        const block = canvasList.find((item) => item.blockType === onDragEnterBlock);
        const position =
          block && canvasList.findIndex((item) => item.blockType === block.blockType);
        blockInSidebar &&
          dispatch(
            addToCanvas({ block: blockInSidebar, position: position !== undefined ? position : 0 })
          );
      }
    }
  };

  const deleteBlockHandler = (blockType: BlockType) => {
    if (isRuntime) return;
    const block = canvasList.find((block) => block.blockType === blockType);
    if (blockType === 'display') dispatch(reset());
    block && dispatch(deleteFromCanvas(block));
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, blockType: string) => {
    e.dataTransfer.setData('blockType', blockType);
  };

  const canvasClassNames = [
    'canvas',
    onDragEnterBlock === 'canvas' && canvasList.length === 0 ? 'canvas__initial--onDrag' : null,
    canvasList.length === 0 ? 'canvas__initial' : null,
    onDragEnterBlock === 'canvas' && canvasList.length > 0 && canvasList.length < 3
      ? 'canvas__insert--down'
      : null,
  ]
    .filter(Boolean)
    .join(' ');

  const canvasInfoClassNames = [
    'canvas__info',
    canvasList.length > 0 ? 'canvas__info--disabled' : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className='canvas__wrapper'>
      <ButtonSwitcher />
      <div
        className={canvasClassNames}
        onDrop={onDropHandler}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => onDragEnter(e, 'canvas')}
      >
        <div className={canvasInfoClassNames}>
          <span></span>
          <span>Перетащите сюда</span>
          <span>любой элемент из левой панели</span>
        </div>

        {canvasList?.map((block) => (
          <SidebarBlock
            key={v4()}
            draggable={block.blockType !== 'display' && !isRuntime}
            data={blocksData[block.blockType]}
            isGrid={block.blockType === 'numbers'}
            isDisplay={block.blockType === 'display'}
            onDragEnter={(e) => onDragEnter(e, block.blockType)}
            onDoubleClick={() => deleteBlockHandler(block.blockType)}
            onDragStart={(e) => onDragStart(e, block.blockType)}
            isOnCanvas={block.isOnCanvas}
            isOnDragEnter={onDragEnterBlock === block.blockType}
          />
        ))}
      </div>
    </div>
  );
};
