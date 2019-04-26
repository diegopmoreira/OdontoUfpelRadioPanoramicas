"use strict";

$(document).ready(function () {
  $('.ham_menu').click(function () {
    $('.modal').toggle();
    $('.ham_menu').toggleClass('active');
  });
});