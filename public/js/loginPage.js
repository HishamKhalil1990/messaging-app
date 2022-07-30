$(document).ready(() => {
  var cta = document.querySelector(".cta");
  var check = 0;
  cta.addEventListener("click", function (e) {
    const text = $(".text")[0];
    const loginText = $(".login-text")[0];
    text.classList.toggle("show-hide");
    loginText.classList.toggle("expand");
    if (check == 0) {
      cta.innerHTML = `<svg style="fill:#fff;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"/></svg>`;
      check++;
    } else {
      cta.innerHTML = `<svg style="fill:#fff;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/></svg>`;
      check = 0;
    }
  });
  $(".login-btn").on("click", (e) => {
    $(".notification").addClass("notification-after");
    $(".cta").trigger("click");
    const username = $("#username").val();
    const password = $("#password").val();
    setTimeout(() => {
      tryToLogin(username, password);
    }, 2000);
  });
});

const tryToLogin = (username, password) => {
  const user = {
    username,
    password
  }
  $.ajax({
    type: "POST",
    url: "/Login",
    data: JSON.stringify(user),
    contentType : "application/json",
    dataType: 'json',
    success: function (result) {
      if(result.msg != 'error'){
        $("#accept").attr("style", "z-index:0;");
        setTimeout(() => {
          if(result.msg == 'user'){
            document.getElementById('goToMessaging').click();
          }else if(result.msg == 'admin'){
            document.getElementById('goToSending').click();
          }
        }, 1000);
      }else{
        $("#reject").attr("style", "z-index:0;");
        setTimeout(() => {
          $("#reject").attr("style", "z-index:-1;");
          $(".notification").removeClass("notification-after");
          $(".cta").trigger("click");
        }, 1000);
      }
    },
    error: function (err) {
      $("#reject").attr("style", "z-index:0;");
      setTimeout(() => {
        $("#reject").attr("style", "z-index:-1;");
        $(".notification").removeClass("notification-after");
        $(".cta").trigger("click");
      }, 1000);
    },
  });
};
