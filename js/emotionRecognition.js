/**
 * Created by nikhil on 11/27/2016.
 */

var imageBlob;
function take_snapshot() {
    Webcam.snap( function(data_uri) {
        imageBlob = dataURItoBlob(data_uri);
    } );
    var file = new File([imageBlob], "image.jpg", {type: "image/jpeg"});
    CallAPI(file, apiUrl, apiKey);
}
var apiKey = "69a5530db1b14159ac3aef6dd53e43af";
var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";


// $('#btn').click(function () {
//     var file = new File([imageBlob], "image.jpg", {type: "image/jpeg"});
//     CallAPI(file, apiUrl, apiKey);
// });

function CallAPI(file, apiUrl, apiKey)
{
    $.ajax({
        url: apiUrl,
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
        },
        type: "POST",
        data: file,
        processData: false,

    })
        .done(function (response) {
            ProcessResult(response);
        })
        .fail(function (error) {
            $("#response").text(error.getAllResponseHeaders());
        });
}

function ProcessResult(response) {
    var data = response[0].scores;
    var arr = [];
    for (var emo in data) {
        arr.push([emo, data[emo]]);
    }
    console.log(arr);

    arr.sort(function (a, b) {
        return b[1] - a[1]
    });
    var datarr = [arr[0], arr[1], arr[2]];
    console.log(datarr);
    document.getElementById("main").innerHTML = "<h1>Okay! I know how you feel now! Some " + datarr[0][0] + "?" + "</h1> <br><br>" +
        "<h2>Now, Do you want to listen something to stay in this mood? Or do you no longer want to be in this mood?</h2>" +
        "<button class='btn-lg' style='float: left; text-decoration-color: #0c0d0e' id='stay'>Stay!</button> <button class='btn-lg' " +
        "style='float: right; text-decoration-color: #0c0d0e' id='noMore'>Not Anymore!</button>";
    $("#stay").click(whichGenre(datarr[0][0], true));
    $("#noMore").click(whichGenre(datarr[0][0], false));
}
// function theEnd() {
//     window.location = "http://localhost/musivision/play.html";
// }
function whichGenre(mood, option) {

    if (mood == 'anger' && option == true || mood == 'happiness' && option == false) {
        genreFinal = ['Rock'];
    }
    else if (mood == 'happiness' && option == true || mood == 'anger' && option == false) {
        genreFinal = ['Dance'];
    }
    else if (mood == 'neutral' && option == true || mood == 'sadness' && option == false) {
        genreFinal = ['Pop'];
    }
    else if (mood == 'surprise' && option == true || mood == 'contempt' && option == false) {
        genreFinal = ['Indian'];
    }
    else if (mood == 'contempt' && option == true || mood == 'fear' && option == false) {
        genreFinal = ['Classical'];
    }
    else {
        genreFinal = ['Rap'];
    }
    // document.getElementById("main").innerHTML ="<button class='btn-default' onclick='window.location=/'http://localhost/musivision/play.html/'>Prepare Some good tracks for you!</button>";
    // getGenreRadioId(genreFinal[0])
}

// window.onload = theEnd;


