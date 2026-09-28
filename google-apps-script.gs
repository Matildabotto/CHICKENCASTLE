/**
 * EL CASTILLO DEL POLLO — Recepción de postulaciones del casting en Google Sheets
 * Pegar este código en: Hoja de cálculo > Extensiones > Apps Script
 * (ver instrucciones en LEEME.txt)
 */

// Correo que recibe un aviso por cada postulación (dejar "" para no enviar)
var CORREO_AVISO = "";

function doPost(e) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(["Fecha", "Nombre", "Edad", "Ciudad", "Redes", "¿Por qué merece la corona?"]);
  }
  var p = e.parameter;
  if (p["bot-field"]) return ContentService.createTextOutput("ok"); // anti-spam
  hoja.appendRow([new Date(), p.nombre, p.edad, p.ciudad, p.redes, p.motivo]);

  if (CORREO_AVISO) {
    MailApp.sendEmail(CORREO_AVISO, "Nueva postulación: " + p.nombre,
      "Nombre: " + p.nombre + "\nEdad: " + p.edad + "\nCiudad: " + p.ciudad +
      "\nRedes: " + p.redes + "\n\n¿Por qué merece la corona?\n" + p.motivo);
  }
  return ContentService.createTextOutput("ok");
}
