function render(){
    
    app.innerHTML = app.innerHTML
    .replace(/\[\*(\w|\W)+?\*\]/gm,e=>bold(e))
    .replace(/\[_(\w|\W)+?_\]/gm,e=>underline(e))
    .replace(/\[-(\w|\W)+?-\]/gm,e=>italic(e))
    .replace(/\[~(\w|\W)+?~\]/gm,e=>tach(e))
    .replace(/\[!(\w|\W)+?!\]/gm,e=>quote(e))
    .replace(/{{{.+?}}}/gms,e=>pre2(e))
    .replace(/{{.+?}}/gms,e=>pre(e))
    .replace(/\[\[.+?\]\]/gms,e=>square(e))

    .replace(/#1 .+?\n/g,e=>`<div class='text-4xl pb-2 my-4 border-b semibold'>${e.slice(3)}</div>`)
    .replace(/#2 .+?\n/g,e=>`<div class='text-3xl pb-2 my-4 border-b semibold'>${e.slice(3)}</div>`)
    .replace(/#3 .+?\n/g,e=>`<div class='text-2xl pb-2 my-4 border-b semibold'>${e.slice(3)}</div>`)
    .replace(/#4 .+?\n/g,e=>`<div class='text-xl  pb-2 my-4 border-b semibold'>${e.slice(3)}</div>`)

    .replace(/#i .+?($|\n)/g,e=>imagem(e))

    .replace(/\[@.+?@\]/gms,e=>opennext(e))

    resto()
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
    str = str.replace(/{{/gm,e=>`<pre class='my-5'>`).replace(/}}/gm,e=>`</pre>`)
    return str
}

function pre2(str){
    return str.replace(/{{{/gm,"<pre class='segoe'>").replace(/}}}/gm,"</pre>")
}

function square(str){
    str = str.replace(/\[\[/gm,"<div class='bg-gray-200 my-2 shadow rounded p-2'>").replace(/\]\]/gm,"</div>")
    console.log(str)
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



function resto(){
    for(i of app.childNodes){
        if(i.nodeName == "#text"){
            p = document.createElement("p")
            p.innerHTML = i.nodeValue
            next = i.nextSibling
            app.insertBefore(p,next)
            i.remove()
        }
    }
}

