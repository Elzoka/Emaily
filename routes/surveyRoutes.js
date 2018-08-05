const express = require('express');
const router = express.Router();
const Path = require('path-parser').default;
const {URL} = require('url');
const _ = require('lodash');

//helpers
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//models
const Survey = require('../models/Survey');

//middleware
const isLoggedIn = require('../middlewares/isLoggedIn');
const requireCredits = require('../middlewares/requireCredits');

router.get('/api/surveys', isLoggedIn, async (req, res) => {
    const surveys = await Survey.find({_user: req.user.id})
        .select({recipients: false});
    res.send(surveys);
});

router.post('/api/surveys', isLoggedIn, requireCredits,async (req, res) => {
    const {title, subject, body, recipients} = req.body;
    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({email: email.trim()})),
        _user: req.user.id, 
        dateSent: Date.now()
    });
    // Send Email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try{
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send(user);
    }catch(e){
        res.status(422).send(err);
    }
});

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('thnx for voting')    
})

router.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
        .map(({email, url}) => {
            const match = p.test(new URL(url).pathname);

            if(match) {
                return {
                    email,
                    ...match
                };
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({surveyId, email, choice}) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: {email, responded: false}
                }
            },{
                $inc: {[choice]: 1},
                $set: {'recipients.$.responded': true},
                lastResponded: new Date()
            }).exec();
        })
        .value();

    res.send({});
})
module.exports = router;