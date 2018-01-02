// Particle.js

class Particle {
    constructor(image) {
        this.image = image;
        this.totalFrame = image.length;
        this.curFrame = round(random(0, this.totalFrame));
    }

    show() {
        this.curFrame += (frameCount % 3 === 0);
        let ser = this.curFrame % this.totalFrame;
        imageMode(CENTER);
        image(this.image[ser], this.position.x, this.position.y);
    }

    isDead() {
        return this.position.x < 0 ? true : false;
    }

    update() {
        this.position.x -= this.speed;
    }

    birth(point) {
        this.curFrame = round(random(0, this.totalFrame));
        this.position = point;
    }

}

class ParticleSystem {
    constructor(image) {
        this.image = image;
        this.Particle == Particle; // constructor function of particle class
        this.list = []; // for holding particles
        this.prob = 0.4; // probability of emitting one particle in each frame
        this.num = 50; // maximum number of particles in the list
    }

    emit() {
        if (this.list.length < this.num && random() < this.prob) {
            let particle = new this.Particle(this.image);
            particle.birth( new Point(width, random(0, height)) );
            this.list.push(particle);
        }
    }

    remove() {
        for (let i in this.list)
            if (this.list[i].isDead())
                this.list.splice(i, 1);
    }

    update() {
        this.list.forEach(p => p.update())
    }

    show() {
        this.list.forEach(p => p.show())
    }

    run() {
        this.emit();
        this.update();
        this.show();
        this.remove();
    }

    reload() {
        this.list = []
    }

}


// Subclasses of Particle and ParticleSystem

class Star extends Particle {
    constructor(image) {
        super(image);
        this.speed = 24;
    }
}

class StarSystem extends ParticleSystem {
    constructor(image) {
        super(image);
        this.Particle = Star;
        this.num = 30;
        this.prob = 0.25;
    }
}

class Rainbow extends Particle {
    constructor(image) {
        super(image);
        this.speed = 8;
    }

    show() {
        imageMode(CENTER);
        image(this.image[0], this.position.x, this.position.y);
    }
}

class RainbowSystem extends ParticleSystem {
    constructor(image) {
        super(image);
        this.Particle = Rainbow;
        this.num = 70;
    }

    emit(pos) {
        if (this.list.length < this.num) {
            let rainbow = new this.Particle(this.image);
            rainbow.position = pos; // To be revised
            this.list.push(rainbow);
        }
    }

}

class Coin extends Particle {
    constructor(image) {
        super(image);
        this.speed = 30;
    }

    isCollected(cat) {
        return this.position.isInsideSquare(cat.position, 75);
    }
}

class CoinSystem extends ParticleSystem {
    constructor(image) {
        super(image);
        this.Particle = Coin;
        this.num = 3;
        this.collected = 0;
        this.prob = 0.1;
    }

    loadNyanCat(cat) {
        this.cat = cat;
    }

    collectCoins() {
        for(let i in this.list) 
            if (this.list[i].isCollected(this.cat)) {
                this.collected++;
                this.list.splice(i, 1);
            }
    }

    run() {
        super.run();
        this.collectCoins();
    }

    reload() {
        super.reload();
        this.collected = 0;
    }
}

class Stone extends Particle {
    constructor(image) {
        super(image);
        this.speed = 30;
    }

    hit(cat) {
        if(cat.vulnerable && this.position.isInsideSquare(cat.position, 50))
            cat.hurt();
    }
}

class StoneSystem extends ParticleSystem {
    constructor(image) {
        super(image);
        this.Particle = Stone;
        this.num = 5;
        this.prob = 0.3;
    }

    loadNyanCat(cat) {
        this.cat = cat;
    }

    hit() {
        this.list.forEach(element => element.hit(this.cat));
    }

    increaseNumber() {
        this.num += (frameCount % 500 === 0);
    }

    run() {
        super.run();
        this.hit();
        this.increaseNumber();
    }

    reload() {
        super.reload();
        this.num = 5;
    }
}
