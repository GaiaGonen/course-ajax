(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const unsplashRequest = new XMLHttpRequest();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        unsplashRequest.open('GET', `https://api.unsplash.com/photos/?client_id=241fddf0e44aa4e7757f77196d6df2c68aab3ea166cc073e881dca79159f2192&page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        // unsplashRequest.setRequestHeader('Authorization', 'Client-ID 241fddf0e44aa4e7757f77196d6df2c68aab3ea166cc073e881dca79159f2192');
        unsplashRequest.send();

        function addImage(){
          debugger;
        }
    });
})();


unsplashRequest.open('GET', `https://api.unsplash.com/photos/?client_id=241fddf0e44aa4e7757f77196d6df2c68aab3ea166cc073e881dca79159f2192&page=1&query=${searchedForText}`);
unsplashRequest.onload = addImage;
// unsplashRequest.setRequestHeader('Authorization', 'Client-ID 241fddf0e44aa4e7757f77196d6df2c68aab3ea166cc073e881dca79159f2192');
unsplashRequest.send();

function addImage(){
  debugger;
}

function addArticles () {}
const articleRequest = new XMLHttpRequest();
articleRequest.onload = addArticles;
articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=26d6148aac33436f8db38c158b715fce`);
articleRequest.send();
