// Função responsável por enviar o formulário com os dados do aluno.
async function enviarFormulario() {

    // Cria um objeto alunoDTO com os dados coletados dos inputs do formulário.
    const alunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,         // Nome do aluno.
        "sobrenome": document.querySelectorAll("input")[1].value,    // Sobrenome do aluno.
        "dataNascimento": document.querySelectorAll("input")[2].value, // Data de nascimento do aluno.
        "endereco": document.querySelectorAll("input")[3].value,     // Endereço do aluno.
        "email": document.querySelectorAll("input")[4].value,        // Email do aluno.
        "celular": document.querySelectorAll("input")[5].value       // Celular do aluno.
    }

    try {
        // Envia os dados para o servidor utilizando o método POST.
        const respostaServidor = await fetch("http://localhost:3333/novo/aluno", {
            method: "POST", // Define o método de envio como POST.
            headers: {
                "Content-Type": "application/json" // Define o tipo de conteúdo como JSON.
            },
            body: JSON.stringify(alunoDTO) // Converte o objeto alunoDTO para JSON e envia como corpo da requisição.
        });

        // Verifica se a resposta do servidor foi bem-sucedida.
        if (!respostaServidor.ok) {
            throw new Error("Erro a enviar os dados para o servidor. Contate o administrador do sistema");
        }

        // Exibe uma mensagem de sucesso caso os dados sejam enviados corretamente.
        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        // Caso ocorra um erro, exibe a mensagem de erro.
        console.log(error);
        alert(`Erro ao se comunicar com o servidor.${error}`);
    }
}

// Função para listar os alunos cadastrados no servidor.
async function listarAlunos() {
    try {
        // Faz uma requisição GET para obter a lista de alunos.
        const respostaServidor = await fetch("http://localhost:3333/listar/aluno");

        // Verifica se a resposta do servidor foi bem-sucedida.
        if (!respostaServidor.ok) {
            throw new Error("Erro ao comunicar com o servidor.");
        }

        // Converte a resposta do servidor (JSON) para um objeto.
        const tabelaAluno = await respostaServidor.json();

        // Chama a função para criar a tabela com os alunos recebidos.
        criarTabelaAluno(tabelaAluno);

    } catch (error) {
        // Caso ocorra um erro, exibe a mensagem de erro.
        console.log('Erro ao comunicarse com o servidor');
        console.log(error);
    }
}

// Função para criar a tabela de alunos a partir dos dados recebidos.
async function criarTabelaAluno(aluno) {
    // Seleciona o corpo da tabela onde as linhas serão inseridas.
    const tabela = document.querySelector('tbody');

    // Itera sobre os alunos recebidos e cria uma linha para cada aluno.
    aluno.forEach(aluno => {
        const linhas = document.createElement('tr'); // Cria uma nova linha para a tabela.

        // Cria uma célula para o ID do aluno e adiciona à linha.
        const celulaID = document.createElement('td');
        celulaID.textContent = aluno.idAluno;
        linhas.appendChild(celulaID);

        // Cria uma célula para o RA (Registro Acadêmico) do aluno e adiciona à linha.
        const celulaRA = document.createElement('td');
        celulaRA.textContent = aluno.ra;
        linhas.appendChild(celulaRA);

        // Cria uma célula para o nome do aluno e adiciona à linha.
        const celulaNome = document.createElement('td');
        celulaNome.textContent = aluno.nome;
        linhas.appendChild(celulaNome);

        // Cria uma célula para o sobrenome do aluno e adiciona à linha.
        const celulaSobrenome = document.createElement('td');
        celulaSobrenome.textContent = aluno.sobrenome;
        linhas.appendChild(celulaSobrenome);

        // Cria uma célula para a data de nascimento do aluno, formatada para o padrão 'pt-br', e adiciona à linha.
        const celulaDataNascimento = document.createElement('td');
        celulaDataNascimento.textContent = new Date(aluno.dataNascimento).toLocaleDateString('pt-br');
        linhas.appendChild(celulaDataNascimento);

        // Cria uma célula para o endereço do aluno e adiciona à linha.
        const celulaEndereco = document.createElement('td');
        celulaEndereco.textContent = aluno.endereco;
        linhas.appendChild(celulaEndereco);

        // Cria uma célula para o email do aluno e adiciona à linha.
        const celulaEmail = document.createElement('td');
        celulaEmail.textContent = aluno.email;
        linhas.appendChild(celulaEmail);

        // Cria uma célula para o celular do aluno e adiciona à linha.
        const celulaTelefone = document.createElement('td');
        celulaTelefone.textContent = aluno.celular;
        linhas.appendChild(celulaTelefone);

        // Cria uma célula para as ações (editar e excluir) e adiciona à linha.
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
