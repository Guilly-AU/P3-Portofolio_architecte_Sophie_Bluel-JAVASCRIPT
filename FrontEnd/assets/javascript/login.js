
let user = {
    email: 'sophie.bluel@test.tld',
    password: 'S0phie'
  };
  
  fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  })
    .then((res) => res.json())
    .then((loggedInUser) => {
      console.log(loggedInUser);
    });
  

// let email = document.getElementById('email').value;
// let password = document.getElementById('password').value;

// if (email === user.email && password === user.password)
// {
//     alert('login successfuly!');
// } else {
//     alert('login failed');
// }
// console.log(email);
// console.log(password);

