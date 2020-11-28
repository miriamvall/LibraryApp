const express = require("express");
const userModel = require("../models/user");
const bookModel = require('../models/book');
var config = require("../config");
const { check, validationResult } = require('express-validator');
var bookRouter = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');

// get books of a user
bookRouter.route('/').get((req, res, next) => {
    userModel.findOne({_id: new ObjectId(req.params.userId)})
        .populate('books').exec((err, user) => {
            res.status(200).json(user.books);
        })
})

// create book for a user
bookRouter.route('/').post((req,res,next) => {
    const bookData = new bookModel({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
    });
    bookData.save(function(err, book) {
        if(err) throw err;
        else {
            userModel.findById(req.params.userId, function(err, user) {
                if(err) throw err;
                else if(!user) res.status(404).send("couldn't find the user");
                else {
                    user.books.push(book._id);
                    user.save(function(err, user) {
                        if(err) throw err;
                        else res.status(200).json(book.toObject());
                    });
                }
            });
        }
    });
});

// edit the details of a book
bookRouter.route('/:bookId').patch((req,res,next) => {
    bookModel.findOne({_id: new ObjectId(req.params.bookId)}, function(err, book) {
        if(err) throw err;
        else if(!book) res.status(404).send("couldn't find the book");
        else {
            _.assign(book, {
                title: req.body.title || book.title,
                author: req.body.author || book.author,
                description: req.body.description || book.description
            });
            book.save(function(err,book) {
                if(err) throw err;
                else {
                    res.status(200).send(book.toObject());
                }
            });
        }
    })
});

// delete book from user
bookRouter.route('/:bookId').delete((req,res,next) => {
    bookModel.findOne({_id: new ObjectId(req.params.bookId)}, function(err,book) {
        if(err) throw err;
        else if(!book) res.status(404).send("couldn't find book");
        else {
            userModel.findOne({_id: new ObjectId(req.params.userId)}, function(err, user) {
                if(err) throw err;
                else if(!user) res.status(404).send("couldn't find the user");
                else {
                    //remove the book from the users list
                    _.pull(user.books, book._id);
                    user.save(function(err, user) {
                        if(err) throw err;
                        // remove book from database
                        else book.remove(function(err) {
                            if(err) throw err;
                            else {
                                res.status(200).send("book successfully deleted!");
                            }
                        });
                    });
                }
            });
        }
    });
});

module.exports = bookRouter;

