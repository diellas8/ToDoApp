import { useState, useEffect } from "react";
import Alert from "./Alert";
import "./App.css";
import ToDo from "./ToDo.js";
import image from "./todo-image.png";
import { Button, Modal } from "antd";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [completedList, setCompletedList] = useState(getLocalStorage());
  const [isModalVisible, setModalVisible] = useState(false);




  const handleDrop = (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    const targetId = "custom-drop-target"; // Provide a unique ID for the drop target
    const updatedItems = list.map((item) => {
      if (item.id === draggedId) {
        return { ...item, id: targetId };
      }
      return item;
    });
    setList(updatedItems);
  };


  // const fetchAPI = async () => {
  //   try {
  //     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //     const data = await response.json();
  //     const apiData = data.map((item) => ({
  //       id: item.id.toString(),
  //       title: item.title,
  //       description: item.body,
  //     }));
  //     setList(apiData);
  //   } catch (error) {
  //     console.log("Error fetching data from API:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) {
      showAlert(true, "danger", "please enter a task name");
    } else if (taskName && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: taskName, description: taskDescription };
          }
          return item;
        })
      );
      setTaskName("");
      setTaskDescription("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "new task added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: taskName,
        description: taskDescription,
      };
      setList([...list, newItem]);
      setTaskName("");
      setTaskDescription("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "task removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setTaskName(specificItem.title);
    setTaskDescription(specificItem.description);
  };

  const handleCompleteTask = (id) => {
    const completedTask = list.find((item) => item.id === id);
    const updatedList = list.filter((item) => item.id !== id);
    const { completed, ...incompleteTask } = completedTask;

    const updatedCompletedList = completed
      ? completedList.filter((item) => item.id !== id)
      : [...completedList, incompleteTask];

    setCompletedList(updatedCompletedList);
    setList(updatedList);
    showAlert(true, "success", "task completed");
  };

  const viewHistory = (id) => {
    const task = completedList.find((item) => item.id === id);
    if (task) {
      setSelectedTask(task);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("completedList", JSON.stringify(completedList));
  }, [list, completedList]);

  return (
    <>
      <div>
        <section className="section-center">
          <form className="todo-form" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            <div className="form-control">
              <input
                type="text"
                className="todo"
                placeholder="Title"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <input
                type="text"
                className="todo"
                placeholder="Description (optional)"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <Button type="primary" htmlType="Submit">
                {isEditing ? "Edit" : "Submit"}
              </Button>
            </div>
          </form>
          {list.length > 0 && (
            <div className="todo-container">
              <ToDo
                items={list}
                removeItem={removeItem}
                editItem={editItem}
                completeTask={handleCompleteTask}
                viewHistory={viewHistory}
              />
              <button className="clear-btn" onClick={clearList}>
                clear items
              </button>
            </div>
          )}
          {list.length === 0 && (
            <div className="img-container">
              <img src={image} className="image" alt="todoapp" />
            </div>
          )}
          <Modal
            title="Task Details"
            visible={isModalVisible}
            onCancel={closeModal}
            footer={null}
          >
            {selectedTask && (
              <>
                <h3>Title: {selectedTask.title}</h3>
                <p>Description: {selectedTask.description}</p>
              </>
            )}
          </Modal>
        </section>
      </div>
    </>
  );
}

export default App;
