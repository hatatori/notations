
function render(){
app.innerHTML = app.innerHTML
    .replace(/^# .+/gm,e=>h1(e))
    .replace(/^## .+/gm,e=>h2(e))
    .replace(/^### .+/gm,e=>h3(e))
    .replace(/@.+?@/gm,e=>mark(e))
    .replace(/\{\{/gm,"<pre class='my-3'>").replace(/\}\}/gm,"</pre>")
    .replace(/\._(?!_).+?_\./gm,e=>underline(e))
    .replace(/\.\*(?!\*).+?\*\./gm,e=>bold(e))
    .replace(/\.~(?!~).+?~\./gm,e=>tach(e))
    .replace(/\.__.+?__\./gm,e=>italic(e))
    .replace(/\(\(.+\)\)/g,e=>quotes(e))
}render()
    

function h1(str){
    str = str.split("# ")[1]
    return `<div class="font-bold text-4xl m-b-2 my-3 border-solid border-b border-y-2 py-3 w-full">${str}</div>`
}
    
function h2(str){
    str = str.split("## ")[1]
    return `<div class="font-bold text-3xl m-b-2 my-3 border-solid border-b border-y-2 py-3 w-full">${str}</div>`
}

function h3(str){
    str = str.split("### ")[1]
    return `<div class="font-bold text-2xl m-b-2 my-3 border-solid border-b border-y-2 py-3 w-full">${str}</div>`
}

function quotes(str){
    // str = ">>alguma coisa<<"
    // return str.replace(/>>/g,"<span class='consolas'>").replace(/<</g,"</span>")
    return str.replace(/\(\(/g,"<span class='consolas'>").replace(/\)\)/g,"</span>")
}

function mark(str){
    return str.replace(/@(.+?)@/g,e=>"<div class='mark'>"+e.slice(1,-1)+"</div>")
}

function underline(str){
    return str.replaceAll(/\._(?!_).+?_\./gm, e=>"<u>"+e.slice(2,-2)+"</u>")
}

function bold(str){
    return str.replaceAll(/\.\*(?!\*).+?\*\./gm, e=>"<b>"+e.slice(2,-2)+"</b>")
}

function tach(str){
    return str.replaceAll(/\.~(?!~).+?~\./gm, e=>"<s>"+e.slice(2,-2)+"</s>")
}

function italic(str){
    return str.replaceAll(/\.__.+?__\./gm, e=>"<i>"+e.slice(3,-3)+"</i>")
}