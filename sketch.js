//declaring variables
var database;
var contestantCount = 0;
var allContestants;
var design;
var contestant;
var quizState = 0;
var quiz;
var options;
var c=0, d=0;
var submit;
var submitNumber = 0;
var question;
var waiting;
var note;
var answer;
var conName;

function setup(){
  //creating canvas
   createCanvas(displayWidth, displayHeight);

  //creating background
  background (216,191,216);

   //creating database
   database = firebase.database();

   quiz = new Quiz();
   quiz.getState();
   quiz.start();  

   var submitNumberRef = database.ref("submitNumber");
      submitNumberRef.on("value",(data)=>{
        submitNumber = data.val();
      });
}


function draw(){
  if(contestantCount == 4 && quizState !=2){
    quiz.update(1);
  }
  if(quizState == 1){
    design.hide();
    background(0, 230, 115);
    
    if(c==0){
     quiz.newQuestion();
     c = 1;
    }
    quiz.submit();
  }
    if(submitNumber == 4){
      quiz.update(2);
    }   
    if(quizState == 2){
      Contestant.constestantsInformation();
      quiz.play();
      waiting.hide();
    }
}
