export function renderTo(selector, html) {
  const el = document.querySelector(selector);
  if(!el) throw new Error('Seletor não encontrado: ' + selector);
  el.innerHTML = html;
  return el;
}

export function html(parts, ...vals) {
  return parts.reduce((acc, part, i) => acc + part + (vals[i] ?? ''), '');
}