const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

const {sendGridKey} = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({subject, recipients}, content){
        super();
        this.sgApi = sendgrid(sendGridKey);
        this.from_email = new helper.Email('no-reply@elzoka.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = recipients.map(({email}) => new helper.Email(email));

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }
    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }
    async send (){
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        return await this.sgApi.API(request);
    }
}

module.exports = Mailer;