var tracks;
var currentTrack = 0
var soundCloud;
var songs = [];

$(document).ready(function(){
  SC.initialize({
    client_id: 'ebe2d1362a92fc057ac484fcfb265049'
});

SC.get("/tracks").then(function(response) {
  tracks = response;

  }).then(function(){
  songSearch();
  $("#start").click(startPlay);
  $("#pause").click(stopPlay);
  $("#next").click(playNext);
  $("#down").click(volumeDown);
  $("#up").click(volumeUp);
  $("#search").click(songSearch);
  $("#searchbyId").click(playById);
});
});


function songSearch (){

$('#search').on('click', function(){
 var inputValue = $('#input').val();
 SC.get('/tracks/',{q:inputValue}
 ).then(function(response) {
 for (var i=0; i <response.length; i++){
 songs.push(response[i])
 console.log(songs)
      }
    })
      playSearchSong();
  })
}

function playSearchSong(){

  SC.stream( "/tracks/"+ songs[currentTrack].id).then(function(player){
  $("#name").html(songs[currentTrack].title);
    soundCloud = player;
  player.play();
  player.on("finish",function(){
  currentTrack ++;
    });
  });
}

function playNext() {
  var nextsong = currentTrack ++
  SC.stream( "/tracks/"+ songs[nextsong].id ).then(function(player){
  soundCloud = player;
  $("#name").html(songs[nextsong].title);
  player.play();
});
}

function playById(){
  $('#searchbyId').on('click', function(){
   var id = $('#byId').val();
   var reg = /^\d+$/;
   if(id != reg){
      console.log(id)
     alert('Id should be a number  (293, 295, and so on..)')
   }else{
     SC.stream('/tracks/' + id
   ).then(function(player) {
      player.play()
    })
   }
 })
}


function stopPlay() {
  soundCloud.pause();
}

function startPlay() {
  soundCloud.play();var currentTrack = 0
}
function volumeDown() {
  soundCloud.setVolume( Math.max(0,soundCloud.getVolume() - 0.1) );
}

function volumeUp() {
  soundCloud.setVolume( Math.max(0,soundCloud.getVolume() + 0.1) );
}
