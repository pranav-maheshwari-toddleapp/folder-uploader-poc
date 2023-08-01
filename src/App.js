import "./App.css";
import Dropzone from "./Dropzone";
import ZipFolder from "./ZipFolder";

function App() {
  const handleFileSelect = (event) => {
    const files = event.target.files;
    console.log({ files, target: event.target });
    for (const file of files) {
      const path = file.webkitRelativePath.split("/");
      path.pop();
      console.log(file.webkitRelativePath, path);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "inline-block" }}>
          <u>Only folder:</u> &nbsp;
          <input
            type="file"
            onChange={handleFileSelect}
            webkitdirectory=""
            mozdirectory=""
            directory=""
          />
        </div>

        <br />
        <div style={{ display: "inline-block" }}>
          <u>Only files:</u> &nbsp;
          <input type="file" onChange={handleFileSelect} />
        </div>
        <br />

        <Dropzone />

        <ZipFolder />
      </header>
    </div>
  );
}

export default App;
