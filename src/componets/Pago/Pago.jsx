import React, { useState } from 'react';

const PaymentMethods = () => {
 const [selectedMethod, setSelectedMethod] = useState('');

 const handleSelectMethod = (event) => {
    setSelectedMethod(event.target.value);
 };

 const renderSelectedMethod = () => {
    switch (selectedMethod) {
      case 'debit':
        return <DebitCard />;
      case 'credit':
        return <CreditCard />;
      case 'paypal':
        return <PayPal />;
      case 'cash':
        return <Cash />;
      default:
        return null;
    }
 };

 return (
    <div>
      <label>
        <input
          type="radio"
          value="debit"
          checked={selectedMethod === 'debit'}
          onChange={handleSelectMethod}
        />
        Debit Card
      </label>
      <label>
        <input
          type="radio"
          value="credit"
          checked={selectedMethod === 'credit'}
          onChange={handleSelectMethod}
        />
        Credit Card
      </label>
      <label>
        <input
          type="radio"
          value="paypal"
          checked={selectedMethod === 'paypal'}
          onChange={handleSelectMethod}
        />
        PayPal
      </label>
      <label>
        <input
          type="radio"
          value="cash"
          checked={selectedMethod === 'cash'}
          onChange={handleSelectMethod}
        />
        Cash
      </label>
      {renderSelectedMethod()}
    </div>
 );
};

const DebitCard = () => {
 return (
    <div>
      <label>
        Card Number:
        <input type="text" />
      </label>
      <label>
        Expiration Date:
        <input type="text" />
      </label>
      <label>
        CVV:
        <input type="text" />
      </label>
    </div>
 );
};

const CreditCard = () => {
 return (
    <div>
      <label>
        Card Number:
        <input type="text" />
      </label>
      <label>
        Expiration Date:
        <input type="text" />
      </label>
      <label>
        CVV:
        <input type="text" />
      </label>
    </div>
 );
};

const PayPal = () => {
 return (
    <div>
      <label>
        Email:
        <input type="text" />
      </label>
    </div>
 );
};

const Cash = () => {
 return null;
};

export default PaymentMethods;