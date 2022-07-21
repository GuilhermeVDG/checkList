const inputNewTask = document.querySelector('.input-new-task')
const tasks = document.querySelector('.tasks')

const createElementLi = () => {
    const li = document.createElement('li')
    return li
}

const createTask = (inputText) => {
    const li = createElementLi()
    li.innerText = inputText
    tasks.appendChild(li)
    cleanInput()
    createDeleteButton(li)
    saveTasks()
}

const cleanInput = () => {
    inputNewTask.value = ''
    inputNewTask.focus()
}

const createDeleteButton = (li) => {
    li.innerText += ' '
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Apagar'
    deleteButton.setAttribute('class', 'delete')
    li.appendChild(deleteButton)
}

const saveTasks = () => {
    const tasksLi = tasks.querySelectorAll('li')
    const listOfTasks = []

    for (let task of tasksLi) {
        let taskText = task.innerText
        taskText = taskText.replace('Apagar', '').trim()
        listOfTasks.push(taskText)
    }
    const tasksJSON = JSON.stringify(listOfTasks)
    localStorage.setItem('tasks', tasksJSON)
    console.log(listOfTasks)
    console.log(tasksJSON)
}

const addSavedTasks = () => {
    const tasks = localStorage.getItem('tasks')
    const listOfTasks = JSON.parse(tasks)

    for (let task of listOfTasks){ 
        createTask(task)
    }
}

inputNewTask.addEventListener('keydown', (event) =>{
    if(event.keyCode === 13){
        if(!inputNewTask.value) return
        createTask(inputNewTask.value)
    }
})

document.addEventListener('click', (event) =>{
    const element = event.target

    if(element.classList.contains('button-add-task')){
        if(!inputNewTask.value) return
        createTask(inputNewTask.value)
        
    }

    if(element.classList.contains('delete')){
        element.parentElement.remove()
        saveTasks()
    }
})
addSavedTasks()
