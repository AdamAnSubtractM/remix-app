import path from "path";
import fs from "fs/promises";
// import parseFrontMatter from "front-matter";

// relative to the server output not the source!
const dataPath = path.join(__dirname, "..", "app/data");
const isFile = /\./i;

export async function getData() {
  const dir = await fs.readdir(dataPath);
  return Promise.all(
    dir.map(async (item) => {
      if (isFile.test(item)) return;
      const subDirPath = path.join(dataPath, item);
      const subDir = await fs.readdir(subDirPath);
      const subDirContents = subDir.map(async (subItem) => {
        console.log({ subItem });
        const filePath = path.join(subDirPath, subItem);
        const file = await fs.readFile(filePath);
        // const jsonData = JSON.parse(file);
        // console.log({ jsonData });
        console.log({file})
        return { [subItem]: file };
      });
      return { [item]: subDirContents };
    })
  ).then((values) => {
    console.log({ values });
    return values;
  });
}
