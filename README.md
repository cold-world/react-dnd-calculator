React drag and drop calculator constructor app.
=======================================

React, typescript, redux

Main goal -> Create a custom calculator with react drag and drop.

* * *
### [Demo](https://cold-world.github.io/react-dnd-calculator/)

![Alt Text](https://i.ibb.co/MhbpRCj/2.gif)

* * *



### A piece of code

```const onDragStart = (e: React.DragEvent<HTMLDivElement>, blockType: string) => {
    e.dataTransfer.setData('blockType', blockType);
  };
```

### Download & Installation

```shell 
git clone https://github.com/cold-world/react-dnd-calculator.git
cd <project dir>
yarn install
yarn start
```
