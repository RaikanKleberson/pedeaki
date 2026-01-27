const produtos = [
  { id: 1, nome: "Arroz 5kg", preco: 28.90, qtd: 0 },
  { id: 2, nome: "Feijão 1kg", preco: 8.50, qtd: 0 },
  { id: 3, nome: "Açúcar 1kg", preco: 4.99, qtd: 0 }
];

function mostrarProdutos() {
  let catalogo = document.getElementById("catalogo");

  produtos.forEach(produto => {
    catalogo.innerHTML += `
      <div>
        <p>${produto.nome}</p>
        <p>R$ ${produto.preco}</p>
      </div>
    `;
  });
}

const lista = document.getElementById("lista-produtos");

function renderizarProdutos() {
  lista.innerHTML = "";

  produtos.forEach(produto => {
    const item = document.createElement("div");

    item.innerHTML = `
      <strong>${produto.nome}</strong><br>
      R$ ${produto.preco.toFixed(2)}<br>
      <button onclick="diminuir(${produto.id})">-</button>
      ${produto.qtd}
      <button onclick="aumentar(${produto.id})">+</button>
      <hr>
    `;

    lista.appendChild(item);
  });
}

renderizarProdutos();

function aumentar(id) {
  const produto = produtos.find(p => p.id === id);
  produto.qtd++;
  renderizarProdutos();
}

function diminuir(id) {
  const produto = produtos.find(p => p.id === id);
  if (produto.qtd > 0) produto.qtd--;
  renderizarProdutos();
}

function finalizarPedido() {
  let mensagem = "🛒 *Pedido - Pedeaki*\n\n";
  let total = 0;

  produtos.forEach(produto => {
    if (produto.qtd > 0) {
      mensagem += `- ${produto.nome} x${produto.qtd} = R$ ${(produto.preco * produto.qtd).toFixed(2)}\n`;
      total += produto.preco * produto.qtd;
    }
  });

  mensagem += `\n💰 *Total: R$ ${total.toFixed(2)}*`;

  const telefoneMercado = "5563999665779"; // número do mercado
  const url = `https://wa.me/${telefoneMercado}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}
