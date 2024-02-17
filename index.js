const ts = 1701689634218;
const publicKey = "02e1f0a2d49b93ccbd50739d6b726c5c";
const hash = "e0d6a8e188272e010b434feb7a1444cb";
const COMICURL = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
const SERIESURL = `https://gateway.marvel.com/v1/public/series?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

// getting DOM element
const animeContainer = document.querySelector(".anime-content>section");
const comicContent = document.querySelector(".comic-content");
const HEAD = document.head;
const animeLoader = document.querySelector(".anime-loader");
const animeImageLoader = document.querySelector(".anime-intro-loader");
let hiddenH1 = document.querySelector(".hidden");
const comicLoader = document.querySelector(".comic-loader");
const series = document.querySelector(".series");
const readerContent = document.querySelector(".readerContent");

// Declaring empty variable to be used later
let html = "";
let content = "";

// head function
const headContent = () => {
  HEAD.innerHTML += `
  <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
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
        </section>
    `;
  }
  animeImageLoader.innerHTML += elements;
}

// Reload browser
const reload = () => {
  location.reload();
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
  });
};

// looping through data.
const loopAnime = (parentComponent, src, heading, id, classes) => {
  const { parent, figure, header } = classes;
  html += `
        <section  class="${parent}" id=${id}  onclick="saveId(id)">
          <figure class="${figure}">
            <img src="${src.path}.${src.extension}" alt="" loading="lazy"/>
          </figure>
          <section class="${header}">
          ${heading}
          </section>
        </section>
        `;
  parentComponent.innerHTML = html;
};

// Saving id & location in session storage
const saveId = (id) => {
  sessionStorage.setItem("location", window.location.href);
  sessionStorage.setItem("animeId", id);
  window.location.href = `./readComics.html`;
};

// function for different page readStory
function diffStories(url, result) {
  let story = "";
  if (url.includes("comics")) {
    result.textObjects[0] === undefined
      ? (story = "No description displayed")
      : (story = result.textObjects[0].text);
  } else {
    story = "No description displayed";
  }
  return story;
}

// making a function for readComic content
function readComicContent(content, title, participant, story) {
  content.innerHTML = `
    <section>
      <h2>${title}</h2>
      </section>
      <section class="creators">
      ${participant}
      </section>
      <section class="story">
        ${story}
      </section>
    </section>
  `;
}

// fetching data for top five comics
const topAnime = async () => {
  try {
    const data = await fetch(COMICURL);
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
    anime.className = "err-img";
    anime.innerHTML = `
    <h1 style="color:red;text-align:center;font-size:3em">
      Check internet connection.<p onClick=reload()>Reload</p>
    </h1>`;
  }
};

const loopComic = (parentComponent, src, heading, id, classes) => {
  const { parent, figure, header } = classes;
  content += `
        <section class="${parent}" id="${id}" onclick="saveId(id)">
          <figure class="${figure}">
            <img src="${src.path}.${src.extension}" alt="" loading="lazy"/>
          </figure>
          <section class="${header}">
          ${heading}
          </section>
        </section>
        `;
  parentComponent.innerHTML = content;
};

// Error message
function err() {
  let body = document.body;
  let header = document.querySelector(".header");
  header.remove();
  comicLoader.remove();
  body.classList.add("err-img");
  body.innerHTML = `
    <h1 style="color:red;text-align:center;font-size:3em">
      Check internet connection.<p onclick=reload()>Reload</p>
    </h1>
  `;
}

// fetching data for 20 comics
const allComic = async (url) => {
  try {
    const data = await fetch(url);
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
      if (comicContent !== null) {
        loopComic(comicContent, thumbnail, title, id, classes);
      } else {
        loopComic(series, thumbnail, title, id, classes);
      }
    });
  } catch {
    err();
  }
};
// fetching individual comics
const getIndividualData = async () => {
  try {
    // assigning variables to empty strings
    let participant = "";
    let INDIVIDUALURL = "";

    // getting id & location from session storage
    let retrivedId = sessionStorage.getItem("animeId");
    let prevLocation = sessionStorage.getItem("location");

    // validating which page to fetch data for
    prevLocation.includes("index") // fetching api via id
      ? (INDIVIDUALURL = `https://gateway.marvel.com/v1/public/comics/${retrivedId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      : prevLocation.includes("Comic")
      ? (INDIVIDUALURL = `https://gateway.marvel.com/v1/public/comics/${retrivedId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      : (INDIVIDUALURL = `https://gateway.marvel.com/v1/public/series/${retrivedId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
    const url = await fetch(INDIVIDUALURL);
    const output = await url.json();
    const result = output.data.results[0];
    // remove loader
    document.querySelector(".load").remove();
    // getting image
    let bg = document.querySelector(".body");
    let imgSrc = `${result.thumbnail.path}.${result.thumbnail.extension}`;
    bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0,0,0,0.7)),url(${imgSrc})`;

    // getting  title
    let title = result.title;

    // getting story
    let story = diffStories(INDIVIDUALURL, result);

    // getting creators
    let creators = result.creators.items;
    creators[0] == undefined
      ? (participant += `<section>No creator displayed</section>`)
      : getCreators();
    function getCreators() {
      creators.forEach((creator) => {
        participant += `<section>
      <h3>${creator.role}</h3>
      <p>${creator.name}</p>
      </section>`;
      });
    }
    readComicContent(readerContent, title, participant, story);
  } catch {
    err();
  }
};

// Fetching different data for different page
function diffData() {
  if (comicContent !== null) {
    allComic(COMICURL);
  } else {
    allComic(SERIESURL);
  }
}

headContent();
hamburger();
getIndividualData();
diffData();
topAnime();
dummyDomElements();
