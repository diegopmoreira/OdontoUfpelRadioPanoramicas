async function getJson() {
  try {
    const response = await fetch('assets/content/data.json');
    const json = await response.json();
    return json;
  } catch (e) {
    console.log('Error!', e);
  }
}

async function renderItem({
  number,
  name,
  description,
  baseImage,
  printImage
}) {
  try {
    $('.title').text(name); //   $('.number-text').text(number);

    $('.number-text').text(name);
    $('.container-image img').attr('src', baseImage);
    $('.description').text(description);
    $('#fullscreen').css('backgroundImage', `url(${baseImage})`);
  } catch (e) {
    console.log('Error!', e);
  }
}

async function renderList(arr) {
  arr.map(({
    number,
    name
  }) => {
    $('.modal-list').append(`<li class="radio-item">
    <a href="#"> <span class="number-radio">${number} - </span>${name}</a>
  </li>`);
  });
}

$(document).ready(async () => {
  const dataRadio = await getJson();
  let actualRadio = dataRadio[0]; // initializing the first area on home

  await renderItem(actualRadio);
  await renderList(dataRadio); // next button action

  $('.next').click(async () => {
    actualRadio = dataRadio[actualRadio.number % dataRadio.length];
    await renderItem(actualRadio);
    $('.remove-areas').hide();
    $('.print-areas').show();
  }); // previous button action

  $('.previous').click(async () => {
    actualRadio.number - 2 < 0 ? actualRadio = dataRadio[(dataRadio.length - 1) % dataRadio.length] : actualRadio = dataRadio[(actualRadio.number - 2) % dataRadio.length];
    await renderItem(actualRadio);
    $('.remove-areas').hide();
    $('.print-areas').show();
  }); // opening modal

  $('header .ham_menu').click(() => {
    $('.modal').toggle();
    $('.ham_menu').toggleClass('active');
  }); // closing fullscreen

  $('#fullscreen .ham_menu').click(() => {
    $('#fullscreen').fadeOut();
  }); // showing fullscreen

  $('.container-image').click(() => {
    $('#fullscreen').fadeIn();
  }); // print image

  $('.print-areas').click(() => {
    $('#fullscreen').css('background-image', `url(${actualRadio.printImage})`);
    $('.print-areas').hide();
    $('.remove-areas').show();
  }); // remove areas

  $('.remove-areas').click(() => {
    $('#fullscreen').css('background-image', `url(${actualRadio.baseImage})`);
    $('.remove-areas').hide();
    $('.print-areas').show();
  });
  $('.modal-list').on('click', 'a', async e => {
    let number = $(e.currentTarget).children().text().split(' - ');
    number = number[0] - 1;
    actualRadio = dataRadio[number];
    await renderItem(actualRadio);
    $('.modal').toggle();
    $('.ham_menu').toggleClass('active');
  });
});