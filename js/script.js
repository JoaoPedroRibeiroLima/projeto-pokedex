const POKEMON_IMG = document.getElementById("pokemon_img")
const POKEMON_DATA_NUMBER = document.getElementById("pokemon_data_number")
const POKEMON_DATA_NAME = document.getElementById("pokemon_data_name")
const POKEMON_SEARCH_INPUT = document.getElementById("pokemon_search_input")
const BTN_PREV = document.getElementById("btn_prev")
const BTN_NEXT = document.getElementById("btn_next")
let actualPokemon = 1



async function getPokemon(pokemon) {
    try {
        const endPoint = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
        const response = await fetch(endPoint)
        const data = await response.json()
        if(response.status === 200) {
            return data
        } else {
            console.log(`Server Error: ${response}`)
            return false
        }
    } catch(error) {
        console.log("Fetch Error: " + error)
        return false
    }
}



function renderPokemon(user_input) {
    POKEMON_IMG.src = ''
    POKEMON_DATA_NUMBER.innerHTML = ''
    POKEMON_DATA_NAME.innerHTML = 'Loading...'
    getPokemon(user_input)
    .then((res) => {
        if (res) {
            console.log(res)
            actualPokemon = res.id
            POKEMON_DATA_NUMBER.innerHTML = actualPokemon
            POKEMON_DATA_NAME.innerHTML = ` - ${res.name}`
            POKEMON_IMG.src = res.sprites.versions["generation-v"]["black-white"].animated.front_default
            console.log(`pokemon valor: ${actualPokemon}`)
        } else {
            POKEMON_IMG.src = ''
            POKEMON_DATA_NUMBER.innerHTML = ''
            POKEMON_DATA_NAME.innerHTML = " - Not Found :("
        }
    })
}


POKEMON_SEARCH_INPUT.addEventListener('input', () => {
    renderPokemon(POKEMON_SEARCH_INPUT.value.toLowerCase()) // resetado para minusculo
})

BTN_NEXT.addEventListener("click", () => {
    renderPokemon(actualPokemon + 1)
})

BTN_PREV.addEventListener("click", () => {
    renderPokemon(actualPokemon - 1)
})

//evento default pra iniciaçização
renderPokemon(actualPokemon)
