import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsCard from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { mockUserImpact } from '@/data/mockData';
import { TreePine, Wind, Calendar, TrendingUp, Award } from 'lucide-react';
import { format } from 'date-fns';

const Impact = () => {
  const { treesPlanted, co2Offset, eventsParticipated, eventHistory } = mockUserImpact;
  const userData = {
    name: "User",
    treesPlanted: 47,
    carbonOffset: 470, // kg
    eventsAttended: 3,
    badges: ["Seedling Starter", "Grove Guardian"],
    rank: 342,
    totalUsers: 15420
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-r from-nature-leaf to-primary py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-5xl mb-4">
            Karibu, {userData.name} 🌱
            </h1>
            <p className="text-xl text-white/90">
              Track your contribution to Kenya's reforestation
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12">
          <div className="container mx-auto px-4 space-y-6">
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
              <StatsCard
                title="Community Rank"
                value={userData.rank}
                icon={TrendingUp}
                description={`Your rank out of ${userData.rank*2}`}
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

            <div className="grid md:grid-cols-2 gap-6">
              {/* Impact Chart Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-['Lora']">Your Impact Over Time</CardTitle>
                  <CardDescription>Trees planted per month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-around gap-2">
                    {[12, 8, 15, 7, 5].map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary-dark"
                          style={{ height: `${(value / 15) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {["Nov", "Dec", "Jan", "Feb", "Mar"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Badges Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-['Lora']">Achievement Badges</CardTitle>
                  <CardDescription>Your environmental milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.badges.map((badge, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{badge}</div>
                          <div className="text-sm text-muted-foreground">Earned</div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg opacity-50">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Award className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-muted-foreground">Forest Champion</div>
                        <div className="text-sm text-muted-foreground">Plant 100 trees to unlock</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> 

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
