/* VARIABLES */

/* Las "llaves" de encriptación que utilizaremos son las siguientes:
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat" */

const TextKey = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};
const TextKeyReverse = {
  enter: "e",
  imes: "i",
  ai: "a",
  ober: "o",
  ufat: "u",
};


let textFinalyDes = "";
let textFinaly = "";

/* FUNCIONES */
const TextEncript = () => {
  let TextElement = document.getElementById("text-encript");
  let UserText = TextElement.value
  for (let i = 0; i < UserText.length; i++) {
    let result = UserText[i];
    if (TextKey[result]) {
      textFinaly += TextKey[result];
    } else {
      textFinaly += result;
    }
  }
  document.getElementById("result-text").textContent = textFinaly;
  TextElement.value = ""
  ViewImage(false);
  ViewResult(true);
};

const TextDesencript = () => {

  let UserTextDes = document.getElementById("text-encript")
  textFinalyDes = UserTextDes.value;
  const values = Object.keys(TextKeyReverse).sort(
    (a, b) => b.length - a.length
  );
  for (let i = 0; i < values.length; i++) {
    const resultValue = values[i];
    textFinalyDes = textFinalyDes.replaceAll(
      resultValue,
      TextKeyReverse[resultValue]
    );
  }
  document.getElementById("result-text").textContent = textFinalyDes;
  UserTextDes.value = "";
  ViewImage(false);
  ViewResult(true);
};

const CleanTextArea = () => {
  document.getElementById("result-text").textContent = "";
  textFinaly = "";
  ViewImage(true);
  ViewResult(false);
};

/* PORTAPAPELES */
const CopyText = async () => {
  const CopyTextFinaly = textFinaly || textFinalyDes
  try {
    await navigator.clipboard.writeText(CopyTextFinaly);
   /*  const textElement = document.getElementById("text-encript");
    if (textElement) {
      textElement.textContent = "";
    } */
  } catch (err) {
    console.log("Error al copiar", err);
  }
  showAlert("Texto Copiado");
};

const showAlert = (message, isError = false) => {
  // Crear el elemento de alerta
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.classList.add("alert");
  if (isError) {
    alertDiv.classList.add("error");
  }

  // Añadir el elemento al body
  document.body.appendChild(alertDiv);

  // Eliminar la alerta después de 3 segundos
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
};

// Limpiar el resultado cuando se hace clic en el textarea de entrada
document
  .getElementById("text-encript")
  .addEventListener("click", CleanTextArea);

/* MOSTRAR RESULT */
const ViewImage = (show) => {
  let ImageContainers = document.getElementsByClassName(
    "container__secondary__ImageText"
  );
  if (show == true) {
    ImageContainers[0].style.display = "flex";
  } else {
    ImageContainers[0].style.display = "none";
  }
};

const ViewResult = (show) => {
  let ResultContainers = document.getElementsByClassName(
    "container__secondary__Copytext"
  );
  if (show == true) {
    ResultContainers[0].style.display = "block";
  } else {
    ResultContainers[0].style.display = "none";
  }
};
