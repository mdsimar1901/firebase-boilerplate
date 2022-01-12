// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXSR0LRq0E8SJnQjzbNTXKx8rkvV2l66I",
    authDomain: "chat-app-bade9.firebaseapp.com",
    databaseURL: "https://console.firebase.google.com/u/0/project/chat-app-bade9/firestore/data/~2F1~2F9QEktWjo5FvwiRmrQuZ3",
    projectId: "chat-app-bade9",
    storageBucket: "chat-app-bade9.appspot.com",
    messagingSenderId: "1046864951941",
    appId: "1:1046864951941:web:3b541403136932d3ba07ec"
}

firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()

if (!localStorage.getItem('name')) {
	name = prompt('What is your name?')
	localStorage.setItem('name', name)
} else {
	name = localStorage.getItem('name')
}
document.querySelector('#name').innerText = name


document.querySelector('#change-name').addEventListener('click', () => {
	name = prompt('What is your name?')
	localStorage.setItem('name', name)
	document.querySelector('#name').innerText = name
})

document.querySelector('#message-form').addEventListener('submit', e => {
	e.preventDefault()

	let message = document.querySelector('#message-input').value
	db.collection('messages')
	.add({
		name: name,
		message: message,
		date: firebase.firestore.Timestamp.fromMillis(Date.now())
		})
	.then(docRef => {
		console.log(`Document written with ID: ${docRef.id}`)
		document.querySelector('#message-form').reset()
	})
	.catch(error => {
		console.log(`Error adding document: ${error}`)
	})
})

db.collection('messages')
.orderBy('date', 'asc')
.onSnapshot(snapshot => {
	document.querySelector('#messages').innerHTML = ''
	snapshot.forEach(doc => {
		let message = document.createElement('div')
		message.innerHTML = `
		<p class="name">${doc.data().name}</p>
		<p>${doc.data().message}</p>
		`
		document.querySelector('#messages').prepend(message)
	})
})