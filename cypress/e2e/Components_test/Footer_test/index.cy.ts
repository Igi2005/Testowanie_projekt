/// <reference types="cypress" />

describe("Komponent Footer", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.viewport(1920,1080)
    });
  
    it("Should have 3 cards", () => {
      cy.get(".card-group .card").should("have.length", 3);
    });
  
    it("Every card should have image", () => {
      cy.wait(1000)
      cy.get(".card").each(($card) => {
        cy.wrap($card).find(".card-img-top").should("be.visible");
        cy.wrap($card).find(".card-img-top").should("have.attr", "src").and("not.be.empty");
      });
    });
    it("Every card should have .card-body and .card-footer", () => {
      cy.get(".card").each(($card) => {
        cy.wrap($card).find(".card-body").should("be.visible");
        cy.wrap($card).find(".card-footer").should("be.visible");
      });
    });

    it("Every card-body should have <h5> element and text",() => {
      cy.get(".card .card-body").each(($card) => {
        cy.wrap($card).find(".card-title").should("be.visible").and("not.be.empty")
        cy.wrap($card).find(".card-text", { timeout: 10000}).should("be.visible").and("not.be.empty")
      })
    })
    it("Every card should have in card-footer text", () => {
      cy.get(".card .card-footer").each(($card) => {
        cy.wrap($card).find(".text-body-secondary").should("be.visible").and("not.be.empty")
      });
    });
   
  });
  