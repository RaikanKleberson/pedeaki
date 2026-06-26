async function fazerLogin() {
  // ASYNC: Permite que o JS espere a resposta do servidor sem travar a tela.
  const slug = document.getElementById("slug").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST", // POST: Estamos enviando dados para o servidor.
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, password }), // JSON.STRINGIFY: Transforma o objeto JS em texto para viajar na rede.
    });

    const data = await response.json(); // AWAIT: Espera o servidor terminar de responder.

    if (response.ok) {
      alert("Sucesso! Bem-vindo, " + data.name);
      window.location.href = "admin.html"; // Redireciona o dono para o painel de pedidos.
    } else {
      alert("Erro: " + data.error);
    }
  } catch (err) {
    alert("Erro ao conectar no servidor!");
  }
}
