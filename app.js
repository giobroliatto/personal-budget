class Expense {
  constructor(year, month, day, type, description, cost) {
    this.year = year
    this.month = month
    this.day = day
    this.type = type
    this.description = description
    this.cost = cost
  }

  dataValidation() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == '' || this[i] == null) {
        return false
      }
    }
    return true
  }
}

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

  if (expense.dataValidation()) {
    // db.engrave(expense)
    $('#engraveSuccess').modal('show')
  } else {
    // erro
    $('#engraveError').modal('show')
  }
}

/* // preparando o local storage para armazenar os registros de despesas (aqui o índice é fixo, ou seja, será alterado toda vez que for adicionado. é preciso criar um índice dinâmico)

function engrave(d) {
  localStorage.setItem('despesa', JSON.stringify(d)) // 1o param -> identificação do objeto q será armazenado, 2o param -> dado que será armzenado (que foi convertido para JSON pois é a forma que este operador trabalha)
}

*/
