import axios from "axios";

export function Create(
  ProductName,
  ProductCode,
  Img,
  UnitPrice,
  Qty,
  TotalPrice
) {
  let URL = "https://mern-crud-app-omega.vercel.app/api/v1/create-product";
  let PostBody = {
    ProductName: ProductName,
    ProductCode: ProductCode,
    Img: Img,
    UnitPrice: UnitPrice,
    Qty: Qty,
    TotalPrice: TotalPrice,
  };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function Read() {
  let URL = "https://mern-crud-app-omega.vercel.app/api/v1/read-product";
  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        return res.data["data"];
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function ReadById(id) {
  let URL = "https://mern-crud-app-omega.vercel.app/api/v1/read-product-by-id/"+id;
  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        return res.data["data"];
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function Update(id, ProductName, ProductCode, Img, UnitPrice, Qty, TotalPrice) {
  let URL = "https://mern-crud-app-omega.vercel.app/api/v1/update-product/"+id;
  let PostBody = {
    ProductName: ProductName,
    ProductCode: ProductCode,
    Img: Img,
    UnitPrice: UnitPrice,
    Qty: Qty,
    TotalPrice: TotalPrice,
  };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function Delete(id) {
  let URL = "https://mern-crud-app-omega.vercel.app/api/v1/delete-product/" + id;
  return axios
    .delete(URL)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
