import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsCard from '@/components/StatsCard';
import { Card } from '@/components/ui/card';
import { mockUserImpact } from '@/data/mockData';
import { TreePine, Wind, Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const Impact = () => {
  const { treesPlanted, co2Offset, eventsParticipated, eventHistory } = mockUserImpact;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-r from-nature-leaf to-primary py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-5xl mb-4">
              My Environmental Impact
            </h1>
            <p className="text-xl text-white/90">
              Track your contribution to Kenya's reforestation
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <StatsCard
                title="Trees Planted"
                value={treesPlanted}
                icon={TreePine}
                description="Your lifetime contribution"
                gradient="from-primary/20 to-primary-light/20"
              />
              <StatsCard
                title="CO₂ Offset"
                value={`${co2Offset.toLocaleString()} kg`}
                icon={Wind}
                description="Carbon removed from atmosphere"
                gradient="from-accent/20 to-nature-sky/20"
              />
              <StatsCard
                title="Events Participated"
                value={eventsParticipated}
                icon={Calendar}
                description="Community events joined"
                gradient="from-nature-earth/20 to-secondary/20"
              />
            </div>

            {/* Inspirational Quote */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border p-8 mb-12">
              <div className="flex items-start space-x-4">
                <TreePine className="h-8 w-8 text-primary flex-shrink-0 mt-1 animate-float" />
                <div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    "Every tree you plant brings life to our planet."
                  </p>
                  <p className="text-muted-foreground">
                    You've made a tangible difference in Kenya's environment. Your {treesPlanted} trees 
                    will continue to grow and benefit our ecosystem for generations to come.
                  </p>
                </div>
              </div>
            </Card>

            {/* Event History */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-3xl text-foreground">
                  Participation History
                </h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-1 text-primary" />
                  <span>Growing impact</span>
                </div>
              </div>

              {eventHistory.length > 0 ? (
                <div className="space-y-4">
                  {eventHistory.map((event) => (
                    <Card key={event.eventId} className="p-6 border border-border hover-lift">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-heading font-semibold text-lg text-foreground">
                            {event.eventName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(event.date), 'MMMM dd, yyyy')}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 text-primary">
                            <TreePine className="h-5 w-5" />
                            <span className="font-heading font-bold text-2xl">
                              {event.treesPlanted}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">trees planted</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center border border-border">
                  <TreePine className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    No events participated yet. Join your first tree planting event!
                  </p>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Impact;
