import './Checkout.scss';
import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export default function Checkout({
  errorName,
  setErrorName,
  errorAddress,
  setErrorAddress,
  setOrderBy,
  setAddress
}: any) {
  const { phoneNumber } = useSelector((state: RootState) => state.user);

  const handleChangeName = (e: any) => {
    setOrderBy(e.target.value);
    setErrorName(false);
  };

  const handleChangeAddress = (e: any) => {
    setAddress(e.target.value);
    setErrorAddress(false);
  };

  return (
    <div className="checkout">
      <h3 className="checkout-label">Order checkout</h3>
      <div className="personal-details">
        <div className="personal-details-label">Personal details</div>
        <div className="personal-details-fields">
          <div className="personal-details-name">
            <div className="personal-details-name-label">Name*</div>
            <TextField
              error={errorName}
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Enter you name"
              onChange={handleChangeName}
            />
          </div>
          <div className="personal-details-phone">
            <div className="personal-details-phone-label">Phone number</div>
            <TextField
              id="outlined-basic"
              className="phone-number"
              variant="outlined"
              size="small"
              value={phoneNumber}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton className="change-btn" edge="end" color="primary">
                      Change
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
      </div>
      <div className="delivery-information">
        <div className="delivery-information-label">Delivery information</div>
        <div className="address-line-1">
          <div className="address-line-1-label">Address line 1*</div>
          <TextField
            error={errorAddress}
            sx={{ width: '100%' }}
            id="outlined-basic"
            placeholder="Street address"
            variant="outlined"
            size="small"
            onChange={handleChangeAddress}
          />
        </div>
        <div className="address-line-2">
          <div className="address-line-2-label">Address line 2</div>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-basic"
            placeholder="Apartment, suite, building, floor, etc (optional)"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="postcode">
          <div className="postcode-label">Postcode</div>
          <TextField
            sx={{ width: '50%' }}
            id="outlined-basic"
            placeholder="Enter postcode"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="delivery-comment">
          <div className="delivery-comment-label">Delivery comment</div>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-multiline-static"
            multiline
            rows={4}
            placeholder="Let us know what we can do. You can share any specific needs or delivery instructions."
          />
        </div>
      </div>
    </div>
  );
}
