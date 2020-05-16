
// sélectionner les éléments
// sélectionner le bouton effacer
const clear = document.getElementById("clear");
// sélectionner l'élément avec l'id "date"
const dateElement = document.getElementById("date");
// sélectionner la liste
const list = document.getElementById("list");
// sélectionner l'input, la saisie
const input = document.getElementById("input")


// classe names
// classe Font awesome permettant d'obetenir le rond check
const CHECK = "fa-check-circle";
// classe Font awesome permettant d'obetenir le rond 
const UNCHECK = "fa-circle-thin";
// classe Font awesome permettant d'obetenir l'effet rayer
const LINE_THROUGH = "lineThrough";


//  les variables
let LIST, id;

// récupere toDo (date) from localstorages
let data = localStorage.getItem("TODO");

// Controle si data (la LIST) n'est pas vide 
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list, 
                     //Si le dernier id était 3 LIST.length return 4, 4 sera l'id du prochain toDo
    loadList(LIST); // charge la List 
} else {
    // if data is empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    // boucle dans le tableau pour récuperer les toDo el leur info
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


// on écoute les click sur la div clear qui contien le bouton
// quand le bouton est presser efface la mémoire et on relance
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});




//Affiche la date du jours
const options = {weekday : "long", month:"long", day:"numeric"}; // options d'affichage de la date
const today = new Date(); // affecte la date a today
dateElement.innerHTML = today.toLocaleDateString("fr-FR", options)// affiche la date


// function ajouter toDO,  qui prend en parametre le text, la classe FontAwesome(id), done et trash
function addToDo(toDo, id, done, trash){ // 

    // si toDo est dans la poubelle on arrete
    //  si non on continue
    if(trash){return;}

    // sélectione des classe name FontAwesome
    // opérateur ternaire
    // condition ? siVrai : siFaux. 
   const DONE = done ? CHECK : UNCHECK; // si done est true = CHECK, else = UNCHECK

    // si done est true = LINE_THROUGH, si false ""
    const LINE = done ? LINE_THROUGH : "";


    // text représente le code html de la tâche
    const text =  
    `<li class="item">
        <i class="fa  ${DONE}  co" job="complete" id="${id}"></i> 
        <p class="text ${LINE}"> ${toDo} </p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>`;

    const position = "beforeend"
    // ajoute text a la position "beforeend"
    list.insertAdjacentHTML(position, text);
};


// ajouter une tache à la liste
// on ecoute pour savoir si la touche entré et presser
document.addEventListener("keyup", function(event){
    //  Si entré et presser _ keycode 13 = enter
    if (event.keyCode == 13){
        // recupere l'input
        const toDo = input.value; 
        // controle si l'input est pas vide _ si false l'input est vide
        if (toDo){ 
            // 4 parametres: 
            // a) la tâche, name
            // b) son numéro, id
            // c) si elle est effectué, done    
            // d) si elle est à la poubelle, trash
            addToDo(toDo, id, false, false);

            //ajoute la tache à la liste avec .push
            LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
            });

            // ajoute le ToDo a la memoire local (ce code doit  etre ajouter quand on met a jour la LIST)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
    
        }
        input.value ="";
    }
});

// tache compléter
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
};

// effacer les taches
function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
};

// cible les elements que contient la list (parent element) dinamiquement
// on ecoute les clicks 
list.addEventListener("click", function(event){
    const element = event.target; // retourne l'élément cliquer (son code)
    const elementJob = element.attributes.job.value; // complete or delete

    // se toDo est effectuer
    if (elementJob == "complete"){
        completeToDo(element); // toDo check
    // si toDo est effacer
    }else if(elementJob =="delete"){
        removeTodo(element); // efface toDo
    }
    // ajoute le ToDo a la memoire local (ce code doit  etre ajouter quand on met a jour la LIST)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});




// HORLOGE
// rafraichi toutes les secondes
setInterval(setClock, 1000)
// récupere l'aiguille des heures , des minutes, et secondes
const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')


function setClock() {
    // on récuere l'heure actuel
  const currentDate = new Date()
  // transformation de l'heure en seconde
  const secondsRatio = currentDate.getSeconds() / 60
  // en minute
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
  // en heure
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
  // asigne les donnés aux aiguilles
  setRotation(secondHand, secondsRatio)
  setRotation(minuteHand, minutesRatio)
  setRotation(hourHand, hoursRatio)
}


function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}

// lance la fonction est affiche l'heure
setClock()