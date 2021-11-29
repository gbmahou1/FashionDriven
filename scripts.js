let nome;
let numGola = 0;
let numTecido = 0;
let numModelo = 0;
let numImg = 0;
let numInfo = 0;
let imgLink = '';
var golaSelecionada;
var tecidoSelecionado;
var modeloSelecionado;
let encomendas;

function receiveName()
{
    nome = prompt("Qual é seu nome? :)");
    loadDisplay();
    
}

function loadDisplay()
{
    let aux;
    let request = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    
    request.then(treatSuccess);
    request.catch(treatError);
    

    function treatSuccess(success)
    {
        aux = success.data;
        encomendas = success.data;
        let aux2 = document.getElementById("recentRequests");
        
        for(let i= 0; i < 10; i++)
        {
            aux2.innerHTML += `
            <div id="${encomendas[(encomendas.length)-(10-i)].id}" onclick="confirmNewRequest(this)" class="request">
                <img src="${encomendas[(encomendas.length)-(10-i)].image}">
                <p><b>Criador: </b>${encomendas[(encomendas.length)-(10-i)].owner}</p>
            </div>`;
        }

    }

    function treatError(error)
    {
        alert ("falhou");
    }
}

function clickGola(gola)
{
    if (numGola == 0)
    {
        var aux;
        golaSelecionada = gola.id;
        aux = document.getElementById(golaSelecionada);
        aux.classList.add("selected");
        numGola = 1;

        numInfo = numGola + numModelo + numTecido + numImg;

        if (numInfo == 4)
        {
            enableButton();
        }
    }

    else
    {
        var aux;
        aux = document.getElementById(golaSelecionada);
        aux.classList.remove("selected");
        golaSelecionada = gola.id;
        aux = document.getElementById(golaSelecionada);
        aux.classList.add("selected");

        numInfo = numGola + numModelo + numTecido + numImg;

        if (numInfo == 4)
        {
            enableButton();
        }

    }
}

function clickTecido(tecido)
{
    if (numTecido == 0)
    {
        var aux;
        tecidoSelecionado = tecido.id;
        aux = document.getElementById(tecidoSelecionado);
        aux.classList.add("selected");
        numTecido = 1;

        numInfo = numGola + numModelo + numTecido + numImg;

        if (numInfo == 4)
        {
            enableButton();
        }
    }

    else
    {
        var aux;
        aux = document.getElementById(tecidoSelecionado);
        aux.classList.remove("selected");
        tecidoSelecionado = tecido.id;
        aux = document.getElementById(tecidoSelecionado);
        aux.classList.add("selected");

        numInfo = numGola + numModelo + numTecido + numImg;

        if (numInfo == 4)
        {
            enableButton();
        }

    }
}

function clickModelo(modelo)
{
    if (numModelo == 0)
    {
        var aux;
        modeloSelecionado = modelo.id;
        aux = document.getElementById(modeloSelecionado);
        aux.classList.add("selected");
        numModelo = 1;

        numInfo = numGola + numModelo + numTecido + numImg;

        if (numInfo == 4)
        {
            enableButton();
        }
    }

    else
    {
        var aux;
        aux = document.getElementById(modeloSelecionado);
        aux.classList.remove("selected");
        modeloSelecionado = modelo.id;
        aux = document.getElementById(modeloSelecionado);
        aux.classList.add("selected");

        numInfo = numGola + numModelo + numTecido + numImg;

        if (numInfo == 4)
        {
            enableButton();
        }

    }
}

function getLink()
{
    let aux = document.getElementById("linkInsert").value;
    imgLink = aux;
    document.getElementById("linkInsert").value = '';
    numImg = 1;

    numInfo = numGola + numModelo + numTecido + numImg;

    if (numInfo == 4)
    {
        enableButton();
    }
}

function enableButton()
{
    let aux = document.getElementById("confirmButton");
    aux.classList.add("active");
    aux.onclick = function() { sendObject(); };
}

function sendObject ()
{
    const request = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', {model: modeloSelecionado,
    neck: golaSelecionada,
    material: tecidoSelecionado,
    image: imgLink,
    owner: nome,
    author: nome});

    request.then(treatSuccess);
    request.catch(treatError);

    function treatSuccess(success)
    {
        alert("Encomenda enviada ^^");
        let aux2 = document.getElementById("recentRequests");
        aux2.innerHTML = "";
        loadDisplay();
    }

    function treatError(error)
    {
        alert("Ops, não conseguimos processar sua encomenda");
    }

}

function confirmNewRequest(newRequest)
{
    let aux = newRequest.id;
    let newRequestGola;
    let newRequestTecido;
    let newRequestModelo;
    let newRequestImagem;
    let newRequestOwner;

    for(let i = 0; i<encomendas.length; i++)
    {
        if (encomendas[i].id == aux)
        {
            newRequestGola = encomendas[i].neck;
            newRequestModelo = encomendas[i].model;
            newRequestTecido = encomendas[i].material;
            newRequestImagem = encomendas[i].image;
            newRequestOwner = encomendas[i].owner;
        }

    }

    var r = confirm("Tem certeza que quer fazer esse pedido?");

        if (r == true)
        {
            const request = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', {model: newRequestModelo,
            neck: newRequestGola,
            material: newRequestTecido,
            image: newRequestImagem,
            owner: newRequestOwner,
            author: nome});

            request.then(treatSuccess);
            request.catch(treatError);

            function treatSuccess(success)
            {
                alert("Encomenda enviada ^^");
                let aux2 = document.getElementById("recentRequests");
                aux2.innerHTML = "";
                loadDisplay();
            }

            function treatError(error)
            {
                alert("Ops, não conseguimos processar sua encomenda");
            }

        }
        else
        {
            alert("Pedido cancelado");
        }

    

}