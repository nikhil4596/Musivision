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

function ProcessResult(response)
{
    var data = response[0].scores;
    var arr = [];
    for (var emo in data) {
        arr.push([emo, data[emo]]);
    }
    console.log(arr);

    arr.sort(function (a,b) {
        return b[1] - a[1]
    });
    var datarr = [arr[0], arr[1], arr[2]];
    console.log(datarr);
    document.getElementById("main").innerHTML = "<h1>Okay! I know how you feel now! </h1> <br><br>" +
        "";
}

