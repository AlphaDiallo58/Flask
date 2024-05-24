document.addEventListener("DOMContentLoaded", function() {
    const words = ["Innovation", "Créativité", "Inspiration", "Motivation", "Succès", "Objectif", "Rêve", "Passion", "Vision", "Mission", "Valeur", "Leadership", 
    "Détermination", "Courage", "Persévérance","Mental","Véracité","Bravoure","Ecole","Jeu","Amusement",
    "Intelligence","Collège","Mathématiques","Physique","Sciences","Société"];
    const container = document.getElementById('animated-words');

    words.forEach(word => {
        let span = document.createElement('span');
        span.textContent = word;
        container.appendChild(span);
        span.style.left = `${Math.random() * 100}%`;
        span.style.top = `${Math.random() * 100}%`;
        span.style.animationDuration = `${Math.random() * 5 + 5}s`;
    });
});
