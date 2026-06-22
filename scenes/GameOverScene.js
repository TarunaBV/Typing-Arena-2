class GameOverScene extends Phaser.Scene {

    constructor() {

        super("GameOverScene");

    }

    init(data) {

        this.level = data.level;

    }

    create() {

        this.cameras.main.setBackgroundColor("#000814");

        this.add.text(

            window.innerWidth / 2,

            150,

            "☠ GAME OVER ☠",

            {

                fontSize: "60px",

                color: "#ff3333",

                fontStyle: "bold"

            }

        ).setOrigin(0.5);

        let retryBtn = this.add.text(

            window.innerWidth / 2,

            320,

            "🔄 RETRY",

            {

                fontSize: "36px",

                backgroundColor: "#8b0000",

                color: "#ffffff",

                padding: {

                    left: 20,

                    right: 20,

                    top: 10,

                    bottom: 10

                }

            }

        )

        .setOrigin(0.5)

        .setInteractive();

        let menuBtn = this.add.text(

            window.innerWidth / 2,

            430,

            "🏠 MENU",

            {

                fontSize: "36px",

                backgroundColor: "#001d3d",

                color: "#ffffff",

                padding: {

                    left: 20,

                    right: 20,

                    top: 10,

                    bottom: 10

                }

            }

        )

        .setOrigin(0.5)

        .setInteractive();

        retryBtn.on(

            "pointerdown",

            ()=>{

                this.scene.start(

                    "GameScene",

                    {

                        level: this.level

                    }

                );

            }

        );

        menuBtn.on(

            "pointerdown",

            ()=>{

                this.scene.start(

                    "MenuScene"

                );

            }

        );

    }

}