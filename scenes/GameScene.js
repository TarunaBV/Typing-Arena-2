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

        this.typeSound = this.sound.add("type");

        // LEVEL
        this.add.text(

            30,

            20,

            `LEVEL ${this.level}`,

            {

                fontSize: "30px",

                color: CYAN

            }

        );

        // WORD COUNTER
        this.counterText = this.add.text(

            window.innerWidth - 250,

            20,

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

                fontSize: "32px",

                color: GREEN,

                backgroundColor: DARK,

                padding: {

                    left: 20,

                    right: 20,

                    top: 10,

                    bottom: 10

                }

            }

        )

        .setOrigin(0.5);

        // FULLSCREEN BUTTON
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

                    this.isPaused ? "▶" : "⏸"

                );

            }

        );

        // STARS
        this.stars = [];

        for(let i=0;i<150;i++){

            let star = this.add.circle(

                Phaser.Math.Between(

                    0,

                    window.innerWidth

                ),

                Phaser.Math.Between(

                    0,

                    window.innerHeight

                ),

                Phaser.Math.Between(

                    1,

                    3

                ),

                0xffffff

            );

            star.alpha = Phaser.Math.FloatBetween(

                0.3,

                0.8

            );

            this.stars.push(star);

        }

        this.spawnWord();

        // KEYBOARD INPUT
        this.input.keyboard.on(

            "keydown",

            (event)=>{

                if(this.isPaused){

                    return;

                }

                if(event.key==="Backspace"){

                    this.currentInput = this.currentInput.slice(

                        0,

                        -1

                    );

                }

                else if(event.key.length===1){

                    this.typeSound.play();

                    this.currentInput += event.key.toLowerCase();

                }

                this.inputDisplay.setText(

                    "Type : " +

                    this.currentInput

                );

                for(let enemy of this.activeWords){

                    if(this.currentInput===enemy.word){

                        this.sound.play("hit");

                        // Explosion effect

                        this.cameras.main.shake(100,0.002);

                        for(let i=0;i<20;i++){

                            let circle=this.add.circle(

                                enemy.x,

                                enemy.y,

                                Phaser.Math.Between(2,6),

                                0x00e5ff

                            );

                            this.tweens.add({

                                targets:circle,

                                x:enemy.x+Phaser.Math.Between(-80,80),

                                y:enemy.y+Phaser.Math.Between(-80,80),

                                alpha:0,

                                scale:0,

                                duration:500,

                                ease:"Power2",

                                onComplete:()=>{

                                    circle.destroy();

                                }

                            });

                        }


                        enemy.destroy();

                        this.activeWords = this.activeWords.filter(

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

                            this.sound.play("complete");

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

                Math.random() * this.words.length

            ),

            1

        )[0];

        let style = {

            fontSize:"32px",

            backgroundColor:RED,

            color:WHITE,

            padding:{

                left:15,

                right:15,

                top:8,

                bottom:8

            }

        };

        // Create temporary text to measure width
        let tempText = this.add.text(

            0,

            0,

            word,

            style

        );

        let textWidth = tempText.width;

        tempText.destroy();

        let x = Phaser.Math.Between(

            textWidth/2 + 20,

            window.innerWidth - textWidth/2 - 20

        );

        let enemy = this.add.text(

            x,

            0,

            word,

            style

        );

        enemy.word = word;

        enemy.speed = 1 + (this.level-1)*0.15;

        this.activeWords.push(enemy);

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