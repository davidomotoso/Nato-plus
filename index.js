const ts = 1701689634218;
const publicKey = "02e1f0a2d49b93ccbd50739d6b726c5c";
const hash = "e0d6a8e188272e010b434feb7a1444cb";
const URL = `https://gateway.marvel.com/v1/public//series?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

// getting DOM element
const animeContainer = document.querySelector(".anime-content>section");
const comicContent = document.querySelector(".comic-content");
const HEAD = document.head;

// Declaring empty variable to be used later
let html = "";
let content = "";

// head function
const headContent = () => {
  HEAD.innerHTML += `
  <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="index.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
  `;
};

// hamburger function
const hamburger = () => {
  let menu = document.querySelector(".bi-list-nested");
  let nav = document.querySelector("nav>ul");
  menu.addEventListener("click", (e) => {
    nav.classList.toggle("show");
    nav.classList == "show"
      ? (e.target.classList = "bi-x-circle")
      : (e.target.classList = "bi-list-nested");

    // nav.classList.contains("show")?nav.classList.add("new-nav"):nav.classList.add("")
  });
};
const loopAnime = (parentComponent, src, heading, id, classes) => {
  const { parent, figure, header } = classes;
  html += `
        <section class="${parent}" id=${id}>
          <figure class="${figure}">
            <img src="${src.path}.${src.extension}" alt=""/>
          </figure>
          <section class="${header}">
          ${heading}
          </section>
          <section><button>Read more</button></section>
        </section>
        `;
  parentComponent.innerHTML = html;
};

// fetching data for top five comics
const topAnime = async () => {
  const data = await fetch(URL);
  const response = await data.json();
  const outcomes = response.data.results;
  const slicedOutcomes = outcomes.slice(1, 6);

  const classes = {
    parent: "anime-intro",
    figure: "action-figure",
    header: "comic-desc",
  };

  slicedOutcomes.forEach((outcome) => {
    const { title, thumbnail, id } = outcome;
    loopAnime(animeContainer, thumbnail, title, id, classes);
  });
};

const loopComic = (parentComponent, src, heading, id, classes) => {
  const { parent, figure, header } = classes;
  content += `
        <section class="${parent}" id=${id}>
          <figure class="${figure}">
            <img src="${src.path}.${src.extension}" alt=""/>
          </figure>
          <section class="${header}">
          ${heading}
          </section>
          <section><button>Read more</button></section>
        </section>
        `;
  parentComponent.innerHTML = content;
};

// fetching data for 20 comics
const allComic = async () => {
  const data = await fetch(URL);
  const response = await data.json();
  const outcomes = response.data.results;

  const classes = {
    parent: "comic-intro",
    figure: "comic-image",
    header: "comic-desc",
  };
  outcomes.forEach((outcome) => {
    const { title, thumbnail, id } = outcome;
    loopComic(comicContent, thumbnail, title, id, classes);
  });
};

// Calling out general functions here
headContent();
hamburger();
topAnime();
allComic();
