document.querySelector('#btn-login').onclick = (e) => {
  e.preventDefault();
  const emailAddress = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  let error;
  const user = {
    email: emailAddress,
    password: password
    };
    
  if (!password) {
    error = "Veuillez renseigner un mot de passe";
  }
  if (!emailAddress) {
    error = "Veuillez renseigner un email";
  }
  if (error) {
    document.getElementById('error').innerHTML = error;
    return false;
  }
   
  fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  })
    .then((res) => res.json())
    .then((loggedInUser) => {
      validateUser(loggedInUser);
      console.log(loggedInUser);
  });
}

function validateUser(loggedInUser) {
  const userId = loggedInUser?.userId;
  if (userId !=null) {
    localStorage.setItem('token', loggedInUser.token);
    document.location.href='./index.html'
  } else {
    document.getElementById('error').innerHTML = "Erreur dans l'identifiant ou le mot de passe";
  }
  console.log(userId);
}