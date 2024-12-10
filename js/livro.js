async function enviarFormulario() {

    //recuperar as informações do formulário e colocar em objetos JSON
    const livroDTO = {
        "titulo": document.querySelectorAll("input")[0].value,
        "autor": document.querySelectorAll("input")[1].value,
        "editora": document.querySelectorAll("input")[2].value,
        "ano_publicacao": parseInt(document.querySelectorAll("input")[3].value),
        "isbn": document.querySelectorAll("input")[4].value,
        "quant_total": document.querySelectorAll("input")[5].value,
        "quant_disponivel": parseInt(document.querySelectorAll("input")[6].value),
        "valor_aquisicao": parseInt(document.querySelectorAll("input")[7].value),
        "status_livro_emprestado": document.querySelectorAll("input")[8].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/livro", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro a enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Livro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor.${error}`)
    }
}

async function listarLivros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/listar/livro");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor.');
        }

        const listaDeLivros = await respostaServidor.json();
        criarTabelaLivros(listaDeLivros);

    } catch (error) {
        console.log('Erro ao comunicarse com o servidor');
        console.log(error);


    }
}

async function criarTabelaLivros(livros) {
    const tabela = document.querySelector('tbody');

    // Cria as linhas da tabela com os dados do array
    livros.forEach(livro => {
        const linhas = document.createElement('tr');
        
        // Cria cada célula com os dados do livro

        const celulaID = document.createElement('td');
        celulaID.textContent = livro.idLivro;
        linhas.appendChild(celulaID);

        const celulaTitulo = document.createElement('td');
        celulaTitulo.textContent = livro.titulo;
        linhas.appendChild(celulaTitulo);

        const celulaAutor = document.createElement('td');
        celulaAutor.textContent = livro.autor;
        linhas.appendChild(celulaAutor);

        const celulaEditora = document.createElement('td');
        celulaEditora.textContent = livro.editora;
        linhas.appendChild(celulaEditora);

        const celulaAnoPublicacao = document.createElement('td');
        celulaAnoPublicacao.textContent = livro.anoPublicacao;
        linhas.appendChild(celulaAnoPublicacao);

        const celulaIsnb = document.createElement('td');
        celulaIsnb.textContent = livro.isbn;
        linhas.appendChild(celulaIsnb);

        const celulaQuantTotal = document.createElement('td');
        celulaQuantTotal.textContent = livro.quantTotal;
        linhas.appendChild(celulaQuantTotal);

        const celulaQuantidadeDisponivel = document.createElement('td');
        celulaQuantidadeDisponivel.textContent = livro.quantDisponivel;
        linhas.appendChild(celulaQuantidadeDisponivel);

        const celulaValorAquisicao = document.createElement('td');
        celulaValorAquisicao.textContent = "R$" + livro.valorAquisicao;
        linhas.appendChild(celulaValorAquisicao);

        const celulaStatusEmprestimo = document.createElement('td');
        celulaStatusEmprestimo.textContent = livro.statusLivroEmprestado;
        linhas.appendChild(celulaStatusEmprestimo);

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


