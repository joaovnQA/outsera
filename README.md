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

### 2. **bash**

git clone https://github.com/joaovnQA/outsera.git

### 3. **Instalar as Dependências**

    -   mvn clean install
    

### 4. **Executando a Aplicação**

    -   mvn spring-boot:run
    -   A aplicação estará disponível em: http://localhost:8080
    

### 5. **Acessar o Console do Banco de Dados H2**

    -   URL: http://localhost:8080/h2-console
    -   JDBC URL: jdbc:h2:mem:testdb
    -   Username: sa
    -   Password: (deixe em branco)
    

### 6. **Endpoints da API**

    -   GET /movies/award-intervals

### 7. **Testes Automatizados**

```sh
-   npm run cy:open:api
-   npm run cy:open:web
-   npx cypress run --reporter mochawesome (Report cypress para os testes de API e WEB)
-   Adb devices (Listas os devices para os testes mobile)
-   appium driver install uiautomator2
-   robot -d ./logs. tests/home.robot
-   robot -d ./logs. tests/menu.robot

```

```sh
### 8. **Testes de Performance**
```

```sh
- k6 run --out json=resultados.json load_test_get.js
- node gerar_relatorio.js (Excutar para verificar o report dos testes de performance)
```
