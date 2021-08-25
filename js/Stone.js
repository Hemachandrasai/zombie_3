class Stone{
    constructor(x,y,width,height){
        var options={
        isStatic:false,
       restituction:0.8,
    
       
        }
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.width = width;
        this.height = height;
        this.image = loadImage("./assets/stone.png")

        World.add(world,this.body);

    }
    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        fill("red");
        push();
        
        translate(pos.x,pos.y);
        rotate(angle);
        rectMode(CENTER);
       // ellipse(0,0,40,80)
       image(this.image,0,0,this.width,this.height);
        fill("red");
       
        pop();
        
    }
}