let cartas;
let dupla_virada=[];
let parrots=['unicornparrot','bobrossparrot','explodyparrot','fiestaparrot','metalparrot','revertitparrot','tripletsparrot'];
let lista=[];
quantidade_cartas();
function quantidade_cartas(){
    cartas=prompt('Digite a quantidade de cartas');
    while (cartas%2!==0||cartas<4||cartas>14){
        cartas=prompt('Digite a quantidade de cartas correta entre 4 e 14');
    }
    embaralhar();
    let b=``
    for (i=0;i<cartas;i++){
        b=b+`<li>
        <div class="carta carta${i+1} ${lista[i]}" onclick="virar(this)">
            <div class="frente face"><img src="./images/front.png"/></div>
            <div class="tras face"><img src="./images/${lista[i]}.gif"/></div>
        </div>
        </li>`
    }
    let f=document.querySelector('.tabulheiro');
    f.innerHTML=b;
    coluna_cartas();
}
window.addEventListener('resize', function () {
    //var altura = window.innerHeight;
    coluna_cartas();
});
function coluna_cartas(){
    for (i=1;i<=7;i++){
        document.querySelector('.tabulheiro').classList.remove(`t${i}`);}
    var largura = document.querySelector('.tabulheiro').clientWidth;
    let a=Math.floor(largura/151);
    if (cartas!=14&&cartas!=10){
        while(cartas%a!==0){
            a--;
        }
    }
    else{
        while((cartas%a)/a<0.5){
            if(cartas%a===0){
                break;
            }
            
            a--;
        }
    }
    if (cartas==10&&a>=5){
        a=5;}
    document.querySelector('.tabulheiro').classList.add(`t${a}`);
}
/*var viewport_width = window.innerWidth;*/

function virar(caminho){
    if(caminho!==dupla_virada[0]){
    if (dupla_virada.length<2&&!(caminho.classList.contains('acertou'))){
        girar(caminho);
        dupla_virada.push(caminho);
        if (dupla_virada.length==2&&!acertou()){
            setTimeout(() => {girar_2_cartas();}, 1000);
        }
    }}
}
function acertou(){
    if (dupla_virada.length<2){
        return 0;
    }
    else{
        for(i=0;i<parrots.length;i++){
            console.log(parrots[i]);
            if(dupla_virada[0].classList.contains(parrots[i])&&dupla_virada[1].classList.contains(parrots[i])){
                console.log(parrots[i]);
                dupla_virada[0].classList.add('acertou');
                dupla_virada[1].classList.add('acertou');
                dupla_virada=[];
                return 1;
            }
        }
    }
    return 0;
}

function girar_2_cartas(){
    girar(dupla_virada[0]);
    girar(dupla_virada[1]);
    dupla_virada=[];
}
function girar(caminho){
    caminho.querySelector('.frente').classList.toggle('girar-frente');
    caminho.querySelector('.tras').classList.toggle('girar-tras');
}
function embaralhar(){
    lista=[];
    for(i=0;i<cartas/2;i++){
        lista.push(parrots[i]);
        lista.push(parrots[i]);
    }
    lista.sort(comparador);
}

function comparador() { 
	return Math.random() - 0.5; 
}