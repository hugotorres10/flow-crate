import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-02-25.clover",
  });
}

const PRODUCTS: Record<string, { name: string; price: number; type: "one_time" | "recurring" }> = {
  "bundle-content": {
    name: "AI Content Factory Bundle (5 templates)",
    price: 9700, // cents
    type: "one_time",
  },
  "bundle-sales": {
    name: "Sales & Lead Gen Machine Bundle (5 templates)",
    price: 12700,
    type: "one_time",
  },
  "bundle-ecommerce": {
    name: "E-commerce Autopilot Bundle (5 templates)",
    price: 9700,
    type: "one_time",
  },
  "bundle-support": {
    name: "Support & Ops AI Bundle (5 templates)",
    price: 9700,
    type: "one_time",
  },
  "all-access": {
    name: "FlowCrate All Access Pass",
    price: 14900, // cents/month
    type: "recurring",
  },
};

export async function POST(req: NextRequest) {
  try {
    const { productId, email } = await req.json();

    const product = PRODUCTS[productId];
    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: `FlowCrate premium n8n workflow templates`,
            },
            unit_amount: product.price,
            ...(product.type === "recurring" && {
              recurring: { interval: "month" as const },
            }),
          },
          quantity: 1,
        },
      ],
      mode: product.type === "recurring" ? "subscription" : "payment",
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/#pricing`,
      metadata: {
        productId,
      },
    };

    const session = await getStripe().checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[CHECKOUT ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
