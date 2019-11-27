// API business
const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers/`;
const POKEMONS_URL = `${BASE_URL}/pokemons/`;

const apiHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};
const get = url => fetch(url).then(resp => resp.json());

const post = (url, id) => {
  return fetch(url, {
    method: "POST",
    headers: apiHeaders,
    body: JSON.stringify({
      trainer_id: id
    })
  }).then(resp => resp.json());
};

const destroy = (url, id) => {
  return fetch(url + id, {
    method: "DELETE"
  }).then(resp => resp.json());
};

const API = { get, post, destroy };

//constants

const trainerDiv = document.querySelector("main");

//functions (dont forget master!)

const getAllTrainers = () => {
  API.get(TRAINERS_URL).then(trainers =>
    trainers.forEach(trainer => makeTrainerCard(trainer))
  );
};

// <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>

const makeTrainerCard = trainer => {
  const trainerCard = document.createElement("div");
  trainerCard.className = "card";

  const h3 = document.createElement("h3");
  h3.innerText = trainer.name;

  const ul = document.createElement("ul");
  ul.className = "pokemon-ul";

  const addPokeButton = document.createElement("button");
  addPokeButton.innerText = "Add Pokemon";

  addPokeButton.addEventListener("click", () =>
    addPokemonToCard(trainer.id, ul)
  );

  trainer.pokemons.forEach(pokemon => makeLi(pokemon, ul));

  trainerCard.append(h3, addPokeButton, ul);
  trainerDiv.append(trainerCard);
};

const addPokemonToCard = (pokemon, ul) => {
  API.post(POKEMONS_URL, pokemon.id).then(pokemon => makeLi(pokemon, ul));
};

const makeLi = (pokemon, parentEl) => {
  const li = document.createElement("li");
  li.innerText = `${pokemon.nickname}(${pokemon.species})`;

  const releaseButton = document.createElement("button");
  releaseButton.innerText = "Release";
  releaseButton.className = "release";
  li.append(releaseButton);

  releaseButton.addEventListener("click", e => releasePokemon(e, pokemon.id));
  parentEl.append(li);
};

const releasePokemon = (e, id) => {
  API.destroy(POKEMONS_URL, id).then(e.target.parentElement.remove());
};

getAllTrainers();
