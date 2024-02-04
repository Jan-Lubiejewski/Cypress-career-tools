  Cypress.Commands.add('getInputByLabel', { prevSubject: ['optional'] }, (subject: void | string, labelText: string) => {
    return subject ? cy.wrap(subject).find(`label:contains("${labelText}")`) : cy.get(`label:contains("${labelText}")`);
  });

  Cypress.Commands.add('getInputById', { prevSubject: ['optional'] }, (subject: void | string, id: string) => {
    return subject ? cy.wrap(subject).find(`label:contains("${id}")`) : cy.get(`#${id}`);
  });

  Cypress.Commands.add('getInputByClass', { prevSubject: ['optional'] }, (subject: void | string, clas: string) => {
    return subject ? cy.wrap(subject).find(`label:contains("${clas}")`) : cy.get(`input.${clas}`);
  });
  
  Cypress.Commands.add('getButtonByExactText', { prevSubject: ['optional'] }, (subject: void | string, buttonText: string) => {
    return subject ? cy.wrap(subject).find(`button:contains("${buttonText}")`) : cy.get('button').contains(new RegExp(`^${buttonText}$`));
  });

  Cypress.Commands.add('getButtonByPartialText', { prevSubject: ['optional'] }, (subject: void | string, buttonText: string) => {
    return subject ? cy.wrap(subject).find(`button:contains("${buttonText}")`) : cy.get(`button:contains("${buttonText}")`);
  });