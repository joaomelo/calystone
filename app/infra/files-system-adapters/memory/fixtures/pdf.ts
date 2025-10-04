import { faker } from "@faker-js/faker";
import { jsPDF } from "jspdf";

import type { Id } from "@/domain";

import { createId } from "@/domain";
import { throwCritical } from "@/utils";

import type { FileFixture } from "./fixture";

export function createPdfFile(parentId: Id): FileFixture {
  const id = createId();
  const name = faker.system.commonFileName("pdf");
  const lastModified = faker.date.recent().getTime();

  const doc = new jsPDF();

  const textContent = faker.lorem.paragraphs({
    max: 5,
    min: 1
  });

  const textLines = doc.splitTextToSize(textContent, 180) as unknown;
  if (!Array.isArray(textLines)) throwCritical("FAILED_TO_CREATE_FAKE_PDF");
  if (textLines.every(line => typeof line !== "string")) throwCritical("FAILED_TO_CREATE_FAKE_PDF");

  doc.text(textLines, 15, 20);

  doc.setProperties({
    author: faker.person.fullName(),
    creator: "fake-pdf",
    keywords: faker.lorem.words(5),
    subject: faker.lorem.sentence(),
    title: faker.lorem.sentence()
  });

  const metadata = doc.output("arraybuffer");
  const size = metadata.byteLength;

  const options = {
    id,
    lastModified,
    name,
    parentId,
    size
  };

  return {
    metadata,
    options
  };
}
