var tracks;
var currentTrack = 0
var soundCloud;


$(document).ready(function(){
  SC.initialize({
    client_id: 'ebe2d1362a92fc057ac484fcfb265049'
});

SC.get("/tracks").then(function(response) {
  tracks = response;
  }).then(function(){
  playSong();
  $("#start").click(startPlay);
  $("#pause").click(stopPlay);[currentTrack]
  $("#next").click(playNext)[currentTrack]
  $("#down").click(volumeDown);
  $("#up").click(volumeUp);
  $("#search").click(songSearch);
  $("#searchbyId").click(playById);
}).then(function(){
  songSearch();
})
});

function playSong() {
  
  SC.stream( "/tracks/"+ tracks[currentTrack].id ).then(function(player){
  soundCloud = player;

	player.play();
  player.on("finish",function(){
  currentTrack ++;
  });
  });
}


function songSearch() {

  var inputValue = $('#input').val();
  SC.get('/tracks/',{q:inputValue}
).then(function(response){
  SC.stream( "/tracks/"+ response[currentTrack].id ).then(function(player){
    $("#name").html(response[currentTrack].title);
    player.play();
    player.on("finish",function(){
  })
  })
})
}

function playNext() {

  currentTrack = currentTrack + 1
  SC.stream( "/tracks/"+ tracks[currentTrack].id).then(function(player){
  soundCloud = player;
  $("#name").html(tracks[currentTrack].title);
  player.play();
  });
}

function playById(){
   var id = $('#byId').val();
   SC.stream('/tracks/' + id
 ).then(function(player) {
    player.play()
  })
}


function stopPlay() {
  soundCloud.pause();
}

function startPlay() {
  soundCloud.play();
}
function volumeDown() {
  soundCloud.setVolume( Math.max(0,soundCloud.getVolume() - 0.1) );
}

function volumeUp() {
  soundCloud.setVolume( Math.max(0,soundCloud.getVolume() + 0.1) );
}
