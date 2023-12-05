 // Lista de palavras para o jogo
 const words = ["carro", "moto", "maratona", "parênteses", "computador", "segurança da informações", "sistema"];

 // Palavra a ser adivinhada
 let chosenWord = words[Math.floor(Math.random() * words.length)];

 // Estado atual da palavra a ser exibido
 let displayWord = Array(chosenWord.length).fill("_");

 // Número de tentativas incorretas permitidas
 let maxIncorrectGuesses = 8;

 // Tentativas e letras adivinhadas
 let incorrectGuesses = 0;
 let guessedLetters = [];

 // Elementos da interface do usuário
 const wordElement = document.getElementById("word");
 const guessesElement = document.getElementById("guesses");
 const hangmanElement = document.getElementById("hangman");
 const letterInputElement = document.getElementById("letterInput");

 // Função para atualizar a exibição da palavra
 function updateDisplayWord() {
   wordElement.textContent = displayWord.join(" ");
 }

 // Função para atualizar a exibição das letras adivinhadas
 function updateGuessedLetters() {
   guessesElement.textContent = "Letras adivinhadas: " + guessedLetters.join(", ");
 }

 // Função para desenhar o enforcado
 function drawHangman() {
   hangmanElement.textContent = "Tentativas incorretas: " + incorrectGuesses + "/" + maxIncorrectGuesses;
 }

 // Função para verificar se a letra está na palavra
 function checkLetter(letter) {
   if (chosenWord.includes(letter)) {
     // A letra está na palavra
     for (let i = 0; i < chosenWord.length; i++) {
       if (chosenWord[i] === letter) {
         displayWord[i] = letter;
       }
     }
   } else {
     // A letra não está na palavra
     incorrectGuesses++;
   }

   // Adiciona a letra às letras adivinhadas
   guessedLetters.push(letter);

   // Atualiza a exibição
   updateDisplayWord();
   updateGuessedLetters();
   drawHangman();

   // Verifica se o jogador ganhou
   if (!displayWord.includes("_")) {
     alert("Parabéns! Você venceu!");
     resetGame();
   }

   // Verifica se o jogador perdeu
   if (incorrectGuesses === maxIncorrectGuesses) {
     alert("Você perdeu! A palavra era: " + chosenWord);
     resetGame();
   }
 }

 // Função para adivinhar uma letra
 function guessLetter() {
   const input = letterInputElement.value.toLowerCase();

   if (input.length !== 1 || !/[a-z]/.test(input)) {
     alert("Por favor, insira uma única letra válida.");
     return;
   }

   if (guessedLetters.includes(input)) {
     alert("Você já adivinhou esta letra. Tente outra.");
     return;
   }

   checkLetter(input);
 }

 // Função para reiniciar o jogo
 function resetGame() {
   chosenWord = words[Math.floor(Math.random() * words.length)];
   displayWord = Array(chosenWord.length).fill("_");
   incorrectGuesses = 0;
   guessedLetters = [];
   updateDisplayWord();
   updateGuessedLetters();
   drawHangman();
 }

 // Inicializa o jogo
 updateDisplayWord();
 drawHangman();