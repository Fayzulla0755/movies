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
        const filmDate=new Date(films[filmIndex].release_date);
        const newParagrf=document.createElement('p');
        const newUList=document.createElement('ul');
        const newTime=document.createElement('div');
        elModalTitle.innerHTML= films[filmIndex].title;
        films[filmIndex].genres.forEach(film=>{
            const newList=document.createElement('li');
            newList.textContent=film;
            newUList.appendChild(newList);
        })
        newTime.textContent=` ${filmDate.getFullYear()},${filmDate.getMonth()+1},${filmDate.getDate()} ${filmDate.getHours()}:${filmDate.getMinutes()}`;
        newParagrf.textContent=films[filmIndex].overview;
        elModal.style=`background:url('${films[filmIndex].poster}'); background-color:none;`;
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
        updateBookmark(bookmark);
    }else if(foundElment.matches('.btn-close')){
        const filmId=foundElment.dataset.filmId;
        const foundIndex=films.findIndex(film=>film.id===filmId);
        films[foundIndex].bookmark=!films[foundIndex].bookmark;
        const bookmark=films.filter(film=>film.bookmark===true);
        updateBookmark(bookmark);
    }else if(foundElment.matches('.like')){
        const foundFilm=films.filter(film=>film.like===true);
        viewFilms(foundFilm);
    }
    else if(foundElment.matches('.active')){
        viewFilms(films);
    }


})