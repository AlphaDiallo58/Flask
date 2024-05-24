document.addEventListener("DOMContentLoaded", function() {
    const generateWordBtn = document.getElementById("generate-word");
    const showWordBtn = document.getElementById("show-word");
    const readDefinitionBtn = document.getElementById("read-definition");
    const pauseBtn = document.getElementById("pause-definition");
    const wordCard = document.getElementById("hidden-word");
    const definitionCard = document.getElementById("definition");

    let isPaused = false;
    let currentWord = ''; 

    
    function resetAndShowSticker() {
        wordCard.style.background = 'url("/static/images/emoji-1585265_1280.png") no-repeat center center';
        wordCard.style.backgroundSize = 'contain';
        wordCard.style.opacity = '1'; 
        wordCard.textContent = ''; 
        wordCard.style.transform = 'translateY(20px)';
    }

    function generateWord() {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel(); 
        }
        resetAndShowSticker();
        fetch("/mot_aleatoire")
            .then(response => response.json())
            .then(data => {
                currentWord = data.mot; 
                definitionCard.textContent = data.definitions.join(', ');
                
                wordCard.style.opacity = '0';
                setTimeout(() => { wordCard.style.opacity = '1'; }, 0); 
            })
            .catch(error => console.error('Erreur lors de la récupération du mot aléatoire:', error));
    }
    

    function showWord() {
        
        wordCard.style.background = 'none'; 
        wordCard.textContent = currentWord; 
        wordCard.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        wordCard.style.opacity = '1'; 
        wordCard.style.transform = 'translateY(0)';
    }

    function readDefinition() {
        if (isPaused) {
            speechSynthesis.resume();
            isPaused = false;
        } else {
            const definition = definitionCard.textContent;
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel(); 
                const utterance = new SpeechSynthesisUtterance(definition);
                utterance.lang = 'fr-FR';
                speechSynthesis.speak(utterance);
            } else {
                alert("La synthèse vocale n'est pas prise en charge par ce navigateur.");
            }
        }
    }

    function togglePause() {
        if (speechSynthesis.speaking && !isPaused) {
            speechSynthesis.pause();
            isPaused = true;
        } else if (isPaused) {
            speechSynthesis.resume();
            isPaused = false;
        }
    }

    generateWordBtn.addEventListener("click", generateWord);
    showWordBtn.addEventListener("click", showWord);
    readDefinitionBtn.addEventListener("click", readDefinition);
    pauseBtn.addEventListener("click", togglePause);
});
