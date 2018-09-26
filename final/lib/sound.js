export default class Sound {
  constructor() {
    this.audioPath = '../../sounds/';
    this.sounds = [
      {id:'intro', src: 'intro.wav'},
      {id:'start', src: 'start.mp3'},
      {id:'game', src: 'game.mp3'},
      {id:'move', src: 'move.wav'},
      {id:'line', src: 'line.wav'},
      {id:'lose', src: 'lose.wav'},
      {id:'win', src: 'win.wav'},
    ];
    this._loadSounds();
    this.instance = {};
  }

  _loadSounds() {
    createjs.Sound.alternateExtensions = ['mp3', 'wav'];
    createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));
    createjs.Sound.registerSounds(this.sounds, this.audioPath);
  }

  isActive() {
    return this.instance.playState;
  }

  soundLoaded(event) {
    if (event.id === 'intro') {
      this.play('intro');
    }
  }

  play(soundName, loop = false) {
    for (let item of this.sounds) {
      if (item.id === soundName) {
        if (loop) {
          let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1})
          this.instance = createjs.Sound.play(soundName, props);
          if (this.instance == null || this.instance.playState == createjs.Sound.PLAY_FAILED) {
            return;
          }
        } else {
          this.instance = createjs.Sound.play(soundName);
          if (this.instance == null || this.instance.playState == createjs.Sound.PLAY_FAILED) {
            return;
          }
        }
        
      }
    }
  }
  
  stop() {
    createjs.Sound.stop();
  }
}