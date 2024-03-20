document.addEventListener('DOMContentLoaded', function() {

    // This Is For Handling the Trends In The Side Feed
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

        return fetch(`../json/explore.json`)
            .then(response => response.json())
            .then(data => {

                const randomIndex = Math.floor(Math.random() * data.length);
                return data[randomIndex];
            });
    }

    //this for retrieving the posts from the json file
    fetch('../json/posts.json')
    .then(response => response.json())
    .then(data => {
        const feedDiv = document.querySelector('.feed');

        data.forEach(post => {
            const feedTweet = document.createElement('div');
            feedTweet.classList.add('feed-tweet');

            feedTweet.innerHTML = `
                <img src="${post.profile_picture}" class="tweet-img" />
                <div class="feed-tweet-details">
                    <div class="tweeter-details">
                        <a href="" class="tweeter-name">${post.account_name}<span class="tweeter-handel">${post.handle}</span><span class="tweet-time">. ${post.time}</span></a>
                        <i class="material-icons-outlined">more_horiz</i>
                    </div>
                    <div class="tweet-text">
                        <p>${post.post_caption}</p>
                    </div>
                    ${post.post_image !== 'none' ? `
                        <div class="tweet-post-img">
                            <img src="${post.post_image}" alt="Post-Image">
                        </div>
                    ` : ''}
                    <div class="tweet-icons">
                        <div class="comment">
                            <i class="material-icons-outlined">chat_bubble_outline</i>
                            <p>${post.comments_number}</p>
                        </div>
                        <div class="retweet">
                            <i class="material-icons-outlined">restart_alt</i>
                            <p>${post.retweets}</p>
                        </div>
                        <div class="like">
                            <i class="material-icons-outlined">favorite_border</i>
                            <p>${post.likes}</p>
                        </div>
                        <div class="analysis">
                            <i class="material-icons-outlined">equalizer</i>
                            <p>${post.analysis_number}</p>
                        </div>
                        <div class="bookmark">
                            <i class="material-icons-outlined">bookmark_border</i>
                        </div>
                        <div class="share">
                            <i class="material-icons-outlined">upload</i>
                        </div>
                    </div>
                </div>
            `;

            feedDiv.appendChild(feedTweet);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
