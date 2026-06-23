class LevelSelectScene extends Phaser.Scene {

    constructor() {

        super("LevelSelectScene");

    }

    create() {

        this.cameras.main.setBackgroundColor("#000814");

        this.add.text(

            window.innerWidth / 2,

            60,

            "SELECT LEVEL",

            {

                fontSize: "48px",

                color: "#00e5ff",

                fontStyle: "bold"

            }

        ).setOrigin(0.5);

        let unlockedLevel = parseInt(

            localStorage.getItem(

                "unlockedLevel"

            )

        ) || 1;

        let cols = 4;

        let totalWidth = cols * 220;

        let startX = (window.innerWidth - totalWidth) / 2 + 90;

        let startY = 160;

        this.levelContainers = [];

        for (let i = 1; i <= levels.length; i++) {

            let row = Math.floor((i - 1) / cols);

            let col = (i - 1) % cols;

            let x = startX + col * 220;

            let y = startY + row * 110;

            let unlocked = i <= unlockedLevel;

            let btn = this.add.rectangle(

                0,

                0,

                160,

                60,

                unlocked ? 0x001d3d : 0x555555

            );

            let txt = this.add.text(

                0,

                0,

                `Level ${i}`,

                {

                    fontSize: "24px",

                    color: "#ffffff"

                }

            ).setOrigin(0.5);

            let container = this.add.container(

                x,

                y,

                [

                    btn,

                    txt

                ]

            );

            let stars = parseInt(

                localStorage.getItem(

                    `stars_${i}`

                )

            ) || 0;

            if (stars > 0) {

                let starText = this.add.text(

                    0,

                    40,

                    "⭐".repeat(stars),

                    {

                        fontSize: "18px",

                        color: "#ffff00"

                    }

                ).setOrigin(0.5);

                container.add(starText);

            }

            if (!unlocked) {

                let lock = this.add.image(

                    55,

                    0,

                    "lock"

                ).setScale(0.05);

                container.add(lock);

            }

            if (unlocked) {

                btn.setInteractive();

                btn.on(

                    "pointerover",

                    ()=>{

                        this.tweens.add({

                            targets: container,

                            scaleX: 1.1,

                            scaleY: 1.1,

                            duration: 100

                        });

                        btn.fillColor = 0x00e5ff;

                    }

                );

                btn.on(

                    "pointerout",

                    ()=>{

                        this.tweens.add({

                            targets: container,

                            scaleX: 1,

                            scaleY: 1,

                            duration: 100

                        });

                        btn.fillColor = 0x001d3d;

                    }

                );

                btn.on(

                    "pointerdown",

                    ()=>{

                        this.scene.start(

                            "GameScene",

                            {

                                level: i

                            }

                        );

                    }

                );

            }

        }

    }

}