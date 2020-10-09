import React, { useState } from "react";
import { parseString } from "xml2js";

function Upload() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const files = event.target.files[0];
    console.log("files", files);
    fetch("https://fanvue-intervue.s3-eu-west-1.amazonaws.com/files.name", {
      method: "PUT",
      body: {
        file: files,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form>
      <label>
        Upload File;
        <input type="file" onChange={handleSubmit} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}

const Image = ({ url }) => {
  return (
    <div>
      <img src={url} alt="Sorry! Not here" />
    </div>
  );
};

const ImageContainer = ({ images }) => {
  return (
    <div>
      {images.map((image, index) => (
        <Image
          url={`https://fanvue-intervue.s3-eu-west-1.amazonaws.com/${image.Key}`}
          key={index}
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
