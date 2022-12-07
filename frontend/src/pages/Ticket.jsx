import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getTicket, updateTicket } from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";

const Ticket = () => {
  const { ticket, isSuccess, message, isError, isLoading, isSaving } =
    useSelector((state) => state.ticket);
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
    } else {
      navigate(-1);
    }
  }, [dispatch, navigate, id]);

  if (isLoading) {
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
