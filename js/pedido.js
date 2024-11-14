async function enviaFormularioAluno() {
    // Recuperar as informações do formulário e colocá-las em um objeto JSON
    const alunoDTO = {
        "nome": document.querySelector("input[name='input-nome-aluno']").value,
        "sobrenome": document.querySelector("input[name='input-sobrenome-aluno']").value,
        "data_nascimento": document.querySelector("input[name='input-data-nascimento-aluno']").value,
        "endereco": document.querySelector("input[name='input-endereco-aluno']").value,
        "email": document.querySelector("input[name='input-email-aluno']").value,
        "telefone": document.querySelector("input[name='input-numero-telefone-aluno']").value
    };

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/aluno", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoDTO)
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

async function recuperarListaAlunos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/alunos");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor.');
        }

        const listaDeAlunos = await respostaServidor.json();
        criarTabelaAlunos(listaDeAlunos);

    } catch (error) {
        console.error('Erro ao comunicar-se com o servidor:', error);
    }
}

function criarTabelaAlunos(alunos) {
    const tabela = document.querySelector('tbody');

    // Limpar a tabela antes de adicionar novos dados
    tabela.innerHTML = '';

    // Cria as linhas da tabela com os dados do array
    alunos.forEach(aluno => {
        const linha = document.createElement('tr');

        // Cria cada célula com os dados do aluno
        const celulaID = document.createElement('td');
        celulaID.textContent = aluno.idAluno;
        linha.appendChild(celulaID);

        const celulaRA = document.createElement('td');
        celulaRA.textContent = aluno.ra;
        linha.appendChild(celulaRA);

        const celulaNome = document.createElement('td');
        celulaNome.textContent = aluno.nome;
        linha.appendChild(celulaNome);

        const celulaSobrenome = document.createElement('td');
        celulaSobrenome.textContent = aluno.sobrenome;
        linha.appendChild(celulaSobrenome);

        const celulaDataNascimento = document.createElement('td');
        celulaDataNascimento.textContent = aluno.data_nascimento;
        linha.appendChild(celulaDataNascimento);

        const celulaEndereco = document.createElement('td');
        celulaEndereco.textContent = aluno.endereco;
        linha.appendChild(celulaEndereco);

        const celulaEmail = document.createElement('td');
        celulaEmail.textContent = aluno.email;
        linha.appendChild(celulaEmail);

        const celulaCelular = document.createElement('td');
        celulaCelular.textContent = aluno.celular;
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
