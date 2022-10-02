// Elements
const elBody=document.querySelector('body');
const elFilmList= document.querySelector('.film_list');
const elBookmarkList= document.querySelector('.bookmark_list');
const elDropdownGenres= document.querySelector('.dropdown-menu');
const elSearchInput= document.querySelector('.form-control');
const elSearchBtn=document.querySelector('.btn-outline-success');
const elModalTitle=document.querySelector('.modal-title');
const elModalBody=document.querySelector('.modal-body');
const elModal=document.querySelector('.modal-content');
let allGenres=[];
// Cycle's
films.forEach(film=>{
    film.genres.forEach(genress=>{
        if(!allGenres.includes(genress)){
            allGenres.push(genress)
        }})
    });
allGenres.forEach(genres=>{
    let newLi=document.createElement('li');
    let newAnchor=document.createElement('a');
    newAnchor.dataset.filmGenres=genres;
    newAnchor.setAttribute('class','dropdown-item');
    newAnchor.setAttribute('href','#');
    newLi.appendChild(newAnchor);
    newAnchor.textContent=genres;
    elDropdownGenres.appendChild(newLi);
});