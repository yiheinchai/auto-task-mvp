function Task(props: any) {
  const task = props.task;
  return (
    <div className="task">
        <input type="checkbox" className="task-checkbox"></input>
        <label className="task-label">{task.name}</label>
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
        <button className="add-subtask-button">Add Subtask</button>
      <ul>

      </ul>
    </div>
  );
}

export default Task;
