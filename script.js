// 1. COUNTDOWN
const weddingDate = new Date("Aug 15, 2026 16:00:00").getTime();

setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const format = (n) => n < 10 ? "0" + n : n;
    
    document.getElementById("days").innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerHTML = format(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    document.getElementById("minutes").innerHTML = format(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    document.getElementById("seconds").innerHTML = format(Math.floor((distance % (1000 * 60)) / 1000));
}, 1000);

// 2. MÚSICA
const musicBtn = document.getElementById('musicBtn');
const music = document.getElementById('weddingMusic');
let isPlaying = false; 

// Autoplay al tocar pantalla
document.body.addEventListener('click', function() {
    if (!isPlaying) {
        music.play().then(() => {
            musicBtn.innerHTML = "PAUSE";
            isPlaying = true;
        }).catch(err => console.log("Audio prevent"));
    }
}, { once: true });

musicBtn.onclick = (e) => {
    e.stopPropagation();
    if (isPlaying) { music.pause(); musicBtn.innerHTML = "♪ MÚSICA"; } 
    else { music.play(); musicBtn.innerHTML = "PAUSE"; }
    isPlaying = !isPlaying;
};

// 3. COPIAR CLABE
function copyText(text) {
    navigator.clipboard.writeText(text);
    alert("¡CLABE copiada!"); 
}

// 4. RSVP WHATSAPP
document.getElementById('rsvpForm').onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('guestName').value;
    const asistencia = document.getElementById('attendance').value;
    let mensaje = asistencia === "si" ? `Hola Valentina, soy ${nombre}. ¡Sí asistiré a tus XVs! 💃` : `Hola Valentina, soy ${nombre}. No podré asistir, gracias por la invitación.`;
    window.open(`https://wa.me/528112345678?text=${encodeURIComponent(mensaje)}`, '_blank');
};

// LIGHTBOX
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("img01");
const closeBtn = document.getElementsByClassName("close-modal")[0];
const galleryImages = document.querySelectorAll('.gallery-card img');

galleryImages.forEach(img => {
    img.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
        document.body.style.overflow = "hidden";
    }
});

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

closeBtn.onclick = closeModal;
modal.onclick = function(e) { if (e.target !== modalImg) closeModal(); }

AOS.init({ once: true, duration: 1000, offset: 60 });
