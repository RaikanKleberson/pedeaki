async function carregarPedidos() {
  // Usamos o slug da loja (poderia vir de um login salvo no localStorage)
  const slug = "top-gas";

  try {
    const response = await fetch("http://localhost:3000/admin/orders", {
      headers: { "x-tenant": slug },
    });
    const pedidos = await response.json();

    const container = document.getElementById("listaPedidos");

    if (pedidos.length === 0) {
      container.innerHTML = "<p>Nenhum pedido novo no momento.</p>";
      return;
    }

    container.innerHTML = pedidos
      .map(
        (p) => `
            <div class="card-pedido">
                <h3>Pedido #${p.id}</h3>
                <p>Cliente: ${p.customerName}</p>
                <p>Endereço: ${p.address}</p>
                <p>Status: <b>${p.status}</b></p>
            </div>
        `,
      )
      .join("");
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
  }
}

// Executa a função assim que a página abrir
carregarPedidos();
