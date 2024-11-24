describe('Registration form tests', () => {

    beforeEach(() => {
        cy.visit('/register');
      });

      it('should not register successfully with existing email', () => {
        cy.intercept('POST', '/register', {
          statusCode: 200,
          body: {
            message: 'false',
          },
        }).as('registerRequest');
    
        cy.get('input[name="name"]').type('Aleks');
        cy.get('input[name="surname"]').type('Poniat');
        cy.get('input[name="adress"]').type('Mosina 123');
        cy.get('input[name="email"]').type('existing@wp.pl');
        cy.get('input[name="city"]').type('New York');
        cy.get('input[name="zip"]').type('90901');
        cy.get('input[name="pass"]').type('password123');
        cy.get('input[name="repass"]').type('password123');
    
        cy.get('button[type="submit"]').click();
    
        cy.wait('@registerRequest');
    
        cy.get('p').contains('Email exists in the database !').should('be.visible');
      });
    
      it('should register successfully with valid data', () => {
        cy.intercept('POST', '/register', {
          statusCode: 200,
          body: {
            message: 'true',
          },
        }).as('registerRequest');
    
        cy.get('input[name="name"]').type('Aleks');
        cy.get('input[name="surname"]').type('Poniat');
        cy.get('input[name="adress"]').type('Mosina 123');
        cy.get('input[name="email"]').type('aleks@wp.pl');
        cy.get('input[name="city"]').type('New York');
        cy.get('input[name="zip"]').type('90901');
        cy.get('input[name="pass"]').type('password123');
        cy.get('input[name="repass"]').type('password123');
    
        cy.get('button[type="submit"]').click();
    
        cy.wait('@registerRequest');
    
        cy.get('p').contains('You have successfully registered !').should('be.visible');
        cy.get('button').contains('Go to Login!').should('be.visible').click();

        cy.url().should('include', '/login');
      });

})