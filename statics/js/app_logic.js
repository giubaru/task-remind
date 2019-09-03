var list_container = document.getElementById('list-container')
var new_task = document.getElementById('new-task')
var delete_all = document.getElementById('delete-all-task')

var data_container_1 = document.getElementsByClassName('header-content-right-1')[0]
var data_container_2 = document.getElementsByClassName('header-content-right-2')[0]

var task_id = document.getElementById('task-id')
var task_name = document.getElementById('task-name')
var task_description = document.getElementById('task-description')
var task_content = document.getElementById('task-content')
var task_priority = document.getElementById('task-priority')
var btn_done = document.getElementById('task-done')
var btn_delete = document.getElementById('task-delete')

var tasks = []

task_name.onblur = (e) => {saveChanges()}
task_description.onblur = (e) => {saveChanges()}
task_content.onblur = (e) => {saveChanges()}

task_priority.onblur = (e) => {saveChanges()}

function saveChanges(){
    var task = sessionStorage.getItem(task_id.name)
    var data = JSON.parse(task)
    data.title = task_name.innerText
    data.description = task_description.innerText
    data.content = task_content.innerText
    data.priority = task_priority.innerText
    sessionStorage.setItem(task_id.name, JSON.stringify(data))
    var title = document.getElementById(task_id.name)
    title.innerHTML = task_name.innerText
}


if (sessionStorage.getItem('tasks-id') === null){
    sessionStorage.setItem('tasks-id', 0)
}

new_task.addEventListener('click', () => {

    createItem()
})
delete_all.addEventListener('click', () => {
    deleteAll()
})
btn_delete.addEventListener('click', () => {deleteTask(task_id.name)})
btn_done.addEventListener('click', () => {doneTask(task_id.name)})

function deleteAll(){
    console.log(tasks)
    console.log(tasks.length)
    for(var i = 0; i < tasks.length; i++){
        console.log()
        var element = document.getElementById(tasks[i])
        console.log(element)
        sessionStorage.removeItem(tasks[i])
        list_container.removeChild(element)
    }
    sessionStorage.setItem('tasks-id', 0)
    tasks = []
    data_container_1.style.display = 'block'
    data_container_2.style.display = 'none'
}
function doneTask(id){
    var task = sessionStorage.getItem(task_id.name)
    var data = JSON.parse(task)
    data.isDone = true
    sessionStorage.setItem(task_id.name, JSON.stringify(data))
    document.getElementById(id).style.backgroundColor = 'rgb(101, 255, 160)'
}

function deleteTask(id){
    var id = id.toString()

    var element = document.getElementById(id)
    var index = tasks.indexOf(id)
    var total = tasks.length - 1

    if(index < total){
        loadTask(tasks[index + 1])
    } else if(index == total && total >= 1){
        loadTask(tasks[index - 1])
    } else {
        data_container_2.style.display = 'none'
        data_container_1.style.display = 'block'
    }
    tasks.splice(index, 1)
    sessionStorage.removeItem(id)
    list_container.removeChild(element)
}

function createTask(task){
    var data = JSON.parse(task)
    var li_elm = document.createElement('li')
    li_elm.classList.add('list-item')
    //li_elm.classList.add('mt-1')
    li_elm.name = 'task'
    li_elm.id = data.id
    if(data.isDone === true){
        li_elm.classList.add('asDone')
    }

    li_elm.onclick = (e) => {loadTask(li_elm.id)}
    var li_content = document.createTextNode(data.title)
    li_elm.appendChild(li_content)
    list_container.appendChild(li_elm)
    
}
function createItem(){
    var task_number = parseInt(sessionStorage.getItem('tasks-id')) + 1 
    var li_elm = document.createElement('li')
    li_elm.classList.add('list-item')
    //l//i_elm.classList.add('mt-1')
    li_elm.id = task_number
    li_elm.onclick = (e) => {loadTask(e.target.id)}
    var task_data = {
        id:task_number,
        title:'Tarea sin título',
        description:'Agregar descripción.',
        content:'Escribir detalle de la tarea...',
        isDone:false,
        priority:'Normal'
    }

    var li_content = document.createTextNode(task_data.title)
    li_elm.appendChild(li_content)
    list_container.appendChild(li_elm)
    task_id.name = ''
    newItem(task_data)
}


function newItem(task_data){
    var clave = task_data.id
    sessionStorage.setItem(clave, JSON.stringify(task_data))
    sessionStorage.setItem('tasks-id', clave)
    tasks.push(clave.toString())
    loadTask(clave)
}

function loadTasks(){
    var first = 0
    for(var i = 0; i<sessionStorage.length; i++){
        if (i !== 0) {

            var clave = sessionStorage.key(i)
            var task = sessionStorage.getItem(clave)
            createTask(task)
            if(first === 0){
                first = i
                loadTask(clave)
            }
            tasks.push(clave)
        } 
    }
}

function loadTask(id){
    console.log('Click on: ' + id)
    var element = document.getElementById(id)
    element.style.opacity = '20';
    data_container_1.style.display = 'none'
    data_container_2.style.display = 'block'
    var data = JSON.parse(sessionStorage.getItem(id))
    task_id.name = data.id
    task_id.innerHTML = '<i># ' + data.id + '</i>'
    task_content.innerHTML = data.content
    task_description.innerHTML = '<i>' + data.description + '</i>'
    task_name.innerHTML = data.title
    task_priority.innerHTML = data.priority
}

window.addEventListener('load', loadTasks, false )