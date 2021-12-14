function limparDadosCnpj()
{
    document.getElementById('cnpj').value = "";
    document.getElementById('nome').value = "";
    document.getElementById('cep').value = "";
    document.getElementById('logradouro').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('localidade').value = "";
    document.getElementById('uf').value = "";
    document.getElementById('ibge').value = "";
    document.getElementById('ddd').value = "";
    document.getElementById('telefone').value = "";
}

function retornoReceitaWS(conteudo)
{
    // verifica se o callback apresentou algum erro
    if (!('message' in conteudo))
    {
        if (conteudo['situacao'] == 'ATIVA')
        {
            for (const campo in conteudo)
            {
                let campoAux = document.querySelector(`#${campo}`)
                if (campoAux)
                {
                    campoAux.value = conteudo[campo].toUpperCase();
                }
            }
            // campo com nome diferente devido a api do cep
            document.querySelector(`#localidade`).value = conteudo['municipio'];
        } else
        {
            alert('CNPJ inativo, não pode ser cadastrado!');
            limparDadosCnpj();
        }
    } else
    {
        alert(conteudo['message']);
        limparDadosCnpj();
    }
}

function validarCnpj(valor)
{
    // obtém somente os números
    let cnpj = valor.replace(/\D/gm,'');
    // expressão regular para validar o cnpj
    let regEx = /^[0-9]{14}$/;
    // verifica se o cep está no formato válido
    if (regEx.test(cnpj))
    {
        consultarCnpj(cnpj);
    } else
    {
        alert('Cnpj em formato inválido!');
        limparDadosCnpj();
    }
}

function consultarCnpj(valor)
{
    let baseUrl = `https://www.receitaws.com.br/v1/cnpj/${valor}/?callback=retornoReceitaWS`;
    // cria um elemento javascript
    let script = document.createElement('script');
    // sincroniza com o callback
    script.src = baseUrl;
    // insere script no documento e carrega o conteúdo
    document.body.appendChild(script);
}

function validarTelefone(valor)
{
    let regexTelefone = /^[0-9]{4,5}-[0-9]{4}$/;
    if (valor !== '')
    {
        if (!(regexTelefone.test(valor)))
        {
            alert('Formato de telefone inválido!');
        }  
    }
}