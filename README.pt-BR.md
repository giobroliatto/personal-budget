<div align="center">

<img src="./logo.png" alt="Logo do Personal Budget" />

# Personal Budget

**Controle de despesas que roda inteiro no navegador, com validação, filtros e armazenamento no `localStorage`.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**[Ver no ar](https://giobroliatto.github.io/personal-budget/)**

</div>

[English](README.md) · **Português**

> [!NOTE]
> Feito em 2021 acompanhando um curso de desenvolvimento web full stack. Foi o primeiro sistema que escrevi com programação orientada a objetos. A interface está em inglês.

---

## Sobre

O usuário registra despesas com data, tipo, descrição e valor, e depois consulta tudo com filtros. Os dados ficam guardados no próprio navegador, então não precisa de servidor.

<div align="center">
<img src="./assets/pic2.PNG" width="620" alt="Formulário de nova despesa" />
</div>

## Funcionalidades

- **Cadastro de despesa** com ano, mês, dia, tipo, descrição e valor.
- **Validação:** campos vazios, datas inválidas (incluindo o limite de dias de cada mês e anos bissextos) e valores não numéricos são recusados.
- **Consulta com filtros** por qualquer campo (dia, mês, ano, tipo, descrição e valor).
- **Exclusão** com confirmação.

<div align="center">
<img src="./assets/pic3.PNG" alt="Consulta de despesas" />
<img src="./assets/pic1.PNG" width="620" alt="Retorno da validação" />
</div>

## Destaques técnicos

- **Orientação a objetos:** uma classe `Expense` com a própria validação, e uma classe `Db` que encapsula o `localStorage` (gravar, listar, pesquisar e remover), com ID incremental.
- **Bootstrap** para layout e modais, sem etapa de build.

## Rodando localmente

Não tem build: basta clonar o repositório e abrir o `index.html` no navegador.

---

## Autor

Feito por **Giovani Broliatto**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-giobroliatto-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giobroliatto/)
