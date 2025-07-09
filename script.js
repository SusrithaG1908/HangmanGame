const wordEl = document.getElementById('word');
    const wrongEl = document.getElementById('wrong');
    const popup = document.getElementById('popup-container');
    const messageEl = document.getElementById('message');
    const playButton = document.getElementById('play-button');
    const figureParts = document.querySelectorAll('.part');

    //const words = ['javascript', 'python', 'hangman', 'interface', 'browser', 'function', 'react'];
    const words = [
  'apple', 'banana', 'guitar', 'pencil', 'elephant', 'sunflower', 'mountain',
  'pizza', 'penguin', 'river', 'island', 'camera', 'unicorn', 'firetruck',
  'umbrella', 'volcano', 'chocolate', 'library', 'mirror', 'rocket', 'bicycle',
  'cloud', 'carrot', 'monkey', 'pyramid', 'zebra', 'peacock', 'balloon',
  'notebook', 'skateboard', 'dragon', 'pillow', 'candle', 'football',
  'rainbow', 'backpack', 'television', 'desert', 'koala', 'glacier',
  'waterfall', 'moonlight', 'sandwich', 'parrot', 'snowman', 'helicopter',
  'honey', 'diamond', 'jungle', 'cactus', 'tiger', 'violin', 'whistle',
  'ladder', 'puzzle', 'clock', 'train', 'ladle', 'compass', 'paintbrush',
  'tractor', 'castle', 'beach', 'kangaroo', 'robot', 'strawberry', 'coconut',
  'campfire', 'leaf', 'planet', 'laptop', 'treasure', 'ghost', 'bottle',
  'mango', 'coin', 'window', 'grape', 'school', 'donut', 'cheese', 'cookie',
  'garage', 'hammer', 'chair', 'sofa', 'forest', 'riverbank'
];

    let selectedWord = words[Math.floor(Math.random() * words.length)];

    let correctLetters = [];
    let wrongLetters = [];

    function displayWord() {
      wordEl.innerHTML = selectedWord
        .split('')
        .map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`)
        .join('');

      const innerWord = wordEl.innerText.replace(/\n/g, '');
      if (innerWord === selectedWord) {
        messageEl.innerText = '🎉 Congratulations! You won!';
        popup.style.display = 'flex';
      }
    }

    function updateWrongLetters() {
      wrongEl.innerText = wrongLetters.join(', ');

      figureParts.forEach((part, index) => {
        part.style.display = index < wrongLetters.length ? 'block' : 'none';
      });

      if (wrongLetters.length === figureParts.length) {
        messageEl.innerText = `Unfortunately you lost. 😟\nThe word was "${selectedWord}".`;
        popup.style.display = 'flex';
      }
    }

    window.addEventListener('keydown', e => {
      const letter = e.key.toLowerCase();
      if (letter >= 'a' && letter <= 'z') {
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLetters();
          }
        }
      }
    });

    playButton.addEventListener('click', () => {
      correctLetters = [];
      wrongLetters = [];
      selectedWord = words[Math.floor(Math.random() * words.length)];
      displayWord();
      updateWrongLetters();
      popup.style.display = 'none';
    });

    displayWord();