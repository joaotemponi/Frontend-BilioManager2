// Função responsável por enviar o formulário de empréstimo para o servidor.
async function enviarFormularioEmprestimo() {
    // Recupera o valor do input relacionado ao nome do empréstimo e cria um objeto JSON.
    const emprestimoDTO = {
        "nome": document.querySelector("input[name='input-nome-emprestimo']").value, // Nome do aluno no empréstimo.
    };

    try {
        // Envia os dados para o servidor utilizando o método POST.
        const respostaServidor = await fetch("http://localhost:3333/novo/emprestimo", {
            method: "POST", // Define o método HTTP como POST.
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON.
            },
            body: JSON.stringify(emprestimoDTO) // Converte o objeto emprestimoDTO para uma string JSON e envia no corpo da requisição.
        });

        // Verifica se a resposta do servidor foi bem-sucedida.
        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema.");
        }

        // Exibe uma mensagem de sucesso caso o empréstimo seja cadastrado corretamente.
        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        // Caso ocorra um erro, exibe o erro no console e uma mensagem de erro.
        console.error(error);
        alert(`Erro ao se comunicar com o servidor: ${error.message}`);
    }
}

// Função para listar todos os empréstimos cadastrados no servidor.
async function listarEmprestimos() {
    try {
        // Faz uma requisição GET para obter os empréstimos registrados.
        const respostaServidor = await fetch("http://localhost:3333/listar/emprestimo", {
            method: "GET", // Define o método HTTP como GET.
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON.
            },
        });

        // Converte a resposta do servidor (em formato JSON) para um objeto JavaScript.
        const response = await respostaServidor.json();

        // Chama a função que cria a tabela de empréstimos usando os dados recebidos.
        criarTabelaEmprestimos(response);

        // Verifica se a resposta do servidor foi bem-sucedida.
        if (!respostaServidor.ok) {
            throw new Error("Erro a receber os dados para o servidor. Contate o administrador do sistema");
        }

    } catch (error) {
        // Caso ocorra um erro, exibe o erro no console e uma mensagem de erro.
        console.log(error);
        alert(`Erro ao se comunicar com o servidor.${error}`);
    }
}

// Função para criar a tabela de empréstimos a partir dos dados recebidos.
async function criarTabelaEmprestimos(emprestimos) {
    // Seleciona o corpo da tabela (tbody) onde as linhas serão inseridas.
    const tabela = document.querySelector('tbody');

    // Itera sobre os dados de empréstimos e cria uma linha para cada empréstimo.
    emprestimos.forEach(emprestimo => {
        const linhas = document.createElement('tr'); // Cria uma nova linha para a tabela.

        // Cria uma célula para o ID do empréstimo e adiciona à linha.
        const celulaIDEmprestimo = document.createElement('td');
        celulaIDEmprestimo.textContent = emprestimo.idEmprestimo;
        linhas.appendChild(celulaIDEmprestimo);

        // Cria uma célula para o ID do aluno e adiciona à linha.
        const celulaIDAluno = document.createElement('td');
        celulaIDAluno.textContent = emprestimo.idAluno;
        linhas.appendChild(celulaIDAluno);

        // Cria uma célula para o nome do aluno e adiciona à linha.
        const celulaNomeAluno = document.createElement('td');
        celulaNomeAluno.textContent = emprestimo.nomeAluno;
        linhas.appendChild(celulaNomeAluno);

        // Cria uma célula para o ID do livro e adiciona à linha.
        const celulaIDLivro = document.createElement('td');
        celulaIDLivro.textContent = emprestimo.idLivro;
        linhas.appendChild(celulaIDLivro);

        // Cria uma célula para o título do livro e adiciona à linha.
        const celulatituloLivro = document.createElement('td');
        celulatituloLivro.textContent = emprestimo.tituloLivro;
        linhas.appendChild(celulatituloLivro);

        // Cria uma célula para a data de empréstimo, formatada no padrão 'pt-br', e adiciona à linha.
        const celulaDataEmprestimo = document.createElement('td');
        celulaDataEmprestimo.textContent = new Date(emprestimo.dataEmprestimo).toLocaleDateString('pt-br');
        linhas.appendChild(celulaDataEmprestimo);

        // Cria uma célula para a data de devolução, formatada no padrão 'pt-br', e adiciona à linha.
        const celulaDataDevolucao = document.createElement('td');
        celulaDataDevolucao.textContent = new Date(emprestimo.dataDevolucao).toLocaleDateString('pt-br');
        linhas.appendChild(celulaDataDevolucao);

        // Cria uma célula para o status do empréstimo e adiciona à linha.
        const celulaStatus = document.createElement('td');
        celulaStatus.textContent = emprestimo.statusEmprestimo;
        linhas.appendChild(celulaStatus);

        // Cria a célula para ações (ícones de editar e excluir).
        const celulaAcoes = document.createElement('td');

        // Cria um ícone de editar e adiciona à célula de ações.
        const iconeEditar = document.createElement('img');
        iconeEditar.src = "assets/icons/pencil-square.svg"; // Caminho do ícone de editar.
        iconeEditar.alt = "editar"; // Texto alternativo para o ícone.
        celulaAcoes.appendChild(iconeEditar);

        // Cria um ícone de excluir e adiciona à célula de ações.
        const iconeDeletar = document.createElement('img');
        iconeDeletar.src = "assets/icons/trash-fill.svg"; // Caminho do ícone de excluir.
        iconeDeletar.alt = "excluir"; // Texto alternativo para o ícone.
        celulaAcoes.appendChild(iconeDeletar);

        // Adiciona a célula de ações à linha.
        linhas.appendChild(celulaAcoes);

        // Adiciona a linha completa à tabela.
        tabela.appendChild(linhas);
    });
}
