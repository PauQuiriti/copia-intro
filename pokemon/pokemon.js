const getPokemon =  async() => {
    const id = aleatorio()
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const {name,sprites} = response.data
    const h2 = document.getElementsByTagName('h2')[0]
    const img = document.getElementsByTagName('img')[0]
    h2.textContent = name.toUpperCase()
    img.src= sprites.other.dream_world.front_default;
}

function aleatorio() { // min and max included 
    return Math.floor(Math.random() * (499 + 1) + 1)
  }

const pokeball = document.getElementsByTagName('button')[0]
pokeball.addEventListener('click', getPokemon)