/* PUBLIC DEMO ACCOUNTS ONLY. This intentionally is not production authentication.
   Credentials and role state stay in memory. No fetch, cookies or browser storage. */
(() => {
  'use strict';
  const $=selector=>document.querySelector(selector);
  const accounts={learner:{email:'learner@sparklab.demo',name:'Spark Learner'},educator:{email:'educator@sparklab.demo',name:'Spark Educator'}};
  const demoPassword='Spark123!';
  let role=null,selectedRole='learner',progress={cards:0,badges:0};
  function chooseRole(next){
    selectedRole=next==='educator'?'educator':'learner';
    document.querySelectorAll('[data-demo-account]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.demoAccount===selectedRole)));
    $('#demo-email').value=accounts[selectedRole].email;$('#demo-password').value=demoPassword;
    $('#sample-email').textContent=accounts[selectedRole].email;$('#login-error').textContent='';
    $('#demo-email').removeAttribute('aria-invalid');$('#demo-password').removeAttribute('aria-invalid');
  }
  function openLogin(next='learner'){
    if($('#account-dialog').open)$('#account-dialog').close();
    chooseRole(next);$('#demo-password').type='password';$('#show-demo-password').textContent='Show';$('#show-demo-password').setAttribute('aria-label','Show demo password');$('#show-demo-password').setAttribute('aria-pressed','false');
    if(!$('#login-dialog').open)$('#login-dialog').showModal();
    document.body.classList.add('auth-open');
    document.querySelector(`[data-demo-account="${selectedRole}"]`).focus();
  }
  function closeLogin(){if($('#login-dialog').open)$('#login-dialog').close();}
  function updateUI(){
    const account=role?accounts[role]:null;
    $('#account-button').textContent=account?(role==='learner'?'Learner demo':'Educator demo'):'Demo sign in';
    $('#account-button').setAttribute('aria-controls',account?'account-dialog':'login-dialog');
    $('#session-label').textContent=account?`${role.toUpperCase()} DEMO WORKSPACE`:'YOUR SPACE TO EXPLORE';
    $('#welcome-title').textContent=account?`Welcome, ${account.name}.`:'A little curiosity goes a long way.';
    $('#welcome-copy').textContent=role==='educator'?'Explore the sample classroom, notice progress, and find a helpful next step.':'Start with a card, build with blocks, or see what you remember.';
    $('#workspace-role').textContent=account?`${role.toUpperCase()} DEMO`:'GUEST DEMO';
    $('#welcome-signin').hidden=!!account;$('#session-totals').hidden=!account;
    $('#welcome-cards').textContent=progress.cards;$('#welcome-badges').textContent=progress.badges;
    $('#account-cards').textContent=`${progress.cards} / 4`;$('#account-badges').textContent=`${progress.badges} / 3`;
    if(account){$('#account-title').textContent=`Hello, ${account.name}.`;$('#account-description').textContent=role==='educator'?'Your educator demo includes a fictional classroom dashboard.':'Your learner demo is ready for small discoveries and little wins.';$('#account-avatar').textContent=role==='learner'?'SL':'SE';$('#continue-workspace').textContent=role==='educator'?'Open educator dashboard':'Continue learning';}
  }
  function enter(next){
    role=next;closeLogin();if($('#account-dialog').open)$('#account-dialog').close();
    updateUI();$('#account-announcement').textContent=role?`Signed in as ${accounts[role].name}.`:'You are exploring as a guest.';
    document.dispatchEvent(new CustomEvent('spark:session',{detail:{role}}));
  }
  window.SparkDemoSession=Object.freeze({getRole:()=>role,open:openLogin});
  document.querySelectorAll('[data-login]').forEach(button=>button.onclick=()=>{
    if(role&&button.id==='account-button'){$('#account-dialog').showModal();document.body.classList.add('auth-open');$('#continue-workspace').focus();}
    else openLogin(button.dataset.loginRole||'learner');
  });
  document.querySelectorAll('[data-demo-account]').forEach(button=>button.onclick=()=>chooseRole(button.dataset.demoAccount));
  document.querySelector('[data-close-login]').onclick=closeLogin;
  $('#close-account').onclick=()=>$('#account-dialog').close();
  $('#login-dialog').addEventListener('close',()=>{if(!$('#account-dialog').open)document.body.classList.remove('auth-open');});
  $('#account-dialog').addEventListener('close',()=>{if(!$('#login-dialog').open)document.body.classList.remove('auth-open');});
  $('#show-demo-password').onclick=()=>{const show=$('#demo-password').type==='password';$('#demo-password').type=show?'text':'password';$('#show-demo-password').textContent=show?'Hide':'Show';$('#show-demo-password').setAttribute('aria-label',show?'Hide demo password':'Show demo password');$('#show-demo-password').setAttribute('aria-pressed',String(show));};
  $('#demo-login-form').addEventListener('submit',event=>{
    event.preventDefault();const email=$('#demo-email').value.trim().toLowerCase();
    const matched=Object.keys(accounts).find(key=>accounts[key].email===email);
    if(!matched||$('#demo-password').value!==demoPassword){$('#login-error').textContent='Use one of the sample accounts above with the password Spark123!.';$('#demo-email').setAttribute('aria-invalid',String(!matched));$('#demo-password').setAttribute('aria-invalid',String($('#demo-password').value!==demoPassword));return;}
    $('#demo-password').value='';enter(matched);
  });
  $('#continue-guest').onclick=()=>enter(null);
  $('#continue-workspace').onclick=()=>enter(role);
  $('#switch-account').onclick=()=>openLogin(role==='educator'?'learner':'educator');
  $('#sign-out').onclick=()=>{enter(null);$('#account-announcement').textContent='Signed out of the demo. You can continue as a guest; this tab’s learning progress is unchanged.';};
  document.addEventListener('spark:progress',event=>{progress=event.detail;updateUI();});
  updateUI();
})();
