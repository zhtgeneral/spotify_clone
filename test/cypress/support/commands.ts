/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export function login(email: string, password: string, url: string) {
  cy.visit(url);
  cy.contains('Log in').click().then(() => {
    cy.wait(200); // todo
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);
    cy.intercept('POST', /https:\/\/klnudzcihnlpfoiabxjy\.supabase\.co\/auth\/v1\/token\?grant_type=password/i).as('loggedIn');
    cy.get('button[type="submit"]').click();
    cy.wait('@loggedIn');
  })
  return cy.get('body');
}