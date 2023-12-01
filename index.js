// Making a dummy api for top trending comic

// getting DOM element
const animeContainer = document.querySelector(".anime-content>section");

// Declaring comic array
const comics = [
  {
    heading: " A comic story of wonder woman. A dummy project tho...",
    src: "./assets/wonder woman.png",
    figClass: "wonder-woman",
    alt: "wonder woman image",
  },
  {
    heading: " A comic story of superman. A dummy project tho...",
    src: "./assets/superman.png",
    figClass: "superman",
    alt: "superman image",
  },
  {
    heading: " A comic story of batman. A dummy project tho...",
    src: "./assets/batman.png",
    figClass: "batman",
    alt: "batman image",
  },
  {
    heading: " A comic story of ironman. A dummy project tho...",
    src: "./assets/iron-man.png",
    figClass: "ironman",
    alt: "ironman image",
  },
  {
    heading: " A comic story of captain america. A dummy project tho...",
    src: "./assets/captain america.png",
    figClass: "captain-america",
    alt: "captain america image",
  },
];

const loopComic = (parentComponent) => {
  let html = "";
  comics.forEach((comic) => {
    html += `
        <section class="anime-intro">
          <figure class="action-figure ${comic.figClass}">
            <img src="${comic.src}" alt="${comic.alt}"/>
          </figure>
          <section class="comic-story">
          ${comic.heading}
          </section>
          <button>Read more</button>
        </section>
        `;
  });
  parentComponent.innerHTML = html;
};

loopComic(animeContainer);
