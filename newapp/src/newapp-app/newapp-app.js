import {LitElement, html, property} from '@polymer/lit-element';
import {HeaderNews} from './header-news.js';
import {ContainerNews} from './container-news.js';

/**
 * @customElement
 * @polymer
 */
class NewappApp extends LitElement {
  render() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <header-news></header-news>
      <container-news>
      </container-news>
    `;
  }

  constructor() {
    super();
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

customElements.define('newapp-app', NewappApp);
