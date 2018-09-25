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
  }

  _loadSounds() {
    createjs.Sound.alternateExtensions = ['mp3', 'wav'];
    createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));
    createjs.Sound.registerSounds(this.sounds, this.audioPath);
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
          let instance = createjs.Sound.play(soundName, props);
          if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
            return;
          }
        } else {
          let instance = createjs.Sound.play(soundName);
          if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
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