*** Settings ***
Library    AppiumLibrary

*** Variable ***
${START}    QAX

*** Test Cases ***
Deve abrir a tela principal
    Open Application    http://localhost:4723
    ...                 platformName=Android
    ...                 deviceName=Android Emulator
    ...                 automationName=UIAutomator2
    ...                 app=C:\\Users\\joaon\\automacao\\outsera\\joavn-api\\src\\test\\mobile\\robot_appium\\yodapp\\app\\yodapp-beta.apk
    ...                 udid=emulator-5554
    ...                 autoGrantPermissions=true

    Sleep    5s
 

    Wait Until Page Contains     ${START}
    Click Text                   ${START}
    ${menu}    Set Variable     xpath=//android.widget.ImageButton[@content-desc="Open navigation drawer"]
    Wait Until Element Is Visible     ${menu}    5
    Click Element     ${menu}
    
    ${menu_itens}  Set Variable  xpath=//*[@resource-id="com.qaxperience.yodapp:id/navView"]//*[@text="Clique em Botões"]     

    Wait Until Element Is Visible     ${menu_itens}    5
    Click Element     ${menu_itens}

    Wait Until Page Contains     Clique simples     5
    Click Text                   Clique simples
    Wait Until Page Contains     Botão clique simples

    Click Text                   CLIQUE SIMPLES
    Wait Until Page Contains     Isso é um clique simples

    Sleep     5

    Close Application
