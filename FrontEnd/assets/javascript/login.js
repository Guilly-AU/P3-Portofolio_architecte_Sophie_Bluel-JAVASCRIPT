document.querySelector("#btn-login").onclick = (e) => {
  e.preventDefault();

  const error = document.querySelector("#error");
  const emailAddress = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const user = {
    email: emailAddress,
    password: password,
  };

  const emailCheck = document.getElementById("email");
  const passwordCheck = document.getElementById("password");
  passwordCheck.reportValidity();
  emailCheck.reportValidity();

  if (
    emailCheck.checkValidity() === false ||
    passwordCheck.checkValidity() === false
  ) {
    return;
  } else {
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          error.innerHTML = "Erreur dans l'identifiant";
        } else if (res.status === 401) {
          error.innerHTML = "Erreur dans le mot de passe";
        }
      })
      .then((userLogged) => {
        console.log(userLogged);
        if (userLogged === undefined) {
          return;
        } else {
          validateUser(userLogged);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

function validateUser(userLogged) {
  const userId = userLogged.userId;
  if (userId !== undefined) {
    localStorage.setItem("token", userLogged.token);
    localStorage.setItem("userId", userLogged.userId);
    document.location.href = "./index.html";
  } else {
  }
  console.log(userId);
}
