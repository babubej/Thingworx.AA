//Add Dynamic Subscription
me.AddDynamicSubscription({
	thingName: thingsName /* THINGNAME */,
	eventName: eventName /* STRING */, //SubscriptionEventName
	propertyName: propertyName /* STRING */, // Property_Name
	serviceName: "SetMedianValue" /* STRING */ // SetMedianValue
});
