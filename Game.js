// Game.js

let GameStage = {
    WELCOME: 0,
    GAMEPLAY: 1,
    GAMEOVER: 2
}

class Game {
    constructor() {
        this.components = {
            stars: new StarSystem(resources.starImg),
            coins: new CoinSystem(resources.coinImg),
            stones: new StoneSystem(resources.stoneImg),
            cat: new NyanCat(resources.catImg),
            UI: new UI(),
            music: new Music(resources.bgm)
        };
        this.stage = GameStage.WELCOME;
        this.components.coins.loadNyanCat(this.components.cat);
        this.components.stones.loadNyanCat(this.components.cat);
        this.components.UI.loadCoinSystem(this.components.coins);
        this.components.UI.loadNyanCat(this.components.cat);
    }

    run() {
        switch (this.stage) {
            case GameStage.WELCOME: this.welcome(); break;
            case GameStage.GAMEPLAY: this.gamePlay(); break;
            case GameStage.GAMEOVER: this.gameOver(); break;
        }
    }

    welcome() {
        this.components.stars.run();
        this.components.UI.showWelcomeMessage();
        keyCodeEvent(ENTER, this, obj => { obj.stage = GameStage.GAMEPLAY } );
    }

    gamePlay() {
        
        [
            this.components.stars,
            this.components.coins,
            this.components.stones,
            this.components.cat
        ].forEach(element => element.run());
        this.components.UI.showGameplayHUD();
        this.components.music.play();
        this.checkGameOver();
        this.cheat();
    }

    checkGameOver() {
        if (this.components.cat.life < 1) {
            this.stage = GameStage.GAMEOVER;
            this.components.music.stop();
        }
    }

    gameOver() {
        this.components.stars.run();
        this.components.UI.showCoinNumber();
        this.components.UI.showGameOverMessage();
        this.checkNewGame();
    }

    checkNewGame() {
        keyCodeEvent(ENTER, this, obj => {
            obj.stage = GameStage.GAMEPLAY;
            [
                obj.components.cat,
                obj.components.coins,
                obj.components.stones
            ].forEach(element => element.reload());
        });
    }

    cheat() {
        keyEvent('C', this, obj => obj.components.cat.life = Infinity);
        keyEvent('c', this, obj => obj.components.cat.life = Infinity);
    }
}

class Music {
    constructor(bgm) {
        this.bgm = bgm;
        this.firstPlay = true;
    }

    play() {
        if (this.firstPlay) { // Start to play background music
            this.bgm.play();
            this.firstPlay = false;
        }
        else if (!this.bgm.isPlaying()) // Loop
            this.bgm.jump(4.055);
    }

    stop() {
        this.firstPlay = true;
        this.bgm.stop();
    }
}

class UI {
    constructor() {
        this.staticText = { // prepare fixed textobj resources
            title: new Text({
                content: "NYAN CAT",
                align: [CENTER, CENTER],
                position: new Point(width / 2, height / 4),
                size: 100
            }),

            guide: new Text({
                content: "Collect coins and dodge stones\nPress W & S to control\n\nPress ENTER to start",
                align: [CENTER, CENTER],
                position: new Point(width / 2, height * 0.6),
                size: 30
            }),

            gameOver: new Text({
                content: "GAME OVER",
                align: [CENTER, CENTER],
                position: new Point(width / 2, height / 4),
                size: 100
            }),
            
            playAgain: new Text({
                content: "Nyan Cat is dead\n\nPress ENTER to play again",
                align: [CENTER, CENTER],
                position: new Point(width / 2, height * 0.6),
                size: 30
            })
        }
        this.catIcon = resources.catIcon; // Load HUD display icons
        this.coinIcon = resources.coinIcon;
    }

    showWelcomeMessage() {
        let textobj = [this.staticText.title, this.staticText.guide];
        textobj.forEach(element => element.display());
    }

    showGameplayHUD() {
        this.showCatLife();
        this.showCoinNumber();
    }

    showCatLife() {
        imageMode(CENTER); // cat icon
        image(this.catIcon, 40, 40);
        new Text({ // cat life number
            content: this.cat.life,
            align: [LEFT, CENTER],
            position: new Point(90, 40),
            size: 40
        }).display();
    }

    showCoinNumber() {
        imageMode(CENTER);
        image(this.coinIcon, width - 40, 40);
        new Text({
            content: this.coins.collected,
            align: [RIGHT, CENTER],
            position: new Point(width - 90, 40),
            size: 40
        }).display();
    }

    loadNyanCat(cat) {
        this.cat = cat;
    }

    loadCoinSystem(cs) {
        this.coins = cs;
    }

    showGameOverMessage() {
        let textobj = [this.staticText.gameOver, this.staticText.playAgain];
        textobj.forEach(element => element.display());
    }
}
