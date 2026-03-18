import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <Card className="max-w-md w-full border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-3xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Your templates are on the way. Check your email for the download
            link.
          </p>
          <div className="space-y-3">
            <Button className="w-full">
              <a href="/">Back to FlowCrate</a>
            </Button>
            <p className="text-xs text-muted-foreground">
              Didn&apos;t receive the email? Check spam or reply to our welcome
              email.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
