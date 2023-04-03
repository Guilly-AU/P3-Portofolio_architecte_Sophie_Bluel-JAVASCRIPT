const token = localStorage.getItem('token');
const filters = document.querySelector(".filters");
const login = document.getElementById("login");

fetch("http://localhost:5678/api/works")
.then((res) => res.json())
.then((result) => {
    if (token) {
        login.innerHTML = "logout";
        login.addEventListener("click", function() {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            login.setAttribute("href", "index.html");
        });
        createArticle(result);
        blackBar();
        editPhoto();
        modaleLink();
    } else {
        createArticle(result);
        createButton('Tous', 'btn-all');
        createButton('Objets', 'btn-objects');
        createButton('Appartements', 'btn-apartments');
        createButton(`Hôtels & restaurants`, 'btn-hotels');
        filtersAll(result);
        filterObjets(result);
        filterApartments(result);
        filterHotels(result);
        console.table(result);
    }
})
.catch((err) => {
    document.querySelector("header").innerHTML = "<h1>erreur 404</h1>";
    console.log("error 404, api not responding:" + err);
});
    

function createArticle(result) {
    let sectionArticle = document.querySelector(".gallery");
    result.forEach(article => {
        let articleElement = document.createElement("figure");
        articleElement.dataset.id = article.id;
        let imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        let nomElement = document.createElement("p");
        nomElement.innerText = article.title;
       
        articleElement.append(imageElement);
        articleElement.append(nomElement);
        sectionArticle.append(articleElement);
    });
}

function createButton(text, className) {
    const button = document.createElement("button");
    button.type = 'button';
    button.textContent = text;
    button.id = className;
    filters.appendChild(button);
}

function filtersAll(result) {
    const buttonAll = document.querySelector('#btn-all');
    buttonAll.addEventListener('click', function () {
        const allObjects = result.filter(obj => obj.categoryId != null);
        document.querySelector('.gallery').innerHTML = '';
        createArticle(allObjects);
    })
};

function filterObjets(result) {
    const buttonObjects = document.querySelector('#btn-objects');
    buttonObjects.addEventListener('click', function () {
        const filteredObjects = result.filter(obj => obj.categoryId === 1);
        document.querySelector('.gallery').innerHTML = '';
        createArticle(filteredObjects);
    });
};

function filterApartments(result) {
    const buttonApartments = document.querySelector('#btn-apartments');
    buttonApartments.addEventListener('click', function () {
        const filteredApartments = result.filter(obj => obj.categoryId === 2);
        document.querySelector('.gallery').innerHTML = '';
        createArticle(filteredApartments);
    });
};

function filterHotels(result) {   
    const buttonHotels = document.querySelector('#btn-hotels');
    buttonHotels.addEventListener('click', function () {
        const filteredHotels = result.filter(obj => obj.categoryId === 3);
        document.querySelector('.gallery').innerHTML = '';
        createArticle(filteredHotels);
    });
};

function blackBar() {
    let blackBar = document.querySelector("header");
    let sectionMode = document.createElement("div");
    sectionMode.setAttribute("id", "edition-mode");
    let icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    let h3 = document.createElement("h3");
    h3.innerHTML = "Mode édition";
    let link = document.createElement("a");
    link.setAttribute('href', '#');
    link.textContent = 'publier les changements';

    blackBar.parentNode.insertBefore(sectionMode, blackBar);
    sectionMode.append(icon);
    sectionMode.append(h3);
    sectionMode.append(link);
};

function modaleLink() {
    const target = document.querySelector(".modal-link");
    target.style.display = 'block';
}

function editPhoto() {
    let editPhoto = document.querySelector("#edit-photo");
    let icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    let link = document.createElement("a");
    link.setAttribute('href', '#');
    link.textContent = 'modifier';
    editPhoto.append(icon);
    editPhoto.append(link);
}