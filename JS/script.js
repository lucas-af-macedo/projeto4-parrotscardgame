let cartas;
let dupla_virada=[];
let parrots=['unicornparrot','bobrossparrot','explodyparrot','fiestaparrot','metalparrot','revertitparrot','tripletsparrot'];
let lista=[];
let total_certas=0;
let jogadas=0;
let id=0;
let tempo;

function quantidade_cartas(){
    parrots.sort(comparador);
    cartas=prompt('Digite a quantidade de cartas para joga (entre 4 e 14, e par)');
    while (cartas%2!==0||cartas<4||cartas>14){
        cartas=prompt('Digite a quantidade de cartas correta (entre 4 e 14, e par)');
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

function luz(){
    document.querySelector('.temporizador').classList.toggle('luz');
}

function letra(){
    document.querySelector('.temporizador p').classList.toggle('letra');
}

function animacao(){
    luz();
    letra();
}

function virar(caminho){
    if(jogadas===0){
        temporizador();
        luz();
        letra();
        setTimeout(animacao,150);
        setTimeout(animacao,300);
        setTimeout(animacao,450);
        
    }
    if(caminho!==dupla_virada[0]){
        if (dupla_virada.length<2&&!(caminho.classList.contains('acertou'))){
            girar(caminho);
            jogadas++;
            dupla_virada.push(caminho);
            if (dupla_virada.length==2&&!acertou()){
                setTimeout(girar_2_cartas, 1000);
            }
            if (total_certas==cartas){
                clearInterval(id);
                tempo=document.querySelector('.temporizador p').innerHTML.replace(/[^0-9]/g,'');
                setTimeout(fim_de_jogo, 40);
                
            }
        }
    }
}

function acertou(){
    if (dupla_virada.length<2){
        return 0;
    }
    else{
        for(i=0;i<parrots.length;i++){
            if(dupla_virada[0].classList.contains(parrots[i])&&dupla_virada[1].classList.contains(parrots[i])){
                dupla_virada[0].classList.add('acertou');
                dupla_virada[1].classList.add('acertou');
                dupla_virada=[];
                total_certas+=2;
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

function temporizador(){
    document.querySelector('.temporizador p').innerHTML='0 s';
    id=setInterval(relogio,1000);
}

function relogio(){
    let a=document.querySelector('.temporizador p');
    let b=Number(a.innerHTML.replace(/[^0-9]/g,''))+1;
    b=b+' s';
    a.innerHTML=b;
}

function fim_de_jogo(){
    alert(`Você ganhou em ${jogadas} jogadas e com ${tempo} segundos.`);
    let jogar=prompt('Deseja jogar novamente sim ou não?');
    while(jogar!='sim'&&jogar!='não'){
        jogar=prompt('Deseja jogar novamente sim ou não?');
    }
    if (jogar==='sim'){
        comecar_jogo();
    }
    else{
        alert('Tchal');
    }
}

function comecar_jogo(){
    document.querySelector('.temporizador p').innerHTML='0 s';
    dupla_virada=[];
    lista=[];
    total_certas=0;
    jogadas=0;
    quantidade_cartas();
}

comecar_jogo();
