# Mini Projeto

## Objetivo

O objetivo central deste mini projeto é desenvolver uma aplicação monolítica que interaja com diversos microsserviços pré-fornecidos. A aplicação permitirá que os usuários executem tarefas simples relacionadas à vida acadêmica dos discentes em uma faculdade. 

A aplicação será de natureza híbrida, consumindo dados dos microsserviços sem a necessidade de alterá-los, respeitando as restrições de tempo do projeto (menos de 40 dias). Durante o desenvolvimento, é essencial adotar o padrão de design MVC, além de seguir os princípios SOLID, GRASP e os Padrões de Projeto GoF, garantindo um código limpo e bem estruturado.

## Funcionalidades

### 1. Consulta de Estudantes
- **Listar todos os estudantes** do curso de "História" na modalidade presencial.
- **Ver detalhes de um estudante específico**, permitindo a pesquisa por ID ou Nome.

### 2. Matrícula em Disciplinas
- **Permitir matrícula** de um estudante com status ativo na modalidade presencial em disciplinas oferecidas no curso de "História".
- **Listar todas as disciplinas** em que um estudante está matriculado.
- **Remover uma disciplina** da matrícula de um aluno.

### 3. Biblioteca
- **Permitir reserva de livros** para estudantes com status ativo.
- **Listar todos os livros reservados** por um estudante.
- **Cancelar a reserva** de um livro selecionado.

## Requisitos Técnicos

### Conexões com os Microsserviços
A aplicação monolítica deverá se conectar e consumir dados dos seguintes microsserviços, de acordo com as funcionalidades:

- **Aluno**: Cada aluno possui os atributos ID, nome, curso, modalidade e status.
- **Disciplina**: Cada disciplina possui os atributos ID, curso e nome.
- **Biblioteca**: Cada livro possui os atributos ID, título, autor, ano e status.

### Estrutura e Desenvolvimento

- **Padrão MVC**: A aplicação deve ser desenvolvida seguindo o padrão de arquitetura MVC.
- **Princípios SOLID e GRASP**: Aplicar os princípios SOLID e GRASP para garantir código modular e de fácil manutenção.
- **Padrões de Projeto (GoF)**: Implementar padrões de projeto onde forem apropriados para otimizar a estrutura e a funcionalidade do código.
- **Persistência em Memória**: Os dados referentes à matrícula e às reservas de livros devem ser armazenados em tempo de execução, sem a necessidade de um banco de dados.
- **Interface Amigável**: É desejável que a aplicação ofereça uma interface intuitiva e de fácil utilização.

## Tecnologias Utilizadas
- **TypeScript**
- **Node.js**
- **Axios** para chamadas HTTP
- **Princípios de Design**: SOLID, GRASP, Padrões GoF
