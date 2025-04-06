# Lumi - API de Extração e Visualização de Faturas de Energia

Projeto desenvolvido por **João Vitor Dadas** para o desafio técnico Full Stack da Lumi.

## 📦 Tecnologias utilizadas

- Node.js + Express
- TypeScript
- Prisma + PostgreSQL
- Swagger (documentação)
- Jest + Supertest (testes)
- pdf-parse (extração de dados de PDFs)
- Zod (validação)

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js v18+
- Docker (para rodar o banco de dados)
- PostgreSQL (caso prefira usar localmente)

### Instalação

```bash
git clone https://github.com/seu-usuario/lumi-backend.git
cd lumi-backend
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` com:

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/lumi
```

### Rodar a API

```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000`

---

## 📥 Como importar os dados dos PDFs

1. Coloque os arquivos PDF na estrutura correta em subpastas por cliente, ex:
```
/faturas/Instalacao_3001422762/fatura-JAN.pdf
```

2. Rode o endpoint:

```
POST /invoices/extract-all
```

---

## 🧪 Testes

### Testes de integração

```bash
npm test
```

### Testes unitários (em breve):
- `PdfInvoiceExtractor`
- Cálculo de totais

---

## 📘 Documentação Swagger

Acesse:

```
http://localhost:3000/api-docs
```

Documentação gerada com exemplos, esquemas e mensagens de erro.

---

## ☁️ Deploy (opcional)

Ainda não publicado. Para publicar, você pode usar:
- Railway (mais fácil com Docker)
- Render
- Vercel (Edge Functions)

---

## 📬 Contato

Feito com 💡 por João Vitor Dadas.