let modalLink = document.querySelector('.js-modal')
let modal = document.querySelector('.modal')
let navModal = document.querySelector('.nav-modal')
let titleModal = document.querySelector('#title-modal')
let container = document.querySelector('.container')
let btnReturn = document.querySelector('.modal-return')
let btnClose = document.querySelector('.modal-close')
let btnAddPhoto = document.querySelector('.btn-add-photo')
let btnValid = document.querySelector('.btn-valid')
let btnDeleteAll = document.querySelector('.btn-delete-all')

modalLink.onclick = function () {
    modal.style.display = null
}

btnClose.onclick = function () {
    modal.style.display = "none"
}

btnAddPhoto.onclick = function () {
    createAddPhotoModal()
}

window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

btnReturn.onclick = function () {
    fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((result) => {
            container.innerHTML = ""
            createGalerieWork(result)
        })
}

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc")  {
        modal.style.display = "none"
    }
})

function createGalerieModal() {
    container.style.display = 'grid';
    titleModal.textContent = 'Galerie photo';
    btnAddPhoto.value = 'Ajouter photo';
    btnValid.style.display ='none';
    btnReturn.style.display = 'none';
    navModal.style.justifyContent = 'end'
    btnDeleteAll.style.display = 'block';
    btnAddPhoto.style.display = 'block'    
}

function createGalerieWork(result) {
    createGalerieModal ()
    result.forEach(article => {
        let articleElement = document.createElement("figure");
        articleElement.setAttribute("class", "works");
        articleElement.dataset.id = article.id;
        let imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        let editElement = document.createElement("p");
        editElement.innerText = 'éditer';
        let flexButton = document.createElement('div')
        flexButton.classList.add('flex-button')
        let btnDelete = document.createElement('button')
        btnDelete.classList.add('btn-delete')
        btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        let btnExtend = document.createElement('button')
        btnExtend.classList.add('btn-extend')
        btnExtend.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>'

        articleElement.addEventListener('mouseenter', () => {
            btnExtend.style.opacity = '1';
        });

        articleElement.addEventListener('mouseleave', () => {
            btnExtend.style.opacity = '0';
        });

        btnDelete.addEventListener('click', () => {
            deleteWork(article.id);            
        })

        articleElement.append(flexButton);
        flexButton.append(btnExtend)
        flexButton.append(btnDelete)
        articleElement.append(imageElement);
        articleElement.append(editElement);
        container.append(articleElement);
        });
}

function deleteWork(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'delete',
        headers: {
            Authorization: `bearer ${localStorage.token}`,
        },
    })
    .then(response => {
        if(response.ok) {
            alert('suprimer');
        } else {
            alert(`erreur: ${response.status}`);
        }
    })
    .catch(error => {
        alert(`erreur lors de la suppression: ${error}`);
    });
}

function createAddPhotoModal() {
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    titleModal.textContent = 'Ajout Photo';
    btnReturn.style.display = 'block';
    btnDeleteAll.style.display = 'none';
    btnValid.style.display = 'block'
    btnAddPhoto.style.display = 'none'
    navModal.style.justifyContent = 'space-between';
    container.innerHTML = `
    <form action="#" method="post">
    <div class="upload-container">
        <i class="fa-regular fa-image"></i>
    <div class="upload-image">
      <button class="btn-upload">+ Ajouter photo</button>
      <input type="file" name="upfile" id="upload-photo" onchange="displayPhoto()"/>
    </div>
        <p>jpg, png: 4mo max</p>
    </div>
    <label for="title" name="title">Titre</label>
    <input type="text" name="title" id="title">
    <label for="category">Catégorie</label>
    <select name="category" id="category">
        <option value =""></option>
        <option id="choice1" value="choice1">Objets</option>
		<option id="choice2" value="choice2">Appartements</option>
        <option id="choice3" value="choice3">Hotels & restaurants</option>
    </form>`; 
}

function displayPhoto () {
    const file = document.querySelector('#upload-photo').files[0];
    const photoPreview = document.querySelector('.upload-container')

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.currentTarget.result;
            photoPreview.innerHTML = "";
            photoPreview.append(img);
        }
        reader.readAsDataURL(file);
    }
}

function createCategory () {
}

function addWork () {
    
}