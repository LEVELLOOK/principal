let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(boton) {
  const producto = boton.closest('.producto');
  const nombre = producto.querySelector('h2').textContent;
  const precioTexto = producto.querySelector('.precio').textContent;
  const precio = parseFloat(precioTexto.replace(/[^0-9.]/g, ''));

  carrito.push({ nombre, precio });
  guardarCarrito();
  mostrarCarrito(); // actualiza contenido y total
}

function mostrarCarrito() {
  const contenedor = document.getElementById('carrito-items');
  const totalElemento = document.getElementById('carrito-total');
  contenedor.innerHTML = '';

  let total = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${item.nombre}</strong><br>
      $${item.precio.toFixed(2)}
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    contenedor.appendChild(div);
    total += item.precio;
  });

  totalElemento.textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function abrirCarrito() {
  mostrarCarrito(); // actualiza contenido antes de abrir
  document.getElementById('carrito-panel').classList.add('abierto');
}

function cerrarCarrito() {
  document.getElementById('carrito-panel').classList.remove('abierto');
}

function filtrarProductos() {
  const categoria = document.getElementById('categoria').value.toLowerCase();
  const diseño = document.getElementById('diseño').value.toLowerCase();
  const textoBusqueda = document.getElementById('buscador').value.toLowerCase();
  const productos = document.querySelectorAll('.producto');

  productos.forEach(producto => {
    const cat = producto.getAttribute('data-categoria').toLowerCase();
    const dis = producto.getAttribute('data-diseño').toLowerCase();
    const nombre = producto.querySelector('h2').textContent.toLowerCase();

    const detalles = producto.querySelectorAll('.ropas');
    let textoExtra = '';
    detalles.forEach(p => {
      textoExtra += p.textContent.toLowerCase() + ' ';
    });

    const coincideCategoria = (categoria === 'todos' || cat === categoria);
    const coincideDiseño = (diseño === 'todos' || dis === diseño);
    const coincideBusqueda =
      nombre.includes(textoBusqueda) || textoExtra.includes(textoBusqueda);

    producto.style.display = (coincideCategoria && coincideDiseño && coincideBusqueda)
      ? 'block'
      : 'none';
  });
}


document.querySelectorAll('.imagen-principal').forEach(img => {
  img.addEventListener('click', () => {
    const producto = img.closest('.producto');
    const imagenes = producto.querySelectorAll('img');
    const modalContenido = document.getElementById('modal-contenido');
    modalContenido.innerHTML = '';

    imagenes.forEach(imagen => {
      const nuevaImg = document.createElement('img');
      nuevaImg.src = imagen.src;
      modalContenido.appendChild(nuevaImg);
    });

    document.getElementById('modal').style.display = 'block';
  });
});

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

const textos = [
  "Buscar por nombre",
  "Buscar por diseño",
  "Buscar por talla",
  "Buscar por color"
];

let indexTexto = 0;  
let indexLetra = 0;   
let escribiendo = true; 

function animarPlaceholder() {
  const buscador = document.getElementById("buscador");
  const textoActual = textos[indexTexto];

  if (escribiendo) {
    buscador.placeholder = textoActual.substring(0, indexLetra + 1);
    indexLetra++;

    if (indexLetra === textoActual.length) {
      escribiendo = false;
      setTimeout(animarPlaceholder, 1000); 
      return;
    }
  } else {
    buscador.placeholder = textoActual.substring(0, indexLetra - 1);
    indexLetra--;

    if (indexLetra === 0) {
      escribiendo = true;
      indexTexto = (indexTexto + 1) % textos.length;
    }
  }

  setTimeout(animarPlaceholder, 100); 
}

animarPlaceholder();

let index = 0;
const slides = document.querySelectorAll(".banner .slide");

function cambiarSlide() {
  slides[index].classList.remove("activo");
  index = (index + 1) % slides.length;
  slides[index].classList.add("activo");
}

setInterval(cambiarSlide, 3000); // cambia cada 3 segundos
