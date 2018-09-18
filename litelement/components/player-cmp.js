import { LitElement, html } from '@polymer/lit-element'

class PlayerCmp extends LitElement {
  constructor() {
    super();
    this.name = "No Name";
  }

  static get properties() {
    return {
      name: String
    }
  }

  render(){
    return html `
    <h1>Name is ${this.name}</h1>
    `;
  }

  static get is() {
    return 'player-cmp'
  }
}

window.customElements.define(PlayerCmp.is, PlayerCmp);