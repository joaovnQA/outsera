Feature: Signup
    Scenario: Validar que um produto é armazenado no carrinho de compra
        Given Visito uma pagina web
        When Adiciono um produto no carinho
        Then Clico no botão do carinho
        And Valido que o produto selecionado foi armazenado corretamente

    Scenario: Acessar a tela de checkout
        Given Visito uma pagina web
        And Acesso a pagina de login
        When Realizo login
        Then Adiciono um produto no carinho
        And Clico no botão do carinho
        And Clico no botão checkout
        And Valido que a tela de checkout foi acessada

    Scenario: Confirma a compra dos produtos
        Given Visito uma pagina web
        And Acesso a pagina de login
        When Realizo login
        Then Adiciono um livro no carrinho
        And Preencho os dados para entrega
        And Clico em  Place Order
        And Valido que a ordem foi gerada com sucesso
