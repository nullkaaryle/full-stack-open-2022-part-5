// custom commands for cypress

Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addTestUser', ({ name, username, password }) => {
  const user = { name, username, password }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
  cy.visit('http://localhost:3000')
})


Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('logout', () => {
  localStorage.clear()
  cy.visit('http://localhost:3000')
})


Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})
