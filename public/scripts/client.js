/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//const { text } = require("body-parser");

//const { post } = require("request");

$(document).ready(function() {
  $('.error-length').hide(); //hide when no errors
  $('.error-empty').hide();






const escape = function (str) { //function to avoid cross-site scripting
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  // loops through tweets
  $('#tweets-container').empty();
  tweets.forEach(tweet => {
    $('#tweets-container').append(createTweetElement(tweet));
  });
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
  let $tweet = `
  <article class="tweet">
  <header>
    <h2> <img src=${tweet.user.avatars}/> ${tweet.user.name} </h2>
    <span> ${tweet.user.handle} </span>
  </header>
  <p>${escape(tweet.content.text)}</p>
  <footer>
    <span> ${timeago.format(tweet.created_at)}</span>
    <div class="footer-logo">
      <i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>
`;
return $tweet ;  
};

//renderTweets(data);


const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: (data) => {
      renderTweets(data.reverse());
    }
  })
}
 loadTweets();



$("#tweet-submit").submit(function(event) {
  event.preventDefault();
  const tweetText = $("#tweet-text").val().trim()
  if (tweetText === "") {
    $('.error-empty').slideDown();
    $('.error-length').slideUp();
  } else if (tweetText.length > 140) {
    $('.error-length').slideDown();
    $('.error-empty').slideUp();
  } else {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $("#tweet-submit").serialize(), // data: { text: $("#tweet-text").val() }
      success: (data) => {
        loadTweets();
        $("#tweet-submit")[0].reset();
        $('.error-length').slideUp(); //hide when no errors
        $('.error-empty').slideUp();
  }
    })
  }
});

});
