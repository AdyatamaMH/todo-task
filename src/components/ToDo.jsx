import React from 'react';

const ToDo = ({ tasks, filter, markDone, setUpdateData, deleteTask }) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.status;
    if (filter === 'done') return task.status;
    return false;
  });

  return (
    <>
      {filteredTasks.map((task, index) => (
        <div className="col taskBg" key={task.id}>
          <div className={task.status ? 'done' : ''}>
            <span className="taskNumber">{index + 1}</span>
            <span className="taskText">{task.title}</span>
          </div>
          <div className="iconsWrap">
            <button
              title="Mark as Done / Not Done"
              onClick={() => markDone(task.id)}
            >
              {task.status ? 'Not Done' : 'Done'}
            </button>
            {!task.status && (
              <button
                title="Edit"
                onClick={() =>
                  setUpdateData({
                    id: task.id,
                    title: task.title,
                    status: task.status ? true : false,
                  })
                }
              >
                Edit
              </button>
            )}
            <button title="Delete" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ToDo;
