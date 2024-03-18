document.addEventListener('DOMContentLoaded', function() {
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

