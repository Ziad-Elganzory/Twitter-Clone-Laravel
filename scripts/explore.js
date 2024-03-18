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
});


