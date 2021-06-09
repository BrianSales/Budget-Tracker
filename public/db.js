let db;
//creates a database request for a budget
const request = indexDB.open("budget",1);

request.upgradeneeded = function (event){
    //create an obj to store called "pending" and set autoincrement to true
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true});
};










window.addEventListener("online", checkDatabase);