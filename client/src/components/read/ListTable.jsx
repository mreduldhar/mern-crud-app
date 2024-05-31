import React, { useEffect, useState } from "react";
import { Delete, Read } from "../../API/CRUDApi";
import FullScreenLoader from "../common/FullScreenLoader";
import { SuccessToast } from "../../helper/ValidationHelper";
import { withRouter } from "react-router";
import Pagination from "react-bootstrap/Pagination";

const ListTable = (props) => {
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    Read().then((result) => {
      setDataList(result);
    });
  }, []);

  const deleteItem = (id) => {
    Delete(id).then((result) => {
      if (result === true) {
        SuccessToast("Item deleted successfully.");
        // refresh the list after deletion
        Read().then((result) => {
          setDataList(result);
          // adjust the current page if the last item of the last page is deleted
          if (
            currentPage > Math.ceil(result.length / itemsPerPage) &&
            currentPage > 1
          ) {
            setCurrentPage(currentPage - 1);
          }
        });
      } else {
        ErrorToast("Request failed, try again.");
      }
    });
  };

  const updateItem = (id) => {
    props.history.push("/update/" + id);
  };

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  const renderPaginationItems = () => {
    let items = [];
    for (
      let number = 1;
      number <= Math.ceil(dataList.length / itemsPerPage);
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handleClick(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

  if (dataList.length > 0) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-header pb-0">
                <h4 className="animated fadeInDown">Product List</h4>
              </div>
              <div className="card-body">
                <table className="table align-items-center">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7">
                        Product
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Unit Price
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-7">
                        Qty
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-7">
                        Total Price
                      </th>
                      <th className="text-center text-uppercase text-secondary opacity-7 text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => {
                      return (
                        <tr key={`${currentPage}-${index}`}>
                          <td>
                            <div className="d-flex justify-content-start align-items-center  animated fadeInUp px-2 py-1">
                              <div>
                                <img
                                  src={item.Img}
                                  className="avatar avatar-sm me-3"
                                  alt="user1"
                                />
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">
                                  {item.ProductName}
                                </h6>
                                <p className="text-xs text-secondary mb-0">
                                  {item.ProductCode}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center">
                              <h6 className="mb-0 animated fadeInUp text-sm">
                                {item.UnitPrice}
                              </h6>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center">
                              <h6 className="mb-0 animated fadeInUp text-sm">
                                {item.Qty}
                              </h6>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center">
                              <h6 className="mb-0 animated fadeInUp text-sm">
                                {item.TotalPrice}
                              </h6>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center">
                              <div
                                className="animated fadeInUp"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button
                                  onClick={deleteItem.bind(this, item._id)}
                                  className="btn btn-danger mx-1"
                                >
                                  <i className="fa fa-trash-alt" />
                                </button>
                                <button
                                  onClick={updateItem.bind(this, item._id)}
                                  className="btn  btn-success mx-0"
                                >
                                  <i className="fa fa-edit" />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Pagination className="justify-content-center">
                  {renderPaginationItems()}
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <FullScreenLoader />
      </div>
    );
  }
};

export default withRouter(ListTable);
