# Tiez - Event Ticket Booking App

A modern React application for booking event tickets with a multi-step form process and persistent state management.

## Features

- Multi-step ticket booking process
- Persistent form data across page reloads
- Profile photo upload capability
- Real-time form validation
- Responsive design with dark mode
- Downloadable ticket generation

## Tech Stack

- React
- Formik for form management
- Yup for form validation
- Tailwind CSS for styling
- React Dropzone for file uploads
- LocalStorage for data persistence

## Installation

1. Clone the repository:

```bash
git clone https://github.com/PascalAmah/HNG12-Task-2-Ticket-Generator.git
cd tiez-ticket-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Usage

The application follows a 3-step ticket booking process:

1. **Ticket Selection**: Choose between Regular, VIP, or VVIP tickets
2. **Attendee Details**: Enter personal information and upload a profile photo
3. **Review & Submit**: Verify information and generate ticket

## Required Environment Variables

Create a `.env` file in the root directory:

```
VITE_APP_TITLE=Tiez Ticket Booking
VITE_CLOUDINARY_URL=your_cloudinary_url
```

## Folder Structure

```
src/
├── components/
│   ├── AttendeeDetails.jsx
│   ├── Header.jsx
│   ├── ReviewSubmit.jsx
│   ├── TicketCard.jsx
│   └── TicketSelection.jsx
├── App.jsx
└── main.jsx
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
