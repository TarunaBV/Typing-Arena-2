const config = {

    type: Phaser.AUTO,

    parent: "game-container",

    backgroundColor: "#000814",

    scale: {

        mode: Phaser.Scale.RESIZE,

        autoCenter: Phaser.Scale.CENTER_BOTH

    },

    width: window.innerWidth,

    height: window.innerHeight,

    scene: [

        MenuScene,

        LevelSelectScene,

        GameScene,

        GameOverScene,

        LevelCompleteScene

    ]

};

new Phaser.Game(config);