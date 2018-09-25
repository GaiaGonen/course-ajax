(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        /* Call images from unsplash API and print the first one*/
        $.ajax({
          url: `https://api.unsplash.com/search/photos/?client_id=241fddf0e44aa4e7757f77196d6df2c68aab3ea166cc073e881dca79159f2192&page=1&query=${searchedForText}`
        }).done(addImage);

        /* Call articles from unsplash API and print them*/
        $.ajax({
          url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=26d6148aac33436f8db38c158b715fce`
        }).done(addArticles);


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

        function addArticles(data){
          let htmlContent = '';
          const articles = data.response.docs;
          if (articles.length > 0) {
            htmlContent = '<ul>' + articles.map(article => `<li class="article">
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
