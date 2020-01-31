import Phaser from 'phaser'

import GameScene from './game'

function assets (loader) {
  loader.image('white', 'textures/white.png')

  // load all assets here...
}

export default class LoadingScene extends Phaser.Scene {
  preload () {
    this.loadingFinished = false

    // If the devices is not a desktop and is currently in portrait mode, setup a rotation hook:
    this.requiresDeviceRotation = !this.game.device.os.desktop && this.scale.orientation === Phaser.Scale.PORTRAIT
    if (this.requiresDeviceRotation) {
      this.scale.on('orientationchange', (orientation) => {
        this.requiresDeviceRotation = this.scale.orientation === Phaser.Scale.PORTRAIT
        if (!this.requiresDeviceRotation) {
          this.requiresDeviceRotation = false
          if (this.loadingFinished) {
            this.startScenes()
          }
        }
      })
    }
  }

  // loadScenes loads multiple scenes here and returns the starting scene
  static loadScenes (manager) {
    manager.add('GameScene', GameScene, false)

    return 'GameScene'
  }

  startScenes () {
    this.scene.start(this.initialScene)
  }

  create () {
    assets(this.load)

    this.load.on('load', (file) => {
      console.log('Asset', file.key, 'loaded')
    })

    // this.load.on('progress', progress => {
    // })

    this.load.once('complete', () => {
      console.log('Loading complete')

      this.initialScene = LoadingScene.loadScenes(this.scene)
      this.loadingFinished = true

      if (!this.requiresDeviceRotation) {
        this.startScenes()
      } else if (this.requiresDeviceRotation) {
        this.add.text(640, 360, 'please rotate your device', { fontSize: '42pt', align: 'center' }).setOrigin(0.5)
      }
    })

    this.load.start()
  }
}
