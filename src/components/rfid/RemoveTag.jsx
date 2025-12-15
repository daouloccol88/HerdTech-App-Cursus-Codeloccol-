"use client";

const RemoveTag = ({ tag, animals, onClose, onDeleted }) => {
  const isUsed = animals.some((a) => a.RFIDTag === tag.label);

  const handleDelete = () => {
    if (isUsed) return;

    const tags = JSON.parse(localStorage.getItem("tags")) || [];
    localStorage.setItem(
      "tags",
      JSON.stringify(tags.filter((t) => t.id !== tag.id))
    );

    onDeleted();
    onClose();
  };

  return (
    <div className="modal fade show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header thm-bg-dark">
            <h5>Remove Tag</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body thm-bg">
            {isUsed ? (
              <div className="text-danger">
                This tag is assigned to animals and cannot be deleted.
              </div>
            ) : (
              <p>
                Are you sure you want to delete <b>{tag.label}</b>?
              </p>
            )}
          </div>

          <div className="modal-footer thm-bg-dark">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            {!isUsed && (
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveTag;
