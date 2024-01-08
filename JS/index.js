lucide.createIcons(); // 검색 아이콘

//    여기서 부터 api로 카드 생성 부분
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTgyYTZlZWU0OTQxZDVkOGIxZjgxNGU0YTAzZjExMCIsInN1YiI6IjY1OGU2YWE0ZDE4ZmI5MDFhY2FkMjVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CA4Gu_fnD1-hEMdv2Ei_x9YBmJUwey-Sw5cjeAVFcVw'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        data.results.map(movie => createMovieCard(movie));
    })
    .catch(err => console.error(err));

// 카드생성 부분
function createMovieCard(movie) {
    const title = movie.title;
    const overview = movie.overview;
    const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const voteAverage = movie.vote_average;
    const movieId = movie.id;


    const card = document.createElement('div');
    card.className = 'card';

    const cardFlip = document.createElement('div');
    cardFlip.className = 'card-flip';
    cardFlip.id = movieId;

    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';

    const frontCard = document.createElement('div');
    frontCard.className = 'front-card';

    const frontImage = document.createElement('div');
    frontImage.className = 'frontImage';
    const img = document.createElement('img');
    img.src = posterPath;

    frontImage.append(img);

    const movieTitle = document.createElement('div');
    movieTitle.className = 'movieTitle';
    movieTitle.textContent = title;

    const frontRating = document.createElement('div');
    frontRating.className = "rating"
    frontRating.textContent = 'Rating : ' + voteAverage;

    frontCard.append(frontImage);

    frontCard.append(movieTitle);

    frontCard.append(frontRating);

    const backCard = document.createElement('div');
    backCard.className = 'back-card';


    const backImage = document.createElement('div');
    backImage.className = 'backImage';
    const backImg = document.createElement('img');
    backImg.src = posterPath;

    backImage.append(backImg);

    backCard.append(backImage);

    const backStory = document.createElement('div');
    backStory.className = 'story'
    backStory.textContent = overview;

    backCard.append(backStory);

    cardInner.append(frontCard);

    cardInner.append(backCard);

    cardFlip.append(cardInner);

    card.append(cardFlip);

    document.querySelector('.background').append(card);

    // 카드 클릭시 id 뜨게 
    let cardClickId = document.getElementById(movieId)
    cardClickId.addEventListener('click', function (event) {
        alert(movieId);
    })
}

// 카드생성 끝

// 검색창
function searchMovie() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('.movieTitle').textContent.toLowerCase();
        card.style.display = title.includes(searchInput) ? 'flex' : 'none';
    });
}

const searchButton = document.querySelector('button');
searchButton.addEventListener('click', searchMovie);

document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        searchMovie()
    }
});