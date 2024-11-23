/// <reference types="cypress" />

describe('Komponent Nav', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Powinien wyświetlać pasek nawigacyjny', () => {
      cy.get('.navbar').should('be.visible');
    });
  
    it('Powinien zawierać tytuł "Projekt do testowania"', () => {
      cy.get('.navbar-brand').should('contain.text', 'Projekt do testowania');
    });
  
    it('Powinien otworzyć i zamknąć menu offcanvas', () => {
      cy.get('.navbar-toggler').click();
      cy.get('.offcanvas').should('be.visible');
      cy.get('.btn-close').click();
      cy.get('.offcanvas').should('not.be.visible');
    });
  });
  