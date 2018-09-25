/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        $.ajax({
          url: `https://api.unsplash.com/search/photos/?client_id=241fddf0e44aa4e7757f77196d6df2c68aab3ea166cc073e881dca79159f2192&page=1&query=${searchedForText}`
        }).done(addImage);
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=26d6148aac33436f8db38c158b715fce`);
        articleRequest.send();

        function addImage(data){
          let htmlContent = '';
          const images = data.results;
          if (images[0]) {
            const firstImage = images[0];
            htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
          } else {
            htmlContent = '<div class="error-no-image">No images available</div>';
          }
          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        function addArticles(){
          let htmlContent = '';
          const data = JSON.parse(this.responseText);

          if (data && data.response && data.response.docs.length > 0) {
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                              <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                              <p>${article.snippet}</p>
                              </li>`
                            ).join('') + '</ul>'
          } else {
            htmlContent = '<div class="error-no-articles">No articles available</div>';
          }
          responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }
    });
})();
