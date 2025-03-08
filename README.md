# 🎬 API RESTful - Consulta de Prêmios de Produtores de Filmes

## 📋 **Descrição**

Esta API RESTful fornece informações sobre os produtores de filmes que tiveram o maior e o menor intervalo entre prêmios consecutivos. A aplicação foi desenvolvida em **Java** com **Spring Boot**, utilizando o banco de dados **H2** em memória.

---

## 🚀 **Funcionalidades**

- ✅ Obter o produtor com o maior intervalo entre dois prêmios consecutivos.
- ✅ Obter o produtor que obteve dois prêmios mais rapidamente.
- ✅ Testes automatizados com **Cypress**.
- ✅ Logs detalhados para facilitar o debug e a auditoria das operações.

---

## 🛠️ **Tecnologias Utilizadas**

- **Java 21**
- **Spring Boot 3.4.3**
- **H2 Database** (Banco de dados em memória)
- **Cypress** (Testes End-to-End)
- **Maven** (Gerenciamento de dependências)
--**Agente-AI** (Analise da cobertura de teste)


## 📦 **Instalação**

### 1. **Pré-requisitos**

- **Java 21** instalado.
- **Maven** instalado.
- **Node.js** e **npm** instalados (para testes Cypress).

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto

- **Instalar as Dependências**
    -   mvn clean install

- **Executando a Aplicação**
    -   mvn spring-boot:run
    -   A aplicação estará disponível em: http://localhost:8080

- **Acessar o Console do Banco de Dados H2**
    -   URL: http://localhost:8080/h2-console
    -   JDBC URL: jdbc:h2:mem:testdb
    -   Username: sa
    -   Password: (deixe em branco)

- **Endpoints da API**
    -   GET /movies/award-intervals

- **Testes Automatizados**
    -   npm run cy:open:local