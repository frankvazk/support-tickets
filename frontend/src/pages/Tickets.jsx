import React, { useEffect } from "react";
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import { toast } from "react-toastify";
import TicketItem from "../components/TicketItem";

const Tickets = () => {
  const { tickets, isError, message, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate("/"); //When this get executed, willUnmountComponent will be fired too
    }

    // This function executes when
    // willUnmountComponent gets fired
    return () => {
      console.log(isSuccess);
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isError, isSuccess, message, dispatch, navigate]);

  const onClick = () => {
    dispatch(reset());
    navigate("/new-ticket");
  };
  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Your Tickets</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <button className="btn" onClick={onClick}>
            <FaQuestionCircle /> Create a ticket
          </button>
        </div>
      </section>
      {isLoading && <h3>Fetching tickets...</h3>}
      {!isLoading && (
        <div className="tickets">
          <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
          </div>
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </>
  );
};

export default Tickets;
