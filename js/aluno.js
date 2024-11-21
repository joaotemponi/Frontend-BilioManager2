async function enviarFormulario() {

    const alunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "sobrenome": document.querySelectorAll("input")[1].value,
        "dataNascimento": document.querySelectorAll("input")[2].value,
        "endereco": document.querySelectorAll("input")[3].value,
        "email": document.querySelectorAll("input")[4].value,
        "celular": document.querySelectorAll("input")[5].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/aluno", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alunoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro a enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor.${error}`);
    }
}

async function listarAlunos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/listar/aluno");

        if (!respostaServidor.ok) {
            throw new Error("Erro ao comunicar com o servidor.");
        }

        const response = await respostaServidor.json();
        criarTabelaAluno(response);

    } catch (error) {
        console.log('Erro ao comunicarse com o servidor');
        console.log(error);


    }
}

async function criarTabelaAluno(aluno) {
    const tabela = document.querySelector('tbody');

    aluno.forEach(aluno => {
        const linhas = document.createElement('tr');

        const celulaID = document.createElement('td');
        celulaID.textContent = aluno.idAluno;
        linhas.appendChild(celulaID);

        const celulaRA = document.createElement('td');
        celulaRA.textContent = aluno.ra;
        linhas.appendChild(celulaRA);
        // Cria cada célula com os dados do aluno
        const celulaNome = document.createElement('td');
        celulaNome.textContent = aluno.nome;
        linhas.appendChild(celulaNome);

        const celulaSobrenome = document.createElement('td');
        celulaSobrenome.textContent = aluno.sobrenome;
        linhas.appendChild(celulaSobrenome);

        const celulaDataNascimento = document.createElement('td');
        celulaDataNascimento.textContent = aluno.dataNascimento;
        linhas.appendChild(celulaDataNascimento);

        const celulaEndereco = document.createElement('td');
        celulaEndereco.textContent = aluno.endereco;
        linhas.appendChild(celulaEndereco);

        const celulaEmail = document.createElement('td');
        celulaEmail.textContent = aluno.email;
        linhas.appendChild(celulaEmail);

        const celulaTelefone = document.createElement('td');
        celulaTelefone.textContent = aluno.celular;
        linhas.appendChild(celulaTelefone);

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