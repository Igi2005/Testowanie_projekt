describe('POST /delete - Delete user and users score Endpoint', () => {

    it('should return 200 when user does not exists',() =>{
        cy.request({
            method : 'DELETE',
            url : '/delete',
            body : {
                check_data : {
                    email: 'test@wp.pl',
                    pass : 'eloeloelo'
                }
            },failOnStatusCode: false 
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('User not found.')
        })
    })

    it('should return 200 when user exists, but password is incorrect',() =>{
        cy.request({
            method : 'DELETE',
            url : '/delete',
            body : {
                check_data : {
                    email: 'xiega@wp.pl', // existing email
                    pass : 'bajojajo' // incorrect password
                }

            },failOnStatusCode: false 
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('Invalid password.')
        })
    })

    it('should delete user, users score and return 200',() =>{
        cy.request({
            method : 'DELETE',
            url : '/delete',
            body : {
                check_data : {
                    email: 'xiega@wp.pl', // existing email
                    pass : 'testtest' // correct password
                }
            },failOnStatusCode: false 
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('User deleted successfully.')
        })
    })

    it('should return 500, when there is a server error',() =>{
        cy.request({
            method : 'DELETE',
            url : '/delete',
            body : {
                email: '-------', // existing email
                pass : '------------' // correct password
            },failOnStatusCode: false 
        }).then((res) => {
            expect(res.status).to.eq(500)
            expect(res.body.message).to.eq('An error occurred while deleting the user.')
        })
    })
    

})

//Testy do odpalenia powinno byc git