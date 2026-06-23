const CYAN = "#00e5ff";
const GREEN = "#00ffcc";
const RED = "#8b0000";
const DARK = "#001d3d";
const WHITE = "#ffffff";

class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    init(data) {

        this.level = data.level;

    }

    create() {

        this.cameras.main.setBackgroundColor("#000814");

        this.activeWords = [];

        this.currentInput = "";

        this.typedCount = 0;

        this.isPaused = false;

        this.levelData = levels[this.level - 1];

        this.words = [...this.levelData.words];

        this.wordCount = this.levelData.word_count;

        // LEVEL TEXT
        this.add.text(

            30,

            25,

            `LEVEL ${this.level}`,

            {

                fontSize: "30px",

                color: CYAN

            }

        );

        // WORD COUNTER
        this.counterText = this.add.text(

            window.innerWidth - 250,

            25,

            `Words : 0/${this.wordCount}`,

            {

                fontSize: "26px",

                color: WHITE

            }

        );

        // INPUT BOX
        this.inputDisplay = this.add.text(

            window.innerWidth / 2,

            window.innerHeight - 50,

            "Type :",

            {

                fontSize: "34px",

                color: GREEN,

                backgroundColor: DARK,

                padding: {

                    left: 20,

                    right: 20,

                    top: 10,

                    bottom: 10

                }

            }

        ).setOrigin(0.5);

        // PAUSE BUTTON
        this.pauseBtn = this.add.text(

            window.innerWidth - 60,

            70,

            "⏸",

            {

                fontSize: "30px",

                color: WHITE

            }

        )

        .setInteractive();

        this.pauseBtn.on(

            "pointerdown",

            ()=>{

                this.isPaused = !this.isPaused;

                this.pauseBtn.setText(

                    this.isPaused ?

                    "▶" :

                    "⏸"

                );

            }

        );

        // FULLSCREEN
        this.fullscreenBtn = this.add.text(

            window.innerWidth - 120,

            70,

            "⛶",

            {

                fontSize: "30px",

                color: WHITE

            }

        )

        .setInteractive();

        this.fullscreenBtn.on(

            "pointerdown",

            ()=>{

                if(!this.scale.isFullscreen){

                    this.scale.startFullscreen();

                }

                else{

                    this.scale.stopFullscreen();

                }

            }

        );

        this.spawnWord();

        this.input.keyboard.on(

            "keydown",

            (event)=>{

                if(this.isPaused){

                    return;

                }

                if(event.key==="Backspace"){

                    this.currentInput =

                    this.currentInput.slice(

                        0,

                        -1

                    );

                }

                else if(event.key.length===1){

                    this.currentInput +=

                    event.key.toLowerCase();

                }

                this.inputDisplay.setText(

                    "Type : " +

                    this.currentInput

                );

                for(let enemy of this.activeWords){

                    if(this.currentInput===enemy.word){

                        this.sound.play("hit");

                        enemy.destroy();

                        this.activeWords =

                        this.activeWords.filter(

                            e=>e!==enemy

                        );

                        this.currentInput = "";

                        this.inputDisplay.setText(

                            "Type :"

                        );

                        this.typedCount++;

                        this.counterText.setText(

                            `Words : ${this.typedCount}/${this.wordCount}`

                        );

                        if(this.typedCount>=this.wordCount){

                            this.sound.play(

                                "complete"

                            );

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

                            this.scene.start(

                                "LevelCompleteScene",

                                {

                                    level:this.level

                                }

                            );

                        }

                        else{

                            this.spawnWord();

                        }

                        break;

                    }

                }

            }

        );

    }

    spawnWord(){

        if(this.words.length===0){

            return;

        }

        let word = this.words.splice(

            Math.floor(

                Math.random() *

                this.words.length

            ),

            1

        )[0];

        let enemy = this.add.text(

            Phaser.Math.Between(

                100,

                window.innerWidth - 100

            ),

            0,

            word,

            {

                fontSize: "32px",

                backgroundColor: RED,

                color: WHITE,

                padding: {

                    left: 15,

                    right: 15,

                    top: 8,

                    bottom: 8

                }

            }

        );

        enemy.word = word;

        enemy.speed =

        1 +

        (this.level - 1) * 0.15;

        this.activeWords.push(

            enemy

        );

    }

    update(){

        if(this.isPaused){

            return;

        }

        for(let enemy of this.activeWords){

            enemy.y += enemy.speed;

            if(enemy.y > window.innerHeight - 100){

                this.sound.play(

                    "gameover"

                );

                this.scene.start(

                    "GameOverScene",

                    {

                        level:this.level

                    }

                );

            }

        }

    }

}