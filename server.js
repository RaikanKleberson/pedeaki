// server.js
import express from "express";
import cors from "cors";
import { tenants, products, orders } from "./data.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// Função que identifica a loja pelo link (slug)
function getTenant(req) {
  const slug = req.headers["x-tenant"];
  return tenants.find((t) => t.slug === slug);
}

// Rota de listagem de produtos
app.get("/products", (req, res) => {
  const tenant = getTenant(req);
  if (!tenant) return res.status(404).json({ error: "Empresa não encontrada" });
  const result = products.filter((p) => p.tenantId === tenant.id);
  res.json({ empresa: tenant.name, produtos: result });
});

app.post("/order", (req, res) => {
  const tenant = getTenant(req);
  if (!tenant) return res.status(404).json({ error: "Empresa não encontrada" });

  const { customerName, address, items } = req.body;

  // AQUI ADICIONAMOS O LOG:
  console.log("Novo pedido recebido de:", customerName);

  const newOrder = {
    id: orders.length + 1,
    tenantId: tenant.id,
    customerName,
    address,
    items,
    status: "Pendente",
  };

  orders.push(newOrder);
  res.json({ message: "Pedido recebido!", order: newOrder });
});

// Rota para ver os pedidos da loja
app.get("/admin/orders", (req, res) => {
  const tenant = getTenant(req);
  if (!tenant) return res.status(404).json({ error: "Empresa não encontrada" });
  const myOrders = orders.filter((o) => o.tenantId === tenant.id);
  res.json(myOrders);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.post("/login", (req, res) => {
  const { slug, password } = req.body;
  const tenant = tenants.find((t) => t.slug === slug);

  if (tenant) {
    res.json({ name: tenant.name });
  } else {
    res.status(401).json({ error: "Loja não encontrada" });
  }
});
