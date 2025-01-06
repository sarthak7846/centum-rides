import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { payment_method, payment_intent_id, customer_id } = body;

    if (!payment_method || !payment_intent_id || !customer_id) {
      return new Response(
        JSON.stringify({
          error: "Missing required payment information",
          status: 400,
        })
      );
    }

    const paymentMethod = await stripe.paymentMethods.attach(
      payment_intent_id,
      {
        customer: customer_id,
      }
    );

    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: paymentMethod.id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment confirmed successfully",
        result,
      })
    );
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        error: err,
        status: 500,
      })
    );
  }
};
