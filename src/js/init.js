import {
    addTodo,
    deleteAll,
    deleteLast,
    showAll,
    removeTodo,
    checkTodo,
    showComplete,
    searchTodo,
    renderTodo,
    renderCounters
} from './todos.js'
import {getFromStorage} from "./storage";
export let todos = [];
export const init = () => {
        // add todo
        let addBtn = document.querySelector('.todo-list__header-btn-add');
        addBtn.addEventListener('click', addTodo);
        // delete all
        let dltAllBtn = document.querySelector('.todo-list__header-btn-delete-all');
        dltAllBtn.addEventListener('click', deleteAll);
        // delete last
        let dltLastBtn = document.querySelector('.todo-list__header-btn-delete-last');
        dltLastBtn.addEventListener('click', deleteLast);
        // show all
        let showAllBtn = document.querySelector('.todo-list__body-btn-show-all');
        showAllBtn.addEventListener('click', showAll);
        // remove todo
        let listTodo = document.querySelector('.todo-list__list');
        listTodo.addEventListener('click', removeTodo);
        // check todo
        listTodo.addEventListener('click', checkTodo);

        // show completed
        let showCmlBtn = document.querySelector('.todo-list__body-btn-show-completed');
        showCmlBtn.addEventListener('click', showComplete);

        // search todo
        let searchInp = document.querySelector('.todo-list__body-input-search');
        searchInp.addEventListener('input', searchTodo);

        // get storage
        if (getFromStorage('todos'))  {
            todos = getFromStorage('todos')
            renderTodo()
        }

        // render counter
        renderCounters();
}