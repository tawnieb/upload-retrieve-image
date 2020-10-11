import React, { useState } from "react";
import { parseString } from "xml2js";
import "./App.css";

function Upload() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const files = event.target[0].files[0];
    console.log("files", files.name);
    fetch(`https://fanvue-intervue.s3-eu-west-1.amazonaws.com/${files.name}`, {
      method: "PUT",
      body: {
        file: files,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload File
        <input type="file" />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}

const ImageContainer = ({ images }) => {
  return (
    <div>
      {images.map((image, index) => (
        <img
          src={`https://fanvue-intervue.s3-eu-west-1.amazonaws.com/${image.Key}`}
          key={index}
          alt="Sorry!"
        />
      ))}
    </div>
  );
};

function App() {
  const [images, setImages] = useState([]);
  const handleClick = () => {
    fetch("https://fanvue-intervue.s3-eu-west-1.amazonaws.com/")
      .then((response) => response.text())
      .then((responseText) => {
        parseString(responseText, function (err, result) {
          setImages(result.ListBucketResult.Contents);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <Upload />
      <button onClick={handleClick}>Get Images</button>
      <ImageContainer images={images} />
    </div>
  );
}

export default App;
