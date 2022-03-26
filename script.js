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
let page = 1;

//display specific game details
function newDoc(x) {
  console.log("here");
  window.location.assign(`game.html?game=${x}`);
  console.log(x);
}

//load game for display
const getGames = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/games?page=1&limit=10`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const displayGames = async () => {
  try {
    const data = await getGames();
    console.log(data);
    gameDisplay.innerHTML = "";
    data.data.forEach((game, index) => {
      const x = document.createElement("div");
      x.innerHTML = `<div class="game-wrapper">
      <div class="game-image"><img class="image" src=${game.header_image}>
      <div class="game-info">
      <div class="info-wrapper name-wrapper"><div class="game-name">${game.name}</div></div>
      <div class="info-wrapper price-wrapper"><div class="game-price">${game.price}</div></div>
      </div>
      </div>
  </div>`;
      console.log(game.appid);
      x.addEventListener("click", () => {
        newDoc(game.appid);
      });
      gameDisplay.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};

window.addEventListener("load", displayGames);
//display next games:
const getNextGames = async () => {
  try {
    page += 1;
    const url = `https://cs-steam-api.herokuapp.com/games?page=${page}&limit=10`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const displayNextGames = async () => {
  try {
    const data = await getNextGames();
    gameDisplay.innerHTML = "";
    data.data.forEach((game, index) => {
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
next.addEventListener("click", displayNextGames);
//display previous games
const getPreviousGames = async () => {
  try {
    page -= 1;
    const url = `https://cs-steam-api.herokuapp.com/games?page=${page}&limit=10`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const displayPreviousGames = async () => {
  try {
    const data = await getPreviousGames();
    gameDisplay.innerHTML = "";
    data.data.forEach((game, index) => {
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

previous.addEventListener("click", displayPreviousGames);
//search for a specific game

let inputSearchValue;
const searchValue = (e) => {
  inputSearchValue = e.target.value;
  inputSearch.innerHTML = inputSearchValue;
  console.log(inputSearchValue);
};
inputSearch.addEventListener("keyup", searchValue);

const getSpecificGame = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/games?q=${inputSearchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const displaySpecificGame = async () => {
  try {
    const data = await getSpecificGame();
    console.log(data);
    gameDisplay.innerHTML = "";
    data.data.forEach((game, index) => {
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

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  displaySpecificGame();
});

//display genre list, tag list
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
