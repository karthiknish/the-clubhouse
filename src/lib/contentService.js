import { promises as fs } from "fs";
import path from "path";

const contentFilePath = path.join(process.cwd(), "src", "data", "pageContent.json");

export async function getPageContent() {
  const fileContents = await fs.readFile(contentFilePath, "utf-8");
  return JSON.parse(fileContents);
}

export async function savePageContent(updatedContent) {
  const serialised = JSON.stringify(updatedContent, null, 2);
  await fs.writeFile(contentFilePath, serialised, "utf-8");
}
