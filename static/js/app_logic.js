var list_container = document.getElementById('list-container')
var new_task = document.getElementById('new-task')

var task_id = document.getElementById('task-id')
var task_name = document.getElementById('task-name')
var task_description = document.getElementById('task-description')
var task_content = document.getElementById('task-content')
var btn_done = document.getElementById('task-done')
var btn_delete = document.getElementById('task-delete')



task_name.onblur = (e) => {saveChanges()}
task_description.onblur = (e) => {saveChanges()}
task_content.onblur = (e) => {saveChanges()}



function saveChanges(){
    var task = sessionStorage.getItem(task_id.name)
    var data = JSON.parse(task)
    data.title = task_name.innerText
    data.description = task_description.innerText
    data.content = task_content.innerText
    sessionStorage.setItem(task_id.name, JSON.stringify(data))
    var title = document.getElementById(task_id.name)
    title.innerHTML = task_name.innerText
}


if (sessionStorage.getItem('tasks-id') === null){
    sessionStorage.setItem('tasks-id', 0)
    task_id.style.display = 'none'
    task_name.style.display = 'none'
    task_description.style.display = 'none'
    task_content.style.display = 'none'
    btn_done.style.display = 'none'
    btn_delete.style.display = 'none'
}

new_task.addEventListener('click', () => {
    createItem()
})
btn_delete.addEventListener('click', () => {deleteTask(task_id.name)})
btn_done.addEventListener('click', () => {doneTask(task_id.name)})
function doneTask(id){
    var task = sessionStorage.getItem(task_id.name)
    var data = JSON.parse(task)
    data.isDone = true
    sessionStorage.setItem(task_id.name, JSON.stringify(data))
    document.getElementById(id).style.backgroundColor = 'rgb(101, 255, 95)'
}
function deleteTask(id){
    console.log('borrar: ' + id)
    document.getElementById(id).style.display = 'none'
    console.log(document.getElementById(id).nextSibling)
    var next_task = document.getElementById(id).nextSibling
    var previous_task = document.getElementById(id).previousSibling
    sessionStorage.removeItem(id)
    if(next_task !== null){
        loadTask(next_task.id)
    } else if (previous_task !== null){
        loadTask(previous_task.id)
    }
    else {
        task_id.style.display = 'none'
        task_name.style.display = 'none'
        task_description.style.display = 'none'
        task_content.style.display = 'none'
        btn_done.style.display = 'none'
        btn_delete.style.display = 'none'
    }
    
    
}
function createTask(task){
    var data = JSON.parse(task)
    var li_elm = document.createElement('li')
    li_elm.classList.add('list-item')
    li_elm.classList.add('mt-1')
    li_elm.id = data.id
    li_elm.onclick = (e) => {loadTask(li_elm.id)}
    var li_content = document.createTextNode(data.title)
    li_elm.appendChild(li_content)
    list_container.appendChild(li_elm)
    
}
function createItem(){
    var task_number = parseInt(sessionStorage.getItem('tasks-id')) + 1 
    var li_elm = document.createElement('li')
    li_elm.classList.add('list-item')
    li_elm.classList.add('mt-1')
    li_elm.id = task_number
    li_elm.onclick = (e) => {loadTask(e.target.id)}
    var task_data = {
        id:task_number,
        title:'Tarea sin título',
        description:'Agregar descripción.',
        content:'Escribir detalle de la tarea...',
        isDone:false
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
    loadTask(clave)
}

function loadTasks(){
    for(var i = 0; i<sessionStorage.length; i++){
        if (i !== 0) {
            var clave = sessionStorage.key(i)
            var task = sessionStorage.getItem(clave)
            createTask(task)
        }
    }
}

function loadTask(id){
    console.log('Click on: ' + id)
    task_id.style.display = 'block'
    task_name.style.display = 'block'
    task_description.style.display = 'inline-block'
    task_content.style.display = 'block'
    btn_done.style.display = 'block'
    btn_delete.style.display = 'block'


    
        var data = JSON.parse(sessionStorage.getItem(id))
        task_id.name = data.id
        task_id.innerHTML = '<i># ' + data.id + '</i>'
        task_content.innerHTML = data.content
        task_description.innerHTML = '<i>' + data.description + '</i>'
        task_name.innerHTML = data.title
        if(data.isDone){
            doneTask(data.id)
        }
    
    
}

window.addEventListener('load', loadTasks, false )