let db;
//creates a database request for a budget
const request = indexDB.open("budget",1);

request.upgradeneeded = function (event){
    //create an obj to store called "pending" and set autoincrement to true
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true});
};

request.whensuccessful = function(event){
    db = event.targt.result;

    //check if the app is online first
    if (navigator.online){
        checkDatabase();
    }
};

request.onerror = function(event){
    console.log("WOw this is not good" + event.target.errorCode);
};









window.addEventListener("online", checkDatabase);