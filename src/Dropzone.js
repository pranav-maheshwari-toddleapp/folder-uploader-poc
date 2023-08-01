import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FolderUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log({ acceptedFiles });
    setSelectedFiles(acceptedFiles);
  }, []);

  // const newFilesEvent = (event) => {
  //   console.log({ event });
  // };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    webkitdirectory: true,
    mozdirectory: true,
    directory: true,
    // getFilesFromEvent: newFilesEvent,
  });

  const handleUpload = () => {
    // Process the selectedFiles array, e.g., upload files to a server, process them, etc.
    // You can use the 'FormData' API or other libraries like 'axios' to handle the file upload process.
    // Example using FormData:
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files[]", file));
  };

  console.log({ rootProps: getRootProps(), inputProps: getInputProps() });

  return (
    <div>
      <u>React dropzone:</u>
      <br />
      <br />
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #aaa",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input
          webkitdirectory=""
          mozdirectory=""
          directory=""
          {...getInputProps()}
        />
        <p>Drag and drop files here, or click to select files</p>
      </div>
      <button onClick={handleUpload}>Upload</button>
      <div>
        {/* Display the selected file names */}
        {selectedFiles.map((file, index) => (
          <div key={index}>{file.name}</div>
        ))}
      </div>
    </div>
  );
};

export default FolderUpload;
