import 'dotenv/config';

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

if (!APPS_SCRIPT_URL) {
  console.error("❌ Error: APPS_SCRIPT_URL no está definida en el archivo .env");
  process.exit(1);
}

const testData = {
  producto: "Alegra POS",
  comentario: "La interfaz es muy intuitiva y fácil de usar.",
  nombre: "juan perez"
};

console.log("🔄 Probando conexión con Apps Script...");
console.log("URL:", APPS_SCRIPT_URL);
console.log("Datos:", testData);

fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: JSON.stringify(testData),
  redirect: 'follow'
})
  .then(response => {
    console.log("\n✅ Status:", response.status);
    console.log("Headers:", Object.fromEntries(response.headers));
    return response.text();
  })
  .then(text => {
    console.log("\n📄 Respuesta:");
    console.log(text.slice(0, 500));
    
    try {
      const json = JSON.parse(text);
      console.log("\n✅ JSON válido:", json);
    } catch {
      console.log("\n❌ No es JSON - Apps Script devolvió HTML");
    }
  })
  .catch(error => {
    console.error("\n❌ Error:", error.message);
  });
