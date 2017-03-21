var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

function twitchtv() {
  $.ajax({
    "type": 'GET',
    "url": "https://wind-bow.glitch.me/twitch-api/streams/freecodecamp",
    "success": function(data1) {
      if (data1.stream == null) {
        $("#freeCodeCampStatus").html("FreeCodeCamp is Offline.");
      } else {
        $("#freeCodeCampStatus").html("FreeCodeCamp is Online.");
      }
    }
  });

  function prnt(logo, name, urls, status, game) {
    $("#follower").append("<div class='row " + status + "'>" +
      "<div class='col-md-4'>" + "<img src='" + logo + "'>" + "</div>" +
      "<div class='col-md-4'>" + "<a href='" + urls + "' target='_blank'>" + name + "</a></div>" +
      "<div class='col-md-4'>" + game + "</div>" + "</div>");
  }

  users.forEach(function(user) {
    function getUrl(urltyp, username) {
      return "https://wind-bow.glitch.me/twitch-api/" + urltyp + "/" + username;
    };

    $.getJSON(getUrl("streams", user), function(data) {
      var status;
      if (data.stream == null || data.stream == undefined) {
        status = "offline";
      } else status = "online";

      $.getJSON(getUrl("channels", user), function(data2) {
        var name, logo, urls, game;
        if (data2.error) {
          name = user;
          game = "Account Closed"
          logo = "http://www.freeiconspng.com/uploads/error-icon-4.png";
          urls = "https://www.twitch.tv/" + user;
        } else {
          logo = data2.logo;
          if (logo == null) {
            logo = "http://www.freeiconspng.com/uploads/error-icon-4.png";
          }
          name = data2.display_name;
          urls = data2.url;
          game = data2.game;
        }

        prnt(logo, name, urls, status, game);

      });

    });
  });
}
$(document).ready(function() {
 twitchtv();
 $("#all").click(function(){
   $(".online").show();
   $(".offline").show();
 });
  $("#online").click(function(){
   $(".online").show();
   $(".offline").hide();
 });
    $("#offline").click(function(){
   $(".online").hide();
   $(".offline").show();
 });
});
