export const editorText = {
  input: () => cy.get("[data-test=\"editor-text\"] div[contenteditable]"),
  type: (text: string) => editorText.input().invoke("text", text),
} as const;