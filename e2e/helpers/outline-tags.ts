export const outlineTags = {
  tagLabeledAs: (label: string) => {
    return cy.get(`.p-tree-root-children > .p-tree-node[aria-label='${label}']`);
  },
  todosOf: (tagLabel: string) => {
    return cy.get(`.p-tree-root-children > .p-tree-node[aria-label='${tagLabel}'] > ul.p-tree-node-children > li.p-tree-node`);
  },
  toogleOf: (itemLabel: string) => {
    return cy.get(`.p-tree-node[aria-label='${itemLabel}'] .p-tree-node-toggle-button`);
  }
} as const;