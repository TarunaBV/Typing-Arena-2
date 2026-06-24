class LevelCompleteScene extends Phaser.Scene {

    constructor() {

        super("LevelCompleteScene");

    }

    init(data) {

        this.level = data.level;

    }

    create() {

        this.cameras.main.setBackgroundColor("#000814");

        // Title
        this.add.text(

            window.innerWidth / 2,

            80,

            "⭐ ⭐ ⭐    LEVEL COMPLETE    ⭐ ⭐ ⭐",

            {

                fontSize: "52px",

                color: "#00e5ff",

                fontStyle: "bold"

            }

        ).setOrigin(0.5);

        // Level cleared text
        this.add.text(

            window.innerWidth / 2,

            170,

            `Level ${this.level} Cleared!`,

            {

                fontSize: "42px",

                color: "#ffffff"

            }

        ).setOrigin(0.5);

        // NEXT LEVEL BUTTON
        let nextBtn = this.add.text(

            window.innerWidth / 2,

            290,

            "▶ NEXT LEVEL",

            {

                fontSize: "36px",

                backgroundColor: "#001d3d",

                color: "#00e5ff",

                padding: {

                    left: 25,

                    right: 25,

                    top: 15,

                    bottom: 15

                }

            }

        )

        .setOrigin(0.5)

        .setInteractive();

        // MENU BUTTON
        let menuBtn = this.add.text(

            window.innerWidth / 2,

            410,

            "🏠 MENU",

            {

                fontSize: "34px",

                backgroundColor: "#333333",

                color: "#ffffff",

                padding: {

                    left: 25,

                    right: 25,

                    top: 15,

                    bottom: 15

                }

            }

        )

        .setOrigin(0.5)

        .setInteractive();

        // Hover effect for BOTH buttons
        [nextBtn, menuBtn].forEach(btn => {

            btn.on(

                "pointerover",

                () => {

                    this.tweens.add({

                        targets: btn,

                        scaleX: 1.1,

                        scaleY: 1.1,

                        duration: 100

                    });

                }

            );

            btn.on(

                "pointerout",

                () => {

                    this.tweens.add({

                        targets: btn,

                        scaleX: 1,

                        scaleY: 1,

                        duration: 100

                    });

                }

            );

        });

        // Next level button action
        nextBtn.on(

            "pointerdown",

            () => {

                // Save 3 stars
                localStorage.setItem(

                    `stars_${this.level}`,

                    3

                );

                // Unlock next level
                localStorage.setItem(

                    "unlockedLevel",

                    Math.max(

                        parseInt(

                            localStorage.getItem(

                                "unlockedLevel"

                            )

                        ) || 1,

                        this.level + 1

                    )

                );

                // Start next level
                if (this.level < levels.length) {

                    this.scene.start(

                        "GameScene",

                        {

                            level: this.level + 1

                        }

                    );

                }

                else {

                    this.scene.start(

                        "MenuScene"

                    );

                }

            }

        );

        // Menu button action
        menuBtn.on(

            "pointerdown",

            () => {

                this.scene.start(

                    "MenuScene"

                );

            }

        );

    }

}