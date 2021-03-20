
// 2C = Two of Clubs (Tréboles)
// 2D = Two of Diamonds (Diamante)
// 2H = Two of Hearts (Corazones)
// 2S = Two of Spades (Espadas)

let deck = [];
const tiposC = ['C', 'D', 'H', 'S'];
const especialesC = ['A', 'J', 'Q', 'K'];

let puntosPlayer = 0,
    puntosPC = 0;

//Referencias del HTML
const btnInicio = document.querySelector('#btnInicio');
const btnPedir = document.querySelector('#btnPedir');
const btnTerminar = document.querySelector('#btnTerminar');
const divCartaJug = document.querySelector('#player-card');
const divCartaPC = document.querySelector('#rival-card');
const puntosHTML = document.querySelectorAll('small');



//Crea nuevo deck
const crearDeck = () => {

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

    // console.log({deck});
    deck = _.shuffle(deck);
    console.log({ deck });
    return deck;

}

crearDeck();

//Pedimos una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay mas cartas';

    }

    const carta = deck.pop()

    return carta;

}

// pedirCarta();

const valorCarta = (carta) => {

    // let puntos = 0;

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}

// Turno AI

const turnoAI = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntosPC = puntosPC + valorCarta(carta);
        puntosHTML[1].innerText = puntosPC;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${carta}.png`;
        imgCard.classList.add('carta');
        divCartaPC.append(imgCard);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosPC < puntosMinimos) && (puntosMinimos <= 21));

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

    }, 95);



}

// const valor = valorCarta(pedirCarta());

//eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosPlayer = puntosPlayer + valorCarta(carta);
    puntosHTML[0].innerText = puntosPlayer;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${carta}.png`;
    imgCard.classList.add('carta');
    divCartaJug.append(imgCard);



    if (puntosPlayer > 21) {

        console.warn('Valiste');
        btnPedir.disabled = true;
        btnTerminar.disabled = true;
        turnoAI(puntosPlayer);
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
    turnoAI(puntosPlayer);

});

btnInicio.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosPlayer = 0;
    puntosPC = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartaJug.innerHTML = '';
    divCartaPC.innerHTML = '';

    btnPedir.disabled = false;
    btnTerminar.disabled = false;


});


