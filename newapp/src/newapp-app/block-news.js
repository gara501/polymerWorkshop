import {LitElement, html, property} from '@polymer/lit-element';
import { AppStyles } from './styles.js';

/**
 * @customElement
 * @polymer
 */
export class BlockNews extends LitElement {
  static get properties() {
    return {
      title: String,
      author: String,
      url: String,
      urlToImage: String,
      publishedAt: String,
      description: String
    };
  }

  render() {
    return html`
    ${AppStyles}
      <style>
        :host {
          display: flex;
          flex-flow: column nowrap;
          width: 60%;
          margin: 10px;
        }
        
        p {
          font-family: var(--general-font);
          line-height: 1.6;
          word-break: break-word;
        }
        .blocknew {
          background: #FFF;
          border: 1px solid #f7f7f7;
          box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
          color: #333;
          transition: all .1s linear;
        }
        .blockimage {
          align-items:center;
          background: #e9e9e9;
          display: flex;
          height: 250px;
          justify-content: center;
          overflow: hidden;
          transition: .2s all linear;
        }
        .blockimage:hover {
          opacity: .7;
        }
        .blockdetails {
          min-height: 350px;
          padding: 20px;
          position: relative;
        }
        .blockdetails h3 {
          color: rgb(231, 76, 60);
          margin: 10px 0;
        }
        .blockdetail {
          color: rgb(51, 51, 51);
        }
        .blocknew img {
          height: 250px;
          object-fit: cover;
          width: 100%;
        }
        .blockdate {
          font-size: .9rem;
        }
        .link-detail {
          bottom: 10px;
          color: rgb(153, 153, 153);
          font-family: var(--general-font);
          font-size: .8rem;
          position: absolute;
          right: 10px;
          text-decoration: none;
          text-transform: uppercase;
          transition: .2s all linear;
        }
        .link-detail::before {
          content:'-   ';
        }
        .link-detail:hover {
          transform: translateX(-10px);
        }
      </style>
      <div class="blocknew">
        <div class="blockimage">
          <a href="${this.url}" target="_blank">
            <img src="${this.urlToImage}"></img>
          </a>
        </div>
        <div class="blockdetails">
          <p class="blockdate">Published: ${this.publishedAt}</p>
          <h3>${this.title}</h3>
          <p class="blockdetail">
            ${this.description}
          </p>
          <p class="blockauthor">
           Author: ${this.author}
          </p>
          <a class="link-detail" href="${this.url}" target="_blank">View full article</a>
        </div>
      </div>
    `;
  }
}

customElements.define('block-news', BlockNews);