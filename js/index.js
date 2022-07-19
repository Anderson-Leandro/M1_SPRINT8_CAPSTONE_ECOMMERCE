let secaoProduto = document.querySelector(".listaProduto")
let secaoCarrinho = document.querySelector(".listaCarrinho")

function criaCard(produto) {

    let li = document.createElement("li")
    li.setAttribute("class", "itemLista")

    let divImg = document.createElement("div")
    divImg.setAttribute("class", "containerImg")

    let img = document.createElement("img")
    img.setAttribute("class", "imgProduto")

    let divProdutos = document.createElement("div")
    divProdutos.setAttribute("class", "dadosProduto")

    let spanCategoria = document.createElement("span")
    spanCategoria.setAttribute("class", "categoria")

    let h2 = document.createElement("h2")
    h2.setAttribute("class", "nomeProduto")

    let p = document.createElement("p")
    p.setAttribute("class", "descProduto")

    let spanPreco = document.createElement("span")
    spanPreco.setAttribute("class", "preco")

    let button = document.createElement("button")
    button.setAttribute("class", "btnAdicionarCarrinho")

    img.src = produto.img
    img.alt = produto.nameItem

    divImg.append(img)

    spanCategoria.innerText = produto.tag
    h2.innerText = produto.nameItem
    p.innerText = produto.description
    spanPreco.innerText = `R$ ${produto.value}`
    button.innerText = produto.addCart
    button.id = produto.id

    divProdutos.append(spanCategoria, h2, p, spanPreco, button)

    li.append(divImg, divProdutos)

    return li

}


criaCard(data)


function listarNaTela(listaProdutos, secao) {

    secao.innerHTML = ""

    for (let i = 0; i < listaProdutos.length; i++) {

        if (secao == secaoCarrinho) {
            listaProdutos[i].addCart = "Remover do carrinho"
            let produto = listaProdutos[i]

            let card = criaCard(produto)

            secao.appendChild(card)
        }
        else {
            let produto = listaProdutos[i]

            let card = criaCard(produto)

            secao.appendChild(card)
        }
    }
}

listarNaTela(data, secaoProduto)



let btnAdicionarCarrinho = document.querySelector(".listaProduto")
btnAdicionarCarrinho.addEventListener("click", adicionaAoCarrinho)

let carrinho = []

function adicionaAoCarrinho(event) {

    let botao = event.target

    if (botao.tagName == "BUTTON") {
        console.log(botao.id)
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == botao.id) {
                carrinho.push(data[i])
                console.log(carrinho)
            }
        }
        listarNaTela(carrinho, secaoCarrinho)
        valoresCarrinho(carrinho)
    }
}


let qtdValor = document.createElement("p")
qtdValor.setAttribute("class", "qtdValor")


let totalValor = document.createElement("p")
totalValor.setAttribute("class", "totalValor")


function valoresCarrinho(listaCarrinho) {

    if (listaCarrinho.length > 0) {

        document.querySelector(".totais").classList.remove("naoMostrar")

        let total = 0

        for (let i = 0; i < listaCarrinho.length; i++) {
            total += listaCarrinho[i].value
        }

        qtdValor.innerText = listaCarrinho.length

        totalValor.innerText = total

        document.querySelector(".valores").append(qtdValor, totalValor)
    }

    else {
        document.querySelector(".totais").classList.add("naoMostrar")

        let div = document.createElement("div")

        let h2 = document.createElement("h2")
        h2.innerText = "Carrinho Vázio"

        let p = document.createElement("p")
        p.innerText = "Adicione itens"

        div.append(h2, p)

        document.querySelector(".listaCarrinho").append(div)
    }
}


let btnRemoverCarrinho = document.querySelector(".listaCarrinho")
btnRemoverCarrinho.addEventListener("click", removerDoCarrinho)

function removerDoCarrinho(event) {
    let botao = event.target

    if (botao.tagName == "BUTTON") {
        for (let i = 0; i < carrinho.length; i++) {
            if (carrinho[i].id == botao.id) {
                carrinho.splice(i, 1)
                listarNaTela(carrinho, secaoCarrinho)
                return valoresCarrinho(carrinho)
            }
        }
    }
}


let btnPesquisa = document.querySelector(".btnPesquisa")
btnPesquisa.addEventListener("click", pesquisarProduto)

function pesquisarProduto(event){
    let produtosPesquisados = []
    let input = document.querySelector(".pesquisa").value
    input = input.toLowerCase()

    console.log(input)

    for(let i = 0; i < data.length; i++){
        let nome = data[i].nameItem
        nome = nome.toLowerCase()

        let categoria = data[i].tag[0]
        categoria = categoria.toLowerCase()


        if(nome.includes(input) || categoria.includes(input)){
            produtosPesquisados.push(data[i])
        }
    }
    listarNaTela(produtosPesquisados, secaoProduto)
}


let menuNav = document.querySelector(".menuNav")
menuNav.addEventListener("click", categorizar)

function categorizar(event){

    let produtos = []

    let categoria = event.target

    if (categoria.tagName == "A"){

        if(categoria.innerText == "Todos"){
            listarNaTela(data, secaoProduto)
        }
        else{
            for(let i = 0; i < data.length; i++){
                if(data[i].tag[0].includes(categoria.innerText)){
                    produtos.push(data[i])
                }
            }
            listarNaTela(produtos,secaoProduto)
        }        
    }
}

