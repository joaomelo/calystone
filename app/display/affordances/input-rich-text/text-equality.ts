export function areTextEqual(content: string, otherContent: string) {
  const normalizedContent = normalize(content);
  const normalizedOtherContent = normalize(otherContent);
  return normalizedContent === normalizedOtherContent;
}

function normalize(content: string) {
  return content.replace(/\r\n/g, "\n");
};