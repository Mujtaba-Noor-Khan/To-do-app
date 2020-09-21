// Fetch existing todos from localStorage

const getSavedTodos = function(){
    const todoJSON = localStorage.getItem('todos')

    if(todoJSON !== null){
        return JSON.parse(todoJSON)}
    
    else{return []}
}
// Save todos to localStorage
const saveTodos = function(todos){
    localStorage.setItem('todos',JSON.stringify(todos))
}
// Remove todo by id
const removeTodo = function(id){
    const todoIndex = todosList.findIndex(function(todo){
        return todo.id === id
    })
    if(todoIndex > -1){
        todosList.splice(todoIndex,1)
    }
}

// Toggle the completed value for a given todo

const toggleTodo = function(id){
    const todo = todosList.find(function(todo){
        return todo.id === id
    })
    if(todo !== undefined){
        todo.completed = !todo.completed
    }
}

// Get the DOM elements for an individual note
const generateTodoDOM = function(todo){
    const todoElement = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Set up todo chekbox
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    todoElement.appendChild(checkbox)
    checkbox.addEventListener('change',function(e){
        toggleTodo(todo.id)
        saveTodos(todosList)
        renderTodos(todosList,filters)
    })
    
    // Set up todo text
    if(todo.text.length>0){
        todoText.textContent = todo.text}
    else{
        todoText.textContent = 'Unnamed note'}
    
    todoElement.appendChild(todoText)

    // Set up remove button
    removeButton.textContent = 'x'
    todoElement.appendChild(removeButton)
    removeButton.addEventListener('click',function(e){
        removeTodo(todo.id)
        saveTodos(todosList)
        renderTodos(todosList,filters)
    })

    return todoElement
} 

// Get the DOM elements for list summary
const generateSummaryDOM = function(todos){
    const summary = document.createElement('h2')
    summary.textContent = `You have ${todos.length} todos left`
    return summary
}
// Render applications todos based on filters

const renderTodos = function(todos,filters){
    const filteredToDos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    const incompleteTodos = filteredToDos.filter(function(todo){
        return !todo.completed
    })

    document.querySelector('#todo').innerHTML = ''

    const summary = generateSummaryDOM(incompleteTodos)
    document.querySelector('#todo').appendChild(summary)
        
    filteredToDos.forEach(function(todo){
        if (!filters.hideCompleted || !todo.completed){
            const todoElement = generateTodoDOM(todo)
            document.querySelector('#todo').appendChild(todoElement)} 
    })      
}

