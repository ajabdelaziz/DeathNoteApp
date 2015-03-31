var net = require('net');
var fs = require('fs'); 
var jsonData = fs.readFileSync('./dataNote.json', "utf8");
var parseArray = JSON.parse(jsonData);
var server = net.createServer(); 
var backToJson = JSON.stringify(parseArray);
var writeFile = fs.writeFileSync("./dataNote.json", backToJson);

function searchUser(userKey, myArray){
      for (var i=0; i < myArray.length; i++){
        if (myArray[i].user === userKey){
            return backToString(myArray[i].user);
        }else{
          console.log("You have no foes")
        }
    } 
  }   

function backToString(userValue){
  var userAsString = " "
  for(var key in userValue){
    userAsString += key + ": " + userValue[key] + "\n"
  }
  return userAsString
}

server.on('connection', function(client){ 
  console.log('client connected');
  client.setEncoding('utf8');

  client.on('data', function(stringFromClient){
    var input = stringFromClient.trim();
    var splitInput = input.split(" ");
    var userInput = splitInput[0];
    var command = splitInput[1];
    var nameInput = splitInput[2];
    var howInput = splitInput[3];

    client.write(splitInput + "\n");
    
    if(command === "write"){
    var newNoto = {
                 user: userInput,
                 name: nameInput,
                 how: howInput, 
                  };  
    parseArray.push(newNoto);
    backToJson;
    writeFile;

    client.write("Name Logged..." + "\n"); 

    }else if(command === "read" && userInput === "user1"){
    client.write(searchUser("user1", parseArray));
  }else if(command === "read" && userInput === "user2"){
    client.write(searchUser("user2", parseArray)) ;
    }else if(command === "read" && userInput === "user3"){
    client.write(searchUser("user3", parseArray));
  }
 });
});   

server.listen(8124, function() { //'listening' listener
  console.log("Note your foes carefuly...");
});
