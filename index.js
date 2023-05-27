
import { MongoClient} from "mongodb";

import express from "express"

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = "mongodb+srv://vishnupriya:vishnuvp28@vishnu.7ccelt3.mongodb.net/";
// const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // dial
await client.connect(); // call
console.log("Mongo is connected !!!  ");

//initializing express server
const app = express();

//middleware
app.use(express.json())

var home =
  "Hello all , Welcome to the HallBooking API 🙌😊 , 1) For halldetails = /hallDetails , 2) For hallDetails by ID = /hallDetails/643d67ad4e8e8cc0a599ca26 (OR) /hallDetails/643d67ad4e8e8cc0a599ca27 (OR) /hallDetails/643d67ad4e8e8cc0a599ca28 (OR) /hallDetails/643d67ad4e8e8cc0a599ca29 (OR) /hallDetails/643d67ad4e8e8cc0a599ca2a , 3) For rooms with booked data = /bookedHalls , 4) For customers with booked data = /bookedCustomers , 5) For number of times booked by a customer = /noOfTimes ";

//apis
app.get("/",async function (req, res) {
  const result=await client.db("guvi").collection("hallData").find({}).toArray()
  res.send(home);
});


// Hall details
app.get("/hallDetails", async function (req, res) {
  const result = await client
    .db("b42wd2")
    .collection("hallData")
    .find({})
    .toArray();
  res.send(result);
});

// Creating new hall
app.post("/createHall", async function (req, res) {
  const data = req.body;
  const result = await client
    .db("b42wd2")
    .collection("hallData")
    .insertMany(data);
  res.send(result);
});

// Get hall details by id
app.get("/hallDetails/:id", async function (req, res) {
  const { id } = req.params;
  const halls = await client
    .db("b42wd2")
    .collection("hallData")
    .find({_id: new ObjectId(id)})
    .toArray();
  halls ? res.send(halls) : res.status(404).send({ message: "Hall not found" });
});

// Booking a room
app.put("/hallBooking/:id", async function (req, res) {
  const { id } = req.params;
  const data = req.body;
  const hall = await client
    .db("b42wd2")
    .collection("hallData")
    .findOne({ _id: new ObjectId(id) })
  console.log(hall);
  if (hall.ifBooked === "true") {
    res.send({ message: "Hall already booked" });
  } else {
    const result = await client
      .db("b42wd2")
      .collection("hallData")
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
    res.send(result);
  }
});

// List all rooms with booked data
app.get("/bookedHalls", async function (req, res) {
  const result = await client
    .db("b42wd2")
    .collection("hallData")
    .find({ ifBooked: "true" })
    .project({
      id: 1,
      roomId: 1,
      roomName: 1,
      customerName: 1,
      amenities: 1,
      noOfSeats: 1,
      price: 1,
      bookingStatus: 1,
    })
    .toArray();
  res.send(result);
});

// List all customers with booked data
app.get("/bookedCustomers", async function (req, res) {
  const result = await client
    .db("b42wd2")
    .collection("hallData")
    .find({ ifBooked: "true" })
    .project({
      id: 1,
      customerName: 1,
      roomName: 1,
      date: 1,
      startTime: 1,
      endTime: 1,
    })
    .toArray();
  res.send(result);
});

// List how many times a customer has booked the room
app.get("/noOfTimes", async function (req, res) {
  const result = await client
    .db("b42wd2")
    .collection("hallData")
    .aggregate([
      { $group: { _id: "$customerName", count: { $sum: 1 } } },
      { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
    ])
    .toArray();
  console.log(result);
  const finalResult = await client
    .db("b42wd2")
    .collection("hallData")
    .find({ customerName: result[0]._id })
    .project({
      id: 1,
      customerName: 1,
      roomName: 1,
      date: 1,
      startTime: 1,
      endTime: 1,
      bookingStatus: 1,
    })
    .toArray();
  res.send(finalResult);
});















// app.get("/hall/details/:id", async (req, res) => {
//   const { id } = req.params;
//   // console.log(id);
//   const specificHall = data.find((hall) => hall.id === id);
//   res.send(specificHall);
// });


//List all customers with booked data

// app.get("/halldetails/rooms", (req, res) => {
//   const { ifBooked } = req.query;
//   console.log(ifBooked);
//   let filteredHall = data;
//   if (ifBooked) {
//     filteredHall = filteredHall.filter((halls) => halls.ifBooked === ifBooked);
//   }
// });


//List all rooms with booked data

// app.get("/halldetails/customer", (req, res) => {
//   const { noOfSeats } = req.query;
//   console.log(noOfSeats);
//   let noOfSeats = data;
//   if (noOfSeats) {
//     filteredHall = filteredHall.filter(
//       (halls) => halls.noOfSeats >= +noOfSeats
//     );
//   }
// });



//post-----------------------------------------------

// app.post("/hall/details/", (req, res) => {
//   const newHall = {
//     id: data.length + 1,
//     noOfSeats: req.body.noOfSeats,
//     amenities: req.body.amenities,
//     price: req.body.price,
//     ifBooked: "true",
//     customerName: req.body.customerName,
//     date: req.body.date,
//     startTime: req.body.startTime,
//     endTrim: req.body.endTrim,
//     RoomId: req.body.RoomId,
//     RoomName: req.body.RoomName,
//   };
//   console.log(req.body);
//   data.push(newHall);
//   res.send(newHall);
// });


app.post("/hall/details/", async function (req, res) {
  const data = req.body;
  const result = await client
    .db("guvi")
    .collection("hallData")
    .insertMany(data);
  res.send(result);
});

//put--------------------------------------------

// app.put("/hall/details/:id", async (req, res) => {
//   const { id } = req.params;
//   const halls = data.find((hall) => hall.id === id);

//   if (halls.ifBooked === "true") {
//     res.status(400).send("hey hall is already booked");
//   } else {
//     halls.date = req.body.date;
//     halls.startTime = req.body.startTime;
//     halls.endTime = req.body.endTime;
//     halls.customerName = req.body.customerName;
//   }

//   res.status(200).send(data);
// });

function getCompanyDetails(){
  return client.db("guvi").collection("company").find().toArray()
  
}


app.listen(8000, () => console.log("server started"));
