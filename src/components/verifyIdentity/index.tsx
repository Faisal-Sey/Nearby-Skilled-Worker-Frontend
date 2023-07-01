import React, { Component, Dispatch, SetStateAction } from "react";
import { loadStripe, Stripe, StripeError } from "@stripe/stripe-js";
import { axiosClient } from "@/libs/axiosClient";

interface VerifyButtonProps {
  user: any;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setSubmitted: Dispatch<SetStateAction<number>>;
}

interface ButtonProps extends VerifyButtonProps {
  stripePromise: Promise<Stripe | null>;
  user: any;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

interface VerifyButtonState {
  stripe: Stripe | null;
}

class VerifyButton extends Component<ButtonProps, VerifyButtonState> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      stripe: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const stripe = await this.props.stripePromise;
    this.setState({ stripe });
  }

  async createVerificationSession() {
    // Call your backend to create the Verification Session.
    const response = await axiosClient.post(
      `/stripe/create-verification-session`,
      {
        userId: this.props.user.id,
        name: this.props.user.name,
        username: this.props.user.username,
        type: this.props.user.type,
      }
    );

    return response.data.data;
  }

  async handleClick(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    // Block native event handling.
    event.preventDefault();

    // Get stripe from state
    const { stripe } = this.state;

    if (!stripe) {
      // Stripe.js has not loaded yet. Make sure to disable
      // the button until Stripe.js has loaded.
      this.props.setLoading(false);
    } else {
      this.props.setLoading(true);

      // Create a verification session
      const session = await this.createVerificationSession();

      // Verify identity
      const { error }: { error?: StripeError } = await stripe.verifyIdentity(
        session.client_secret
      );

      if (error) {
        console.log("[error]", error);
      } else {
        this.props.setSubmitted(200);
      }
    }
  }

  render() {
    const { stripe } = this.state;
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className={`p-1 text-[#fff] bg-blue-600 ${!stripe ? "disabled" : ""}`}
      >
        {this.props.loading ? "Loading..." : "Proceed to verify identity"}
      </button>
    );
  }
}

const stripePromise = loadStripe(process.env.STRIPE_PRIMARY_KEY!);

const StripeVerificationButton = (props: VerifyButtonProps) => {
  return (
    <VerifyButton
      stripePromise={stripePromise}
      user={props.user}
      loading={props.loading}
      setLoading={props.setLoading}
      setSubmitted={props.setSubmitted}
    />
  );
};

export default StripeVerificationButton;
