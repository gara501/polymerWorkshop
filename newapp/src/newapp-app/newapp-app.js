import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {HeaderNews} from './header-news.js';

/**
 * @customElement
 * @polymer
 */
class NewappApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: 'Oswald', sans-serif;
        }
        
      </style>
      <header-news></header-news>
    `;
  }
  static get properties() {
    return {
      newsapikey: {
        type: String,
        value: 'bfb16da2918f4f40a273f57cf5de7cba'
      }
    };
  }
}

window.customElements.define('newapp-app', NewappApp);
