const ts = 1701689634218;
const publicKey = "02e1f0a2d49b93ccbd50739d6b726c5c";
const hash = "e0d6a8e188272e010b434feb7a1444cb";
const URL = `https://gateway.marvel.com/v1/public//series?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

// getting DOM element
const animeContainer = document.querySelector(".anime-content>section");
const comicContent = document.querySelector(".comic-content");
let html = "";
let content = "";

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
          <button>Read more</button>
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
topAnime();

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
          <button>Read more</button>
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
allComic();
