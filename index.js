const ts = 1701689634218;
const publicKey = "02e1f0a2d49b93ccbd50739d6b726c5c";
const hash = "e0d6a8e188272e010b434feb7a1444cb";
const URL = `https://gateway.marvel.com/v1/public/series?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
// let storyUrl = `https://gateway.marvel.com/v1/public/stories/54073?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

// getting DOM element
const animeContainer = document.querySelector(".anime-content>section");
const comicContent = document.querySelector(".comic-content");
const HEAD = document.head;
const animeLoader = document.querySelector(".anime-loader");
const animeImageLoader = document.querySelector(".anime-intro-loader");
let hiddenH1 = document.querySelector(".hidden");
const comicLoader = document.querySelector(".comic-loader");

// Declaring empty variable to be used later
let html = "";
let content = "";

// head function
const headContent = () => {
  HEAD.innerHTML += `
  <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="loader.css" />
  `;
};

// making dummy DOM element for loader
function dummyDomElements() {
  let elements = "";
  for (let i = 5; i > 0; i--) {
    elements += `
        <section>
          <div></div>
          <div></div>
          <div></div>
        </section>
    `;
  }
  animeImageLoader.innerHTML += elements;
}

// hamburger function
const hamburger = () => {
  let menu = document.querySelector(".bi-list-nested");
  let nav = document.querySelector("nav>ul");
  menu.addEventListener("click", (e) => {
    nav.classList.toggle("show");
    nav.classList == "show"
      ? (e.target.classList = "bi-x-circle")
      : (e.target.classList = "bi-list-nested");
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
  try {
    const data = await fetch(URL);
    const response = await data.json();
    const outcomes = response.data.results;
    const slicedOutcomes = outcomes.slice(1, 6);

    // remove a class and loader from DOM
    animeLoader.remove();
    hiddenH1.classList.remove("hidden");

    const classes = {
      parent: "anime-intro",
      figure: "action-figure",
      header: "comic-desc",
    };

    slicedOutcomes.forEach((outcome) => {
      const { title, thumbnail, id } = outcome;
      loopAnime(animeContainer, thumbnail, title, id, classes);
    });
  } catch {
    let anime = document.querySelector(".anime-content");
    animeLoader.remove();
    anime.classList.add("err-img");
  }
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
  try {
    const data = await fetch(URL);
    const response = await data.json();
    const outcomes = response.data.results;

    // remove loader from DOM
    comicLoader.remove();

    const classes = {
      parent: "comic-intro",
      figure: "comic-image",
      header: "comic-desc",
    };
    outcomes.forEach((outcome) => {
      const { title, thumbnail, id } = outcome;
      loopComic(comicContent, thumbnail, title, id, classes);
    });
  } catch {
    let body = document.body;
    let header = document.querySelector(".header");
    header.remove();
    comicLoader.remove();
    body.classList.add("err-img");
    body.innerHTML = `
      <h1 style="color:red;text-align:center;font-size:3em">
        Check internet connection.<p style="color:#1f1f1f">Reload</p>
      </h1>
    `;
  }
};

// function test() {
//   fetch(storyUrl)
//     .then((res) => {
//       return res;
//     })
//     .then((data) => console.log(data))
//     .catch((reject) => log(reject));
// }

// Calling out general functions here

headContent();
hamburger();
topAnime();
allComic();
dummyDomElements();

// test();
