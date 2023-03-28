/* Essa parte do código está utilizando o Document Object Model (DOM) 
do HTML para acessar e armazenar elementos da página web em constantes. 
Para facilitar a identificação dessas constantes, 
a convenção utilizada foi adicionar o sufixo "El" no final de seus nomes. */ 
const originCityEl = document.querySelector('#originCity');
const destinyCityEl = document.querySelector('#destinyCity');
const typeTruckEl = document.querySelector('#typeTruck');
const btnConsultEl = document.querySelector('#btnConsult');
const btnReset = document.querySelector('#btnReset');
const resEl = document.querySelector('#res')
const divResultEl = document.querySelector('.div-result')
const resNegativeEl = document.querySelector('#res-negative')
const divResultNegativeEl = document.querySelector('.div-result-negative')
const truckItemOneEl = document.querySelector('.truck-item-one')
const truckItemTwoEl = document.querySelector('.truck-item-two')
const truckItemThreeEl = document.querySelector('.truck-item-three')

/* A variável typeTruck está sendo declarada como uma variável global. 
Para que ela possa ser acessada e alterada em qualquer lugar do código, 
sem a necessidade de ser passada como parâmetro em todas as funções que precisam utilizá-la. 
Essa estratégia é útil para evitar erros de escopo */  
let typeTruck

// Objeto que armazena as cidades com as distâncias entre elas
const distances = {
  "porto alegre": { 'aracaju': 3045,"são paulo": 1114, "rio de janeiro": 1536, "belo horizonte": 1924, "fortaleza": 4305, "manaus": 4445, "salvador": 3229, "curitiba": 722 },
  "são paulo": { 'aracaju': 1990, "porto alegre": 1114, "rio de janeiro": 434, "belo horizonte": 584, "fortaleza": 2773, "manaus": 3495, "salvador": 1552, "curitiba": 408 },
  "rio de janeiro": { 'aracaju': 1660, "porto alegre": 1536, "são paulo": 434, "belo horizonte": 434, "fortaleza": 2873, "manaus": 4356, "salvador": 1213, "curitiba": 856 },
  "belo horizonte": { 'aracaju': 1280, "porto alegre": 1924, "são paulo": 584, "rio de janeiro": 434, "fortaleza": 2622, "manaus": 4066, "salvador": 584, "curitiba": 1055 },
  "aracaju": { "porto alegre": 3045, "são paulo": 1990, "rio de janeiro": 1660, "belo horizonte": 1280, "fortaleza": 1185, "manaus": 3715, "salvador": 355, "curitiba": 2345 },
  "fortaleza": { "porto alegre": 4305, "são paulo": 2773, "rio de janeiro": 2873, "belo horizonte": 2622, "aracaju": 1185, "manaus": 2840, "salvador": 1374, "curitiba": 3819 },
  "manaus": { "porto alegre": 4445, "são paulo": 3495, "rio de janeiro": 4356, "belo horizonte": 4066, "aracaju": 3715, "fortaleza": 2840, "salvador": 4257, "curitiba": 4345 },
  "salvador": { "porto alegre": 3229, "são paulo": 1552, "rio de janeiro": 1213, "belo horizonte": 584, "aracaju": 355, "fortaleza": 1374, "manaus": 4257, "curitiba": 1781 },
  "curitiba": { "porto alegre": 722, "são paulo": 408, "rio de janeiro": 856, "belo horizonte": 1055, "aracaju": 2345, "fortaleza": 3819, "manaus": 4345, "salvador": 1781 }
};

// Objeto que armazena os custos por km para cada modalidade de transporte
const costs = {
  "caminhão pequeno": 4.87,
  "caminhão médio": 11.92,
  "caminhão grande": 27.44,
};


/* A função 'calcularCusto' é responsável por calcular o custo do trecho com base na distância e na modalidade selecionada. 
Ela recebe esses valores como parâmetros e armazena o resultado na variável 'custoTotal'. 
Essa função será utilizada na função 'consultarTrecho' para exibir o custo total do transporte. */
function calcularCusto(distancia, modalidade) {
  let custoPorKm = costs[modalidade];
  let custoTotal = distancia * custoPorKm;
  return custoTotal.toFixed(2);
}

/*
A função 'consultarTrecho' é responsável por consultar trechos por modalidade, onde a cidade de origem, destino e a modalidade são passados como
parâmetros. A função realiza cinco verificações utilizando a estrutura condicional 'if'. O primeiro 'if' verifica se a propriedade 'cidadeOrigem'
existe no objeto 'distances'. Em seguida, dentro do objeto 'distances', verifica se a 'cidadeOrigem' possui a cidade de destino desejada e se a
modalidade também existe no objeto 'costs'. Caso essas três verificações sejam verdadeiras, o custo total é calculado e exibido no elemento
'resEl', contendo informações sobre a cidade de origem, cidade destino, a modalidade selecionada e o custo total.
*/
function consultarTrecho(cidadeOrigem, cidadeDestino, modalidade) {
  if (distances.hasOwnProperty(cidadeOrigem) && distances[cidadeOrigem].hasOwnProperty(cidadeDestino) && costs.hasOwnProperty(modalidade)) {

    let distancia = Number(distances[cidadeOrigem][cidadeDestino]);
    let custoTotal = calcularCusto(distancia, modalidade);
    
    divResultEl.style = "display: block"
    divResultNegativeEl.style = "display: none"
    resEl.innerHTML = 
    `De <strong>${cidadeOrigem}</strong> para <strong>${cidadeDestino}</strong>, utilizando um <strong>${modalidade}</strong>, 
    a distância é de <strong>${distancia} km</strong> e o custo será de <strong>R$ ${custoTotal}</strong>.`
    
  } else if (distances.hasOwnProperty(cidadeOrigem) == false) {
    
    divResultEl.style = "display: none"
    divResultNegativeEl.style = "display: block"
    resNegativeEl.innerHTML = `A cidade <strong>"${originCityEl.value}"</strong> como "Cidade origem" não foi encontrada em nosso banco de dados.`
    
  } else if (distances[cidadeOrigem].hasOwnProperty(cidadeDestino) == false) {
    
    divResultEl.style = "display: none"
    divResultNegativeEl.style = "display: block"
    resNegativeEl.innerHTML = `A cidade <strong>"${destinyCityEl.value}"</strong> como "Cidade destino" não foi encontrada em nosso banco de dados.`
    
  } else if (costs.hasOwnProperty(modalidade) == false) {
    
    divResultEl.style = "display: none"
    divResultNegativeEl.style = "display: block"
    resNegativeEl.innerHTML = `A modalidade <strong>"${typeTruckEl.value}"</strong> não foi encontrada em nosso banco de dados.`
    
  } else {
    
    divResultEl.style = "display: none"
    divResultNegativeEl.style = "display: block"
    resNegativeEl.innerHTML = `Tivemos um erro em nosso servidor, tente mais tarde.`
    
  }

}
/* Esses outros 4 ifs são utilizados para tratar possíveis erros na execução da função. Caso a cidade de origem não exista no objeto distances, o
 programa apresentará um erro ao usuário informando que a cidade de origem não existe. Da mesma forma, se a cidade destino ou a modalidade informada
  não existirem no objeto distances e costs, respectivamente, também serão apresentadas mensagens de erro específicas. O último if é um tratamento de
   erro mais genérico, que é acionado caso ocorra algum outro erro não previsto nos ifs anteriores. */

/* Aqui é o primeiro card do caminhão pequeno 
que quando for clicado alterará o valor do input */
truckItemOneEl.addEventListener('click', () => {
  typeTruckEl.value = 'caminhão pequeno'
  typeTruck = 'caminhão pequeno'
})

// Segundo card - caminhão médio
truckItemTwoEl.addEventListener('click', () => {
  typeTruckEl.value = 'caminhão médio'
  typeTruck = 'caminhão médio'
})

// Terceiro card - caminhão grande
truckItemThreeEl.addEventListener('click', () => {
  typeTruckEl.value = 'caminhão grande'
  typeTruck = 'caminhão grande'
})

/* Aqui estou adicionando um ouvinte ao input originCityEl.
 Dentro dessa função, criamos uma variável 'text' que armazena o valor do campo de entrada,
 mas em minúsculas usando o método toLowerCase(). Em seguida, 
 definimos o atributo 'data-value' do elemento originCityEl com o valor da variável 'text'. 
 A propriedade 'data-value' é usada posteriormente para acessar o valor do campo de entrada. */
originCityEl.addEventListener('input', () => {
  let text = originCityEl.value.toLowerCase()
  originCityEl.dataset.value = text;
})

// O mesmo ocorre para a destinyCityEl (cidade destino)
destinyCityEl.addEventListener('input', () => {
  let text = destinyCityEl.value.toLowerCase()
  destinyCityEl.dataset.value = text;
})

// O mesmo ocorre para a typeTruckEl (modalidade)
typeTruckEl.addEventListener('input', () => {
  let text = typeTruckEl.value.toLowerCase()
  typeTruckEl.dataset.value = text;
})

/* Aqui fica nosso botão para o usuário 'encerrar o programa'.
Quando o usuário clicar irá limpar todas suas alterações */
btnReset.addEventListener('click', () => {
    divResultEl.style = "display: none"
    divResultNegativeEl.style = "display: none"
})

/* Quando o botão de consulta é clicado os valores dos inputs 
são recuperados e armazenados nas variáveis, depois elas são passadas 
como argumento para a função 'consultarTrecho' */
btnConsultEl.addEventListener('click', () => {
  let originCity = originCityEl.dataset.value
  let destinyCity = destinyCityEl.dataset.value
  let textTypeTruck = typeTruckEl.dataset.value

  consultarTrecho(originCity, destinyCity, typeTruck || textTypeTruck);
}) 