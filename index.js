// import express from "express"
// import { createDbConnection } from "./db.js";

// const fs = require ("fs");
const express = require("express");

//initializing express server
const app = express();

//middleware
// app.use(express.json())

const data = [
  {
    id: "1",
    noOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "sumithra",
    date: "05-feb-2022 ",
    startTime: "10-feb-2022 at 12PM",
    endTrim: "11-feb-2022 at 11am",
    RoomId: 201,
    RoomName: "Duplex",
  },
  {
    id: "2",
    noOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTrim: "",
    RoomId: 202,
    RoomName: "Duplex",
  },
  {
    id: "3",
    noOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "sundar",
    date: "05-feb-2022 ",
    startTime: "10-feb-2022 at 12PM",
    endTrim: "11-feb-2022 at 11am",
    RoomId: 203,
    RoomName: "Duplex",
  },
  {
    id: "4",
    noOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "suresh",
    date: "05-feb-2022 ",
    startTime: "10-feb-2022 at 12PM",
    endTrim: "11-feb-2022 at 11am",
    RoomId: 204,
    RoomName: "Duplex",
  },
  {
    id: "5",
    noOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTrim: "",
    RoomId: 205,
    RoomName: "Duplex",
  },
  {
    id: "6",
    noOfSeats: 50,
    amenities: ["Ac", "chairs"],
    price: 2500,
    ifBooked: "true",
    customerName: "baskar",
    date: "05-feb-2022 ",
    startTime: "10-feb-2022 at 12PM",
    endTrim: "11-feb-2022 at 11am",
    RoomId: 206,
    RoomName: "Duplex",
  },
  {
    id: "7",
    noOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "karthik",
    date: "05-feb-2022 ",
    startTime: "10-feb-2022 at 12PM",
    endTrim: "11-feb-2022 at 11am",
    RoomId: 207,
    RoomName: "Duplex",
  },
  {
    id: "8",
    noOfSeats: 50,
    amenities: ["Ac", "chairs", "discolights"],
    price: 2500,
    ifBooked: "true",
    customerName: "chandru",
    date: "05-feb-2022 ",
    startTime: "10-feb-2022 at 12PM",
    endTrim: "11-feb-2022 at 11am",
    RoomId: 208,
    RoomName: "Duplex",
  },
  {
    id: "9",
    noOfSeats: 50,
    amenities: ["Ac", "chairs"],
    price: 2500,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTrim: "",
    RoomId: 209,
    RoomName: "Duplex",
  },

  {
    id: "10",
    noOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "vishnu",
    date: "05-feb-2022 ",
    startTime: "10-feb-2022 at 12PM",
    endTrim: "11-feb-2022 at 11am",
    RoomId: 210,
    RoomName: "Duplex",
  },

  {
    id: "11",
    noOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "vishnu",
    date: "05-feb-2022 ",
    startTime: "10-feb-2022 at 12PM",
    endTrim: "11-feb-2022 at 11am",
    RoomId: 211,
    RoomName: "Duplex",
  },

  {
    id: "12",
    noOfSeats: 50,
    amenities: ["Ac", "chairs"],
    price: 2000,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTrim: "",
    RoomId: 212,
    RoomName: "Duplex",
  },
];
//apis
app.get("/", (req, res) => {
  res.send("hey this is vp ");
});

app.get("/hall/details/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const specificHall = data.find((hall) => hall.id === id);
  res.send(specificHall);
});
//List all customers with booked data

app.get("/halldetails/rooms", (req, res) => {
  const { ifBooked } = req.query;
  console.log(ifBooked);
  let filteredHall = data;
  if (ifBooked) {
    filteredHall = filteredHall.filter((halls) => halls.ifBooked === ifBooked);
  }
});
//List all rooms with booked data

app.get("/halldetails/customer", (req, res) => {
  const { noOfSeats } = req.query;
  console.log(noOfSeats);
  let noOfSeats = data;
  if (noOfSeats) {
    filteredHall = filteredHall.filter(
      (halls) => halls.noOfSeats >= +noOfSeats
    );
  }
});
//post-----------------------------------------------

app.post("/hall/details/", (req, res) => {
  const newHall = {
    id: data.length + 1,
    noOfSeats: req.body.noOfSeats,
    amenities: req.body.amenities,
    price: req.body.price,
    ifBooked: "true",
    customerName: req.body.customerName,
    date: req.body.date,
    startTime: req.body.startTime,
    endTrim: req.body.endTrim,
    RoomId: req.body.RoomId,
    RoomName: req.body.RoomName,
  };
  console.log(req.body);
  data.push(newHall);
  res.send(newHall);
});
//put--------------------------------------------

app.put("/hall/details/:id", async (req, res) => {
  const { id } = req.params;
  const halls = data.find((hall) => hall.id === id);

  if (halls.ifBooked === "true") {
    res.status(400).send("hey hall is already booked");
  } else {
    halls.date = req.body.date;
    halls.startTime = req.body.startTime;
    halls.endTime = req.body.endTime;
    halls.customerName = req.body.customerName;
  }

  res.status(200).send(data);
});
app.listen(8000, () => console.log("server started"));
