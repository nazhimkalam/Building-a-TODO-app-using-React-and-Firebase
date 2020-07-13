import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
	// the todo in the below state is a array which is initialized to an array, we use the setTodo to
	// make changes to the todo array

	// this useState is just like a short term memory, which gets cleared when ever the page is refreshed
	const [todo, setTodo] = useState([]);
	const [input, setInput] = useState('');

	// when the app loads we are supposed to listen to the database and fetch the new data
	useEffect(() => {
		// this code fires when the App.js loads (READING FROM THE DATABASE AND ADDING TO THE ARRAY)--------
		db.collection('todoList')
			.orderBy('timestamp', 'desc') // data ordering method in the database
			.onSnapshot((snapshot) => {
				// this returns all the documents with in the collection name called "todoList"
				// console.log(snapshot.docs.map((doc) => doc.data()));

				// this returns all the documents with in the collection name called "todoList" with field name called "todo"
				// console.log(snapshot.docs.map((doc) => doc.data().todo)); // here i extract the todo value from the object, which is a string basically, since out setTodo array accepts strings only to work, not objects
				setTodo(snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo })));
			});
	});

	// the below function runs when the "Todo App" button is clicked !!!
	const addTodo = (event) => {
		// we are gonna add the value which was set in the input field back into the "todo"
		// array by appending to the array using the spread operator (...)
		// setTodo([...todo, input]);  // I commented this because I am using I am loading data from the firebase db in the code below

		// I am adding an object into the collection "todoList" because firebase deals with objects (SAVING INTO THE DATABASE) ------
		db.collection('todoList').add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		event.preventDefault(); // STOPS the refreshing of the web page when clicked enter after filling thr input field

		setInput(''); // we are emptying the input field just after clicking enter or the button
	};

	return (
		<div className="App">
			<h1>Text Here 😊</h1>

			<form>
				{/* We are making use of material ui controls to make our stuff look pretty */}
				<FormControl>
					<InputLabel>✅Write a TODO</InputLabel>
					<Input value={input} onChange={(event) => setInput(event.target.value)} />
				</FormControl>

				{/* Button disabled if no input data present */}
				<Button disabled={!input} variant="contained" type="submit" onClick={addTodo} color="primary">
					Todo App
				</Button>
			</form>

			<ul>
				{todo.map((element) => (
					<div className="Todo">
						<Todo data={element} />
					</div>
				))}
			</ul>
		</div>
	);
}

export default App;
