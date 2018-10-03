import { html } from '@polymer/lit-element';

export const AppStyles = html`
  <style>
    :host {
      --general-font: 'Raleway', sans-serif;
      --title-font: 'Yanone Kaffeesatz', sans-serif;
    }
    h1, h2, h3 {
      font-family: var(--title-font);
    }
    h1 {
      font-size: 3rem;
    }
    h2 {
      font-size: 2.5rem;
    }
    h3 {
      font-size: 2rem;
    }
  </style>
`;