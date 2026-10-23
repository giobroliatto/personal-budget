<div align="center">

<img src="./logo.png" alt="Personal Budget logo" />

# Personal Budget

**Expense tracker that runs entirely in the browser, with validation, filters and storage in `localStorage`.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**[See it live](https://giobroliatto.github.io/personal-budget/)**

</div>

**English** · [Português](README.pt-BR.md)

> [!NOTE]
> Built in 2021 while following a full-stack web developer course. It was my first system written with object-oriented programming.

---

## About

You record expenses with date, type, description and amount, then look them up later with filters. Everything is stored in the browser's own storage, so no server is needed.

<div align="center">
<img src="./assets/pic2.PNG" width="620" alt="New expense form" />
</div>

## Features

- **New expense** with year, month, day, type, description and amount.
- **Validation:** empty fields, invalid dates (including day limits per month and leap years) and non-numeric amounts are rejected.
- **Query with filters** on any field (day, month, year, type, description and amount).
- **Deletion** with a confirmation prompt.

<div align="center">
<img src="./assets/pic3.PNG" alt="Expense query" />
<img src="./assets/pic1.PNG" width="620" alt="Validation feedback" />
</div>

## Technical highlights

- **Object-oriented:** an `Expense` class with its own validation, and a `Db` class that wraps `localStorage` (record, list, search and remove), with an incrementing ID.
- **Bootstrap** for layout and modals, with no build step.

## Running locally

No build step: clone the repository and open `index.html` in your browser.

---

## Author

Made by **Giovani Broliatto**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-giobroliatto-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giobroliatto/)
