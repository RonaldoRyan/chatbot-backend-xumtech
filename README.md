# 🤖 Chatbot Backend - Evaluación Técnica Xumtech

Este es el backend de un **mini chatbot conversacional** desarrollado como parte
de una evaluación técnica para Xumtech. Responde preguntas desde una base de
datos y utiliza inteligencia artificial mediante Cohere cuando no encuentra
coincidencias. Permite registrar preguntas no comprendidas para entrenamiento
posterior.

---

## ⚙️ Tecnologías utilizadas

- **Node.js** + **Express** - API REST
- **TypeScript** - Tipado estático
- **Prisma ORM** - Acceso a base de datos
- **SQLite** - Base de datos local ligera
- **Cohere API** - Procesamiento de lenguaje natural
- **dotenv** - Variables de entorno
- **string-similarity** - Match aproximado entre preguntas

---

## 🚀 Instalación y ejecución local

### 1. Clona el proyecto

```bash
git clone https://github.com/RonaldoRyan/chatbot-backend-xumtech.git
cd chatbot-backend-xumtech



Instala las dependencias

npm install


 Configura las variables de entorno

Copia el archivo .env.example:

cp .env.example .env



Ejecuta el proyecto en modo desarrollo

npm run dev


El servidor estará disponible en http://localhost:3001.


💡 ¿Cómo funciona?
El usuario envía una consulta desde el frontend.

El backend busca una pregunta similar en la base de datos usando string-similarity.

Si encuentra un match con >= 0.6 de similitud, devuelve la respuesta desde la base.

Si no, consulta a la API de Cohere.

Si Cohere responde, devuelve esa respuesta y registra la pregunta como no respondida en la tabla unansweredQuestions.

🧠 ¿Cómo entrenar el bot?
El bot aprende agregando nuevas preguntas/respuestas a la base de datos. Para ello:

Consultá las preguntas no respondidas vía:


GET /api/unanswered

Usá ese listado para crear nuevos registros en tu tabla questions.

En producción, esto puede integrarse a un panel admin para edición y entrenamiento sin código.


🛡️ Seguridad
Las API keys están protegidas mediante .env.

.env está ignorado en Git (.gitignore).

El endpoint /api/unanswered debería protegerse con autenticación en producción.

Las preguntas del usuario se sanitizan para evitar inyecciones.

🧪 Pruebas
Consultas exitosas desde la base de datos.

Preguntas no reconocidas registradas correctamente.

Validación de API Key para proteger endpoints sensibles.

Pruebas locales usando Postman.

📹 Demo en video
👉 Haz clic aquí para ver la demo

🛠️ Mejoras futuras
Panel de administración para gestionar preguntas/respuestas.

Soporte para múltiples idiomas.

Entrenamiento automático de preguntas frecuentes.

Integración con frontend React.

🧑‍💼 Autor
Ronaldo Ryan
Fullstack Developer
github.com/RonaldoRyan

```
