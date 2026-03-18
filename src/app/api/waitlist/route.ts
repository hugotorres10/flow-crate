import { NextRequest, NextResponse } from "next/server";

// In production, this will be Supabase. For now, we store in KV/file and send welcome email.
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Send welcome email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "FlowCrate <hello@flow-crate.com>",
          to: email,
          subject: "Welcome to FlowCrate — Your Free Template Inside",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #e5e5e5; background: #0a0a0a;">
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="display: inline-block; background: #e5e5e5; color: #0a0a0a; font-weight: bold; padding: 8px 12px; border-radius: 8px; font-size: 14px;">FC</div>
                <span style="font-size: 20px; font-weight: 600; margin-left: 8px; color: #fff;">FlowCrate</span>
              </div>

              <h1 style="font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 16px; color: #fff;">You're on the list!</h1>

              <p style="font-size: 16px; line-height: 1.6; color: #a1a1a1; text-align: center;">
                Thanks for joining the FlowCrate waitlist. We're building premium AI workflow templates that deploy in minutes.
              </p>

              <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 24px; margin: 32px 0; text-align: center;">
                <p style="font-size: 14px; color: #a1a1a1; margin-bottom: 12px;">Your free template:</p>
                <h2 style="font-size: 20px; color: #fff; margin-bottom: 8px;">AI Customer Support Triage</h2>
                <p style="font-size: 14px; color: #a1a1a1; margin-bottom: 16px;">Auto-categorize tickets, assess urgency, and draft replies with AI.</p>
                <a href="https://flow-crate.com/templates/free/ai-ticket-triage.json" style="display: inline-block; background: #fff; color: #0a0a0a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Download Template</a>
              </div>

              <p style="font-size: 14px; color: #666; text-align: center;">
                We'll notify you when FlowCrate launches with early access pricing.
              </p>

              <hr style="border: none; border-top: 1px solid #222; margin: 32px 0;" />
              <p style="font-size: 12px; color: #444; text-align: center;">
                FlowCrate — Premium AI Workflow Templates<br/>
                <a href="https://flow-crate.com" style="color: #666;">flow-crate.com</a>
              </p>
            </div>
          `,
        }),
      });
    }

    // Store email (append to a simple log for now, Supabase later)
    // In Cloudflare Pages, we can use KV or D1
    console.log(`[WAITLIST] ${new Date().toISOString()} — ${email}`);

    return NextResponse.json({ success: true, message: "Welcome to FlowCrate!" });
  } catch (error) {
    console.error("[WAITLIST ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
