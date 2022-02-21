import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ImageUploading from "react-images-uploading";
import {
  PhotoCamera,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const Form = ({ submit, data, edit }) => {
  const [form, setForm] = useState({ ...data });
  const [sku, setSku] = useState(false);
  const [images, setImages] = useState([...data.images]);

  const editorState = data.description
    ? EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(data.description))
      )
    : EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      ...form,
      description: form.description.value,
    };
    const saveProduct = await submit(product, images);
    if (saveProduct === "SKU Already Exists") setSku(true);
  };
  const onChange = (imageList) => {
    setImages(imageList);
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          variant="filled"
          label="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          defaultValue={form.name}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          variant="filled"
          label="SKU"
          disabled={edit}
          error={sku}
          helperText={sku ? "SKU Already Exists" : ""}
          focused={sku}
          defaultValue={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          variant="filled"
          label="price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          margin="normal"
          type="number"
          defaultValue={form.price}
          sx={{ marginBottom: "15px" }}
        />

        <Typography variant="body2">max file 2mb, max total 5 image</Typography>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={5}
          dataURLKey="data_url"
          maxFileSize={1000 * 1000 * 2}
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            dragProps,
            errors,
          }) => (
            <Box mb={3}>
              <Button
                onClick={onImageUpload}
                {...dragProps}
                size="large"
                variant="contained"
                endIcon={<PhotoCamera />}
                fullWidth
                color="success"
                sx={{ marginBottom: 2, borderRadius: 2 }}
              >
                Images
              </Button>
              <Grid container spacing={2}>
                {imageList.map((image, i) => (
                  <Grid item key={i}>
                    <img src={image["data_url"]} alt="" height="100px" />
                    <Box>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => onImageUpdate(i)}
                        title="Update"
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => onImageRemove(i)}
                        title="Update"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </ImageUploading>

        <Editor
          editorStyle={{
            backgroundColor: "#f5f6f9",
            border: "1px solid#eee",
            marginBottom: "17px",
            padding: "7px 17px 7px 17px",
            lineHeight: "27px",
          }}
          editorState={description}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        />
        <textarea
          style={{ display: "none" }}
          disabled
          ref={(val) => (form.description = val)}
          value={draftToHtml(convertToRaw(description.getCurrentContent()))}
        />

        <Button
          type="submit"
          sx={{ borderRadius: 2 }}
          variant="contained"
          fullWidth
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

Form.propTypes = {
  data: PropTypes.object,
  edit: PropTypes.bool,
};

Form.defaultProps = {
  data: { name: "", sku: "", price: 0, description: false, images: [] },
  edit: false,
};
export default Form;
