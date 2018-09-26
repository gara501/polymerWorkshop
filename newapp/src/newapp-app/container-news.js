import {LitElement, html, property} from '@polymer/lit-element';

/**
 * @customElement
 * @polymer
 */
class ContainerNews extends LitElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: 'Oswald', sans-serif;
        }
        
      </style>
      <h2>Hello [[prop1]]!</h2>
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

customElements.define('container-news', ContainerNews);