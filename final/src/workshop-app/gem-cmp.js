import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
export class GemCmp extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      .gem {
        height: 50px;
        margin: 25px;
        width: 50px;
      }

    </style>
    <div class="gem" selected$="{{selected}}" id="[[id]]">
      <img class="gem-element " src="images/puzzle/[[figure]]" alt="gem" />
    </div>
    `;
  }

  static get properties() {
    return {
      selected: {
        type: Number,
        value: 0,
        notify: true
      },
      figure: {
        type: String
      },
      id: {
        type: Number
      },
      color: {
        type: String
      }
    };
  }
 

  ready(){
    super.ready();
    let interval;
    let selectedEl = this.selected;
    this.addEventListener('click', (e) => {
      console.log(e);
      console.log(this.color);
      selectedEl += 1;
      console.log('selectedEl', selectedEl);
      this.selected = selectedEl;
      console.log('this selected', this.selected); 
    });
    
  }

  updated() {

  }
 

  constructor() {
    super();
    this.test = 'sdsd';
  }
}

window.customElements.define('gem-cmp', GemCmp);
