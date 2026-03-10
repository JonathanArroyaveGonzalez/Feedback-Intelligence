const GEMINI_API_KEY = "";
const SPREADSHEET_ID = "";
const SHEET_NAME = "feedback";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=" + GEMINI_API_KEY;



/* ===============================
   RECIBIR FEEDBACK
================================ */

function doPost(e){

  try{

    const sheet = SpreadsheetApp
    .openById(SPREADSHEET_ID)
    .getSheetByName(SHEET_NAME);

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.producto || "",
      data.comentario || "",
      data.nombre || "Anónimo",
      "",
      ""
    ]);

    return ContentService
    .createTextOutput(JSON.stringify({status:"ok"}))
    .setMimeType(ContentService.MimeType.JSON);

  }
  catch(err){

    return ContentService
    .createTextOutput(JSON.stringify({
      status:"error",
      message:err.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);

  }

}



/* ===============================
   CLASIFICAR PENDIENTES
================================ */

function clasificarPendientes(){

  const sheet = SpreadsheetApp
  .openById(SPREADSHEET_ID)
  .getSheetByName(SHEET_NAME);

  const last = sheet.getLastRow();

  if(last < 2){
    Logger.log("No hay registros");
    return;
  }

  for(let i=2;i<=last;i++){

    const comentario = sheet.getRange(i,3).getValue();
    const sentimiento = sheet.getRange(i,5).getValue();

    if(comentario && !sentimiento){

      Logger.log("Clasificando fila "+i);

      clasificarFila(sheet,i);

      // esperar 12 segundos para no pasar el rate limit
      Utilities.sleep(12000);

    }

  }

}



/* ===============================
   CLASIFICAR UNA FILA
================================ */

function clasificarFila(sheet,row){

  try{

    const comentario = String(
      sheet.getRange(row,3).getValue()
    ).substring(0,400);

    const prompt = `
Analiza este feedback de software empresarial.

Responde SOLO con JSON válido:

{"sentimiento":"Positivo|Neutro|Negativo","resumen":"máximo 15 palabras"}

Feedback:
${comentario}
`;

    const response = UrlFetchApp.fetch(GEMINI_URL,{
      method:"POST",
      contentType:"application/json",
      payload: JSON.stringify({

        contents:[
          {
            parts:[
              {text:prompt}
            ]
          }
        ],

        generationConfig:{
          temperature:0.1,
          maxOutputTokens:80
        }

      }),
      muteHttpExceptions:true
    });


    const code = response.getResponseCode();

    if(code === 429){
      Logger.log("Rate limit alcanzado");
      return;
    }

    if(code !== 200){
      throw new Error("HTTP "+code);
    }


    const data = JSON.parse(response.getContentText());

    let text = data.candidates[0].content.parts[0].text;

    // limpiar markdown
    text = text
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();

    // extraer JSON
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    const jsonString = text.substring(start,end+1);

    const result = JSON.parse(jsonString);

    const validos = ["Positivo","Neutro","Negativo"];

    const sentimiento = validos.includes(result.sentimiento)
      ? result.sentimiento
      : "Neutro";

    const resumen = String(result.resumen || "").substring(0,200);

    sheet.getRange(row,5).setValue(sentimiento);
    sheet.getRange(row,6).setValue(resumen);

    Logger.log("Fila "+row+" -> "+sentimiento);

  }
  catch(err){

    Logger.log("Error fila "+row+": "+err);

  }

}



/* ===============================
   CREAR TRIGGER AUTOMÁTICO
================================ */

function crearTrigger(){

  ScriptApp.getProjectTriggers().forEach(t=>{
    if(t.getHandlerFunction() === "clasificarPendientes"){
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger("clasificarPendientes")
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log("Trigger creado");

}



/* ===============================
   TEST GEMINI
================================ */

function testGemini(){

  const response = UrlFetchApp.fetch(GEMINI_URL,{
    method:"POST",
    contentType:"application/json",
    payload: JSON.stringify({

      contents:[
        {
          parts:[
            {
              text:'Responde SOLO con {"sentimiento":"Positivo","resumen":"conexion exitosa"}'
            }
          ]
        }
      ]

    }),
    muteHttpExceptions:true
  });

  Logger.log("Status: "+response.getResponseCode());
  Logger.log(response.getContentText());

}