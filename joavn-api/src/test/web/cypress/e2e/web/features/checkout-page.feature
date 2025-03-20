Feature: Signup
    Scenario: Realizar login com sucesso
        Given Visito uma pagina web
        When Acesso a pagina de login
        Then realizo login

    Scenario: Adiciono produto no carrinho
        Given Visito uma pagina web
        When Acesso a pagina de login
        And realizo login
        And Adiciono produto no carrinho
        Then Valido que o produto selecionado foi armazenado corretamente
        And Clico em Add to cart

    Scenario: Acessar Cart page
        Given Visito uma pagina web
        When Acesso a pagina de login
        And realizo login
        Then Adiciono produto no carrinho
        And Clico em Add to cart
        And Clico em cart no menu da pagina
        And valido que a pagina cart foi acessada

    Scenario: Validar que a compra é realizada com sucesso
        Given Visito uma pagina web
        When Acesso a pagina de login
        And realizo login
        And Adiciono produto no carrinho
        And Clico em Add to cart
        Then Clico em cart no menu da pagina
        And Clico em Place Order
        And Preencho o Place order
        And Clico em Purchase
        And Confirmo que a compra foi realizada com sucesso
