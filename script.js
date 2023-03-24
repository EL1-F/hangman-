const wordEl=document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl= document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const messageShow = document.getElementById('message');
const buttonAgain = document.getElementById('play-again');

function getRandomWord() {
    const words = ["çiçek","böcek","kedi","köpek","kalem","kitap","defter"];

    return words[Math.floor(Math.random()*words.length)];
}

const correctLetters = [];
const wrongLetters=[];
let selectedWord = getRandomWord();

function displayWord() {
    

    wordEl.innerHTML =`
        ${selectedWord.split('').map(letter =>`
            <div class = "letter">
                ${correctLetters.includes(letter) ? letter:''}
            </div>
        `).join('')}
    
    `;

    const w = wordEl.innerText.replace(/\n/g,'');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        messageEl.innerText = 'Tebrikler Kazandıız.';
    }
}

function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length>0?'<h3>Hatalı Harfler</h3>':''}
        ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;

    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display= 'block';
        }else{
            item.style.display = 'none';
        }
    });

    if (wrongLetters.length == items.length) {
        popup.style.display = 'flex';
        messageEl.innerText = 'Maalesef Kaybettiniz.'
    }
}

function displayMessage() {
    messageShow.classList.add('show');

    setTimeout(function() {
        messageShow.classList.remove('show')
    },1800);
}

buttonAgain.addEventListener('click',function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    popup.style.display='none';

});

window.addEventListener('keydown',function(e) {
   
    if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode ==219 || e.keyCode ==220 || e.keyCode ==191 || e.keyCode ==221 || e.keyCode ==222 || e.keyCode ==186) {
        const letter = e.key;
        //console.log(e.keyCode);

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }else{
               displayMessage();
            }
        }else{
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }
    }

});

displayWord();