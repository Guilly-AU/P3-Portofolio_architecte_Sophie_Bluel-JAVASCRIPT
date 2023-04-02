document.querySelector('#btn-login').onclick = (e) => {
  e.preventDefault();
  const emailAddress = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const emailCheck = document.getElementById('email');
  const passwordCheck = document.getElementById('password');
  const user = {
    email: emailAddress,
    password: password
  };

  passwordCheck.reportValidity();
  emailCheck.reportValidity();

  if (emailCheck.checkValidity() === false || passwordCheck.checkValidity() === false) {
    return;
  } else {
    fetch("http://localhost:5678/api/users/login", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .then((UserLogged) => {
      validateUser(UserLogged);
      console.log(UserLogged);
    });
  }
}

function validateUser(UserLogged) {
  const userId = UserLogged.userId;
  if (userId !== undefined) {
    localStorage.setItem('token', UserLogged.token);
    localStorage.setItem('userId', UserLogged.userId);
    document.location.href='./index.html';
  } else {
    document.getElementById('error').innerHTML = "Erreur dans l'identifiant ou le mot de passe";
  }
  console.log(userId);
}
