paypal.Buttons({
  createSubscription: function(data, actions) {
    return actions.subscription.create({
      'plan_id': 'P-8K2448559P9609535MMAPYHA'
    });
  },
  onApprove: function(data, actions) {
    alert('You have successfully created subscription ' + data.subscriptionID); // Optional message given to subscriber
  }
}).render('#paypal-button-container'); // Renders the PayPal button