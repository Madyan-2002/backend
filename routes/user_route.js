const express = require('express');
const userModel = require('../models/user.model');
const route = express.Router();

// جلب كل المستخدمين
route.get(`/`, async (req, res) => {
    const userList = await userModel.find();
    res.send(userList);
    if(!userList) {
        res.status(500).json({ success: false });
    }
    else{
        res.status(200).json({ success: true, data : userList });
    }
});

// search for a specific user by ID
route.get(`/:id`, async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: "Invalid ID or server error",
            details: error.message
        });
    }
});

// إضافة مستخدم جديد
route.post(`/`, async (req, res) => {
    try {
        const user = new userModel({
            email: req.body.email,
            password: req.body.password
        });

        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({
            error: "Failed to create user",
            details: error.message
        });
    }
});

// // --- 1. تعريف البيانات أولاً ---
// const users = [
//     { 'id': 1, 'name': "Madyan", 'age': 24 },
//     { 'id': 2, 'name': "Omar", 'age': 25 },
//     { 'id': 3, 'name': "Lamya", 'age': 21 }
// ];



// // جلب مستخدم محدد
// route.get(`${api}/users/:id`, (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find((u) => u.id === id);

//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ error: "User Not found" });
//     }
// });

// route.put(`${api}/users/:id`, (req, res) => {
//     const { name, age } = req.body;
//     const id = parseInt(req.params.id)
//     const userIndex = users.findIndex((u) => u.id === id);

//     if (userIndex === -1) {
//         res.status(404).json(
//             { error: "User Not found" }
//         )
//     }
//     users[userIndex] = {
//         id: id,
//         name: name,
//         age: age
//     }
//     res.status(200).json({ message: "User updated successfully" });
// });

// route.delete(`${api}/users/:id`, (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = users.findIndex((u) => u.id === id);

//     if (index === -1) {
//         res.status(404).json(
//             { error: "User Not found" }
//         )
//     }
//     const deleteCount = 2; // عدد العناصر المراد حذفها
//     users.splice(index, deleteCount);   // or (id - 1 -- index)
 
//     if(deleteCount > 1) {
//         res.status(200).json({
//             message: "Users deleted successfully",
//         });
//     }
//     res.status(200).json({
//         message: "User deleted successfully",
//         deletedId: id
//     });

// });

module.exports = route;