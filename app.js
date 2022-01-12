let allPokemon = [];
let tableauFin = [];

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};


//Appel API 

function fetchPokemonBase(){
    //on limite à 151 pokemons ?limit=151
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(reponse => reponse.json())
        .then((allPoke) => {
           //un tableau contenant 151 pokemon avec le nom et un url
           console.log(allPoke);
           // pour chaque éléments du tableau, on envoit une fonction qui aura comme paramètre pokemon
            allPoke.results.forEach((pokemon) => {
                //on appelle la fonction fetchPokemonComplet avec le paramètre pokemon
                fetchPokemonComplet(pokemon);
            })
        })
}


//Appel de la fonction fetchPokemon
fetchPokemonBase();



//Récupèration des données choisies des pokemon 

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
                    //on coupe pour prendre les 21 premiers pokemons
                }).slice(0,21);
                console.log(tableauFin);

                //on appelle la fonction createCard
                createCard(tableauFin);
                /*chargement.style.display = "none";*/
            }    
        })
    })
}



// Création des cartes

//on le nomme arr = tableauFin
function createCard(arr){

    for(let i = 0; i < arr.length; i++) {
        const listePoke = document.querySelector('.liste-poke');
        const carte = document.createElement('li');
        listePoke.appendChild(carte);
        //on associe chaque couleur de la variable types au type de chaque pokemon [arr[i].type]
        let couleur = types[arr[i].type];
        //le background sera égal à la couleur de son type
        carte.style.background = couleur;

        const txtCarte = document.createElement('h5');
        carte.appendChild(txtCarte);
        txtCarte.innerText = arr[i].name;

        const idCarte = document.createElement('p');
        carte.appendChild(idCarte);
        idCarte.innerText = `ID# ${arr[i].id}`;

        const imgCarte = document.createElement('img');
        carte.appendChild(imgCarte);
        imgCarte.src = arr[i].pic;
    }

}



// Scroll Infini

//évènement scroll sur la fenêtre globale
window.addEventListener('scroll', () => {
    //on a sorti ces 3 valeurs de documentElement pour les mettre dans une constante
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    // scrollTop = scroll depuis le top (hauteur depuis le haut)
    // scrollHeight = scroll total (hauteur page)
    // clientHeight = hauteur de la fenêtre (partie visible)
    // console.log(scrollTop, scrollHeight, clientHeight);

    // si partie visible + hauteur depuis le haut >=  hauteur total
    if(clientHeight + scrollTop >= scrollHeight - 20) {
        // on applique la fonction poke avec 6 cartes
        addPoke(6);
    }

})
 //nombre pokemon qu'on a déjà fait
let index = 21;


function addPoke(nb) {
    // si pokemon > 151 on ne fait plus rien
    if(index > 151) {
        return;
    }
    // sinon on coupe le tableau allPokemon à partir de index (21 pokemons)
    const arrToAdd = allPokemon.slice(index, index + nb);
    console.log(index, index + nb);
    //on rappelle de nouveau la fonction createCard avec les paramètres arrToAdd
    createCard(arrToAdd);
    //la fonction rajoute à chaque fois 6 à l'index mis à jour
    index += nb;
}



// Recherche 

/*const formRecherche = document.querySelector('form');
formRecherche.addEventListener('submit', (e) => {
    e.preventDefault();
    recherche();
})*/
    

const searchInput = document.querySelector('.recherche-poke input');
/*à chaque saisie de caractères dans l'input, on applique la fonction "recherche" (qu'on met à part)
qui va afficher tous les pokemons*/
searchInput.addEventListener('keyup', recherche);

function recherche(){

    /*si le nombre de pokemon affiché < 151 on affiche les 130 autres pokemons
    ex : index = 30 donc 30 + 130 = 160 > 151 (plus grand que longueur du tableau) 
    MAIS slice va automatiquement remettre à la longueur max du tableau (151)*/
    if(index < 151) {
        addPoke(130);
    }

    //mettre variables sans déclarer de valeurs 
    let filter, allLi, allTitles, titleValue;
    //mettre les valeurs
    //valeurs de searchInput en majuscules
    filter = searchInput.value.toUpperCase();
     //selection des li
    allLi = document.querySelectorAll('li');
    //selection des h5 dans les li
    allTitles = document.querySelectorAll('li > h5');
    
    //on affiche tous les li
    for(i = 0; i < allLi.length; i++) {

        //nom des pokemons dans les li (texte de h5)
        titleValue = allTitles[i].innerText;

        //si le nom des pokemons des cartes correspond à l'index de ce qu'on recherche (>-1 = 0,1,2...)
        if(titleValue.toUpperCase().indexOf(filter) > -1) {
            //on maintient le display flex 
            allLi[i].style.display = "flex";
            //sinon on enlève l'affichage
        } else {
            allLi[i].style.display = "none";
        }

    }

}



// Animation Input (rentrer des élèments)

//tant que l'input contient des caractères, on applique la fonction "e" qui active la classe active-input
searchInput.addEventListener('input', function(e) {
    //e = objet qui contient les propriétés de l'évènement, target = input , value = contenu input
    if(e.target.value !== "") {
        // on ajoute la class active-input au form (parentNode)
        e.target.parentNode.classList.add('active-input');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }

})