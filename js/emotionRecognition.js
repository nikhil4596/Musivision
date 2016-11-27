/**
 * Created by nikhil on 11/27/2016.
 */


//apiKey: Replace this with your own Project Oxford Emotion API key, please do not use my key. I include it here so you can get up and running quickly but you can get your own key for free at https://www.projectoxford.ai/emotion
var apiKey = "69a5530db1b14159ac3aef6dd53e43af";

var fd = new FormData(document.forms[0]);
var file = new File([imageBlob], "image.jpg", {type: "image/jpeg", webkitRelativePath: "/image.jpg"});
fd.append("canvasImage", file);
// fd.append('username', 'Chris');

//apiUrl: The base URL for the API. Find out what this is for other APIs via the API documentation
var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";


function tryShit() {
    console.log(imageBlob);

    console.log(file);
    saveAs(imageBlob,"Image.jpg");
}
$('#btn').click(function () {
    //file: The file that will be sent to the api
    var file2 = document.getElementById('filename').files[0];
    var file1 = fd.get('canvasImage');
    console.log(file2);
    console.log(file1);
    CallAPI(file1, apiUrl, apiKey);
});

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
        processData: false
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
    var data = JSON.stringify(response);
    $("#response").text(data);
}
