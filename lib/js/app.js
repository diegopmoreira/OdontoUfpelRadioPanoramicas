async function getJson() {
  try {
    const response = await fetch('assets/content/data.json');
    const json = await response.json();
    console.log(json);
  } catch (e) {
    console.log('Error!', e);
  }
}

$(document).ready(async () => {
  const dataRadio = getJson();

  // initializing the first area on home
  $('.number-text').text(dataRadio[0].number);
  $('.container-image img').attr('src', dataRadio[0].baseImage);
  $('.title').text(dataRadio[0].title);
  $('.description').text(dataRadio[0].description);

  // opening modal
  $('header .ham_menu').click(() => {
    $('.modal').toggle();
    $('.ham_menu').toggleClass('active');
  });

  // closing fullscreen
  $('#fullscreen .ham_menu').click(() => {
    $('#fullscreen').fadeOut();
  });

  // showing fullscreen
  $('.container-image').click(() => {
    $('#fullscreen').fadeIn();
  });
});
