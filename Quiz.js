class Quiz{
    constructor(){}
    getState(){
        var quizStateRef = database.ref("quizState");
        quizStateRef.on("value", (data)=> {
            quizState = data.val();
        });
    }
    
    update(state){
        database.ref("/").update({
            quizState : state
        });
    }

    async start(){
        if(quizState === 0){
            contestant = new Contestant();
            contestant.getCount();
            design = new Question();
            design.display();
        }
    }

    play(){
        design.hide();
        background(255, 255, 153);
        var result = createElement("h1");
        result.html("RESULT OF THE QUIZZY CHALLENGE");
        result.position(displayWidth/2-200, 100);
        //console.log(allContestants);
        if(allContestants != undefined){
            note = createElement("h3");
            var index = 1;
            var y = displayHeight/2 - 100;
            note.html("RED ONES ARE THE WRONG ANSWERS AND GREEN THE RIGHT ONES");
            note.position(displayWidth/2-400, displayHeight/2-180);
            for(var clr in allContestants){ 
                var con = "contestants/contestant"+index;
                var answerRef = database.ref(con+ "/answer");
                answerRef.on("value", (data)=>{
                    answer = data.val();
                });
                if(answer == "CANDLE")
                fill("green");
                else
                fill("red");
               
                var nameRef = database.ref(con + "/name");
                nameRef.on("value",(data)=>{
                    conName = data.val();
                });
                textSize(20);
                text(conName +" : " + answer,  500, y);
                y = y+50;
                index++;
            }
        }
    }  


    newQuestion(){
    options = createSelect();
    options.position(displayWidth/2, displayHeight/2);
    options.option("SELECT");
    options.option("CANDLE");
    options.option("TUBELIGHT");
    options.option("TAPE");
    options.option("BOOK");
    submit = createButton("SUBMIT");
    submit.position(displayWidth/2+100, displayHeight/2);
    question = createElement("h1");
    question.html("1. I’m tall when I’m young, and I’m short when I’m old. What am I?");
    question.position(displayWidth/2-450, 100);
    }

    submit(){
        submit.mousePressed(()=>{ 
            d = options.value();
           console.log(d);
          database.ref("contestants/contestant"+contestant.index).update({
            answer : d
          }); 
          submitNumber ++;
          database.ref("/").update({
            submitNumber : submitNumber
          });
          question.hide();
          submit.hide();
          options.hide();
          waiting = createElement("h1");
          waiting.html("WAITING FOR OTHER CONTESTANTS TO SUBMIT THEIR ANSWERS...");
          waiting.position(displayWidth/2-500, displayHeight/2-100);
        });
    }
}