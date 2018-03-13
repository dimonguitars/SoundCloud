$(document).ready(function() {

var trackUrl;
var streamUrl;
var songId;
var songTitle;
var songArtist;
var songArtwork;
var stream;
var track =[]


class scJukebox {


  constructor(){
    SC.initialize({client_id: 'ebe2d1362a92fc057ac484fcfb265049'});
    }

  submit() {
      var query = $('#search').val();
    SC.get('/tracks/', {
      q: query,
    }).then(function(result) {
        track.push(result[1])
        songId = result[1].id;
        songTitle = result[1].title;
        songArtist = result[1].user.username;
        songArtwork = result[1].artwork_url;
        streamUrl = result[1].stream_url;
        $('#artist').html("<a href='https://soundcloud.com/ "+ result[1].user.permalink +"'target='_blank'>" +  result[1].user.username + '</a>');
        $('#song').html(songTitle);
        $('#artwork').attr("src", songArtwork);
        $("#url").html("<a href='https://soundcloud.com/ " + result[1].permalink + "'target='_blank'>" +  result[1].title + '</a>');
      });

    }

    streamById() {
        var idsearch = $('#searchbyID').val();
        SC.get('/tracks/' + idsearch).then(function(result) {
          track.push(result)
          songId = result.id;
          songTitle = result.title;
          songArtist = result.user.username;
          songArtwork = result.artwork_url;
          streamUrl = result.stream_url;
          $('#artist').html("<a href='https://soundcloud.com/ "+ result.user.permalink +"'target='_blank'>" +  songArtist + '</a>');
          $('#song').html(songTitle);
          $('#artwork').attr("src", songArtwork);
          $("#url").html("<a href='https://soundcloud.com/ "+ songTitle.permalink + "'target='_blank'>" +  songTitle + '</a>');
        });
      }



    play(){
      console.log(track)
        SC.stream('/tracks/' + songId).then(function(player){
          stream = player;
          stream.play();
      });
    
  
  }

  pause(){
    if(stream){
      stream.pause();
    }
  }

  stop(){
    if(stream){
      stream.pause();
      stream.seek(0);
    }
  }

  }//end SCjukebox class


        function init() {
          var jukebox = new scJukebox();

          document.getElementById('submit').addEventListener('click', function() {
            jukebox.submit()

          });

          document.getElementById('searchid').addEventListener('click', function() {
            jukebox.streamById()

          });
          document.getElementById('play').addEventListener('click', function() {
            jukebox.play()
            console.log(track)
          });
          document.getElementById('pause').addEventListener('click', function() {
            jukebox.pause()
          });
          document.getElementById('stop').addEventListener('click', function() {
            jukebox.stop()
          });
        }
        init();

      });
