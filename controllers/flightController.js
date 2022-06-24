const { randomUUID } = require("crypto");
const flights = require('../models/Flight');

exports.single = (req, res) => {
    const id = req.body['id'];
    if(!id){
        res.status(400).send("Missing Id")
    }
    flights.forEach(element => {
        if(element.id == id){
            res.status(200).json(element)
        } else {
            res.status(404).send("Flight not Found")
        }
    });
}

exports.all = (req, res) => {
    res.status(200).json({
        "bookings": flights
    });
}

exports.book = (req, res) => {
    const  {title , time, price} = req.body;
    const id = randomUUID();
    if(!(title && time && price )){
        res.status(400).send("All input required")
    }
    try {
        flights.add(
            {
                "id": id,
                "title": title,
                "time": time,
                "price": price,
                "date": new Date().toDateString()
            }
        );
        flights.forEach(element => {
            if(element.id == id){
                res.status(201).json(element)
            } else {
                res.status(500).send("Internal Server Error");
            }
        });

    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error)
    }

}

exports.update = (req, res) => {
 const  {id, title , time, price, date} = req.body;
 if(!(id && title && time && price && date)){
     res.status(400).send("All input required")
 }
     flights.forEach(element => {
         if(element.id == id){
            element = req.body;
            res.status(200).json(element)
         } else {
             res.status(404).send('Flight Not Found')
         }
     });
}

exports.delete = (req, res) => {
  const id = req.body['id'];
  try {
      if(!id){
        res.status(400).send("Missing id ")
      } 
    flights.forEach(element => {
        if(element.id == id){
          flights.slice(element);
          res.status(200).json(element);
        } else {
            res.status(404).send('Flight not Found')
        }
    });
  } catch (error) {
      res.status(500).send("Internal Server Error")
      console.log(error)
  }
 
}