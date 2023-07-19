import { ChangeEvent, useEffect, useState } from "react";
import { Task } from "../../models";

interface TaskEditorProps {
  task: Task | undefined;
  onCreateOrUpdate: (task: Task) => void;
  onClear: () => void;
}

export const TaskEditor = ({
  task,
  onCreateOrUpdate,
  onClear,
}: TaskEditorProps) => {
  const [description, setDescription] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    if (!task) {
      clearData();
      return;
    }

    setDescription(task.description);
    setAssignee(task.assignee);
    setStatus(task.status);
    setPriority(task.priority.toString());
    setDueDate(task.dueDate.toISOString().substr(0, 10));
  }, [task]);

  const validateForm = () => {
    if (!description) {
      return false;
    }

    return true;
  };

  const handleCreate = () => {
    if (!validateForm()) {
      return;
    }
    const newTask: Task = {
      id: task?.id ?? 0,
      assignee,
      description,
      priority: +priority ?? 0,
      status,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
    };
    onCreateOrUpdate(newTask);
    handleClear();
  };

  const clearData = () => {
    setDescription("");
    setAssignee("");
    setStatus("");
    setPriority("" as any);
    setDueDate("");
  };

  const handleClear = () => {
    clearData();

    onClear();
  };

  return (
    <div>
      <div className="task-editor">Task Editor</div>
      <br />
      <form className="form-style">
        <div>
          <label>Description:</label>
          <input
            className="field"
            type="text"
            id="field1"
            name="description"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label>Assignee:</label>
          <input
            className="field"
            type="text"
            id="field2"
            name="assignee"
            required
            value={assignee}
            onChange={(event) => setAssignee(event.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            className="field"
            type="text"
            id="field3"
            name="status"
            required
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
        </div>
        <div>
          <label>Priority:</label>
          <input
            className="field"
            type="number"
            id="field4"
            name="priority"
            required
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            className="field"
            type="date"
            id="field5"
            name="dueDate"
            required
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>
      </form>
      <div className="buttons">
        <button className="saveButton" onClick={handleCreate}>
          Save
        </button>
        <button className="clearButton" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};
