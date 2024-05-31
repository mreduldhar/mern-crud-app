import React, { Fragment, useEffect, useRef } from "react";
import {
  ErrorToast,
  SuccessToast,
  isEmpty,
} from "../../helper/ValidationHelper";
import { ReadById, Update } from "./../../API/CRUDApi";
import FullScreenLoader from "../common/FullScreenLoader";
import { withRouter } from "react-router";

const UpdateForm = (props) => {
  let ProductName,
    ProductCode,
    Img,
    UnitPrice,
    Qty,
    TotalPrice,
    Loader = useRef();

  const updateData = () => {
    let Product_Name = ProductName.value;
    let Product_Code = ProductCode.value;
    let Product_Img = Img.value;
    let Unit_Price = UnitPrice.value;
    let Product_Qty = Qty.value;
    let Total_Price = TotalPrice.value;

    if (isEmpty(Product_Name)) {
      ErrorToast("Product Name is required");
    } else if (isEmpty(Product_Code)) {
      ErrorToast("Product Code is required");
    } else if (isEmpty(Product_Img)) {
      ErrorToast("Product Image is required");
    } else if (isEmpty(Unit_Price)) {
      ErrorToast("Unit Price is required");
    } else if (isEmpty(Product_Qty)) {
      ErrorToast("Product Qty is required");
    } else if (isEmpty(Total_Price)) {
      ErrorToast("Total Price is required");
    } else {
      Loader.classList.remove("d-none");
      Update(
        props.id,
        Product_Name,
        Product_Code,
        Product_Img,
        Unit_Price,
        Product_Qty,
        Total_Price
      ).then((result) => {
        Loader.classList.add("d-none");
        if (result === true) {
          SuccessToast("Data update Successfully");
          props.history.push("/");
        } else {
          ErrorToast("Request Fail, Try Again");
        }
      });
    }
  };

  useEffect(() => {
    ReadById(props.id).then((result) => {
      ProductName.value = result["ProductName"];
      ProductCode.value = result["ProductCode"];
      Img.value = result["Img"];
      UnitPrice.value = result["UnitPrice"];
      Qty.value = result["Qty"];
      TotalPrice.value = result["TotalPrice"];
    });
  });

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-header pb-0">
                <h4 className="animated fadeInDown">Update Product</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 p-2">
                    <label className="animated fadeInDown">Product Name</label>
                    <input
                      ref={(input) => (ProductName = input)}
                      type="text"
                      className="form-control animated fadeInDown"
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label className="animated fadeInDown">Product Code</label>
                    <input
                      ref={(input) => (ProductCode = input)}
                      type="text"
                      className="form-control animated fadeInDown"
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label className="animated fadeInDown">Image</label>
                    <input
                      ref={(input) => (Img = input)}
                      type="text"
                      className="form-control animated fadeInDown"
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label className="animated fadeInDown">Unit Price</label>
                    <input
                      ref={(input) => (UnitPrice = input)}
                      type="text"
                      className="form-control animated fadeInDown"
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label className="animated fadeInDown">Qty</label>
                    <input
                      ref={(input) => (Qty = input)}
                      type="text"
                      className="form-control animated fadeInDown"
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label className="animated fadeInDown">Total Price</label>
                    <input
                      ref={(input) => (TotalPrice = input)}
                      type="text"
                      className="form-control animated fadeInDown"
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4 p-2">
                    <button
                      onClick={updateData}
                      className="btn btn-success w-100"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-none" ref={(div) => (Loader = div)}>
        <FullScreenLoader />
      </div>
    </Fragment>
  );
};

export default withRouter(UpdateForm);
