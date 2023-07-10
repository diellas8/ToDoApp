import { Button } from 'antd';
import { useState } from 'react';
import { EditOutlined, CheckOutlined, HistoryOutlined, DeleteOutlined } from '@ant-design/icons';


function ToDo({ items, removeItem, editItem, completeTask, viewHistory }) {
  const [checkedItems, setCheckedItems] = useState([]);
  const handleCompleteTask = (id) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((itemId) => itemId !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };
  return (
    <div className="todo-task">
      {items.map((item) => {
        const { id, title, description } = item;
        const isChecked = checkedItems.includes(id);
        return (

          <article key={id} className={`todo-item ${isChecked ? 'checked' : ''}`}>
            <p className="title">{title}</p>
            <p className="description">{description}</p>

            <div className="btn-container">
              {/* ... */}
              <Button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
                icon={<EditOutlined className="icons" />}
              />
              <Button
                type="button"
                className="complete-btn"
                onClick={() => handleCompleteTask(id)}

                icon={<CheckOutlined className="icons" />}
              />
              <Button
                type="button"
                className="history-btn"
                onClick={() => viewHistory(id)}
                icon={<HistoryOutlined className="icons" />}
              />
              <Button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
                icon={<DeleteOutlined className="icons" />}
              />
            </div>

          </article>
        );
      })}
    </div>
  );
}

export default ToDo;
