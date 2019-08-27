url = 'https://jsonplaceholder.typicode.com';
let body = document.getElementsByTagName('body')[0];

// FOR USER PAGE
let mainBody = document.createElement('div');
mainBody.classList.add('outside_wrapper');
body.appendChild(mainBody);

// FOR COMMENTS PAGE
let commentsDom = document.createElement('div');
commentsDom.classList.add('user_postpage');
body.appendChild(commentsDom);

// FOR SPINNER ANIMATION
let animationAjax = document.createElement('div');
animationAjax.classList.add('animation');

// WORKING WITH REQUESTS
class Data{
  constructor(url) {
    this.url = url;
    this.usersArr = [];
    this.user = {};
  }

  async getUsers() {
    try{
      mainBody.appendChild(animationAjax);
      let response = await fetch(`${this.url}/users`);
      this.usersArr = await response.json();
      this.usersArr = this.usersArr.map(({id, name, email, phone}) => {return {id, name, email, phone}});
      animationAjax.remove();
      return this.usersArr;
    } catch (error) {
      animationAjax.remove();
      throw new Error(`Data load failure.`);
    }
  }

  async put(obj) {
    try {
      mainBody.appendChild(animationAjax);
      let response = await fetch(`${this.url}/users/${obj.id}`,
          {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }
      );

      this.user = await response.json();
      this.updateUsers();
      animationAjax.remove();
      return this.user;
    } catch(error) {
      animationAjax.remove();
      throw new Error(error);
    }
  }

  async deleteUser(obj) {
    try {
      mainBody.appendChild(animationAjax);
      let response = fetch(`${this.url}/users/${obj.id}`, {
        method: 'DELETE'
      });
      this.updateUsers(obj.id);
      animationAjax.remove();
    } catch(error) {
      console.log(error);
    }
  }

  async getPosts(id) {
    body.appendChild(animationAjax);
    let response = await fetch(`${url}/posts?userId=${+id}`,
        {
          method: 'GET'
        }
    );
    let postsArr = await response.json();
    animationAjax.remove();
    return postsArr;
  }

  async getComments(postId) {
    body.appendChild(animationAjax);
    let response = await fetch(`${url}/comments?postId=${postId}`,
        {
          method: 'GET'
        }
    );
    let commentsArr = await response.json();
    animationAjax.remove();
    return commentsArr;
  }

  updateUsers(objectId) {
    if(objectId) {
      // DELETE USER FROM ARRAY
      this.usersArr.forEach((obj, index) => {
        if(obj.id === +objectId) {
          this.usersArr.splice(index, 1);
        }
      });
    } else {
      // UPDATE ARRAY IF USER CHANGED
      this.usersArr = this.usersArr.map(item => {
        if(item.id === this.user.id) {
           item = this.user;
        }
        return item;
      });
    }
  }

  async getCats() {
    try{
      mainBody.appendChild(animationAjax);
      let response = await fetch(`https://api.thecatapi.com/v1/images/search?size=full`);
      let cat = await response.json();
      let catUrl = await cat[0].url;
      animationAjax.remove();
      return catUrl
    } catch (error) {
      animationAjax.remove();
      throw new Error(`Cat load failure.`);
    }
  }
}

class userDom {
  constructor() {
    this.div = document.createElement('div');
    this.div.classList.add('wrapper');
  }
  // SHOW ALL USERS AND AVATARS ON THE PAGE
  drawUser(user, cat) {
    length = Object.keys(user).length;
    let fragment = document.createDocumentFragment();
    let eachUserWrapper = document.createElement('div');
    eachUserWrapper.classList.add('user_wrapper');
    let ul = document.createElement('ul');
    ul.classList.add('user');
    ul.addEventListener('click', openEdit);
    eachUserWrapper.appendChild(ul);
    fragment.appendChild(eachUserWrapper);

    for(let key in user) {
      // MAKE USERS LIST
      let li = document.createElement('li');
      li.classList.add('user_item');

      li.textContent = user[key];
      li.classList.add(key);
      ul.classList.add(`id${user.id}`);
      ul.appendChild(li);

    }
    // MAKE CATS
    let avatar = document.createElement('div');
    avatar.classList.add('user_avatar');
    avatar.style.background = `url('${cat}') no-repeat`;
    avatar.style.backgroundSize = 'cover';
    eachUserWrapper.appendChild(avatar);

    // MAKE DELETE ICON
    let deleteIcon = document.createElement('div');
    deleteIcon.classList.add('user_delete');
    let deleteIconInside1 = document.createElement('div');
    let deleteIconInside2 = document.createElement('div');
    deleteIconInside1.classList.add('delete');
    deleteIconInside2.classList.add('delete');
    deleteIcon.appendChild(deleteIconInside1);
    deleteIcon.appendChild(deleteIconInside2);
    ul.appendChild(deleteIcon);
    deleteIcon.addEventListener('click', removeUser);

    this.div.appendChild(fragment);
    return this.div;
  }
  // MAKE JS USER OBJECT FROM DOM LIST (CAN BE USED FOR PUT REGUEST)
  buildUser(ul) {
    let liArr = ul.getElementsByTagName('li');
    let obj = {};
    for(let i = 0; i < liArr.length; i++) {
      if(liArr[i].classList.contains('id')) {
        obj.id = liArr[i].textContent.trim();
      }
      if(liArr[i].classList.contains('name')) {
        obj.name = liArr[i].textContent.trim();
      }
      if(liArr[i].classList.contains('email')) {
        obj.email = liArr[i].textContent.trim();
      }
      if(liArr[i].classList.contains('phone')) {
        obj.phone = liArr[i].textContent.trim();
      }
    }
    return obj;
  }
}

let newPrintedUser = new userDom();
let newData = new Data(url);

async function main() {
  let arr = await newData.getUsers();
  print(newPrintedUser, arr);
}

main();

// SHOW ALL USERS ON THE PAGE
 function print(userDom, userArr, cat) {
  userArr.forEach(async (item) => {
    let cat =  await newData.getCats();
    mainBody.appendChild(userDom.drawUser(item, cat));
  })
}

// EDIT USER DATA
async function openEdit(event) {

  let ul = event.target.parentElement;
  let div = document.createElement('div');
  div.classList.add('user_edit');

  // MAKE SAVE BUTTON
  let button = document.createElement('button');
  button.classList.add('save');
  button.type = 'button';
  button.innerHTML = 'Save';

  // MAKE INPUT FIELDS FOR EDITING
  let inputName = document.createElement('input');
  let inputEmail = document.createElement('input');
  let inputPhone = document.createElement('input');
  inputName.classList.add('input_edit');
  inputEmail.classList.add('input_edit');
  inputPhone.classList.add('input_edit');
  inputName.placeholder = 'input new name';
  inputEmail.placeholder = 'input new email';
  inputPhone.placeholder = 'input new phone';

  if(event.target.nodeName == 'LI') {
    let li = event.target;
    // CHECK IF NAME CLICKED
    if(li === ul.querySelector(':nth-child(2)')) {
      // OPEN COMMENTS ELEMENTS
      mainBody.style.display = 'none';
      let clickedUserId = getId(li);
      await showComments(clickedUserId);
    } else {
      ul.removeEventListener('click',openEdit);
      ul.appendChild(div);
      div.appendChild(inputName);
      div.appendChild(inputEmail);
      div.appendChild(inputPhone);
      div.appendChild(button);
      button.addEventListener('click', save);
    }
  }
}

async function showComments(clickedUserId) {
  commentsDom.style.display = 'flex';
  let userPosts = document.createElement('div');
  userPosts.classList.add('user_posts');
  let fragment = document.createDocumentFragment();
  commentsDom.appendChild(userPosts);

  // MAKE RETRUN BUTTON
  let button = document.createElement('button');
  button.classList.add('return');
  button.textContent = 'Back to Users';
  button.addEventListener('click', backToUsers);


  let posts = await newData.getPosts(clickedUserId);
    posts.forEach(async (item, index, arr) => {
    let comments = await newData.getComments(item.id);
    // BUILD POSTS DOM
    let onePost = document.createElement('div');
    onePost.classList.add('onepost');
    let userPostsTitle = document.createElement('div');
    userPostsTitle.classList.add('post_title');
    let userPostsBody = document.createElement('div');
    userPostsBody.classList.add('post_body');

    userPostsTitle.textContent = item.title;
    userPostsBody.textContent = item.body;

    onePost.appendChild(userPostsTitle);
    onePost.appendChild(userPostsBody);

    comments.forEach(obj => {
      // BUILD COMMENTS DOM
      let commentsWrapper = document.createElement('div');
      commentsWrapper.classList.add('comments_wrapper');
      commentsWrapper.textContent = 'Comments';
      let divComments = document.createElement('div');
      divComments.classList.add('user_comments');
      let divCommentsHeader = document.createElement('div');
      divCommentsHeader.classList.add('comments_header');
      let divCommentsBody = document.createElement('div');
      divCommentsBody.classList.add('comments_body');
      let divAuthor = document.createElement('div');
      let divEmail = document.createElement('div');

      divCommentsHeader.appendChild(divAuthor);
      divCommentsHeader.appendChild(divEmail);
      divComments.appendChild(divCommentsHeader);
      divComments.appendChild(divCommentsBody);

      divAuthor.textContent = obj.name;
      divEmail.textContent = obj.email;
      divCommentsBody.textContent = obj.body;

      // ADD COMMENTS TO POST
      commentsWrapper.appendChild(divComments);
      onePost.appendChild(commentsWrapper);
    });

    fragment.appendChild(onePost);

    if(index == arr.length - 1) {
      userPosts.appendChild(fragment);
      userPosts.appendChild(button);
    }
  });
}
// GET USER ID FROM UL ELEMENT
function getId(domElement) {
  let reg = /id[1-9]/;
  return  domElement.parentElement.className.match(reg)[0].substr(-1);
}


// SAVE CHANGES TO USER AND SEND PUT REQUEST
function save(event) {
  let buttonSave = event.target;
  let inputPhone = buttonSave.previousElementSibling;
  let inputEmail = inputPhone.previousElementSibling;
  let inputName = inputEmail.previousElementSibling;
  let ul = buttonSave.closest('ul');
  let li = ul.getElementsByTagName('li');
  let checkInput = false;

  // CHECK IF THERE IS USER ENTER SMTH TO UPDATE LIST
  li[1].textContent = inputName.value.trim() ? inputName.value : li[1].textContent;
  li[2].textContent = inputEmail.value.trim() ? inputEmail.value : li[2].textContent;
  li[3].textContent = inputPhone.value.trim() ? inputPhone.value : li[3].textContent;

  if(!inputName.value.trim() && !inputEmail.value.trim() && !inputPhone.value.trim()) {
    alert('You didnt change anything. To update server data, try to change smth');
  } else {
    let newObj = newPrintedUser.buildUser(ul);
    newData.put(newObj);
  }

  ul.addEventListener('click', openEdit);
  event.target.parentElement.remove();
}

function removeUser(event) {
  let div = event.target;
  let ul = div.closest('ul');
  let userWrapper = ul.closest('div');

  ul.removeEventListener('click',openEdit);

  let obj = newPrintedUser.buildUser(ul);
  newData.deleteUser(obj);

  userWrapper.remove();
  ul.addEventListener('click',openEdit);
}

function backToUsers(event) {
  mainBody.style.display = 'block';
  commentsDom.innerHTML = '';
  commentsDom.style.display = 'none';
}