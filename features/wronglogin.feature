Feature: validate login  page

  @Validation
  Scenario: Verify tha user is not able to login with wrong credentials
    Given  login in website with "rajat.shukla10@gmail.com" and "Testing@123"
    Then  verify login is not successfull.
    