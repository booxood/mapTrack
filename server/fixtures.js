function randomMove(){
  return Math.random()*2 - 1;
}

var LNG = 116.404;
var LAT = 39.915;
  
Meteor.setInterval(function(){
  if(Tracks.find().count() > 10){
    console.log('==== Tracks.remove ');
    Tracks.remove({});
  }else{
    Tracks.insert({user: 'hello', lng: LNG += randomMove(), lat: LAT += randomMove()});
  }
}, 2000);