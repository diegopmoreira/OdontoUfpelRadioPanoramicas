async function getJson() {
  try {
    const e = await fetch("assets/content/data.json");
    return await e.json();
  } catch (e) {
    console.log("Error!", e);
  }
}

async function renderItem({
  number: e,
  name: a,
  description: n,
  baseImage: t,
  printImage: r
}) {
  try {
    $(".title").text(a), $(".number-text").text(a), $(".container-image img").attr("src", t), $(".description").text(n), $("#fullscreen").css("backgroundImage", `url(${t})`);
  } catch (e) {
    console.log("Error!", e);
  }
}

async function renderList(e) {
  e.map(({
    number: e,
    name: a
  }) => {
    $(".modal-list").append(`<li class="radio-item">\n    <a href="#"> <span class="number-radio">${e} - </span>${a}</a>\n  </li>`);
  });
}

$(document).ready(async () => {
  const e = await getJson();
  let a = e[0];
  await renderItem(a), await renderList(e), $(".next").click(async () => {
    a = e[a.number % e.length], await renderItem(a), $(".remove-areas").hide(), $(".print-areas").show();
  }), $(".previous").click(async () => {
    a = a.number - 2 < 0 ? e[(e.length - 1) % e.length] : e[(a.number - 2) % e.length], await renderItem(a), $(".remove-areas").hide(), $(".print-areas").show();
  }), $("header .ham_menu").click(() => {
    $(".modal").toggle(), $(".ham_menu").toggleClass("active");
  }), $("#fullscreen .ham_menu").click(() => {
    $("#fullscreen").fadeOut(), $("body").css("position", "static");
  }), $(".container-image").click(() => {
    $("#fullscreen").fadeIn(), $("body").css("position", "fixed");
  }), $(".print-areas").click(() => {
    $("#fullscreen").css("background-image", `url(${a.printImage})`), $(".print-areas").hide(), $(".remove-areas").show();
  }), $(".remove-areas").click(() => {
    $("#fullscreen").css("background-image", `url(${a.baseImage})`), $(".remove-areas").hide(), $(".print-areas").show();
  }), $(".modal-list").on("click", "a", async n => {
    let t = $(n.currentTarget).children().text().split(" - ");
    t = t[0] - 1, a = e[t], await renderItem(a), $(".modal").toggle(), $(".ham_menu").toggleClass("active");
  });
});