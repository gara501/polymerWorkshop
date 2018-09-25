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
        width: 50px;
      }

    </style>
    <img class="gem" id="{{internal}}" on-click="selected" src="images/puzzle/[[figure]]" alt="gem" />
    `;
  }

  static get properties() {
    return {
      figure: {
        type: String
      },
      internal: {
        type: Number
      },
      color: {
        type: String
      },
      erased: {
        type: Boolean,
        value: false,
        notify: true
      }
    };
  }
 

  ready(){
    super.ready();
  }

  selected(e) {
    this.classList.add('selected');
    this.classList.add()
  }

  constructor() {
    super();
  }
}

window.customElements.define('gem-cmp', GemCmp);
