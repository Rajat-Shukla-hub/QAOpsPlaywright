Feature: E2E product buy validation

  Scenario: Buy the product and  verify it.
    Given  login application with "kosol10416@aspensif.com" and "Testing@123"
    When  Add "ZARA COAT 3" to the card
    Then verify "ZARA COAT 3" is displayed in cart.
    When Complete the order after making payment
    Then verify that product is present in Order details page