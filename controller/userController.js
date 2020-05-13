const User = require("../models/User");
const Joi = require('@hapi/joi');

exports.addUser = (req, res) => {
    var schema = Joi.object({
        name: Joi.string().required(),
        mobile: Joi.number().min(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(422).json({ error: error.details[0].message });
    const { name, mobile, email, password } = req.body;
    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            res.status(409).json({
                error: "User Exist"
            });
        } else {
            const newUser = new User({
                name: name.toUpperCase(),
                mobile: mobile,
                email: email.toLowerCase(),
                password: password
            });
            newUser.save().then((user) => {
                res.status(200).json({ result: user })
            }).catch((err) => {
                res.status(500);
            })
        }
    })
};

exports.getUser = async (req, res) => {
    const { id } = req.params;
    if (id) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            User.findOne({ _id: id }).then((result) => {
                if (result) {
                    res.status(200).json({ result: result })
                } else {
                    res.status(404).json({ error: "Not Found" })
                }
            }).catch(err => {
                console.log(err);
                res.sendstatus(500);
            })
        } else {
            res.status(422).json({ error: "ID not provided or Invalid" });
        }
    } else {
        User.find({}).then((result) => {
            if (result) {
                res.status(200).json({ results: result })
            } else {
                res.status(404).json({ error: "Not Found" })
            }
        }).catch(err => {
            console.log(err);
            res.sendstatus(500);
        })
    }
};

exports.updateUser = (req, res) => {
    var schema = Joi.object({
        name: Joi.string().optional(),
        mobile: Joi.number().min(10).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(8).optional()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(422).json({ error: error.details[0].message });
    const { id } = req.params;
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
        const { name, mobile, email, password } = req.body;
        let fields = {};
        if (name) {
            fields.name = name.toUpperCase();
        } if (mobile) {
            fields.mobile = mobile;
        } if (email) {
            fields.email = email.toLowerCase();
        } if (password) {
            fields.password = password;
        }
        User.updateOne({
            _id: id
        }, {
            $set: fields
        }).then(result => {
            if (result.nModified > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(304);
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    } else {
        res.status(422).json({ error: "ID not provided or Invalid" });
    }
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
        User.deleteOne({ _id: id }).then(result => {
            if (result.deletedCount > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(304);
            }
        })
    } else {
        res.status(422).json({ error: "ID not provided or Invalid" });
    }
};
