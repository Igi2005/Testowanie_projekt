describe('Clicker Test', () => {
    beforeEach(() => {
        // Visit the page where the clicker is located
        cy.visit('/login');
        
    });

    it('should increment the counter on click', () => {
        cy.intercept('POST', '/login', {
            statusCode: 200,
            body: { message: 'true' , name : 'Xiega'}, 
          }).as('loginRequest');

        //login 
        cy.get('input#email').type('correct@example.com');
        cy.get('input#pass').type('correctpassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');

        // go to clicker
        cy.get('button').contains('Clicker!').should('be.visible').click();

        // Assuming the clicker button has an id of 'clicker-button'
        cy.get('button').contains('Click me!').click(); // to turn on clicker
        cy.get('button').contains('Click me!').click(); // to increment

        // Assuming the counter has an id of 'counter'
        cy.get('p').contains('Clicks').should('have.text', 'Clicks: 1');
    });

    it('should increment the counter multiple times on multiple clicks', () => {
        cy.intercept('POST', '/login', {
            statusCode: 200,
            body: { message: 'true' , name : 'Xiega'}, 
          }).as('loginRequest');

        //login 
        cy.get('input#email').type('correct@example.com');
        cy.get('input#pass').type('correctpassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');

        // go to clicker
        cy.get('button').contains('Clicker!').should('be.visible').click();

        cy.get('button').contains('Click me!').click().click().click().click().click(); // to increment

        cy.get('p').contains('Clicks').should('have.text', 'Clicks: 4');
    });

    it('should display message on not logged in user', () => {
        cy.visit('/clicker');
        
        cy.get('p').contains('You need to log in to play the game.').should('be.visible');
    });

    it('should display message when the time for clicks is up and save score and restart game', () => {
        cy.intercept('POST', '/login', {
            statusCode: 200,
            body: { message: 'true' , name : 'Xiega'}, 
          }).as('loginRequest');

        //login 
        cy.get('input#email').type('correct@example.com');
        cy.get('input#pass').type('correctpassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');

        // go to clicker
        cy.get('button').contains('Clicker!').should('be.visible').click();
        cy.get('button').contains('Click me!').click(); // to turn on clicker

        cy.wait(11000); // wait for 11 seconds
        
        cy.get('p').contains("Time's up!").should('be.visible');

        cy.get('button').contains('Save Score').click();
        cy.wait(2000);
        cy.get('button').contains('New Game').click();
        cy.get('p').contains("Time left: 10s").should('be.visible');

    });

    
});