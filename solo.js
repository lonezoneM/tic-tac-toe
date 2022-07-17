const turn = document.getElementById("turn");
const rules = [
		["0", "1", "2"],
		["3", "4", "5"],
		["6", "7", "8"],
		["0", "3", "6"],
		["1", "4", "7"],
		["2", "5", "8"],
		["3", "4", "5"],
		["0", "4", "8"],
		["2", "4", "6"],
	]
	
let board = [
	"", "", "",
	"", "", "",
	"", "", ""]
let player = "X";
//let player = prompt("Use 'O' as your sign? (yes/no)");
let alive = true;
let boxes=Array.from(document.getElementsByClassName("box"));

function setPlayer(t) {
    player=t;
    $("#choose").modal('toggle');
    ready()
}

function ready() {
    turn.innerHTML=player;
	   turn.setAttribute("class", `player${player}`);
	   AOS.init();
}

//ready();

function check() {
    for (i = 0; i < rules.length; i++){
		    var isWon = false;
		    let win = rules[i];
		    var a = board[win[0]];
		    var b = board[win[1]];
		    var c = board[win[2]];
		    if(a === b && b === c && a !== ""){
			        isWon = true;
			        break;
			    }
	    }

	    if(isWon) {
		      announce(a);
		      console.log(a);
		      alive = false;
	    }

     //last time no empty space
	    if(!board.includes("") && !isWon){
	      	announce("ll");
	    }
}



function announce(result) {
	if (result == "X") {
		
		document.getElementById("draft").innerHTML = "<span class='playerX'>Player X Won!</span>";
	} else if (result == "O") {
		document.getElementById("draft").innerHTML = "<span class='playerO'>Player O Won!</span>";
	} else {
		document.getElementById("draft").innerHTML = "<span class='text-warning'>Match TIE</span>";
	}
}
function change() {
    player= player==="X" ? "O" : "X";
    turn.innerHTML=player;
	   turn.setAttribute("class", `player${player}`);
}


function validation(id){
    if(board[id]!==""){
        return false;
    }
    return true;
}

function press(box) {
    var id=box.id;
    if(validation(box.id) && alive==true){
        boxes[id].innerHTML=player;
        board[id]=player;
        boxes[id].classList.add(`player${player}`);
        check();
        change()
    }
}



boxes.forEach((box) => {
	box.addEventListener('click', ()=> press(box))
});

function reset() {
    /*alive=true;
    board = [
	    "", "", "",
	    "", "", "",
	    "", "", ""]
    player = "X";
    
    for(i=0; i<9; i++){
        boxes[i]. innerHTML="";
        boxes[i].classList.remove("playerO");
        boxes[i].classList.remove("playerX");
    }
    
    document.getElementById("draft").innerHTML = "Player<span id='turn'>O</span> Turn!";
    
    ready();*/
    window.location.reload()
}
