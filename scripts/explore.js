document.addEventListener('DOMContentLoaded', function() {
  var navItems = document.querySelectorAll('.home-bot .nav-item');


  navItems[0].classList.add('active');

  fetchAndDisplayData('For You');

  navItems.forEach(function(navItem) {
      navItem.addEventListener('click', function() {
          var previouslyActive = document.querySelector('.home-bot .nav-item.active');
          previouslyActive.classList.remove('active');
          this.classList.add('active');
          var selectedCategory = this.textContent.trim();
          fetchAndDisplayData(selectedCategory);
      });
  });

  function fetchAndDisplayData(category) {
      fetch('../json/explore.json')
      .then(response => response.json())
      .then(data => {
          const exploreDiv = document.querySelector('.explore');
          exploreDiv.innerHTML = ''; 
          data.forEach(trend => {
              if (trend.category === category) {
                  const exploreItem = document.createElement('div');
                  exploreItem.classList.add('explore-item');
                  const categoryElement = document.createElement('div');
                  categoryElement.classList.add('item-category');
                  categoryElement.innerHTML = `
                      <span>Trending in ${trend.trend_location}</span>
                      <i class="material-icons-outlined">more_horiz</i>
                  `;
                  const trendName = document.createElement('p');
                  trendName.textContent = trend.trend_name;
                  const tweetCount = document.createElement('span');
                  tweetCount.textContent = `${trend.post_count} Tweets`;

                  exploreItem.appendChild(categoryElement);
                  exploreItem.appendChild(trendName);
                  exploreItem.appendChild(tweetCount);
                  exploreDiv.appendChild(exploreItem);
              }
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }

  Promise.all([
    fetchAndSelectRandomTrend('For You'),
    fetchAndSelectRandomTrend('Trending'),
    fetchAndSelectRandomTrend('News'),
    fetchAndSelectRandomTrend('Sports'),
    fetchAndSelectRandomTrend('Entertainment')
])
.then(results => {
    const trendsDiv = document.querySelector('.trends');
    results.forEach(trend => {
        // Create HTML elements for each trend
        const trendingItem = document.createElement('div');
        trendingItem.classList.add('trending-item');
        const category = document.createElement('div');
        category.classList.add('item-category');
        category.innerHTML = `
            <span>Trending in ${trend.trend_location}</span>
            <i class="material-icons-outlined">more_horiz</i>
        `;
        const trendName = document.createElement('p');
        trendName.textContent = trend.trend_name;
        const tweetCount = document.createElement('span');
        tweetCount.textContent = `${trend.post_count} Tweets`;

        // Append elements to the parent div
        trendingItem.appendChild(category);
        trendingItem.appendChild(trendName);
        trendingItem.appendChild(tweetCount);
        trendsDiv.appendChild(trendingItem);
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
});

function fetchAndSelectRandomTrend(category) {
    // Fetch data for the specified category
    return fetch(`../json/explore.json`)
        .then(response => response.json())
        .then(data => {
            // Select a random trend from the data
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex];
        });
}
});


