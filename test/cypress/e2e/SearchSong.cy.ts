import uniqid from "uniqid";

const random_id = uniqid();
const EXISTING_SONG_NAME = 'title-lqww0bxd';

describe('search for song', () => {
  it('search no songs', () => {
    cy.visit('/search').then(() => {
      cy.get('input[placeholder="What do you want to listen to?"]').type(random_id).then(() => {
        cy.wait(500); // debouncer waits 500 ms
        cy.get('div[class="flex flex-col gap-y-2 w-full px-6 text-neutral-400"]').should('contain.text', 'No Songs Found')
      })
    })
  })

  it('search for 1 song', () => {
    cy.visit('/search').then(() => {
      cy.get('input[placeholder="What do you want to listen to?"]').type(EXISTING_SONG_NAME).then(() => {
        cy.get('div[class="flex flex-col gap-y-2 w-full px-6"]').should('contain.text', EXISTING_SONG_NAME);
      })
    })
  })

  it.only('search for many songs', () => {
    cy.visit('/search').then(() => {
      cy.get('div[class="flex flex-col gap-y-2 w-full px-6"]').should('not.contain.text', 'No Songs Found');
    })
  })
})