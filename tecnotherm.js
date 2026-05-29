
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  reveals.forEach(item => {
    const rect = item.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      item.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('[data-nav]');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


const counters = document.querySelectorAll('.stat-num');

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let current = 0;

    const increment = target / 120;

    const updateCounter = () => {
      current += increment;

      if (current < target) {
        counter.innerText = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
};

let countersStarted = false;

const stats = document.querySelector('.hero-stats');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  });
}, {
  threshold: 0.5
});

counterObserver.observe(stats);

const form = document.getElementById('contactForm');

const nome = document.getElementById('nome');
const email = document.getElementById('email');
const mensagem = document.getElementById('mensagem');

const errNome = document.getElementById('err-nome');
const errEmail = document.getElementById('err-email');
const errMensagem = document.getElementById('err-mensagem');

const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(emailValue) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

 
  errNome.innerText = '';
  errEmail.innerText = '';
  errMensagem.innerText = '';

  nome.classList.remove('error');
  email.classList.remove('error');
  mensagem.classList.remove('error');

  
  if (nome.value.trim().length < 3) {
    errNome.innerText = 'Digite um nome válido.';
    nome.classList.add('error');
    valid = false;
  }

 
  if (!validateEmail(email.value.trim())) {
    errEmail.innerText = 'Digite um e-mail válido.';
    email.classList.add('error');
    valid = false;
  }

  
  if (mensagem.value.trim().length < 10) {
    errMensagem.innerText = 'Mensagem muito curta.';
    mensagem.classList.add('error');
    valid = false;
  }

  if (!valid) return;


  btnText.style.display = 'none';
  btnSpinner.style.display = 'block';
  submitBtn.disabled = true;


  setTimeout(() => {
    btnSpinner.style.display = 'none';
    btnText.style.display = 'block';
    submitBtn.disabled = false;

    formSuccess.style.display = 'block';

    form.reset();

    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);

  }, 1800);
});

const cards = document.querySelectorAll('.srv-card');

cards.forEach(card => {

  card.addEventListener('mousemove', e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 18);
    const rotateY = ((centerX - x) / 18);

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
    `;

  });

  card.addEventListener('mouseleave', () => {

    card.style.transform = `
      rotateX(0)
      rotateY(0)
      translateY(0)
    `;

  });

});
const glow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', e => {

  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';

});
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      entry.target.classList.add('visible');

    }

  });

}, {
  threshold: 0.15
});

revealItems.forEach((item) => {

  revealObserver.observe(item);

});



const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray;

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

initCanvas();
window.addEventListener("resize", initCanvas);

// cria partículas
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // reaparece na tela
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.fillStyle = "rgba(0,198,255,0.6)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  particlesArray = [];
  for (let i = 0; i < 50; i++) {
    particlesArray.push(new Particle());
  }
}

createParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();
