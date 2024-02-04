// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      getInputByLabel(label: string): Chainable<JQuery<HTMLElement>>;
      getInputById(id: string): Chainable<JQuery<HTMLElement>>;
      getInputByClass(id: string): Chainable<JQuery<HTMLElement>>;
      getButtonByExactText(buttonText: string): Chainable<JQuery<HTMLElement>>;
      getButtonByPartialText(buttonText: string): Chainable<JQuery<HTMLElement>>;
    }
}

declare module '*.txt' {
  const content: string;
  export default content;
}
  