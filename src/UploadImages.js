import React from "react";

function Upload() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const files = event.target.files[0];
  //   const url =
  //     "https://fanvue-intervue.s3-eu-west-1.amazonaws.com/files.name}";
  //   fetch(url, {
  //     method: "PUT",
  //     body: {
  //       file: files,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <form>
      <label>Upload File;</label>
      <button type="submit">Upload</button>
    </form>
  );
}

export default Upload;

//  <input type="file" onChange={handleSubmit} />
