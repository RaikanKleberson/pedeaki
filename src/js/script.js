// Dados dos produtos
const produtos = [
  { 
    id: 1, 
    nome: "Arroz 5kg", 
    preco: 28.90, 
    qtd: 0,
    imagem: "src/images/produtos/arroz.png" // Adicione suas imagens
  },
  { 
    id: 2, 
    nome: "Feijão 1kg", 
    preco: 8.50, 
    qtd: 0,
    imagem: "src/images/produtos/feijao.png"
  },
  { 
    id: 3, 
    nome: "Açúcar 1kg", 
    preco: 4.99, 
    qtd: 0,
    imagem: "src/images/produtos/acucar.jpg"
  },
  { 
    id: 4, 
    nome: "Óleo 900ml", 
    preco: 7.90, 
    qtd: 0,
    imagem: "src/images/produtos/oleo.jpg"
  },
  { 
    id: 5, 
    nome: "Café 500g", 
    preco: 12.90, 
    qtd: 0,
    imagem: "src/images/produtos/cafe.jpg"
  },
  { 
    id: 6, 
    nome: "Leite 1L", 
    preco: 4.50, 
    qtd: 0,
    imagem: "src/images/produtos/leite.jpg"
  }
];

// Elementos do DOM
const catalogoEl = document.getElementById("catalogo");
const listaCarrinhoEl = document.getElementById("lista-produtos");
const totalPedidoEl = document.getElementById("total-pedido");

// Inicializar catálogo
function inicializarCatalogo() {
  catalogoEl.innerHTML = "";
  
  produtos.forEach(produto => {
    const produtoCard = document.createElement("div");
    produtoCard.className = "produto-card";
    
    produtoCard.innerHTML = `
      <div class="produto-imagem">
        <img src="${produto.imagem || 'placeholder.jpg'}" alt="${produto.nome}" style="width:100%; border-radius:10px; height:200px; object-fit:cover;">
      </div>
      <h3 class="produto-nome">${produto.nome}</h3>
      <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
      <div class="controles">
        <button class="btn-quantidade" onclick="diminuir(${produto.id})">
          <i class="fas fa-minus"></i>
        </button>
        <span class="quantidade">${produto.qtd}</span>
        <button class="btn-quantidade" onclick="aumentar(${produto.id})">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    `;
    
    catalogoEl.appendChild(produtoCard);
  });
}

// Atualizar carrinho
function atualizarCarrinho() {
  listaCarrinhoEl.innerHTML = "";
  let total = 0;
  
  produtos.forEach(produto => {
    if (produto.qtd > 0) {
      total += produto.preco * produto.qtd;
      
      const item = document.createElement("div");
      item.className = "carrinho-item";
      item.innerHTML = `
        <span>${produto.nome} x${produto.qtd}</span>
        <span>R$ ${(produto.preco * produto.qtd).toFixed(2)}</span>
      `;
      
      listaCarrinhoEl.appendChild(item);
    }
  });
  
  // Atualizar total
  totalPedidoEl.textContent = `R$ ${total.toFixed(2)}`;
}

// Funções de quantidade
function aumentar(id) {
  const produto = produtos.find(p => p.id === id);
  produto.qtd++;
  inicializarCatalogo();
  atualizarCarrinho();
}

function diminuir(id) {
  const produto = produtos.find(p => p.id === id);
  if (produto.qtd > 0) {
    produto.qtd--;
    inicializarCatalogo();
    atualizarCarrinho();
  }
}

// Finalizar pedido no WhatsApp
function finalizarPedido() {
  let mensagem = "🛒 *PEDIDO - PEDEAKI*\n\n";
  let total = 0;
  
  produtos.forEach(produto => {
    if (produto.qtd > 0) {
      const subtotal = produto.preco * produto.qtd;
      mensagem += `➡️ ${produto.nome}\n`;
      mensagem += `   Quantidade: ${produto.qtd}\n`;
      mensagem += `   Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
      total += subtotal;
    }
  });
  
  if (total === 0) {
    alert("Adicione produtos ao carrinho antes de finalizar!");
    return;
  }
  
  mensagem += ` *TOTAL DO PEDIDO: R$ ${total.toFixed(2)}*\n\n`;
  mensagem += ` *Cliente:* [NOME DO CLIENTE]\n`;
  mensagem += ` *Endereço:* [ENDEREÇO DE ENTREGA]`;
  
  const telefoneMercado = "5563999665779";
  const url = `https://wa.me/${telefoneMercado}?text=${encodeURIComponent(mensagem)}`;
  
  window.open(url, "_blank");
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
  inicializarCatalogo();
  atualizarCarrinho();
});
