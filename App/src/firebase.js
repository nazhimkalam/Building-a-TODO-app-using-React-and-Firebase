import firebase from 'firebase';

// like this we can connect to the back end , its like the key to the back end
const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyCSEK7eEvFAQKW9pLislc3qqho5z5UGMb8',
	authDomain: 'todo-app-with-react-15bc3.firebaseapp.com',
	databaseURL: 'https://todo-app-with-react-15bc3.firebaseio.com',
	projectId: 'todo-app-with-react-15bc3',
	storageBucket: 'todo-app-with-react-15bc3.appspot.com',
	messagingSenderId: '347671042450',
	appId: '1:347671042450:web:d7e66f6d5736969321494b',
	measurementId: 'G-09TSCCGKTM',
});
const db = firebaseApp.firestore();

export default db;
