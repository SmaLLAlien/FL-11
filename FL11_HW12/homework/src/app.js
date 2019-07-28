const rootNode = document.getElementById('root');
const timeToDisapear = 2000;
let todoItems = [

];


// TODO PAGE elements
const buttonNewTask = rootNode.querySelector('.task_new');
const taskWrapper = rootNode.querySelector('.task_wrapper');
const itemTextCollection = rootNode.getElementsByClassName('unchecked_text');
const listUnchecked = rootNode.querySelector('.unchecked');
const taskUnChecked = taskWrapper.querySelector('.task_unchecked');
const taskChecked = taskWrapper.querySelector('.task_checked');


// ADD PAGE elements
const addWrapper = rootNode.querySelector('.add__wrapper');
const cancelButton = rootNode.querySelector('.add_cancel');
const saveChangesButton = rootNode.querySelector('.add_save');
const addNewInput = rootNode.querySelector('.add_input');
const addHeader = rootNode.querySelector('.add_header');

// MODIFY PAGE elements
const modifyHeader = rootNode.querySelector('.modify_header');
const modifySaveButton = rootNode.querySelector('.modify_save');

buttonNewTask.addEventListener('click', () => {
 window.location.hash = 'add' 
});
cancelButton.addEventListener('click', () => {
 window.location.hash = '' 
});


getFromStorage(listUnchecked);


saveChangesButton.addEventListener('click', addItem);
function addItem() {
  let value = addNewInput.value.trim();
  let checkInputResult = checkTextItems(value, itemTextCollection);
  if(checkInputResult === 'empty') {
    let text = 'You can`t add empty item';
    let div = info(text);
    setTimeout(() => div.remove(), timeToDisapear);
  } else if(checkInputResult === 'exist') {
    let text = 'You can`t add already exist item';
    let div = info(text);
    setTimeout(() => div.remove(), timeToDisapear);
  } else {
    let temp = makeCLone(listUnchecked);
    temp.querySelector('.unchecked_text').textContent = value;
    taskUnChecked.appendChild(temp);
    setToStorage(temp);
    window.location.hash = '';
    addNewInput.value = '';
  }
}
function makeCLone(element) {
  let temp = element.cloneNode(true);
  temp.style.display = 'block';
  temp.getElementsByClassName('imageUnCheck')[0].addEventListener('click', setChecked);
  temp.getElementsByClassName('remove')[0].addEventListener('click', deleteItem);
  temp.querySelector('.unchecked_text').addEventListener('click', modifyHash);
  return temp;
}
function setToStorage(listUnchecked) {
  let obj = {};
  obj.isDone = false;
  obj.id = +new Date();
  obj.description = listUnchecked.querySelector('.unchecked_text').textContent;
  todoItems.push(obj);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}
function getFromStorage(element) {
    // check if local storage has items
    if(JSON.parse(localStorage.getItem('todoItems'))) {
      todoItems = JSON.parse(localStorage.getItem('todoItems'));
      let fragmentUnChecked = document.createDocumentFragment(); // for unchecked item
      let fragmentChecked = document.createDocumentFragment(); // for checked item
      todoItems.map((item) => {
        let temp = makeCLone(element);
        temp.querySelector('.unchecked_text').textContent = item.description;
        if(item.isDone === true) {
          temp.querySelector('.unchecked_text').style.background = '#ccc';
          temp.querySelector('.imageUnCheck').setAttribute('src', 'assets/img/done-s.png');
          fragmentChecked.appendChild(temp);
        } else {
          fragmentUnChecked.appendChild(temp);
        }
        return temp;
      });
       taskUnChecked.appendChild(fragmentUnChecked);
       taskChecked.appendChild(fragmentChecked);
    }
}

// check what user type inside addinput
function checkTextItems(value, itemCollection) {
  let collectionLength = itemCollection.length;
  if(!value) {
    return 'empty';
  } else {
    for(let i = 0; i < collectionLength; i++) {
      if(value === itemCollection[i].textContent.trim()) {
        return 'exist';
      }
    }
  }
  return value;
}

// check if item ischecked and append to needed list
function setChecked(event) {
  let done = 'assets/img/done-s.png';
  let unDone = 'assets/img/todo-s.png';
  let li = event.target.closest('.unchecked');
  let srcImage = event.target.getAttribute('src');
  if(srcImage === unDone) {
    srcImage = done;
    event.target.setAttribute('src', srcImage);
    taskChecked.appendChild(li);
    event.target.parentElement.nextElementSibling.style.background = '#ccc';
    //find that element in array, change isdone and and push it to localstorage
    todoItems = todoItems.map((item) => {
      if(li.querySelector('.unchecked_text').textContent === item.description) {
        item.isDone = true;
      }
      return item;
    });
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  } else {
    srcImage = unDone;
    event.target.setAttribute('src', srcImage);
    taskUnChecked.appendChild(event.target.closest('.unchecked'));
    event.target.parentElement.nextElementSibling.style.background = '';
    //find that element in array, change isdone and and push it to localstorage
    todoItems = todoItems.map((item) => {
      if(li.querySelector('.unchecked_text').textContent === item.description) {
        item.isDone = false;
      }
      return item;
    });
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }

}

// delete item
function deleteItem(event) {
  let item = event.target.closest('.unchecked');
  let itemContent = item.querySelector('.unchecked_text').textContent;
  todoItems = todoItems.filter(item => item.description !== itemContent);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
  item.remove();

}

// MODIFYING
let modifiedLi;
function modifyHash(event) {
  let isPresent = false;
  if(event.target.className === 'unchecked_text') {
    for(let i = 0; i < todoItems.length; i++) {
      if(event.target.textContent === todoItems[i].description && todoItems[i].isDone){
        isPresent = true;
      }
    }
    if(isPresent) {
      let text = 'You can`t edit already done item';
      let div = info(text);
      setTimeout(() => div.remove(), timeToDisapear);
    } else {
      for(let i = 0; i < todoItems.length; i++) {
        if(event.target.textContent === todoItems[i].description) {
          window.location.hash = `modify:${todoItems[i].id}`;
          modifiedLi = [event.target, todoItems[i].id];
        }
      }
    }
  }
}
modifySaveButton.addEventListener('click', modifyItem);
function modifyItem() {
  let value = addNewInput.value.trim();
  let checkInputResult = checkTextItems(value, itemTextCollection);
  if(checkInputResult === 'empty') {
    let text = 'You can`t add empty item';
    let div = info(text);
    setTimeout(() => div.remove(), timeToDisapear);
  } else if(checkInputResult === 'exist') {
    let text = 'You can`t add already exist item';
    let div = info(text);
    setTimeout(() => div.remove(), timeToDisapear);
  } else {
    let oldValue = modifiedLi[0].textContent;
    modifiedLi[0].textContent = value;
    todoItems = todoItems.map((item) => {
      if(oldValue === item.description) {
        item.description = value;
      }
      return item;
    });
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    window.location.hash = '';
    addNewInput.value = '';
  }
}

window.addEventListener('hashchange', changePage);
function changePage(hashchangeEvent) {
  let hash = hashchangeEvent.target.location.hash;
  if(hash.substr(1) === 'add') {
    taskWrapper.style.display = 'none';
    addWrapper.style.display = 'block';
    addHeader.style.display = 'block';
    modifyHeader.style.display = 'none';
    saveChangesButton.style.display = 'block';
    modifySaveButton.style.display = 'none';
  }
  if(hash.substring(1, 'modify'.length + 1) === 'modify') {
    taskWrapper.style.display = 'none';
    addWrapper.style.display = 'block';
    modifyHeader.style.display = 'block';
    addHeader.style.display = 'none';
    saveChangesButton.style.display = 'none';
    modifySaveButton.style.display = 'block';
  }
  if(!hash) {
    taskWrapper.style.display = 'block';
    addWrapper.style.display = 'none';
    modifyHeader.style.display = 'none';
    addHeader.style.display = 'none';
    saveChangesButton.style.display = 'block';
    modifySaveButton.style.display = 'none';
  }
}

function info(text) {
  const divInfo = document.createElement('div');
  const divInfoWrapper = document.createElement('div');
  const infoHeader = document.createElement('p');
  const infotext = document.createElement('p');
  const divExit = document.createElement('div');
  const exitOne = document.createElement('div');
  const exitTwo = document.createElement('div');

  divInfo.classList.add('info');
  divInfoWrapper.classList.add('info_wrapper');
  infoHeader.classList.add('info_header');
  infotext.classList.add('info_text');
  divExit.classList.add('exit');
  exitOne.classList.add('exit_one');
  exitTwo.classList.add('exit_two');

  infoHeader.textContent = 'Error!';
  infotext.textContent = text;

  divInfo.appendChild(divInfoWrapper);
  divInfoWrapper.appendChild(infoHeader);
  divInfoWrapper.appendChild(infotext);
  divInfoWrapper.appendChild(divExit);
  divExit.appendChild(exitOne);
  divExit.appendChild(exitTwo);

  divExit.addEventListener('click', () => divInfo.remove());

  if(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
    divInfo.style.top = '10px';
    divInfo.style.left = '50px';
  } else {
    divInfo.style.top = '10px';
    divInfo.style.right = '50px';
  }
  rootNode.appendChild(divInfo);
  return divInfo;
}

