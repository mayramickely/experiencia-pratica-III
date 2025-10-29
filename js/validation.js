export const validators = {
  required: v => v !== null && v !== undefined && String(v).trim() !== '',
  email: v => /\S+@\S+\.\S+/.test(v),
  minLength: (v,n) => String(v||'').trim().length >= n
};

export function validateForm(formElement) {
  const fields = Array.from(formElement.querySelectorAll('[data-validate]'));
  const errors = {};
  fields.forEach(field => {
    const rules = field.dataset.validate.split('|');
    for(const rule of rules) {
      if(rule==='required' && !validators.required(field.value)){ errors[field.name]='Campo obrigatório'; break; }
      if(rule==='email' && field.value && !validators.email(field.value)){ errors[field.name]='E-mail inválido'; break; }
      if(rule.startsWith('min:')){ const n=Number(rule.split(':')[1]); if(!validators.minLength(field.value,n)){ errors[field.name]='Mínimo '+n+' caracteres'; break; } }
    }
  });
  return errors;
}

export function showErrors(formElement, errors) {
  formElement.querySelectorAll('.error').forEach(e=>e.remove());
  for(const name in errors){
    const field=formElement.querySelector('[name="'+name+'"]');
    if(!field) continue;
    const msg=document.createElement('div'); msg.className='error'; msg.textContent=errors[name];
    field.insertAdjacentElement('afterend', msg);
    if(Object.keys(errors)[0]===name) field.focus();
  }
}