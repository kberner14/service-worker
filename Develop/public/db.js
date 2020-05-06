
// TODO: open  indexedDB
const indexedDB =
window.indexedDB ||
window.mozIndexedDB ||
window.webkitIndexedDB ||
window.msIndexedDB ||
window.shimIndexedDB;

let db;
const request = window.indexedDB.open("budget", 1);

// TODO: create an object store in the open db
request.onupgradeneeded = function(event) {
  // create object store called "pending" and set autoIncrement to true
  const db = event.target.result;
  db.createObjectStore("pending", { keyPath: "id", autoIncrement: true });
};
request.onsuccess = function({ target }) {
  db = target.result;
  
  if (navigator.onLine) {
    checkDatabase();
  }
};

// TODO: log any indexedDB errors
request.onerror = function(event) {
  console.log(event.error);
};

  
  // TODO: add code so that any transactions stored in the db
  // are sent to the backend if/when the user goes online
  // Hint: learn about "navigator.onLine" and the "online" window event.
  
  // TODO: add code to saveRecord so that it accepts a record object for a
  // transaction and saves it in the db. This function is called in index.js
  // when the user creates a transaction while offline.
  function saveRecord(record) {
    // add your code here
    const tx = db.transaction(["pending"], "readwrite");
    const pendingStore = tx.objectStore("pending");
    pendingStore.add(record);
}
