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
    let expenses = []
    let id = localStorage.getItem('id')

    for (let i = 1; i <= id; i++) {
      let expense = JSON.parse(localStorage.getItem(i))
      if (expense === null) {
        continue
      }
      expenses.push(expense)
    }
    return expenses
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
    db.engrave(expense)
    document.getElementById('modal-title').innerHTML = 'Registred!'
    document.getElementById('modal-title-div').className =
      'modal-header text-success'
    document.getElementById('modal-content').innerHTML =
      'Expense successfully added'
    document.getElementById('modal-btn').innerHTML = 'Go back'
    document.getElementById('modal-btn').className = 'btn btn-success'
    $('#engraveRegister').modal('show')
  } else {
    // erro
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
  })
}

/* // preparando o local storage para armazenar os registros de despesas (aqui o índice é fixo, ou seja, será alterado toda vez que for adicionado. é preciso criar um índice dinâmico)

function engrave(d) {
  localStorage.setItem('despesa', JSON.stringify(d)) // 1o param -> identificação do objeto q será armazenado, 2o param -> dado que será armzenado (que foi convertido para JSON pois é a forma que este operador trabalha)
}

*/
