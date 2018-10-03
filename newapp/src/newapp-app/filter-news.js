import {LitElement, html, property} from '@polymer/lit-element';
import { AppStyles } from './styles.js';

/**
 * @customElement
 * @polymer
 */
export class FilterNews extends LitElement {
  render() {
    return html`
      <style>
        :host {
          display: block;
          font-family: var(--general-font);
        }
        h1, h2, h3 {
          font-family: var(--title-font);
        }
        
        .filter {
          align-items: center;
          display: flex;
          flex-flow: row wrap;
          padding: 20px 0;
          justify-content: space-around;
        }
        .filter a {
          color: #ED028C;
          font-size: 1.2rem;
          text-decoration: none;
        }
        .filter a:hover {
          text-decoration: underline;
        }
      </style>
      <div class="filter">
        <a href="#technology">Technology</a>
        <a href="#science">Science</a>
        <a href="#health">Health</a>
        <a href="#entertainment">Entertainment</a>
        <a href="#business">Business</a>
        <a href="#general">General</a>
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

customElements.define('filter-news', FilterNews);