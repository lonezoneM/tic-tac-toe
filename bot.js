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
	
var board2 = [
	0, 1, 2,
	3, 4, 5,
	6, 7, 8]

var mine=true;

let player=["X", "O"][Math.floor(Math.random()*2)];
let bot=player==="X" ? "O" : "X";

let time=Math.floor(Math.random()*2);

let alive = true;
let boxes=Array.from(document.getElementsByClassName("box"));


function ready() {
    if(time==0) {
        turn.innerHTML=bot;
        turn.setAttribute("class", `player${bot}`);
        mine=false;
        botTurn()
    }else {
        turn.innerHTML=player;
        turn.setAttribute("class", `player${player}`);
    }
    
	   AOS.init();
	   //console.log(time, "Player sign",player, "bot sign",bot)
}

ready()

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

function set(p, con) {
    if(con===1) {
       var pos=p;
       //console.log(22222,pos)
    }else {
        npos=board2[Math.floor(Math.random()*board2.length)];
        var pos=npos
        //console.log(npos)
    }
    
    boxes[pos].innerHTML=bot;
    board[pos]=bot;
    boxes[pos].classList.add(`player${bot}`)
    findE(pos);
    mine=true;
    turn.innerHTML=player;
    turn.setAttribute("class", `player${player}`);
}


function botTurn() {
  if(alive) {
    setTimeout(()=>{
        turn.innerHTML=bot;
	   turn.setAttribute("class", `player${bot}`);
	   for (i = 0; i < rules.length; i++){
		    var setted = false;
		    let win = rules[i];
		    var a = board[win[0]];
		    var b = board[win[1]];
		    var c = board[win[2]];
		    if(a === b && a !== "" && c===""){
			        set(win[2],1);
			        setted=true;
			        break;
			   }
			   else if(a === c && a !== "" && b===""){
			       set(win[1],1);
			       setted=true;
			       break;
			   }else if(b === c && b !== "" && a===""){
			       set(win[0],1);
			       setted=true;
			       break;
			    }
	    }
	    if(setted==false) {
	        set("",0)
	    }
	    check();
    }, 1000);
  }
}

function findE(id) {
    for(j=0; j<board2.length; j++){
        if(board2[j]==parseInt(id)){
            board2.splice(j,1)
            //console.log(board2)
            break;
        }
    }
}


function validation(id){
    if(board[id]!=="" || mine==false){
        return false;
    }
    return true;
}

function press(box) {
    var id=box.id;
    if(validation(box.id) && alive==true){
        boxes[id].innerHTML=player;
        board[id]=player;
        findE(id);
        boxes[id].classList.add(`player${player}`);
        mine=false;
        turn.innerHTML=bot;
        turn.setAttribute("class", `player${bot}`);
        check();
        botTurn();
    }
}



boxes.forEach((box) => {
	box.addEventListener('click', ()=> press(box))
});


function reset() {
    window.location.reload()
}
