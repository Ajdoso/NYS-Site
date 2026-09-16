function switchTab(tab) {
    const isSignin = tab === 'signin';
    document.querySelectorAll('.tab').forEach((t, i) => {
      t.classList.toggle('active', isSignin ? i === 0 : i === 1);
    });
    document.getElementById('signin').classList.toggle('active', isSignin);
    document.getElementById('register').classList.toggle('active', !isSignin);
    document.getElementById('footer-text').innerHTML = isSignin
      ? `Don't have an account? <a href="#" class="link-green" onclick="switchTab('register');return false;">Sign up free</a>`
      : `Already have an account? <a href="#" class="link-green" onclick="switchTab('signin');return false;">Sign in</a>`;
  }

  function togglePw(id, btn) {
    const inp = document.getElementById(id);
    const hide = inp.type === 'text';
    inp.type = hide ? 'password' : 'text';
    btn.innerHTML = hide
      ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
      : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
  }

  // Focus icon highlight
  document.querySelectorAll('.input-wrap input').forEach(inp => {
    inp.addEventListener('focus', () => {
      const icon = inp.parentElement.querySelector('.input-icon');
      if (icon) icon.style.color = '#3dba4e';
    });
    inp.addEventListener('blur', () => {
      const icon = inp.parentElement.querySelector('.input-icon');
      if (icon) icon.style.color = '';
    });
  });

  function ISCorect(){
    
  }