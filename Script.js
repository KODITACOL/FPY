/* ============================================
   script.js — Lógica de interactividad
   ============================================ */

// Colores disponibles para los pétalos flotantes
const COLORES_PETALO = [
  '#F5C518',
  '#FFEC6E',
  '#E8A800',
  '#F0872A',
  '#FFD740',
];

// Tiempo de vida de cada pétalo en ms
const VIDA_PETALO_MS = 16000;

// Intervalo de creación de pétalos en ms
const INTERVALO_PETALO_MS = 900;

/* --------------------------------------------
   Función: crearPetalo
   Crea un elemento div que simula un pétalo
   flotando hacia arriba con animación CSS.
   -------------------------------------------- */
function crearPetalo() {
  const petalo = document.createElement('div');
  petalo.className = 'petal-particle';

  // Tamaño aleatorio entre 6px y 18px
  const tamaño = Math.random() * 12 + 6;

  // Color aleatorio del array
  const color = COLORES_PETALO[Math.floor(Math.random() * COLORES_PETALO.length)];

  // Posición horizontal aleatoria en toda la pantalla
  const posX = Math.random() * 100;

  // Duración y retraso aleatorios para variedad
  const duracion = (Math.random() * 8 + 7).toFixed(2);
  const retraso  = (Math.random() * 6).toFixed(2);

  // Rotación inicial aleatoria
  const rotacion = Math.floor(Math.random() * 360);

  petalo.style.cssText = `
    width:             ${tamaño}px;
    height:            ${(tamaño * 0.7).toFixed(1)}px;
    left:              ${posX}vw;
    background:        ${color};
    animation-duration: ${duracion}s;
    animation-delay:    ${retraso}s;
    transform:         rotate(${rotacion}deg);
  `;

  document.body.appendChild(petalo);

  // Eliminamos el elemento del DOM cuando termina su vida
  setTimeout(() => {
    if (petalo.parentNode) petalo.parentNode.removeChild(petalo);
  }, VIDA_PETALO_MS);
}

/* --------------------------------------------
   Función: iniciarPetalos
   Crea un lote inicial y luego genera uno
   nuevo cada cierto intervalo.
   -------------------------------------------- */
function iniciarPetalos() {
  // Lote inicial para que haya pétalos desde el principio
  for (let i = 0; i < 10; i++) crearPetalo();

  // Generación continua
  setInterval(crearPetalo, INTERVALO_PETALO_MS);
}

/* --------------------------------------------
   Función: iniciarInteraccionRamo
   Al hacer click sobre el SVG del ramo,
   aplica un efecto de brillo dorado temporal.
   -------------------------------------------- */
function iniciarInteraccionRamo() {
  const ramo = document.querySelector('.ramo-svg');

  if (!ramo) return; // Seguridad: si no existe el elemento, salimos

  ramo.addEventListener('click', () => {
    // Brillo al hacer click
    ramo.style.filter =
      'drop-shadow(0 0 40px #FFD740) drop-shadow(0 20px 60px rgba(200,130,0,0.5))';

    // Volver al estado normal tras 600ms
    setTimeout(() => {
      ramo.style.filter =
        'drop-shadow(0 20px 60px rgba(200,130,0,0.3))';
    }, 600);
  });
}

/* --------------------------------------------
   INICIO — ejecutar cuando el DOM esté listo
   -------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  iniciarPetalos();
  iniciarInteraccionRamo();
});