// Primitive.js

class Point {
    constructor(px = 0, py = 0) {
        this.x = px;
        this.y = py;
    }

    distance(pos) {
        let dx = this.x - pos.x;
        let dy = this.y - pos.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    isInsideSquare(pos, radius) {
        return (pos.x > this.x - radius
                && pos.x < this.x + radius
                && pos.y > this.y - radius
                && pos.y < this.y + radius)
    }

    isInsideCircle(pos, radius) {
        return (this.distance(pos) < radius);
    }
}

class Text {
    constructor(textobj) {
        Object.assign(this, textobj);
    }

    display() {
        textAlign(this.align[0], this.align[1]);
        textSize(this.size);
        text(this.content, this.position.x, this.position.y);
    }

}

