import { text_64, text_90, text_110, text_130 } from './resources.js'

const modal_general = document.getElementById('modal-general-texto');
const modal_texto = document.getElementById('modal-secundario-texto');
const btn_cerrar_titulos = document.getElementById('cerrar-modal-principal');
const btn_cerrar_texto = document.getElementById('cerrar-modal-secundario');

btn_cerrar_titulos.addEventListener('click', () => {
    modal_general.close();
})

btn_cerrar_texto.addEventListener('click', () => {
    modal_texto.close();
})


function plantillaTitulo(data) {
    let plantilla = `
    <div class="container">
    <p id="titulo-${data.id}" class="titulo">${data.titulo}</p>
    </div>
    `
    return plantilla;
}


function plantillaTexto(data) {
    let plantilla = `
    <div class="container contenedor-texto">
    <h4 id="titulo-texto-${data.id}" class="titulo-texto">${data.titulo}</h4>
    <p id="texto-${data.id}" class="texto">${data.contenido}</p>
    </div>
    `
    return plantilla;
}


function renderizarTexto(data) {
    let contenedor = document.getElementById('contenedor-texto');
    contenedor.innerHTML = '';
    contenedor.innerHTML = plantillaTexto(data);
    modal_texto.showModal();
}


function renderizarTitulos(dataList) {
    let contenedor = document.getElementById('contenedor-titulos');
    contenedor.innerHTML = '';
    dataList.forEach(data => {
        let div = document.createElement('div');
        div.classList.add('contenedor-titulo')
        div.innerHTML = plantillaTitulo(data);
        contenedor.append(div);
        document.getElementById('titulo-' + data.id).addEventListener('click', () => {
            renderizarTexto(data);
        });
    });

    modal_general.showModal();
}

document.getElementById('btn-64').addEventListener('click', () => {
    renderizarTitulos(text_64);
})

document.getElementById('btn-90').addEventListener('click', () => {
    renderizarTitulos(text_90);
})

document.getElementById('btn-110').addEventListener('click', () => {
    renderizarTitulos(text_110);
})

document.getElementById('btn-130').addEventListener('click', () => {
    renderizarTitulos(text_130);
})