// data.js
export const tenants = [
  { id: 1, name: "Top Gás", slug: "top-gas" },
  { id: 2, name: "Bengô Açaiteria", slug: "bengo-acai" },
];

export const products = [
  { id: 1, tenantId: 1, name: "Botijão 13kg", price: 120 },
  { id: 2, tenantId: 1, name: "Botijão 45kg", price: 380 },
  { id: 3, tenantId: 2, name: "Açaí 300ml", price: 12 },
  { id: 4, tenantId: 2, name: "Açaí 500ml", price: 18 },
];

export const orders = []; // A memória do nosso sistema
