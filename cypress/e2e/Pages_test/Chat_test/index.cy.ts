describe('chat test', () => {

    it('should register, login, clicker, save score, and delete account', () => {
        let name = 'testname';
        let surname = 'testsurname';
        let address = 'address 123';
        let city = 'city 123';
        let zip = 'zip 123';
        let email = 'testuser@example.com';
        let password = 'password123';
        let username = 'Xiega';

        // Register
        cy.visit('/register');
        cy.get('input[name="name"]').type(name); 
        cy.get('input[name="surname"]').type(surname); 
        cy.get('input[name="adress"]').type(address); 
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="city"]').type(city);
        cy.get('input[name="zip"]').type(zip);
        cy.get('input[name="pass"]').type(password);
        cy.get('input[name="repass"]').type(password);
        cy.get('button[type="submit"]').click();

        // Login
        cy.intercept('POST', '/login', {
            statusCode: 200,
            body: { message: 'true' , name : username}, 
          }).as('loginRequest');

        cy.visit('/login');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="pass"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');

        // Chat
        cy.get('button').contains('Chat!').should('be.visible').click();

        // Send message
        cy.intercept('POST', '/chat', {
            statusCode: 200,
            body: { message: 'Chat message created.', postId: 10}, 
          }).as('sendChatRequest');
        cy.get('textarea').should('be.visible').type('test message');
        cy.get('button').contains('Send').click();       
        
        cy.wait('@sendChatRequest');
        

        });



    });