const searchInput = document.querySelector('.recherche-poke input');
let allPokemon = [];
let tableauFin = [];


function fetchPokemonBase(){
    //on limite à 151 pokemons ?limit=151
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(reponse => reponse.json())
        .then((allPoke) => {
           //un tableau contenant 151 pokemon avec le nom et un url
           console.log(allPoke);
           // pour chaque éléments du tableau, on envoit une fonction qui aura comme paramètre pokemon
            allPoke.results.forEach((pokemon) => {
                //on passe cette méthode avec le paramètre pokemon
                fetchPokemonComplet(pokemon);
            })
        })
}
fetchPokemonBase();

function fetchPokemonComplet(pokemon) {
    //on crée un objet qui contiendra  les caractéristiques du pokemon
    let objPokemonFull = {};
    //on se sert du paramètre pokemon pour mettre l'url et le name dans des variables
    let url = pokemon.url;
    //console.log(url);
    let nameP = pokemon.name;

     //on appelle l'url ce chaque pokemon contenant ses caractéristiques 
    fetch(url)
    .then(reponse => reponse.json())
    .then((pokeData) => {
        //un tableau contenant 151 pokemon avec leur caractéristiques 
        //console.log(pokeData);

        // on récupère les images, le type et l'id qu'on rajoute à l'objet objPokemonFull
        objPokemonFull.pic = pokeData.sprites.front_default;
        objPokemonFull.type = pokeData.types[0].type.name;
        objPokemonFull.id = pokeData.id;

        //on appelle chaque pokemon pour avoir les noms dans toutes les langues (en utilisant le nom de la variable nameP)
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then(reponse => reponse.json())
        .then((pokeData) => {
            //console.log(pokeData);

        // on récupère le nom en fr qu'on rajoute à l'attribut à l'objet objPokemonFull 
        objPokemonFull.name = pokeData.names[4].name;
        // on push toutes les données de l'objet objPokemonFull au tableau allPokemon
        allPokemon.push(objPokemonFull);

        if(allPokemon.length === 151) {
            //console.log(allPokemon);

            /*on trie le tableau de a à z en mettant les id dans l'ordre
            méthode sort = on prend le 1er élèment du tableau et on le soustrait à un autre élèment (3 valeurs : a>b, a=b, a<b)
            suivant ces valeurs a va être positionné avant ou après b*
            ex : a:151 - b:10 = 141 ,a>b, a sera positionné après b, 10 - 151*/
            tableauFin = allPokemon.sort((a,b) => {
                return a.id - b.id;
                //on prend les 21er pokemons
            }).slice(0,21);
             console.log(tableauFin);

            /*createCard(tableauFin);
            chargement.style.display = "none";*/
        }    

    })


})
  



}













// Animation Input (rentrer des élèments)
//tant que l'input contient des caractères la classe active-input est activée
searchInput.addEventListener('input', function(e) {
    //e = objet qui contient les propriétés de l'évènement, target = input , value = contenu input
    if(e.target.value !== "") {
        // on ajoute la class active-input au form (parentNode)
        e.target.parentNode.classList.add('active-input');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }

})