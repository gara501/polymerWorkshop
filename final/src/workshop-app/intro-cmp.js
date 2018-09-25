import {LitElement, html, property} from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import Sound from '../../lib/sound.js';

    class IntroCmp extends LitElement {
       
      static get properties() {
        return {
          mood: {type: String},
          visible: {
            type: String,
            value: 'block'
          }
        };
      }

      constructor() {
        super();
        this.mood = 'Beta (By Huge)';
        this.sound = new Sound();
      }

      start() {
        this.sound.stop();
        this.sound.play('start');
        let level = document.querySelector('level-cmp');
        let intro = document.querySelector('intro-cmp');
        intro.setAttribute('visible', 'none');
        level.setAttribute('visible', 'flex');
      }

      render() {
        return html`
        <style>
        :host {
          font-family: 'Press Start 2P', cursive;
        }
        :host([hidden]) {
          display: none;
        }      
        .intro-block {
          background:
          radial-gradient(black 15%, transparent 16%) 0 0,
          radial-gradient(black 15%, transparent 16%) 8px 8px,
          radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
          radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
          background-color:#282828;
          background-size:16px 16px;
          box-shadow: #FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, #FF2D95 0px 0px 40px, #FF2D95 0px 0px 50px, #FF2D95 0px 0px 75px;
          height: 430px;
          margin: 10% auto 0 auto;
          padding: 20px 2px;
          position: relative;
          text-align: center;
          width: 800px;
        }
        .intro-block .dot {
          animation-duration: 4s;
          animation-name: intro;
          animation-iteration-count: infinite;
          background: red;
          box-shadow: #FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, #FF2D95 0px 0px 40px, #FF2D95 0px 0px 50px, #FF2D95 0px 0px 75px;
          top: 0;
          height: 5px;
          left: 0;
          position: absolute;
          width: 5px;
        }
        @keyframes intro {
          0% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(800px, 0, 0);
          }
          50% {
            transform: translate3d(800px, 465px, 0);
          }
          75% {
            transform: translate3d(0, 465px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .title {
          font-size: 3rem;
          line-height: 1.5;
          color: #FF2D95;
        }
        paper-button {
          color: #FFFFFF;
          background: #232323;
          color: #FFF;
          margin-top: 50px;
          padding: 20px;
          transition: all .5s linear;
          box-shadow: inset (4px) (4px) 0px 0px #4AA52E;
        }
        paper-button:hover {
          background-color: #232323;
          text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;
        }
        p {
          color: #fff;
          bottom: 5px;
          margin-top: 100px;
          text-align: center;
        }
        </style>
        <div class="intro-block" style="display: ${this.visible};">
          <h1 class="title">Bejeweled ${this.mood}</h1>
          <paper-button @click="${(e) => this.start(e)}" raised class="indigo">Start Game</paper-button>
          <p>Use mouse to play - HUGE 2018 - Polymer Workshop</p>
          <div class="dot"></div>
        </div>
        `;
      }

    }

    customElements.define('intro-cmp', IntroCmp);