Feature: Signup
    Scenario: Validar que o usuário consegue visitar uma página web com sucesso
        Given Visito uma pagina web
        When Verifico que a pagina foi acessada com sucesso
        Then Acesso a pagina de login
        And Valido que a pagina foi acessada com sucesso

    Scenario: Registar um novo usuário
        Given Visito uma pagina web
        When Acesso a pagina de login
        And Clico em Register
        And Valido que a pagina de register foi acessada com sucesso
        Then Preencho o formulado de signup
        And Clico em Register
        And Valido que a conta foi criada com sucesso
