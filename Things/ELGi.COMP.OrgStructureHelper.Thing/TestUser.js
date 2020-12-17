// Generate random password
var randompass = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
//create user if not found user in TWX
var params4 = {
	password: randompass /* STRING */ ,
	name: email /* STRING */ ,
	description: undefined /* STRING */ ,
	tags: undefined /* TAGS */
};
// no return
Resources["EntityServices"].CreateUser(params4);

Things["ELGI.COMP.ThirdPartyIntegrationHelper.Thing"].UserCreated({
	password: randompass /* STRING */ ,
	crmorccs: undefined /* STRING */ ,
	username: email /* STRING */
});
Users[email].emailAddress = email;
