import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Addnoteform from "./components/Addnoteform";
import MyCalender from "./components/Calender";
import TodoList from "./components/TodoList";
import { sanitizeInput } from "./common/commonutills";
import { useAlert } from "react-alert";

function App() {
  const alert = useAlert();
  //****************************  states  ******************************

  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setdate] = useState(new Date());
  const [AllNotes, setAllnotes] = useState({});
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [currentSelected, setCurrentSelected] = useState("");
  const [classname, setClassname] = useState("col-sm-6 disable");

  //****************************  handlers  ******************************

  useEffect(() => {
    console.log("use effect ");

    const cacheData = localStorage.getItem("allnotes");
    if (cacheData) {
      const notesobject = JSON.parse(cacheData);
      setAllnotes(notesobject);
    }
  }, []);

  // only call this if Allnotes changes

  useEffect(() => {
    ondateChange(new Date());
    // eslint-disable-next-line
  }, [AllNotes]);

  const ondateChange = (date) => {
    console.log("on change date ");
    // console.log("date is ", date.toDateString());
    setdate(date);

    // console.log("all notes ->", AllNotes);
    const Notesdata = AllNotes[date.getDate().toString()];
    // console.log("notes data", Notesdata);
    if (Notesdata) {
      setItems(Notesdata);
    } else setItems([]);
  };
  //****************************  on change handlers  ******************************

  function onTitlechange(e) {
    setTitle(e.target.value);
  }

  function onContentchange(e) {
    setContent(e.target.value);
  }

  function onEditTitleChange(e) {
    setEditTitle(e.target.value);
  }
  function onEditContentChange(e) {
    setEditContent(e.target.value);
  }
  function ondiscartHandler(e) {
    e.preventDefault();
    setTitle("");
    setContent("");
  }
  function onEditDiscartHandler(e) {
    e.preventDefault();
    setEditTitle("");
    setEditContent("");
  }
  //****************************  on save and edit note handlers  ******************************

  function onSaveHandler(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title: title,
      content: content,
      date: date.toDateString(),
    };
    if (!sanitizeInput(title)) {
      alert.show("Please enter note title ");
      return;
    }
    var newitems = [...items];
    newitems.push(newItem);
    setItems(newitems);
    setTitle("");
    setContent("");
    var key = date.getDate().toString();
    AllNotes[key] = newitems;
    setAllnotes(AllNotes);
    localStorage.setItem("allnotes", JSON.stringify(AllNotes));
    // console.log(storage);
  }

  function onEditSavehandler(e) {
    e.preventDefault();
    const newItem = {
      id: currentSelected.id,
      title: editTitle,
      content: editContent,
      date: currentSelected.date,
    };

    if (!sanitizeInput(editTitle)) {
      alert.show("Please enter note title  ");
      return;
    }
    const selectedItem = items.find((ele) => ele.id === newItem.id);
    let index = items.indexOf(selectedItem);
    items[index] = newItem;
    const newitem = [...items];
    setItems(newitem);
    setEditTitle("");
    setEditContent("");
    var key = date.getDate().toString();
    AllNotes[key] = newitem;
    setAllnotes(AllNotes);
  }

  function onEdithandler(item) {
    setClassname("col-sm-6");
    const { content, title } = item;
    setEditContent(content);
    setEditTitle(title);
    setCurrentSelected(item);
    executeScroll();
  }

  function onDeleteHandler(item) {
    const newArray = items.filter((i) => item.id !== i.id);
    setItems(newArray);
    var key = date.getDate().toString();
    AllNotes[key] = newArray;
    setAllnotes(AllNotes);
    localStorage.setItem("allnotes", JSON.stringify(AllNotes));
  }

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  return (
    <div className="container">
      <div style={{ borderBottom: "1px solid black", marginBottom: "1.5%" }}>
        <h1 className="App">Notes App</h1>
      </div>
      <div className="row" style={{ height: "50%" }}>
        <div className="col-sm-6">
          <MyCalender date={date} onChange={ondateChange} />
        </div>
        <div
          className="col-sm-6 App"
          style={{ height: "20em", overflow: "scroll" }}
        >
          <TodoList
            items={items}
            onEdithandler={onEdithandler}
            onDeleteHandler={onDeleteHandler}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <Addnoteform
            type="Add New Note"
            title={title}
            content={content}
            onTitlechange={onTitlechange}
            onContentchange={onContentchange}
            onSavehandler={onSaveHandler}
            ondiscartHandler={ondiscartHandler}
          />
        </div>
        <div className={classname} ref={myRef}>
          <Addnoteform
            type="Edit Note"
            title={editTitle}
            content={editContent}
            onTitlechange={onEditTitleChange}
            onContentchange={onEditContentChange}
            onSavehandler={onEditSavehandler}
            ondiscartHandler={onEditDiscartHandler}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
