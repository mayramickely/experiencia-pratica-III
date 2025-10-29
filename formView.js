import { renderTo, html } from '../templates.js';
import { validateForm, showErrors } from '../validation.js';
import { save, load } from '../storage.js';

export default function formView() {
  const saved=load('formData',{});
  const markup = html`
    <section class="card">
      <h2>Formulário de Exemplo</h2>
      <form id="sampleForm" novalidate>
        <div class="row">
          <label for="nome">Nome</label>
          <input type="text" id="nome" name="nome" data-validate="required|min:3" value="${saved.nome||''}">
        </div>
        <div class="row">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" data-validate="required|email" value="${saved.email||''}">
        </div>
        <div class="row">
          <label for="mensagem">Mensagem</label>
          <textarea id="mensagem" name="mensagem" data-validate="min:10">${saved.mensagem||''}</textarea>
        </div>
        <button class="btn" type="submit">Enviar</button>
        <button class="btn" type="button" id="saveDraft">Salvar rascunho</button>
      </form>
    </section>`;
  renderTo('#app', markup);

  const form=document.getElementById('sampleForm');
  const saveBtn=document.getElementById('saveDraft');

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const errors=validateForm(form);
    if(Object.keys(errors).length){ showErrors(form,errors); return; }
    const nome=form.nome.value.trim();
    const email=form.email.value.trim();
    if(nome && email && nome===email){ showErrors(form,{email:'Nome e e-mail não podem ser iguais'}); return; }
    save('formData',{nome,email,mensagem:form.mensagem.value.trim(),submittedAt:new Date().toISOString()});
    form.insertAdjacentHTML('beforeend','<div class="hint">Enviado com sucesso! Rascunho salvo localmente.</div>');
  });

  saveBtn.addEventListener('click',()=>{
    const data={nome:form.nome.value.trim(),email:form.email.value.trim(),mensagem:form.mensagem.value.trim(),draftAt:new Date().toISOString()};
    save('formData',data);
    saveBtn.textContent='Rascunho salvo';
    setTimeout(()=>saveBtn.textContent='Salvar rascunho',1500);
  });
}