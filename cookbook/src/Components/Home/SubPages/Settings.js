
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class Settings extends React.Component {
  onToken = (token) => {
    console.log(`TOKEN: ${token.id}`)
  }

  render() {
    return (
      <div className='settings-page'>

        <StripeCheckout
          token={this.onToken}
          stripeKey='pk_test_FyA4hajfxfEQ4jCcEaeQtTIL'
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