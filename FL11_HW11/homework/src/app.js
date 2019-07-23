const ROOTNODE = document.getElementById('root');
const TODOHEADER = ROOTNODE.querySelector('.header');
const WRITEACTIONINPUT = ROOTNODE.querySelector('.write_action');
const ADDBOX = ROOTNODE.querySelector('.add_action');
let userItem = ROOTNODE.querySelector('.user_item');

const NOTIFYENDLIST = document.createElement('div');
const USERLIST = ROOTNODE.querySelector('.user_list');
const CHECKLISTCOLLECT = ROOTNODE.getElementsByClassName('user_item');
let checkDisabledInput = false;
WRITEACTIONINPUT.addEventListener('input', checkInputValue);
let maxItem = 11;

function checkInputValue() {
  if(WRITEACTIONINPUT.value.trim().length >= 1) {
    addIconActivating(ADDBOX);
  } else {
    addIconDisabling(ADDBOX);
  }
}

function addNewList() {
  let temp = userItem.cloneNode(true);
  temp.querySelector('.text_action').textContent = WRITEACTIONINPUT.value;
  temp.querySelector('.check_item').checked = false;
  temp.querySelector('.check_item').disabled = false;
  temp.firstElementChild.style.textDecoration = '';
  temp.style.display = 'block';
  addListeners(temp);

  USERLIST.insertBefore(temp, USERLIST.firstChild);
  WRITEACTIONINPUT.value = '';
  checkInputValue();
  if(CHECKLISTCOLLECT.length >= maxItem) {
    checkDisabledInput = true;
    addIconDisabling(ADDBOX);
    notifying();
  }
}
function deleteItem(event) {
  event.target.parentElement.parentElement.remove();
  if(checkDisabledInput && CHECKLISTCOLLECT.length < maxItem) {
    addIconActivating(ADDBOX);
    WRITEACTIONINPUT.disabled = false;
    NOTIFYENDLIST.remove();
  }
}

function addIconActivating(itemToActivate) {
  itemToActivate.disabled = false;
  itemToActivate.firstElementChild.classList.remove('color_disabled');
  itemToActivate.addEventListener('click', addNewList);
}

function addIconDisabling(itemToDisable) {
  itemToDisable.disabled = true;
  itemToDisable.firstElementChild.classList.add('color_disabled');
  itemToDisable.firstElementChild.removeEventListener('click', addNewList);
}

function notifying() {
  WRITEACTIONINPUT.disabled = true;
  WRITEACTIONINPUT.value = '';
  NOTIFYENDLIST.textContent = 'Maximum item per list are created';
  NOTIFYENDLIST.classList.add('notify_end_list');
  TODOHEADER.appendChild(NOTIFYENDLIST);
}

function markChecked(event) {
  if(event.target.checked) {
    event.target.disabled = true;
    event.target.parentNode.style.textDecoration = 'line-through';
  }
}

function openEdit(event) {
  if(event.target.parentElement.querySelector('.check_item').checked === true) {
    event.target.removeEventListener('click', openEdit);
  } else {
    if(event.target.parentElement.nextElementSibling.style.display === 'flex') {
      event.target.parentElement.nextElementSibling.style.display = 'none'
    } else {
      event.target.parentElement.nextElementSibling.style.display = 'flex';
    }
  }
}

function saveEdit(event) {
  if(event.target.previousElementSibling.value.trim()) {
    event.target.parentElement.previousElementSibling.querySelector('.text_action')
         .textContent = event.target.previousElementSibling.value;
    event.target.previousElementSibling.value = '';
  }
  event.target.parentElement.style.display = 'none';
}

let dragSrcEl = null;
function handleDragStart(event) {
  dragSrcEl = event.target;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', event.target.innerHTML);
}
function handleDrop(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = event.dataTransfer.getData('text/html');
    addListeners(this);
    addListeners(dragSrcEl);
  }
  return false;
}

function allowDrop(event) {
  event.preventDefault();
}

function addListeners(element) {
  element.querySelector('.icon_create').addEventListener('click', openEdit);
  element.querySelector('.check_item').addEventListener('change', markChecked);
  element.querySelector('.icon_delete').addEventListener('click', deleteItem);
  element.querySelector('.icon_save').addEventListener('click', saveEdit);
  element.setAttribute('draggable', 'true');
  element.addEventListener('dragover', allowDrop);
  element.addEventListener('dragstart', handleDragStart, false);
  element.addEventListener('drop', handleDrop, false);
}
