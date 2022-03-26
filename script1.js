/* eslint-disable no-unused-vars */
const searchButton = document.getElementById("search-button");
const inputSearch = document.getElementById("search-input");
const gameDisplay = document.getElementById("game-display");
const genreList = document.getElementById("genre-list");
const tagList = document.getElementById("tag-list");
const tagFilter = document.getElementsByClassName("tag-name");
const genreFilter = document.getElementsByClassName("genre-name");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const home = document.getElementById("home");
let appId;
//back to home page
const goBackHome = () => {
  window.location.assign(`index.html`);
};
home.addEventListener("click", () => {
  goBackHome();
});
//load specific game details
console.log("there");
const getGameDetails = async () => {
  try {
    const link = window.location.href;
    const newUrl = new URL(link);
    let appId = new URLSearchParams(newUrl.search);
    appId = appId.get("game");
    //appId = searchParams.get("game");
    const url = `https://cs-steam-api.herokuapp.com/single-game/${appId}`;
    console.log("here", url);
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    console.log("data", data);
    return data.data;
  } catch (err) {
    console.log("err", err);
  }
};
const displayGameDetails = async () => {
  try {
    const data = await getGameDetails();
    gameDisplay.innerHTML = "";
    const x = document.createElement("div");
    x.innerHTML = `<div class="game-wrapper single-game">
        <div class="game-image single-game"><img class="image single-game" src=${data.header_image}></div>
        <div class="game-info single-game">
        <div class="info-wrapper name-wrapper single-game"><div class="game-name">${data.name}</div></div>
        <div class="info-wrapper other-wrapper single-game"><div class="game-other">${data.description}</div></div>
        </div>
    </div>`;
    gameDisplay.appendChild(x);
  } catch (err) {
    console.log("err", err);
  }
};
window.addEventListener("load", displayGameDetails);
//display specific game details
function newDoc(x) {
  console.log("here");
  window.location.assign(`game.html?game=${x}`);
  console.log(x);
}
//display genres and tags:

const getGenres = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/genres`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const getTags = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/steamspy-tags`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const displayGenresAndTags = async () => {
  try {
    const data = await getGenres();
    const dataTag = await getTags();
    console.log(data);
    console.log(dataTag);
    //display genres
    data.data.forEach((genre, index) => {
      const x = document.createElement("div");
      x.innerHTML = `<div class="info-wrapper name-wrapper genre-name"><div class="game-name">${genre.name}</div></div>`;
      //display genre-related games on click
      const getGameByGenre = async () => {
        try {
          const url = `https://cs-steam-api.herokuapp.com/games?genres=${genre.name}`;
          const res = await fetch(url);
          const data = await res.json();
          return data;
        } catch (err) {
          console.log("err", err);
        }
      };
      const displayGameByGenre = async () => {
        try {
          const gameByGenre = await getGameByGenre();
          gameDisplay.innerHTML = "";
          gameByGenre.data.forEach((game, index) => {
            const x = document.createElement("div");
            x.innerHTML = `<div class="game-wrapper">
        <div class="game-image"><img class="image" src=${game.header_image}>
        <div class="game-info">
        <div class="info-wrapper name-wrapper"><div class="game-name">${game.name}</div></div>
        <div class="info-wrapper price-wrapper"><div class="game-price">${game.price}</div></div>
        </div>
        </div>
    </div>`;
            x.addEventListener("click", () => {
              newDoc(game.appid);
            });
            gameDisplay.appendChild(x);
          });
        } catch (err) {
          console.log("err", err);
        }
      };

      genreList.appendChild(x);
      x.addEventListener("click", displayGameByGenre);
    });
    //display tags and tag-related games on click
    dataTag.data.forEach((tag, index) => {
      const x = document.createElement("div");
      //display tags
      x.innerHTML = `<div class="info-wrapper name-wrapper tag-name"><div class="tag-name">${tag.name}</div></div>`;
      //get and display tag-related games
      const getGameByTag = async () => {
        try {
          const url = `https://cs-steam-api.herokuapp.com/games?steamspy_tags=${tag.name}`;
          const res = await fetch(url);
          const data = await res.json();
          return data;
        } catch (err) {
          console.log("err", err);
        }
      };
      const displayGameByTag = async () => {
        try {
          const gameByTag = await getGameByTag();
          gameDisplay.innerHTML = "";
          gameByTag.data.forEach((game, index) => {
            const x = document.createElement("div");
            x.innerHTML = `<div class="game-wrapper">
        <div class="game-image"><img class="image" src=${game.header_image}>
        <div class="game-info">
        <div class="info-wrapper name-wrapper"><div class="game-name">${game.name}</div></div>
        <div class="info-wrapper price-wrapper"><div class="game-price">${game.price}</div></div>
        </div>
        </div>
    </div>`;
            x.addEventListener("click", () => {
              newDoc(game.appid);
            });
            gameDisplay.appendChild(x);
          });
        } catch (err) {
          console.log("err", err);
        }
      };

      tagList.appendChild(x);
      x.addEventListener("click", displayGameByTag);
    });
  } catch (err) {
    console.log("err", err);
  }
};
window.addEventListener("load", displayGenresAndTags);
