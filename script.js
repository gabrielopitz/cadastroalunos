function abrirFormulario() {
    var formulario = document.getElementById('formulario');
    
    const newUl = document.createElement('ul')

    const nameLabel = document.createElement('label')
    nameLabel.className = 'list-item'
    nameLabel.innerText = 'Nome do aluno: '
    const newInputName = document.createElement('input')
    newInputName.className = 'name'
    newInputName.type = 'text'
    newInputName.name = 'name'
    newInputName.id = 'name'

    nameLabel.appendChild(newInputName)
    newUl.appendChild(nameLabel)
    

    const emailLabel = document.createElement('label')
    emailLabel.className = 'list-item'
    emailLabel.innerText = ' Email: '
    const newInputEmail = document.createElement('input')
    newInputEmail.className = 'email'
    newInputEmail.type = 'text'
    newInputEmail.name = 'email'
    newInputEmail.id = 'email'

    emailLabel.appendChild(newInputEmail)
    newUl.appendChild(emailLabel)

    const phoneLabel = document.createElement('label')
    phoneLabel.className = 'list-item'
    phoneLabel.innerText = ' Telefone: '
    const newInputPhone = document.createElement('input')
    newInputPhone.className = 'phone'
    newInputPhone.type = 'tel'
    newInputPhone.name = 'phone'
    newInputPhone.id = 'phone'
    newInputPhone.placeholder = '(12)1234-1234'

    phoneLabel.appendChild(newInputPhone)
    newUl.appendChild(phoneLabel)

    const cpfLabel = document.createElement('label')
    cpfLabel.className = 'list-item'
    cpfLabel.innerText = ' CPF: '
    const newInputCpf = document.createElement('input')
    newInputCpf.className = 'cpf'
    newInputCpf.type = 'text'
    newInputCpf.name = 'cpf'
    newInputCpf.id = 'cpf'
    newInputCpf.placeholder = '123.123.123-22'

    cpfLabel.appendChild(newInputCpf)
    newUl.appendChild(cpfLabel)

    const instrumentLabel = document.createElement('label')
    instrumentLabel.className = 'list-item'
    instrumentLabel.innerText = ' Instrumento: '
    const newInputInstrumet = document.createElement('input')
    newInputInstrumet.className = 'instrument'
    newInputInstrumet.type = 'text'
    newInputInstrumet.id = 'instrument'
    newInputInstrumet.name = 'instrumet'

    instrumentLabel.appendChild(newInputInstrumet)
    newUl.appendChild(instrumentLabel)

    const classHourLabel = document.createElement('label')
    classHourLabel.className = 'list-item'
    classHourLabel.innerText = ' Horário da aula: '
    const newInputClassHour = document.createElement('input')
    newInputClassHour.className = 'classHour'
    newInputClassHour.type = 'time'
    newInputClassHour.id = 'classHour'
    newInputClassHour.name = 'classHour'

    classHourLabel.appendChild(newInputClassHour)
    newUl.appendChild(classHourLabel)

    const startDateLabel = document.createElement('label')
    startDateLabel.className = 'list-item'
    startDateLabel.innerText = ' Data de matrícula: '
    const newInputStartDate = document.createElement('input')
    newInputStartDate.className = 'startDate'
    newInputStartDate.type = 'date'
    newInputStartDate.name = 'startDate'
    newInputStartDate.id = 'startDate'

    startDateLabel.appendChild(newInputStartDate)
    newUl.appendChild(startDateLabel)

    const birthDateLabel = document.createElement('label')
    birthDateLabel.className = 'list-item'
    birthDateLabel.innerText = ' Data de aniversário: '
    const newInputBirthDate = document.createElement('input')
    newInputBirthDate.className = 'birthDate'
    newInputBirthDate.type = 'date'
    newInputBirthDate.name = 'birthDate'
    newInputBirthDate.id = 'birthDate'

    birthDateLabel.appendChild(newInputBirthDate)
    newUl.appendChild(birthDateLabel)

    const classTypeLabel = document.createElement('label')
    classTypeLabel.className = 'list-item'
    classTypeLabel.innerText = ' Formato da aula (online/Presencial):  '
    const newInputClassType = document.createElement('input')
    newInputClassType.className = 'classType'
    newInputClassType.type = 'text'
    newInputClassType.name = 'classType'
    newInputClassType.id = 'classType'

    classTypeLabel.appendChild(newInputClassType)
    newUl.appendChild(classTypeLabel)

    const submitButton = document.createElement('button')
    submitButton.type = 'submit'
    submitButton.innerText = 'Cadastrar'
    submitButton.addEventListener('click', salvarAluno)

    newUl.appendChild(submitButton)

    formulario.appendChild(newUl)
}

function salvarAluno(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const cpf = document.getElementById("cpf").value;
    const instrument = document.getElementById("instrument").value;
    const classHour = document.getElementById("classHour").value;
    const birthDate = document.getElementById("birthDate").value; 
    const startDate = document.getElementById("startDate").value;
    const classType = document.getElementById("classType").value;

    const aluno = { name, email, phone, cpf, instrument, classHour, birthDate, startDate, classType };
    
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push(aluno);
    
    localStorage.setItem("alunos", JSON.stringify(alunos));
    
    alert("Aluno cadastrado com sucesso!");
    
    document.getElementById('formulario').style.display = 'none'; 
    mostrarAlunos();
    
}

function mostrarAlunos() {
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    const alunosDiv = document.getElementById("alunos");
    alunosDiv.innerHTML = "";
    
    alunos.forEach(aluno => {
        const alunoNome = document.createElement("p");
        alunoNome.textContent = aluno.name;
        alunoNome.style.cursor = "pointer";
        alunoNome.addEventListener("click", () => mostrarInformacoesAluno(aluno));
        
        alunosDiv.appendChild(alunoNome);

        function mostrarInformacoesAluno() {
            alert("Nome: " + aluno.name +
            "\nEmail: " + aluno.email +
            "\nTelefone: " + aluno.phone +
            "\nCPF: " + aluno.cpf +
            "\nInstrumento " + aluno.instrument +
            "\nHorário de aula: " + aluno.classHour +
            "\nData de matrícula: " + aluno.startDate +
            "\nData de Aniversário: " + aluno.birthDate +
            "\nFormato da aula: " + aluno.classType)
        }
    });
    
}

mostrarAlunos();

