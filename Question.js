class Question{
    constructor(){
        this.enter = createButton("ENTER");
        this.name = createInput("ENTER YOUR NAME");
        this.title = createElement("h1");
        this.greeting = createElement("h1");
    }

    display(){
        
        this.name.position(displayWidth/2, displayHeight/2);
        
        this.enter.position(this.name.x+ 200, this.name.y);
       
        this.title.html("COMPLETE THE QUIZZY");
        this.title.position(displayWidth/2-100, 100);
        this.enter.mousePressed(()=>{
            this.name.hide();
            this.enter.hide();
            contestant.name = this.name.value();
            contestantCount++;
            contestant.index = contestantCount;
            contestant.update();
            contestant.updateCount(contestantCount);
            this.greeting.html("HELLO "+contestant.name);
            this.greeting.position(displayWidth/2-100, displayHeight/2);
        });
    }
    hide(){
        this.greeting.hide();
        this.name.hide();
        this.enter.hide();
        this.title.hide();
    }
}