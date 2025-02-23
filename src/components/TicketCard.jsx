/* eslint-disable react/prop-types */
import { useState } from "react";
import domtoimage from "dom-to-image";

const TicketCard = ({ formData, onReset }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadTicket = async () => {
    setIsDownloading(true);
    try {
      const ticketElement = document.querySelector(".ticket-container");

      if (!ticketElement) {
        throw new Error("Ticket element not found");
      }

      // Ensure all images are loaded
      await Promise.all(
        Array.from(ticketElement.querySelectorAll("img")).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) {
                resolve();
              } else {
                img.onload = resolve;
                img.onerror = resolve;
                const currentSrc = img.src;
                img.src =
                  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                setTimeout(() => {
                  img.src = currentSrc;
                }, 10);
              }
            })
        )
      );

      // Use PNG format with higher quality settings
      const dataUrl = await domtoimage.toPng(ticketElement, {
        quality: 1.0,
        scale: 3,
        style: {
          transform: "scale(1)",
        },
      });

      // Create a temporary image to force download completion
      const tempImg = new Image();
      tempImg.onload = () => {
        // Create canvas to draw the image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = tempImg.width;
        canvas.height = tempImg.height;
        ctx.drawImage(tempImg, 0, 0);

        const finalDataUrl = canvas.toDataURL("image/png");

        // Create proper download link
        const link = document.createElement("a");
        link.download = `techember-ticket-${formData.fullName
          .replace(/\s+/g, "-")
          .toLowerCase()}.png`;
        link.href = finalDataUrl;
        link.target = "_blank";

        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(finalDataUrl);
          setIsDownloading(false);
        }, 100);
      };

      tempImg.src = dataUrl;
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Failed to download ticket. Please try again.");
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Your Ticket is Booked!
      </h2>
      <p className="mb-8 text-white">
        Check your email for a copy or you can{" "}
        <span
          className="text-teal-400 cursor-pointer"
          onClick={downloadTicket}
          disabled={isDownloading}
        >
          download
        </span>
      </p>

      <div className="mb-8 relative">
        <div className="ticket-container relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/ticket-card.svg"
              alt="Ticket Background"
              className="w-[300px] h-[600px] mx-auto"
            />
          </div>

          {/* Ticket Content */}
          <div className="relative z-10 w-[300px] mx-auto">
            <div className="mx-auto w-[82%] h-[450px] border border-teal-500 rounded-2xl px-3 py-5 mt-5 mb-5 text-center">
              <h2 className="text-xl font-bold mb-4 text-white">
                Techember Fest &apos;25
              </h2>
              <p className="flex items-center text-xs justify-center gap-2 mb-2 text-white">
                <span className="text-red-500">📍</span> 04 Rumens road, Ikoyi,
                Lagos
              </p>
              <p className="flex items-center text-xs justify-center gap-2 text-white">
                <span>📅</span> March 15, 2025 | 7:00 PM
              </p>

              {/* Profile Image */}
              <div className="mt-6 mb-4">
                <div className="w-32 h-30 mx-auto rounded-lg overflow-hidden border-4 border-[#24A0B5]">
                  <img
                    src={formData.avatarUrl || "/avatar-placeholder.jpg"}
                    alt="Attendee"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Ticket Details Grid */}
              <div className="bg-[#24A0B533] px-2 py-3 rounded-lg">
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left">
                  <div>
                    <p className="text-xs text-gray-400">Name</p>
                    <div className="relative group">
                      <p
                        className="text-xs text-white truncate"
                        title={formData.fullName}
                      >
                        {formData.fullName}
                      </p>
                      <span className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-gray-900 text-white px-2 py-1 text-xs rounded whitespace-nowrap z-50 mb-1">
                        {formData.fullName}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <div className="relative group">
                      <p
                        className="text-xs text-white truncate"
                        title={formData.email}
                      >
                        {formData.email}
                      </p>
                      <span className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-gray-900 text-white px-2 py-1 text-xs rounded whitespace-nowrap z-50 mb-1">
                        {formData.email}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Ticket Type</p>
                    <p className="text-xs text-white">{formData.ticketType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Ticket for</p>
                    <p className="text-xs text-white">
                      {formData.ticketQuantity}
                    </p>
                  </div>
                </div>

                {/* Special Request */}
                {formData.specialRequest && (
                  <div className="mt-5 text-left max-w-md mx-auto">
                    <p className="text-xs text-gray-400">Special request</p>
                    <p className="text-xs text-white">
                      {formData.specialRequest}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Barcode Section */}
            <div className="p-6 text-center">
              <img
                src="/barcode.svg"
                alt="Ticket Barcode"
                className="max-w-[90%] h-16 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4 sm:gap-0">
        <button
          type="button"
          className="border border-[#24A0B5] text-teal-400 w-full sm:w-[300px] py-3 rounded-lg font-medium hover:bg-teal-900/20 transition-all order-2 sm:order-1"
          onClick={onReset}
        >
          Book Another Ticket
        </button>
        <button
          type="button"
          className="bg-teal-500 text-gray-900 w-full sm:w-[300px] py-3 rounded-lg font-medium hover:bg-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
          onClick={downloadTicket}
          disabled={isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download Ticket"}
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
