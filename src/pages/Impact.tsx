import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsCard from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { TreePine, Wind, Calendar, TrendingUp, Award } from 'lucide-react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ============================
// Impact Page Component
// ============================
const Impact = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Local state to hold user stats ---
  const [impact, setImpact] = useState({
    name: '',
    treesPlanted: 0,
    co2Offset: 0,
    eventsParticipated: 0,
    rank: 0,
    totalUsers: 0,
    badges: [] as string[],
    eventHistory: [] as {
      eventId: string;
      eventName: string;
      date: string;
      treesPlanted: number;
    }[],
  });
  

  // --- Fetch data on mount ---
  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        // 1️⃣ Get the logged-in user
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData?.user) {
          console.error('User not authenticated.');
          return;
        }
        const user = authData.user;

        // 2️⃣ Fetch user profile info (name)
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', user.id)
          .single();
        if (userError) throw userError;

        // 3️⃣ Fetch user’s event participation data
        const { data: userEvents, error: userEventsError } = await supabase
          .from('user_events')
          .select(`
            trees_planted,
            participated_at,
            events:event_id (
              id,
              name,
              event_date
            )
          `)
          .eq('user_id', user.id);

        if (userEventsError) throw userEventsError;

        // Calculate total trees planted and events count
        const totalTrees = userEvents.reduce((acc, e) => acc + (e.trees_planted || 0), 0);
        const totalEvents = userEvents.length;
        const co2Offset = totalTrees * 10; // 💡 Example ratio: 1 tree = 10kg CO₂ offset

        // 4️⃣ Fetch user badges
        const { data: badges, error: badgesError } = await supabase
          .from('user_badges')
          .select('badge_name')
          .eq('user_id', user.id);

        if (badgesError) throw badgesError;

        // 5️⃣ Fetch all user events to calculate rank
        const { data: allUserEvents, error: allEventsError } = await supabase
        .from('user_events')
        .select('user_id, trees_planted');

        if (allEventsError) throw allEventsError;

        // Aggregate total trees per user
        const userTotals = allUserEvents.reduce((acc, row) => {
        acc[row.user_id] = (acc[row.user_id] || 0) + (row.trees_planted || 0);
        return acc;
        }, {});

        // Sort users by total trees planted
        const sorted = Object.entries(userTotals).sort((a, b) => b[1] - a[1]);

        // Find logged-in user's rank
        const rank = sorted.findIndex(([id]) => id === user.id) + 1;
        const totalUsers = sorted.length;
        const userTotal = userTotals[user.id] || 0;


        // Fetch User impact
        const { data: events, error } = await supabase
          .from('user_events')
          .select('trees_planted, participated_at')
          .eq('user_id', user.id)
          .order('participated_at', { ascending: true });

        if (error) throw error;

        // Transform the data: group by month-year
        const grouped = {};

        events.forEach((item) => {
          const date = new Date(item.participated_at);
          const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });

          if (!grouped[monthYear]) {
            grouped[monthYear] = 0;
          }
          grouped[monthYear] += item.trees_planted;
        });

        // Convert grouped data into array for Recharts
        const formattedData = Object.entries(grouped).map(([month, trees]) => ({
          month,
          trees,
        }));

        // Set data for the impacts graph
        setData(formattedData);
        setLoading(false);

        // 6️⃣ Structure data for the UI
        setImpact({
          name: userData?.full_name || 'User',
          treesPlanted: totalTrees,
          co2Offset: co2Offset,
          eventsParticipated: totalEvents,
          rank: rank,
          totalUsers: totalUsers || 0,
          badges: badges.map(b => b.badge_name),
          eventHistory: (userEvents).map((e: any) => ({
            eventId: e.events?.id ?? 'N/A',
            eventName: e.events?.name ?? 'Unknown Event',
            date: e.events?.event_date ?? '',
            treesPlanted: e.trees_planted ?? 0,
          })),
          
        });
      } catch (error: any) {
        console.error('Error fetching impact data:', error.message);
      }
    };

    fetchImpactData();
  }, []);

  // --- Destructure for easier access ---
  const {
    name,
    treesPlanted,
    co2Offset,
    eventsParticipated,
    rank,
    totalUsers,
    badges,
    eventHistory,
  } = impact;

  // ============================
  // UI SECTION
  // ============================
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* --- Header Section --- */}
        <section className="bg-gradient-to-r from-nature-leaf to-primary py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-5xl mb-4">
              Karibu, {name} 🌱
            </h1>
            <p className="text-xl text-white/90">
              Track your contribution to Kenya's reforestation
            </p>
          </div>
        </section>

        {/* --- Stats Overview Section --- */}
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
                value={rank}
                icon={TrendingUp}
                description={`Your rank out of ${totalUsers}`}
                gradient="from-nature-earth/20 to-secondary/20"
              />
            </div>

            {/* --- Inspirational Quote --- */}
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

            {/* --- Impact Chart + Badges Section --- */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 📈 Impact Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-['Lora']">Your Impact Over Time</CardTitle>
                  <CardDescription>Trees planted per month</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  {loading ? (
                    <p className="text-center text-muted-foreground">Loading impact data...</p>
                  ) : data.length === 0 ? (
                    <p className="text-center text-muted-foreground">No impact data yet.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="trees"
                          stroke="#16a34a" // Tailwind "green-600"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* 🏅 Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-['Lora']">Achievement Badges</CardTitle>
                  <CardDescription>Your environmental milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {badges.length > 0 ? (
                      badges.map((badge, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Award className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{badge}</div>
                            <div className="text-sm text-muted-foreground">Earned</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No badges earned yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* --- Event History --- */}
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
                  {eventHistory.map(event => (
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
