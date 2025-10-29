export function initRouter(routes = {}) {
  const outlet = document.getElementById('app');
  if(!outlet) throw new Error('Elemento #app não encontrado');

  async function handleRoute() {
    const hash = location.hash.split('?')[0] || '#/';
    const routeFn = routes[hash];
    try {
      if(routeFn) {
        outlet.innerHTML = '<div class="card">Carregando…</div>';
        await routeFn();
      } else {
        outlet.innerHTML = '<div class="card"><h2>Página não encontrada</h2></div>';
      }
    } catch (err) {
      console.error(err);
      outlet.innerHTML = '<div class="card"><h2>Erro ao carregar a rota</h2></div>';
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}