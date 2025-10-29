import { renderTo, html } from '../templates.js';
export default function homeView() {
  const markup = html`
    <section class="card">
      <h2>Bem-vindo</h2>
      <p class="hint">Esta é a página inicial da SPA de exemplo.</p>
    </section>`;
  renderTo('#app', markup);
}