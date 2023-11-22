const express = require('express')

const { Course, validate } = require('../models/coursesModel')

const { Category } = require('../models/categoriesModel')

const router = express.Router()



router.get('/', async (req, res) => {

    let courses = await Course.find()

    res.send(courses);

});

router.post('/', async (req, res) => {

    const { error } = validate(req.body)

    if (error) res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId)

    if (!category) return res.status(400).send('Invalid ID')

    const course = new Course({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        creator: req.body.creator,
        rating: req.body.rating
    });

    await course.save();

    res.send(course);

});

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body)

    if (error) res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId)

    if (!category) return res.status(400).send('Invalid ID')

    const course = await Course.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        creator: req.body.creator,
        rating: req.body.rating
    }, { new: true })

    if (!course) return res.status(404).send('The Course with the given ID was not found.');

    res.send(course);

});

router.delete('/:id', async (req, res) => {

    const course = await Course.findByIdAndDelete(req.params.id)

    if (!course) return res.status(404).send('The Course with the given ID was not found.');

    res.send(course);
});

router.get('/:id', async (req, res) => {

    const course = await Course.findById(req.params.id)

    if (!course) return res.status(404).send('The Course with the given ID was not found.');

    res.send(course);

});



module.exports = router
