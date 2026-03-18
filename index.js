// --- Navigation Logic ---
function nextPage(pageId) {
    // Remove active class from all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Add active class to the target page
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');
    targetPage.scrollTop = 0; // Reset scroll position for new page

    // Trigger specific animations based on page
    if (pageId === 'page-message') {
        // Slight delay to allow page transition to finish before typing
        setTimeout(typeWriter, 600); 
    }
}

function startJourney() {
    // Robust Audio Playback
    const audio = document.getElementById("bgMusic");
    const muteBtn = document.getElementById("muteBtn");
    
    audio.volume = 0.4;
    audio.play().then(() => {
        muteBtn.classList.remove("hidden");
        muteBtn.innerText = "🔊";
    }).catch(e => {
        console.log("Autoplay blocked. User needs to interact with the mute button.");
        muteBtn.classList.remove("hidden");
        muteBtn.innerText = "🔇";
    });
    
    nextPage('page-message');
}

// --- Music Mute/Unmute ---
document.getElementById('muteBtn').addEventListener('click', function() {
    const audio = document.getElementById("bgMusic");
    if (audio.paused) {
        audio.play();
        this.innerText = "🔊";
    } else {
        audio.pause();
        this.innerText = "🔇";
    }
});

// --- Typewriter Effect (Glitch-Free) ---
const messageText = "Happy Birthday to the most amazing person in my life. Every moment with you feels like a dream. Thank you for being you, and for loving me. Today is all about you! 💕";
let isTyping = false; // Prevents multiple triggers

function typeWriter() {
    if (isTyping) return; 
    isTyping = true;
    
    const textElement = document.getElementById("typewriter-text");
    const nextBtn = document.getElementById("msgNextBtn");
    textElement.innerHTML = "";
    
    let i = 0;
    function type() {
        if (i < messageText.length) {
            textElement.innerHTML += messageText.charAt(i);
            i++;
            setTimeout(type, 45); // Speed of typing
        } else {
            nextBtn.classList.remove("hidden");
        }
    }
    type();
}

// --- AI-Like Quote Generator (Smooth Transitions) ---
const quotes = [
    "I look at you and see the rest of my life in front of my eyes.",
    "If I know what love is, it is because of you.",
    "I love you not only for what you are, but for what I am when I am with you.",
    "You are my today and all of my tomorrows.",
    "To the world you may be one person, but to me you are the world."
];

let isGeneratingQuote = false;

function generateQuote() {
    if (isGeneratingQuote) return; // Prevent spam clicking
    isGeneratingQuote = true;

    const quoteDisplay = document.getElementById('quote-display');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Fade out
    quoteDisplay.style.opacity = 0;
    
    setTimeout(() => {
        // Change text while invisible
        quoteDisplay.innerText = `"${randomQuote}"`;
        // Fade in
        quoteDisplay.style.opacity = 1;
        isGeneratingQuote = false;
    }, 400); // Matches CSS transition time
}

// --- Surprise & Confetti ---
function triggerSurprise() {
    const hiddenSurprise = document.getElementById('hidden-surprise');
    const revealBtn = document.getElementById('revealBtn');
    
    revealBtn.classList.add('hidden'); // Hide the button after click
    hiddenSurprise.classList.remove('hidden');
    hiddenSurprise.classList.add('fade-in');
    
    createConfetti();
}

function createConfetti() {
    const colors = ['#ff758c', '#d4af37', '#ffffff', '#a6c1ee'];
    const amount = window.innerWidth < 600 ? 50 : 100; // Less confetti on mobile to prevent lag
    
    for (let i = 0; i < amount; i++) {
        let confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random() + 0.5;
        document.body.appendChild(confetti);
        
        // Cleanup DOM to prevent lag
        setTimeout(() => confetti.remove(), 5000);
    }
}

// --- Floating Hearts Background (Memory Leak Fix) ---
const maxHearts = 25; // Cap the amount of hearts on screen

function createHeart() {
    // Don't create new hearts if there are already too many
    if (document.querySelectorAll('.heart').length >= maxHearts) return;

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = ['❤️', '💖', '✨', '💕'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 6 + 6) + 's'; // 6 to 12 seconds
    heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
    
    document.getElementById('hearts-bg').appendChild(heart);
    
    // Cleanup DOM
    setTimeout(() => {
        if(heart.parentNode) heart.remove();
    }, 12000); 
}

// Create a new heart every 600ms
setInterval(createHeart, 600);
