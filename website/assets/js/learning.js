/* Spark Lab learning prototypes. State is private to this tab; no persistence or APIs. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const lessons = [
    {subject:'Maths · Combining',title:'Together makes a total.',copy:'Addition combines two groups. Three blocks and two more blocks make five altogether.',prompt:'Think about it: what does the + sign ask you to do?',art:'3 + 2 = 5'},
    {subject:'Maths · Taking away',title:'Some go. Some stay.',copy:'Subtraction takes a quantity away. Start with seven blocks, remove two, and five remain.',prompt:'Imagine seven blocks. How many stay when you take two away?',art:'7 − 2 = 5'},
    {subject:'Science · Living things',title:'Plants use sunlight.',copy:'Plants use energy from sunlight to help make their own food. Leaves help capture that light.',prompt:'Look away for a moment. Can you recall which energy source helps plants make food?',art:'☀ + 🌱'},
    {subject:'Learning · Your pace',title:'A pause is part of learning.',copy:'You do not have to do everything at once. One small idea, a quiet break, and another try are all part of your learning journey.',prompt:'What is one small thing you learned today?',art:'One small step.'}
  ];
  const questions = [
    {question:'What does addition do?',options:['Combines two groups','Takes a group away','Makes every number zero'],answer:0,explanation:'Addition combines groups to find a total. For example, 3 + 2 = 5.'},
    {question:'You have 7 blocks and take away 2. How many remain?',options:['9 blocks','5 blocks','2 blocks'],answer:1,explanation:'Seven minus two leaves five: 7 − 2 = 5.'},
    {question:'What energy source helps plants make their own food?',options:['Moonlight','Sound','Sunlight'],answer:2,explanation:'Plants use energy from sunlight to help make their own food.'}
  ];
  const badgeInfo = [{id:'first',name:'First Spark',description:'Learn your first card.',symbol:'✦'},{id:'cards',name:'Curious Mind',description:'Learn all four cards.',symbol:'✧'},{id:'recall',name:'Recall Star',description:'Answer all three quiz questions correctly.',symbol:'★'}];
  let state = freshState();
  let selectedLearner = 'you';
  function freshState(){return {card:0,completed:new Set(),badges:new Set(),question:0,answers:[],finished:false,lastScore:null,attempts:0,pauses:0,mathBuilds:0};}
  function showPanel(id){
    if(id==='educator' && window.SparkDemoSession.getRole()!=='educator'){
      window.SparkDemoSession.open('educator'); return;
    }
    document.querySelectorAll('.lab-panel').forEach(panel=>panel.hidden=panel.id!==`panel-${id}`);
    document.querySelectorAll('[data-panel]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.panel===id)));
    if(id==='educator')renderDashboard();
  }
  document.querySelectorAll('[data-panel]').forEach(button=>button.addEventListener('click',()=>showPanel(button.dataset.panel)));
  document.querySelectorAll('[data-launch]').forEach(link=>link.addEventListener('click',()=>showPanel(link.dataset.launch)));
  document.querySelectorAll('[data-panel-link]').forEach(button=>button.addEventListener('click',()=>{showPanel(button.dataset.panelLink);$('#learning-card').focus();}));
  function award(id){if(!state.badges.has(id)){state.badges.add(id);$('#session-status').textContent=`Badge earned: ${badgeInfo.find(b=>b.id===id).name}.`;}}
  function renderBadges(){
    $('#badge-list').innerHTML=badgeInfo.map(b=>`<div class="earned-badge ${state.badges.has(b.id)?'earned':'locked'}"><span aria-hidden="true">${b.symbol}</span><div><strong>${b.name}</strong><small>${state.badges.has(b.id)?'Earned · ':''}${b.description}</small></div><span class="badge-state">${state.badges.has(b.id)?'✓':'Not yet'}</span></div>`).join('');
    $('#feed-badge').textContent=state.completed.size?`✦ ${state.completed.size===4?'Curious Mind earned. You explored every card!':'First Spark earned. You made a start!'}`:'Your first little win is waiting.';
  }
  function renderCard(){
    const card=lessons[state.card],done=state.completed.has(state.card);
    $('#card-subject').textContent=card.subject;$('#card-count').textContent=`${state.card+1} / ${lessons.length}`;
    $('#card-title').textContent=card.title;$('#card-copy').textContent=card.copy;$('#card-prompt').textContent=card.prompt;$('#card-art').textContent=card.art;
    $('#complete-card').textContent=done?'✓ Learned':'Mark as learned';$('#complete-card').disabled=done;
    $('#card-feedback').textContent=done?'You can revisit this idea whenever you like.':'';
    $('#feed-progress').textContent=`${state.completed.size} of ${lessons.length} learned`;
    $('#previous-card').disabled=state.card===0;$('#next-card').disabled=state.card===lessons.length-1;
    $('#learning-card').setAttribute('aria-label',`Learning card ${state.card+1} of ${lessons.length}: ${card.title} Use left and right arrow keys to browse.`);
  }
  function moveCard(delta){const next=Math.max(0,Math.min(lessons.length-1,state.card+delta));if(next!==state.card){state.card=next;renderCard();}}
  $('#previous-card').onclick=()=>moveCard(-1);$('#next-card').onclick=()=>moveCard(1);
  $('#complete-card').onclick=()=>{state.completed.add(state.card);award('first');if(state.completed.size===lessons.length)award('cards');renderCard();renderBadges();renderDashboard();};
  $('#learning-card').onkeydown=e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();moveCard(e.key==='ArrowLeft'?-1:1);}};
  let pointerStart=null;
  $('#learning-card').addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;pointerStart={x:e.clientX,y:e.clientY,id:e.pointerId};});
  $('#learning-card').addEventListener('pointerup',e=>{if(!pointerStart||pointerStart.id!==e.pointerId)return;const dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;pointerStart=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4)moveCard(dx<0?1:-1);});
  $('#learning-card').addEventListener('pointercancel',()=>pointerStart=null);
  function blocks(count,tone,removed=0){return `<div class="block-group">${Array.from({length:count},(_,i)=>`<span class="math-block ${tone} ${i>=count-removed?'removed':''}" aria-hidden="true">${i>=count-removed?'×':''}</span>`).join('')}${count===0?'<span class="zero-block">0 blocks</span>':''}</div>`;}
  function buildMath(countActivity=true){
    const a=Number($('#math-a').value),b=Number($('#math-b').value),operation=$('#math-operation').value;
    if($('#math-a').value===''||$('#math-b').value===''||!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>10||b>10){$('#math-error').textContent='Choose whole numbers from 0 to 10, then build the blocks.';return;}
    if(operation==='subtract'&&b>a){$('#math-error').textContent='For this starter activity, take away no more than you have. Make the second number equal to or smaller than the first.';return;}
    $('#math-error').textContent='';const result=operation==='add'?a+b:a-b;
    $('#math-equation').textContent=`${a} ${operation==='add'?'+':'−'} ${b} = ${result}`;
    $('#math-stage').innerHTML=operation==='add'?`<div><strong>${a} purple blocks</strong>${blocks(a,'purple')}</div><span class="math-sign" aria-hidden="true">+</span><div><strong>${b} green blocks</strong>${blocks(b,'green')}</div>`:`<div><strong>${a} blocks to start · ${b} crossed out</strong>${blocks(a,'purple',b)}</div>`;
    $('#math-stage').setAttribute('aria-label',operation==='add'?`${a} purple blocks and ${b} green blocks. ${result} blocks altogether.`:`${a} blocks, with ${b} crossed out. ${result} remain.`);
    $('#math-explanation').textContent=operation==='add'?`Count both groups together. ${a} and ${b} make ${result}.`:`The crossed-out blocks are taken away. Count the remaining blocks: ${result}.`;
    if(countActivity){state.mathBuilds++;renderDashboard();}
  }
  $('#build-math').onclick=()=>buildMath();
  document.querySelectorAll('[data-equation]').forEach(button=>button.onclick=()=>{const [a,operation,b]=button.dataset.equation.split(',');$('#math-a').value=a;$('#math-b').value=b;$('#math-operation').value=operation;buildMath();});
  function renderQuiz(){
    const done=state.finished;$('#quiz-question-area').hidden=done;$('#quiz-result').hidden=!done;
    $('#quiz-progress').textContent=done?'Quiz complete':`Question ${state.question+1} of ${questions.length}`;
    if(done){const score=state.lastScore;$('#quiz-result-heading').textContent=`You recalled ${score} of ${questions.length}.`;$('#quiz-result-copy').textContent=score===3?'Recall Star earned! You connected the ideas beautifully.':'Every attempt helps you learn. Review the cards, then try again whenever you’re ready.';return;}
    const q=questions[state.question],answer=state.answers[state.question];$('#quiz-question').textContent=q.question;
    $('#quiz-options').innerHTML=q.options.map((option,index)=>`<button class="quiz-option ${answer!==undefined?(index===q.answer?'correct':index===answer?'incorrect':''):''}" data-answer="${index}" ${answer!==undefined?'disabled':''}><span>${String.fromCharCode(65+index)}</span>${option}${answer!==undefined&&index===q.answer?' ✓':''}</button>`).join('');
    $('#quiz-feedback').textContent=answer===undefined?'':`${answer===q.answer?'You remembered it.':'A useful idea to revisit.'} ${q.explanation}`;
    $('#quiz-next').hidden=answer===undefined;$('#quiz-next').textContent=state.question===questions.length-1?'See my results':'Next question';
    document.querySelectorAll('[data-answer]').forEach(button=>button.onclick=()=>{if(state.answers[state.question]!==undefined)return;state.answers[state.question]=Number(button.dataset.answer);renderQuiz();$('#quiz-next').focus();});
  }
  $('#quiz-next').onclick=()=>{if(state.answers[state.question]===undefined)return;if(state.question<questions.length-1){state.question++;renderQuiz();$('#quiz-options button').focus();}else{state.finished=true;state.attempts++;state.lastScore=state.answers.reduce((score,answer,i)=>score+Number(answer===questions[i].answer),0);if(state.lastScore===3)award('recall');renderQuiz();renderBadges();renderDashboard();$('#quiz-retry').focus();}};
  $('#quiz-retry').onclick=()=>{state.question=0;state.answers=[];state.finished=false;renderQuiz();$('#quiz-options button').focus();};
  const samples=[{id:'a',name:'Sample learner A',cards:3,score:2,badges:1,pauses:1,math:4,attempts:1},{id:'b',name:'Sample learner B',cards:1,score:1,badges:1,pauses:2,math:2,attempts:1},{id:'c',name:'Sample learner C',cards:4,score:3,badges:3,pauses:0,math:5,attempts:2}];
  function learners(){return [{id:'you',name:'Your demo session',cards:state.completed.size,score:state.lastScore,badges:state.badges.size,pauses:state.pauses,math:state.mathBuilds,attempts:state.attempts},...samples];}
  function needsCheckIn(learner){return learner.score!==null&&learner.score<2;}
  function renderDashboard(){
    document.dispatchEvent(new CustomEvent('spark:progress',{detail:{cards:state.completed.size,badges:state.badges.size}}));
    const all=learners(),search=$('#learner-search').value.trim().toLowerCase(),filter=$('#learner-filter').value;
    const visible=all.filter(l=>l.name.toLowerCase().includes(search)&&(filter==='all'||(filter==='support'?needsCheckIn(l):!needsCheckIn(l)&&(l.cards>0||l.score!==null))));
    const attempts=all.filter(l=>l.score!==null),avg=attempts.length?Math.round(attempts.reduce((s,l)=>s+l.score,0)/(attempts.length*3)*100):null;
    $('#dashboard-metrics').innerHTML=`<div><span>Learners in demo</span><strong>${all.length}</strong></div><div><span>Cards learned</span><strong>${all.reduce((s,l)=>s+l.cards,0)} <small>/ 16</small></strong></div><div><span>Average latest quiz</span><strong>${avg===null?'—':avg+'%'}</strong></div><div><span>Needs a check-in</span><strong>${all.filter(needsCheckIn).length}</strong></div>`;
    $('#learner-rows').innerHTML=visible.map(l=>`<tr><th scope="row">${l.name}${l.id==='you'?'<small>Live session</small>':'<small>Fictional example</small>'}</th><td>${l.cards} / 4</td><td>${l.score===null?'Not attempted':l.score+' / 3'}</td><td><span class="learner-status ${needsCheckIn(l)?'check-in':''}">${needsCheckIn(l)?'Needs a check-in':l.cards===0&&l.score===null?'Not started':'Making progress'}</span></td><td><button class="outline-button" data-learner="${l.id}" aria-label="View ${l.name}">View</button></td></tr>`).join('');
    $('#dashboard-empty').hidden=visible.length>0;
    document.querySelectorAll('[data-learner]').forEach(button=>button.onclick=()=>{selectedLearner=button.dataset.learner;renderDetail();});renderDetail();
  }
  function renderDetail(){const l=learners().find(l=>l.id===selectedLearner);$('#learner-detail').innerHTML=`<h4>${l.name}</h4><p>${l.id==='you'?'Updates as you use the learning lab.':'Fictional data for demonstrating the educator view.'}</p><dl><div><dt>Badges earned</dt><dd>${l.badges} / 3</dd></div><div><dt>Completed quizzes</dt><dd>${l.attempts}</dd></div><div><dt>Math explorations</dt><dd>${l.math}</dd></div><div><dt>Quiet pauses</dt><dd>${l.pauses}</dd></div></dl><p class="session-note">${needsCheckIn(l)?'Suggested next step: revisit the cards together and offer another unhurried attempt.':'Suggested next step: invite the learner to share one idea they discovered.'}</p>`;}
  $('#learner-search').oninput=renderDashboard;$('#learner-filter').onchange=renderDashboard;
  $('#reset-session').onclick=()=>{state=freshState();selectedLearner='you';$('#learner-search').value='';$('#learner-filter').value='all';$('#math-a').value=3;$('#math-b').value=2;$('#math-operation').value='add';buildMath(false);renderCard();renderQuiz();renderBadges();renderDashboard();$('#session-status').textContent='Your demo progress has been reset. Sample learners are unchanged.';};
  let calmTrigger=null;
  document.querySelectorAll('[data-calm]').forEach(button=>button.onclick=()=>{
    if($('#calm-dialog').open)return;calmTrigger=button;state.pauses++;
    const motionButton=$('#scene-motion');if(motionButton?.getAttribute('aria-pressed')==='true')motionButton.click();
    document.body.classList.add('calm-open');$('#calm-dialog').showModal();renderDashboard();
  });
  $('#calm-dialog').addEventListener('close',()=>{document.body.classList.remove('calm-open');calmTrigger?.focus();});
  document.addEventListener('spark:session',event=>{
    const id=event.detail.role==='educator'?'educator':'feed';
    showPanel(id);
    document.querySelector('#playground').scrollIntoView({behavior:motion.checked?'instant':'smooth',block:'start'});
    document.querySelector(`[data-panel="${id}"]`).focus({preventScroll:true});
  });
  renderCard();renderQuiz();renderBadges();buildMath(false);renderDashboard();
})();
