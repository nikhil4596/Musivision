/**
 * Created by nikhil on 11/27/2016.
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