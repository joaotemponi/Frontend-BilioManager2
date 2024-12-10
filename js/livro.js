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


async function enviarFormulario() {
    // Recuperar as informações do formulário e colocá-las em um objeto JSON
    const livroDTO = {
        "titulo": document.querySelectorAll("input")[0].value, // Título do livro
        "autor": document.querySelectorAll("input")[1].value, // Autor do livro
        "editora": document.querySelectorAll("input")[2].value, // Editora do livro
        "ano_publicacao": parseInt(document.querySelectorAll("input")[3].value), // Ano de publicação, convertido para inteiro
        "isbn": document.querySelectorAll("input")[4].value, // ISBN do livro
        "quant_total": document.querySelectorAll("input")[5].value, // Quantidade total de livros
        "quant_disponivel": parseInt(document.querySelectorAll("input")[6].value), // Quantidade de livros disponíveis, convertida para inteiro
        "valor_aquisicao": parseInt(document.querySelectorAll("input")[7].value), // Valor de aquisição, convertido para inteiro
        "status_livro_emprestado": document.querySelectorAll("input")[8].value // Status de empréstimo do livro
    }

    try {
        // Enviar os dados para o servidor
        const respostaServidor = await fetch("http://localhost:3333/novo/livro", {
            method: "POST", // Método POST para criar um novo livro
            headers: {
                'Content-Type': 'application/json' // Definindo o tipo de conteúdo como JSON
            },
            body: JSON.stringify(livroDTO) // Convertendo o objeto livroDTO para JSON
        });

        if (!respostaServidor.ok) {
            // Se a resposta do servidor não for OK, lança um erro
            throw new Error("Erro a enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Livro cadastrado com sucesso!"); // Exibe uma mensagem de sucesso

    } catch (error) {
        // Em caso de erro, exibe a mensagem de erro
        console.log(error);
        alert(`Erro ao se comunicar com o servidor.${error}`)
    }
}

async function listarLivros() {
    try {
        // Enviar requisição para listar todos os livros
        const respostaServidor = await fetch("http://localhost:3333/listar/livro");

        if (!respostaServidor.ok) {
            // Se a resposta do servidor não for OK, lança um erro
            throw new Error('Erro ao comunicar com o servidor.');
        }

        const listaDeLivros = await respostaServidor.json(); // Converte a resposta para um array de livros
        criarTabelaLivros(listaDeLivros); // Chama a função para criar a tabela com os livros

    } catch (error) {
        // Em caso de erro, exibe a mensagem de erro
        console.log('Erro ao comunicar-se com o servidor');
        console.log(error);
    }
}

async function criarTabelaLivros(livros) {
    const tabela = document.querySelector('tbody'); // Seleciona o corpo da tabela para adicionar as linhas

    // Cria as linhas da tabela com os dados do array de livros
    livros.forEach(livro => {
        const linhas = document.createElement('tr'); // Cria uma nova linha para cada livro

        // Cria células para cada propriedade do livro
        const celulaID = document.createElement('td');
        celulaID.textContent = livro.idLivro; // Adiciona o ID do livro
        linhas.appendChild(celulaID);

        const celulaTitulo = document.createElement('td');
        celulaTitulo.textContent = livro.titulo; // Adiciona o título do livro
        linhas.appendChild(celulaTitulo);

        const celulaAutor = document.createElement('td');
        celulaAutor.textContent = livro.autor; // Adiciona o autor do livro
        linhas.appendChild(celulaAutor);

        const celulaEditora = document.createElement('td');
        celulaEditora.textContent = livro.editora; // Adiciona a editora do livro
        linhas.appendChild(celulaEditora);

        const celulaAnoPublicacao = document.createElement('td');
        celulaAnoPublicacao.textContent = livro.anoPublicacao; // Adiciona o ano de publicação do livro
        linhas.appendChild(celulaAnoPublicacao);

        const celulaIsnb = document.createElement('td');
        celulaIsnb.textContent = livro.isbn; // Adiciona o ISBN do livro
        linhas.appendChild(celulaIsnb);

        const celulaQuantTotal = document.createElement('td');
        celulaQuantTotal.textContent = livro.quantTotal; // Adiciona a quantidade total de livros
        linhas.appendChild(celulaQuantTotal);

        const celulaQuantidadeDisponivel = document.createElement('td');
        celulaQuantidadeDisponivel.textContent = livro.quantDisponivel; // Adiciona a quantidade disponível de livros
        linhas.appendChild(celulaQuantidadeDisponivel);

        const celulaValorAquisicao = document.createElement('td');
        celulaValorAquisicao.textContent = "R$" + livro.valorAquisicao; // Adiciona o valor de aquisição, formatado com "R$"
        linhas.appendChild(celulaValorAquisicao);

        const celulaStatusEmprestimo = document.createElement('td');
        celulaStatusEmprestimo.textContent = livro.statusLivroEmprestado; // Adiciona o status de empréstimo
        linhas.appendChild(celulaStatusEmprestimo);

        // Cria a célula para ações (ícones de editar e excluir)
        const celulaAcoes = document.createElement('td');

        const iconeEditar = document.createElement('img');
        iconeEditar.src = "assets/icons/pencil-square.svg"; // Ícone de editar
        iconeEditar.alt = "editar";
        celulaAcoes.appendChild(iconeEditar);

        const iconeDeletar = document.createElement('img');
        iconeDeletar.src = "assets/icons/trash-fill.svg"; // Ícone de excluir
        iconeDeletar.alt = "excluir";
        celulaAcoes.appendChild(iconeDeletar);

        linhas.appendChild(celulaAcoes); // Adiciona a célula de ações à linha

        // Adiciona a linha ao corpo da tabela
        tabela.appendChild(linhas);
    });
}
