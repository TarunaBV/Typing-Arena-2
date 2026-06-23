const config = {

    type: Phaser.AUTO,

    parent:"game-container",

    width: window.innerWidth,

    height: window.innerHeight,

    scale:{

        mode:Phaser.Scale.RESIZE,

        autoCenter:Phaser.Scale.CENTER_BOTH

    },

    backgroundColor:"#000814",

    scene:[

        MenuScene,

        LevelSelectScene,

        GameScene,

        GameOverScene,

        LevelCompleteScene

    ]

};

new Phaser.Game(config);