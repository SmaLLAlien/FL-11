let inputEmail = prompt('enter your email');
const minEmailLength = 6;
const minNewPassLength = 5;

// STEP 1
if(inputEmail === null || !inputEmail.trim()) {
  alert('Canceled');
} else {
  inputEmail = inputEmail.trim();
  if(inputEmail.length < minEmailLength) {
    alert("I don't know any emails having name length less than 6 symbols");
  } else {
    if(inputEmail === 'user@gmail.com' || inputEmail === 'admin@gmail.com') {
      let inputPass = prompt('Enter password');
      // STEP 2
      if(inputPass === null || !inputPass.trim()) {
        alert('Canceled');
      } else {
        inputPass = inputPass.trim();
        if(inputEmail === 'user@gmail.com' && inputPass === 'UserPass' ||
            inputEmail === 'admin@gmail.com' && inputPass === 'AdminPass') {
            // STEP 3
            let isAgreeToChangePass = confirm('Do you want to change your password?');
            if(isAgreeToChangePass) {
              let oldPass = prompt('Enter your current password');
              if(oldPass === null || !oldPass.trim()) {
                alert('Canceled');
              } else {
                if(oldPass === inputPass) {
                  let newPass = prompt('Enter new password');
                  if(newPass === null || !newPass.trim()) {
                    alert('Canceled');
                  } else {
                    if(newPass.length < minNewPassLength) {
                      alert('It’s too short password. Sorry');
                    } else {
                      let newPassRepeat = prompt('Repeat password');
                      if(newPassRepeat === null || !newPassRepeat.trim()) {
                        alert('Canceled');
                      } else {
                        newPassRepeat === newPass ? alert('You have successfully changed your password'):
                            alert('You wrote the wrong password');
                      }
                    }
                  }
                } else {
                  alert('Wrong password');
                }
              }
            } else {
              alert('You have failed the change.');
            }
        // STEP 2
        } else {
          alert('Wrong password');
        }
      }
    // STEP 1
    } else {
      alert('I don’t know you');
    }
  }
}
