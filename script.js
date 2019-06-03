const input        = document.getElementById('txtTaskName');
const form         = document.getElementById('addTaskForm');
const list         = document.getElementById('task-list');
const deleteButton = document.getElementById('btnDeleteAll');
let items        = [];

loadItems();

eventListeners();

function eventListeners() {
    form.addEventListener('submit', addListItem);
    list.addEventListener('click', deleteItem);
    deleteButton.addEventListener('click', deleteAllItem);
}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function(item) {
        createItem(item);
    }) 
}

// get items from local storage
function getItemsFromLS() {
    if(localStorage.getItem('items') === null) {
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

//set item to local storage
function setItemsToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items))
}

// delete from local storage
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function(item,index) {
        if(item === text) {
            items.splice(index,1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items))
}

function createItem(text) {
    var htmlList = `
        <li class="list-group-item list-group-item-secondary">
            ${text}
            <a href="#" class="delete-item float-right">
                <i class="fas fa-times"></i>
            </a>
        </li>
    `;

    list.innerHTML += htmlList
}

function addListItem(e) {

    if (input.value === "") {
        alert('Please enter a task!')
        return
    }

    createItem(input.value); 
    
    //save to local stroge
    setItemsToLS(input.value);

    input.value = ""
        
    e.preventDefault();
}

function deleteItem(e) {
    if(e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }

    e.preventDefault();
}

function deleteAllItem(e) {
    if(confirm("Are you sure?")) {
        list.childNodes.forEach(function(item) {
            if(item.nodeType === 1) {
                item.remove();
            }
        })
        localStorage.clear();
    }

    e.preventDefault();
}
