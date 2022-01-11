const searchInput = document.querySelector('.recherche-poke input');

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