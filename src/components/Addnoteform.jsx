import React from "react";

export default function Addnoteform(props) {
  const {
    type,
    title,
    content,
    onTitlechange,
    onContentchange,
    onSavehandler,
    ondiscartHandler,
  } = props;

  return (
    <div>
      <h1 className="App"> {type}</h1>
      <form onSubmit={onSavehandler}>
        <div className="form-group">
          <label htmlFor="notetitle">Title</label>
          <input
            type="text"
            className="form-control"
            id="notetitle"
            value={title}
            onChange={onTitlechange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notecontent">Content</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={content}
            onChange={onContentchange}
          ></textarea>
        </div>
        <div
          className="form-group"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button type="submit" className="btn btn-primary" disabled={!title}>
            Save
          </button>
          <button
            disabled={!title}
            className="btn btn-danger"
            onClick={(e) => ondiscartHandler(e)}
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
}
