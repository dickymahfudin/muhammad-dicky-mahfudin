import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Container, Dialog, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import Product from "../component/Product";
import noimage from "../assets/noimage.jpg";
import ProductStore from "../utils/ProductStore";
import Form from "../component/Form";

const ProductPage = observer(() => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (ProductStore.page === 0) {
      ProductStore.next();
    }
  }, []);

  const addProduct = async (product, images) => {
    const add = await ProductStore.add(product, images);
    if (add !== "SKU Already Exists") setOpen(false);

    return add;
  };

  return (
    <>
      <InfiniteScroll
        dataLength={ProductStore.products.length}
        next={() => ProductStore.next()}
        hasMore={ProductStore.more}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Done</b>
          </p>
        }
      >
        <Container>
          <Box mt={5} mb={5}>
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ marginBottom: 3, borderRadius: 2 }}
            >
              Tambah Data
            </Button>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {ProductStore.products &&
                ProductStore.products.map((el, i) => (
                  <Product
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    image={el.image?.url ?? noimage}
                    price={el.price}
                  />
                ))}
            </Grid>
          </Box>
        </Container>
      </InfiniteScroll>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Form submit={(product, images) => addProduct(product, images)} />
      </Dialog>
    </>
  );
});

export default ProductPage;
