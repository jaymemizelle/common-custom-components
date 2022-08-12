import React from "react";

function DragAndDrop() {
  const [dragItem, setDragItem] = useState(null);
  const [list, setList] = useState([
    "The Call Of Ktulu",
    "For Whom The Bell Tolls",
    "The Day That Never Comes",
    "The Memory Remains",
    "Confusion",
    "Moth Into Flame",
    "The Outlaw Torn",
    "No Leaf Clover",
    "Halo on Fire",
  ]);

  const handleDragStart = (index) => {
    setDragItem(index);
  };

  const handleDragEnter = (e, index) => {
    e.target.style.opactiy = "0.5";
    const newList = [...list];
    const item = newList[dragItem];
    newList.splice(dragItem, 1);
    newList.splice(index, 0, item);
    setDragItem(index);
    setList(newList);
  };

  const handleDragLeave = (e) => {
    e.target.style.opactiy = "0.5";
  };

  const handleDrop = (e) => {
    e.target.style.opactiy = "1";
  };

  return (
    <div>
      <h2>DragAndDrop</h2>
      <ul className="dnd">
        {list &&
          list.map((item, index) => (
            <li
              draggable
              key={index}
              onDragStart={() => handleDragStart(index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handleDrop(e)}
              onDragOver={(e) => e.preventDefault()}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DragAndDrop;
