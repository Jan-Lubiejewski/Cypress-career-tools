import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { JanLubiejewski } from '../../fixtures/test-data/User';
import employees from '../../fixtures/test-data/stx-employee.txt'
import '~Commands/Selector_Commands';

before(() => {
  Cypress.on('uncaught:exception', () => false);
});

Given('I am logged in as {string}', (user: string) => {
  const userData = {
    JanLubiejewski
  }[user];

  if (!userData) {
    throw new Error(`Unknown user: ${user}`);
  }

  // Login
  const { email, password } = userData;
  cy.visit('https://www.linkedin.com/login');
  cy.getInputById('username').type(email);
  cy.getInputById('password').type(password);
  cy.getButtonByExactText('Sign in').click();

  // Prepare data and perform for each line
  const employeeList = employees.split('\n').map((line) => line.trim());
  const company = 'stx';
  const companyEmail = '@stxnext.pl';

  //cy.intercept('GET', '/litms/api/metadata/user').as('getRequest');

  employeeList.forEach((employee, index) => {
    cy.get('.search-global-typeahead__collapsed-search-button').click();
    cy.getInputByClass('search-global-typeahead__input').type(`{selectall}{backspace}${employee} ${company}{enter}`);

    //cy.wait('@getRequest');
    cy.wait(1000);
    cy.get('.artdeco-button--2').then(($element) => {
      if ($element.find('span:contains("Connect")').length > 0) {
        // Button found,
        cy.getButtonByPartialText('Connect')
          .first()
          .parents('li')
          .first()
          .find('span[dir="ltr"]')
          .then(($span) => {
            // li element contains the correct employee name
            if ($span.text().includes(employee) || $span.text().includes(employee.split(' ')[0] + ' ' + employee.split(' ')[1][0])) {
              cy.getButtonByPartialText('Connect').first().click();
              cy.get('[aria-labelledby="send-invite-modal"]').then(($invDialog) => {
                if($invDialog.find('input[name="email"]').length > 0) {
                  cy.get('input[name="email"]').type(employee.split(' ')[0] + '.' + employee.split(' ')[1] + companyEmail);
                }
              });
              cy.getButtonByPartialText('Send without a note').click();
            } 
          });
      }
    });
  });

});