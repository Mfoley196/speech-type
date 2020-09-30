/* 
 * 
 */

/*
Variables
*/

//constants
var SERVER_URL = "";
var NUM_OF_TRIALS = 20;
var TRAINING_NUM = 2;
var NUM_OF_PARTICIPANTS = 31;

//important stuff
var trialNo = 1;
var trainingNo = 1;
var participantNo = 1;
var inputType = "Keyboard";

//timing variables
var timingOn = false;
var thinkTiming = false;
var firstKeyStroke = false;
var startInputTime;
var stopInputTime;
var totalInputTime;
var startThinkTime;
var stopThinkTime;
var totalThinkTime;

var phraseObj = {};
var phrasesC = [];
var phrasesD = [];
var phrasesLoaded = false;
var imagesLoaded = false;

//bools to check if we're done with an input type
var kbdDone = false;
var speechDone = false;
var trainingMode = true;
var transcriptionOn = false;
var trainingPhrasesOn = true;
var phrasesOn = true;
var setNum = "";

var keyStrokes = [];
var imgPairs = [
    "turtle.png,cooking-pan.png,youngman.png",
    "swings.png,money.png,momandbaby.png",
    "apple.png,doctor.png,house.png",
    "doctor.png,plane.png,boy.png",
    "baby.png,iPhone4.png,man.png",
    "boy.png,Friends.png,present.png",
    "bicycle.png,youngman.png,santa.png",
    "sun.png,house.png,baby.png",
    "grandma.png,heart.png,teddybear.png",
    "soccer.png,youngman.png,heart.png",
    "crying.png,pup.png,confused.png",
    "cooking.png,house.png,soccer.png",
    "swings.png,crying.png,raincloud.png",
    "boy.png,boat.png,cat.png",
    "crying.png,youngman.png,santa.png",
    "teddybear.png,money.png,Friends.png",
    "brocoli.png,hotdog.png,woman.png",
    "house.png,Friends.png,mug.png",
    "flower.png,bench.png,man.png",
    "woman.png,momandbaby.png,plane.png"
];

var trainingPairs = [
 "banana.png,boy.png,pup.png",
 "grandma.png,doctor.png,apple.png",
 "flower.png,house.png,girl.png",
 "bee.png,cat.png,crying.png",
 "sadboy.png,plane.png,girl.png",
 "apple.png,boat.png,woman.png"
];

var trainingPhrases = [
    "That boy shouldn't feed a banana to his puppy! <br><br> " + 
    "The dog runs around while his owner eats a banana. ",
    "The old woman told the doctor she eats an apple every day. <br> <br>" +
    "The doctor gives his patient an apple.",
    "The girl thinks the flowers outside the house are ugly. <br><br>" + 
    "I really like the flowers that the girl planted in the front yard.",
    "The boy is crying because the bee is going to sting the cat! <br><br> " +
    "The cat and the boy are running away from the bee.",
    "The boy was upset that he had to say goodbye his friend at the airport. <br><br> " +
    "The girl had to go home on a plane, much to the boy's sadness. ",
    "The sailboat passed by as she ate a snack. <br><br>" +
    "She ate an apple on the deck of her new sailboat."
];

var transTraining = [
    "These people worked together to make a snowman",
    "This big tree provides shade to the house in the summer",
    "This is the grandson of this old lady",
    "I used a smartphone to find presents for my family",
    "The dog went to the veterinarian for a check up",
    "A man is preparing his sailboat to sail across the ocean",
    "This child is a prodigy at playing the piano",
    "This woman ate a banana, but then slipped on the peel",
    "This guy was going for a walk when he saw a ship",
    "The little fox got wet in the rain",
    "These people played a trivia game on a phone.",
    "Do you remember the big oak tree by our house"
];

/*
Methods
*/

//Gets the next pair of images for the experiment
function getNextImagePair() {
    if (transcriptionOn) {
        phr = setNum === 'C' ? phrasesC[trialNo-1][0] : phrasesD[trialNo-1][0];
        $("#transPhrase").html(phr);
    } else {
        imgs = imgPairs[trialNo-1].split(",");
        imgDirName = "images/";

        if (setNum === 'B') {
            imgDirName = "images_alt/"
        } else {
            imgDirName = "images/"
        }
        $('#img1').attr('src', imgDirName + imgs[0]);
        $('#img2').attr('src', imgDirName + imgs[1]);
        $('#img3').attr('src', imgDirName + imgs[2]);
    }
}
    

//Gets the next pair of images for training
function getNextTrainingStuff() {
    if (transcriptionOn) {
        phr = transTraining[trainingNo-1];
        $("#transPhrase").html(phr);
    } else {
        imgs = trainingPairs[trainingNo - 1].split(",");
        $('#img1').attr('src', "images/" + imgs[0]);
        $('#img2').attr('src', "images/" + imgs[1]);
        $('#img3').attr('src', "images/" + imgs[2]);
    }
}

//Start the experiment
$('#startExp').click(function () {
    //If there is a participant # & an input type is selected
    if ($("#participantNo").val() != "" 
        && $("input[name=inputType]:checked").val() != null) {
        participantNo = $("#participantNo").val();
        inputType = $("input[name=inputType]:checked").val();
        kbdDone = false;
        speechDone = false;
        trialNo = 1;
        trainingNo = 1;

        taskVal = $("input[name=taskType]:checked").val();
        transcriptionOn = taskVal === 'tr' ? true : false;

        if (transcriptionOn) {
            $("#transMode").show();
            $("#compMode").hide();
            //setNum = $("input[name=startSet]:checked").val();
            setNum = $("input[name=startSet]:checked").val();

            //add phrases in set C or set D to $phrases
            for (var i = 0; i < phraseObj["setC"].length; i++) {
                phrasesC.push([phraseObj["setC"][i], "C1"])
            }

            for (var i = 0; i < phraseObj["setD"].length; i++) {
                phrasesD.push([phraseObj["setD"][i], "D1"])
            }

            //add participantNo_inputType phrases to $phrases
            if (setNum === "C") {
                str = participantNo + inputType;
                console.log(str);
                for (var i = 0; i < phraseObj[str].length; i++) {
                    phrasesC.push([phraseObj[str][i], "C2"])
                }
                //phrasesC.push(...phraseObj[str]);
                shuffle(phrasesC);
            } else {
                str = participantNo +  inputType;
                for (var i = 0; i < phraseObj[str].length; i++) {
                    phrasesD.push([phraseObj[str][i], "D2"])
                }
                //phrasesD.push(...phraseObj[str]);
                shuffle(phrasesD);
            }
            //shuffle 'em up'
        } else {
            $("#transMode").hide();
            $("#compMode").show();
            setNum = $("input[name=startSet]:checked").val();
        }

        getNextTrainingStuff();
        $('#exPhrases').html(trainingPhrases[trialNo-1]);
        $("#trainingNext").attr("href", "#training").button();
        headerText.innerHTML = "Training";
        
        document.getElementById("msg").style.height = "80px";
        $("#startExp").attr("href", "#experiment").button();
    } else {
        alert("Please fill in a participant number and input type!");
    }
});

//Save data to server & get next image pair
$('#saveButton').click(function () {
    //if no text in msg, alert
    //$("#msg").val() !== ""
    if ($("#msg").val() !== "") {
        //switching from training mode to experiment mode when all training 
        //examples are completed
        if (trainingNo == TRAINING_NUM) {
            $("#trainingPhrases").hide();
             headerText.innerHTML = "Trial " + trialNo;

            trainingMode = false;
            trainingNo = 1;
            trialNo = 1;
            keyStrokes = [];

            getNextImagePair();

            if (!kbdDone || !speechDone) {
                if (!transcriptionOn) {
                    shuffle(imgPairs);
                }
            }

            //Show or hide relevant text
            $("#pauseTxt").hide();
            $("#hidePhrases").hide();
            $("#modeSwitch").show();

            $("#msg").val("");
            return;
        } else {
            $("#pauseTxt").show();
            $("#hidePhrases").hide();
            $("#modeSwitch").hide(); 
        }

        if (trainingMode) {
            trainingHandle();
        } else {
            expMode();
        }
    } else {
        $("#saveButton").attr("href", "#experiment").button();
        alert("Please input a phrase.");
    }

    }//end function
);

/**
Handle a training mode trial
*/
function trainingHandle() {
    $("#saveButton").attr("href", "#pause").button();
    $("#msg").val("");
    $("#hidePhrases").hide();

    firstKeyStroke = false;
    keyStrokes = [];

    if (!transcriptionOn) {
        //Load next images & phrases
        if (trainingNo < TRAINING_NUM / 2) {
            $('#exPhrases').html(trainingPhrases[trainingNo]);
        } else if (trainingNo === TRAINING_NUM / 2) {
            $("#hidePhrases").show();
            $("#pauseTxt").hide();
            $("#trainingPhrases").hide();
        }
    }
    trainingNo++;
    getNextTrainingStuff();
}

/**
Handle an experiment mode trial
*/
function expMode() {
    $("#saveButton").attr("href", "#pause").button();
    //stop timing, calculate how long it took to input phrase
    if (timingOn) {
        stopInputTime = Date.now();
        totalInputTime = stopInputTime - startInputTime;
        timingOn = false;
    }

    var setNumSave = "";

    if (transcriptionOn) {
        setNumSave = setNum === 'C' ? phrasesC[trialNo-1][1] : phrasesD[trialNo-1][1];
    } else {
        setNumSave = setNum;
    }

    // //Create object with data, and send it to server
    // var newObj = {
    //     "participantNo": participantNo,
    //     "inputType": inputType,
    //     "trialNo": trialNo,
    //     "inputTime": totalInputTime,
    //     "startInputTime": startInputTime,
    //     "stopInputTime" : stopInputTime,
    //     "thinkTime": totalThinkTime,
    //     "startThinkTime": startThinkTime,
    //     "stopThinkTime": stopThinkTime,
    //     "triad": imgPairs[trialNo-1],
    //     "msg": $("#msg").val(),
    //     //"origMsg": transcriptionOn ? phr : "NULL",
    //     "keyStrokes": keyStrokes,
    //     "transOn": transcriptionOn ? true : false,
    //     "setNum": setNumSave
    // };

    if (transcriptionOn) {
        //Create object with data, and send it to server
        var newObj = {
            "participantNo": participantNo,
            "inputType": inputType,
            "trialNo": trialNo,
            "inputTime": totalInputTime,
            "startInputTime": startInputTime,
            "stopInputTime" : stopInputTime,
            "thinkTime": totalThinkTime,
            "startThinkTime": startThinkTime,
            "stopThinkTime": stopThinkTime,
            //"triad": imgPairs[trialNo-1],
            "msg": $("#msg").val(),
            "origMsg": phr,
            "keyStrokes": keyStrokes,
            "transOn": transcriptionOn ? true : false,
            "setNum": setNumSave
        };
    } else {
        var newObj = {
            "participantNo": participantNo,
            "inputType": inputType,
            "trialNo": trialNo,
            "inputTime": totalInputTime,
            "startInputTime": startInputTime,
            "stopInputTime" : stopInputTime,
            "thinkTime": totalThinkTime,
            "startThinkTime": startThinkTime,
            "stopThinkTime": stopThinkTime,
            "triad": imgPairs[trialNo-1],
            "msg": $("#msg").val(),
            //"origMsg": transcriptionOn ? phr : "NULL",
            "keyStrokes": keyStrokes,
            "transOn": transcriptionOn ? true : false,
            "setNum": setNumSave
        };

    }

    $.post(SERVER_URL + "/saveInput", newObj,
        function (data) 
        {
            console.log("Entry has been saved.");
        }).fail(function (error) {
        alert("Error: " +error.responseText);
    });

    //If we've completed 15 trials, and already completed the other
    //input type, set flag to true
    if (trialNo == NUM_OF_TRIALS && (kbdDone || speechDone)) {
        if (kbdDone === true) {
            speechDone = true;
        } else {
            kbdDone = true;
        }
    }

    //If we've completed 15 trials for one type, notify participant to
    //change input type
    if (trialNo == NUM_OF_TRIALS && (!kbdDone || !speechDone)) {
        console.log('input switch')
        $("#saveButton").attr("href", "#inputChange").button();
    } else if (kbdDone && speechDone) {
        //Finish the study
        $("#participantNo").val("");
        $("#saveButton").attr("href", "#studyDone").button();
    }

    //Get ready for next trial
    trialNo++;

    headerText.innerHTML = "Trial " + trialNo;
    firstKeyStroke = false;
    keyStrokes = [];
    $("#msg").val("");
    document.getElementById("msg").style.height = "80px";

}

/**
Fetch next group of images/phrases for experiment mode or training mode
*/
$("#nextButton").click(function() {
    if (!trainingMode) {
        if (trialNo <= NUM_OF_TRIALS) {
            getNextImagePair(); 
        }
    } else {
        getNextTrainingStuff();
    }
});

$("#nextMethod").click(function() {
    trialNo = 1;
    if (inputType === "Keyboard") {
        inputType = "Speech";
        kbdDone = true;
    } else {
        inputType = "Keyboard";
        speechDone = true;
    }

    if (transcriptionOn) {
        setNum = setNum === 'C' ? 'D' : 'C';
        transTraining.reverse();

        if (setNum === "C") {
            str = participantNo + inputType;
            for (var i = 0; i < phraseObj[str].length; i++) {
                phrasesC.push([phraseObj[str][i], "C2"])
            }
            //phrasesC.push(...phraseObj[str]);
            shuffle(phrasesC);
        } else {
            str = participantNo +  inputType;
            for (var i = 0; i < phraseObj[str].length; i++) {
                phrasesD.push([phraseObj[str][i], "D2"])
            }
            //phrasesD.push(...phraseObj[str]);
            shuffle(phrasesD);
        }

    } else {
        setNum = setNum === 'A' ? 'B' : 'A';
        trainingPairs.reverse();
        trainingPhrases.reverse();

        $("#trainingPhrases").show();
        $('#exPhrases').html(trainingPhrases[trialNo-1]);
    }

    
    trainingMode = true;
    getNextTrainingStuff();
    $("#trainingNext").attr("href", "#training").button();
    headerText.innerHTML = "Training";
    $("#msg").val("");

    $("#saveButton").attr("href", "").button();
});

$("#msg").keyup(function() {
    var a = [Date.now(), $("#msg").val()];
    keyStrokes.push(a);

    if (!firstKeyStroke && !trainingMode) {
        firstKeyStroke = true;
        stopThinkTime = Date.now();
        totalThinkTime = stopThinkTime - startThinkTime;
        //console.log(totalThinkTime/1000);
    }
});

$("#msg").focus(function() {
    if (!timingOn && !trainingMode) {
        startInputTime = Date.now();
        timingOn = true;
    }

    //stopThinkTime = Date.now();
    //totalThinkTime = stopThinkTime - startThinkTime;
    //console.log(totalThinkTime/1000);
});

$(document).on("pageshow", function () {

    if ($('.ui-page-active').attr('id') === "experiment") {
        if (!trainingMode) {
            startThinkTime = Date.now();
        }
    }
});

$(document).ready(function() {

    //Pre-load phrases when app first loads
    if (!phrasesLoaded) {
        loadPhrases("./Analysis/transcription/setC.txt", "setC");
        loadPhrases("./Analysis/transcription/setD.txt", "setD"); 

        for (i = 1; i < NUM_OF_PARTICIPANTS + 1; i++) {
            loadPhrases("./Analysis/transcription/" + i + "-keyboard.txt", i+"Keyboard");
            loadPhrases("./Analysis/transcription/" + i + "-speech.txt", i+"Speech");

        } 
    }

    //Pre-load images 
    if (!imagesLoaded) {
        for (var i = 0; i < NUM_OF_TRIALS; i++) {
            imgs = imgPairs[i].split(",");
            preloadImages(["images/" + imgs[0],
                "images/" + imgs[1],
                "images/" + imgs[2]]);

            preloadImages(["images_alt/" + imgs[0],
                "images_alt/" + imgs[1],
                "images_alt/" + imgs[2]]);
        }
        imagesLoaded = true;
    }
});


function shuffle(a) {
    console.log("shuffling");
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

function loadPhrases(fname, objProp) {
    $.get( fname, function( data ) {
        phraseArray = data.split("\n"); 
        newArray = [];
        for(var i = 0; i < phraseArray.length; i++) {
            if (phraseArray[i].length > 0) {
                //console.log(phraseArray[i].split(";")[1])
                newArray.push(phraseArray[i]);
            }
        }
        phraseObj[objProp] = newArray;
        // process the content...
    });
}