const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (req, res) {
  res.send("Hotel booking server.  Ask for /bookings, etc.");
});

// Create new booking
app.post("/bookings", function (req, res) {
  const newBooking = {
    id: bookings.length + 1,
    title: req.body.title,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    roomId: req.body.roomId,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
  };
  if (
    !newBooking.title ||
    !newBooking.name ||
    !newBooking.surname ||
    !newBooking.email ||
    !newBooking.roomId ||
    !newBooking.checkInDate ||
    !newBooking.checkOutDate
  ) {
    res.status(400).send("Please provide all required fields");
  }
  bookings.push(newBooking);

  res.send(bookings);
});

// Read one booking, specified by an ID
app.get("/bookings/:id", function (req, res) {
  const booking = bookings.find((booking) => booking.id === parseInt(req.params.id));
  if (!booking) {
    res.status(404).send("Booking not found");
  }
  res.send(booking);
});

// Delete a booking, specified by an ID
app.delete("/bookings/:id", function (req, res) {
  const booking = bookings.find((booking) => booking.id === parseInt(req.params.id));
  if (!booking) {
    res.status(404).send("Booking not found");
  }
  const index = bookings.indexOf(booking);
  bookings.splice(index, 1);
  res.send(bookings);
});

// Read all bookings
app.get("/bookings", function (req, res) {
  res.send(bookings);
});

// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT || 5001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
