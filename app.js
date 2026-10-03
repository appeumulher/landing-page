const demoPaths={
  "termino": {
    "name": "Depois do término",
    "questions": [
      {
        "title": "O que aconteceu recentemente que fez você pensar nessa relação ou sentir vontade de entrar em contato?",
        "options": [
          "A saudade apareceu, sem um acontecimento específico.",
          "Ele reapareceu ou enviou uma mensagem.",
          "Soube ou imaginei que ele está com outra pessoa.",
          "Entrei em contato e fiquei em dúvida depois."
        ]
      },
      {
        "title": "Do que, especificamente, você sente falta quando pensa nessa relação?",
        "options": [
          "Da pessoa e da conexão que tínhamos.",
          "Da companhia e de ter alguém na rotina.",
          "Da intimidade ou do contato físico.",
          "Dos planos, do pertencimento ou de me sentir escolhida."
        ]
      },
      {
        "title": "Quais necessidades e limites seus precisam ser respeitados em qualquer relacionamento?",
        "options": [
          "Respeito, honestidade e acordos claros.",
          "Reciprocidade, presença e acolhimento.",
          "Meu espaço, meu tempo e meus projetos.",
          "Ainda tenho dificuldade de identificar ou expressar meus limites."
        ]
      }
    ]
  },
  "solidao": {
    "name": "Minha vida além de uma relação",
    "questions": [
      {
        "title": "O que você imagina que mudaria na sua vida se começasse um relacionamento agora?",
        "options": [
          "Teria companhia, carinho e alguém com quem compartilhar.",
          "Me sentiria mais valorizada ou escolhida.",
          "Minha vida pareceria mais completa ou no caminho certo.",
          "Teria uma parceria, mantendo outras partes importantes da vida."
        ]
      },
      {
        "title": "O que você faz por prazer, sem precisar produzir, agradar ou provar algo a alguém?",
        "options": [
          "Tenho atividades que faço por prazer com frequência.",
          "Tenho algumas, mas quase não reservo tempo para elas.",
          "Acabo escolhendo mais pelo que os outros esperam.",
          "Ainda não sei o que gosto de fazer por mim."
        ]
      },
      {
        "title": "Qual pequeno passo possível você gostaria de dar agora para tornar sua vida mais próxima do que deseja?",
        "options": [
          "Reservar um momento para lazer ou experimentar uma atividade.",
          "Procurar alguém com quem gostaria de fortalecer um vínculo.",
          "Escolher um cuidado ou aprendizado possível na minha rotina.",
          "Primeiro reconhecer minhas necessidades e os recursos disponíveis."
        ]
      }
    ]
  }
};
const modal=document.querySelector('#demo');const content=document.querySelector('#demo-content');let path=null;let step=-1;let answers=Array(3).fill(null);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const prompts={termino:['O que era bom nessa conexão, e o que precisa ser considerado além da saudade?','Que outras formas de companhia estão disponíveis para mim neste momento?','Como posso reconhecer esse desejo sem assumir que ele determina uma volta?','O que esses planos ou a sensação de ser escolhida significam para mim hoje?'],solidao:['Que atividade prazerosa eu gostaria de manter na minha rotina?','Qual pequeno espaço de tempo poderia reservar para algo de que gosto?','O que eu escolheria fazer se não precisasse corresponder ao olhar de alguém?','Que experiência simples eu poderia testar para descobrir do que gosto?']};
function reset(){path=null;step=-1;answers=Array(3).fill(null);}
function focusTitle(){const title=content.querySelector('#demo-title');title?.setAttribute('tabindex','-1');title?.focus();modal.scrollTop=0;}
function openDemo(){reset();render();modal.showModal();}
function render(){if(step===-1){renderMoment();return;}if(step===3){renderResult();return;}const q=demoPaths[path].questions[step];content.innerHTML=`<p class="eyebrow">${esc(demoPaths[path].name.toUpperCase())} · DEGUSTAÇÃO</p><div class="progress-track" aria-hidden="true"><span style="width:${(step+1)/3*100}%"></span></div><h2 id="demo-title">Um momento para você.</h2><p class="dialog-note">Pergunta ${step+1} de 3</p><form id="question-form"><fieldset><legend>${esc(q.title)}</legend>${q.options.map((o,i)=>`<label class="choice"><input type="radio" name="answer" value="${i}" ${answers[step]===i?'checked':''} required><span>${esc(o)}</span></label>`).join('')}</fieldset><div class="dialog-actions"><button type="button" class="button secondary" id="previous">${step===0?'Meu momento':'Voltar'}</button><button class="button primary" type="submit">${step===2?'Ver meu panorama de exemplo':'Continuar'}</button></div><button type="button" class="skip-demo" id="skip-demo">Pular — não sei ou prefiro não responder</button></form><p class="dialog-note">São três perguntas de um percurso de 15. Suas escolhas não são enviadas ou salvas.</p>`;content.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const selected=content.querySelector('input:checked');if(!selected)return;const value=Number(selected.value);if(!Number.isInteger(value)||value<0||value>3)return;answers[step]=value;step++;render();focusTitle();});content.querySelector('#previous').addEventListener('click',()=>{step--;render();focusTitle();});content.querySelector('#skip-demo').addEventListener('click',()=>{answers[step]=null;step++;render();focusTitle();});}
function renderMoment(){content.innerHTML=`<p class="eyebrow">DEGUSTAÇÃO · SEU MOMENTO</p><h2 id="demo-title">Como você está<br><em>neste momento?</em></h2><form id="moment-form"><fieldset><legend>Qual destas situações se aproxima mais do seu momento atual?</legend><label class="choice"><input type="radio" name="moment" value="termino" ${path==='termino'?'checked':''} required><span>Estou saindo de um relacionamento e tenho dúvidas entre tentar voltar ou seguir em frente.</span></label><label class="choice"><input type="radio" name="moment" value="solidao" ${path==='solidao'?'checked':''} required><span>Me sinto só e percebo que estou colocando em um relacionamento a expectativa de me sentir completa.</span></label></fieldset><div class="dialog-actions"><button type="submit" class="button primary">Experimentar meu percurso</button></div></form><p class="dialog-note">Escolha seu momento e experimente três perguntas do caminho correspondente. Sem cadastro ou cobrança.</p>`;content.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const selected=content.querySelector('input:checked');if(!selected||!Object.hasOwn(demoPaths,selected.value))return;if(path!==selected.value)answers=Array(3).fill(null);path=selected.value;step=0;render();focusTitle();});}
function renderResult(){const data=demoPaths[path];const count=answers.filter(a=>a!==null).length;content.innerHTML=`<div class="demo-result"><p class="eyebrow">${esc(data.name.toUpperCase())} · DEGUSTAÇÃO</p><h2 id="demo-title">Um primeiro olhar<br>para o seu momento.</h2><p>${count?'Esta amostra organiza suas escolhas. É uma reflexão breve sobre três perguntas, não o panorama do percurso completo.':'Você deixou as três perguntas em aberto. Ainda não há respostas para construir esta amostra individual.'}</p>${data.questions.map((q,i)=>`<section><h3>${esc(q.title)}</h3><p>${answers[i]===null?'Você deixou esta pergunta em aberto.':esc(q.options[answers[i]])}</p></section>`).join('')}${answers[1]!==null?`<div class="report-note"><span>UMA PERGUNTA PARA LEVAR</span><p>${esc(prompts[path][answers[1]])}</p></div>`:''}<p class="dialog-note">O produto completo aprofunda este caminho em 15 perguntas. A degustação termina aqui. Ela não é uma avaliação psicológica e não decide por você.</p><div class="dialog-actions"><a class="button primary" href="https://pay.kiwify.com.br/FT14oCn">Fazer percurso completo</a></div></div>`;}
document.querySelector('#open-demo').addEventListener('click',openDemo);document.querySelector('#close-demo').onclick=()=>modal.close();modal.addEventListener('close',()=>{reset();content.innerHTML='';});modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
if(document.modelContext?.registerTool){const lifecycle=new AbortController();try{Promise.resolve(document.modelContext.registerTool({name:'start_reflection_demo',title:'Abrir degustação de reflexão',description:'Abre a escolha do momento e três perguntas correspondentes. Não libera o questionário completo.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length)throw new Error('Esta ação não aceita parâmetros.');if(modal.open)modal.close();openDemo();return {opened:true,stage:'moment_selection',questionsPerPath:3};}},{signal:lifecycle.signal})).catch(()=>{});}catch{}window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});}
