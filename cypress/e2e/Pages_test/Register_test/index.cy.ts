import { empty } from "@prisma/client/runtime/library";

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

      it('should not register when email does not have @ ',() => {
        cy.get('input[name="name"]').type('Aleks');
        cy.get('input[name="surname"]').type('Poniat');
        cy.get('input[name="adress"]').type('Mosina 123');
        cy.get('input[name="email"]').type('existing');
        cy.get('input[name="city"]').type('New York');
        cy.get('input[name="zip"]').type('90901');
        cy.get('input[name="pass"]').type('password123');
        cy.get('input[name="repass"]').type('password123');
    
        cy.get('button[type="submit"]').click();
        cy.get('p').contains('Email address is invalid').should('be.visible');
      })

      it('should not register when zip code is diffrent than 5 ',() => {
        cy.get('input[name="name"]').type('Aleks');
        cy.get('input[name="surname"]').type('Poniat');
        cy.get('input[name="adress"]').type('Mosina 123');
        cy.get('input[name="email"]').type('existing@wp.pl');
        cy.get('input[name="city"]').type('New York');
        cy.get('input[name="zip"]').type('909011');
        cy.get('input[name="pass"]').type('password123');
        cy.get('input[name="repass"]').type('password123');
    
        cy.get('button[type="submit"]').click();
        cy.get('p').contains('Zip code must be 5 digits').should('be.visible');
      })

      it('should not register when password\'s length is less than 6 ',() => {
        cy.get('input[name="name"]').type('Aleks');
        cy.get('input[name="surname"]').type('Poniat');
        cy.get('input[name="adress"]').type('Mosina 123');
        cy.get('input[name="email"]').type('existing@wp.pl');
        cy.get('input[name="city"]').type('New York');
        cy.get('input[name="zip"]').type('90901');
        cy.get('input[name="pass"]').type('passw');
        cy.get('input[name="repass"]').type('passw');
    
        cy.get('button[type="submit"]').click();
        cy.get('p').contains('Password must be at least 6 characters').should('be.visible');
      })

      it('should not register when whole data is empty ',() => {    
        cy.get('button[type="submit"]').click();
        cy.get('p').contains('First name is required').should('be.visible');
        cy.get('p').contains('Last name is required').should('be.visible');
        cy.get('p').contains('Address is required').should('be.visible');
        cy.get('p').contains('Email is required').should('be.visible');
        cy.get('p').contains('City is required').should('be.visible');
        cy.get('p').contains('Zip code is required').should('be.visible');
        cy.get('p').contains('Password is required').should('be.visible');
        cy.get('p').contains('Please confirm your password').should('be.visible');

      })

      
      
})