$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function() { // using input event when on id=tweet-text
    let myTextLength = $(this).val().length; //length of value of input text
    let myCounter = $(this).parent().find('.counter'); //going to the form and then inside the form find .counter
    let charLeft = 140 - myTextLength; //the amount of characters left from 140
    myCounter.val(charLeft); //adjusting values of .counter in real time
    if (charLeft < 0 ) { //if we have less than 0 characters
      myCounter.css("color", "red");
    } 
    else {
      myCounter.css("color", "");
    }

})

});

