// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe("My First Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("/login");
    cy.wait(8000);
    cy.contains("Green Habit Tracker");
  });
});

describe("The Login Page", () => {
  // beforeEach(() => {
  //   // reset and seed the database prior to every test
  //   cy.exec('npm run db:reset && npm run db:seed')

  //   // seed a user in the DB that we can control from our tests
  //   // assuming it generates a random password for us
  //   cy.request('POST', '/test/seed/user', { username: 'kajsa@mail.com' })
  //     .its('body')
  //     .as('currentUser')
  // })

  it("sets auth cookie when logging in via form submission", function () {
    // destructuring assignment of the this.currentUser object
    // const { username, password } = this.currentUser
    const email = "kajsa@mail.com";
    const password = "hejhej5";

    cy.visit("/login");
    cy.wait(8000);

    cy.get("input[name=email]").type(email);

    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);

    // we should be redirected to /home
    cy.url().should("include", "/home");

    // // our auth cookie should be present
    // cy.getCookie('your-session-cookie').should('exist')

    cy.contains("Habits to complete");
    // UI should reflect this user being logged in
    // cy.get("h1").should("contain", "Kajsa");
  });
});
