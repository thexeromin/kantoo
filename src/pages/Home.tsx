import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ArrowRight, Sparkles, Users, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-24 lg:py-32 xl:py-48 flex justify-center items-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/20 rounded-full blur-[120px] -z-10" />

        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            <span>Now with AI-powered task prioritization</span>
          </div>
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Master your workflow, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">
                one board at a time.
              </span>
            </h1>
            <p className="mx-auto max-w-175 text-muted-foreground md:text-xl leading-relaxed">
              The intuitive Kanban board designed for modern teams. Drag, drop,
              collaborate, and ship faster without the clutter.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8">
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 px-8"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full py-20 bg-muted/30 border-y border-border/50"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to stay organized
            </h2>
            <p className="max-w-225 text-muted-foreground md:text-lg">
              Powerful features disguised by a beautifully simple interface.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Built for speed. Keyboard shortcuts, instant sync, and zero
                  loading states mean you never lose your flow.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Seamless Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Real-time updates, inline comments, and role-based access
                  control. Keep your whole team on the same page.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-emerald-500" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your data is encrypted at rest and in transit. SOC2 compliant
                  infrastructure you can trust with your biggest projects.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto p-8 md:p-12 bg-primary/5 rounded-3xl border border-primary/20">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to clear your backlog?
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-150">
              Join thousands of teams who have already upgraded their
              productivity. Setup takes less than 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8">
                Get Started for Free
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required. Free 14-day trial on Pro plans.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
