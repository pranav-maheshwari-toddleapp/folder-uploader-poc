import React, { useEffect, useRef, useState } from "react";
import JSZip from "jszip";
import throttle from "lodash.throttle";
import { saveAs } from "file-saver";

export default function ZipFolder() {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(-1);
  const [files, setFiles] = useState([]);

  const onZipUpdate = (metadata) => {
    setProgress(metadata.percent);
    console.log("progression: " + metadata.percent.toFixed(2) + " %");
    if (metadata.currentFile) {
      console.log("current file = " + metadata.currentFile);
    }
  };
  const throttledZipUpdate = throttle(onZipUpdate, 50);

  const onZip = () => {
    const zip = new JSZip();
    const newFiles = Array.from(inputRef.current.files);

    newFiles.forEach((file) => {
      zip.file(file.webkitRelativePath, file);
    });
    setFiles(newFiles);
    zip
      .generateAsync({ type: "blob" }, throttledZipUpdate)
      .then(function (content) {
        console.log("inside then");
        saveAs(content, "files.zip");

        const formData = new FormData();
        formData.append("folderzip", content);
        console.log("ready to send to server", content);
      })
      .catch((e) => console.log(e));
    console.log({ zip });
  };

  const handleFolderUpload = ({ target }) => {
    setFiles(target?.files);
  };

  useEffect(() => console.log({ files }), [files]);
  return (
    <div>
      <u>Folder upload and zip it: </u>
      <br />
      <br />
      <input
        ref={inputRef}
        type="file"
        onChange={handleFolderUpload}
        webkitdirectory="true"
      />
      {files.length && (
        <div>
          <div>
            <button onClick={onZip}>zip {files.length} files</button>
          </div>
          <progress max="100" value={progress}>
            {progress?.toFixed(2)}%{" "}
          </progress>
          <h3>Selected Files</h3>
          {Array.isArray(files) &&
            files?.map((file) => (
              <div key={file.webkitRelativePath}>{file.webkitRelativePath}</div>
            ))}
        </div>
      )}
    </div>
  );
}
