//! Inicialización para ka recarga de página para actualizar los tamaños
let anchoAnterior = window.innerWidth;
//! Inicialización de variables del menú
const btn = document.getElementById('hamburguesa');
const menu = document.getElementById('menu');
//! Inicialización de variables del carrusel
const orbita = document.getElementById('orbita');
const llanta = document.getElementById('llanta');
const aroRojo = document.querySelector('.aro-rojo');
//! Planetas de colores (exteriores)
const planetas = [
  { el: document.getElementById('p1'), angle: 0 },
  { el: document.getElementById('p2'), angle: 51 },
  { el: document.getElementById('p3'), angle: 102 },
  { el: document.getElementById('p4'), angle: 153 },
  { el: document.getElementById('p5'), angle: 204 },
  { el: document.getElementById('p6'), angle: 255 },
  { el: document.getElementById('p7'), angle: 306 }
];
//! Planetas interiores (rojos)
const planetasInterior = [
  { el: document.getElementById('i1'), angle: 0 },
  { el: document.getElementById('i2'), angle: 51 },
  { el: document.getElementById('i3'), angle: 102 },
  { el: document.getElementById('i4'), angle: 153 },
  { el: document.getElementById('i5'), angle: 204 },
  { el: document.getElementById('i6'), angle: 255 },
  { el: document.getElementById('i7'), angle: 306 }
];
//* Función para la actualización de tamaños
window.addEventListener('resize', () => {
  const nuevoAncho = window.innerWidth;
  if (Math.abs(nuevoAncho - anchoAnterior) > 50) { // Cambios mayores a 50px
    location.reload();
  }
});
//* Función para calcular radios dinámicamente
function calcularRadios() {
  const orbitaWidth = orbita.offsetWidth;
  const radiusExterior = orbitaWidth * 0.39;
  const aroRojoWidth = aroRojo.offsetWidth;
  const radiusInterior = aroRojoWidth / 2;
  return {
    exterior: radiusExterior,
    interior: radiusInterior
  };
}
//* Función para alternar el menú hamburguesa
btn.addEventListener('click', () => {
  menu.classList.toggle('activo');
});
//* Rotación visual
let llantaRotation = 0;
//* Actualiza posiciones de planetas y llanta
function updatePositions() {
  const { exterior: radiusExterior, interior: radiusInterior } = calcularRadios();
  let textoActivo = '';
  // Actualiza planetas exteriores
  planetas.forEach((p) => {
    const rad = p.angle * (Math.PI / 180);
    const x = Math.cos(rad) * radiusExterior;
    const y = Math.sin(rad) * radiusExterior;
    const angleNorm = ((p.angle % 360) + 360) % 360;
    const rotacionHaciaCentro = p.angle + 90;

    if (Math.abs(angleNorm - 270) <= 5) {
      p.el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotacionHaciaCentro}deg) scale(1.5)`;
      const titulo = p.el.querySelector('.titulo');
      if (titulo) {
        textoActivo = titulo.textContent;
      }
    } else {
      p.el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotacionHaciaCentro}deg) scale(1)`;
    }

    const span = p.el.querySelector('.angulo');
    if (span) {
      span.textContent = `${Math.round(p.angle) % 360}°`;
    }
  });

  // Mostrar texto destacado en párrafo
  const destacadoSpan = document.querySelector('.destacado');
  if (destacadoSpan) {
    destacadoSpan.textContent = textoActivo;
  }

  // Actualiza planetas rojos
  planetasInterior.forEach((p) => {
    const rad = p.angle * (Math.PI / 180);
    const x = Math.cos(rad) * radiusInterior;
    const y = Math.sin(rad) * radiusInterior;
    const rotacionHaciaCentro = p.angle + 90;

    p.el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotacionHaciaCentro}deg)`;
  });

  llanta.style.transform = `translate(-50%, -50%) rotate(${llantaRotation}deg)`;
}
updatePositions();
//! Interacción con mouse y touch
let isDragging = false;
let startX = 0;
document.addEventListener('selectstart', function (e) {
  if (isDragging) e.preventDefault();
});
orbita.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const delta = e.clientX - startX;
  startX = e.clientX;
  [...planetas, ...planetasInterior].forEach(p => {
    p.angle += delta * 0.5;
  });
  llantaRotation += delta * 0.5;
  updatePositions();
});
document.addEventListener('mouseup', () => {
  isDragging = false;
});
orbita.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});
orbita.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const delta = e.touches[0].clientX - startX;
  startX = e.touches[0].clientX;
  [...planetas, ...planetasInterior].forEach(p => {
    p.angle += delta * 0.5;
  });
  llantaRotation += delta * 0.5;
  updatePositions();
});
orbita.addEventListener('touchend', () => {
  isDragging = false;
});
//! Recalcula posiciones al cambiar tamaño de pantalla
window.addEventListener('resize', updatePositions);