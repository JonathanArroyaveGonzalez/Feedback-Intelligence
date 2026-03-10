<div align="center">

<img src="https://img.shields.io/badge/Alegra-Feedback_Intelligence-00C896?style=for-the-badge&labelColor=0A0E14" alt="Alegra Feedback Intelligence"/>

# Alegra Feedback Intelligence

**Sistema inteligente de recolección, clasificación y visualización de feedback**  
*Reto Técnico — Aprendiz SENA · Automation Support Intern · Marzo 2026*

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)
[![Apps Script](https://img.shields.io/badge/Apps_Script-REST_API-34A853?style=flat-square&logo=google&logoColor=white)](https://script.google.com/d/1R3xUuLSctz6LOGuKS9_qBW1QV1M6Jv0myF2ksL_i1X0rwHlYDHcFgp-t/edit?usp=sharing)
[![Looker Studio](https://img.shields.io/badge/Looker_Studio-Dashboard-4285F4?style=flat-square&logo=looker&logoColor=white)](https://lookerstudio.google.com/reporting/585fa257-1344-49de-8944-38d3f30d47b1)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## ¿Qué es este proyecto?

Sistema centralizado que permite a los usuarios de **Alegra POS**, **Alegra Contabilidad** y **Alegra Nómina** enviar comentarios a través de una interfaz web moderna. Cada feedback se almacena automáticamente en Google Sheets y es clasificado por IA (Gemini) con su sentimiento y un resumen, quedando visible en un dashboard interactivo de Looker Studio.

```
Usuario → Formulario Web → Apps Script → Google Sheets → Gemini IA → Looker Studio
```

---

## 🔗 Links del Proyecto

| Recurso | URL |
|---------|-----|
| 🌐 **Aplicación Web** | [alegra-feedback.vercel.app](https://alegra-feedback.vercel.app) |
| ⚙️ **Apps Script API** | [Ver endpoint](https://script.google.com/macros/s/AKfycbz2jU2YihdUHcByy69Au_-wxeokYR0QFst5VIPJIzlwyZvUkYtWoPulWagGItYlm2hPAA/exec) |
| 📊 **Dashboard Looker Studio** | [Ver dashboard](https://lookerstudio.google.com/reporting/585fa257-1344-49de-8944-38d3f30d47b1) |
| 📋 **Google Sheets** | [Ver datos](https://docs.google.com/spreadsheets/d/1o8mNuRlXfXyZtQdhjQgmI-rjQzsv4_PwQUy8PLLhM0o/edit?usp=sharing) |

---

## ✅ Entregables del Reto

| # | Entregable | Estado | Descripción |
|---|-----------|--------|-------------|
| 1 | **Interfaz de Recolección** | ✅ Completo | Formulario web en 3 pasos con Astro + Dark Mode |
| 2 | **Hoja de Cálculo** | ✅ Completo | Google Sheets con 6 columnas estructuradas |
| 3 | **Clasificación con IA** | ✅ Completo | Apps Script + Gemini: sentimiento + resumen automático |
| 4 | **Dashboard Looker Studio** | ✅ Completo | Filtros por fecha, sentimiento y producto |
| 5 | **Documentación Técnica** | ✅ Completo | README + documento técnico detallado |

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Por qué |
|------|------------|---------|
| **Frontend** | Astro 5.x + TypeScript | Páginas estáticas de alto rendimiento, bundle mínimo |
| **Hosting** | Vercel | Deploy automático desde GitHub, free tier generoso |
| **Backend / API** | Google Apps Script | Serverless, integración nativa con Sheets, sin costo |
| **Base de Datos** | Google Sheets | Sin infraestructura, accesible desde Looker Studio |
| **IA** | Google Gemini 2.5 Flash Lite | API gratuita, análisis de texto rápido y preciso |
| **Visualización** | Looker Studio | Dashboards interactivos conectados directo al Sheet |
| **Testing** | Node.js + dotenv | Script de prueba automatizado para el endpoint |

---

## 📁 Estructura del Proyecto

```
alegra-feedback-intelligence/
├── alegra-feedback/                  # Aplicación Astro
│   ├── src/
│   │   ├── layouts/
│   │   │   └── Layout.astro          # Layout base: fuentes, estilos globales, meta
│   │   └── pages/
│   │       ├── index.astro           # Formulario de 3 pasos (producto → comentario → éxito)
│   │       └── api/
│   │           └── feedback.ts       # Endpoint proxy hacia Apps Script
│   ├── public/                       # Archivos estáticos
│   ├── .env                          # Variables de entorno (no commitear)
│   ├── .env.example                  # Plantilla de variables de entorno
│   ├── test-apps-script.js           # Script de testing del endpoint
│   ├── astro.config.mjs              # Configuración de Astro + adapter Vercel
│   ├── package.json
│   └── tsconfig.json
├── Code.gs                           # Google Apps Script completo
└── README.md
```

---

## 🚀 Instalación Local

### Prerrequisitos

- Node.js 18 o superior
- Cuenta de Google (para Sheets, Apps Script y Looker Studio)

### 1. Clonar e instalar

```bash
git clone https://github.com/tu-usuario/alegra-feedback-intelligence
cd alegra-feedback-intelligence/alegra-feedback
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
APPS_SCRIPT_URL="https://script.google.com/macros/s/TU_ID/exec"
```

### 3. Desarrollo local

```bash
npm run dev
# → http://localhost:4321
```

### 4. Build para producción

```bash
npm run build
npm run preview
```

---

## ⚙️ Configuración de Google Sheets + Apps Script

### Paso 1 — Crear el Google Sheet

1. Crear un nuevo Sheet en [sheets.google.com](https://sheets.google.com)
2. Renombrar la pestaña inferior como **`feedback`** (exactamente, en minúsculas)
3. Agregar estos encabezados en la fila 1:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Marca de Tiempo | Producto | Comentario | Nombre Usuario | Categoría Sentimiento | Resumen IA |

4. Copiar el `SPREADSHEET_ID` de la URL:
```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

---

### Paso 2 — Obtener API Key de Gemini (gratis)

1. Ir a [aistudio.google.com](https://aistudio.google.com)
2. Clic en **Get API Key → Create API Key**
3. Seleccionar o crear un proyecto de Google Cloud
4. Copiar la API Key generada

> **Límites gratuitos:** 15 requests/minuto · 1,500 requests/día

---

### Paso 3 — Crear el Apps Script

1. En el Sheet ir a **Extensiones → Apps Script**
2. Reemplazar todo el contenido con el código de [`Code.gs`](./Code.gs)
3. Actualizar las constantes al inicio:

```javascript
const GEMINI_API_KEY = "TU_API_KEY";
const SPREADSHEET_ID = "TU_SPREADSHEET_ID";
const SHEET_NAME     = "feedback";
```

4. Guardar con `Ctrl+S`

---

### Paso 4 — Desplegar como Web App

1. Clic en **Implementar → Nueva implementación**
2. Tipo: **Aplicación web**
3. Configurar:

| Campo | Valor |
|-------|-------|
| Ejecutar como | **Yo** |
| Quién puede acceder | **Cualquier persona** |

4. Clic en **Implementar** y autorizar los permisos
5. Copiar la URL generada (`https://script.google.com/macros/s/.../exec`)
6. Pegarla en `.env` como `APPS_SCRIPT_URL`

> ⚠️ Cada vez que modifiques el código debes crear una **nueva versión** en *Administrar implementaciones* para que los cambios surtan efecto.

---

### Paso 5 — Activar el trigger automático

Ejecutar la función `crearTrigger` **una sola vez** desde el editor de Apps Script:

1. Seleccionar `crearTrigger` en el dropdown de funciones
2. Clic en ▶️ **Ejecutar**

Esto configura `clasificarPendientes()` para ejecutarse cada 5 minutos y clasificar con Gemini cualquier feedback nuevo que llegue.

---

## 📊 Dashboard en Looker Studio

### Configurar la fuente de datos

1. Ir a [lookerstudio.google.com](https://lookerstudio.google.com) → **Crear → Informe**
2. Conectar **Google Sheets** → seleccionar el Sheet `Alegra Feedback Intelligence` → hoja `feedback`

### Elementos del dashboard

**Filtros (parte superior):**
- 📅 Control de período de fecha → campo `Marca de Tiempo`
- 🎭 Lista desplegable → campo `Categoría Sentimiento`
- 📦 Lista desplegable → campo `Producto`

**Gráficos:**
- 📊 Gráfico de barras → `Producto` (dimensión) + `Recuento` (métrica)
- 🥧 Gráfico circular → `Categoría Sentimiento` (dimensión)
- 📋 Tabla → todas las columnas para revisión detallada
- 🔢 Scorecard → total de feedbacks recibidos

---

## 📋 Estructura de Datos

| Columna | Tipo | Fuente | Ejemplo |
|---------|------|--------|---------|
| **A · Marca de Tiempo** | Fecha/Hora | Automático | `09/03/2026 21:17:55` |
| **B · Producto** | Texto | Usuario | `Alegra POS` |
| **C · Comentario** | Texto | Usuario | `La interfaz es muy intuitiva...` |
| **D · Nombre Usuario** | Texto | Usuario (opcional) | `Juan Pérez` |
| **E · Categoría Sentimiento** | Texto | Gemini IA | `Positivo` |
| **F · Resumen IA** | Texto | Gemini IA | `Interfaz intuitiva y fácil de usar` |

---

## 🧪 Testing

### Probar el endpoint de Apps Script

```bash
node test-apps-script.js
```

Respuesta esperada:
```json
{ "status": "ok" }
```

### Probar Gemini desde Apps Script

Ejecutar la función `testGemini` directamente en el editor. En los logs debe aparecer:

```
Status: 200
{"sentimiento":"Positivo","resumen":"conexión exitosa con Gemini"}
```

### Flujo completo de verificación

1. Enviar un feedback desde `http://localhost:4321`
2. Verificar que aparece en Google Sheets (columnas A–D inmediatamente)
3. Esperar hasta 5 minutos para que el trigger clasifique (columnas E y F)
4. Confirmar que el dashboard de Looker Studio refleja el nuevo registro

---

## 🔧 Decisiones Técnicas

**¿Por qué `doPost` no llama a Gemini directamente?**  
Los Web Apps de Apps Script tienen un timeout corto. Llamar a Gemini dentro del POST causaba que la clasificación se cortara silenciosamente. La solución fue separar la recepción del dato (instantánea) de la clasificación (trigger cada 5 min).

**¿Por qué `texto.replace(/'/g, '"')`?**  
Gemini a veces responde con comillas simples en lugar de dobles en el JSON, lo que rompe `JSON.parse()`. Esta normalización garantiza compatibilidad independientemente del formato de respuesta del modelo.

**¿Por qué `Utilities.sleep(12000)` entre llamadas?**  
El plan gratuito de Gemini permite 15 requests por minuto. Con 12 segundos de pausa entre llamadas se evita el error 429 (rate limit exceeded) al clasificar lotes de registros.

---

## 🚀 Despliegue en Vercel

```bash
# 1. Push a GitHub
git add .
git commit -m "feat: sistema de feedback con IA"
git push origin main
```

En [vercel.com](https://vercel.com) → **Add New Project** → importar el repositorio:

| Configuración | Valor |
|--------------|-------|
| Framework Preset | Astro |
| Root Directory | `alegra-feedback` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Agregar variable de entorno en **Settings → Environment Variables**:
```
APPS_SCRIPT_URL = https://script.google.com/macros/s/TU_ID/exec
```

---

## 🐛 Problemas Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Cannot read properties of null (appendRow)` | Nombre de pestaña incorrecto | Verificar que la pestaña se llame exactamente `feedback` |
| `HTTP 429` de Gemini | Rate limit alcanzado | Esperar 1–2 minutos y aumentar `Utilities.sleep()` a 15000ms |
| Columnas E y F vacías tras el POST | El trigger aún no se ejecutó | Esperar máximo 5 minutos o ejecutar `clasificarPendientes()` manualmente |
| `No JSON en respuesta` | Gemini respondió con comillas simples | Verificado y corregido con `.replace(/'/g, '"')` en el script |
| El formulario no envía | URL de Apps Script incorrecta en `.env` | Verificar `APPS_SCRIPT_URL` y que el Web App esté desplegado |
| Cambios en script sin efecto | No se creó nueva versión | Implementar → Administrar implementaciones → Nueva versión |

---

## 👤 Autor

**Jonathan**  
Candidato — Aprendiz SENA · Automation Support Intern  
Reto técnico para · Marzo 2026