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
const date=new Date();

// Varebel

let allGenres=[];
let allLikeAndBookmark=[];

// Function's


films.forEach(film=>{
    film.genres.forEach(genress=>{
        if(!allGenres.includes(genress)){
            allGenres.push(genress)
        }})
        allLikeAndBookmark.push({
            id: film.id,
            like :false,
            bookmark:false
        })
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
function reularToSolid(evt){
    if(evt.matches('.fa-regular')){
        evt.classList.remove('fa-regular');
        evt.classList.add('fa-solid');

    }else{
        evt.classList.add('fa-regular');
        evt.classList.remove('fa-solid');

    }

}
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
        elBookmarkList.appendChild(newList);

    })
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
    elFilmList.appendChild(newCard)
    })
    if(film.length===0){
        const newAlert=document.createElement('div');
        newAlert.setAttribute('class','alert alert-info');
        newAlert.setAttribute('role','alert');
        newAlert.textContent='Movie is not available !!';
        elFilmList.appendChild(newAlert);
    }
}

//  Events
elDropdownGenres.addEventListener('click',(evt)=>{
    const foundGenres= evt.target.dataset.filmGenres;
    if(foundGenres==='All'){
        viewFilms(films)
    }
    else{
        foundFilm=films.filter(film=>{ return film.genres.includes(foundGenres)});
        viewFilms(foundFilm);
    }
    
    
})

elSearchBtn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    const searchValue = elSearchInput.value.toLowerCase();
    const foundFilm=films.filter(film=>{
        const filmTitle=film.title.toLowerCase();
        return filmTitle.includes(searchValue)
    });
    console.log(foundFilm);
    viewFilms(foundFilm);

})

elBody.addEventListener('click',(evt)=>{
    evt.preventDefault();
    const foundElment=evt.target;
    if(foundElment.matches('.fa-heart')){
        //Yurakcha
        reularToSolid(foundElment);
        const filmId=foundElment.dataset.filmId;
        const foundIndex=films.findIndex(film=>film.id===filmId);
        films[foundIndex].like=!films[foundIndex].like;


    }else if(foundElment.matches('.fa-trash')){
        //uchirish
        const filmId=foundElment.dataset.filmId;
        const filmIndex=films.findIndex(film=>film.id===filmId);
        films.splice(filmIndex,1);
        console.log(filmIndex);

        viewFilms(films);

    }else if(foundElment.matches('.fa-circle-exclamation')){
        //madalka
        elModalBody.textContent=null;
        elModalTitle.textContent=null;
        const filmId=foundElment.dataset.filmId;
        const filmIndex=films.findIndex(film=>film.id===filmId);
        elModalTitle.innerHTML= films[filmIndex].title;
        const newParagrf=document.createElement('p');
        const newUList=document.createElement('ul');
        const newTime=document.createElement('div');
        films[filmIndex].genres.forEach(film=>{
            const newList=document.createElement('li');
            newList.textContent=film;
            newUList.appendChild(newList);
        })
        newTime.textContent=`Year: ${date.setDate(films[filmIndex].release_date)}`
        newParagrf.textContent=films[filmIndex].overview;
        elModal.style=`background:url('${films[filmIndex].poster}');
                        background-color:none;`;
        elModalBody.appendChild(newUList);
        elModalBody.appendChild(newParagrf);
        elModalBody.appendChild(newTime);





    }else if(foundElment.matches('.fa-bookmark')){
        //Bookmark
        reularToSolid(foundElment);
        const filmId=foundElment.dataset.filmId;
        const foundIndex=films.findIndex(film=>film.id===filmId);
        films[foundIndex].bookmark=!films[foundIndex].bookmark;
        const bookmark=films.filter(film=>film.bookmark===true);


        viewBokmarks(bookmark);
        viewFilms(films);
    }else if(foundElment.matches('.btn-close')){
        const filmId=foundElment.dataset.filmId;
        const foundIndex=films.findIndex(film=>film.id===filmId);
        films[foundIndex].bookmark=!films[foundIndex].bookmark;
        const bookmark=films.filter(film=>film.bookmark===true);

        viewBokmarks(bookmark);
        viewFilms(films);
    }else if(foundElment.matches('.like')){
        const foundFilm=films.filter(film=>film.like===true);
        viewFilms(foundFilm);
    }
    else if(foundElment.matches('.active')){
       
        viewFilms(films);
    }


})
viewFilms(films);
