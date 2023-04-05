let modal = null
let titleModal = document.querySelector('#title-modal')
let btnReturn = document.querySelector('.modal-return')
let btnClose = document.querySelector('.modal-close')
let navModal = document.querySelector('.nav-modal')
// const focusableSelector = 'button, a, input'
// let focusables = []


const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    // focusables = Array.from(modal.querySelectorAll(focusableSelector))
    // focusables[0].focus()
    modal.style.display = null
    // modal.removeAttribute('aria-hidden')
    // modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

}


const closeModal = function (e) {
    if(modal === null) return
    e.preventDefault()
    modal.style.display = 'none'
    // modal.setAttribute('aria-hidden', 'true')
    // modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

// const focusInModal = function (e) {
//     e.preventDefault()
//     let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
//     if (e.shiftKey === true) {
//         index--
//     } else {
//         index++
//     }
//     if (index >= focusables.length) {
//         index = 0
//     }
//     if (index < 0) {
//         index = focusables.lenght -1
//     }
//     focusables[index].focus()
// }

document.querySelector('.js-modal').addEventListener('click', openModal);
    
window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc")  {
        closeModal(e)
    }
    // if (e.key === 'Tab' && modal !== null) {
    //     focusInModal(e)
    // }
})

function createGalerieModal(result) {

    let sectionArticle = document.querySelector(".edit-gallery");
    
    titleModal.textContent = 'Galerie photo';
    btnReturn.style.display = 'none';
    navModal.style.justifyContent = 'end';

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
            // deleteWork() {}
        })



        articleElement.append(flexButton);
        flexButton.append(btnExtend)
        flexButton.append(btnDelete)
        articleElement.append(imageElement);
        articleElement.append(editElement);
        sectionArticle.append(articleElement);
    });
}

function deleteWork () {
    fetch('http://localhost:5678/api/works/1')
    
}