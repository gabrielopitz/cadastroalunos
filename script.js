let formularioAberto = false;
let formularioAulasAberto = false;


function abrirFormulario() {
    if (!formularioAberto) {
        const formulario = document.getElementById('formulario');
        formulario.innerHTML = '';

        const campos = [
            { label: 'Nome do aluno:', type: 'text', name: 'name', placeholder: 'Nome (instrumento)', required: true },
            { label: 'Email:', type: 'text', name: 'email', required: true },
            { label: 'Telefone:', type: 'tel', name: 'phone', placeholder: '(12)1234-1234' },
            { label: 'CPF:', type: 'text', name: 'cpf', placeholder: '123.123.123-22' },
            { label: 'Horário da aula:', type: 'time', name: 'classHour' },
            { label: 'Data de matrícula:', type: 'date', name: 'startDate' },
            { label: 'Data de aniversário:', type: 'date', name: 'birthDate' },
            { label: 'Formato da aula (online/Presencial):', type: 'text', name: 'classType' },
            { label: 'Sobre o aluno(a):', type: 'textarea', name: 'about'}
        ];

        const newUl = document.createElement('ul');
        campos.forEach(campo => {
            const li = document.createElement('li');
            const label = document.createElement('label');
            label.textContent = campo.label;
            const input = document.createElement('input');
            input.type = campo.type;
            input.name = campo.name;
            input.required = campo.required;
            
            if (campo.placeholder) {
                input.placeholder = campo.placeholder;
               
            }
            if (campo.required) {
                input.required = true
            }
            label.appendChild(input);
            li.appendChild(label);
            newUl.appendChild(li);
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'submit'; 
        submitButton.innerText = 'Cadastrar';
        submitButton.addEventListener('click', salvarAluno);
        newUl.appendChild(submitButton);

        formulario.appendChild(newUl);

        formularioAberto = true;
    } else {
        alert('O formulário já está aberto. Por favor, complete o cadastro atual antes de abrir um novo.');
    }


}

function salvarAluno(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const cpf = document.querySelector('input[name="cpf"]').value;
    const classHour = document.querySelector('input[name="classHour"]').value;
    const startDate = document.querySelector('input[name="startDate"]').value;
    const birthDate = document.querySelector('input[name="birthDate"]').value;
    const classType = document.querySelector('input[name="classType"]').value;
    const about = document.querySelector('input[name="about"]').value;

    const aluno = { name, email, phone, cpf, classHour, startDate, birthDate, classType, about };

    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    alunos.push(aluno);
    localStorage.setItem('alunos', JSON.stringify(alunos));

    alert('Aluno ' + aluno.name + ' cadastrado com sucesso!');

    const formulario = document.getElementById('formulario');
    formulario.innerHTML = '';
    formularioAberto = false;
}


function mostrarAlunos() {

    const botaoCadastrarAula = document.createElement('button')
    botaoCadastrarAula.textContent = 'Cadastrar aula'
    botaoCadastrarAula.addEventListener('click', () => abrirFormularioAulas())

    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    const alunosDiv = document.getElementById('alunos');
    alunosDiv.innerHTML = '';

    alunosDiv.appendChild(botaoCadastrarAula);
    alunos.forEach(aluno => {
        const alunoDiv = document.createElement('div');
        const alunoNome = document.createElement('p');
        alunoNome.textContent = aluno.name;
        alunoNome.style.cursor = 'pointer';
        alunoNome.style.display = 'grid'
        alunoNome.style.justifyContent = 'center'
        alunoNome.addEventListener('click', () => mostrarInformacoesAluno(aluno));
        
        const botaoExcluir = document.createElement('button');
        const botaoDiarioAluno = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', () => excluirAluno(aluno));
        botaoDiarioAluno.textContent = 'Aulas';
        botaoDiarioAluno.addEventListener('click', () => mostrarAulas())
        
        
        alunoDiv.appendChild(alunoNome);
        alunoDiv.appendChild(botaoExcluir);
        alunoDiv.appendChild(botaoDiarioAluno)
        
        
        alunosDiv.appendChild(alunoDiv);
        
    });
}

function mostrarInformacoesAluno(aluno) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    
    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');
    
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', fecharOverlay);
    
    const alunoInfo = document.createElement('div');
    alunoInfo.innerHTML = `
        <h3>Informações do Aluno</h2>
        <p><strong>Nome:</strong> ${aluno.name}</p>
        <p><strong>Email:</strong> ${aluno.email}</p>
        <p><strong>Telefone:</strong> ${aluno.phone}</p>
        <p><strong>CPF:</strong> ${aluno.cpf}</p>
        <p><strong>Horário de Aula:</strong> ${aluno.classHour}</p>
        <p><strong>Data de Matrícula:</strong> ${aluno.startDate}</p>
        <p><strong>Data de Aniversário:</strong> ${aluno.birthDate}</p>
        <p><strong>Formato da Aula:</strong> ${aluno.classType}</p>
    `;
    
    overlayContent.appendChild(closeButton);
    overlayContent.appendChild(alunoInfo);
    overlay.appendChild(overlayContent);
    
    document.body.appendChild(overlay);
    

    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    
    overlayContent.style.backgroundColor = '#fff';
    overlayContent.style.padding = '20px';
    overlayContent.style.maxWidth = '600px';
    overlayContent.style.maxHeight = '80%';
    overlayContent.style.overflowY = 'auto';
    overlayContent.style.borderRadius = '8px';
    overlayContent.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
    
    function fecharOverlay() {
        overlay.remove();
    } 
}


function excluirAluno(aluno) {
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    alunos = alunos.filter(a => a.name !== aluno.name);
    localStorage.setItem('alunos', JSON.stringify(alunos));
    alert('Aluno ' + aluno.name + ' excluído com sucesso: ');
    mostrarAlunos(); 
}

function abrirFormularioAulas() {
    if (!formularioAulasAberto) {
        const formularioAulas = document.getElementById('aulas');
        formularioAulas.innerHTML = '';

        const camposAulas = [
            { label: 'Nome do aluno:', type: 'text', name: 'name', placeholder: 'Nome (instrumento)'},
            { label: 'Data da aula:', type: 'date', name: 'classDate' },
            { label: 'Sobre a aula:', type: 'textarea', name: 'aboutClass'}
        ];

        const newUlaulas = document.createElement('ul');
        camposAulas.forEach(campoAulas => {
            const li = document.createElement('li');
            const label = document.createElement('label');
            label.textContent = campoAulas.label;
            const input = document.createElement('input');
            input.type = campoAulas.type;
            input.name = campoAulas.name;
            
            label.appendChild(input);
            li.appendChild(label);
            newUlaulas.appendChild(li);
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'submit'; 
        submitButton.innerText = 'Cadastrar';
        submitButton.addEventListener('click', salvarAulas);
        newUlaulas.appendChild(submitButton);

        formularioAulas.appendChild(newUlaulas);

        formularioAulasAberto = true;
    } else {
        alert('O diário já está aberto. Por favor, complete o cadastro atual antes de abrir um novo.');
    }

}

function salvarAulas(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const classDate = document.querySelector('input[name="classDate"]').value;
    const aboutClass = document.getElementsByName('textarea[name="aboutClass"]').value;

    const aula = { name, classDate, aboutClass };

    let aulasAlunos = JSON.parse(localStorage.getItem('aulasAlunos')) || [];
    aulasAlunos.push(aula);
    localStorage.setItem('aulas', JSON.stringify(aulasAlunos));

    alert('Aula dia ' + classDate + ' cadastrada com sucesso!');

    const formularioAulas = document.getElementById('aulas');
    formularioAulas.innerHTML = '';
    formularioAulasAberto = false;
}


function mostrarAulas() {

    const aulas = JSON.parse(localStorage.getItem('aulas')) || [];
    const aulasDiv = document.getElementById('aulas');
    aulasDiv.innerHTML = '';

    aulas.forEach(aula => {
        const aulaDiv = document.createElement('div');
        const aulaNome = document.createElement('p');
        aulaNome.textContent = aula.classDate;
        aulaNome.style.cursor = 'pointer';
        aulaNome.style.display = 'grid'
        aulaNome.style.justifyContent = 'center'
        aulaNome.addEventListener('click', () => mostrarInformacoesAula(aula));
        
        const botaoExcluir = document.createElement('button');
        const botaoDiarioaula = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', () => excluiraula(aula));
        
        aulaDiv.appendChild(aulaNome);
        aulaDiv.appendChild(botaoExcluir);

        aulasDiv.appendChild(aulaDiv);
        
    });
}

function mostrarInformacoesAula(aula) {

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    
    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');
    
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', fecharOverlay);
    
    const alunoInfo = document.createElement('div');
    alunoInfo.innerHTML = `
        <h3>Informações da aula</h2>
        <p><strong>Nome:</strong> ${aula.name}</p>
        <p><strong>Data da Aula:</strong> ${aula.classDate}</p>
        <p><strong>Sobre a aula:</strong> ${aula.aboutClass}</p>
    `;
    
    overlayContent.appendChild(closeButton);
    overlayContent.appendChild(alunoInfo);
    overlay.appendChild(overlayContent);
    
    document.body.appendChild(overlay);
    

    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    
    overlayContent.style.backgroundColor = '#fff';
    overlayContent.style.padding = '20px';
    overlayContent.style.maxWidth = '600px';
    overlayContent.style.maxHeight = '80%';
    overlayContent.style.overflowY = 'auto';
    overlayContent.style.borderRadius = '8px';
    overlayContent.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
    
    function fecharOverlay() {
        overlay.remove();
    } 
}