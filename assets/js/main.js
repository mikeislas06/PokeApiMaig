const APIURL = "https://pokeapi.co/api/v2/pokemon/";

const pokemonNameInput = document.getElementById("pokemonNameInput");
const pokeName = document.getElementById("pokeName");
const pokeType = document.getElementById("pokeType");
const pokeHeight = document.getElementById("pokeHeight");
const pokeWeight = document.getElementById("pokeWeight");
const pokeImage = document.getElementById("pokeImage");
const pokemonDescription = document.getElementById("pokemonDescription");
const goBtn = document.getElementById("goBtn");

goBtn.onclick = (e) => {
    e.preventDefault();

    fetchAPI(pokemonNameInput.value.toLowerCase());
};

const fetchAPI = async (pokemon) => {
    try {
        const resp = await fetch(APIURL + pokemon);
        const result = await resp.json();
        showPokemon(result);
    } catch (error) {
        if (
            error ==
            "SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data"
        ) {
            alert("Pokemon not found");
        }
    }
};

const showPokemon = async (pokemonObject) => {
    pokeImage.setAttribute("src", pokemonObject.sprites.front_default);
    pokeImage.setAttribute("alt", pokemonObject.name);
    pokeName.innerHTML = pokemonObject.name;
    pokeType.innerHTML = pokemonObject.types[0].type.name;
    pokeHeight.innerHTML = pokemonObject.height + "''";
    pokeWeight.innerHTML = pokemonObject.weight + " lbs.";

    const response = await fetch(pokemonObject.species.url);
    const result = await response.json();
    pokemonDescription.innerHTML = result.flavor_text_entries[5].flavor_text;
};
