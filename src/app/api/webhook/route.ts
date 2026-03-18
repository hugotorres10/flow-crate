import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-02-25.clover",
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.error("[WEBHOOK] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const productId = session.metadata?.productId;
      const email = session.customer_email || session.customer_details?.email;

      console.log(
        `[SALE] ${new Date().toISOString()} — ${email} purchased ${productId} — $${(session.amount_total || 0) / 100}`
      );

      // TODO: Send delivery email with download links via Resend
      if (email && process.env.RESEND_API_KEY) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "FlowCrate <hello@flow-crate.com>",
            to: email,
            subject: "Your FlowCrate Templates Are Ready!",
            html: `
              <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #e5e5e5; background: #0a0a0a;">
                <h1 style="color: #fff; text-align: center;">Your templates are ready!</h1>
                <p style="color: #a1a1a1; text-align: center;">
                  Thanks for purchasing ${productId}. Download your templates below.
                </p>
                <div style="text-align: center; margin: 32px 0;">
                  <a href="https://flow-crate.com/download/${productId}?token=${session.id}"
                     style="display: inline-block; background: #fff; color: #0a0a0a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    Download Templates
                  </a>
                </div>
                <p style="color: #666; font-size: 12px; text-align: center;">
                  Need help? Reply to this email or join our Discord.
                </p>
              </div>
            `,
          }),
        });
      }

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(
        `[CHURN] ${new Date().toISOString()} — Subscription ${subscription.id} cancelled`
      );
      break;
    }

    default:
      console.log(`[WEBHOOK] Unhandled event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
