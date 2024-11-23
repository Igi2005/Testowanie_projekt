/// <reference types="cypress" />

describe('Component Nav', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('It should display a navigation bar', () => {
      cy.get('.navbar').should('be.visible');
    });
  
    it('Should contain the title "Projekt do testowania"', () => {
      cy.get('.navbar-brand').should('contain.text', 'Projekt do testowania');
    });
  
    it('It should open and close the offcanvas menu', () => {
      cy.get('.navbar-toggler').click();
      cy.get('.offcanvas').should('be.visible');
      cy.get('.btn-close').click();
      cy.get('.offcanvas').should('not.be.visible');
    });
  });
  