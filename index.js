// --- Navigation Logic ---
function nextPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Show target page
    document.getElementById(pageId).classList.add('active');

    // Trigger specific animations based on page
    if (pageId === 'page-message') {
        typeWriter();
    }
}

function startJourney() {
    // Attempt to play music
    let audio = document.getElementById("bgMusic");
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play prevented by browser."));
    document.getElementById("muteBtn").innerText = "🔊";
    
    nextPage('page-message');
}

// --- Music Mute/Unmute ---
document.getElementById('muteBtn').addEventListener('click', function() {
    let audio = document.getElementById("bgMusic");
    if (audio.paused) {
        audio.play();
        this.innerText = "🔊";
    } else {
        audio.pause();
        this.innerText = "🔇";
    }
});

// --- Typewriter Effect for Message Page ---
const messageText = "Happy Birthday to the most amazing person in my life. Every moment with you feels like a dream. Thank you for being you, and for loving me. Today is all about you! 💕";
let i = 0;
function typeWriter() {
    if (i < messageText.length) {
        document.getElementById("typewriter-text").innerHTML += messageText.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // Speed of typing
    } else {
        document.getElementById("msgNextBtn").classList.remove("hidden");
    }
}

// --- AI-Like Quote Generator ---
const quotes = [
    "I look at you and see the rest of my life in front of my eyes.",
    "If I know what love is, it is because of you.",
    "I love you not only for what you are, but for what I am when I am with you.",
    "You are my today and all of my tomorrows.",
    "To the world you may be one person, but to me you are the world."
];

function generateQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.style.opacity = 0;
    setTimeout(() => {
        quoteDisplay.innerText = `"${randomQuote}"`;
        quoteDisplay.style.opacity = 1;
        quoteDisplay.style.transition = "opacity 0.5s";
    }, 200);
}

// --- Surprise & Confetti ---
function triggerSurprise() {
    document.getElementById('hidden-surprise').classList.remove('hidden');
    document.getElementById('hidden-surprise').classList.add('fade-in');
    createConfetti();
}

function createConfetti() {
    const colors = ['#ff758c', '#d4af37', '#fff', '#a6c1ee'];
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => confetti.remove(), 5000);
    }
}

// --- Floating Hearts Background ---
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = ['❤️', '💖', '✨', '💕'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
    
    document.getElementById('hearts-bg').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 10000);
}
setInterval(createHeart, 500); // Create a new heart every 0.5 seconds
