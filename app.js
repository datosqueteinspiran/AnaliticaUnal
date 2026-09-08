/**
 * ECOSISTEMA DE ANALÍTICA INSTITUCIONAL - OPE SEDE BOGOTÁ
 * Lógica interactiva v2.0: 9 diapositivas, animación automática de carruseles y simulador Databot
 */

let currentSlide = 1;
const totalSlides = 9;
let currentMode = 'slides'; // 'slides' | 'dashboard'
let databotCurrentView = 'img';

// Definición de galerías animadas por herramienta
const carouselsData = {
  cifras: {
    slideIndex: 3,
    currentIndex: 0,
    intervalMs: 4500,
    isPlaying: true,
    timer: null,
    progressTimer: null,
    progressPct: 0,
    items: [
      { src: 'Imágenes/01 Sede en Cifras/01 Inicio.png', caption: '01 Inicio - Portal La Sede en Cifras' },
      { src: 'Imágenes/01 Sede en Cifras/02 Tablero Matriculados.png', caption: '02 Tablero de Matriculados e Histórico' },
      { src: 'Imágenes/01 Sede en Cifras/03 Cifras a profundidad.png', caption: '03 Dimensiones y Cifras a Profundidad' }
    ]
  },
  indicadores: {
    slideIndex: 4,
    currentIndex: 0,
    intervalMs: 4500,
    isPlaying: true,
    timer: null,
    progressTimer: null,
    progressPct: 0,
    items: [
      { src: 'Imágenes/02 Indicadores estratégicos/01 Inicio.png', caption: '01 Inicio - Suite de Indicadores Estratégicos' },
      { src: 'Imágenes/02 Indicadores estratégicos/02 Estudiantes por docente.png', caption: '02 Indicador de Estudiantes por Docente' }
    ]
  },
  opedata: {
    slideIndex: 5,
    currentIndex: 0,
    intervalMs: 4500,
    isPlaying: true,
    timer: null,
    progressTimer: null,
    progressPct: 0,
    items: [
      { src: 'Imágenes/03 OPEData/01 Login.png', caption: '01 Acceso Restringido - Login Institucional' },
      { src: 'Imágenes/03 OPEData/02 Lista de tableros.png', caption: '02 Catálogo de Tableros Gerenciales' },
      { src: 'Imágenes/03 OPEData/03 Accesos por usuario.png', caption: '03 Trazabilidad y Accesos por Usuario' },
      { src: 'Imágenes/03 OPEData/04 Usuarios por vista.png', caption: '04 Estadísticas de Uso por Vista' },
      { src: 'Imágenes/03 OPEData/05 Tableros financieros.png', caption: '05 Tableros Financieros y Presupuesto' },
      { src: 'Imágenes/03 OPEData/06 Resumen financiero.png', caption: '06 Resumen Financiero y Contratos' }
    ]
  },
  prig: {
    slideIndex: 6,
    currentIndex: 0,
    intervalMs: 4500,
    isPlaying: true,
    timer: null,
    progressTimer: null,
    progressPct: 0,
    items: [
      { src: 'Imágenes/04 PRIG/Inicio.png', caption: '01 Inicio - Plataforma PRIG' },
      { src: 'Imágenes/04 PRIG/09 Búsqueda semantica.png', caption: '02 Búsqueda Semántica de Logros' },
      { src: 'Imágenes/04 PRIG/10 Tableros PRIG.png', caption: '03 Tableros de Gestión y Seguimiento' },
      { src: 'Imágenes/04 PRIG/11 Logros por tema.png', caption: '04 Clasificación de Logros por Eje' },
      { src: 'Imágenes/04 PRIG/06 PDF TOP.png', caption: '05 Reportes Ejecutivos TOP' },
      { src: 'Imágenes/04 PRIG/07 PDF Cifras básicas.png', caption: '06 Cifras Básicas de Gestión' }
    ]
  },
  contexto: {
    slideIndex: 7,
    currentIndex: 0,
    intervalMs: 4500,
    isPlaying: true,
    timer: null,
    progressTimer: null,
    progressPct: 0,
    items: [
      { src: 'Imágenes/05 La Sede en Contexto/01 Inicio.png', caption: '01 Inicio - Portal La Sede en Contexto' },
      { src: 'Imágenes/05 La Sede en Contexto/04 Representatividad IES.png', caption: '02 Representatividad en Educación Superior' },
      { src: 'Imágenes/05 La Sede en Contexto/04 Crecimiento de matriculados.png', caption: '03 Tendencias de Crecimiento de Matriculados' },
      { src: 'Imágenes/05 La Sede en Contexto/02 Portada.png', caption: '04 Portada de Publicaciones y Documentos' },
      { src: 'Imágenes/05 La Sede en Contexto/03 Contenido.png', caption: '05 Análisis Situados y Estudios' }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initKeyboardEvents();
  initFullscreen();
  initModeToggle();
  initCarousels();
  updateSlideUI();
});

/* ==========================================================================
   NAVEGACIÓN DE DIAPOSITIVAS
   ========================================================================== */

function goToSlide(index) {
  if (index < 1 || index > totalSlides) return;
  if (currentMode !== 'slides') {
    toggleMode('slides');
  }

  // Desactivar slide actual
  const currentSlideEl = document.getElementById(`slide-${currentSlide}`);
  if (currentSlideEl) {
    currentSlideEl.classList.remove('active');
  }

  currentSlide = index;

  // Activar nueva slide
  const nextSlideEl = document.getElementById(`slide-${currentSlide}`);
  if (nextSlideEl) {
    nextSlideEl.classList.add('active');
  }

  updateSlideUI();
  handleCarouselsOnSlideChange();
}

function nextSlide() {
  if (currentSlide < totalSlides) {
    goToSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 1) {
    goToSlide(currentSlide - 1);
  }
}

function updateSlideUI() {
  // Actualizar contador
  const counterEl = document.getElementById('slide-num');
  if (counterEl) counterEl.textContent = currentSlide;

  // Actualizar barra de progreso
  const progressEl = document.getElementById('slide-progress');
  if (progressEl) {
    const percent = ((currentSlide - 1) / (totalSlides - 1)) * 100;
    progressEl.style.width = `${percent}%`;
  }

  // Actualizar indicadores dock
  const dots = document.querySelectorAll('.dock-dot');
  dots.forEach((dot, idx) => {
    if (idx + 1 === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // Habilitar/deshabilitar botones
  const prevBtn = document.getElementById('dock-btn-prev');
  const nextBtn = document.getElementById('dock-btn-next');
  if (prevBtn) prevBtn.style.opacity = currentSlide === 1 ? '0.3' : '1';
  if (nextBtn) nextBtn.style.opacity = currentSlide === totalSlides ? '0.3' : '1';
}

/* ==========================================================================
   SISTEMA DE CARRUSELES CON ANIMACIÓN AUTOMÁTICA
   ========================================================================== */

function initCarousels() {
  Object.keys(carouselsData).forEach(key => {
    updateCarouselView(key);
  });
}

function handleCarouselsOnSlideChange() {
  // Pausar todos los que no coincidan con la slide activa, y reanudar el activo
  Object.keys(carouselsData).forEach(key => {
    const car = carouselsData[key];
    if (car.slideIndex === currentSlide) {
      if (car.isPlaying) {
        startCarouselAutoPlay(key);
      }
    } else {
      stopCarouselAutoPlay(key);
    }
  });
}

function startCarouselAutoPlay(key) {
  stopCarouselAutoPlay(key);
  const car = carouselsData[key];
  if (!car || !car.isPlaying) return;

  const bar = document.getElementById(`cbar-${key}`);
  let startTime = Date.now();
  const duration = car.intervalMs;

  car.progressTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const pct = Math.min((elapsed / duration) * 100, 100);
    if (bar) bar.style.width = `${pct}%`;

    if (elapsed >= duration) {
      clearInterval(car.progressTimer);
      nextCarouselSlide(key, true);
    }
  }, 50);
}

function stopCarouselAutoPlay(key) {
  const car = carouselsData[key];
  if (!car) return;
  if (car.progressTimer) {
    clearInterval(car.progressTimer);
    car.progressTimer = null;
  }
  const bar = document.getElementById(`cbar-${key}`);
  if (bar) bar.style.width = '0%';
}

function nextCarouselSlide(key, fromAuto = false) {
  const car = carouselsData[key];
  if (!car) return;

  car.currentIndex = (car.currentIndex + 1) % car.items.length;
  updateCarouselView(key);

  if (car.isPlaying) {
    startCarouselAutoPlay(key);
  }
}

function prevCarouselSlide(key) {
  const car = carouselsData[key];
  if (!car) return;

  car.currentIndex = (car.currentIndex - 1 + car.items.length) % car.items.length;
  updateCarouselView(key);

  if (car.isPlaying) {
    startCarouselAutoPlay(key);
  }
}

function toggleCarouselPlay(key) {
  const car = carouselsData[key];
  const btn = document.getElementById(`cplay-${key}`);
  if (!car) return;

  car.isPlaying = !car.isPlaying;
  if (btn) {
    btn.textContent = car.isPlaying ? '⏸' : '▶';
  }

  if (car.isPlaying) {
    startCarouselAutoPlay(key);
  } else {
    stopCarouselAutoPlay(key);
  }
}

function updateCarouselView(key) {
  const car = carouselsData[key];
  const container = document.getElementById(`carousel-${key}`);
  if (!car || !container) return;

  const images = container.querySelectorAll('.carousel-slide-img');
  images.forEach((img, idx) => {
    if (idx === car.currentIndex) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  });

  // Actualizar etiqueta de caption
  const capEl = document.getElementById(`ccap-${key}`);
  if (capEl && car.items[car.currentIndex]) {
    capEl.textContent = `Vista: ${car.items[car.currentIndex].caption}`;
  }

  // Actualizar contador numérico
  const numEl = document.getElementById(`cnum-${key}`);
  if (numEl) {
    numEl.textContent = `${car.currentIndex + 1} / ${car.items.length}`;
  }
}

function openActiveCarouselLightbox(key) {
  const car = carouselsData[key];
  if (!car) return;
  const currentItem = car.items[car.currentIndex];
  if (currentItem) {
    openLightboxDirect(currentItem.src, currentItem.caption);
  }
}

/* ==========================================================================
   VISTA DATABOT (CAPTURA REAL VS SIMULADOR)
   ========================================================================== */

function switchDatabotView(view) {
  databotCurrentView = view;
  const imgView = document.getElementById('databot-view-img');
  const simView = document.getElementById('databot-view-sim');
  const btnImg = document.getElementById('btn-tab-dbimg');
  const btnSim = document.getElementById('btn-tab-dbsim');

  if (view === 'sim') {
    imgView.style.display = 'none';
    simView.style.display = 'flex';
    btnSim.classList.add('active');
    btnImg.classList.remove('active');
  } else {
    simView.style.display = 'none';
    imgView.style.display = 'block';
    btnImg.classList.add('active');
    btnSim.classList.remove('active');
  }
}

/* ==========================================================================
   EVENTOS DE TECLADO
   ========================================================================== */

function initKeyboardEvents() {
  window.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
        return;
      }
    }

    if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
      return;
    }

    // Teclas 1 a 9 para saltar a cualquier slide
    if (e.key >= '1' && e.key <= '9') {
      goToSlide(parseInt(e.key));
      return;
    }

    if (currentMode === 'slides') {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    }
  });
}

/* ==========================================================================
   PANTALLA COMPLETA
   ========================================================================== */

function initFullscreen() {
  const btn = document.getElementById('btn-fullscreen');
  if (btn) {
    btn.addEventListener('click', toggleFullscreen);
  }

  document.addEventListener('fullscreenchange', () => {
    const isFull = !!document.fullscreenElement;
    const label = document.getElementById('fullscreen-label');
    if (label) {
      label.textContent = isFull ? 'Salir [F]' : 'Pantalla Completa';
    }
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.warn(`Error pantalla completa: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

/* ==========================================================================
   CAMBIO DE MODO: PRESENTACIÓN VS EXECUTIVE HUB
   ========================================================================== */

function initModeToggle() {
  const btnSlides = document.getElementById('btn-mode-slides');
  const btnDashboard = document.getElementById('btn-mode-dashboard');

  if (btnSlides) {
    btnSlides.addEventListener('click', () => toggleMode('slides'));
  }
  if (btnDashboard) {
    btnDashboard.addEventListener('click', () => toggleMode('dashboard'));
  }
}

function toggleMode(mode) {
  currentMode = mode;
  const slidesViewport = document.getElementById('presentation-viewport');
  const dashboardViewport = document.getElementById('dashboard-viewport');
  const dock = document.getElementById('presentation-dock');
  const btnSlides = document.getElementById('btn-mode-slides');
  const btnDashboard = document.getElementById('btn-mode-dashboard');

  if (mode === 'dashboard') {
    slidesViewport.style.display = 'none';
    dock.style.display = 'none';
    dashboardViewport.classList.add('active');
    btnDashboard.classList.add('active');
    btnSlides.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Pausar todos los carruseles al salir de modo slides
    Object.keys(carouselsData).forEach(k => stopCarouselAutoPlay(k));
  } else {
    dashboardViewport.classList.remove('active');
    slidesViewport.style.display = 'flex';
    dock.style.display = 'flex';
    btnSlides.classList.add('active');
    btnDashboard.classList.remove('active');
    handleCarouselsOnSlideChange();
  }
}

/* ==========================================================================
   MODAL LIGHTBOX
   ========================================================================== */

function openLightboxDirect(imgSrc, captionText) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  if (modal && img) {
    img.src = imgSrc;
    if (caption) caption.textContent = captionText || 'Captura de pantalla';
    modal.classList.add('active');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

/* ==========================================================================
   SIMULADOR CONVERSACIONAL DATABOT
   ========================================================================== */

const databotResponses = {
  1: {
    question: "¿Cuál fue el total de graduados de maestría en 2024?",
    answer: `En el año <strong>2024</strong>, la Sede Bogotá registró un total de <strong>1.482 graduados de maestría</strong> en sus 11 facultades.<br>
    La <em>Facultad de Ingeniería</em> aportó el 34.2% del total, seguida por <em>Ciencias Humanas</em> (18.6%) y <em>Ciencias Económicas</em> (14.1%).`,
    chart: [
      { label: "Ingeniería", pct: 85, val: "507" },
      { label: "Ciencias Humanas", pct: 52, val: "276" },
      { label: "Ciencias Económicas", pct: 40, val: "209" },
      { label: "Otras Facultades", pct: 70, val: "490" }
    ]
  },
  2: {
    question: "¿Cuál es la facultad con mayor incremento de matriculados en los últimos 5 años?",
    answer: `La <strong>Facultad de Enfermería</strong> lideró el incremento porcentual con un <strong>+18.4%</strong> de matriculados totales entre 2020 y 2025.<br>En valor neto, la <strong>Facultad de Ingeniería</strong> sumó el mayor volumen (+640 estudiantes).`,
    chart: [
      { label: "Enfermería (+18.4%)", pct: 92, val: "+18.4%" },
      { label: "Medicina (+12.1%)", pct: 60, val: "+12.1%" },
      { label: "Ingeniería (+8.7%)", pct: 44, val: "+8.7%" },
      { label: "Promedio Sede (+6.2%)", pct: 31, val: "+6.2%" }
    ]
  }
};

function simulateQuery(id) {
  const chat = document.getElementById('simulator-chat');
  const data = databotResponses[id];
  if (!chat || !data) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-bubble chat-user';
  userMsg.innerHTML = data.question;
  chat.appendChild(userMsg);
  chat.scrollTop = chat.scrollHeight;

  const typingMsg = document.createElement('div');
  typingMsg.className = 'chat-bubble chat-bot';
  typingMsg.style.color = '#94a3b8';
  typingMsg.innerHTML = `<em>⚡ Databot consultando bases OPE...</em>`;
  chat.appendChild(typingMsg);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    let chartHtml = '';
    if (data.chart) {
      chartHtml = `<div class="chat-bot-chart-preview">
        <div style="font-size:0.7rem; font-weight:700; margin-bottom:0.4rem; color:#cbd5e1;">Visualización Automática Generada:</div>`;
      data.chart.forEach(item => {
        chartHtml += `
          <div class="chart-bar-row">
            <span style="width: 130px; color:#94a3b8;">${item.label}</span>
            <div style="flex:1; background:rgba(255,255,255,0.06); height:8px; border-radius:4px; overflow:hidden;">
              <div class="chart-bar-fill" style="width:${item.pct}%;"></div>
            </div>
            <span style="font-family:var(--font-mono); font-weight:700; width:45px; text-align:right;">${item.val}</span>
          </div>`;
      });
      chartHtml += `</div>`;
    }

    typingMsg.innerHTML = `🤖 ${data.answer}${chartHtml}`;
    chat.scrollTop = chat.scrollHeight;
  }, 450);
}

/* ==========================================================================
   FILTROS EN EL EXECUTIVE HUB
   ========================================================================== */

function filterDashboard(category, btnElement) {
  const cards = document.querySelectorAll('.hub-tool-card');
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    const categories = cardCat.split(/\s+/);
    if (category === 'all' || categories.includes(category)) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.35s ease-out';
    } else {
      card.style.display = 'none';
    }
  });
}
