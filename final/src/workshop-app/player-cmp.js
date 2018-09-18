import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class PlayerCmp extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        position: absolute;
        left: var(--player-position-left);
        bottom: var(--player-position-bottom);
        --player-background: url('/images/player/player-spritemap-v9.png') no-repeat -12px -3px;
      }
      .player-container {
        width: 22px;
        height: 45px;
      }
      .player {
        background: var(--player-background);
        width: 22px;
        height: 45px;
      }
    </style>
    <p class="player"></p>
    `;
  }

  static get properties() {
    return {
      animated: {
        type: Boolean,
        value: false
      },
      player: {
        type: String
      },
      currentFrame: {
        type: Number,
        value: 1
      },
      current: {
        type: Array,
        value: [
          {
            id: 1,
            pos: '-12px -3px',
            height: '45px',
            width: '22px'
          }
        ]
      },
      stop: {
        type: Array,
        value: [
          {
            id: 1,
            pos: '-12px -3px',
            height: '45px',
            width: '22px'
          }
        ]
      },
      run: {
        type: Array,
        value: [
          {
            id:1,
            pos: '-5px -160px',
            height: '38px',
            width: '34px'
          },
          {
            id:2,
            pos: '-48px -161px',
            height: '37px',
            width: '36px'
          },
          {
            id:3,
            pos: '-100px -160px',
            height: '38px',
            width: '32px'
          },
          {
            id:4,
            pos: '-150px -160px',
            height: '38px',
            width: '23px'
          },
          {
            id:5,
            pos: '-189px -160px',
            height: '38px',
            width: '33px'
          },
          {
            id:6,
            pos: '-232px -161px',
            height: '37px',
            width: '37px'
          },
          {
            id:7,
            pos: '-285px -160px',
            height: '38px',
            width: '27px'
          },
          {
            id:8,
            pos: '-333px -160px',
            height: '38px',
            width: '24px'
          }
        ]
      }
    };
  }
 

  ready(){
    super.ready();
    let interval;

    console.log(this.player);
    if (this.player === 'enemy') {
      let currentBackground = getComputedStyle(this.shadowRoot.querySelector('.player')).getPropertyValue('background');
      this.shadowRoot.querySelector('.player').style.background = "url('images/enemy/s_crapmunch_idle_strip6.png') no-repeat 0 -2px;";
      this.shadowRoot.querySelector('.player').style.backgroundImage = "url('images/enemy/s_crapmunch_idle_strip6.png')";
      console.log(currentBackground);
      console.log(getComputedStyle(this.shadowRoot.querySelector('.player')).getPropertyValue('background'));
    }
        
    document.onkeydown = (e) => {
      e = e || window.event;
      if (e.keyCode == '38') {
          console.log('up');
      }
      else if (e.keyCode == '40') {
        console.log('down');
      }
      else if (e.keyCode == '37') {
        console.log('left');
      }
      else if (e.keyCode == '39') {
        console.log(this.animated);
        if (!this.animated) {
         interval = setInterval(()=> {
            this.animate({type: 'run', orientation: 'right'});
          }, 100);
          this.animated = true;
        }        
      }
    }

    document.onkeyup = (e) => {
      e = e || window.event;
      if (this.animated) {
        this.animated = false;
        clearInterval(interval);
        this.animate({type: 'stop'});
      }
      
      
    }
  }

  stop() {
    this.animated = false;
  }

  animate({type, orientation}) {
    if(type === 'run') {
      if (orientation === 'right') {
        if (this.currentFrame <= 7) {
          this.currentFrame += 1;
          console.log(this.currentFrame);
        }
        
        if (this.currentFrame > 7) {
          this.currentFrame = 0;
        }
        this.shadowRoot.querySelector('.player').style['background-position'] =  this.run[this.currentFrame].pos;
        this.shadowRoot.querySelector('.player').style['width'] =  this.run[this.currentFrame].width;
        this.shadowRoot.querySelector('.player').style['height'] =  this.run[this.currentFrame].height;
      }
    } else if (type === 'stop') {
      this.shadowRoot.querySelector('.player').style['background-position'] =  this.stop[0].pos;
      this.shadowRoot.querySelector('.player').style['width'] =  this.stop[0].width;
      this.shadowRoot.querySelector('.player').style['height'] =  this.stop[0].height;
    }
    
  }

  constructor() {
    super();
    this.test = 'sdsd';
  }
}

window.customElements.define('player-cmp', PlayerCmp);
