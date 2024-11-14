async function enviaFormulario() {
    //recuperar as informações do formulário e colocar em objetos JSON
    const carroDTO = {
        "marca": document.querySelectorAll("input")[0].value,
        "modelo": document.querySelectorAll("input")[1].value,
        "ano": parseInt(document.querySelectorAll("input")[2].value),
        "cor": document.querySelectorAll("input")[3].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/carro", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carroDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro a enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Carro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor.${error}`)
    }
}

async function recuperarListaCarros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/carros");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor.');
        }

        const listaDeCarros = await respostaServidor.json();
        criarTabelaCarros(listaDeCarros);

    } catch (error) {
        console.log('Erro ao comunicarse com o servidor');
        console.log(error);


    }
}

    async function criarTabelaCarros(carros) {
        const tabela = document.querySelector('tbody');

        // Cria as linhas da tabela com os dados do array
        carros.forEach(carro => {
            const linhas = document.createElement('tr');

            // Cria cada célula com os dados do carro
            const celulaID = document.createElement('td');
            celulaID.textContent = carro.idCarro;
            linhas.appendChild(celulaID);

            const celulaMarca = document.createElement('td');
            celulaMarca.textContent = carro.marca;
            linhas.appendChild(celulaMarca);

            const celulamodelo = document.createElement('td');
            celulamodelo.textContent = carro.modelo;
            linhas.appendChild(celulamodelo);

            const celulaAno = document.createElement('td');
            celulaAno.textContent = carro.ano;
            linhas.appendChild(celulaAno);

            const celulaCor = document.createElement('td');
            celulaCor.textContent = carro.cor;
            linhas.appendChild(celulaCor);

            // Cria a célula para ações (ícones de editar e excluir)
            const celulaAcoes = document.createElement('td');

            const iconeEditar = document.createElement('img');
            iconeEditar.src = "assets/icons/pencil-square.svg";
            iconeEditar.alt = "editar";
            celulaAcoes.appendChild(iconeEditar);

            const iconeDeletar = document.createElement('img');
            iconeDeletar.src = "assets/icons/trash-fill.svg";
            iconeDeletar.alt = "excluir";
            celulaAcoes.appendChild(iconeDeletar);

            linhas.appendChild(celulaAcoes);

            // Adiciona a linha ao corpo da tabela
            tabela.appendChild(linhas);
        });
}

