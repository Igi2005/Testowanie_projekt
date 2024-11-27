describe('AIO test', () => {

    it('should register, login, clicker, save score, and delete account', () => {
        let name = 'testname';
        let surname = 'testsurname';
        let address = 'address 123';
        let city = 'city 123';
        let zip = 'zip 123';
        let email = 'testuser@example.com';
        let password = 'password123';
        let username = 'testuser';

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
            body: { message: 'true' , name : 'Xiega'}, 
          }).as('loginRequest');

        cy.visit('/login');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="pass"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');

        // Clicker
        cy.get('button').contains('Clicker!').as('clickButton');
        cy.get('@clickButton').click();

        // Click multiple times
        cy.get('button').contains('Click me!').click().click().click().click().click();

        // Save score
        cy.wait(10000);
        cy.intercept('POST', '/save', {
            statusCode: 200,
            body: { message: 'Update!'}, 
          }).as('saveRequest');

        cy.get('button').contains('Save Score').click();

        cy.wait('@saveRequest');

        // Delete account

        cy.intercept('DELETE', '/delete', {
            statusCode: 200,
            body: {"message":"User deleted successfully."}, 
          }).as('delRequest');

        cy.visit('/delete');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="pass"]').type(password);
        cy.get('input[name="del"]').type('I want delete account.');
        cy.get('button').contains('Confirm').click();

        cy.wait('@delRequest');

        cy.get('p').contains('User deleted successfully.').should('be.visible');
    });

});