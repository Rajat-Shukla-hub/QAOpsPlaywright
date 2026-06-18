Feature: validate login  page

  @Testing
  Scenario Outline: Verify tha user is not able to login with wrong credentials
    Given  login in website with "<username>" and "<password>"
    Then  verify login is not successfull.

    Examples:
        | username| password|
        | abc@gmail.com | test@123  |
        |test@gmail.com | test@321   |
    