let db;
//creates a database request for a budget
const request = indexedDB.open("budget",2);

request.onupgradeneeded = function (event){
  console.log("hi")
    //create an obj to store called "pending" and set autoincrement to true
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true});
};

request.onsuccess = function(event){

    db = event.target.result;

    //check if the app is online first
    if (navigator.online){
        checkDatabase();
    }
};

request.onerror = function(event){

    console.log("WoW this is not good" + event.target.errorCode);
};

function saveRecord(record) {

    const transaction = db.transaction(["pending"], "readwrite")

    const store = transaction.objectStore("pending");

    store.add(record);
};


function checkDatabase(){

    const transaction = db.transaction(["pending"], "readwrite")

    const store = transaction.objectStore("pending");

    const getAll = store.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
          fetch("/api/transaction/bulk", {
            method: "POST",
            body: JSON.stringify(getAll.result),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
          })
          .then(response => response.json())
          .then(() => {
            // opens a transaction on your pending db
            const transaction = db.transaction(["pending"], "readwrite");
    
            // access your pending object store
            const store = transaction.objectStore("pending");
    
            // clear all items in your store
            store.clear();
          });
        }
      };
};







window.addEventListener("online", checkDatabase);