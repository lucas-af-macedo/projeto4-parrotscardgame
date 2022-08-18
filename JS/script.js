let cartas;
quantidade_cartas();
function quantidade_cartas(){
    cartas=prompt('Digite a quantidade de cartas');
    while (cartas%2!==0||cartas<4||cartas>14){
        cartas=prompt('Digite a quantidade de cartas correta entre 4 e 14');
    }
    let b=``
    for (i=0;i<cartas;i++){
        b=b+`<li>
        <div class="carta carta${i+1}" onclick="girar(this)">
            <div class="frente face"><img src="./images/front.png"/></div>
            <div class="tras face"><img src="./images/unicornparrot.gif"/></div>
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
    console.log(a);
    document.querySelector('.tabulheiro').classList.add(`t${a}`);
}
/*var viewport_width = window.innerWidth;*/

function girar(caminho){
    caminho.querySelector('.frente').classList.toggle('girar-frente');
    caminho.querySelector('.tras').classList.toggle('girar-tras');
}