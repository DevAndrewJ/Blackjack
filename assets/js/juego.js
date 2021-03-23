
// 2C = Two of Clubs (Tréboles)
// 2D = Two of Diamonds (Diamante)
// 2H = Two of Hearts (Corazones)
// 2S = Two of Spades (Espadas)

//funcion anonima 
(() => {
    'use strict'

let deck            = [],
    puntosJugadores = [];

const tiposC        = ['C', 'D', 'H', 'S'],
    especialesC     = ['A', 'J', 'Q', 'K'];

//Referencias del HTML
const btnInicio   = document.querySelector('#btnInicio'),
      btnPedir    = document.querySelector('#btnPedir'),
      btnTerminar = document.querySelector('#btnTerminar'),
      divCartasJugadores = document.querySelectorAll('.divCartas'),
      puntosHTML  = document.querySelectorAll('small');


const inicialJuego = ( numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];

    for (let i = 0; i < numJugadores; i++){
        puntosJugadores.push(0);
    }

    puntosHTML.forEach( elem => elem.innerText = 0);
    divCartasJugadores.forEach ( elem => elem.innerHTML = '');

    btnPedir.disabled = false;
    btnTerminar.disabled = false;
}
//Crea nuevo deck
const crearDeck = () => {

    deck = [];
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tiposC) {

            deck.push(i + tipo);

        }
    }


    for (let tipo of tiposC) {
        for (let esp of especialesC) {
            deck.push(esp + tipo)
        }
    }

    return _.shuffle(deck);

}



//Pedimos una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay mas cartas';

    }
    return deck.pop();
}


const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}

const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno]  = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}

const crearCarta = (carta, turno) => {

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${carta}.png`;
        imgCard.classList.add('carta');
        divCartasJugadores[turno].append(imgCard);
}

const determinarGanador = () => {

    const [puntosMinimos, puntosPC] = puntosJugadores
    setTimeout(() => {
        if (puntosPC === puntosMinimos) {
            alert('Empataste con el AI');
        } else if (puntosMinimos > 21) {
            alert('Has perdido, AI Gana')
        } else if (puntosPC > 21) {
            alert('Has Ganado')
        } else {
            alert('La AI te ha vencido');
        }

    }, 100);
}

// Turno AI

const turnoAI = (puntosMinimos) => {

    let puntosPC = 0;

    do {
        const carta = pedirCarta();
       puntosPC = acumularPuntos(carta, puntosJugadores.length - 1);
        crearCarta(carta, puntosJugadores.length - 1);

    } while ((puntosPC < puntosMinimos) && (puntosMinimos <= 21));

    determinarGanador();

}

//eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta(),
        puntosPlayer = acumularPuntos(carta, 0);

    crearCarta( carta, 0);

    if (puntosPlayer > 21) {

        console.warn('Valiste');
        btnPedir.disabled = true;
        btnTerminar.disabled = true;
        turnoAI(puntosJugadores);
    }
    else if (puntosPlayer === 21) {
        console.warn('21, Genial!!');
        btnPedir.disabled = true;
        btnTerminar.disabled = true;
        turnoAI(puntosPlayer);
    }

});


btnTerminar.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnTerminar.disabled = true;
    turnoAI(puntosJugadores[0]);

});

btnInicio.addEventListener('click', () => {

    inicialJuego();
});

})();




