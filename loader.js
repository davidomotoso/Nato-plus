// This JS file is for the loaders

// Declaring DOM elements
let animeImageLoader = document.querySelector(".anime-intro-loader");

function dummyAnimeElements() {
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
dummyAnimeElements();
