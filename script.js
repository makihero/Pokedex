// Obtener una referencia al elemento HTML con el id "poke-container".
const poke_container = document.getElementById("poke-container");

//Cantidad de pokemones que se cargarán
const pokemon_count = 250;

//Asigna colores a tipos de pokemon
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

// Crear un array de tipos principales de Pokémon.
const main_types = Object.keys(colors);

// Función asincrónica para cargar datos de Pokémon.
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

// Función asincrónica para obtener datos de un Pokémon específico.
const getPokemon = async (id) => {
  // Construir la URL de la API de Pokémon para obtener los datos del Pokémon.
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  
  // Realizar una solicitud a la URL y esperar la respuesta.
  const res = await fetch(url);
  
  // Convertir la respuesta en formato JSON.
  const data = await res.json();
  
  // Llamar a la función para crear una tarjeta de Pokémon con los datos obtenidos.
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
    // Crear un div para la tarjeta del Pokémon
    const card = document.createElement("div");
    card.classList.add("pokemon");
  
    // Configurar el fondo de la tarjeta según el tipo del Pokémon
    const type = pokemon.types[0].type.name;
    card.style.backgroundColor = colors[type];
  
    // Crear un div para la imagen
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
  
    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;
  
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
  
    // Crear elementos para mostrar el número, nombre y tipo del Pokémon
    const number = document.createElement("span");
    number.classList.add("number");
    number.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
  
    const name = document.createElement("h3");
    name.classList.add("name");
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
    const typeElement = document.createElement("small");
    typeElement.classList.add("type");
    typeElement.innerHTML = `Type: <span>${type}</span>`;
  
    // Agregar los elementos al contenedor de información
    const info = document.createElement("div");
    info.classList.add("info");
    info.appendChild(number);
    info.appendChild(name);
    info.appendChild(typeElement);
  
    card.appendChild(info);
  
    // Agregar la tarjeta del Pokémon al contenedor principal
    poke_container.appendChild(card);
  };

fetchPokemons();
