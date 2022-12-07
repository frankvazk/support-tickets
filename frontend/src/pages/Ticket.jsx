import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { getTicket, updateTicket } from "../features/tickets/ticketSlice";
import { getNotes } from "../features/notes/noteSlice";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import { FaPlus } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const Ticket = () => {
  const [modal, setModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { ticket, isSuccess, message, isError, isLoading, isSaving } =
    useSelector((state) => state.ticket);
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onTicketClick = () => {
    dispatch(
      updateTicket({
        _id: ticket._id,
        product: ticket.product,
        description: ticket.description,
        status: "closed",
      })
    );
  };

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  const onSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  useEffect(() => {
    if (isSuccess && !isSaving) {
      toast.success("Ticket Closed");
      navigate("/tickets");
    }

    if (isError) {
      toast.error(message);
    }
  }, [isError, message, isSuccess, isSaving, navigate]);

  useEffect(() => {
    if (id) {
      dispatch(getTicket(id));
      dispatch(getNotes(id));
    } else {
      navigate(-1);
    }
  }, [dispatch, navigate, id]);

  if (isLoading || notesIsLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      {ticket && ticket._id === id && (
        <>
          <div className="ticket-page">
            <header className="ticket-header">
              <BackButton url="/tickets" />
              <h2>
                Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>
                  {ticket.status}
                </span>
              </h2>
              <h3>
                Date Submitted:{" "}
                {new Date(ticket.createdAt).toLocaleString("es-MX")}
              </h3>
              <h3>Product: {ticket.product}</h3>
              <hr />
              <div className="ticket-desc">
                <h3>Description of issue:</h3>
                <p>{ticket.description}</p>
              </div>
            </header>
            {ticket.status !== "closed" && (
              <button className="btn" onClick={openModal}>
                <FaPlus /> Add note
              </button>
            )}

            <Modal
              isOpen={modal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Add note"
            >
              <h2>Add Note</h2>
              <button className="btn-close" onClick={closeModal}>
                <CgClose />
              </button>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <textarea
                    name="noteText"
                    id="noteText"
                    className="form-control"
                    placeholder="Note text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </Modal>

            {notes.map((note) => (
              <NoteItem key={note._id} note={note} />
            ))}

            {ticket.status !== "closed" && (
              <button
                className="btn btn-block btn-danger"
                onClick={onTicketClick}
                disabled={isLoading}
              >
                {isSaving ? "Closing Ticket..." : "Close Ticket"}
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Ticket;
