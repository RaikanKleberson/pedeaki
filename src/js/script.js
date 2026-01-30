// Dados dos produtos com CATEGORIAS
const produtos = [
  // AÇOUGUE
  { 
    id: 1, 
    nome: "Picanha 1kg", 
    preco: 89.90, 
    qtd: 0,
    categoria: "acougue",
    imagem: "src/images/produtos/picanha.png"
  },
  { 
    id: 2, 
    nome: "Frango Inteiro", 
    preco: 18.90, 
    qtd: 0,
    categoria: "acougue",
    imagem: "src/images/produtos/frango.png"
  },
  
  // HORTIFRUTI
  { 
    id: 3, 
    nome: "Tomate kg", 
    preco: 6.50, 
    qtd: 0,
    categoria: "hortifruti",
    imagem: "src/images/produtos/tomate.png"
  },
  { 
    id: 4, 
    nome: "Alface Unid.", 
    preco: 3.50, 
    qtd: 0,
    categoria: "hortifruti",
    imagem: "src/images/produtos/alface.png"
  },
  
  // MERCEARIA
  { 
    id: 5, 
    nome: "Arroz 5kg", 
    preco: 28.90, 
    qtd: 0,
    categoria: "mercearia",
    imagem: "src/images/produtos/arroz.png"
  },
  { 
    id: 6, 
    nome: "Feijão 1kg", 
    preco: 8.50, 
    qtd: 0,
    categoria: "mercearia",
    imagem: "src/images/produtos/feijao.png"
  },
  
  // BEBIDAS
  { 
    id: 7, 
    nome: "Coca-Cola 2L", 
    preco: 9.90, 
    qtd: 0,
    categoria: "bebidas",
    imagem: "src/images/produtos/cocacola2l.png"
  },
  
  // LIMPEZA
  { 
    id: 8, 
    nome: "Detergente 500ml", 
    preco: 2.50, 
    qtd: 0,
    categoria: "limpeza",
    imagem: "src/images/produtos/detergente.png"
  }
];

// Elementos do DOM
const listaCarrinhoEl = document.getElementById("lista-produtos");
const totalPedidoEl = document.getElementById("total-pedido");
const nomeClienteEl = document.getElementById("nome-cliente");
const enderecoClienteEl = document.getElementById("endereco-cliente");

// SLIDE BANNER
let slide = document.querySelectorAll('.slide');
let index = 0;

setInterval(() => {
  slide[index].classList.remove('active');
  index = (index + 1) % slide.length;
  slide[index].classList.add('active');
}, 3000);

// INICIALIZAR CATÁLOGO POR CATEGORIAS
function inicializarCatalogo() {
  const categorias = ['acougue', 'hortifruti', 'mercearia', 'bebidas', 'limpeza'];
  
  categorias.forEach(cat => {
    const container = document.getElementById(`${cat}-produtos`);
    if (!container) return;
    
    container.innerHTML = "";
    
    // Filtrar produtos da categoria
    const produtosDaCategoria = produtos.filter(p => p.categoria === cat);
    
    produtosDaCategoria.forEach(produto => {
      const produtoCard = document.createElement("div");
      produtoCard.className = "produto-card";
      
      produtoCard.innerHTML = `
        <div class="produto-imagem">
          <img src="${produto.imagem}" alt="${produto.nome}" 
               style="width:100%; border-radius:10px; height:200px; object-fit:cover;"
               onerror="this.src='https://via.placeholder.com/200x200?text=Sem+Imagem'">
        </div>
        <h3 class="produto-nome">${produto.nome}</h3>
        <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
        <div class="controles">
          <button class="btn-quantidade" onclick="diminuir(${produto.id})">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantidade" id="qtd-${produto.id}">${produto.qtd}</span>
          <button class="btn-quantidade" onclick="aumentar(${produto.id})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      `;
      
      container.appendChild(produtoCard);
    });
  });
}

// ATUALIZAR CARRINHO
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
  
  totalPedidoEl.textContent = `R$ ${total.toFixed(2)}`;
}

// FUNÇÕES DE QUANTIDADE
function aumentar(id) {
  const produto = produtos.find(p => p.id === id);
  produto.qtd++;
  
  // Atualizar apenas o número visualmente
  document.getElementById(`qtd-${id}`).textContent = produto.qtd;
  
  salvarCarrinho();
  atualizarCarrinho();
}

function diminuir(id) {
  const produto = produtos.find(p => p.id === id);
  if (produto.qtd > 0) {
    produto.qtd--;
    
    // Atualizar apenas o número visualmente
    document.getElementById(`qtd-${id}`).textContent = produto.qtd;
    
    salvarCarrinho();
    atualizarCarrinho();
  }
}

// LOCALSTORAGE
function salvarCarrinho() {
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

function carregarCarrinho() {
  const produtosSalvos = localStorage.getItem('produtos');

  if (produtosSalvos) {
    const produtosParse = JSON.parse(produtosSalvos);

    produtosParse.forEach(produtoSalvo => {
      const produto = produtos.find(p => p.id === produtoSalvo.id);
      if (produto) {
        produto.qtd = produtoSalvo.qtd;
      }
    });
  }
}

// FINALIZAR PEDIDO
function finalizarPedido() {
  if (!nomeClienteEl.value.trim() || !enderecoClienteEl.value.trim()) {
    alert("Por favor, informe nome e endereço para entrega.");
    return;
  }

  let mensagem = "🛒 *Pedido - PedeAki* 🛒\n\n";
  let total = 0;

  const nomeCliente = nomeClienteEl.value.trim();
  const enderecoCliente = enderecoClienteEl.value.trim();

  produtos.forEach(produto => {
    if (produto.qtd > 0) {
      const subtotal = produto.preco * produto.qtd;
      mensagem += `→ ${produto.nome}\n`;
      mensagem += `   Qtd: ${produto.qtd} | R$ ${subtotal.toFixed(2)}\n\n`;
      total += subtotal;
    }
  });

  if (total === 0) {
    alert("Adicione produtos ao carrinho antes de finalizar!");
    return;
  }

  mensagem += `━━━━━━━━━━━━━━━━━\n`;
  mensagem += `💰 *TOTAL: R$ ${total.toFixed(2)}*\n\n`;
  mensagem += `👤 *Cliente:* ${nomeCliente}\n`;
  mensagem += `📍 *Endereço:* ${enderecoCliente}`;

  const telefoneMercado = "5563999665779";
  const url = `https://wa.me/${telefoneMercado}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}

// INICIALIZAR
document.addEventListener('DOMContentLoaded', () => {
  carregarCarrinho();
  inicializarCatalogo();
  atualizarCarrinho();
});