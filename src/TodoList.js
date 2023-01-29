import React, { useState, useEffect } from 'react';

const App = () => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const [text, setText] = useState('');
  const [editItem, setEditItem] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    if (editItem) {
      const newItems = items.map(item => {
        if (item.id === editItem.id) {
          return {
            ...item,
            text
          };
        }
        return item;
      });
      setItems(newItems);
      setEditItem(null);
    } else {
      setItems([...items, { id: Date.now(), text }]);
    }
    setText('');
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setText(item.text);
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Dodaj zadanie do wykonania"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="button">
          {editItem ? 'Zaktualizuj' : 'Dodaj'}
        </button>
      </form>
      <ul className="list">
        {items.map(item => (
          <li key={item.id} className="list-item">
            {item.text}
            <button className="edit-button" onClick={() => handleEdit(item)}>
						<i class="fas fa-edit"></i>
            </button>
            <button className="delete-button" onClick={() => handleDelete(item.id)}>
						<i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
