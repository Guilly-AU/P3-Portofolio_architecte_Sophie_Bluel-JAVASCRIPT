const modalLink = document.querySelector('.js-modal');
const modal = document.querySelector('.modal');
const navModal = document.querySelector('.nav-modal');
const titleModal = document.querySelector('#title-modal');
const container = document.querySelector('.container');
const btnReturn = document.querySelector('.modal-return');
const btnClose = document.querySelector('.modal-close');
const btnAddPhoto = document.querySelector('.btn-add-photo');
const btnValid = document.querySelector('.btn-valid');
const btnDeleteAll = document.querySelector('.btn-delete-all');

modalLink.onclick = function () {
    modal.style.display = null;
};

btnClose.onclick = function () {
    modal.style.display = "none";
};

btnAddPhoto.onclick = function () {
    createAddPhotoModal();
};

btnReturn.onclick = function () {
    container.innerHTML = "";
    createGalerieWork();
};

btnValid.addEventListener('click', addWork);

window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc")  {
        modal.style.display = "none";
    }
});

function createGalerieModal() {
    container.style.display = 'grid';
    titleModal.textContent = 'Galerie photo';
    btnAddPhoto.value = 'Ajouter photo';
    btnValid.style.display ='none';
    btnReturn.style.display = 'none';
    navModal.style.justifyContent = 'end';
    btnDeleteAll.style.display = 'block';
    btnAddPhoto.style.display = 'block' 
};

function createGalerieWork() {
    createGalerieModal ()
    works.forEach(article => {
        let articleElement = document.createElement("figure");
        articleElement.setAttribute("class", "works");
        articleElement.dataset.id = article.id;
        let imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        let editElement = document.createElement("p");
        editElement.innerText = 'éditer';
        let flexButton = document.createElement('div');
        flexButton.classList.add('flex-button');
        let btnDelete = document.createElement('button');
        btnDelete.classList.add('btn-delete');
        btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        let btnExtend = document.createElement('button');
        btnExtend.classList.add('btn-extend');
        btnExtend.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>';

        articleElement.addEventListener('mouseenter', () => {
            btnExtend.style.opacity = '1';
        });

        articleElement.addEventListener('mouseleave', () => {
            btnExtend.style.opacity = '0';
        });

        btnDelete.addEventListener('click', () => {
            deleteWork(article.id);            
        });

        articleElement.append(flexButton);
        flexButton.append(btnExtend);
        flexButton.append(btnDelete);
        articleElement.append(imageElement);
        articleElement.append(editElement);
        container.append(articleElement);
        });
};

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
        } else if (response.status === 401) {
            alert("Vous n'êtes pas authorisé à modifier le contenu");
        } else if (response.status === 500) {
            alert("Problème avec le serveur");
        } else {
            alert(`erreur: ${response.status}`);
        }
    })
    .catch(error => {
        alert(`erreur lors de la suppression: ${error}`);
    });
};

function createAddPhotoModal() {
    createCategory()
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
    <div class="photo-preview">
    </div>
    <div class="upload-container">
        <i class="fa-regular fa-image"></i>
    <div class="upload-image">
        <button class="btn-upload">+ Ajouter photo</button>
        <input type="file" name="upfile" id="upload-photo" onchange="displayPhoto()"/
            accept=".jpg, .png">
    </div>
        <p>jpg, png: 4mo max</p>
    </div>
    <label for="title" name="title">Titre</label>
    <input type="text" name="title" id="title">
    <label for="category">Catégorie</label>
    <select name="category" id="category">
    </form>`; 
}

function displayPhoto () {
    const file = document.querySelector('#upload-photo').files[0];
    const photoWrapper = document.querySelector('.upload-container');
    const photoPreview = document.querySelector('.photo-preview');
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.setAttribute('class', 'uploaded');
            img.src = event.currentTarget.result;
            photoWrapper.style.display = 'none';
            photoPreview.append(img);
        }
        reader.readAsDataURL(file);
    }
}

function createCategory() {
    fetch('http://localhost:5678/api/categories')
        .then((res) => res.json())
        .then((result) => {
            console.table(result);
            let categoryselect = document.querySelector('#category');
            result.forEach(category => {
                let newOption = document.createElement('option');
                newOption.value = category.id;
                newOption.innerHTML = category.name;
                categoryselect.append(newOption);
            })
        })
}

function addWork() {
    const uploaded = document.querySelector('#upload-photo').files[0];
    const title = document.querySelector('#title').value;
    const category = document.querySelector('#category').value;
    const formData = new FormData();
    formData.append('image', uploaded);
    formData.append('title', title);
    formData.append('category', category);

    console.log(uploaded);
    console.log(category);
    console.log(title);
    
    fetch("http://localhost:5678/api/works", {
        method: 'post',
        body: formData,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `bearer ${localStorage.token}`,
        }
    })
    .then(response => {
        if(response.ok) {
            alert('photo ajouter');
        } else if(response.status === 400) {
            alert(`formulaire incomplet`);
        } else if(response.status === 401) {
            alert(`utilisateur non authoriser`);
        } else if(response.status === 500) {
            alert(`error inattendue`);
        } else {
            alert(`erreur: ${response.status}`);
        }
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
}