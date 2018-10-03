import {LitElement, html, property} from '@polymer/lit-element';
import {repeat} from 'lit-html/directives/repeat.js';
import {until} from 'lit-html/directives/until.js';
import {BlockNews} from './block-news.js';
import {FilterNews} from './filter-news.js';
import { AppStyles } from './styles.js';

/**
 * @customElement
 * @polymer
 */
export class ContainerNews extends LitElement {
  static get properties() {
    return {
      news: Array,
      api: String,
      url: String,
      originalUrl: String
    };
  }

  constructor() {
    super();
    this.api = '&apiKey=bfb16da2918f4f40a273f57cf5de7cba';
    this.originalUrl = `https://newsapi.org/v2/top-headlines?country=us${this.api}`;
    this.url = `https://newsapi.org/v2/top-headlines?country=us${this.api}`;
    this.news = [];
    this.getNews();
    
  }

  updated(changedProperties) {
    if (changedProperties.has('url')) {
      this.getNews();
    }
  }

  filterSelected(e) {
    console.log('filter', e.path[0].hash);
    let category = e.path[0].hash.replace('#', '');
    let filter = `&category=${category}`;
    this.url = this.originalUrl+filter;
  }

  getNews() {
    fetch(this.url)
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      this.news = jsondata.articles;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return html`
    ${AppStyles}
      <style>
        :host {
          display: block;
          font-family: 'Oswald', sans-serif;
        }
        .news-container {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          width: 100%;
        }
        .loader {
          text-align: center;
          margin: 50px auto 0 auto;
          width: 300px;
        }
      </style>
      <filter-news @click=${(e) => this.filterSelected(e)}></filter-news>
      <div class="news-container">
      ${until(
        fetch(this.url)
        .then((response) => {
          return response.json();
        })
        .then((jsondata) => {
          return html`
            ${repeat(
              this.news,
              item => item.title,
              item => html`
                <block-news
                title="${item.title}"
                author="${item.author ? item.author : '--'}"
                url="${item.url}"
                description="${item.description ? item.description : '--'}"
                urlToImage="${item.urlToImage ? item.urlToImage: 'images/noimage.jpg'}"
                publishedAt="${item.publishedAt ?  item.publishedAt.substring(0, 10): '--'}"
                description="${item.description}"
                ></block-news>`
            )}`
        })
        .catch((error) => {
          console.log(error);
        }), html`<h3 class="loader">Loading news...</h3>`)}
      </div>
      `
    }
  
}

customElements.define('container-news', ContainerNews);