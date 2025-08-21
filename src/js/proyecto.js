const casilla0 = document.getElementById("casilla0")
const casilla1 = document.getElementById("casilla1")
const casilla2 = document.getElementById("casilla2")
const casilla3 = document.getElementById("casilla3")
const casilla4 = document.getElementById("casilla4")
const casilla5 = document.getElementById("casilla5")
const casilla6 = document.getElementById("casilla6")
const casilla7 = document.getElementById("casilla7")
const casilla8 = document.getElementById("casilla8")
const reiniciar = document.getElementById("reiniciar")



let movimientosTablero = 0
let contadorX = localStorage.getItem("contadorX") || 0;
let contadorO = localStorage.getItem("contadorO") || 0;

const victoriasO = document.getElementById("victoriasO")
victoriasO.textContent = contadorO
const victoriasX = document.getElementById("victoriasX")
victoriasX.textContent = contadorX


const arreglo = [casilla0, casilla1, casilla2, casilla3, casilla4, casilla5, casilla6, casilla7, casilla8]


function movimientos() {
    arreglo.forEach((casilla) => {
        casilla.addEventListener("click", () => {
            if (casilla.textContent == "") {
                //  const img = document.createElement("img")
                //  img.setAttribute("src","../imagenes/carro.webp")
                //  img.classList.add("imgX")
                // casilla.appendChild(img)

                casilla.textContent = "X"
                movimientosTablero++
                validarGanador
                if (!validarGanador()) {
                    setTimeout(() => {
                        aleatorio()
                    }, 500)
                }
            }
        })
    })
}

function aleatorio() {
    movimientosTablero++
    const posicionesVacias = arreglo.filter((casilla) => casilla.textContent == "");
    if (posicionesVacias.length > 0) {
        const posAleatoria = [Math.floor(Math.random() * posicionesVacias.length)]
        posicionesVacias[posAleatoria].textContent = "O"
        validarGanador()
    }
}
movimientos()


let alguieGana = false
function validarGanador() {
    console.log(movimientosTablero);
    const posiblesGanes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],// -> Estás son las filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // -> Estás son las columnas 
        [0, 4, 8], [2, 4, 6] // -> Estás son las diagonales
    ]
    for (let index = 0; index < posiblesGanes.length; index++) {
        const [posicion, posicion2, posicion3] = posiblesGanes[index]
        if (arreglo[posicion].textContent != "" && arreglo[posicion].textContent == arreglo[posicion2].textContent && arreglo[posicion].textContent == arreglo[posicion3].textContent) {
            alert("Hay un ganador")
            if (arreglo[posicion].textContent === "X") {
                contadorX++;
                victoriasX.textContent = contadorX
                localStorage.setItem("contadorX", contadorX)
                alguieGana = true
            } if (arreglo[posicion].textContent === "O") {
                contadorO++;
                victoriasO.textContent = contadorO
                localStorage.setItem("contadorO", contadorO)
                alguieGana = true
            }
            if (movimientosTablero >= 9 && !alguieGana) {
                alert("EMPATE")
                return true
            }

            return true
        }
    }

}

function reiniciarF() {
    arreglo.forEach(casilla => casilla.textContent = "")


}

document.getElementById("reiniciar").addEventListener("click", reiniciarF)