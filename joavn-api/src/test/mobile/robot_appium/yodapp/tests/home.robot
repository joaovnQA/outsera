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
               
    Sleep    5

    Close Application
