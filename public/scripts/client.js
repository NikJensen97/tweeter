/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
] */

$(document).ready(function () {

  const renderTweets = function (tweets) {
    $('#tweet-container').empty();
    // loops through tweets
    
    for (let y = 0; y < tweets.length; y++) {
      let $tweet = createTweetElement(tweets[y]);
      if ($tweet) {
      $('#tweet-container').prepend($tweet);
      }
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  const createTweetElement = function (tweet) {
    /*if (tweet["content"]["text"].length > 140) {
      $('.error').slideDown("slow");
      return;
    }*/
    let safeword = encode(tweet["content"]["text"]);
    
    let $tweet = $(`
      <article>
        <header class = "tweet">
        <img src="${tweet["user"]["avatars"]}">
          <h3>${tweet["user"]["name"]}</h3>
          <p class = "account">${tweet["user"]["handle"]}</p>
        </header>
        <p class = "message">${safeword}</p>
        <footer>
          <p class = "date">${timeago.format(tweet["created_at"])}</p>
          <i class="fa-solid fa-heart"></i>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
      </footer>
      </article>
      `)
      // try this tmr ?? $('message').text(tweet["content"]["text"]);
    return $tweet;
  }

  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
  .then(function (json) {
    renderTweets(json);
  });
  const $form = $('#textbox');
  const loadtweets = function () {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then(function (json) {
      renderTweets(json);
    }
  )};
  // function to escape malicious tweets
  function encode(string){
    return string.replace(/[\x26\x0A\<>'"]/g,function(string){return"&#"+string.charCodeAt(0)+";"})
    }
  
  // $('#tweet-container').append($tweet);
  //renderTweets(data);
  $form.on('submit', (event) => {
    event.preventDefault();
    $('.error').fadeOut("slow");
    let name = $("#tweet-text").val();
    if (name.length > 140) {
      $('.error').text('Error: Tweet is too long');
      $('.error').slideDown("slow");
      return;
    }
    if (name.length === 0) {
      $('.error').text('Error: No tweet entered');
      $('.error').slideDown("slow");
      return;
    }
    
    const urlencoded = $form.serialize();
    // console.log(urlencoded);
    

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlencoded
    }).then((response) => {
       // console.log(response);
       loadtweets();
    });

  });
  
  
});