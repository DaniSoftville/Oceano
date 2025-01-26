import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { Typography, Grid, TextField } from "@mui/material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { StripeInput } from "./StripeInput"; // Ensure this is correctly implemented
import { StripeElementType } from "@stripe/stripe-js";

interface Props {
  cardState: { elementError: { [key in StripeElementType]?: string } };
  onCardInputChange: (event: any) => void;
}

export default function PaymentForm({ cardState, onCardInputChange }: Props) {
  const { control } = useFormContext(); // For accessing react-hook-form methods

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        {/* Name on Card */}
        <Grid item xs={12} md={6}>
          <AppTextInput
            name="nameOnCard"
            label="Name on card"
            control={control} // Using react-hook-form for validation
          />
        </Grid>

        {/* Card Number */}
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange} // To handle input change and errors
            error={!!cardState.elementError.cardNumber}
            helperText={cardState.elementError.cardNumber}
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput, // Use your custom input component
              inputProps: {
                component: CardNumberElement, // Stripe CardNumberElement
              },
            }}
          />
        </Grid>

        {/* Expiry Date */}
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange} // To handle input change and errors
            error={!!cardState.elementError.cardExpiry}
            helperText={cardState.elementError.cardExpiry}
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput, // Use your custom input component
              inputProps: {
                component: CardExpiryElement, // Stripe CardExpiryElement
              },
            }}
          />
        </Grid>

        {/* CVV */}
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange} // To handle input change and errors
            error={!!cardState.elementError.cardCvc}
            helperText={cardState.elementError.cardCvc}
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput, // Use your custom input component
              inputProps: {
                component: CardCvcElement, // Stripe CardCvcElement
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
