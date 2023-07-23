import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {getJsonFromApi, updateTaskApi} from "../ApiRestTasks";

const Home = () => {

	const [textInput, setTextInput] = useState("");
	const [apiTaskList, setApiTaskList] = useState([]);


	function handleChange(e) {
		setTextInput(e.target.value);
	}

	function addNewTask(e) {
		if (e.key == "Enter" && textInput !== "") {

			let newTask = {
				"done": false,
				"label": textInput
			}                                                
			
			let updatedTaskList = [...apiTaskList,newTask];

			setApiTaskList(updatedTaskList);

			setTextInput("");
		
			updateTaskApi(updatedTaskList);
		}
	}

	function deleteTask(position) {
		
		let updatedTaskList = apiTaskList.filter((_, index) => index !== position);

		setApiTaskList(updatedTaskList);

		updateTaskApi(updatedTaskList);
	}

	function cleanTheList(){
		let emptyArray = [];
		updateTaskApi(emptyArray);
		setApiTaskList(emptyArray);
	}

	useEffect( async () => {

		let arrayObjectsTasks = await getJsonFromApi();

		setApiTaskList(arrayObjectsTasks);

	}, []);


	return (
		<div>
			<h1 className="text-center">TODOS</h1>
			<div className='container'>
				<div ><input type="text" className="form-control d-flex justify-content-end input-icon mb-3" placeholder="What needs to be done" value={textInput} onChange={handleChange} onKeyDown={addNewTask} /></div>
				{
					apiTaskList.map((task, index) => {
						return (
							<div className="input-icon">

								<input key={index} value={task.label} className="form-control d-flex justify-content-end mb-3"/>
								<FontAwesomeIcon className="icon" icon={faTimes} onClick={() => { deleteTask(index) }} />

							</div>
						)
					})
				}
			</div>
			{
				<div className="footer text-start">
					<h5>
						{
							apiTaskList.length
						}
						items left
					</h5>
				</div>
			}
			{
				
				<div className="d-flex justify-content-center">
					<button type="button" className="btn btn-primary" onClick={()=>{ cleanTheList() }}>Limpiar lista</button>
				</div>
				
			}
		</div>
	);
};

export default Home;

