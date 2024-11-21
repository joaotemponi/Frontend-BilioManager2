async function enviaFormularioEmprestimo() {
    // Recuperar as informações do formulário e colocá-las em um objeto JSON
    const emprestimoDTO = {
        "nome": document.querySelector("input[name='input-nome-emprestimo']").value,
    };

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/emprestimo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emprestimoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema.");
        }

        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        alert(`Erro ao se comunicar com o servidor: ${error.message}`);
    }
}

async function recuperarListaEmprestimos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/emprestimos");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor.');
        }

        const listaDeEmprestimos = await respostaServidor.json();
        criarTabelaEmprestimos(listaDeEmprestimos);

    } catch (error) {
        console.error('Erro ao comunicar-se com o servidor:', error);
    }
}

function criarTabelaLivro(livro) {
    const tabela = document.querySelector('tbody');

    // Limpar a tabela antes de adicionar novos dados
    tabela.innerHTML = '';

    // Cria as linhas da tabela com os dados do array
    emprestimo.forEach(emprestimo => {
        const linha = document.createElement('tr');

        // Cria cada célula com os dados do emprestimo
        const celulaID = document.createElement('td');
        celulaID.textContent = emprestimo.idAluno;
        linha.appendChild(celulaID);

        const celulaIdAluno = document.createElement('td');
        celulaIdAluno.textContent = emprestimo.ra;
        linha.appendChild(celulaIdAluno);

        const celulaNome = document.createElement('td');
        celulaNome.textContent = emprestimo.nome;
        linha.appendChild(celulaNome);

        const celulaSobrenome = document.createElement('td');
        celulaSobrenome.textContent = emprestimo.sobrenome;
        linha.appendChild(celulaSobrenome);

        const celulaDataNascimento = document.createElement('td');
        celulaDataNascimento.textContent = emprestimo.data_nascimento;
        linha.appendChild(celulaDataNascimento);

        const celulaEndereco = document.createElement('td');
        celulaEndereco.textContent = emprestimo.endereco;
        linha.appendChild(celulaEndereco);

        const celulaEmail = document.createElement('td');
        celulaEmail.textContent = emprestimo.email;
        linha.appendChild(celulaEmail);

        const celulaCelular = document.createElement('td');
        celulaCelular.textContent = emprestimo.celular;
        linha.appendChild(celulaCelular);

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

        linha.appendChild(celulaAcoes);

        // Adiciona a linha ao corpo da tabela
        tabela.appendChild(linha);
    });
}
