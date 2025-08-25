# 🤖 Chatbot Backend (chatbot-backend-xumtech)

Backend del **chatbot conversacional** desarrollado para soporte / asistente administrativo y POC de integración de IA.  
Responde preguntas desde una base de datos (preguntas predefinidas + embeddings) y utiliza Cohere como fallback cuando no encuentra coincidencias. También registra preguntas no respondidas para entrenamiento/manual review.

---

## 📌 Características principales

- Búsqueda por similitud (embeddings / cosine) para mapear preguntas no literales a respuestas predefinidas.
- Fallback a Cohere (LLM) cuando no hay coincidencias suficientes.
- Tabla `unansweredQuestion` para almacenar preguntas sin respuesta y permitir revisión/admin.
- Panel / endpoints admin protegidos por JWT (roles).
- Arquitectura modular (controllers → services → middlewares).
- Tipado con TypeScript y Prisma ORM.

---

## 🧰 Tecnologías

- Node.js, Express, TypeScript  
- Prisma ORM + PostgreSQL (Supabase ó local)  
- Cohere API (fallback LLM + embeddings cuando se utiliza)  
- JWT para autenticación (admin)  
- ts-node-dev, tsconfig-paths para desarrollo local  
- Tailwind / Next (frontend separado) — interfaz admin (dashboard) consumiendo estos endpoints

---

## 🛠️ Requisitos previos

- Node.js >= 18
- npm (o pnpm/yarn)
- PostgreSQL (o cuenta en Supabase)
- Acceso a la API de Cohere (si quieres usar fallback)

---

## 🚀 Instalación (local)

1. Clona el repositorio y entra al proyecto:


git clone https://github.com/RonaldoRyan/chatbot-backend-xumtech.git
cd chatbot-backend-xumtech
Instala dependencias:


npm install


Asegúrate de ejecutar desde la raíz del proyecto (donde está package.json) — no desde src/.

(Opcional) Si usas alias TypeScript (@lib, @modules, ...), instala tsconfig-paths y ajusta el script dev:


npm install --save-dev tsconfig-paths
En package.json tu script dev debería ser (recomendado):


"scripts": {
  "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}



⚙️ Variables de entorno (.env)
Crea un .env en la raíz (puedes copiar .env.example). Ejemplo mínimo:


DATABASE_URL="postgresql://USER:PASSWORD@host:5432/postgres"
COHERE_API_KEY="tu_api_key_de_cohere"
JWT_SECRET="tu_jwt_secret_local"
NODE_ENV=development
PORT=3001


🗄️ Migraciones & seed (Prisma)
Edita prisma/schema.prisma si hiciera falta.

Ejecuta migraciones (desarrollo):


npx prisma migrate dev --name init
Ejecuta seed (si tienes un script seed):


npx ts-node prisma/seed.ts
# o si tu seed está exportado como main:
node -e "require('./dist/prisma/seed').main()"  # (si compilaste primero)
En tu src/index.ts ya llamas a seed() al iniciar el servidor en dev (siempre revisa para no sobreescribir datos en producción).

▶️ Ejecutar (desarrollo)

npm run dev
El servidor escuchará en http://localhost:3001 (o el PORT que configures).

📚 Endpoints principales (ejemplos)
Todos los endpoints admin requieren JWT con rol admin (header Authorization: Bearer <TOKEN>).

Auth
POST /api/auth/login
Body JSON:


{ "email": "admin@example.com", "password": "tu_password" }
Respuesta: { "token": "..." }

Unanswered (admin)
GET /api/admin/unanswered — listar preguntas sin responder

GET /api/admin/unanswered/:id — obtener pregunta por id

POST /api/admin/unanswered/:id/answer — responder una pregunta (body { "answer": "..." })

DELETE /api/admin/unanswered/:id — eliminar pregunta sin responder

Chat (usuario)
POST /api/chat (o el endpoint que uses) — recibir pregunta, buscar por embeddings, fallback LLM y devolver respuesta

🧪 Probar con Postman (rápido)
Hacer POST /api/auth/login y copiar el token de la respuesta.

En Postman, crea variable token en el environment y pega el JWT.

En las requests protegidas añade Header:


Authorization: Bearer {{token}}
Probar GET /api/admin/unanswered.

🔐 Seguridad & privacidad
En producción siempre proteger /api/admin con HTTPS + JWT + validación de roles.

No guardar claves en el repositorio. En producción usa secret manager (AWS Secrets Manager, Vault, etc.).

Sanitiza/limpia inputs y evita logging de PII.

Revisa límite de tokens / rate limiting si usas un proveedor externo (Cohere / OpenAI).

🐞 Troubleshooting (problemas comunes)
ECONNREFUSED en Postman: asegúrate de que el servidor corre en la raíz del proyecto y puerto correcto.

Cannot find module '@lib/prisma': revisa tsconfig.json (baseUrl y paths) y ejecuta con ts-node-dev -r tsconfig-paths/register. Alternativa: usa imports relativos.

Cannot find module 'bcryptjs': instala npm i bcryptjs y npm i -D @types/bcryptjs si usas TypeScript.

404 en /api/admin/unanswered: revisa que routes/index.ts importe y haga router.use('/admin', adminRoutes), y que adminRoutes monte el router de unanswered (router.use('/unanswered', unansweredRoutes)).

Prisma/DB: si trabajas con la DB remota (Supabase), recuerda que migraciones sobre esa DB afectarán datos reales. Usa una DB local para pruebas.

✅ Buenas prácticas recomendadas
Mantén unanswered protegido por roles admin.

Usa seed y migraciones en ramas feature solo en entornos de prueba.

Versiona el esquema Prisma y documenta los cambios en el PR.

📦 Mejoras futuras (ideas)
Panel admin con UI para aprobar y crear Q→A (ya en roadmap).

RAG completo con embeddings + Qdrant o Pinecone.

Fine-tuning o vector-store + re-ranking para reducir alucinaciones.

Logging de interacciones y métricas (latencia, tasa de fallback).

🤝 Contribuir
Fork → branch feature: feature/<nombre>

git add . → git commit -m "feat(admin): ..." → git push origin feature/<nombre>

Abre PR contra main y describe los cambios.

🧾 Autor
Ronaldo Ryan — Fullstack Developer
https://github.com/RonaldoRyan


