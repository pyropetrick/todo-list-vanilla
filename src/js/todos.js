import {addToStorage, deleteFromStorage} from "./storage";
import {todos} from './init.js'

export const addTodo = () => {
    let inputTitle = document.querySelector('.todo-list__header-input-enter');
    let todo = {
        id: Date.now(),
        title: inputTitle.value,
        isCompleted: false,
        date: new Date,
    }
    todos.push(todo)
    addToStorage({key:'todos', value: todos});
    renderTodo()
    inputTitle.value = ''
}

function getTodoCompleted() {
    return todos.filter(({isCompleted}) => isCompleted);
}
export const deleteAll = () => {
    todos = [];
    deleteFromStorage('todos');
    renderTodo()
}

export const deleteLast = () => {
    todos.pop();
    todos.length ? addToStorage({key: 'todos', value: todos} ) : deleteFromStorage('todos')
    renderTodo();
}

export const showAll = () => {
    renderTodo();
}
export const showComplete = () => {
    let filterTodo = getTodoCompleted();
    renderTodo(filterTodo);
}

export const removeTodo = ({target}) => {
    if(target.classList.contains('todo-item__btn-delete')) {
        let todoItem = target.parentNode;
        let todoId = +todoItem.getAttribute('id');
        let todoIdx = todos.findIndex(({id}) => todoId === id);
        todos.splice(todoIdx, 1);
        addToStorage({key: 'todos', value: todos})
        renderTodo();
    }
}

export const checkTodo = ({target}) => {
    if(target.classList.contains('todo-item__input-check-complete')) {
        let todoItem = target.parentNode.parentNode
        let todoId = +todoItem.getAttribute('id');
        let todoIdx = todos.findIndex(({id}) => todoId === id);
        todos[todoIdx].isCompleted = target.checked;
        addToStorage({key:'todos', value: todos})
        renderTodo();
    }
}
export const searchTodo = ({target}) => {
    let searchValue = target.value;
    let searchTodo = todos.filter(({title}) => title.includes(searchValue));
    renderTodo(searchTodo);
}

export const renderTodo = (list = todos) => {
    let todoList = document.querySelector('.todo-list__list');
    todoList.innerHTML = '';
    list.forEach(({id,title,isCompleted, date}) => {

        // create li
        let todoItem = document.createElement('li');
        todoItem.classList.add('todo-list__todo-item');
        todoItem.classList.add('todo-item');
        todoItem.setAttribute('id', id);
        // button
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('todo-item__btn-delete');
        deleteBtn.classList.add('action-button');
        deleteBtn.innerText = 'x';
        // label
        let todoLabel = document.createElement('label');
        todoLabel.classList.add('todo-item__label')
        // input
        let todoCheckBox = document.createElement('input');
        todoCheckBox.classList.add('todo-item__input-check-complete');
        todoCheckBox.setAttribute('type', 'checkbox');
        if (isCompleted) {
            todoCheckBox.setAttribute('checked', 'checked')
        }
        // span
        let todoTitle = document.createElement('span');
        todoTitle.classList.add('todo-item__label-title');
        todoTitle.innerText = title;
        // date
        let todoDate = document.createElement('p');
        todoDate.classList.add('todo-item__date');
        let options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
        todoDate.innerText = date.toLocaleString('ru', options);
        todoLabel.append(todoCheckBox);
        todoLabel.append(todoTitle);
        todoItem.append(deleteBtn);
        todoItem.append(todoLabel);
        todoItem.append(todoDate);
        todoList.append(todoItem);
    })
    // counters
    renderCounters()
}
export const renderCounters = () => {
    let countAll = document.querySelector('.todo-list__body-counter-all');
    countAll.innerText = `All:${todos.length}`;
    let countCompleted = document.querySelector('.todo-list__body-counter-completed');
    let counterCompleted = getTodoCompleted().length
    countCompleted.innerText = `Completed: ${counterCompleted}`
}
