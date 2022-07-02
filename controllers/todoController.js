const { randomUUID } = require("crypto");
const { title } = require("process");
const taskModel = require('../models/todo');


exports.get = async (req, res) => {
    try {
       const allTask = await taskModel.find()
        res.status(200).json(result)
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