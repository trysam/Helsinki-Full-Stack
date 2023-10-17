describe('Note App', () => {

  beforeEach(() => {
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username:'admin',
      password:'admin'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', () => {    
    cy.contains('Login')
    cy.contains('Capture your thoughts in a note and assign them the importance they deserve')
    
  })

  it('user can login', function () { 
    cy.contains('Login').click()   
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.get('#loginButton').click()
  })

  it('logging fails when passowrd is wrong', function(){
    cy.contains('Login').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('wrong')
    cy.get('#loginButton').click()
    cy.get('.error')
      .should('contain', 'Wrong Credentials')
      .and('have.css', 'border', '2px solid rgb(255, 0, 0)')
      .and('have.css', 'backgroundColor', 'rgb(255, 191, 191)')
  })

})

describe('when logged in', function(){  

  Cypress.Commands.add('createUserAndLogin', user => {
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.request('POST',  `${Cypress.env('BACKEND')}/login`,user).then(
      response => window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(response.body))
    )  
  })

  Cypress.Commands.add('createNote', (newNote) => {
    cy.request({
      url:  `${Cypress.env('BACKEND')}/notes`,
      method: 'POST',
      body: newNote,
      headers: {
        'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('loggedNoteAppUser')).userToken}`
      }
    })
  })

  beforeEach(() => {
    const user = {
      username:'Samson',
      password:'oludare'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUserAndLogin(user)
    cy.createNote({content:'Cypress created note', important:false})
    cy.createNote({content:'Cypress created second note', important:false})
    
  })

  it('add new note', () => {    
    cy.createNote({content:'Cypress created a fresh new note', important:false})
    cy.createNote({content:'Cypress created a second fresh note', important:false})
    cy.visit('')
    cy.contains('Cypress created a second fresh note')
    cy.contains('Cypress created a second fresh note')
  })

  it.only('change important status', async () => {
    cy.visit('')
    cy.contains('Cypress created note').parent().get('#toggleImpotantButton').click()
    cy.contains('Cypress created note').parent().contains('make unimportant')    
  })

})