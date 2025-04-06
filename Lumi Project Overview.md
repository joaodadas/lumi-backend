# Lumi Backend API

Backend service for parsing and storing electricity invoice data extracted from PDF files, built with Node.js, TypeScript, Prisma, and Express.

---

## 📦 Project Structure

- **src/**: Application source code
- **tests/**: Automated tests (Jest)
- **prisma/**: Database schema and seed
- **uploads/**: Folder for storing extracted PDFs (optional)

---

## 🚀 How to Run the Project Locally

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment variables**

Create a `.env` file based on `.env.example` and provide your PostgreSQL credentials:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
```

3. **Run the database migrations**

```bash
npx prisma migrate dev --name init
```

4. **Start the application**

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

---

## 📄 API Endpoints

### 🧾 Invoices

- `GET /invoices/:clientNumber/:referenceMonth`
- `GET /invoices/history/:clientNumber`
- `GET /invoices/file/:clientNumber/:referenceMonth`
- `POST /invoices/extract`
- `POST /invoices/extract-all`

### 📊 Dashboard

- `GET /dashboard/totals/:clientNumber`
- `GET /dashboard/monthly/:clientNumber`

---

## 🧪 Running Tests

```bash
npm test
```

Ensure the database is running and contains at least one valid invoice for the client number `7202210726`.

---

## 📚 Swagger Documentation

Once the app is running, access the Swagger UI at:

```
http://localhost:3000/api-docs
```

Includes schemas, examples, and error codes for all endpoints.

---

## ☁️ Optional: Deploy

You can deploy this API on any platform that supports Node.js apps. Some suggestions:

- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Fly.io](https://fly.io/)
- [Vercel (for frontend only)](https://vercel.com/)

---

## 👨‍💻 Author

João Vitor Dadas