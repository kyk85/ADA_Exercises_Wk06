var likeArray =[]
var index = 0

var likeButton = document.getElementById("like")
var skipButton = document.getElementById("skip")
var picture = document.getElementById("myPicture")
var myName = document.getElementById("myName")
var myAddress = document.getElementById("myAddress")
var myPhone = document.getElementById("myPhone")
var myDOB = document.getElementById("myDOB")
var myEmail = document.getElementById("myEmail")

function getNewUser(){
	//window.alert("HALP")
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//document.write.innerHTML =
			//console.log(this.response);
			var responseObject=JSON.parse(this.response)
			picture.src=responseObject.results[0].picture.large;
			var firstName=responseObject.results[0].name.first.charAt(0).toUpperCase()+responseObject.results[0].name.first.slice(1)
			var lastName=responseObject.results[0].name.last.charAt(0).toUpperCase()+responseObject.results[0].name.last.slice(1)
			myName.innerHTML=firstName+ " " +lastName
			myAddress.innerHTML=responseObject.results[0].location.street
			myPhone.innerHTML="(Home)"+responseObject.results[0].phone + ", (Cell)"+responseObject.results[0].cell
			myDOB.innerHTML=responseObject.results[0].dob
			myEmail.innerHTML=responseObject.results[0].email

			
		}
	};
	xhttp.open("GET", "https://www.randomuser.me/api", true);
	xhttp.send();
}

window.onload = getNewUser();

function meLikey() {
	var newLike = {
		id:index,
		picture: picture.src,
		name:myName.innerHTML,
		address:myAddress.innerHTML,
		phone:myPhone.innerHTML,
		dob:myDOB.innerHTML,
		email:myEmail.innerHTML
	}

	likeArray.push(newLike)
	index++
	likeButton.disabled=true
	likeButton.style.backgroundColor="grey"
	likeButton.style.textDecoration="line-through"
	skipButton.innerHTML="Next"
	console.log(likeArray)

	var newTableEntry = document.getElementById("likeTable")

	var newRow = document.createElement("tr")
	var newName = document.createElement("td")
	var newAddress = document.createElement("td")
	var newPhone = document.createElement("td")
	var newDOB = document.createElement("td")
	var newEmail = document.createElement("td")

	var userName = newLike.name
	var userAddress = newLike.address
	var userPhone = newLike.phone
	var userDOB = newLike.dob
	var userEmail = newLike.email

	newName.innerHTML = userName
	newAddress.innerHTML = userAddress
	newPhone.innerHTML = userPhone
	newDOB.innerHTML = userDOB
	newEmail.innerHTML = userEmail

	newRow.appendChild(newName)
	newRow.appendChild(newAddress)
	newRow.appendChild(newPhone)
	newRow.appendChild(newDOB)
	newRow.appendChild(newEmail)
	newTableEntry.appendChild(newRow)

	newRow.addEventListener("click", function(){
		picture.src = newLike.picture
		myName.innerHTML = newLike.name
		myAddress.innerHTML = newLike.address
		myPhone.innerHTML = newLike.phone
		myDOB.innerHTML = newLike.dob
		myEmail.innerHTML = newLike.email
		likeButton.disabled=true
		likeButton.style.backgroundColor="grey"
		likeButton.style.textDecoration="none"
		likeButton.innerHTML="Liked"
		skipButton.innerHTML="Next"
		console.log(newLike.id)

	})

}

function skip() {
	getNewUser();
	likeButton.disabled=false
	likeButton.style.backgroundColor="green"
	likeButton.style.textDecoration="none"
	skipButton.innerHTML="Skip"
	likeButton.innerHTML="Like"
}
