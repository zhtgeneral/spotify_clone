import uniqid from "uniqid";

import { login } from "../support/commands";
import { PASSWORD } from '../support/e2e'
import { VALID_EMAIL } from '../support/e2e'

const random_id = uniqid();
const RANDOM_TITLE = `title-${random_id}`;
const RANDOM_AUTHOR = `author-${random_id}`;

describe('create song', () => {
  it.only('blocks unauthenticated users', () => {
    cy.visit('/');
    cy.get('svg[id="upload-song"]').click();
    cy.get('div[role="dialog"]').should('be.visible');
    cy.contains('Welcome back').should('be.visible');
    cy.contains('Login to your account').should('be.visible');
  })

  it.only('allows authenticated users', () => {
    login(VALID_EMAIL, PASSWORD, '/').then(() => {
      cy.get('svg[id="upload-song"]').click();
      cy.contains('Add a song').should('be.visible');
      cy.contains('Upload mp3 files').should('be.visible');
    })
  })

  it('can create a song', () => {
    login(VALID_EMAIL, PASSWORD, '/').then(() => {
      cy.get('svg[id="upload-song"]').click();
      cy.get('input[id="title"]').type(RANDOM_TITLE);
      cy.get('input[id="author"]').type(RANDOM_AUTHOR );
      cy.get('input[name="song"]').selectFile('./cypress/fixtures/test_song.mp3');
      cy.get('input[name="image"]').selectFile('./cypress/fixtures/test_image.jpg')

      const uploadSongUrl = /https:\/\/klnudzcihnlpfoiabxjy\.supabase\.co\/storage\/v1\/object\/[A-Za-z]+\/song-[A-Za-z0-9]+-[A-Za-z0-9]+/i; 
      cy.intercept('POST', uploadSongUrl).as('upload');
      cy.get('button[type="submit"]').click();
      cy.wait('@upload').then(() => {
        cy.get('#newest-songs > div[id="song-item"]').first().should('contain.text', `${RANDOM_TITLE}`).and('contain.text', `By ${RANDOM_AUTHOR}`);
      })
    })
  })

  it('new song appears on your library for this user only', () => {
    login(VALID_EMAIL, PASSWORD, '/').then(() => {
      cy.get('div[id="media-items"]').first().should('contain.text', RANDOM_TITLE);
      cy.get('div[id="media-items"]').first().should('contain.text', RANDOM_AUTHOR);
      cy.intercept('POST', 'https://klnudzcihnlpfoiabxjy.supabase.co/auth/v1/logout?scope=global').as('logout');
      cy.contains('Logout').click();
      cy.wait('@logout').then(() => {
        cy.get('#library-songs').should('not.contain.text', RANDOM_TITLE).and('not.contain.text', RANDOM_AUTHOR);
      })
    })
  })
})