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
    <div className="bg-gray-200 p-4">
      {items.map((item) => {
        const { id, title, description } = item;
        const isChecked = checkedItems.includes(id);
        return (
          <article key={id} className={`todo-item ${isChecked ? 'checked' : ''}`}>
            <p className="inline-block mb-0 text-gray-500 transition-colors hover:text-gray-700">{title}</p>
            <p className="inline-block mb-1 m-0">{description}</p>
            <div className="flex space-x-2">
              {/* ... */}
              <Button
                type="button"
                className="text-dark-yellow hover:text-main-yellow bg-transparent border-transparent cursor-pointer text-xs m-0.15 transition"
                onClick={() => editItem(id)}
                icon={<EditOutlined className="w-full h-full" />}
              />
              <Button
                type="button"
                className="m-0.1 hover:text-main-grey"
                onClick={() => handleCompleteTask(id)}
                icon={<CheckOutlined className="w-full h-full" />}
              />
              <Button
                type="button"
                className="m-0.1 hover:text-main-grey"
                onClick={() => viewHistory(id)}
                icon={<HistoryOutlined className="w-full h-full" />}
              />
              <Button
                type="button"
                className="text-main-red hover:text-dark-red bg-transparent border-transparent cursor-pointer text-xs m-0 mr-0 ml-0 transition"
                onClick={() => removeItem(id)}
                icon={<DeleteOutlined className="w-full h-full" />}
              />

            </div>

          </article>
        );
      })}
    </div>
  );
}

export default ToDo;
