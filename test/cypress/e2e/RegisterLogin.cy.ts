import uniqid from "uniqid";
import { login } from "../support/commands";
import { PASSWORD } from '../support/e2e'
import { VALID_EMAIL } from '../support/e2e'

const RANDOM_EMAIL = `${uniqid()}@gmail.com`;

describe('login and register', () => {
  it('registers with email successfully', () => {
    cy.visit('/');
    cy.contains('Sign up').click();
    cy.contains("Don't have an account? Sign up").click();
    cy.wait(200);
    cy.get('input[id="email"]').type(RANDOM_EMAIL);
    cy.get('input[id="password"]').type(PASSWORD);
    
    cy.intercept('POST', 'https://klnudzcihnlpfoiabxjy.supabase.co/auth/v1/signup').as('register');
    cy.get('button[type="submit"]').click();
    cy.wait('@register').then(() => {
      cy.get('span[class*="supabase-auth-ui"]').contains(/Check your email for the confirmation link|Email rate limit exceeded/);
    })
  })

  it.only('login with unverified email', () => {
    login(RANDOM_EMAIL, PASSWORD, '/').then(() => {
      cy.wait(500);
      cy.get('span[class*="supabase-auth-ui"]').should('have.text', 'Email not confirmed');
    })    
  })

  it('login with verified email', () => {
    login(VALID_EMAIL, PASSWORD, '/').then(() => {
      cy.get('button[type="button"]').should('have.text', 'Logout');
      cy.get('button[type="button"]').should('have.descendants', 'svg');
      cy.get('button[type="button"]').should('not.contain.text', 'Sign up');
      cy.get('button[type="button"]').should('not.contain.text', 'Log in');
    })
  })

  it('logging out from email', () => {
    login(VALID_EMAIL, PASSWORD, '/').then(() => {
      cy.intercept('POST', 'https://klnudzcihnlpfoiabxjy.supabase.co/auth/v1/logout?scope=global').as('logout');
      cy.contains('Logout').click();
      cy.wait('@logout').then(() => {
        cy.get('div[role="status"]').should('have.text', 'Logged out');
        cy.get('button[type="button"]').should('not.contain.text', 'Logout');
        cy.get('button[type="button"]').should('not.contain.descendants', 'svg');
        cy.get('button[type="button"]').contains('Sign up');
        cy.get('button[type="button"]').contains('Log in');
      })
    })
  })

  it('registers with google successfully', () => {
    cy.visit('/');
    cy.contains('Sign up').click();
    // cy.contains('Sign in with Google').click().then(() => {
    // })
    // below is mocking the click function
    console.log(cy.getAllCookies());
    cy.origin('https://accounts.google.com', { 
      args: { 
        url: 'https://accounts.google.com', 
        valid_email: VALID_EMAIL,
        google_redirect_url: process.env.GOOGLE_REDIRECT_URL as string 
      } 
    }, (args: { url: string, valid_email: string, google_redirect_url: string }) => {
      cy.visit(args.url);
      cy.get('input[type="email"]').type(args.valid_email);
      cy.contains('Next').click();
      // currently a fix isn't available until future relase of cypress... todo
    })
    
  })

  // it('registers with github successfully', () => {
  //   // todo create test github account without giving away personal info
  // })

  // it('registers with google successfully', () => {
  //   cy.visit('http://localhost:3000/');
  //   cy.get('button').contains('Sign up').click();
  //   cy.get('a').contains("Don't have an account? Sign up").click();
  //   cy.contains('Sign in with Google').click();
  //   // todo 
  // })
})