let todosList = getSavedTodos()

filters= {
    searchText: '',
    hideCompleted: false
}

getSavedTodos()

renderTodos(todosList,filters)

document.querySelector('#search-text').addEventListener('input',function(e){
    filters.searchText = e.target.value
    renderTodos(todosList,filters)
})

document.querySelector('#todo-form').addEventListener('submit',function(e){
    e.preventDefault()
    console.log(e.target.elements.newToDo.value)
    todosList.push({
        id: uuidv4(),
        text: e.target.elements.newToDo.value,
        completed: false
    })
    saveTodos(todosList)
    renderTodos(todosList,filters)
    e.target.elements.newToDo.value = ''
})

document.querySelector('#hide-completed').addEventListener('change',function(e){
    filters.hideCompleted = e.target.checked
    renderTodos(todosList,filters)
})
