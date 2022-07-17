// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyByHb3UrwlKwpA6gdLNRJrYkVhyWkbycXc",
	authDomain: "hacking-projects.firebaseapp.com",
	databaseURL: "https://hacking-projects-default-rtdb.firebaseio.com",
	projectId: "hacking-projects",
	storageBucket: "hacking-projects.appspot.com",
	messagingSenderId: "279153016474",
	appId: "1:279153016474:web:46ed8dc5d4a525569ca923",
	measurementId: "G-MNV97733M4"
};

if(firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

function verify() {
	let name=document.getElementById('name').value;
	// name="Tahmid@2114X";
	let firebase_db=firebase.database().ref(name.substr(0, name.length-1));
    // Accessiblity
    firebase_db.on('value', (a)=>{
        if(a.val().playerX==name.substring(0, 6)){
            $("#exampleModal").modal('toggle');
			firebase.database().ref("modes").update({
				notify:true
			})
			
			localStorage.setItem("admin", true);
			firebase_db.update({
				player:name[name.length-1],
				round: 1
			})
			window.open("http://127.0.0.1:5500/computer.html");
        }else{
            document.body.innerHTML="Login Failed!! Reload the page...";
        }
    });
	return;
}

function accept() {
	let yname=document.getElementById('yname').value;
	if(yname!=""){
		firebase.database().ref("Tahmid@2114").update({
			playerY:yname
		})
		$("#exampleModal2").modal('toggle');
		firebase.database().ref("modes").set({
			play:true
		})
		
		setTimeout(() => {
			window.open("http://127.0.0.1:5500/computer.html");
		}, 800);
	}
}


function more() {
	let no=document.getElementById('no')
	if (no.style.display=="none") {
		no.style.display="block"
	} else {
		no.style.display="none"
	}
}