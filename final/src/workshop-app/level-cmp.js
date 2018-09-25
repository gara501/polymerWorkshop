import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import { MutableData } from '@polymer/polymer/lib/mixins/mutable-data.js';
import {GemCmp} from './gem-cmp.js';
import Sound from '../../lib/sound.js';

/**
 * @customElement
 * @polymer
 */
class LevelCmp extends MutableData(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        display: flex;
        font-family: 'Press Start 2P', cursive;
        --player-position-bottom: 0;
        --player-position-left: 0;
        --level-width: 100vw;
        --level-height: 100vh;
      }
      :host([hidden]) {
        display: none;
      } 
      .level {
        align-items: center;
        background: url('images/puzzle/bg.jpg');
        background-size: cover;
        display: flex;
        flex-flow: row;
        height: var(--level-height);
        padding: 20px;
        position: relative;
        width: var(--level-width);
      }

      .wall {
        align-content: flex-start;
        border-top: 2px dashed #046ca3;
	      border-bottom: 1px dashed #046ca3;
        box-shadow: inset 0 -1px 0 0 #fff, inset 0 1px 0 0 #046ca3, 0 1px 0 0 #046ca3, 0 -1px 0 0 #046ca3;
        transition: all 0.6s linear;
        display: flex;
        flex-flow: row wrap;
        padding: 20px 0 50px 50px;
        position: relative;
        width: 700px;
        height: 600px;
      }

      .wall:hover {
        background: rgba(35,255,255,.1);
      }

      .wall gem-cmp {
        margin: 15px;
        transition: scale 0.2 linear;
      }

      .wall gem-cmp.selected {
        animation-duration: .3s;
        animation-name: selected;
        animation-iteration-count: infinite;
      }

      @keyframes selected {
        from {
          transform: scale(1);
        }
      
        to {
          transform: scale(1.2);
        }
      }

      .score {
        color: white;
        flex: 1;
        text-align: center;
      }
      
      .score h2 {
        font-size: 3rem;
        text-shadow: 4px 4px 8px rgba(168, 0, 0, 1);
      }
      
    </style>
    <div class="level" style$="display: [[visible]]">
      <div class="score">
        <h2>Score: {{score}}</h2>
      </div>
      <div class="wall">
        <template is="dom-repeat" items="{{items}}" mutable-data>
          <gem-cmp on-click="updated" 
              position$="{{item.position}}" 
              shape="[[item.shape]]" 
              figure="[[item.figure]]" 
              id="{{item.id}}" 
              internal="{{item.internal}}" 
              color="[[item.color]]" 
              erased$="{{item.erased}}"></gem-cmp>
        </template>
      </div>
    </div>
    `;
  }

  static get properties() {
    return {
      score: {
        type: Number,
        value: 0,
        notify: true
      },
      visible: {
        type: String,
        value: 'block',
        notify: true,
        observer: '_gameVisible'
      },
      total: {
        type: Number,
        value: 64
      },
      shape: {
        type: String
      },
      erased: {
        type: Boolean,
        value: false
      },
      position: {
        type: Object,
        value: {}
      },
      selected: {
        type: Number,
        value: 0,
        notify: true,
        observer: '_updatedSelection'
      },
      gems: {
        type: Array,
        value() {
          return [
            {id_fig:1, figure: 'element_blue_diamond.png', color: 'blue', shape:"diamond"},
            {id_fig:2, figure: 'element_blue_polygon.png', color: 'blue', shape:"polygon"},
            {id_fig:3, figure: 'element_green_diamond.png', color: 'green', shape:"diamond"},
            {id_fig:4, figure: 'element_green_polygon.png', color: 'green', shape:"polygon"},
            {id_fig:5, figure: 'element_red_diamond.png', color: 'red', shape:"diamond"},
            {id_fig:6, figure: 'element_red_polygon.png', color: 'red', shape:"polygon"},
            {id_fig:7, figure: 'element_yellow_diamond.png', color: 'yellow', shape:"diamond"},
            {id_fig:8, figure: 'element_yellow_polygon.png', color: 'yellow', shape:"polygon"},
            {id_fig:9, figure: 'element_purple_diamond.png', color: 'purple', shape:"diamond"},
            {id_fig:10, figure: 'element_purple_polygon.png', color: 'purple', shape:"polygon"},
            {id_fig:11, figure: 'element_grey_diamond.png', color: 'grey', shape:"diamond"},
            {id_fig:12, figure: 'element_grey_polygon.png', color: 'grey', shape:"polygon"}
          ];
        }
      },
      items: {
        type: Array,
        value: [],
        notify: true,
        observer: '_updatedUi'
      },
      line:  {
        type: Array,
        value: [],
        notify: true
      },
      last: {
        type: Object,
        value: {}
      }
    };
  }

  updated(e) {
    // Update selected gems
    let isValid= false;
    this.selected += 1;
    console.log('SELECTED', this.selected);
    // Verify if I have a previous element selected
    if (!(JSON.stringify(this.last) == "{}")) {
      isValid = this.verifyBoundaries(e.model.item, this.last);
    }
    // If is a valid movement, I replace the element
    if (isValid) {
      this.reorderArray(this.last, e.model.item);
      // Assign again to maintain the last element selected
      this.last = e.model.item;
      // Update UI using mutable data
      this.notifyPath('items');
      //this.line.push(this.last);
    }

    if (this.selected === 2) {
      this.selected = 0;
      this.last = {};
    } else {
      // Update object with last Item Selected
      this.last = e.model.item;
    }
    
  }

  reorderArray(secondElement, firstElement) {
    let firstTemp = Object.assign({}, firstElement);
    let secondTemp = Object.assign({}, secondElement);

    this.items.forEach(element => {
      if (element.internal === secondElement.internal) {
        element.color = firstTemp.color;
        element.figure = firstTemp.figure;
        element.shape = firstTemp.shape;
      }
      
      if (element.internal === firstElement.internal) {
        element.color = secondTemp.color;
        element.figure = secondTemp.figure;
        element.shape = secondTemp.shape;
      }
    });

    return this.items;
  }

  _updatedSelection(newVal, oldVal) {
    if (newVal === 0) {
      this.clearSelected();
    }
  }

  clearSelected() {
    let nodes = this.shadowRoot.querySelectorAll('gem-cmp');
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        let item = nodes[i];
        item.classList.remove('selected');
      }
    }
  }

  _gameVisible(newVal, oldVal) {
    if (newVal === 'flex') {
      setTimeout(()=> {
        this.sound.play('game', true);
      }, 2000);
      
    }
  }

  
  _updatedUi(newval, oldval) {
    if (this.selected > 0) {
      //Get boundaries
      let positions = this.checkLines(this.last);
      let subItem = {};
      this.line = [];

      if (positions.length > 0) {
        this.line.push(this.last);
        for (let item of positions) {
          this.line.push(item);
          subItem = Object.assign({}, this.checkSubLine(item));
          while (Object.keys(subItem).length > 0) {
            if (subItem.pos === item.pos) {
              this.line.push(subItem);
              subItem = Object.assign({}, this.checkSubLine(subItem));
              this.line.push(subItem);
            }
           }
        }
      }
  
      if (this.line.length >= 3) {
        this.dropLine(this.line);
        this.notifyPath('items');
      }

      this.last = {};
    }
  }

  dropLine(lineArray) {
    let newItems = [];
    for (let item of this.items) {
      for (let itemLine of lineArray) {
        if (itemLine.id === item.id) {
          console.log('ITEM TO DROP', item);
          item.erased = true;
        }
      }
    }
    console.table(this.items);
  }

  makeScore() {
    
  }

  checkSubLine(item) {
    let leftBoundary = [1, 9, 17, 25, 33, 41, 49, 57];
    let rightBoundary = [8, 16, 24, 32, 40, 48, 56, 64];
    let node = 0;
    let resp = {};

    if (item.pos === 'left') {
      node = ((leftBoundary.indexOf((item.id)) === -1) ? item.id - 1: 0);
    }
    
    if (item.pos === 'right') {
      node = ((rightBoundary.indexOf((item.id)) === -1) ? item.id + 1: 0);
    }

    if (item.pos === 'top') {
      node = item.id - 8 < 0 ? 0:item.id - 8;
    }

    if (item.pos === 'bottom') {
      node = item.id + 8 > 64 ? 0: item.id + 8;
    }

    if (node > 0) {
      resp = this.getItemFromItems(node);
    }
      console.log('RESP', resp);
    if (resp.color === item.color) {
      resp.pos = item.pos;
      return resp;
    } else {
      return {};
    }
  }

  checkLines(item) {
    let leftBoundary = [1, 9, 17, 25, 33, 41, 49, 57];
    let rightBoundary = [8, 16, 24, 32, 40, 48, 56, 64];
    let positions = [];
    let boundaryItem = {};
    let boundaries = {
      bottom: (item.id + 8 > 64 ? 0: item.id + 8),
      top: (item.id - 8 < 0 ? 0:item.id - 8),
      left: ((leftBoundary.indexOf((item.id)) === -1) ? item.id - 1: 0),
      right: ((rightBoundary.indexOf((item.id)) === -1) ? item.id + 1: 0)
    }

    for (let prop in boundaries) {
      boundaryItem = this.getItemFromItems(boundaries[prop]);
      if (Object.keys(boundaryItem).length > 0) {
        if (boundaryItem.color === item.color) {
          boundaryItem.pos = prop;
          positions.push(boundaryItem);
        }
      }
    }
    return positions;
  }

  getItemFromItems(itemId) {
    let element = {};
    if (itemId != 0) {
      element = this.items.find(function(elem) {
        if(elem.id === itemId){
          return elem;
        }
      });
    }
    return element;
  }

  verifyBoundaries(selectedItem, lastItem) {
    let isValid = false;
    if (selectedItem.position.y === lastItem.position.y) {
      if ((selectedItem.position.x - 1) === lastItem.position.x) {
        isValid = true;
      }
      
      if ((selectedItem.position.x + 1) === lastItem.position.x) {
        isValid = true;
      }
    }
    if (selectedItem.position.x === lastItem.position.x) {
      if ((selectedItem.position.y - 1) === lastItem.position.y) {
        isValid = true;
      }
      
      if ((selectedItem.position.y + 1) === lastItem.position.y) {
        isValid = true;
      }
    }
    return isValid;
  }
  
  generateGems() {
    let randomArray = [];
    for (let i = 1; i<= this.total; i++) {
      let item = Math.floor(Math.random() * this.gems.length);
      randomArray.push(Object.assign({}, this.gems[item]));
    }
   
    let newArray = randomArray;
    let column = 0;
    let row = 1;

    for (let i = 0; i<= newArray.length-1; i++) {
      column = i+1;
      let rows = [9,17,25,33,41,49,57];
      if (rows.indexOf((i+1)) != -1) {
        row +=1;
      }

      if (column > 8) {
        column = column - (8*(row-1));
      }

      newArray[i].position =  {x:row, y:column };
      newArray[i].internal = `item_${i+1}`;
      newArray[i].id = i+1;
      newArray[i].erased = 'false';
    }

    return newArray;
  }

  ready(){
    super.ready();
  }

  constructor() {
    super();
    this.items = this.generateGems();
    this.sound = new Sound();
  }
}

window.customElements.define('level-cmp', LevelCmp);
