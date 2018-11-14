
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class Settings extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }


  render() {
    return (
      <div className='settings-page'>

        <StripeCheckout
          token={this.onToken}
          stripeKey={process.env.REACT_APP_STRIPE_TEST_KEY}
          name='Cookbook Subscription'
          zipcode={false}
          amount={1000}
          currency='USD'
          email='cookbook_project@yahoo.com'
        />
      </div>
    )
  }
}