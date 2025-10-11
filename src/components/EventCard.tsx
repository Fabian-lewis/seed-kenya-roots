import { Event } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const formattedDate = format(new Date(event.date), 'MMM dd, yyyy');

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
          <p className="text-xs text-muted-foreground">{event.projectName}</p>
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
            <span>{event.participantsCount} participants</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <TreePine className="h-4 w-4 mr-2 text-accent" />
            <span>{event.treesTarget.toLocaleString()} trees target</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <Link to={`/events/${event.id}`}>
          <Button variant="default" className="w-full">
            Join Event
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default EventCard;
