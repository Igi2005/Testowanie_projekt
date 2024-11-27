describe('Login Page End-to-End Tests', () => {
    beforeEach(() => {
        cy.visit(`/login`); 
      });

    it('should display validation errors for empty fields',()=>{
        cy.get('button[type="submit"]').click();
        cy.get('p').contains('Email is required').should('be.visible');
        cy.get('p').contains('Password is required').should('be.visible');
    })

    it('should validation error for invalid email and empty password',()=>{
        cy.get('input#email').type('invalid-email');
        cy.get('button[type="submit"]').click();
        cy.get('p').contains('Password is required').should('be.visible');
    })

    it('should validation error for correct email and empty password',()=>{
        cy.get('input#email').type('invalid-email@test.js');
        cy.get('button[type="submit"]').click();
        cy.get('p').contains('Password is required').should('be.visible');
    })

    it('should validation error for empty email and not empty password',()=>{
        cy.get('input#pass').type('xiegaxiega')
        cy.get('button[type="submit"]').click();
        cy.get('p').contains('Email is required').should('be.visible');
    })
    
    it('should display error for incorrect login details', () => {
    cy.intercept('POST', '/login', {
      statusCode: 200,
      body: { message: 'false' }, 
    }).as('loginRequest');

    cy.get('input#email').type('incorrect@example.com');
    cy.get('input#pass').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    cy.get('p').contains('The data does not match !').should('be.visible');
  });
  it('should display msg for correct login details', () => {
    cy.intercept('POST', '/login', {
      statusCode: 200,
      body: { message: 'true' , name : 'Xiega'}, 
    }).as('loginRequest');

    cy.get('input#email').type('correct@example.com');
    cy.get('input#pass').type('correctpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    cy.get('p').contains('You have successfully logged !').should('be.visible');
    cy.get('button').contains('Chat!').should('be.visible');
    cy.get('button').contains('Clicker!').should('be.visible')
  });
    
})