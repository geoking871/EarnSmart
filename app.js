const resources = [
  {id:"writer",name:"Writing workspace",category:"Writing",icon:"✎",desc:"Plan, draft and refine clear writing for school, projects and everyday ideas.",url:"https://www.notion.so/",featured:true,keywords:"notes documents writing planning"},
  {id:"design",name:"Visual design studio",category:"Design",icon:"◈",desc:"Create presentations, posters and visual content with accessible design tools.",url:"https://www.canva.com/",featured:true,keywords:"graphics templates presentations"},
  {id:"learn",name:"Learning library",category:"Learning",icon:"⌘",desc:"Explore structured lessons and build new skills at your own pace.",url:"https://www.khanacademy.org/",featured:true,keywords:"courses education study"},
  {id:"focus",name:"Focus planner",category:"Productivity",icon:"✦",desc:"Organise tasks, break projects into steps and keep track of priorities.",url:"https://todoist.com/",featured:true,keywords:"tasks checklist organisation"},
  {id:"research",name:"Research assistant",category:"Research",icon:"⌕",desc:"Discover sources and organise information for thoughtful research.",url:"https://scholar.google.com/",featured:false,keywords:"sources academic papers"},
  {id:"code",name:"Code learning",category:"Learning",icon:"{ }",desc:"Practise programming concepts and explore beginner-friendly coding lessons.",url:"https://developer.mozilla.org/",featured:false,keywords:"programming web development"},
  {id:"ideas",name:"Idea organiser",category:"Productivity",icon:"✧",desc:"Collect ideas, connect notes and shape early-stage projects.",url:"https://obsidian.md/",featured:false,keywords:"knowledge notes thinking"},
  {id:"language",name:"Language practice",category:"Learning",icon:"文",desc:"Build language skills through regular practice and useful learning resources.",url:"https://www.duolingo.com/",featured:false,keywords:"languages vocabulary practice"}
];
const grid=document.querySelector("#tool-grid"), search=document.querySelector("#search"), sort=document.querySelector("#sort");
let category="All", query="", saved=new Set(JSON.parse(localStorage.getItem("earnsmart-saved")||"[]"));
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function render(){
  let list=resources.filter(r=>(category==="All"||r.category===category)&&(`${r.name} ${r.category} ${r.desc} ${r.keywords}`).toLowerCase().includes(query.toLowerCase()));
  if(sort.value==="az") list.sort((a,b)=>a.name.localeCompare(b.name)); else list.sort((a,b)=>Number(b.featured)-Number(a.featured));
  grid.innerHTML=list.map(r=>`<article class="tool-card"><div class="card-top"><div class="tool-icon">${r.icon}</div><button class="save-button ${saved.has(r.id)?"saved":""}" data-save="${r.id}" aria-label="${saved.has(r.id)?"Remove":"Save"} ${escapeHTML(r.name)}" aria-pressed="${saved.has(r.id)}">${saved.has(r.id)?"♥":"♡"}</button></div><h3>${escapeHTML(r.name)}</h3><p>${escapeHTML(r.desc)}</p><div class="card-bottom"><span class="tag">${escapeHTML(r.category)}</span><a class="visit-link" href="${r.url}" target="_blank" rel="noopener noreferrer">Explore ↗</a></div></article>`).join("");
  document.querySelector("#empty-state").hidden=list.length!==0;
  document.querySelector("#result-count").textContent=`${list.length} resource${list.length===1?"":"s"}`;
  document.querySelector("#tool-total").textContent=resources.length;
  document.querySelector("#saved-count").textContent=saved.size;
}
search.addEventListener("input",e=>{query=e.target.value;render()});
sort.addEventListener("change",render);
document.querySelectorAll(".chip").forEach(btn=>btn.addEventListener("click",()=>{category=btn.dataset.category;document.querySelectorAll(".chip").forEach(b=>b.classList.toggle("selected",b===btn));render()}));
grid.addEventListener("click",e=>{const btn=e.target.closest("[data-save]");if(!btn)return;const id=btn.dataset.save;saved.has(id)?saved.delete(id):saved.add(id);localStorage.setItem("earnsmart-saved",JSON.stringify([...saved]));render()});
document.querySelector("#clear-filters").addEventListener("click",()=>{category="All";query="";search.value="";document.querySelectorAll(".chip").forEach(b=>b.classList.toggle("selected",b.dataset.category==="All"));render()});
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();search.focus()}});
document.querySelector("#year").textContent=new Date().getFullYear();
render();