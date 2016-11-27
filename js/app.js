/**
 * Created by nikhil on 11/26/2016.
 */

var genres = {

    Pop : "132",
    Rap : '116',
    HipHop : '116',
    Rock : '152',
    Dance : '113',
    RnB : '165',
    Alternative : '85',
    Electro : '106',
    Folk : '466',
    Reggae : '114',
    Jazz : '129',
    Country: '84',
    Classical: '98',
    FilmsnGames: '173',
    Metal: '464',
    SoulnFunk: '169',
    African: '2',
    Asian: '16',
    Blues: '153',
    Brazilian: '75',
    Indian: '81',
    Kids: '95',
    Latin: '197'

};
var idArr;
var genreFinal = [];
function tracksIdArr(arr) {
    idArr = [];
    for (var i = 0; i < arr.length; i++) {
        idArr[i] = arr[i].id;
    }
    console.log(idArr);
    load(idArr);


}


function loadSongs(id) {
    var songsArr = [];
    DZ.api("/radio/" + id + "/tracks", function (response) {
        songsArr = response.data;
        tracksIdArr(songsArr);
        // console.log(songsArr)
        });
    // load(idArr);
}

function load(id) {
    var ids = id;
    // alert(id);
    DZ.player.playTracks(ids);
}

function getGenreRadioId(str) {
    var radioId;
    // var query1 = document.getElementById(str).value;
    var genreId = genres[str];
    // alert(genreId);
    radioId = "";
    // DZ.api('/track/62724017', function(response){
    DZ.api("/genre/" + genreId + "/radios", function (response) {
        radioId = response.data[0].id;
        // alert(songId);
        console.log("The response is ", response.data[0].id);
        // console.log("The response is ", response.data[0].title);
        loadSongs(radioId);

    });
}

function getGenreRadioIdFromSearch(str) {
    var radioId;
    var query1 = document.getElementById(str).value;
    var genreId = genres[query1];
    // alert(genreId);
    radioId = "";
    // DZ.api('/track/62724017', function(response){
    DZ.api("/genre/" + genreId + "/radios", function(response){
        radioId = response.data[0].id;
        // alert(songId);
        console.log("The response is ", response.data[0].id);
        // console.log("The response is ", response.data[0].title);
        loadSongs(radioId);

    });
    // alert(radioId);
}
// function getSongID(id) {
//     var query = document.getElementById(id).value;
//     // alert(idx);
//     var songId = "12";
//     // DZ.api('/track/62724017', function(response){
//     DZ.api("/search/track?q='" + query + "'&index=0&limit=1", function(response){
//         songId = response.data[0].id;
//         // alert(songId);
//         console.log("Title of the song is ", response.data[0].title);
//         load(songId);
//
//     });
// }

function play() {
    DZ.player.play();
}

function playOne() {
    DZ.player.playTracks([134950958]);
}
DZ.init({
    appId  : '215784',
    channelUrl : 'http://localhost:8000',
    player : {
        container: 'player',
        width : 800,
        height : 200,
        format : 'classic',
        size : 'small',
        autoplay : 'false',
        playlist : true,
        shuffle : true,
        onload : function(){
            // playOne();
        }
    }
});

window.onload = getGenreRadioId(genreFinal[0]);

