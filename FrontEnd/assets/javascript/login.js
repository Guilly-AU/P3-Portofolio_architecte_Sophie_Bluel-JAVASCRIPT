// Attach click event listenner to login button
document.querySelector('#btn-login').onclick = (e) => {
  e.preventDefault();
  // Get the email and password values entered by the user
  let emailAddress = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let error;
  // Create a user object with email and password properties
  let user = {
    email: emailAddress,
    password: password
    };
  // If the password is not entered, set an error message
  if (!password) {
    error = "Veuillez renseigner un mot de passe";
  }
  // If the email is not entered, set an error message
  if (!emailAddress) {
    error = "Veuillez renseigner un email";
  }
  // If there is an error, display it and return false to prevent form submission
  if (error) {
    e.preventDefault();
    document.getElementById('error').innerHTML = error;
    return false;
  } else {
    console.log(emailAddress);
    console.log(password);
    console.log(user);
    // Convert user object to JSON string
    const json = JSON.stringify(user);
  }
  // Send a POST request to login endpoint with user object as request body 
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
// Function to validate the loggedInUser object returned from the server
function validateUser(loggedInUser) {
  const userId = loggedInUser?.userId;
  // If the userId exists, save the token to localStorage and display a welcome message
  if (userId !=null) {
    localStorage.setItem('token', loggedInUser.token);
    alert('Bienvenue');
  } else {
    document.getElementById('error').innerHTML = "Erreur dans l'identifiant ou le mot de passe";
  }
  console.log(userId);
}