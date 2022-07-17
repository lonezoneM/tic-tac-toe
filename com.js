function ready(){
	// Listening for Notification
	firebase.database().ref("modes").on('child_added', (snapshot)=>{
		let notify=snapshot;
		if(notify.key=="play") {
			setAll(notify.val());
		}else{
			return false;
		}
	});
	
}
ready();

function setAll(token) {
const turn = document.getElementById("turn");
const round = document.getElementById("rnd");
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
let player = "";
let sign="";
let rec={}
let alive = true;
let boxes=Array.from(document.getElementsByClassName("box"));

const root=firebase.database().ref("Tahmid@2114");
const game=firebase.database().ref("Tahmid@2114/Game");
const classObj1=firebase.database().ref("Tahmid@2114/Class1");
const classObj2=firebase.database().ref("Tahmid@2114/Class2");

root.on('value', (snapshot)=>{
	player1.innerHTML=snapshot.val().playerX;
	player2.innerHTML=snapshot.val().playerY;
	player=snapshot.val().player;//under #
	roundNum=snapshot.val().round;//under #
	// localStorage()
	turn.innerHTML=player;
	round.innerHTML=roundNum;
	turn.setAttribute("class", `player${player}`);
	AOS.init();

	if (roundNum>=4) {
		final()
	}
})

setTimeout(() => {
	//localstorage and round%2!=0
	admin=player1.innerHTML
	opp=player2.innerHTML
	if(localStorage.getItem("admin")){
		if(roundNum%2==0) {
			console.log(roundNum)
			sign = player;
		}else {
			sign = player === "X" ? "O" : "X";
		}
		// set={}; set[admin]=sign
		// game.update(set)
	}else{
		if(roundNum%2!==0) {
			console.log(roundNum)
			sign = player;
		}else{
			sign = player === "X" ? "O" : "X";
		}
		// set={}; set[opp]=sign
		// game.update(set)
	}
	
	console.log(sign)
	// sign2.innerHTML=` |${sign}|`; print()
	// sign1.innerHTML=` |${sign}|`;
}, 1000);

game.on('child_added', (snapshot) => {
	if(snapshot.key=="won") {
		announce(snapshot.val())
	}else{
		boxes[snapshot.key].innerHTML=snapshot.val();
		board[snapshot.key]=snapshot.val();
	}
})

classObj1.on('child_added', (snapshot) => {
	let v=snapshot.key;	
	let c=snapshot.val();	
	if(v=="turn"){
		turn.setAttribute("class", c)
	}else if(v[0]=="B"){
		boxes[v[1]].classList.add(c)
	}else{
		boxes[v].classList.add(c);
	}
})
classObj2.on('child_added', (snapshot) => {
	let v=snapshot.key;	
	let c=snapshot.val();

	if(v=="turn"){
		turn.setAttribute("class", c)
	}else{
		boxes[v].classList.remove(c);
	}
})

function validation(index){
	console.log(sign, turn.innerHTML)
	if((board[index]!="") | (sign!==turn.innerHTML)){
		console.log("no no");
		return false;
	}
	return true;
}

function change(){
	classObj2.set({turn:`player${player}`});
	player = player === "X" ? "O" : "X";
	root.update({
		"player":player
	})
	turn.innerHTML = player;
	classObj1.set({
		turn:`player${player}`
	});
}

function check(box) {
	for (i = 0; i < rules.length; i++) {
		var isWon = false;
		let win = rules[i];
		var a = board[win[0]];
		var b = board[win[1]];
		var c = board[win[2]];
		if(a === b && b === c && a !== "") {
			isWon = true;
			let obj={}; obj["B"+win[0]]="won";
			let obj1={}; obj1["B"+win[1]]="won";
			let obj2={}; obj2["B"+win[2]]="won";
			
			classObj1.set(obj)
			classObj1.update(obj1)
			classObj1.update(obj2)
			break
		}
	}

	if(isWon) {
		if(a == "X") {
			game.set({won: "X"})
		}else {
			game.set({won: "O"})
		}
		alive = false;
	}

	if(!board.includes("")){
		game.set({won: "TIE"})
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
	
	game.remove();
	classObj1.remove();
	classObj2.remove();
	setTimeout(() => {
		window.location.reload();
	}, 5000);
	if(roundNum<4){
		root.update({"round": roundNum+ 1})
	}else{
		final()
	}
}

function final(){
	document.body.innerHTML=`<div style="height:100vh" class="text-primary text-center d-flex align-items-center justify-content-center display-4">Thanks for visiting</div>`
}


function press(box) {
	if (validation(box.id) && alive) {
		var id=box.id; board[id]=sign;
		let obj={}; obj[id]=sign;
		game.update(obj)
		let obj2={}; obj2[id]=`player${player}`;
		classObj1.set(obj2)
		change();
		check(box);
	}
}


boxes.forEach((box) => {
	box.addEventListener('click', ()=> press(box))
});



}
// finish

/*

*/