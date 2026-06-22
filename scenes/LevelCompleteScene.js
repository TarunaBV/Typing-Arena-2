class LevelCompleteScene extends Phaser.Scene {

    constructor() {

        super("LevelCompleteScene");

    }

    init(data) {

        this.level = data.level;

    }

    create() {

        this.cameras.main.setBackgroundColor("#000814");

        this.add.text(

            window.innerWidth / 2,

            140,

            "⭐⭐⭐ LEVEL COMPLETE ⭐⭐⭐",

            {

                fontSize: "52px",

                color: "#00e5ff",

                fontStyle: "bold"

            }

        )

        .setOrigin(0.5);

        this.add.text(

            window.innerWidth / 2,

            240,

            `Level ${this.level} Cleared!`,

            {

                fontSize: "36px",

                color: "#ffffff"

            }

        )

        .setOrigin(0.5);

        let nextBtn = this.add.text(

            window.innerWidth / 2,

            360,

            "▶ NEXT LEVEL",

            {

                fontSize: "36px",

                backgroundColor: "#001d3d",

                color: "#00e5ff",

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

            470,

            "🏠 MENU",

            {

                fontSize: "32px",

                backgroundColor: "#222222",

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

        nextBtn.on(

            "pointerover",

            ()=>{

                nextBtn.setScale(

                    1.1

                );

            }

        );

        nextBtn.on(

            "pointerout",

            ()=>{

                nextBtn.setScale(

                    1

                );

            }

        );

        nextBtn.on(

            "pointerdown",

            ()=>{

                localStorage.setItem(

                    `stars_${this.level}`,

                    3

                );

                this.scene.start(

                    "GameScene",

                    {

                        level: this.level + 1

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