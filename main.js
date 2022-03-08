// let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'

localStorage.getItem('token') ? localStorage.getItem('token') : renderTop();

let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'

let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1` 
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`

let appendDiv = document.querySelector('.append');
let buttons = document.querySelectorAll('.btns');
let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');
let pageNum = document.querySelector('.title');
let searchBtn = document.querySelector('.btn');

async function updTop(page) {
	tokenTop = tokenTop.slice(0, -1) + page;
	let res = await fetch(tokenTop);
	return await res.json();
}

async function updPopular(page) {
	tokenPopular = tokenPopular.slice(0, -1) + page;
	let res = await fetch(tokenPopular);
	return await res.json();
}

async function updUpcoming(page) {
	tokenUpComing = tokenUpComing.slice(0, -1) + page;
	let res = await fetch(tokenUpComing);
	return await res.json();
}

async function renderTop(page, searchValue, minValue, maxValue, scoreValue) {
	let pageNumber = page ? page : 1;
	let data = await updTop(pageNumber);
	let movies = data.results;
    
	appendDiv.innerHTML = '';

	movies.forEach(movie => {
        if(movie.title.toLowerCase().includes(searchValue ? searchValue.toLowerCase() : "")) {
			if(minValue ? min.value <= movie.release_date.slice(0, 4) : true) {
				if(maxValue ? max.value >= movie.release_date.slice(0, 4) : true) {
				    if(scoreValue ? scoreValue <= movie.vote_average : true) {
				    	let div = document.createElement('div')
						div.className = 'movie'
						div.innerHTML = `
							<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=${movie.title}>
				            <div class="movie-info">
				                <h3>${movie.title}</h3>
				                <span class="orange">${movie.vote_average}</span>
				            </div>
				            <span class="date">${movie.release_date}</span>
						`
						appendDiv.append(div)
				    }
				}
			}
		}
    });

	pageNum.innerHTML = pageNumber;

	nextBtn.addEventListener('click', () => {
        pageNumber++;
		renderTop(pageNumber);
		pageNum.innerHTML = pageNumber;
    });

	prevBtn.addEventListener('click', () => {
        if(pageNumber === 1) return;
		pageNumber--;
		renderTop(pageNumber);
		pageNum.innerHTML = pageNumber;
    });

	searchBtn.addEventListener('click', () => {
        renderTop(pageNumber, search.value, min.value, max.value, score.value);
    });
}

async function renderPopular(page, searchValue, minValue, maxValue, scoreValue) {
	let pageNumber = page ? page : 1;
	let data = await updPopular(pageNumber);
	let movies = data.results;

	appendDiv.innerHTML = '';

	movies.forEach(movie => {
        if(movie.title.toLowerCase().includes(searchValue ? searchValue.toLowerCase() : "")) {
			if(minValue ? min.value <= movie.release_date.slice(0, 4) : true) {
				if(maxValue ? max.value >= movie.release_date.slice(0, 4) : true) {
				    if(scoreValue ? scoreValue <= movie.vote_average : true) {
				    	let div = document.createElement('div')
						div.className = 'movie'
						div.innerHTML = `
							<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=${movie.title}>
				            <div class="movie-info">
				                <h3>${movie.title}</h3>
				                <span class="orange">${movie.vote_average}</span>
				            </div>
				            <span class="date">${movie.release_date}</span>
						`
						appendDiv.append(div);
				    }
				}
			}
		}
    });

	pageNum.innerHTML = pageNumber;
	
    nextBtn.addEventListener('click', () => {
        pageNumber++;
		renderPopular(pageNumber);
		pageNum.innerHTML = pageNumber;
    });

	prevBtn.addEventListener('click', () => {
        if(pageNumber === 1) return;
		pageNumber--;
		renderPopular(pageNumber);
		pageNum.innerHTML = pageNumber;
    });

	searchBtn.addEventListener('click', () => {
		renderPopular(pageNumber, search.value, min.value, max.value, score.value);
    });
}

async function renderUpcoming(page, searchValue, minValue, maxValue, scoreValue) {
	let pageNumber = page ? page : 1;
	let data = await updUpcoming(pageNumber);
	let movies = data.results;

	appendDiv.innerHTML = '';
	movies.forEach(movie => {
        if(movie.title.toLowerCase().includes(searchValue ? searchValue.toLowerCase() : "")) {
			if(minValue ? min.value <= movie.release_date.slice(0, 4) : true) {
				if(maxValue ? max.value >= movie.release_date.slice(0, 4) : true) {
				    if(scoreValue ? scoreValue <= movie.vote_average : true) {
				    	let div = document.createElement('div')
						div.className = 'movie'
						div.innerHTML = `
							<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=${movie.title}>
				            <div class="movie-info">
				                <h3>${movie.title}</h3>
				                <span class="orange">${movie.vote_average}</span>
				            </div>
				            <span class="date">${movie.release_date}</span>
						`
						appendDiv.append(div);
				    }
				}
			}
		}
    });
	pageNum.innerHTML = pageNumber;

	nextBtn.addEventListener('click', () => {
        pageNumber++;
		renderUpcoming(pageNumber);
		pageNum.innerHTML = pageNumber;
    });

	prevBtn.addEventListener('click', () => {
        if(pageNumber === 1) return;
		pageNumber--;
		renderUpcoming(pageNumber);
		pageNum.innerHTML = pageNumber;
    });

	searchBtn.addEventListener('click', () => {
		renderUpcoming(pageNumber, search.value, min.value, max.value, score.value);
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.value === 'top_rated'){
            appendDiv.innerHTML = '';
            localStorage.setItem('token', tokenTop);
            renderTop();
        } else if(button.value === 'popular'){
            appendDiv.innerHTML = '';
            localStorage.setItem('token', tokenPopular);
            renderPopular();
        } else if (button.value === 'upcoming'){
            appendDiv.innerHTML = '';
            localStorage.setItem('token', tokenUpComing);
            renderUpcoming();
        }
    });
});
