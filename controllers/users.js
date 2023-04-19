import { v4 as uuid4 } from 'uuid';

let users = [];

export const getUsers = (req, res) => {
    res.status(200).send(users);
}

export const createUser = (req, res) => {
    const user = req.body;

    users.push({ ...user, id : uuid4() });

    res.status(200).send(`User with the name ${user.firstName} added to the database`);
}

export const getUser = (req, res) => {
    const id = req.params.id;

    const foundUser = users.find((user) => user.id == id);

    if (!foundUser){
        res.status(400).send({
            message : "BAD ID"
        });
    }
    else{
        res.status(200).send(foundUser);
    }
}

export const deleteUser = (req, res) => {
    const id = req.params.id;

    users = users.filter((user) => user.id != id);
    res.status(200).send({
        message : `User with the id of ${id} deleted from the database.`
    })
}

export const updateUser = (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id == id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;
    
    res.status(200).send({
       message : `User with the id ${id} has been updated` 
    });
}