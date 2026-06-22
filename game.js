const config = {

    type: Phaser.AUTO,

    width: window.innerWidth,

    height: window.innerHeight,

    parent: "game-container",

    backgroundColor: "#000814",

    scene: [

        MenuScene,

        LevelSelectScene,

        GameScene,

        GameOverScene,

        LevelCompleteScene

    ]

};

new Phaser.Game(config);