import React, { useState } from 'react';
import { List, ListItem, ListItemText, Modal } from '@material-ui/core';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

function Todo(props) {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [updateInput, setUpdateInput] = useState('');

	// the update method
	const updateTodo = () => {
		// update the Todo text with the new input

		db.collection('todoList').doc(props.data.id).set(
			{
				todo: updateInput,
			},
			{ merge: true }
		);
	};

	return (
		<>
			{/* this is for the editing part */}
			{/* we are creating to a modal component to display another view */}
			<Modal open={open} onClose={(e) => setOpen(false)}>
				<div className={classes.paper}>
					<h1>Edit your Todo</h1>
					<input
						placeholder={props.data.todo}
						value={updateInput}
						onChange={(event) => setUpdateInput(event.target.value)}
					/>
					<button onClick={updateTodo}>Update</button>
				</div>
			</Modal>

			{/* this is the actual list part */}
			<div>
				<List>
					<ListItem>
						<ListItemText primary={props.data.todo} secondary="➕Added" />{' '}
						{/* props.data this is an object  */}
					</ListItem>
					<EditIcon onClick={(event) => setOpen(true)} />
					<DeleteForeverIcon onClick={(event) => db.collection('todoList').doc(props.data.id).delete()} />
				</List>
			</div>
		</>
	);
}

// styles
const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default Todo;
