const express = require('express');
const router = express.Router();

//helpers
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//models
const Survey = require('../models/Survey');

//middleware
const isLoggedIn = require('../middlewares/isLoggedIn');
const requireCredits = require('../middlewares/requireCredits');

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

router.get('/api/surveys/thanks', (req, res) => {
    res.send('thnx for voting')    
})

module.exports = router;