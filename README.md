# Lumi Backend API

API RESTful para processar e analisar faturas de energia elétrica a partir de arquivos PDF, extraindo dados e calculando estatísticas de consumo.

✨ **Sobre este Projeto**

Este é o backend do projeto **Lumi**. Ele extrai dados de PDFs de faturas de energia, armazena em um banco de dados PostgreSQL e expõe endpoints para acessar os detalhes das faturas e obter insights agregados.

✨ **API ao vivo**: [https://lumi-backend-oj5j.onrender.com/api-docs](https://lumi-backend-oj5j.onrender.com/api-docs)

📂 **Banco de Dados**: Hospedado no **Neon**

🚀 **Deploy**: Render.com (Plano gratuito)

---

## 📃 Tecnologias

- Node.js + Express  
- Prisma ORM + PostgreSQL (Neon)  
- TypeScript  
- pdf-parse  
- Swagger (OpenAPI)  
- Jest para testes  

---

## 🔹 Como Rodar Localmente

```bash
# Clone o projeto
git clone https://github.com/joaodadas/lumi-backend.git

# Acesse a pasta
cd lumi-backend

# Instale as dependências
npm install

# Configure o .env com a string do PostgreSQL no Neon
DATABASE_URL=postgresql://usuario:senha@...neon.tech/lumidb?sslmode=require

# Rode as migrações do banco
npx prisma migrate deploy

# Compile e inicie a API
npm run build
npm start
```

---

## 💡 Documentação Swagger

Documentação completa da API com exemplos:  
[https://lumi-backend-oj5j.onrender.com/api-docs](https://lumi-backend-oj5j.onrender.com/api-docs)

---

## 📊 Endpoints da API

**Base URL**: `https://lumi-backend-oj5j.onrender.com`

---

### ✉️ Upload / Extração

#### `POST /invoices/extract`  
Envia um PDF individual e extrai os dados da fatura para o banco de dados.

#### `POST /invoices/extract-all`  
Extrai todas as faturas em PDF organizadas por pasta de cliente localmente.

---

### 💰 Faturas

#### `GET /invoices`  
Retorna todas as faturas cadastradas no sistema.

#### `GET /invoices/history/:clientNumber`  
Retorna o histórico de faturas de um cliente pelo número do cliente.

#### `GET /invoices/:id/pdf`  
Retorna o caminho do PDF salvo para uma fatura específica.

---

### 📈 Dashboard

#### `GET /dashboard/totals/:clientNumber`  
Retorna os totais agregados de consumo, valor bruto e economia de um cliente.

#### `GET /dashboard/monthly/:clientNumber`  
Retorna os totais de consumo e economia mês a mês para o cliente informado.

---

## ✅ Testes

```bash
# Executar todos os testes (API + Extração + Cálculo)
npm test
```

Testes implementados:

- Extração de dados do PDF (`PdfInvoiceExtractor`)
- Cálculo de totais agregados
- Endpoints das rotas `/invoices` e `/dashboard`

---

## 🌍 Informações de Deploy

- **Render**: Backend hospedado no Render com Node 22. Porta 10000 definida no código.
- **Neon**: Banco de dados PostgreSQL remoto e gratuito, com suporte a SSL.
