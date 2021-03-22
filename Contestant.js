class Contestant{

    //declaring properties of a contestant
    constructor(){
        this.index = null;
        this.name = null;
        this.answer = 0;
    }

    //getting number of cotestants logged in
    getCount(){
        var ContestantCountRef = database.ref("contestantCount");
        ContestantCountRef.on("value", function(data){
            contestantCount = data.val();
        });
    }

    //updating contestantCount as more players log in
    updateCount(count){
        database.ref("/").update({
            contestantCount : count
        });
    }

    //updating various properties of a contestant
    update(){
        var contestantIndex = "contestants/contestant"+this.index;
        database.ref(contestantIndex).set({
            name : this.name,
            answer : this.answer
        });
    }

    //colllecting information of all players
    static constestantsInformation(){
        var contestantInfo = database.ref("contestants");
        contestantInfo.on("value", function (data){
            allContestants = data.val();
        });
    }
}