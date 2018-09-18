import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import {GemCmp} from './gem-cmp.js';

/**
 * @customElement
 * @polymer
 */
class LevelCmp extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        
        display: block;
        --player-position-bottom: 0;
        --player-position-left: 0;
        --level-width: 1200px;
        --level-height: 800px;
      }
      .level {
        align-items: center;
        background: url('images/puzzle/bg.jpg');
        background-size: cover;
        display: flex;
        flex-flow: row;
        height: var(--level-height);
        padding: 20px 5px;
        position: relative;
        width: var(--level-width);
      }
      .wall {
        align-content: flex-start;
        border: 3px solid #f7f7f7;
        border-radius: 10px;
        display: flex;
        flex-flow: row wrap;
        padding: 10px;
        position: relative;
        width: 800px;
        height: 800px;
      }
      .score {
        color: white;
        flex: 1;
      }
      
    </style>
    <div class="level">
      <div class="score">
        <h3>Selected:</h3>
        <h2>{{selected}}</h2>
      </div>
      <div class="wall">
        <template is="dom-repeat" items="{{items}}">
            <gem-cmp on-click="updated" selected$="{{selected}}" figure="[[item.figure]]" id="[[item.id]]" color="[[item.color]]"></gem-cmp>
        </template>
      </div>
    </div>
    `;
  }

  static get properties() {
    return {
      total: {
        type: Number,
        value: 64
      },
      selected: {
        type: Number,
        value: 0,
        notify: true
      },
      gems: {
        type: Array,
        value() {
          return [
            {id:1, figure: 'element_blue_diamond.png', color: 'blue'},
            {id:2, figure: 'element_blue_polygon.png', color: 'blue'},
            {id:3, figure: 'element_green_diamond.png', color: 'green'},
            {id:4, figure: 'element_green_polygon.png', color: 'green'},
            {id:5, figure: 'element_red_diamond.png', color: 'red'},
            {id:6, figure: 'element_red_polygon.png', color: 'red'},
            {id:7, figure: 'element_yellow_diamond.png', color: 'yellow'},
            {id:8, figure: 'element_yellow_polygon.png', color: 'yellow'},
            {id:9, figure: 'element_purple_diamond.png', color: 'purple'},
            {id:10, figure: 'element_purple_polygon.png', color: 'purple'},
            {id:11, figure: 'element_grey_diamond.png', color: 'grey'},
            {id:12, figure: 'element_grey_polygon.png', color: 'grey'}
          ];
        }
      },
      items: {
        type: Array,
        value: []
      }
    };
  }

  updated(e) {
    this.selected += 1;
    console.log('ACA UPDATED', e.model.item.id);
  }

  generateGems() {
    let randomArray = [];
    for (let i = 1; i<= this.total; i++) {
     randomArray.push(this.gems[Math.floor(Math.random()*this.gems.length)]);
    }
    this.items = randomArray;
    return randomArray;
  }

  ready(){
    super.ready();
   
  }

  constructor() {
    super();
    this.items = this.generateGems();
  }
}

window.customElements.define('level-cmp', LevelCmp);
