
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            Enquiry [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     Used to submit an enquiry.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the enquiry.
var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
});

// Add fields in the model.
Enquiry.add({

	// The name of the person submitting the enquiry.
	name: { type: Types.Name, required: true },

	// The e-mail of the person submitting the enquiry.
	email: { type: Types.Email, required: true },

	// The phone of the person submitting the enquiry.
	phone: { type: String },

	// The type of the enquiry.
	enquiryType: { type: Types.Select, options: [
		{ value: 'message', label: 'Just leaving a message' },
		{ value: 'question', label: 'I\'ve got a question' },
		{ value: 'other', label: 'Something else...' }
	] },

	// The message of the enquiry.
	message: { type: Types.Markdown, required: true },

	// The date that this enquiry was created.
	createdAt: { type: Date, default: Date.now }

});

Enquiry.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function (callback) {

	if (typeof callback !== 'function') {
		callback = function (err) {
			if (err) {
				console.error('There was an error sending the notification email:', err);
			}
		};
	}

	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log('Unable to send email - no mailgun credentials provided');
		return callback(new Error('could not find mailgun credentials'));
	}

	var enquiry = this;
	var brand = keystone.get('brand');

	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {

		if (err) return callback(err);

		new keystone.Email({
			templateName: 'enquiry-notification',
			transport: 'mailgun',
		}).send({
			to: admins,
			from: {
				name: 'community-planner',
				email: 'contact@community-planner.com',
			},
			subject: 'New Enquiry for community-planner',
			enquiry: enquiry,
			brand: brand,
			layout: false,
		}, callback);
	});

};

// Register the model.
Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
