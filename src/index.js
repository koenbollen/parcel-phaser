import 'babel-polyfill'
import Phaser from 'phaser'

import LoadingScene from './scenes/loading'

import './style.css'

const config = {
  title: 'parcel phaser',
  url: '',
  parent: 'game',
  type: Phaser.WEBGL,
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: '#222223',
  banner: false
}

export default class Game extends Phaser.Game {
  start () {
    super.start()
    this.input.keyboard.addCapture('SPACE') // to prevent the page from scrolling

    const muted = window.localStorage.getItem('sound') === 'mute'
    this.sound.setMute(muted)

    this.scene.add('LoadingScene', LoadingScene, true)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game(config)
  if (process.env.NODE_ENV !== 'production') {
    window.game = game
  }
})

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.dispose(() => {
    if (window.game) {
      const manager = window.game.scene
      console.log('Hot reload dispose, removing these scenes:')
      manager.dump()
      Object.keys(manager.keys).forEach(s => manager.remove(s))
    }
  })
  module.hot.accept(() => {
    if (window.game) {
      const manager = window.game.scene
      const initialScene = LoadingScene.loadScenes(manager)
      manager.start(initialScene)
      console.log('Reloaded scenes:')
      manager.dump()
    }
  })
}
