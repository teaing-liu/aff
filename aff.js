export default {
  async fetch() {
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=300"
      }
    });
  }
};

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>VPS 推广链接生成器</title>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  background:#0f172a;
  color:#fff;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto;
  padding:20px;
}

.container{
  max-width:1100px;
  margin:auto;
}

.card{
  background:#111827;
  border:1px solid #1f2937;
  border-radius:16px;
  padding:22px;
  margin-bottom:18px;
}

h1{
  font-size:30px;
  margin-bottom:12px;
}

.desc{
  color:#9ca3af;
  line-height:1.8;
}

label{
  display:block;
  margin-bottom:10px;
  font-size:14px;
  font-weight:700;
  color:#d1d5db;
}

input,textarea{
  width:100%;
  background:#0b1220;
  border:1px solid #374151;
  color:#fff;
  padding:14px;
  border-radius:12px;
  font-size:14px;
}

textarea{
  min-height:240px;
  resize:vertical;
  line-height:1.7;
}

input:focus,
textarea:focus{
  outline:none;
  border-color:#2563eb;
}

button{
  border:none;
  cursor:pointer;
  border-radius:10px;
  transition:.2s;
}

.main-btn{
  width:100%;
  background:#2563eb;
  color:#fff;
  padding:16px;
  font-size:18px;
  font-weight:700;
}

.main-btn:hover{
  background:#1d4ed8;
}

.row{
  display:flex;
  gap:10px;
  margin-top:12px;
}

.row button{
  flex:1;
  padding:12px;
  font-weight:700;
  color:#fff;
}

.copy{
  background:#374151;
}

.copy:hover{
  background:#4b5563;
}

.open{
  background:#16a34a;
}

.open:hover{
  background:#15803d;
}

.result{
  background:#0b1220;
  border:1px solid #1e293b;
  border-radius:14px;
  padding:18px;
  margin-top:18px;
}

.result-title{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:8px;
  font-size:16px;
  font-weight:700;
  margin-bottom:12px;
}

.url{
  background:#020617;
  border:1px solid #1e293b;
  border-radius:10px;
  padding:14px;
  word-break:break-all;
  font-size:13px;
  line-height:1.8;
}

.small{
  font-size:12px;
  color:#9ca3af;
  line-height:1.8;
}

.tag{
  display:inline-block;
  padding:4px 10px;
  border-radius:999px;
  background:#1d4ed8;
  font-size:12px;
}

.score{
  background:#15803d;
}

.notice{
  color:#fbbf24;
  margin-top:12px;
  font-size:12px;
  line-height:1.8;
}

.toast{
  position:fixed;
  bottom:20px;
  left:50%;
  transform:translateX(-50%) translateY(10px);
  background:#1f2937;
  border:1px solid #374151;
  color:#fff;
  padding:12px 18px;
  border-radius:10px;
  z-index:9999;
  opacity:0;
  transition:all .25s ease;
  pointer-events:none;
  white-space:nowrap;
}

.toast.show{
  opacity:1;
  transform:translateX(-50%) translateY(0);
}

.footer{
  margin-top:30px;
  text-align:center;
  color:#6b7280;
  font-size:13px;
}

@media(max-width:768px){

  .row{
    flex-direction:column;
  }

  h1{
    font-size:24px;
  }

}
</style>
</head>

<body>

<div class="container">

<div class="card">

<h1>🏷️ VPS 推广链接生成器</h1>

<div class="desc">
自动识别 WHMCS / SaaS / Referral / aff_code / ref / 邀请码联盟系统<br>
自动优化 VPS 推广结构，优先生成佣金统计更稳定的链接格式。
</div>

</div>

<div class="card">

<label>推广链接 / 联盟链接</label>

<input
id="aff"
placeholder="例如：https://domain.com/aff.php?aff=123"
/>

<div class="small" style="margin-top:10px">
支持：
<br>
aff=
<br>
affid=
<br>
affiliate=
<br>
aff_code=
<br>
ref=
<br>
refid=
<br>
partner=
<br>
tracking=
<br>
邀请码 / register / r/ 路径模式
</div>

</div>

<div class="card">

<label>购买链接（支持多个）</label>

<textarea
id="urls"
placeholder="套餐A|https://domain.com/cart.php?pid=1

套餐B|https://domain.com/store/japan-vps

https://domain.com/cart.php?gid=5"
></textarea>

<div class="row">

<button
type="button"
onclick="pasteClipboard()"
class="copy"
>
📋 一键导入
</button>

<button
type="button"
onclick="clearUrls()"
class="open"
>
🗑 清空
</button>

</div>

</div>

<div class="card">

<button class="main-btn" onclick="gen()">
⚙️ 生成推广链接
</button>

</div>

<div id="out"></div>

<div class="footer">
感谢<a href="https://www.1373737.xyz/" style="color:#ff8c00;font-weight:bold;">37VPS主机评测</a>对本项目的支持
</div>

</div>

<div class="toast" id="toast"></div>

<script>

/* ============ ERROR CATCH ============ */
window.onerror = function(msg){
  toast("JS错误: " + msg);
  return false;
};

/* ============ TOAST ============ */
function toast(msg){
  const el = document.getElementById("toast");
  el.innerText = msg;
  el.classList.add("show");
  setTimeout(()=>{
    el.classList.remove("show");
  },2000);
}

/* ============ COPY FALLBACK ============ */
function copyText(text){
  if(navigator.clipboard && window.isSecureContext){
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject)=>{
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try{
      document.execCommand("copy");
      resolve();
    }catch(e){
      reject(e);
    }finally{
      ta.remove();
    }
  });
}

/* ============ CLIPBOARD ============ */
async function pasteClipboard(){
  try{
    const text = await navigator.clipboard.readText();
    if(!text){
      toast("剪贴板为空");
      return;
    }
    const textarea = document.getElementById("urls");
    if(textarea.value.trim()){
      textarea.value += "\\n" + text;
    }else{
      textarea.value = text;
    }
    toast("已导入剪贴板");
  }catch(e){
    toast("浏览器禁止读取剪贴板，请手动粘贴");
  }
}

function clearUrls(){
  document.getElementById("urls").value = "";
  toast("已清空");
}

/* ============ AFF DETECT ============ */
function detectAff(input){
  input = input.trim();

  if(/^\\d+$/.test(input)){
    return { key:"aff", value:input, system:"WHMCS" };
  }

  try{
    const u = new URL(input);
    const p = u.searchParams;

    const keys = [
      "aff","affid","affiliate","ref","refid",
      "ref_code","aff_code","partner","tracking",
      "sid","promo","code","via","invite"
    ];

    for(const key of keys){
      if(p.get(key)){
        let system = "Referral";
        if(key==="aff" || key==="affiliate" || key==="affid"){
          system = "WHMCS";
        }
        if(key==="aff_code"){
          system = "Modern SaaS";
        }
        return { key, value:p.get(key), system, original:u };
      }
    }

    const match =
      u.pathname.match(/\\/r\\/([^/]+)/i) ||
      u.pathname.match(/\\/ref\\/([^/]+)/i);

    if(match){
      return { key:"ref", value:match[1], system:"Path Referral" };
    }

  }catch(e){}

  return null;
}

/* ============ PARSE ============ */
function parse(text){
  const lines = text.split("\\n").map(v=>v.trim()).filter(Boolean);
  const result = [];
  const seen = new Set();
  let index = 1;

  for(const line of lines){
    let name = "VPS " + index;
    let url = line;

    if(line.includes("|")){
      const arr = line.split("|");
      name = arr[0].trim() || name;
      url = arr.slice(1).join("|").trim();
    }

    try{
      const normalized = new URL(url).toString();
      if(seen.has(normalized)) continue;
      seen.add(normalized);
      result.push({ name, url:normalized });
      index++;
    }catch(e){}
  }

  return result;
}

/* ============ CLEAN ============ */
function cleanAffiliateParams(params){
  const dropKeys = [
    "aff","affid","affiliate","ref","refid",
    "ref_code","aff_code","partner","tracking",
    "sid","promo","code","via","invite"
  ];
  dropKeys.forEach(k=>params.delete(k));
}

/* ============ BUILD LINK (FIXED) ============ */
function build(url, aff){
  try{
    const u = new URL(url);
    const p = u.searchParams;
    
    cleanAffiliateParams(p);
    p.set(aff.key, aff.value);

    const path = u.pathname.toLowerCase();
    let type = "Standard";
    
    if(path.includes("/store/")){
      type = "WHMCS Store";
    }
    else if(path.includes("cart.php")){
      if(!p.get("a")) p.set("a","add");
      type = "WHMCS Cart";
    }
    else if(p.has("pid")){
      if(!p.get("a")) p.set("a","add");
      type = "WHMCS PID";
    }
    else if(p.has("gid")){
      if(!p.get("a")) p.set("a","add");
      type = "WHMCS GID";
    }
    else{
      type = aff.system || "Generic";
    }

    return { url:u.toString(), type, score:95 };
  }catch(e){
    return { url:String(url||""), type:"Error", score:0 };
  }
}

/* ============ RENDER ============ */
function createResult(item, data){
  const div = document.createElement("div");
  div.className = "result";

  div.innerHTML =
  '<div class="result-title">' +
    '<span>' + escapeHtml(item.name) + '</span>' +
    '<span class="tag">' + escapeHtml(data.type) + '</span>' +
    '<span class="tag score">佣金稳定度 ' + data.score + '%</span>' +
  '</div>' +
  '<div class="url">' + escapeHtml(data.url) + '</div>' +
  '<div class="row">' +
    '<button class="copy">📋 复制链接</button>' +
    '<button class="open">🚀 打开链接</button>' +
  '</div>' +
  '<div class="notice">✓ 已自动优化联盟结构并尽可能提高 VPS 推广佣金统计成功率</div>';

  const copyBtn = div.querySelector(".copy");
  const openBtn = div.querySelector(".open");

  copyBtn.onclick = ()=>{
    copyText(data.url).then(()=>{
      copyBtn.innerText = "✅ 已复制";
      setTimeout(()=>{ copyBtn.innerText = "📋 复制链接"; },1500);
    }).catch(()=>{
      toast("复制失败，请手动选择复制");
    });
  };

  openBtn.onclick = ()=>{
    window.open(data.url, "_blank");
  };

  return div;
}

function escapeHtml(str){
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

/* ============ GEN ============ */
function gen(){
  const affInput = document.getElementById("aff").value.trim();
  const urlInput = document.getElementById("urls").value.trim();
  const out = document.getElementById("out");

  out.innerHTML = "";

  if(!affInput){
    toast("请输入推广链接");
    return;
  }

  if(!urlInput){
    toast("请输入购买链接");
    return;
  }

  const aff = detectAff(affInput);
  if(!aff){
    toast("无法识别联盟参数");
    return;
  }

  const items = parse(urlInput);
  if(items.length === 0){
    toast("没有检测到有效购买链接");
    return;
  }

  items.forEach(item=>{
    const resultData = build(item.url, aff);
    out.appendChild(createResult(item, resultData));
  });

  toast("生成完成");
}

</script>

</body>
</html>`;
