// Recovery of all jobs
function getAllWorks() {
    fetch("http://localhost:5678/api/works")
        .then(res => {
            if (res.ok) {
                res.json().then(result => {
                    createArticle(result);
                    filtersAll(result);
                    filterObjets(result);
                    filterApartments(result);
                    filterHotels(result);
                    console.log(result);
                });
            }
            
        }); 
}
// Creation of article
function createArticle(result) {
    let sectionArticle = document.querySelector(".gallery");
    // For loop
    for (let i = 0; i < result.length; i++) {
        let article = result[i];
        // Retrieval of the DOM element that will host the article
        let articleElement = document.createElement("figure");
        articleElement.dataset.id = article.id;
        let imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        let nomElement = document.createElement("p");
        nomElement.innerText = article.title;
       
        articleElement.append(imageElement);
        articleElement.append(nomElement);
        sectionArticle.append(articleElement);
    }
}
// Filter button creation
const filters = document.querySelector(".filters");

function createButton(text, className) {
    const button = document.createElement("button");
    button.type = 'button';
    button.textContent = text;
    button.id = className;
    filters.appendChild(button);
}
// Call of the function to create the filter buttons
createButton('Tous', 'btn-all');
createButton('Objets', 'btn-objects');
createButton('Appartements', 'btn-apartments');
createButton(`Hôtels & restaurants`, 'btn-hotels');

function filtersAll(result) {

    const buttonAll = document.querySelector('#btn-all');
    buttonAll.addEventListener('click', function () {
        const allObjects = result.filter(obj => obj.categoryId != null);
        document.querySelector('.gallery').innerHTML = '';
        createArticle(allObjects);
    })
}
// Creation des filtres
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

getAllWorks();
