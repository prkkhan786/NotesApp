import React from "react";
import icons from "glyphicons";

export default function TodoList(props) {
  const { items, onEdithandler ,onDeleteHandler} = props;
  if (items.length === 0) {
    return (
      <div className="App" style={{ position: "relative", top: "50%" }}>
        No Notes.
      </div>
    );
  }
  return (
    <React.Fragment>
      {/* <div style={{ display: "inline-flex", marginBottom: "1%" }}>Notes </div> */}
      <h1 className="App">Notes</h1>
      <table className="table sortable" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Title</th>
            <th>Date</th>
            <th>Edit Note</th>
            <th>Delete Note</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => onEdithandler(item) && this.focus()}
                  style={{ marginLeft: "2%", height: "22px" }}
                  title="Edit Note"
                >
                  {" "}
                  <span style={{ position: "relative", bottom: "8px" }}>
                    {icons.edit}
                  </span>
                </button>
              </td>

              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteHandler(item)}
                  style={{ marginLeft: "2%", height: "22px" }}
                  title="Delete Note"
                >
                  {" "}
                  <span style={{ position: "relative", bottom: "8px" }}>
                    {icons.edit}
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
