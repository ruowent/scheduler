describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // 1. locate appointment and reveal edit button
    cy.contains(".appointment__card--show", "Archie Cohen")
      .get("[alt='Edit']")
      .invoke("show")
      .click();

    // 2. Update student name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Kiwi Cat");

    // 3. Update Interviewer
    cy.get('[alt="Tori Malcolm"]').click();

    // 4. Save
    cy.contains("Save").click();

    // 5. Verify display
    cy.contains(".appointment__card--show", "Kiwi Cat");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // 1. locate appointment and reveal delete button
    cy.get("[alt='Delete']")
      .first()
      .click({ force: true });

    // 2. Clicks the confirm button
    cy.contains("Confirm").click();

    // 3. Check Deleting message
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    // 4. Confirm appointment is deleted
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});