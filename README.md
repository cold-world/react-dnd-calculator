Forkify App
=======================================

HTML, CSS, JavaScript

Main goal -> Create an app using the MVC architecture pattern that searches for meal recipes from an API. 

Features -> 
1. allows users to add or remove recipes to/from their bookmarked list.
2. calc ingredients by servings.
3. add your own recipe.

* * *
### [Demo](https://cold-world.github.io/forkify/)

![Alt Text](https://i.ibb.co/MhbpRCj/2.gif)

* * *



### A piece of code

```import View from './View';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for this query';
  _message = '';

  _generateTemplate() {
    return this._data.map((result) => previewView.render(result, false)).join(' ');
  }
}

export default new ResultsView();
```

### Download & Installation

```shell 
git clone https://github.com/cold-world/forkify.git
cd <project dir>
yarn install
yarn start
```
