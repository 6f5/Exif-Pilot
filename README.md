# Exif-Pilot

Exif Pilot makes it easy to read, add, and update EXIF metadata in images with a simple and flexible API.

## Features

- Read EXIF metadata from popular image formats (e.g., JPEG, PNG).
- Add new EXIF tags to images.
- Update existing EXIF metadata.
- Lightweight and easy-to-use API.

## Installation

Install ExifPilot via NPM:

```bash
npm install exif-pilot
```

## Usage

### 1. Reading EXIF Metadata

Use ExifPilot to extract EXIF metadata from an image file.

```js
const exifPilot = require("exif-pilot");

// Load an image file
const exifData = await exifPilot.read("path/to/image.jpg");

console.log(exifData);
```

### 2. Adding EXIF Metadata

Add new EXIF metadata to an image file.

```js
const exifPilot = require("exif-pilot");

await exifPilot.add("path/to/image.jpg", {
  Artist: "John Doe",
  Copyright: "2024 John Doe",
});
```

### 3. Updating EXIF Metadata

Modify existing EXIF metadata.

```js
const exifPilot = require("exif-pilot");

await exifPilot.update("path/to/image.jpg", {
  Artist: "Jane Doe",
  DateTimeOriginal: "2024:09:01 12:34:56",
});
```

### 4. Strip EXIF Metadata

Remove existing EXIF metadata.

```js
const exifPilot = require("exif-pilot");

const tagsToKeep = ["Artist"];
await exifPilot.strip("path/to/image.jpg", {
  retain: tagsToKeep,
});
```

### 5. Delete EXIF Tags

To delete a tag, use `null` as the value.

```js
const exifPilot = require("exif-pilot");

await exifPilot.write("path/to/image.jpg", {
  UserComment: null,
});
```

## API

### `read(filePath)`

- **Description**: Reads the metadata from the specified image file.
- **Parameters**:
  - `filePath` (string): The path to the image file.
- **Returns**: A promise that resolves with the file metadata as a JavaScript object.
- **Example**:
  ```javascript
  const exifData = await exifPilot.read("path/to/image.jpg");
  console.log(exifData);
  write(filePath, metadata);
  ```

### `write(filePath, metadata)`

- **Description**: Writes metadata to the specified image file.
- **Parameters**:
  - `filePath` (string): The path to the image file.
  - `metadata` (object): The EXIF metadata to be written. You can pass specific tags, such as `AllDates`, which will write to the common EXIF date/time tags like `DateTimeOriginal`, `CreateDate`, and `ModifyDate`.
- **Returns**: A promise that resolves with the write operation result, which includes the number of files created, updated, and any warnings.
- **Example**:

  ```javascript
  const result = await exifPilot.write("path/to/image.jpg", {
    Artist: "John Doe",
    AllDates: "2024:09:02 12:34:56",
  });
  console.log(result);
  ```

  ### `strip(filePath, retain = [])`

- **Description**: Writes metadata to the specified image file.
- **Parameters**:
  - `filePath` (string): The path to the image file.
  - `retain` (string[]): An optional array of tags to retain in the file.
- **Returns**: A promise that resolves with the write operation result, indicating the changes made to the file.
- **Example**:

  ```javascript
  const result = await exifPilot.strip("path/to/image.jpg", [
    "Artist",
  ]);
  console.log(result);
  ```

  ### `end()`

- **Description**: Shuts down the underlying EXIF tool process. After calling this, no further operations can be performed until the tool is restarted.
- **Parameters**: None
- **Returns**: A promise that resolves once the tool has been shut down.
- **Example**:

  ```javascript
  await exifPilot.end();
  ```

  ### `restart()`

- **Description**: Restarts the EXIF tool with the previously passed options. This can be used to restart the tool after it has been shut down.
- **Parameters**: None
- **Returns**: A promise that resolves once the tool has been restarted.
- **Example**:

  ```javascript
  await exifPilot.restart();
  ```

## Supported Formats

### Image Formats

- JPEG
- TIFF
- PNG
- GIF
- BMP
- RAW formats (CR2, NEF, ARW, etc.)

### Video Formats

- MP4
- AVI
- MOV
- MKV

### Audio Formats

- MP3
- WAV
- FLAC
- AAC

### Document Formats

- PDF
- DOCX
- XLSX
- RTF

### Other Formats

- HTML
- XML
- EPUB
- ZIP

### Metadata Types

- **EXIF**: Exchangeable Image File Format
- **IPTC**: International Press Telecommunications Council
- **XMP**: Extensible Metadata Platform
- **MakerNotes**: Camera-specific metadata

For more detailed information on supported tags and formats, refer to the official [ExifTool documentation](https://exiftool.org/).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas or report bugs.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

Exif Pilot is built to make working with EXIF metadata as seamless as possible. If you find this library helpful, please consider contributing or starring the repository!
