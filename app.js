const $=s=>document.querySelector(s),KEY="provao_v1";
let st={a:{},m:{},done:{},start:"",exam:"2026-11-09"},view="hoje",sel="mat",prac=false;
try{Object.assign(st,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const iso=(d=new Date())=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
const today=()=>iso(),fmt=d=>d.split("-").reverse().slice(0,2).join("/");
if(!st.start){st.start=today();save()}

/* ---------- aleatório com semente (muda todo dia) ---------- */
function rng(s){let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=h<<13|h>>>19}let a=h>>>0;return()=>{a=a+1831565813|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const ri=(r,a,b)=>a+Math.floor(r()*(b-a+1));
const sh=(r,x)=>{x=[...x];for(let i=x.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};
function mk(r,t,c,cm,f=x=>x,u=""){const p=Math.max(1,Math.round(Math.abs(c)/8)),w=[];for(const m of sh(r,[-4,-3,-2,-1,1,2,3,4,5])){const v=c+m*p;if(w.length<4&&!w.includes(v))w.push(v)}const o=sh(r,[c,...w]);return[t,o.map(v=>f(v)+u),o.indexOf(c),cm]}
const brl=x=>"R$ "+x.toLocaleString("pt-BR");

/* ---------- geradores: questões novas a cada dia ---------- */
const G=[
["mat",r=>{const B=ri(r,8,16),b=ri(r,2,B-3),h=2*ri(r,1,5),v=(B+b)*h/2;return mk(r,`Um terreno tem formato de trapézio com bases de ${B} m e ${b} m e altura de ${h} m. Qual é a sua área?`,v,`Área = (B + b)·h/2 = (${B}+${b})·${h}/2 = ${v} m².`,undefined," m²")}],
["mat",r=>{const a=ri(r,5,15),d=ri(r,2,5),n=2*ri(r,2,4),s=n*(2*a+(n-1)*d)/2;return mk(r,`Ana guardou R$ ${a},00 na 1ª semana e, a cada semana, R$ ${d},00 a mais que na anterior. Quanto guardou em ${n} semanas?`,s,`PA com a₁ = ${a} e razão ${d}. Soma = n(2a₁+(n−1)r)/2 = ${s}.`,x=>brl(x)+",00")}],
["mat",r=>{const p=[10,20][ri(r,0,1)],P=100*ri(r,1,5),v=Math.round(P*(1+p/100)**2);return mk(r,`Uma população de ${P} bactérias cresce ${p}% por hora. Quantas há após 2 horas?`,v,`P = ${P}·(1+${p/100})² = ${v}.`)}],
["mat",r=>{const x=ri(r,8,25),v1=ri(r,3,5),v2=ri(r,1,2),f1=ri(r,10,30),f2=f1+(v1-v2)*x;return mk(r,`O plano A cobra R$ ${f1} fixos mais R$ ${v1} por GB. O plano B cobra R$ ${f2} fixos mais R$ ${v2} por GB. Para quantos GB os custos são iguais?`,x,`${f1} + ${v1}x = ${f2} + ${v2}x → ${v1-v2}x = ${f2-f1} → x = ${x}.`,undefined," GB")}],
["mat",r=>{const P=[80,120,160,200][ri(r,0,3)],d=[10,20,25][ri(r,0,2)],v=P*(100-d)/100;return mk(r,`Um produto de R$ ${P},00 recebe desconto de ${d}%. Qual é o novo preço?`,v,`${P} × ${(100-d)/100} = ${v}.`,x=>brl(x)+",00")}],
["fis",r=>{const K=ri(r,50,300);return mk(r,`Uma substância tem temperatura crítica de ${K} K. Em graus Celsius, isso corresponde a`,K-273,`°C = K − 273 = ${K} − 273 = ${K-273}.`,undefined," °C")}],
["fis",r=>{const m=[100,200,400][ri(r,0,2)],c=[.5,.9,2][ri(r,0,2)],T=ri(r,5,20),Q=Math.round(m*c*T);return mk(r,`Uma amostra de ${m} g (c = ${c} J/g·°C) sofre aumento de ${T} °C. Que quantidade de calor recebeu?`,Q,`Q = m·c·ΔT = ${m}·${c}·${T} = ${Q} J.`,undefined," J")}],
["fis",r=>{const k=[3,5,6][ri(r,0,2)];return mk(r,`Um laser opera com frequência de ${k}×10¹⁴ Hz (c = 3×10⁸ m/s). Qual é o comprimento de onda, em nm?`,3000/k,`λ = c/f = 3×10⁸ / ${k}×10¹⁴ = ${3000/k} nm.`,undefined," nm")}],
["qui",r=>{const Z=ri(r,86,92),A=ri(r,230,238),al=r()<.5;return mk(r,`Um núcleo com Z = ${Z} e A = ${A} emite uma partícula ${al?"alfa":"beta"}. Qual é o número atômico (Z) do núcleo formado?`,al?Z-2:Z+1,al?"Alfa leva 2 prótons e 4 unidades de massa: Z − 2.":"Beta: um nêutron vira próton, então Z + 1 e A não muda.")}],
["geo",r=>{const P=[200,400,600,800][ri(r,0,3)],n=[10,20,25,40][ri(r,0,3)],v=P*1000/n;return mk(r,`Um estado tem PIB de R$ ${P} bilhões e ${n} milhões de habitantes. Qual é o seu PIB per capita?`,v,`PIB per capita = PIB ÷ população = ${P}×10⁹ ÷ ${n}×10⁶ = ${brl(v)}.`,brl)}],
["bio",r=>{const L="ACGT",d=Array.from({length:6},()=>L[ri(r,0,3)]).join(""),m={A:"U",T:"A",C:"G",G:"C"},c=[...d].map(x=>m[x]).join(""),w=new Set();while(w.size<4){const x=[...c];x[ri(r,0,5)]=L[ri(r,0,3)];const s=x.join("");if(s!==c)w.add(s)}const o=sh(r,[c,...w]);return[`A fita molde de DNA tem a sequência ${d}. A sequência do RNA mensageiro transcrito é`,o,o.indexOf(c),"Na transcrição: A→U, T→A, C→G, G→C."]}]
];
const POOL=Object.keys(Q).flatMap(k=>Q[k].map((q,i)=>({s:k,id:`p${k}${i}`,q})));
function shufQ(r,q){const i=sh(r,[0,1,2,3,4]);return[q[0],i.map(x=>q[1][x]),i.indexOf(q[2]),q[3]]}
function build(date,subj){const r=rng(date+(subj||"mix")),gens=sh(r,G.map((g,i)=>({s:g[0],id:"g"+i,g:g[1]})).filter(g=>!subj||g.s==subj)),pool=sh(r,POOL.filter(p=>!subj||p.s==subj)),gs=gens.slice(0,subj?3:5),ps=pool.slice(0,subj?5:10-gs.length);
return sh(r,[...gs.map(g=>({s:g.s,id:g.id,q:g.g(rng(date+g.id))})),...ps.map(p=>({s:p.s,id:p.id,q:shufQ(rng(date+p.id),p.q)}))])}

/* ---------- sequência, cabeçalho ---------- */
const active=d=>Object.values(st.a).some(x=>x.d==d)||(st.m[d]||0)>=600;
function streak(){let n=0,d=new Date();if(!active(iso(d)))d.setDate(d.getDate()-1);while(active(iso(d))){n++;d.setDate(d.getDate()-1)}return n}
function header(){const n=streak(),d=Math.ceil((new Date(st.exam+"T00:00:00")-new Date(today()+"T00:00:00"))/864e5);$("#st").innerHTML=`<b>🔥 ${n}</b><br><small style="color:#fff">${n==1?"dia":"dias"} seguidos</small>`;$("#sub").textContent=d>0?`Faltam ${d} dias para o Provão`:d==0?"O Provão é hoje!":"Provão concluído"}

/* ---------- questões ---------- */
function quiz(el,items,date){el.innerHTML=items.map((it,i)=>{const k=date+"|"+it.id,a=st.a[k];return`<div class="card q"><small>${S[it.s].n}</small><p>${i+1}. ${it.q[0]}</p>${it.q[1].map((o,j)=>`<div class="op ${a?(j==it.q[2]?"g":a.j==j?"w":""):""}" data-i="${i}" data-j="${j}">(${"ABCDE"[j]}) ${o}</div>`).join("")}<div class="cm">${a?(a.ok?"✅ Correto. ":"❌ Gabarito: "+"ABCDE"[it.q[2]]+". ")+it.q[3]:""}</div></div>`}).join("");
el.onclick=e=>{const o=e.target.closest(".op");if(!o)return;const i=+o.dataset.i,j=+o.dataset.j,it=items[i],k=date+"|"+it.id;if(st.a[k])return;st.a[k]={s:it.s,ok:j==it.q[2],d:date,j};save();quiz(el,items,date);header()}}

/* ---------- timer ---------- */
const dur={f:1500,p:300};let T={m:"f",l:1500,on:false,t:0};
function paintT(){const e=$("#tm"),tx=String(Math.floor(T.l/60)).padStart(2,"0")+":"+String(T.l%60).padStart(2,"0");document.title=T.on?tx+" · Provão":"Rumo ao Provão";if(!e)return;e.textContent=tx;$("#md").textContent=T.m=="f"?"Foco · 25 min":"Pausa · 5 min";$("[data-a=go]").textContent=T.on?"⏸ Pausar":"▶ Iniciar"}
setInterval(()=>{if(!T.on)return;const n=Date.now(),dt=Math.floor((n-T.t)/1000);if(dt<1)return;T.t+=dt*1000;T.l-=dt;if(T.m=="f"){const d=today();st.m[d]=(st.m[d]||0)+dt;save();header();const q=$("#mm");if(q)q.textContent=Math.floor(st.m[d]/60)}if(T.l<=0){T.m=T.m=="f"?"p":"f";T.l=dur[T.m];T.on=false;try{navigator.vibrate&&navigator.vibrate([300,100,300])}catch(e){}}paintT()},500);

/* ---------- telas ---------- */
const lk=(n,t)=>{const e=encodeURIComponent;return`<p>🎥 <a href="https://www.youtube.com/results?search_query=${e(n+" "+t+" aula ensino médio")}" target="_blank" rel="noopener">Videoaulas</a> · 📖 <a href="https://www.google.com/search?q=${e(t+" "+n+" site:brasilescola.uol.com.br OR site:mundoeducacao.uol.com.br OR site:pt.khanacademy.org")}" target="_blank" rel="noopener">Ler mais</a></p>`};
function hoje(){const d=today(),it=build(d,null),n=it.filter(i=>st.a[d+"|"+i.id]).length;
$("#app").innerHTML=`<div class="card"><h3>Hoje</h3><div class="stats"><div><b id="mm">${Math.floor((st.m[d]||0)/60)}</b><small>min de foco</small></div><div><b>${n}/10</b><small>desafio</small></div><div><b>${streak()}</b><small>sequência</small></div></div><p class="note">Para manter a sequência: responda 1 questão ou estude 10 min.</p></div>
<div class="card"><h3>⏱️ Timer de foco</h3><div id="tm" class="big"></div><div id="md" class="mode"></div><div class="row"><button data-a="go"></button><button data-a="rs">Zerar</button><button data-a="sw">Foco/Pausa</button></div></div>
<h2>🎯 Desafio do dia</h2><div id="qz"></div>`;quiz($("#qz"),it,d);paintT()}
function plano(){let h="";D.forEach((x,i)=>{const dt=new Date(st.start+"T12:00:00");dt.setDate(dt.getDate()+i);const ds=iso(dt);h+=`<div class="card ${st.done[i]?"ok":""}"><div class="row sp"><b>${x[0]} · ${fmt(ds)}${ds==today()?" · hoje":""}</b><label><small><input type="checkbox" data-a="done" data-i="${i}" ${st.done[i]?"checked":""}> feito</small></label></div><small>${x[1]}</small><div class="chips">${x[2].length?x[2].map(k=>`<button class="chip" data-a="sub" data-k="${k}">${S[k].n}</button>`).join(""):"<small>Descanse e confira os documentos.</small>"}</div></div>`});
$("#app").innerHTML=h+`<div class="card"><h3>⚙️ Datas</h3><p>Início do plano: <input type="date" id="ds" value="${st.start}"></p><p>Dia da prova: <input type="date" id="de" value="${st.exam}"></p></div>`}
function mat(){const s=S[sel];let h=`<div class="chips">${Object.keys(S).map(k=>`<button class="chip ${k==sel?"on":""}" data-a="sel" data-k="${k}">${S[k].n}</button>`).join("")}</div><h2>${s.n}</h2>`;
if(prac)h+=`<button class="chip" data-a="back">← Voltar à teoria</button><div id="qz" style="margin-top:10px"></div>`;
else h+=s.t.map(q=>`<details><summary>${q[0]}</summary><div>${q[1]}${lk(s.n,q[0])}</div></details>`).join("")+`<button class="wide" data-a="prac">Praticar ${s.n} (questões de hoje)</button><p class="note">Os links abrem buscas no YouTube e no Google. Confira se o professor ou site é confiável.</p>`;
$("#app").innerHTML=h;if(prac)quiz($("#qz"),build(today(),sel),today())}
function evo(){const A=Object.values(st.a),tot=A.length,ok=A.filter(x=>x.ok).length,pc=(a,b)=>b?Math.round(a/b*100):0;
const per=Object.keys(S).map(k=>{const l=A.filter(x=>x.s==k);return{k,n:l.length,p:pc(l.filter(x=>x.ok).length,l.length)}});
const dys=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);const s=iso(d),l=A.filter(x=>x.d==s);return{w:"DSTQQSS"[d.getDay()],n:l.length,ok:l.filter(x=>x.ok).length,m:Math.floor((st.m[s]||0)/60)}}),mx=Math.max(1,...dys.map(x=>x.n));
const fr=per.filter(x=>x.n>=3).sort((a,b)=>a.p-b.p)[0],tm=Object.values(st.m).reduce((a,b)=>a+b,0);
$("#app").innerHTML=`<div class="card"><h3>Visão geral</h3><div class="stats"><div><b>${tot}</b><small>respondidas</small></div><div><b>${pc(ok,tot)}%</b><small>acertos</small></div><div><b>${Math.floor(tm/3600)}h${String(Math.floor(tm%3600/60)).padStart(2,"0")}</b><small>de foco</small></div></div>${fr?`<p class="note">💡 Ponto fraco: <b>${S[fr.k].n}</b> (${fr.p}%). Revise a teoria e pratique mais.</p>`:`<p class="note">Responda pelo menos 3 questões por matéria para ver seu ponto fraco.</p>`}</div>
<div class="card"><h3>Últimos 7 dias</h3><div class="cols">${dys.map(x=>`<div class="col"><div class="stk" style="height:${x.n/mx*100}%"><i style="height:${x.n?x.ok/x.n*100:0}%"></i></div><small>${x.n}</small><small>${x.w}</small><small>${x.m}m</small></div>`).join("")}</div><p class="note">Verde: acertos · Vermelho: erros · m = minutos de foco</p></div>
<div class="card"><h3>Acertos por matéria</h3>${per.map(x=>`<div class="row sp"><span>${S[x.k].n}</span><small>${x.n?x.p+"% · "+x.n+" q.":"sem dados"}</small></div><div class="bar"><i style="width:${x.p}%;background:${x.p>=70?"var(--ok)":x.p>=50?"#ff9f1c":"var(--no)"}"></i></div>`).join("")}</div>
<button class="wide" style="background:var(--no)" data-a="reset">Apagar progresso</button>`}

/* ---------- eventos ---------- */
$("#app").onclick=e=>{const b=e.target.closest("[data-a]");if(!b)return;const a=b.dataset.a;
if(a=="go"){T.on=!T.on;T.t=Date.now();paintT()}
else if(a=="rs"){T.on=false;T.l=dur[T.m];paintT()}
else if(a=="sw"){T.m=T.m=="f"?"p":"f";T.on=false;T.l=dur[T.m];paintT()}
else if(a=="sub"||a=="sel"){sel=b.dataset.k;prac=false;view="mat";render();scrollTo(0,0)}
else if(a=="prac"){prac=true;render()}else if(a=="back"){prac=false;render()}
else if(a=="reset"&&confirm("Apagar todo o seu progresso?")){st.a={};st.m={};st.done={};save();render()}};
$("#app").onchange=e=>{const t=e.target;if(t.dataset.a=="done"){st.done[t.dataset.i]=t.checked;save();render()}else if(t.id=="ds"){st.start=t.value||st.start;save();render()}else if(t.id=="de"){st.exam=t.value||st.exam;save();render()}};
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{view=b.dataset.v;prac=false;render();scrollTo(0,0)});
function render(){header();document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.v==view));({hoje,plano,mat,evo})[view]()}
render();
