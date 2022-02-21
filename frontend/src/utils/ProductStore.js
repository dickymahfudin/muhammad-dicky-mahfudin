import axios from "axios";
import { makeAutoObservable, remove } from "mobx";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:3001",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  },
});

class ProductStore {
  products = [];
  page = 0;
  more = true;

  constructor() {
    makeAutoObservable(this);
  }
  async getList(page) {
    instance
      .get(`/product?page=${page}`)
      .then((res) => {
        const product = res.data.products;
        if (product.length) {
          this.products.push(...product);
          this.page += 1;
        } else {
          this.more = false;
        }
      })
      .catch((err) => {});
  }

  async next() {
    await this.getList(this.page + 1);
  }

  async detail(id) {
    return instance
      .get(`/product/${id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return false;
      });
  }

  async add(product, images) {
    const { name, sku, price, description } = product;
    return instance
      .post("/product", { name, sku, price, description })
      .then((res) => {
        const projectId = res.data.id;
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const formdata = new FormData();
          formdata.append("image", image.file);
          instance
            .post(`/product/${projectId}/image`, formdata, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              if (i === 0) {
                this.products.unshift({ ...res.data, image: response.data });
              }
            })
            .catch((err) => {
              return err.response.data.message;
            });
        }
        if (!images.length) this.products.unshift({ ...res.data });
        return res.data;
      })
      .catch((err) => {
        return err.response.data.message;
      });
  }

  async edit(id, before, product, images) {
    const { name, price, sku, description } = product;
    if (before.images.length) {
      before.images.forEach(async (el) => {
        const find = images.find((e) => e.id === el.id);
        if (!find) {
          await instance.delete(`/product/image/${el.id}`);
        } else {
          const index = images.indexOf(find || 0);
          if (index !== -1) images.splice(index, 1);
        }
      });
    }
    return instance
      .put(`/product/${id}`, { name, price, sku, description })
      .then((res) => {
        const projectId = res.data.id;
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const formdata = new FormData();
          formdata.append("image", image.file);
          instance
            .post(`/product/${projectId}/image`, formdata, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              return response.data;
            })
            .catch((err) => {
              return err.response.data.message;
            });
        }
        return res.data;
      })
      .catch((err) => {
        return err.response.data.message;
      });
  }

  async delete(id) {
    return instance
      .delete(`/product/${id}`)
      .then((res) => {
        const index = this.products.findIndex((el) => +el.id === +id);
        if (index !== -1) this.products.splice(index, 1);
        return res.data;
      })
      .catch((err) => {
        return err.response.data.message;
      });
  }
}

export default new ProductStore();
