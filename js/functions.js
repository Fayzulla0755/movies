function reularToSolid(evt){
    if(evt.matches('.fa-regular')){
        evt.classList.remove('fa-regular');
        evt.classList.add('fa-solid');
    }else{
        evt.classList.add('fa-regular');
        evt.classList.remove('fa-solid');
    }
}
function updateBookmark(film){
    viewBokmarks(film);
    window.localStorage.setItem('bookmark',JSON.stringify(films));
    viewFilms(films);
}
let bookmarkFragment=document.createDocumentFragment();
let filmFragment=document.createDocumentFragment();
updateBookmark(films.filter(film=>film.bookmark===true));
function viewBokmarks(film){
    elBookmarkList.innerHTML=null;
    film.forEach(f=>{
        const newList=document.createElement('li');
        const newH3=document.createElement('h3');
        const newDelBtn=document.createElement('button');
        newDelBtn.dataset.filmId=f.id
        newDelBtn.setAttribute('type','button');
        newDelBtn.setAttribute('class','btn-close');
        newDelBtn.setAttribute('aria-label','Close');
        newList.classList.add('list-group-item');
        newH3.textContent=f.title;
        newList.appendChild(newH3);
        newList.appendChild(newDelBtn);
        bookmarkFragment.appendChild(newList);
    });
    elBookmarkList.appendChild(bookmarkFragment);
}
function viewFilms (film){
    elFilmList.innerHTML=null;
    film.forEach(film=>{
    const newCard=document.createElement('div');
    const newTitle=document.createElement('h3');
    const newImg=document.createElement('img');
    const newControl=document.createElement('div');
    const newI1=document.createElement('i');
    const newI2=document.createElement('i');
    const newI3=document.createElement('i');
    const newI4=document.createElement('i');
    newI1.dataset.filmId=film.id;
    newI2.dataset.filmId=film.id;
    newI3.dataset.filmId=film.id;
    newI4.dataset.filmId=film.id;
    newI3.dataset.bsToggle="modal";
    newI3.dataset.bsTarget="#exampleModal";   
    newI1.setAttribute('class','fa-regular fa-heart');
    newI4.setAttribute('class','fa-regular fa-bookmark');  
    newI2.setAttribute('class','fa-solid fa-trash ');
    newI3.setAttribute('class','fa-solid fa-circle-exclamation ');
    if(film.like){
        newI1.setAttribute('class','fa-solid fa-heart');
    }
    if(film.bookmark){
        newI4.setAttribute('class','fa-solid fa-bookmark'); 
    }
    newI3.style.cursor="pointer";
    newI1.style.cursor="pointer";
    newI2.style.cursor="pointer";
    newI4.style.cursor="pointer";
    newControl.appendChild(newI1);
    newControl.appendChild(newI2);
    newControl.appendChild(newI3);
    newControl.appendChild(newI4);
    newControl.style.color='#198754';
    newControl.setAttribute('class','controlList card-footer');
    newCard.classList.add('card');
    newCard.style="width: 18rem; height:25rem;";
    newImg.classList.add('card-img-top');
    newImg.style.height='15rem'
    newImg.setAttribute('src',film.poster);
    newImg.setAttribute('alt',film.poster+' poster');
    newTitle.textContent=film.title;
    newCard.appendChild(newImg);
    newCard.appendChild(newTitle);
    newCard.appendChild(newControl);
    filmFragment.appendChild(newCard)
    })
    if(film.length===0){
        const newAlert=document.createElement('div');
        newAlert.setAttribute('class','alert alert-info');
        newAlert.setAttribute('role','alert');
        newAlert.textContent='Movie is not available !!';
        elFilmList.appendChild(newAlert);
    }
    elFilmList.appendChild(filmFragment);
}
