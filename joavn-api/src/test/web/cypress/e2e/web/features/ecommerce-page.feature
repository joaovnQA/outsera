Feature: Signup
    Scenario: Validar que o usuário consegue visitar uma página web com sucesso
        Given Visito uma pagina web
        When Verifico que a pagina foi acessada com sucesso
        Then Acesso a pagina de login
        And Valido que a pagina foi acessada com sucesso

    Scenario: Registar um novo usuário
        Given Visito uma pagina web
        When Acesso a pagina de signup
        Then Preencho o formulario de signup
        And Valido que a conta foi criada com sucesso
