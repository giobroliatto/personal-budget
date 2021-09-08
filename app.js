class Expense {
  constructor(year, month, day, type, description, cost) {
    this.year = year
    this.month = month
    this.day = day
    this.type = type
    this.description = description
    this.cost = cost
  }

  // verificando se há campos em branco
  dataValidation() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == '' || this[i] == null) {
        return false
      }
    }
    return true
  }
}

// criação do banco de dados local (local storage)
class Db {
  constructor() {
    let id = localStorage.getItem('id')

    if (id === null) {
      localStorage.setItem('id', 0)
    }
  }

  getNextId() {
    let nextId = localStorage.getItem('id')
    return parseInt(nextId) + 1
  }

  engrave(d) {
    let id = this.getNextId()

    localStorage.setItem(id, JSON.stringify(d))

    localStorage.setItem('id', id)
  }

  // selecionando todos os registros
  allRecords() {
    // array de despesas
    let expenses = []
    let id = localStorage.getItem('id')

    // recuperar todas as despesas cadastradas em localStorage e adicioná-las em um array
    for (let i = 1; i <= id; i++) {
      // recupera a despesa
      let expense = JSON.parse(localStorage.getItem(i))

      // caso algum índice seja removido/pulado, será ignorado
      if (expense === null) {
        continue
      }

      // adicionando o índice como novo atributo da desepesa para poder identificá-lo na hora de deletar
      expense.id = i

      expenses.push(expense)
    }
    return expenses
  }

  search(expense) {
    let filteredExpenses = []
    filteredExpenses = this.allRecords()

    if (expense.year != '') {
      filteredExpenses = filteredExpenses.filter(e => e.year == expense.year)
    }

    if (expense.month != '') {
      filteredExpenses = filteredExpenses.filter(e => e.month == expense.month)
    }

    if (expense.day != '') {
      filteredExpenses = filteredExpenses.filter(e => e.day == expense.day)
    }

    if (expense.type != '') {
      filteredExpenses = filteredExpenses.filter(e => e.type == expense.type)
    }

    if (expense.description != '') {
      filteredExpenses = filteredExpenses.filter(
        e => e.description == expense.description
      )
    }

    if (expense.cost != '') {
      filteredExpenses = filteredExpenses.filter(e => e.cost == expense.cost)
    }

    return filteredExpenses
  }

  // remover despesa
  remove(id) {
    localStorage.removeItem(id)
  }
}

let db = new Db()

function registerExpense() {
  let year = document.getElementById('year')
  let month = document.getElementById('month')
  let day = document.getElementById('day')
  let type = document.getElementById('type')
  let description = document.getElementById('description')
  let cost = document.getElementById('cost')

  let expense = new Expense(
    year.value,
    month.value,
    day.value,
    type.value,
    description.value,
    cost.value
  )

  // registrando e trazendo a tela de sucesso ou erro de forma programática
  if (expense.dataValidation()) {
    // sucesso

    // registrando
    db.engrave(expense)

    // pop up de aviso
    document.getElementById('modal-title').innerHTML = 'Registred!'
    document.getElementById('modal-title-div').className =
      'modal-header text-success'
    document.getElementById('modal-content').innerHTML =
      'Expense successfully added'
    document.getElementById('modal-btn').innerHTML = 'Go back'
    document.getElementById('modal-btn').className = 'btn btn-success'
    $('#engraveRegister').modal('show')

    // zerando campos
    year.value = ''
    month.value = ''
    day.value = ''
    type.value = ''
    description.value = ''
    cost.value = ''
  } else {
    // erro

    // pop up de aviso
    document.getElementById('modal-title').innerHTML = 'Error'
    document.getElementById('modal-title-div').className =
      'modal-header text-danger'
    document.getElementById('modal-content').innerHTML =
      'Please, fill all the fields correctly'
    document.getElementById('modal-btn').innerHTML = 'Go back and fix it'
    document.getElementById('modal-btn').className = 'btn btn-danger'
    $('#engraveRegister').modal('show')
  }
}

function loadExpenses() {
  let expenses = []
  expenses = db.allRecords()

  // selecionando o tbody do html para criar a tabela
  let expensesList = document.getElementById('expensesList')

  /* 
  <tr>
    coluna 0 = <td>17/03/2021</td>
    coluna 1 = <td>Food</td>
    coluna 2 = <td>Month's buy</td>
    coluna 3 = <td>450.50</td>
    coluna n
  </tr>
     */

  // percorrendo o array "expenses", listando cada despesa dinamicamente
  expenses.forEach(function (d) {
    // criando uma linha <tr>
    let row = expensesList.insertRow()

    // criando as colunas <td>
    row.insertCell(0).innerHTML = `${d.day}/${d.month}/${d.year}`
    switch (parseInt(d.type)) {
      case 1:
        d.type = 'Food'
        break
      case 2:
        d.type = 'Education'
        break
      case 3:
        d.type = 'Leisure'
        break
      case 4:
        d.type = 'Health'
        break
      case 5:
        d.type = 'Transportation'
        break
    }

    row.insertCell(1).innerHTML = d.type
    row.insertCell(2).innerHTML = d.description
    row.insertCell(3).innerHTML = d.cost

    // botão de exclusão
    let btn = document.createElement('button')
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class="fas fa-times"></i>'
    // atribuindo ao botão um id que seja exatamente o id da despesa, id este criado na função allRecords para cada despesa
    btn.id = `expense-id-${d.id}`
    btn.onclick = function () {
      let id = this.id.replace('expense-id-', '')

      document.getElementById('modal-title').innerHTML = 'Attention!'
      document.getElementById('modal-title-div').className =
        'modal-header text-dark'
      document.getElementById('modal-content').innerHTML =
        'Are you sure you want to remove this register?'
      document.getElementById('modal-btn-cancel').innerHTML = 'Cancel'
      document.getElementById('modal-btn-cancel').className = 'btn btn-dark'
      document.getElementById('modal-btn-confirm').innerHTML = 'Yes, delete'
      document.getElementById('modal-btn-confirm').className = 'btn btn-danger'
      document.getElementById('modal-btn-confirm').onclick = function () {
        db.remove(id)
        searchExpense()
      }
      $('#engraveRegister').modal('show')
    }
    row.insertCell(4).append(btn)
  })
}

function searchExpense() {
  let year = document.getElementById('year').value
  let month = document.getElementById('month').value
  let day = document.getElementById('day').value
  let type = document.getElementById('type').value
  let description = document.getElementById('description').value
  let cost = document.getElementById('cost').value

  // instanciando a variável "expense" com a classe criada no início
  let expense = new Expense(year, month, day, type, description, cost)

  let expenses = db.search(expense)

  let expensesList = document.getElementById('expensesList')

  expensesList.innerHTML = ''

  // percorrendo o array "expenses", listando cada despesa dinamicamente
  expenses.forEach(function (d) {
    // criando uma linha <tr>
    let row = expensesList.insertRow()

    // criando as colunas <td>
    row.insertCell(0).innerHTML = `${d.day}/${d.month}/${d.year}`

    switch (parseInt(d.type)) {
      case 1:
        d.type = 'Food'
        break
      case 2:
        d.type = 'Education'
        break
      case 3:
        d.type = 'Leisure'
        break
      case 4:
        d.type = 'Health'
        break
      case 5:
        d.type = 'Transportation'
        break
    }

    row.insertCell(1).innerHTML = d.type
    row.insertCell(2).innerHTML = d.description
    row.insertCell(3).innerHTML = d.cost

    // botão de exclusão
    let btn = document.createElement('button')
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class="fas fa-times"></i>'
    // atribuindo ao botão um id que seja exatamente o id da despesa, id este criado na função allRecords para cada despesa
    btn.id = `expense-id-${d.id}`
    btn.onclick = function () {
      let id = this.id.replace('expense-id-', '')

      document.getElementById('modal-title').innerHTML = 'Attention!'
      document.getElementById('modal-title-div').className =
        'modal-header text-dark'
      document.getElementById('modal-content').innerHTML =
        'Are you sure you want to remove this register?'
      document.getElementById('modal-btn-cancel').innerHTML = 'Cancel'
      document.getElementById('modal-btn-cancel').className = 'btn btn-dark'
      document.getElementById('modal-btn-confirm').innerHTML = 'Yes, delete'
      document.getElementById('modal-btn-confirm').className = 'btn btn-danger'
      document.getElementById('modal-btn-confirm').onclick = function () {
        db.remove(id)
        searchExpense()
      }

      $('#engraveRegister').modal('show')
    }
    row.insertCell(4).append(btn)
  })
}

function reloadPage() {
  window.location.reload()
}

/* // preparando o local storage para armazenar os registros de despesas (aqui o índice é fixo, ou seja, será alterado toda vez que for adicionado. é preciso criar um índice dinâmico)

function engrave(d) {
  localStorage.setItem('despesa', JSON.stringify(d)) // 1o param -> identificação do objeto q será armazenado, 2o param -> dado que será armzenado (que foi convertido para JSON pois é a forma que este operador trabalha)
}

*/

/*    // modelo da entidade/objeto -> classe
      // entidade -> objeto abstraído do mundo real
      // cada entidade possui uma identidade para ser tratado de forma independente

      // modelo da entidade - classe
      class ContaBancaria {
        // método construtor: modelo/classe não são o objeto, precisam passar pelo processo chamado "instância", onde nesse processo ocorre a construção do objeto
        constructor() {
          // características da entidade (tb chamadas de atributos)
          this.agencia = 1075
          this.numeroConta = 8351125
          this.saldo = 50
          this.limite = 450
        }

        // ações da entidade (tb chamado de métodos)
        depositar(valorDeposito) {
          this.saldo += valorDeposito
        }

        sacar(valorSaque) {
          this.saldo -= valorSaque
        }

        consultarSaldo() {
          return this.saldo
        }
      }

      // criar entidade (com identidades) com base no modelo
      let x = new ContaBancaria() // o operador "new" indica ao JS que deseja-se transformar um modelo em um objeto, ou seja, transformar a classe ContaBancária em um objeto que pode ser utilziado no código. a partir dessa instância, pode-se recuperar os atributos e métodos do modelo (agora objeto)
      let y = new ContaBancaria()

      console.log(x.consultarSaldo())
      x.depositar(150)
      console.log(x.consultarSaldo())
      x.sacar(200)
      console.log(x.consultarSaldo()) */
