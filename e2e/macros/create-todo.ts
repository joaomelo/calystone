import {
  editorTodo,
  modalCreateArtifact,
  outlineNodesLegacy,
  toolbarNode
} from "../selectors";

interface Criterion {
  label: string;
  value: string;
}

export function createTodo(options: {
  criteria?: Criterion[],
  name: string,
  tags?: string[],
}) {
  const {
    criteria = [],
    name,
    tags = [],
  } = options;

  toolbarNode.buttonCreateArtifact().click();
  modalCreateArtifact.inputName().clear().type(name);
  modalCreateArtifact.buttonSave().click();

  outlineNodesLegacy.nodeLabeledAs(name).click();

  if (tags.length > 0) {
    editorTodo.tags.tab().click();
    tags.forEach((tag) => {
      editorTodo.tags.input().clear().type(tag);
      editorTodo.tags.buttonAdd().click();
    });
  }

  if (criteria.length > 0) {
    editorTodo.priority.tab().click();

    criteria.forEach((criterion) => {
      editorTodo.priority.add.input().clear().type(criterion.label);
      editorTodo.priority.add.button().click();
      cy.debug();
      editorTodo.priority.manage.value(criterion.label).clear().type(criterion.value);
    });
  }
}