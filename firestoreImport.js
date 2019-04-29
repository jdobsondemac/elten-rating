
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

import firebaseConfig from './firebase.config'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId
  });
  
var db = firebase.firestore();
var added = 0;
var failed = 0;

let ratings = [
  {
    "date": "8/28/2017",
    "rating": 7
  },
  {
    "date": "09/05/2017",
    "rating": 6
  },
  {
    "date": "09/11/2017",
    "rating": 7
  },
  {
    "date": "09/18/2017",
    "rating": 7
  },
  {
    "date": "09/25/2017",
    "rating": 6.5
  },
  {
    "date": "10/02/2017",
    "rating": 8
  },
  {
    "date": "10/16/2017",
    "rating": 8
  },
  {
    "date": "10/23/2017",
    "rating": 7
  },
  {
    "date": "10/31/2017",
    "rating": 8
  },
  {
    "date": "11/06/2017",
    "rating": 7.5
  },
  {
    "date": "11/13/2017",
    "rating": 7
  },
  {
    "date": "11/20/2017",
    "rating": 8
  },
  {
    "date": "11/27/2017",
    "rating": 8
  },
  {
    "date": "12/4/2017",
    "rating": 8
  },
  {
    "date": "12/11/2017",
    "rating": 8
  },
  {
    "date": "12/18/2017",
    "rating": 8
  },
  {
    "date": "01/08/2018",
    "rating": 8
  },
  {
    "date": "1/15/2018",
    "rating": 8.5
  },
  {
    "date": "1/22/2018",
    "rating": 6
  },
  {
    "date": "1/28/2018",
    "rating": 8
  },
  {
    "date": "2/5/2018",
    "rating": 6
  },
  {
    "date": "2/12/2018",
    "rating": 8
  },
  {
    "date": "2/26/2018",
    "rating": 8
  },
  {
    "date": "3/5/2018",
    "rating": 8
  },
  {
    "date": "3/12/2018",
    "rating": 8
  },
  {
    "date": "3/19/2018",
    "rating": 8
  },
  {
    "date": "3/26/2018",
    "rating": 7
  },
  {
    "date": "4/2/2018",
    "rating": 8
  },
  {
    "date": "4/9/2018",
    "rating": 8
  },
  {
    "date": "4/17/2018",
    "rating": 8.5
  },
  {
    "date": "4/30/2018",
    "rating": 6
  },
  {
    "date": "5/7/2018",
    "rating": 9
  },
  {
    "date": "5/14/2018",
    "rating": 8
  },
  {
    "date": "5/28/2018",
    "rating": 8
  },
  {
    "date": "6/4/2018",
    "rating": 9
  },
  {
    "date": "6/11/2018",
    "rating": 9
  },
  {
    "date": "6/18/2018",
    "rating": 9
  },
  {
    "date": "6/25/2018",
    "rating": 9
  },
  {
    "date": "7/9/2018",
    "rating": 10
  },
  {
    "date": "7/16/2018",
    "rating": 8
  },
  {
    "date": "7/23/2018",
    "rating": 8
  },
  {
    "date": "7/30/2018",
    "rating": 10
  },
  {
    "date": "8/13/2018",
    "rating": 10
  },
  {
    "date": "8/20/2018",
    "rating": 8
  },
  {
    "date": "8/27/2018",
    "rating": 9.5
  },
  {
    "date": "9/10/2018",
    "rating": 10
  },
  {
    "date": "9/17/2018",
    "rating": 10
  },
  {
    "date": "9/24/2018",
    "rating": 9.5
  },
  {
    "date": "10/15/2018",
    "rating": 9.5
  },
  {
    "date": "10/29/2018",
    "rating": 9.5
  },
  {
    "date": "11/05/2018",
    "rating": 9
  },
  {
    "date": "11/12/2018",
    "rating": 9
  },
  {
    "date": "11/19/2018",
    "rating": 10
  },
  {
    "date": "11/26/2018",
    "rating": 10
  },
  {
    "date": "12/03/2018",
    "rating": 9
  },
  {
    "date": "12/10/2018",
    "rating": 10
  },
  {
    "date": "12/17/2018",
    "rating": 10
  }
 ]

ratings.forEach(function(obj) {
    let date = new Date(obj.date);
    db.collection("teams").doc("backend").update({
        ratings: firebase.firestore.FieldValue.arrayUnion({date: date, rating: obj.rating.toFixed(1).toString()})
    }).then(function(docRef) {
        added++;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});

console.log("Added " + added + " ratings.")
console.log(failed + " ratings failed to add.")
