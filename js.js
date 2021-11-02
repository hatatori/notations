function render(){
    
    app.innerHTML = app.innerHTML
    .replace(/#1.+/g,e=>`<div class='text-4xl pb-2 my-4 border-b semibold'>${e.slice(3)}</div>`)
    .replace(/#2.+/g,e=>`<div class='text-3xl pb-2 my-4 border-b semibold'>${e.slice(3)}</div>`)
    .replace(/#3.+/g,e=>`<div class='text-2xl pb-2 my-4 border-b semibold'>${e.slice(3)}</div>`)
    .replace(/#4.+/g,e=>`<div class='text-xl  pb-2 my-4 border-b semibold'>${e.slice(3)}</div>`)

    .replace(/\[\*(\w|\W)+?\*\]/gm,e=>bold(e))
    .replace(/\[_(\w|\W)+?_\]/gm,e=>underline(e))
    .replace(/\[-(\w|\W)+?-\]/gm,e=>italic(e))
    .replace(/\[~(\w|\W)+?~\]/gm,e=>tach(e))
    .replace(/\[!(\w|\W)+?!\]/gm,e=>quote(e))
    .replace(/{{{.+?}}}/gms,e=>pre2(e))
    .replace(/{{.+?}}/gms,e=>pre(e))
    .replace(/\[\[.+?\]\]/gms,e=>square(e))
    .replace(/\[down\]/gms,e=>btDown(e))
    
    .replace(/&lt;\[(.+?)\]\[(.+?)\]&gt;/gm,e=>toAlert(e))

    .replace(/#i .+?($|\n)/g,e=>imagem(e))

    .replace(/\[@.+?@\]/gms,e=>opennext(e))

    alertAll()
    hiddenAll()
}
render()

function bold(str){
    str = str.replace(/\[\*/gm,e=>`<b>`).replace(/\*\]/gm,e=>`</b>`)
    return str
}

function underline(str){
    str = str.replace(/\[_/gm,e=>`<u>`).replace(/_\]/gm,e=>`</u>`)
    return str
}

function italic(str){
    str = str.replace(/\[-/gm,e=>`<i>`).replace(/-\]/gm,e=>`</i>`)
    return str
}

function tach(str){
    str = str.replace(/\[~/gm,e=>`<s>`).replace(/~\]/gm,e=>`</s>`)
    return str
}    

function quote(str){
    str = str.replace(/\[!/gm,e=>`<span class='mark'>`).replace(/!\]/gm,e=>`</span>`)
    return str
}

function pre(str){
    str = str.replace(/{{/gm,e=>`<pre class='my-5 overflow-auto'>`).replace(/}}/gm,e=>`</pre>`)
    return str
}

function pre2(str){
    return str.replace(/{{{/gm,"<pre class='segoe'>").replace(/}}}/gm,"</pre>")
}

function square(str){
    str = str.replace(/\[\[/gm,"<div class='bg-gray-100 inline-block shadow rounded m-1 p-2 py-1'>").replace(/\]\]/gm,"</div>")
    return str
}

function opennext(str){
    return str
    .replace(/\[@/g, "<div class='open-next' onclick='this.nextElementSibling.classList.toggle(\"hidden\")' >")
    .replace(/@\]/g, "</div>")
    .replace(/-----/g, "</div><div class='hidden'>")
}

function imagem(str){
    return str.replace(/#i .+?($|\n)/g,e=>{
        t = e.split(" ")
        if(t[2] == undefined) t[2] = 'auto'
        if(t[3] == undefined) t[3] = 'auto'

        return `<img src='${t[1]}' style="width:${t[2]}; height:${t[3]}">`
    })
}

function toAlert(str){
    // str = "<[vamosver][ver alguma coisa]>"
    return str.replace(/&lt;\[(.+?)\]\[(.+?)\]&gt;/,`<span class='sobre'>$1<span>$2</span></span>`).replace(/\"/g,"\'")
}

function btDown(str){
    // str = "<[vamosver][ver alguma coisa]>"
    return str.replace(/\[down\]/g,e=>`<div class="open-next hover:bg-gray-200 cursor-pointer my-1 rounded" onclick="this.nextElementSibling.classList.toggle(&quot;hidden&quot;)"><img class="m-auto" src="down.svg"></div>`)
}

// outras

function alertAll(){
    x = [...document.querySelectorAll("[alert]")]
    x.map(e=>{
        e.addEventListener('click',g=>{
            alert2(e.getAttribute('alert'))
            console.log(e.getAttribute('alert'))
        })
    })
}

function hiddenAll(){
    [...document.querySelectorAll(".open-next")].map(e=>e.nextElementSibling.classList.add('hidden'))
}