React drag and drop calculator constructor app.
=======================================

React, typescript, redux

Main goal -> Create a custom calculator with react drag and drop.

* * *
### [Demo](https://cold-world.github.io/react-dnd-calculator/)

![Alt Text](https://i.ibb.co/MhbpRCj/2.gif)

* * *



### A piece of code

```
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
```

### Download & Installation

```shell 
git clone https://github.com/cold-world/react-dnd-calculator.git
cd <project dir>
yarn install
yarn start
```
