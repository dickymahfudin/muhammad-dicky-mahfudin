import {
  Box,
  Container,
  Dialog,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import RpFormat from "../utils/RpFormat";
import noimage from "../assets/noimage.jpg";
import ProductStore from "../utils/ProductStore";
import Form from "../component/Form";

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false);
  const getData = async () => {
    const getDetail = await ProductStore.detail(id);
    if (!getDetail) return navigate("/");
    setDetail(getDetail.data);
  };
  const editProduct = async (product, images) => {
    const editProduct = await ProductStore.edit(id, detail, product, images);
    if (editProduct) {
      setOpen(false);
      ProductStore.page = 0;
      ProductStore.products = [];
      ProductStore.next();
      return getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Paper sx={{ marginTop: "30px", padding: "30px", borderRadius: 5 }}>
        <Box mb={2}>
          <Button
            sx={{ marginRight: 1, borderRadius: 2 }}
            variant="contained"
            title="Edit Product"
            startIcon={<EditIcon />}
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
          <Button
            sx={{ borderRadius: 2 }}
            color="warning"
            variant="contained"
            title="Delete Product"
            startIcon={<DeleteIcon />}
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm("Are you sure you want to delete this item?")) {
                ProductStore.delete(id);
                navigate("/");
              }
            }}
          >
            Delete
          </Button>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item md={4} sm={4} xs={12}>
            <Carousel autoPlay={false} fullHeightHover={true}>
              {detail.images?.length ? (
                detail.images.map((el, i) => (
                  <Box display="flex" key={i} justifyContent="center">
                    <img alt="noimage" src={el.url} height="300" />
                  </Box>
                ))
              ) : (
                <Box display="flex" justifyContent="center">
                  <img alt="noimage" src={noimage} height="300" />
                </Box>
              )}
            </Carousel>
          </Grid>
          <Grid item md={8} sm={4} xs={12}>
            <Typography variant="h6">{detail.name}</Typography>
            <Typography variant="body2" mb={2}>
              SKU:{detail.sku}
            </Typography>
            <Typography variant="h5" mb={2}>
              {RpFormat(detail.price)}
            </Typography>
            <Divider sx={{ marginBottom: "5px" }} />
            <Typography variant="h6">Description</Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: detail.description }}
            />
            <Divider />
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Form
          submit={(product, images) => editProduct(product, images)}
          data={detail}
          edit={true}
        />
      </Dialog>
    </Container>
  );
};

export default DetailPage;
