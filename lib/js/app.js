$(document).ready(() => {
  $('.ham_menu').click(() => {
    $('.modal').toggle();
    $('.ham_menu').toggleClass('active');
  });
});
