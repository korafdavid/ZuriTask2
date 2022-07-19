const { randomUUID } = require("crypto");
const { title } = require("process");
const taskModel = require('../models/todo');
const nodemailer = require("nodemailer");
require('dotenv/config');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD
    }
});

exports.post = async (req,res) => {

    if(req.body['email'] != null) {
    
    // I'm using Static text here. Would make it dynamic in real situations. 
    var mailOptions = {
        to: 'okoroafordavid61@yahoo.com',
        from: 'ZURI MONEYBANK <okoroafordavid61@gmail.com>',
        subject: 'WITHDRAWAL OF 100K',
        text: 'Hi David, \n\n    You are receiving this because you (or someone else) have requested the withdrawal 100K from your account.\n' +
            'If you did not request this, please Contact Our Headquater oooo. Yahoo Boys don run you street.\n'
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err){
            console.log(err)
            res.status(501).send('internal Server error');
        }  else {
            res.status(200).send('Message %s sent: %s', info.messageId, info.response)
        }
    })
} else {
    
}
    
    
}

exports.get = async (req, res) => {
    try {
       const allTask = await taskModel.find()
        res.status(200).json(allTask)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

exports.add = async (req, res) => {
    const {title, description} = req.body;
    if(!(title && description)){
        res.status(400).send('Please add required values')
    }
    try {
      const task = taskModel.create({
            title: title,
            description: description
        })
        newTask = await task.save();
        res.status(201).json(result)
        
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.log(error)
    }
}

exports.update = (req, res) => {
    const {id, title, description} = req.body;
    if(id != null){
              const update = await Post.updateOne(
            { _id: id },
            { $set: { title: title, description: description } }
        );
        res.status(200).json(update);
    } else {
        res.status(400).send('Id required')
    }
}

exports.delete = async (req, res) => {
    const id = req.body['id']
    if(id != null){
        try {
            const deleted = await Post.findByIdAndDelete(id);
            res.json({ status: "Deleted" });
        } catch (error) {
            res.json({ mesage: error });
        }
    } else {
        res.status(400).send('Id reqiured')
    }

}