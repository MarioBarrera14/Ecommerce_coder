const stockProductos = [
  {
    id: 1,
    nombre: "Crash Bandicoot",
    cantidad: 1,
    desc: "Juego plataformero, niveles dificiles",
    precio: 1200,
    img: "img/WhatsApp Image 2023-01-18 at 22.08.27.jpeg",
  },
  {
    id: 2,
    nombre: "Mortal Kombat X",
    cantidad: 1,
    desc: "Luchas con los mejores graficos",
    precio: 1500,
    img: "img/WhatsApp Image 2023-01-18 at 22.07.51.jpeg",
  },
  {
    id: 3,
    nombre: "Pac Man",
    cantidad: 1,
    desc: "Juego plataformero, niveles basicos",
    precio: 1570,
    img: "img/WhatsApp Image 2023-01-18 at 22.05.37.jpeg",
  },
  {
    id: 4,
    nombre: "Dragon Ball Xenoverse",
    cantidad: 1,
    desc: "Vive la experiencia dragon ball",
    precio: 1000,
    img: "img/WhatsApp Image 2023-01-18 at 22.07.51.jpeg",
  },
  {
    id: 5,
    nombre: "Naruto Ninja Storm 4",
    cantidad: 1,
    desc: "La historia de Naruto",
    precio: 1200,
    img: "img/WhatsApp Image 2023-01-18 at 22.05.37.jpeg",
  },
  {
    id: 6,
    nombre: "Shingeki Final Attack",
    cantidad: 1,
    desc: "Eren Jeager vuelve en formato gamer...",
    precio: 1200,
    img: "img/WhatsApp Image 2023-01-18 at 22.06.25.jpeg",
  },
  {
    id: 7,
    nombre: "League of Legends",
    cantidad: 1,
    desc: "No compres esto por tu bien",
    precio: 1400,
    img: "img/WhatsApp Image 2023-01-18 at 22.05.37.jpeg",
  },
  {
    id: 8,
    nombre: "Call Of Duty Warzone",
    cantidad: 1,
    desc: "Dispara como nunca",
    precio: 1200,
    img: "img/WhatsApp Image 2023-01-18 at 22.06.25.jpeg",
  },
  {
  id: 9,
  nombre: "Call Of Duty Warzone",
  cantidad: 1,
  desc: "Dispara como nunca",
  precio: 1200,
  img: "img/WhatsApp Image 2023-01-18 at 22.06.25.jpeg",
},
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "??Tu carrito est?? vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "/view/compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class=" prod p-3" style="width: 20rem;">
    <img class="prod__img p-3" src="${img}"/>
    <p>${nombre}</p>
    <p>${precio}</p>
    <p>Cantidad: ${cantidad}</p>
    <div >
    <button class="btn btn-primary" onclick="agregarProducto(${id})">Agregar al carrito<i class="fa-solid fa-cart-plus"></i></button>
    </div>
  </div>
    `;
  }
  
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++;
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  Toastify({
    text: `Se agrego tu producto al carrito`,
    duration: 3000,
    gravity: "bottom",
    style: {
        background: "linear-gradient(to right, #4FC1FF, #1E1E82)",
    }
}).showToast();
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">??Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "??Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {


  //enviamos mail notificando la compra
  const btn = document.getElementById('button');

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_k0skitd';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });


   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }