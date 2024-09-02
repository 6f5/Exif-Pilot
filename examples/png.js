import ExifPilot from "../dist/index.esm.js";
import { fileURLToPath } from "node:url";

const options = {
  overwriteOriginal: true,
};

const exifPilot = new ExifPilot(options);

const filePath =
  fileURLToPath(new URL(".", import.meta.url)) + "./example.png";

async function main() {
  // Read file metadata
  const metadata = await exifPilot.read(filePath);
  console.log("File Metadata:", metadata);

  // Update file metadata
  const writeTaskResult = await exifPilot.write(filePath, {
    Copyright: "© 2024 Exif Pilot",
    AllDates: new Date().toISOString(),
  });

  console.log("Write Task Result:", writeTaskResult);

  // Read metadata again
  console.log(
    "File Metadata After Update:",
    await exifPilot.read(filePath),
  );

  // Close tool since we no longer need it
  exifPilot.end();
}

main();
