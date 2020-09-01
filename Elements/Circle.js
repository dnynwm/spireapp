// versions  = [
//   {
//     name: "streaks",
//     colorFunction: (v) => v+1,
//     movementFunction: (v) => v+Math.random()
//   },

// ]

class Circle {
    constructor() {
      noStroke();
      smooth();

      this.r = random(150, 255);
      this.g = random(150, 255);
      this.b = random(150, 255);
      this.alph = random(200, 255);


      this.x = random(width/2);
      this.y = random(height/2);

      this.xInc = random(0, 2)-1;
      this.yInc = random(0, 2)-1;

      this.size = 25;
      this.maxSize = 75;

      this.startFading = false
      this.fadeValue = 1
      this.blurValue = 0
    }

    update() {
      this.updateSize()
      this.updateMovement()
      this.updateColor()
      this.updateFade()
    }

    updateSize() {
      this.size = this.size + (random(2)-1)/2;
      //console.log(this.size)
      

      if(this.size > this.maxSize) {this.startFading = true};
      //
       // this.blurValue += 3;
      //console.log("Size: "+this.size);
    }

    updateFade() {
      if(this.startFading) {
        this.alph -= this.fadeValue
        
      }
      //console.log("Size: "+this.size);
    }

    updateMovement() {
      this.x = this.x + this.xInc
      this.y = this.y + this.yInc

      if(this.x > width) this.x = 0
      if(this.y > height) this.y = 0

      if(this.x < 0) this.x = width
      if(this.y < 0) this.y = height
    }

    updateColor() {
      this.r = this.r +(random()*2)-1; // -0.5 & 1.5
      this.g = this.g +(random()*2)-1; // -0.5 & 1.5
      this.b = this.b +(random()*2)-1; // -0.5 & 1.5
      this.alph = this.alph + (random()*2)-1;

      //console.log("A: "+this.alph);
    }

    redraw() {
      fill(this.r, this.g, this.b, this.alph);
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
