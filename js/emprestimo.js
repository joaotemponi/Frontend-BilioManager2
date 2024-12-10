async function enviarFormularioEmprestimo() {
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

async function listarEmprestimos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/listar/emprestimo", {
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        
        const response = await respostaServidor.json();
        criarTabelaEmprestimos(response);

        if(!respostaServidor.ok) {
            throw new  Error("Erro a receber os dados para o servidor. Contate o administrador do sistema");
        }

    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor.${error}`)
    } 
}

async function criarTabelaEmprestimos(emprestimos) {
    const tabela = document.querySelector('tbody');

    // Cria as linhas da tabela com os dados do array
    emprestimos.forEach(emprestimo => {
        const linhas = document.createElement('tr');

        // Cria cada célula com os dados do carro
        const celulaIDEmprestimo = document.createElement('td');
        celulaIDEmprestimo.textContent = emprestimo.idEmprestimo;
        linhas.appendChild(celulaIDEmprestimo);

        const celulaIDAluno = document.createElement('td');
        celulaIDAluno.textContent = emprestimo.idAluno;
        linhas.appendChild(celulaIDAluno);

        const celulaNomeAluno = document.createElement('td');
        celulaNomeAluno.textContent = emprestimo.nomeAluno;
        linhas.appendChild(celulaNomeAluno);

        const celulaIDLivro = document.createElement('td');
        celulaIDLivro.textContent = emprestimo.idLivro;
        linhas.appendChild(celulaIDLivro);
        
        const celulatituloLivro = document.createElement('td');
        celulatituloLivro.textContent = emprestimo.tituloLivro;
        linhas.appendChild(celulatituloLivro);

        const celulaDataEmprestimo = document.createElement('td');
        celulaDataEmprestimo.textContent = new Date(emprestimo.dataEmprestimo).toLocaleDateString('pt-br');
        linhas.appendChild(celulaDataEmprestimo);

        const celulaDataDevolucao = document.createElement('td');
        celulaDataDevolucao.textContent = new Date(emprestimo.dataDevolucao).toLocaleDateString('pt-br');
        linhas.appendChild(celulaDataDevolucao);

        const celulaStatus = document.createElement('td');
        celulaStatus.textContent = emprestimo.statusEmprestimo;
        linhas.appendChild(celulaStatus);
        
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
