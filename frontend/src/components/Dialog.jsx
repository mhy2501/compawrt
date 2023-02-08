import "./Dialog.css";

function Dialog({ message, onDialog }) {
  return (
    <div className="modalBackground" onClick={() => onDialog(false)}>
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <div className="title">
          <h3>Delete Report?</h3>
          <hr />
        </div>

        <div className="body">
          <p>{message}</p>
        </div>
        <hr />
        <div className="footer">
          <button
            onClick={() => {
              onDialog(false);
            }}
            className="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDialog(true);
            }}
            className="deleteBtn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;
