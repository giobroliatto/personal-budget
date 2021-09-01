class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }
}

function cadastrarDespesa() {
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  )

  gravar(despesa)
}

// preparando o local storage para armazenar os registros de despesas
function gravar(d) {
  localStorage.setItem('despesa', JSON.stringify(d)) // 1o param -> identificação do objeto q será armazenado, 2o param -> dado que será armzenado (que foi convertido para JSON pois é a forma que este operador trabalha)
}
