import { Check, Sprout, Target, TrendingUp, Users, Award, Shield, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Partners = () => {
  const scrollToPlans = () => {
    document.getElementById('partnership-tiers')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whyPartner = [
    {
      icon: Target,
      title: 'Verified Impact Tracking',
      description: 'Real-time data on trees planted, CO₂ offset, and community impact.',
    },
    {
      icon: Award,
      title: 'ESG & CSR Compliance',
      description: 'Meet sustainability goals with transparent, measurable outcomes.',
    },
    {
      icon: TrendingUp,
      title: 'Brand Recognition & Co-marketing',
      description: 'Showcase your commitment through joint campaigns and events.',
    },
  ];

  const corporateTiers = [
    {
      name: 'Green Partner',
      price: 'KES 50,000 - 200,000',
      period: 'per project',
      description: 'Perfect for small to medium enterprises looking to make an impact.',
      benefits: [
        'Support 1-2 reforestation projects',
        'Logo on project materials',
        'Quarterly impact reports',
        'Social media recognition',
        'Certificate of partnership',
      ],
      highlighted: false,
    },
    {
      name: 'Climate Champion',
      price: 'KES 200,000 - 1M',
      period: 'per year',
      description: 'Ideal for organizations committed to long-term sustainability.',
      benefits: [
        'Support multiple projects annually',
        'Featured partner status on website',
        'Monthly detailed impact reports',
        'Co-branded marketing campaigns',
        'Employee volunteering opportunities',
        'VIP access to planting events',
        'Custom project naming rights',
      ],
      highlighted: true,
    },
    {
      name: 'Legacy Partner',
      price: 'KES 1M+',
      period: 'per year',
      description: 'For industry leaders shaping Kenya\'s environmental future.',
      benefits: [
        'Exclusive multi-year project sponsorship',
        'Premium branding across all platforms',
        'Dedicated account manager',
        'Custom impact dashboards',
        'Speaking opportunities at events',
        'Strategic CSR consultation',
        'Board-level impact presentations',
        'First priority on new initiatives',
      ],
      highlighted: false,
    },
  ];

  const ngoHighlights = [
    'Enhanced visibility on our platform',
    'Access to corporate funding networks',
    'Real-time project tracking tools',
    'Community engagement support',
    'Professional impact documentation',
    'Joint marketing opportunities',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-background pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
              <Sprout className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Partner With Linda Dunia
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Empower your organization to achieve measurable impact and sustainability goals through transparent reforestation partnerships.
            </p>
            <Button onClick={scrollToPlans} size="lg" className="group">
              Explore Partnership Plans
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Partner With Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join Kenya's leading reforestation movement and make a lasting difference.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyPartner.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="text-center hover-lift border-border bg-card">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Partnership Tiers */}
      <section id="partnership-tiers" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Corporate Partnership Tiers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the partnership level that aligns with your sustainability goals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {corporateTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`hover-lift transition-all ${
                  tier.highlighted 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-border'
                }`}
              >
                <CardHeader>
                  {tier.highlighted && (
                    <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
                      MOST POPULAR
                    </div>
                  )}
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-foreground">{tier.price}</div>
                    <div className="text-sm text-muted-foreground">{tier.period}</div>
                  </div>
                  <CardDescription className="mt-3">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tier.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={tier.highlighted ? 'default' : 'outline'}
                  >
                    Become a Partner
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* NGO Partnership Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-6">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-semibold">For NGOs & Community Groups</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Amplify Your Impact
                </h2>
                <p className="text-muted-foreground mb-6">
                  Already working on reforestation projects? Partner with Linda Dunia to access corporate funding, 
                  increase visibility, and leverage our platform's tracking and community engagement tools.
                </p>
                <p className="text-muted-foreground mb-8">
                  We connect mission-driven organizations with resources and partners who share your vision 
                  for a greener Kenya.
                </p>
                <Button size="lg" variant="outline" className="group">
                  Apply as an NGO Partner
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="space-y-4">
                {ngoHighlights.map((highlight, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{highlight}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="text-center py-16 px-6">
              <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Join the Movement
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Together, we can restore Kenya's forests, combat climate change, and create lasting impact for generations to come.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  Become a Corporate Partner
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Apply as an NGO
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
