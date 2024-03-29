const modalLink = document.querySelector(".js-modal");
const modal = document.querySelector(".modal");
const navModal = document.querySelector(".nav-modal");
const titleModal = document.querySelector("#title-modal");
const container = document.querySelector(".container");
const btnReturn = document.querySelector(".modal-return");
const btnClose = document.querySelector(".modal-close");
const btnAddPhoto = document.querySelector(".btn-add-photo");
const btnValid = document.querySelector(".btn-valid");
const btnDeleteAll = document.querySelector(".btn-delete-all");

//Prevent submistion of the form
container.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Function for open the modal
modalLink.onclick = function () {
  modal.style.display = null;
};

// Function for close the modal
btnClose.onclick = function () {
  modal.style.display = "none";
};

// Function for open the Add photo modal
btnAddPhoto.onclick = function () {
  createAddPhotoModal();
};

// Function for return to the previous modal
btnReturn.onclick = function () {
  container.innerHTML = "";
  createGalerieWork();
};

// Function for add work
btnValid.addEventListener("click", addWork);

// Function to close the modal on click
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

// Function to close the modal with ESC
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    modal.style.display = "none";
  }
});

// Function to create the gallery modal
function createGalerieModal() {
  container.style.display = "grid";
  titleModal.textContent = "Photo gallery";
  btnAddPhoto.value = "Add photo";
  btnValid.style.display = "none";
  btnReturn.style.display = "none";
  navModal.style.justifyContent = "end";
  btnDeleteAll.style.display = "block";
  btnAddPhoto.style.display = "block";
}

// Function to display the works on the modal gallery
function createGalerieWork() {
  createGalerieModal();
  works.forEach((article) => {
    let articleElement = document.createElement("figure");
    articleElement.setAttribute("class", "works");
    articleElement.dataset.id = article.id;
    let imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    let editElement = document.createElement("p");
    editElement.innerText = "Edit";
    let flexButton = document.createElement("div");
    flexButton.classList.add("flex-button");
    // Create of the button to delete work
    let btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-delete");
    btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    let btnExtend = document.createElement("button");
    btnExtend.classList.add("btn-extend");
    btnExtend.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>';

    articleElement.addEventListener("mouseenter", () => {
      btnExtend.style.opacity = "1";
    });
    articleElement.addEventListener("mouseleave", () => {
      btnExtend.style.opacity = "0";
    });

    // Confirmation before delete works
    btnDelete.addEventListener("click", () => {
      if (confirm("Do you want to delete?")) {
        deleteWork(article.id);
      } else {
        return;
      }
    });
    // Display all the elements
    articleElement.append(flexButton);
    flexButton.append(btnExtend);
    flexButton.append(btnDelete);
    articleElement.append(imageElement);
    articleElement.append(editElement);
    container.append(articleElement);
  });
}

// Fonction for delete work
function deleteWork(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "delete",
    headers: {
      Authorization: `bearer ${localStorage.token}`,
    },
  })
    // API response management
    .then((response) => {
      if (response.ok) {
        alert("Project deleted");
      } else if (response.status === 401) {
        alert("You are not authorized to edit the content.");
      } else if (response.status === 500) {
        alert("Server problem");
      } else {
        alert(`Error: ${response.status}`);
      }
    })
    .catch((err) => {
      alert("Error 404, server problem:" + err);
    });
}

// Function to creat the add project modal
function createAddPhotoModal() {
  createCategory();
  container.style.display = "flex";
  container.style.flexDirection = "column";
  titleModal.textContent = "Add Photo";
  btnReturn.style.display = "block";
  btnDeleteAll.style.display = "none";
  btnValid.style.display = "block";
  btnValid.removeEventListener("click", addWork);
  btnValid.style.backgroundColor = "grey";
  btnAddPhoto.style.display = "none";
  navModal.style.justifyContent = "space-between";
  // Create the form for add the new project
  container.innerHTML = `
    <form action="#" method="post">
    <div class="photo-preview">
    </div>
    <div class="upload-container">
        <i class="fa-regular fa-image"></i>
    <div class="upload-image">
        <button class="btn-upload">+ Add photo</button>
        <input type="file" name="upfile" id="upload-photo" onchange="displayPhoto()"/
            accept=".jpg, .png">
    </div>
        <p>jpg, png: 4mo max</p>
    </div>
    <label for="title" name="title">Title</label>
    <input type="text" name="title" id="title">
    <label for="category">Category</label>
    <select name="category" id="category">
    </form>`;
  // Check if the form is complete
  const title = document.querySelector("#title");
  title.addEventListener("input", checkInputForm);
}

// Function to display a preview of the photo uploaded
function displayPhoto() {
  const picture = document.querySelector("#upload-photo").files[0];
  const photoWrapper = document.querySelector(".upload-container");
  const photoPreview = document.querySelector(".photo-preview");

  if (picture.type !== "image/jpeg" && picture.type !== "image/png") {
    alert("The file must be in JPG or PNG format");
    return;
  }

  if (picture.size > 4194304) {
    alert("Check the file size");
    return;
  }

  if (picture) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.setAttribute("class", "uploaded");
      img.src = e.currentTarget.result;
      photoWrapper.style.display = "none";
      photoPreview.append(img);
    };
    reader.readAsDataURL(picture);
    checkInputForm();
  }
}

// Function to create the category option of the form
function createCategory() {
  fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((result) => {
      console.table(result);
      let categoryselect = document.querySelector("#category");
      result.forEach((category) => {
        let newOption = document.createElement("option");
        newOption.value = category.id;
        newOption.innerHTML = category.name;
        categoryselect.append(newOption);
      });
    })
    .catch((err) => {
      alert("Error 404, server problem:" + err);
    });
}

// Function to check if the form is complet, IF complete allow the user to send the form to the API
function checkInputForm() {
  const picture = document.querySelector("#upload-photo").files[0];
  const title = document.querySelector("#title").value;

  const fileCheck = picture;
  const titleCheck = title.length > 0;

  const isComplete = fileCheck && titleCheck;

  btnValid.style.backgroundColor = isComplete ? "#1D6154" : "grey";

  if (isComplete) {
    btnValid.addEventListener("click", addWork);
  } else {
    btnValid.removeEventListener("click", addWork);
  }
}

// Function to add the new project from the form
function addWork() {
  const picture = document.querySelector("#upload-photo").files[0];
  const title = document.querySelector("#title").value;
  const category = document.querySelector("#category").value;
  // Create a form data for the API
  const formData = new FormData();
  formData.append("image", picture);
  formData.append("title", title);
  formData.append("category", category);
  // Send the form data with POST with the token
  fetch("http://localhost:5678/api/works", {
    method: "post",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${localStorage.token}`,
    },
  })
    // API response management
    .then((response) => {
      if (response.ok) {
        alert("Project added");
      } else if (response.status === 400) {
        alert("Incomplete form");
      } else if (response.status === 401) {
        alert("Unauthorized user");
      } else if (response.status === 500) {
        alert("Unexpected error");
      } else {
        alert(`error: ${response.status}`);
      }
    })
    .catch((error) => alert(error));
}
