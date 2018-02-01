var tracks;
var currentTrack = 0;
var soundCloud;
var player;


$(document).ready(function(){
  SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'

});


SC.get('/tracks').then(function(response){

   tracks = response;

$("#name").append(tracks[currentTrack].title);
}).then(function(){
  playSong();
   $("#start").click(startPlay);
   $("#search").click(Foo);

   $("#pause").click(stopPlay);

   $("#next").click(playNext);

   $("#shuffle").click(shuffle);
   $("#down").click(volumeDown);

   $("#up").click(volumeUp);



});
});
//
// function Foo (){
  SC.get("/tracks", {q: 'pantera'}).then(function(player) {
    player.play()
    $( "#artist" ).change(function(event){
         name = this.value
    });

    // tracks = response;
    // $("#name").append(tracks[currentTrack].title);

    })
// }


function playSong() {

  SC.stream( "/tracks/"+ tracks[currentTrack].id ).then(function(player){
      player.play();
    soundCloud = player;
console.log(soundCloud)


      player.on("finish",function(){

  currentTrack ++;

      });
  });
  // SC.stre( "/tracks" + tracks[currentTrack].title).then(function(player){
  //   console.log(tracks)
  //   var soundCloud = player;
	// player.play()
  //
  //
  // 	player.on("finish",function(){
  //
  //   currentTrack ++;
  //
  //   });
  // });
}

function stopPlay() {
  soundCloud.pause();
  console.log('pause')
}

function startPlay() {
  console.log('play')
  player.play();
}
function volumeDown() {
  soundCloud.setVolume( Math.max(0,soundCloud.getVolume() - 0.1) );
}

function volumeUp() {
  soundCloud.setVolume( Math.max(0,soundCloud.getVolume() + 0.1) );
}

function playNext() {

  if(tracks.indexOf(currentTrack) < tracks.length) {

  soundCloud.pause();

  currentTrack = currentTrack+1;

  SC.stream( "/tracks/"+ tracks[currentTrack].id ).then(function(player){

  soundCloud = player;

  $("#name").html(tracks[currentTrack].title);

  player.play();

});
}
}

function shuffle() {

random = (Math.floor((Math.random() * tracks.length) + 1) -1);

var rsong = tracks[random];

soundCloud.pause();

SC.stream( "/tracks/"+ rsong.id ).then(function(player){

soundCloud = player;

player.play();

$("#name").html(tracks[currentTrack].title);

});
}
