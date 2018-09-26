import {LitElement, html, property} from '@polymer/lit-element';

/**
 * @customElement
 * @polymer
 */
export class HeaderNews extends LitElement {
  render() {
    return html`
      <style>
        :host {
          display: block;
          font-family: 'Oswald', sans-serif;
        }
        .header {
          background: #ED028C;
          color: #FFF;
          heigth: 300px;
          padding: 50px 0;
          text-align: center;
        }
        .header img{
          width: 100px;
        }
        
      </style>
      <div class="header">
        <img src="images/news.svg" />
        <h1>POLYMER NEWS APP</h1>
      </div>
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

customElements.define('header-news', HeaderNews);