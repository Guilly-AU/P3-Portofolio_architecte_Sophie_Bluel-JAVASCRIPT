// Recovery of all jobs
function getAllWorks() {
    fetch("http://localhost:5678/api/works")
        .then(res => {
            if (res.ok) {
                res.json().then(result => {
                    createArticle(result);
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
createButton('Tous', 'btn-tous');
createButton('Objets', 'btn-objets');
createButton('Appartements', 'btn-appartements');
createButton(`Hôtels & restaurants`, 'btn-hotels');

getAllWorks();
