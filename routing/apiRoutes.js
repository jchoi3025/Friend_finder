const friendsData = require("../data/friends");
   function compareUsers(arr1, arr2){
     let sumOfDifferences = 0;
     for (let index = 0; index < arr1.length; index++) {
       const arr1Num = arr1[index];
       const arr2Num = arr2[index];
       const difference = Math.abs(arr2Num - arr1Num);
       sumOfDifferences += difference;
     } 
     console.log(sumOfDifferences);
    return sumOfDifferences; 
   }
   
   module.exports = function(app){
     app.get("/api/friends", function(req, res) {
       res.json(friendsData);
       
     });
   
     app.post("/api/friends", function(req, res) {
        console.log(req.body);
        const user1 = req.body.scores;
        // friendsData is holding on to our friend's data in an array of objects
        let smallestDifference = null;
        let bestFriend = null;
        for (const friend of friendsData) {
            let user2 = friend.scores;
            if (smallestDifference === null) {
                smallestDifference = compareUsers(user1, user2);
                bestFriend = {...friend};
            }
            else {
                let difference = compareUsers(user1, user2);
                if (difference < smallestDifference) {
                    smallestDifference = difference;
                    bestFriend = {...friend};
                }
            }
        }
        console.log(bestFriend);
        console.log(smallestDifference);
        res.json(bestFriend);
     });
   }
