var request = $.ajax({ 
url: "http://idealliance.ru/port.php", 
method: "GET", 
data: { table : "boots", 
key : "rtt", 
gen : "json", 

}, 
dataType: "json" 
}); 

request.done(function( msg ) { 
$("body").append(msg); 
console.log(msg); 

}); 

request.fail(function( jqXHR, textStatus ) { 
alert( "Request failed: " + textStatus ); 
});