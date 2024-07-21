import { a_6_8, a_8_10, a_10_12 } from './resources.js'

const modal_nivel_6_8 = document.getElementById('modal-nivel-6-8');
const modal_nivel_8_10 = document.getElementById('modal-nivel-8-10');
const modal_nivel_10_12 = document.getElementById('modal-nivel-10-12');
const modalMetrica = document.getElementById('modal-metrica');
const btn_cerrar_nivel_6_8 = document.getElementById('cerrar-modal-nivel-6-8');
const btn_cerrar_nivel_8_10 = document.getElementById('cerrar-modal-nivel-8-10');
const btn_cerrar_nivel_10_12 = document.getElementById('cerrar-modal-nivel-10-12');
const btn_cerrar_modal_cuento = document.getElementById('cerrar-modal-secundario');
const downloadLink = document.getElementById('downloadLink');
const modalCuento = document.getElementById('modal-texto-cuento');


document.getElementById('btn-reiniciar').addEventListener('click', () => {
    location.reload()
})

btn_cerrar_modal_cuento.addEventListener('click', () => {
    if (!document.getElementById('cuentos-nivel-2-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-6-8').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-3-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-3-6-8').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-1-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-6-8').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-2-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-8-10').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-3-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-3-8-10').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-1-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-8-10').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-2-10-12').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-10-12').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-1-10-12').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-10-12').classList.add('ocultar')
    }
    modalCuento.close();
})


btn_cerrar_nivel_6_8.addEventListener('click', () => {
    modal_nivel_6_8.close();
    if (!document.getElementById('cuentos-nivel-2-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-6-8').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-3-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-3-6-8').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-1-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-6-8').classList.add('ocultar')
    }
})

btn_cerrar_nivel_8_10.addEventListener('click', () => {
    modal_nivel_8_10.close();
    if (!document.getElementById('cuentos-nivel-2-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-8-10').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-3-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-3-8-10').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-1-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-8-10').classList.add('ocultar')
    }
})

btn_cerrar_nivel_10_12.addEventListener('click', () => {
    modal_nivel_10_12.close();
    if (!document.getElementById('cuentos-nivel-2-10-12').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-10-12').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-1-10-12').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-10-12').classList.add('ocultar')
    }
})

function abrirModalMetrica() {
    modalMetrica.showModal();
}

function insertarMetricas(tiempo, cantidad_palabras) {
    document.getElementById('minutos').innerText = ` ${(Math.floor(tiempo / 60) % 60).toFixed(0).toString()} minutos ${(Math.round(tiempo % 60)).toFixed(0).toString()} segundos`;
    document.getElementById('cantidad-palabras').innerText = (cantidad_palabras / tiempo).toFixed(1);
    abrirModalMetrica();
}

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
        const blob = new Blob(chunks, { type: "audio/mp3; codecs=MPEG," });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        console.log(audioURL)
        //audio.src = audioURL;
        //new Date().toLocaleString()
        downloadLink.download = `audio_${new Date().toLocaleString()}.mp3`;
        downloadLink.href = audioURL;
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
        //tiempo = ((Math.round(hora_fin - hora_inicio)) / 1000) / 60;
        tiempo = (hora_fin - hora_inicio) / 1000;
        let cantidad_palabras = document.getElementById('palabras-cuento').textContent;
        insertarMetricas(tiempo, cantidad_palabras);
        tiempo = 0;

    }
}

function mostrarCuentosNivel_1_6_8() {
    document.getElementById('cuentos-nivel-1-6-8').classList.toggle('ocultar');
    if (!document.getElementById('cuentos-nivel-2-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-6-8').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-3-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-3-6-8').classList.add('ocultar')
    }

}

function mostrarCuentosNivel_2_6_8() {
    document.getElementById('cuentos-nivel-2-6-8').classList.toggle('ocultar');
    if (!document.getElementById('cuentos-nivel-1-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-6-8').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-3-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-3-6-8').classList.add('ocultar')
    }

}

function mostrarCuentosNivel_3_6_8() {
    document.getElementById('cuentos-nivel-3-6-8').classList.toggle('ocultar');
    if (!document.getElementById('cuentos-nivel-2-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-6-8').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-1-6-8').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-6-8').classList.add('ocultar')
    }

}

/***************************************************************************************** */


function mostrarCuentosNivel_1_8_10() {

    document.getElementById('cuentos-nivel-1-8-10').classList.toggle('ocultar');
    if (!document.getElementById('cuentos-nivel-2-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-8-10').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-3-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-3-8-10').classList.add('ocultar')
    }

}

function mostrarCuentosNivel_2_8_10() {

    document.getElementById('cuentos-nivel-2-8-10').classList.toggle('ocultar');
    if (!document.getElementById('cuentos-nivel-1-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-8-10').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-3-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-3-8-10').classList.add('ocultar')
    }

}

function mostrarCuentosNivel_3_8_10() {

    document.getElementById('cuentos-nivel-3-8-10').classList.toggle('ocultar');
    if (!document.getElementById('cuentos-nivel-2-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-8-10').classList.add('ocultar')
    }
    if (!document.getElementById('cuentos-nivel-1-8-10').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-8-10').classList.add('ocultar')
    }

}
/********************************************************************************************************************* */

function mostrarCuentosNivel_1_10_12() {
    console.log('prueba')
    document.getElementById('cuentos-nivel-1-10-12').classList.toggle('ocultar');
    if (!document.getElementById('cuentos-nivel-2-10-12').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-2-10-12').classList.add('ocultar')
    }

}

function mostrarCuentosNivel_2_10_12() {
    console.log('prueba')
    document.getElementById('cuentos-nivel-2-10-12').classList.toggle('ocultar');
    if (!document.getElementById('cuentos-nivel-1-10-12').classList.contains('ocultar')) {
        document.getElementById('cuentos-nivel-1-10-12').classList.add('ocultar')
    }

}


/********************************************************************************************************************** */
function abrirModal_6_8() {
    modal_nivel_6_8.showModal();
}

function abrirModal_8_10() {
    modal_nivel_8_10.showModal();
}

function abrirModal_10_12() {
    modal_nivel_10_12.showModal();
}



function abrirModalCuento(data) {
    document.getElementById('titulo-cuento').innerText = data.titulo;
    document.getElementById('texto-cuento').innerText = data.texto;
    document.getElementById('palabras-cuento').innerText = data.palabras;
    modalCuento.showModal();
}

document.getElementById('btn-edad-6-8').addEventListener('click', () => {
    abrirModal_6_8();
})

document.getElementById('btn-edad-8-10').addEventListener('click', () => {
    abrirModal_8_10();
})

document.getElementById('btn-edad-10-12').addEventListener('click', () => {
    abrirModal_10_12();
})

document.getElementById('contenedor-nivel-1-6-8').addEventListener('click', mostrarCuentosNivel_1_6_8)

document.getElementById('contenedor-nivel-2-6-8').addEventListener('click', mostrarCuentosNivel_2_6_8)

document.getElementById('contenedor-nivel-3-6-8').addEventListener('click', mostrarCuentosNivel_3_6_8)

document.getElementById('contenedor-nivel-1-8-10').addEventListener('click', mostrarCuentosNivel_1_8_10)

document.getElementById('contenedor-nivel-2-8-10').addEventListener('click', mostrarCuentosNivel_2_8_10)

document.getElementById('contenedor-nivel-3-8-10').addEventListener('click', mostrarCuentosNivel_3_8_10)

document.getElementById('contenedor-nivel-1-10-12').addEventListener('click', mostrarCuentosNivel_1_10_12)

document.getElementById('contenedor-nivel-2-10-12').addEventListener('click', mostrarCuentosNivel_2_10_12)



/************************************************************************************************ */
for (let index = 1; index <= 4; index++) {
    document.getElementById('cuento-1-6-8-' + index).addEventListener('click', () => {
        abrirModalCuento(a_6_8[0].cuentos[index - 1])
    })
}

for (let index = 1; index <= 4; index++) {
    document.getElementById('cuento-2-6-8-' + index).addEventListener('click', () => {
        abrirModalCuento(a_6_8[1].cuentos[index - 1])
    })
}

for (let index = 1; index <= 4; index++) {
    document.getElementById('cuento-3-6-8-' + index).addEventListener('click', () => {
        abrirModalCuento(a_6_8[2].cuentos[index - 1])
    })
}
/*********************************************************************************************** */
for (let index = 1; index <= 4; index++) {
    if (document.getElementById('cuento-1-8-10-' + index)) {
        document.getElementById('cuento-1-8-10-' + index).addEventListener('click', () => {
            abrirModalCuento(a_8_10[0].cuentos[index - 1])
        })
    }

}

for (let index = 1; index <= 4; index++) {
    if (document.getElementById('cuento-2-8-10-' + index)) {
        document.getElementById('cuento-2-8-10-' + index).addEventListener('click', () => {
            abrirModalCuento(a_8_10[1].cuentos[index - 1])
        })
    }

}

for (let index = 1; index <= 4; index++) {
    if (document.getElementById('cuento-3-8-10-' + index)) {
        document.getElementById('cuento-3-8-10-' + index).addEventListener('click', () => {
            abrirModalCuento(a_8_10[2].cuentos[index - 1])
        })
    }

}


/*************************************************************************************************** */
for (let index = 1; index <= 4; index++) {
    if (document.getElementById('cuento-1-10-12-' + index)) {
        document.getElementById('cuento-1-10-12-' + index).addEventListener('click', () => {
            abrirModalCuento(a_10_12[0].cuentos[index - 1])
        })
    }
}

for (let index = 1; index <= 4; index++) {
    if (document.getElementById('cuento-2-10-12-' + index)) {
        document.getElementById('cuento-2-10-12-' + index).addEventListener('click', () => {
            abrirModalCuento(a_10_12[1].cuentos[index - 1])
        })
    }
}

/************************************************************************************************** */

document.getElementById('btn-comienzo').addEventListener('click', () => {
    console.log('grabar')
    grabar()
})


