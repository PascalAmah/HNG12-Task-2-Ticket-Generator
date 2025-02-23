import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedTickets = JSON.parse(
        localStorage.getItem("bookedTickets") || "[]"
      );
      setTickets(savedTickets.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error loading tickets:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteTicket = (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
      setTickets(updatedTickets);
      localStorage.setItem("bookedTickets", JSON.stringify(updatedTickets));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#041518] pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">Loading tickets...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#041518] pt-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Tickets</h1>
          <Link
            to="/"
            className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-teal-400 transition-all"
          >
            Book New Ticket
          </Link>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-12 bg-[#08252B] rounded-xl border border-[#0E464F]">
            <p className="text-gray-400 mb-4">No tickets booked yet.</p>
            <Link
              to="/"
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              Book your first ticket →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-[#08252B] border border-[#0E464F] rounded-xl p-6 relative group"
              >
                <button
                  onClick={() => handleDeleteTicket(ticket.id)}
                  className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
                  title="Delete ticket"
                >
                  <FiTrash2 size={20} />
                </button>

                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={ticket.avatarUrl || "/avatar-placeholder.jpg"}
                    alt="Attendee"
                    className="w-16 h-16 rounded-lg object-cover border-2 border-[#24A0B5]"
                  />
                  <div className="overflow-hidden">
                    <h3
                      className="text-white font-medium truncate"
                      title={ticket.fullName}
                    >
                      {ticket.fullName}
                    </h3>
                    <p
                      className="text-gray-400 text-sm truncate"
                      title={ticket.email}
                    >
                      {ticket.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ticket Type:</span>
                    <span className="text-white">{ticket.ticketType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quantity:</span>
                    <span className="text-white">{ticket.ticketQuantity}</span>
                  </div>
                  {ticket.specialRequest && (
                    <div className="mt-4">
                      <span className="text-gray-400 block mb-1">
                        Special Request:
                      </span>
                      <p className="text-white text-sm">
                        {ticket.specialRequest}
                      </p>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-4">
                    Booked on:{" "}
                    {new Date(ticket.bookingDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
