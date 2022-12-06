import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getTicket, reset } from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";

const Ticket = () => {
  const { ticket, isSuccess, message, isError, isLoading } = useSelector(
    (state) => state.ticket
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, isError, message, ticket, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getTicket(id));
    } else {
      navigate(-1);
    }
  }, [dispatch, navigate, id]);

  return (
    <>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && ticket && (
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
              <hr />
              <div className="ticket-desc">
                <h3>Description of issue:</h3>
                <p>{ticket.description}</p>
              </div>
            </header>
          </div>
        </>
      )}
    </>
  );
};

export default Ticket;
