/// <reference types="cypress" />

describe("Komponent Footer", () => {
    beforeEach(() => {
      // Załóżmy, że komponent Footer jest widoczny na stronie głównej
      cy.visit("/");
    });
  
    it("Should have 3 cards", () => {
      cy.get(".card-group .card").should("have.length", 3);
    });
  
   
  });
  