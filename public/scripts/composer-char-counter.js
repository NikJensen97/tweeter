$(document).ready(function () {


  $('textarea').keyup(function () {
    current = $('.counter');
    var characterCount = $(this).val().length
    current.text(140 - characterCount);

    if (characterCount > 139) {
      current.css('color', 'red');
    } else {
      current.css('color', 'black');
    }

  })
  
  /*
  const textarea = document.getElementById("textbox");

  textarea.addEventListener("keypress", function() {
    console.log(this);
  }); */
});