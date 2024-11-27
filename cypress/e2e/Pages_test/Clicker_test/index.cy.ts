describe('Clicker Test', () => {
    beforeEach(() => {
        // Visit the page where the clicker is located
        cy.visit('/login');
        
    });

    it('should display message on not logged in user', () => {
        cy.visit('/clicker');
        
        cy.get('p').contains('You need to log in to play the game.').should('be.visible');
    });

    /*it('should increment the counter on click', () => {
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
    });*/
    
    it('should register then login and increment multiple times on multiple clicks',()=> {
        cy.visit('/register');
        cy.intercept('POST', '/register', {
            statusCode: 200,
            body: { message: 'true'}, 
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
          cy.intercept('POST', '/login', {
            statusCode: 200,
            body: { message: 'true' , name : 'Aleks'}, 
          }).as('loginRequest');
          cy.get('input#email').type('aleks@wp.pl');
          cy.get('input#pass').type('password123');
          cy.get('button[type="submit"]').click();
  
          cy.wait('@loginRequest');

          cy.get('button').contains('Clicker!').should('be.visible').click();
  
          cy.get('button').contains('Click me!').click().click().click().click().click(); // to increment
  
          cy.get('p').contains('Clicks').should('have.text', 'Clicks: 4');

    })

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

    it('should display message when the time for clicks is up and update score for existing user and restart game', () => {
        cy.intercept('POST', '/login', {
            statusCode: 200,
            body: { message: 'true' , name : 'Wojtas2'}, 
          }).as('loginRequest');

        //login 
        cy.get('input#email').type('xiega2@wp.pl');
        cy.get('input#pass').type('testtest');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');

        // go to clicker
        cy.get('button').contains('Clicker!').should('be.visible').click();
        cy.get('button').contains('Click me!').click().click().click() // to turn on clicker

        cy.wait(11000); // wait for 11 seconds
        
        cy.get('p').contains("Time's up!").should('be.visible');

        cy.get('button').contains('Save Score').click();
        cy.intercept('POST', '/save', {
            statusCode: 200,
            body: { message: 'Update!'}, 
          }).as('saveRequest');
        
        cy.wait(2000);
        
        cy.wait('@saveRequest');

        cy.get('button').contains('New Game').click();
        cy.get('p').contains("Clicks: 0").should('be.visible');
        cy.get('p').contains("Time left: 10s").should('be.visible');
        cy.get('p').contains("Update score!").should('be.visible');

    });

    
});