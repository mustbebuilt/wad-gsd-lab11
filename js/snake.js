// get the context and declare other variables
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var boxD = 25;
var xBox = 0;
var yBox = 0;
var snakeCol;
var d = "right";
var increX = Math.ceil((Math.random()*10));
var increY = Math.ceil((Math.random()*10));
var snakeArray = []; //Empty array
var snakeLength = 5; //Length of the snake
var foodX, foodY;
var score = 0;
var myInterval; // for the set Interval

// start / restart set up

	var newFoodCoords = createFood();
	foodX = newFoodCoords.x;
	foodY = newFoodCoords.y;
	d = "right";
	if(myInterval){
		clearInterval(myInterval);	
	}
	myInterval = setInterval(moveSnake, 500)
	score = 0;
	document.getElementById('scoreBoard').innerHTML = score;	
	$('#msg').html("").hide();
	snakeCol = '#1E9FA0'
	snakeArray = []; 
	snakeLength = 5
	for(var i = snakeLength-1; i>=0; i--){
		snakeArray.push({x: i, y:0});
	}


// redraw snake and food with one function

function drawBoxes(x, y, col){
		// circles 
//		var r = boxD/2;
//		context.beginPath();
//		context.fillStyle = col;
//		context.arc((x*boxD)+r, (y*boxD)+r, r, 0, 2*Math.PI);
//		context.fill();
//		context.closePath();
		
		// squares
		context.fillStyle = col;
		context.fillRect(x*boxD, y*boxD, boxD, boxD);
		context.strokeStyle = "#ffffff";
		context.strokeRect(x*boxD, y*boxD, boxD, boxD);
}

function moveSnake(){
		// clear canvas to redraw
		context.clearRect(0,0,canvasWidth,canvasHeight);
		var cPos = snakeArray[0];
		var newX = cPos.x;
		var newY = cPos.y;
		if(d === "left"){
			newX--;
		}
		if(d === "right"){
			newX++;
		}
		if(d === "down"){
			newY++;
		}
		if(d === "up"){
			newY--;
		}
		
		var newLink = {};
		
		if(newX == foodX && newY == foodY){
			score++;
			document.getElementById('scoreBoard').innerHTML = score;	
			// Create new food
			newLink = {x:foodX, y:foodY};
			snakeLength++;
			var newFoodCoords = createFood();
			foodX = newFoodCoords.x;
			foodY = newFoodCoords.y;
		}else{
			snakeArray.pop();
			newLink = {x:newX, y:newY};
		}
	
		//check if off the canvas or snake hits itself
		if(checkCollision(newX, newY, snakeArray) || newX*boxD >= canvasWidth || newY*boxD >= canvasHeight || newY*boxD < 0  || newX*boxD < 0){
			clearInterval(myInterval);
			snakeCol = "#D83E3E";
			// ajax to database
		}
		
		// add new x/y box to the array
		snakeArray.unshift(newLink);
		
		// loop the array to redraw
		for(var i = 0; i<snakeLength; i++){
			var c = snakeArray[i];
			drawBoxes(c.x, c.y, snakeCol);
		}
		// redraw the food
		drawBoxes(foodX, foodY, '#0E6A36');
}


// check to see if snake has hit itself
function checkCollision(x, y, array){
		for(var i = 0; i < array.length; i++){
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
}

// recursive function to check if x/y food is free
function createFood(){
	tempFoodX = Math.ceil(Math.random()*(canvasWidth/boxD)-1);
	tempFoodY = Math.ceil(Math.random()*(canvasHeight/boxD)-1);
	for (var i = 0; i < snakeArray.length; i++) {
		   var c = snakeArray[i];
           if (c.x == tempFoodX && c.y == tempFoodY) {
    			return createFood();
		   }
  	}
	result = {x:tempFoodX, y:tempFoodY}
	return result;
		
}

// keyboard events
document.addEventListener("keydown", function(ev){
		var pickedKey = ev.which;
		if(pickedKey == "37" && d != "right"){
			d = "left";
		}else if(pickedKey == "38" && d != "down"){
			d = "up";
		}else if(pickedKey == "39" && d != "left"){
			d = "right";
		}else if(pickedKey == "40" && d != "up"){
			d = "down";
		}
})

///////////////// game managment ///////////////