class MenuScene extends Phaser.Scene {

    constructor() {

        super("MenuScene");

    }

    preload() {

        this.load.image("lock","assets/lock.png");

        this.load.audio("type","assets/sounds/type.wav");

        this.load.audio("hit","assets/sounds/hit.wav");

        this.load.audio("complete","assets/sounds/level_complete.wav");

        this.load.audio("gameover","assets/sounds/gameover.wav");

    }

    create() {

        this.cameras.main.setBackgroundColor("#000814");

        this.add.text(

            window.innerWidth/2,

            150,

            "TYPING ARENA",

            {

                fontSize:"64px",

                color:"#00e5ff",

                fontStyle:"bold"

            }

        ).setOrigin(0.5);

        this.add.text(

            window.innerWidth/2,

            230,

            "CYBER EDITION",

            {

                fontSize:"30px",

                color:"#ffffff"

            }

        ).setOrigin(0.5);

        let startBtn = this.add.text(

            window.innerWidth/2,

            400,

            "▶ START GAME",

            {

                fontSize:"36px",

                backgroundColor:"#001d3d",

                color:"#00e5ff",

                padding:{

                    left:20,

                    right:20,

                    top:10,

                    bottom:10

                }

            }

        )

        .setOrigin(0.5)

        .setInteractive();

        startBtn.on(

            "pointerover",

            ()=>{

                startBtn.setScale(1.1);

            }

        );

        startBtn.on(

            "pointerout",

            ()=>{

                startBtn.setScale(1);

            }

        );

        startBtn.on(

            "pointerdown",

            ()=>{

                this.scene.start("LevelSelectScene");

            }

        );

    }

}