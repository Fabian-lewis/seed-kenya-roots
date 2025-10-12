import { TreePine, Users, Wind, Target, ArrowRight, CheckCircle2, Briefcase, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import EventCard from '@/components/EventCard';
import StatsCard from '@/components/StatsCard';
import heroImage from '@/assets/hero-forest.jpg';
import { useEffect, useState } from 'react';

import { supabase } from '@/services/supabaseClient';



const Index = () => {

  // Fetch Featuring Projects 
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
      const fetchEvents = async () => {
        try{
          setLoading(true);
          setError(null);

          // ---Fetch from supabase---
          const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', {ascending: false})
            .limit(3);

          if (error) throw error;

          setEvents(data);
        } catch (err) {
          console.error('Error fetching events:', err);
          setError('Failed to load events.');
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();

    }, []);


  const [stats, setStats] = useState({
    totalProjects: 0,
    totalEvents: 0,
    totalTreesPlanted: 0,
    totalTreesTarget: 0,
    communityMembers:0,
    co2Offset:0
  });
  
  
  // Runs once to fetch all rows
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Projects data
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('*');
  
        if (projectsError) throw projectsError;
  
        const totalTreesTarget = projects.reduce((acc, p) => acc + (p.trees_target || 0), 0);
        const totalTreesPlanted = projects.reduce((acc, p) => acc + (p.trees_planted || 0), 0);
        const co2Offset = (totalTreesPlanted * 0.01)
  
        // Events count
        const { count: eventsCount, error: eventsError } = await supabase
          .from('events')
          .select('*', { count: 'exact', head: true });
  
        if (eventsError) throw eventsError;

        // Community members count
        const { count: usersCount, error: usersError} = await supabase
        .from('users')
        .select('*', {count: 'exact', head: true})

        if (usersError) throw usersError;
  
        setStats({
          totalProjects: projects.length,
          totalEvents: eventsCount || 0,
          totalTreesPlanted:totalTreesPlanted,
          totalTreesTarget:totalTreesTarget,
          co2Offset:co2Offset,
          communityMembers:usersCount
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
  
    fetchStats();
  }, []);
  

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white animate-fade-in">
            <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6 leading-tight">
              Reforesting Kenya,{' '}
              <span className="text-accent">One Seed at a Time</span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Join us in restoring Kenya's forests. Plant trees, track your impact, 
              and connect with local reforestation projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/projects">
                <Button size="lg" variant="default" className="text-lg px-8">
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/events">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg px-8 bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Join an Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              title="Trees Planted"
              value={stats.totalTreesPlanted}
              icon={TreePine}
              description="And counting..."
              gradient="from-primary/20 to-primary-light/20"
            />
            <StatsCard
              title="CO₂ Offset"
              value={`${stats.co2Offset}t`}
              icon={Wind}
              description="Carbon removed"
              gradient="from-accent/20 to-nature-sky/20"
            />
            <StatsCard
              title="Community Members"
              value={stats.communityMembers}
              icon={Users}
              description="Active volunteers"
              gradient="from-nature-earth/20 to-secondary/20"
            />
            <StatsCard
              title="Active Projects"
              value={stats.totalEvents}
              icon={Target}
              description="Across Kenya"
              gradient="from-primary-light/20 to-accent/20"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl mb-4 text-foreground">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to make a lasting impact on Kenya's environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-heading font-bold text-3xl text-primary">1</span>
              </div>
              <h3 className="font-heading font-semibold text-2xl text-foreground">
                Choose a Project
              </h3>
              <p className="text-muted-foreground">
                Browse reforestation projects across different counties in Kenya. 
                Each project targets specific environmental needs.
              </p>
            </div>

            <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-heading font-bold text-3xl text-accent">2</span>
              </div>
              <h3 className="font-heading font-semibold text-2xl text-foreground">
                Participate
              </h3>
              <p className="text-muted-foreground">
                Join tree planting events in your area. Meet like-minded people 
                and contribute directly to environmental restoration.
              </p>
            </div>

            <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-nature-earth/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-heading font-bold text-3xl text-nature-earth">3</span>
              </div>
              <h3 className="font-heading font-semibold text-2xl text-foreground">
                Track Impact
              </h3>
              <p className="text-muted-foreground">
                See your environmental contribution grow. Track trees planted, 
                CO₂ offset, and watch your impact multiply over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-heading font-bold text-4xl mb-2 text-foreground">
                Upcoming Events
              </h2>
              <p className="text-lg text-muted-foreground">
                Upcoming community activities across Kenya
              </p>
            </div>
            <Link to="/events">
              <Button variant="outline">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-3xl p-12 text-center text-white">
            <TreePine className="h-16 w-16 mx-auto mb-6 animate-float" />
            <h2 className="font-heading font-bold text-4xl mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Every tree you plant brings life to our planet. Join our community 
              of environmental champions today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 bg-white text-primary hover:bg-white/90"
                >
                  Get Started
                  <CheckCircle2 className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/events">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white/10"
                >
                  View Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
