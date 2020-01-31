import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  create () {
    this.player = this.add.image(100, 100, 'white')
    this.player.tint = 0xe7557c
    this.player.setOrigin(0.5)
    this.player.setDisplaySize(30, 60)

    // this.input.keyboard.on('keyup-Q', () => {
    //   console.log('cheats!')
    //   this.player.emit('damage', 10)
    // })
  }

  update (time, delta) {
    this.player.x = 640 + Math.cos(time / 1000) * 100
  }
}
