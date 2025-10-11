import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, TreePine } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/services/supabaseClient';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const EventCard = ({ event }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be logged in to register for an event.',
      });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.from('event_registrations').insert({
      user_id: user.id,
      event_id: event.id,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes('duplicate')) {
        toast({
          title: 'Already registered',
          description: 'You have already joined this event.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to register for the event.',
        });
        console.error(error);
      }
    } else {
      toast({
        title: 'Success',
        description: `You’ve successfully registered for ${event.name}!`,
      });
    }
  };

  const formattedDate = event.event_date
    ? format(new Date(event.event_date), 'MMM dd, yyyy')
    : 'TBA';

  return (
    <Card className="overflow-hidden hover-lift border border-border bg-card">
      <div className="h-32 bg-gradient-to-br from-accent/20 to-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMTEuMDQ2LTguOTU0LTIwLTIwLTIwUzAtNC45NTQgMCA3czguOTU0IDIwIDIwIDIwIDIwLTguOTU0IDIwLTIwem0tMiAwYzAgOS45NDEtOC4wNTkgMTgtMTggMThTMCAyMy45NDEgMCAxNCA4LjA1OS00IDE4LTRzMTggOC4wNTkgMTggMTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            {event.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {event.project_name}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-primary" />
            <span>{event.participants_count} participants</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <TreePine className="h-4 w-4 mr-2 text-accent" />
            <span>{event.trees_target.toLocaleString()} trees target</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <Button onClick={handleJoin} className="w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Join Event'}
        </Button>
      </div>
    </Card>
  );
};

export default EventCard;
