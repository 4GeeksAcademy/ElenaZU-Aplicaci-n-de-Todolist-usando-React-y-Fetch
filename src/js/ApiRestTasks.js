    const todoListApi = 'https://fake-todo-list-52f9a4ed80ce.herokuapp.com/';
    
    export const getJsonFromApi = async () => {
		
		try {

			const response = await fetch(todoListApi + "/todos/user/ElenaZu");
			const data = await response.json();
            return data;

		} catch (error) {
			console.error(error);
		}

	};

	 export const updateTaskApi = async (arrayTasks) => {
		try {
		
			await fetch(todoListApi + "/todos/user/ElenaZu", {
				method: 'PUT', 
				headers: {
				  'Content-Type': 'application/json' 
				},
				body: JSON.stringify(arrayTasks) 
			});

		} catch (error) {
			console.error(error);
		}
	 }