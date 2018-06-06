
var admin = require("firebase-admin");

var serviceAccount = require("./beneficiosum-firebase-adminsdk-i8i1o-5593eb937f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://beneficiosum.firebaseio.com"
});

var registrationToken = "c-RHhevqzGk:APA91bHCNdvnoAKY-UceA6_H-7RP33tO9gXuJVB4PUpI_Bstyi8JxAvcXgYXvEbk9HkdDoEt4NxpXu9GNYi9hDvIgLIyMidpJG8cuZN6-QXPThWuWny9gq5J-z3MrlKsbGlWUjkcpHig";

var payload = {
    data: {
        MyKey1: "Hello"
    }
};

var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

admin.messaging().sendToDevice(registrationToken,payload,options)
    .then(function(response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
        console.log("Error sending message: ",error);
    });