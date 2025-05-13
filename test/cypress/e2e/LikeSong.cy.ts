import uniqid from "uniqid";

import { login } from "../support/commands";
import { PASSWORD } from '../support/e2e'
import { VALID_EMAIL } from '../support/e2e'

describe('Liking songs', () => {
  it('redirects unauthenticated users', () => {
    cy.visit('/liked').then(() => {
      cy.wait(1000);
      cy.url().should('not.include', '/liked');
    })
  })

  it('allows authenticated users', () => {
    login(VALID_EMAIL, PASSWORD, '/').then(() => {
      cy.visit('/liked').then(() => {
        cy.wait(1000);
        cy.url().should('include', '/liked');
      })
    })
  })

  it.only('liking 1 song shows up in liked and can remove it', () => {
    login(VALID_EMAIL, PASSWORD, '/search').then(() => {
      cy.get('div[id="searched-songs"]').first().invoke('text').then((text: string) => {
        //todo 406 codes from liked songs with user id and song id
        cy.intercept('POST', 'https://klnudzcihnlpfoiabxjy.supabase.co/rest/v1/liked_songs').as('likedSongAddedToDb');
        cy.get('div[id="searched-songs"]').first().click('right');
        cy.wait('@likedSongAddedToDb').then(() => {
          cy.get('svg[style="color: rgb(34, 197, 94);"]').should('be.visible');
        })
      
        cy.intercept('GET', 'https://klnudzcihnlpfoiabxjy.supabase.co/rest/v1/users?select=*').as('fetchUser');
        cy.visit('/liked');
        cy.wait('@fetchUser').then(() => {
          cy.get('div[id="liked-songs"]').first().should('contain.text', text);
          cy.get('div[id="liked-songs"]').its('length').then((length: number) => {
            cy.intercept('DELETE', 'https://klnudzcihnlpfoiabxjy.supabase.co/rest/v1/liked_songs?user_id=eq*').as('unlikedSong');
            cy.get('div[id="liked-songs"]').first().click('right');
            cy.wait('@unlikedSong').then(() => {
              cy.get('div[id="liked-songs"]').should('have.length', length - 1);
              cy.get('div[id="liked-songs"]').should('not.contain.text', text);
            })
          })
        })
      })
    })
  })



})