import React, { useEffect, useRef, useState } from "react";

import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const imageRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [fileValid, setFileValid] = useState(false);

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const uploadImageHandler = () => {
    imageRef.current.click();
  };

  const uploadedImageHandler = (event) => {
    let pickedFile;
    let fileValidity;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setFileValid(true);
      fileValidity = true;
    } else {
      setFileValid(false);
      fileValidity = false;
    }
    props.onInput(props.id, pickedFile, fileValidity);
  };

  return (
    <React.Fragment>
      <div className="form-control">
        <input id={props.id} style={{ display: "none" }} type="file" accept=".jpg,.png,.jpeg" ref={imageRef} onChange={uploadedImageHandler} />
        <div className={`image-upload ${props.center && "center"}`}>
          <div className="image-upload__preview">{previewUrl ? <img src={previewUrl} alt="preview" /> : <p>Please pick an image.</p>}</div>
          <Button type="button" onClick={uploadImageHandler}>
            UPLOAD IMAGE
          </Button>
        </div>
        {!fileValid && <p>{props.errorText}</p>}
      </div>
    </React.Fragment>
  );
};

export default ImageUpload;
