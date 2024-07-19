import { a_6_8, a_8_10, a_10_12 } from './resources.js'

const modal_general = document.getElementById('modal-general-texto');
const modal_texto = document.getElementById('modal-secundario-texto');
const btn_cerrar_titulos = document.getElementById('cerrar-modal-principal');
const btn_cerrar_texto = document.getElementById('cerrar-modal-secundario');
const downloadLink = document.getElementById('downloadLink');

btn_cerrar_titulos.addEventListener('click', () => {
    modal_general.close();
})

btn_cerrar_texto.addEventListener('click', () => {
    modal_texto.close();
})
let hora_inicio = 0;
let hora_fin = 0;
let tiempo = 0;
let puede_grabar = false;
let grabando = false;
let grabacion = null;
let chunks = [];

setupAudio()


function SetupStream(stream) {
    console.log('setup stream')
    grabacion = new MediaRecorder(stream);
    grabacion.ondataavailable = e => {
        chunks.push(e.data);
    }

    grabacion.onstop = e => {
        const blob = new Blob(chunks, { type: "audio/mp3; codecs=opus" });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        console.log(audioURL)
        //audio.src = audioURL;
        //new Date().toLocaleString()
        downloadLink.download = `audio_${new Date().toLocaleString()}.mp3`;
        downloadLink.href = audioURL;
        downloadLink.style.display = 'block';
    }
}

function setupAudio() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            audio: true
        })
            .then(SetupStream)
            .catch(err => {
                console.log(err)
            })
    }
    puede_grabar = true;
}

function grabar() {
    if (!puede_grabar) return;
    grabando = !grabando;

    if (grabando) {
        console.log('grabando')
        grabacion.start();
        document.getElementById('btn-comienzo').classList.remove('btn-success');
        document.getElementById('btn-comienzo').classList.add('btn-danger');
        document.getElementById('btn-comienzo').innerText = 'Detener';
        hora_inicio = Date.now();


    } else {
        grabacion.stop();
        grabando = !grabando;
        console.log('deteniendo')
        document.getElementById('btn-comienzo').classList.remove('btn-danger');
        document.getElementById('btn-comienzo').classList.add('btn-success');
        document.getElementById('btn-comienzo').innerText = 'Comenzar';

        hora_fin = Date.now();

        //tiempo = ((Math.round(hora_fin - hora_inicio))/1000)/60;
        tiempo = ((Math.round(hora_fin - hora_inicio)) / 1000);
        console.log(tiempo)
        tiempo = 0;

    }
}

//onclick="renderizarTexto('${data[0].cuentos[0].titulo}', '${data[0].cuentos[0].texto}')"

/*function renderizarTexto(titulo, texto) {
    let contenedor = document.getElementById('contenedor-texto');
    contenedor.innerHTML = '';
    contenedor.innerHTML = `
    <div class="container contenedor-texto">
    <h4  class="titulo-texto">${titulo}</h4>
    <p  class="texto">${texto}</p>
    </div>
    `
    modal_texto.showModal();
}*/



/*function plantillaTexto(data) {
    let plantilla = `
    <div class="container contenedor-texto">
    <h4  class="titulo-texto">${data.titulo}</h4>
    <p  class="texto">${data.cuento}</p>
    </div>
    `
    return plantilla;
}*/

function renderizarNivel6a8(data) {
    let contenedor = document.getElementById('contenedor-titulos');
    contenedor.innerHTML = '';
    let div = document.createElement('div');
    div.classList.add('contenedor-titulo')
    div.innerHTML = plantillaNiveles6_8(data);
    contenedor.append(div);

    modal_general.showModal();
}

function renderizarNivel8a10(data) {
    let contenedor = document.getElementById('contenedor-titulos');
    contenedor.innerHTML = '';
    let div = document.createElement('div');
    div.classList.add('contenedor-titulo')
    div.innerHTML = plantillaNiveles8_10(data);
    contenedor.append(div);

    modal_general.showModal();
}

function renderizarNivel10a12(data) {
    let contenedor = document.getElementById('contenedor-titulos');
    contenedor.innerHTML = '';
    let div = document.createElement('div');
    div.classList.add('contenedor-titulo')
    div.innerHTML = plantillaNiveles10_12(data);
    contenedor.append(div);

    modal_general.showModal();
}



document.getElementById('a_6_8').addEventListener('click', () => {
    renderizarNivel6a8(a_6_8);
})

document.getElementById('a_8_10').addEventListener('click', () => {
    renderizarNivel8a10(a_8_10);
})

document.getElementById('a_10_12').addEventListener('click', () => {
    renderizarNivel10a12(a_10_12);
})

document.getElementById('btn-comienzo').addEventListener('click', () => {
    console.log('grabar')
    grabar()
})


console.log(a_6_8[0].cuentos[0])