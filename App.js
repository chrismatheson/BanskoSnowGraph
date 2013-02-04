var scraper = require("scraper"),
    Parse = require("parse-api").Parse;
    
var db = new Parse("YGVEqwNJuHn8ujqO6Wzg1fm8WQARJzAs0ASxMri1","cXn3RHJpm2DeTPfTcGI2tYQKwI83bsPmJHHLerU2");

function parseResponse (err, data) {
  if (err) {
    console.warn(err); 
  }
}

setInterval(function(){
  scraper("http://www.banskoski.com/en/", function(err, $) {
    if (err) {console.log(err);}
  
    var rows = $('.meteo-details-tbl').find('tr:gt(0)');
    
    for (var i = 0; i < rows.length; i++) {
      var result = {};
      result.area = $(rows[i]).children('td:eq(0)').html();
      result.temp = parseFloat($(rows[i]).children('td:eq(1)').html());
      result.windSpeed = parseFloat($(rows[i]).children('td:eq(2)').html());
      result.snowDepth = parseFloat($(rows[i]).children('td:eq(3)').html());
      
      console.log(result.area +" : "+JSON.stringify(result));
      db.insert('res', result, parseResponse);
    }
  }); 
}, 3600000);

