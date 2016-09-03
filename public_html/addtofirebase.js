/* global snapshot, x, google */
var arrayI = [];

function initMap() {
    // Enabling new cartography and themes
    google.maps.visualRefresh = true;

    // Setting starting options
    var mapOptions = {
        center: new google.maps.LatLng(39.9078, 32.8252),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Getting Map DOM Element
    var mapElement = document.getElementById('gisMap');

    // Creating a map with DOM element
    map = new google.maps.Map(mapElement, mapOptions);
}


function getLocation(address, callback)
{
    src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false";
    var geocoder = new google.maps.Geocoder();
    var latitude;
    var longitude;
    
    
    geocoder.geocode( { 'address': address}, function(results, status)  {
              if (status == google.maps.GeocoderStatus.OK) {
                  latitude = results[0].geometry.location.lat();
                  longitude = results[0].geometry.location.lng();
                  arrayI.push(latitude);
                  arrayI.push(longitude);
                  } 
              else {
                latitude = 0;
                longitude = 0;
                }
              callback(results);
              });
          
}


function addNewAgency()
{
    var database = new Firebase('https://brilliant-fire-7361.firebaseio.com/');
    var usersRef = database.child("Agency");
    
    var agencyName = document.getElementById("demo-name").value;
    var areaInterest = document.getElementById("demo-category").value;
    var phoneNumber = document.getElementById("demo-phonenumber").value;
    var contact = document.getElementById("demo-contact").value;
    var numHours = parseFloat(document.getElementById("hours").value); //must be an integer
    var isMonday = document.getElementById("monday").checked; //must be boolean
    var isTuesday = document.getElementById("tuesday").checked;
    var isWednesday = document.getElementById("wednesday").checked;
    var isThursday = document.getElementById("thursday").checked;
    var isFriday = document.getElementById("friday").checked;
    var isSaturday = document.getElementById("saturday").checked;
    var isSunday = document.getElementById("sunday").checked;
    var address = document.getElementById("address-input").value;
   
    var website = document.getElementById("demo-url").value;
    var description = document.getElementById("demo-message").value;
    var coordinates = ""; //DO NOT EDIT COORDINATES -- IT IS AUTOCALCULATED
    
    if(phoneNumber === ""){phoneNumber = "N/A";}
    if(contact === ""){contact = "N/A";}
    if(address === ""){address = "N/A";}
    if(website === ""){website = "N/A";}
    
    
    getLocation(address, function(results) {  
        
        var addAgency = true;
        
        coordinates = String(arrayI[0] + " " + arrayI[1]);
        
        usersRef.child(agencyName).update({
                "Coordinates": coordinates,
                "Agency Name": agencyName,
                "Area of Interest": areaInterest,
                "Phone Number": phoneNumber,
                "Contact": contact,
                "Number of Hours": numHours,
                "isMonday": isMonday,
                "isTuesday": isTuesday,
                "isWednesday": isWednesday,
                "isThursday": isThursday,
                "isFriday": isFriday,
                "isSaturday": isSaturday,
                "isSunday": isSunday,
                "Address": address,
                "Website": website,
                "Description" : description,
             
            }); 
        
        window.alert("Agency Added");
        var messagesRef = new Firebase("https://brilliant-fire-7361.firebaseio.com/Agency");
        messagesRef.once("value", function(allMessagesSnapshot) {
        allMessagesSnapshot.forEach(function(messageSnapshot) {
            var agencyCor = messageSnapshot.child("Coordinates").val();  
            //console.log(agencyCor);
        });
        });
        arrayI.splice(0,2);
        //console.log(addAgency);
   
});
}