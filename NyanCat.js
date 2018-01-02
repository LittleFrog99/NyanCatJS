// NyanCat.js

class NyanCat {
    constructor(catImg) {
        this.life = 5;
        this.position = new Point(width / 4, height / 2);
        this.image = catImg;
        this.rainbow = new RainbowSystem(resources.rbImg);
        this.vulnerable = true;
        this.hit = false;
        this.hitDuration = 0;
        this.posOff = 30;
    }

    run() {
        this.exitHitStatus();
        this.emitRainbow();
        this.showCat();
    }

    showCat() {
        push(); // avoid affecting other images
        let index = frameCount % 12;
        if (this.hit) {
            tint(255, 70, 70);
            this.hitDuration++;
        }
        imageMode(CENTER);
        image(this.image[int(index / 2.5)], this.position.x, this.position.y);
        pop();
    }

    exitHitStatus() {
        if (this.hit && this.hitDuration > 30) {
            this.hit = false;
            this.hitDuration = 0;
            this.vulnerable = true;
        }
    }

    checkEdges() {
        if (this.position.y < 0)
            this.position.y = 0;
        else if (this.position.y > height)
            this.position.y = height;
    }

    emitRainbow() {
        for (let t = 0; t < 4; t++) {
            keyEvent('w', this, obj => obj.position.y -= obj.posOff / 4);
            keyEvent('W', this, obj => obj.position.y -= obj.posOff / 4);
            keyEvent('s', this, obj => obj.position.y += obj.posOff / 4);
            keyEvent('S', this, obj => obj.position.y += obj.posOff / 4);
            this.checkEdges();
            this.rainbow.emit(new Point(this.position.x, this.position.y + this.oscillate()));
            this.rainbow.remove();
            this.rainbow.update();
        }
        this.rainbow.show();
    }

    oscillate() {
        return 2 * Math.round(2 * Math.sin(frameCount / 2));
    }

    hurt() {
        this.life--;
        this.vulnerable = false;
        this.hit = true;
    }

    reload() {
        this.life = 5;
        this.rainbow = new RainbowSystem(resources.rbImg);
        this.vulnerable = true;
        this.hit = false;
        this.hitDuration = 0;
    }

}