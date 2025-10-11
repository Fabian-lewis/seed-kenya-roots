import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { Input } from '@/components/ui/input';
import { mockEvents } from '@/data/mockData';
import { Search, Calendar } from 'lucide-react';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = mockEvents.filter((event) => {
    return event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           event.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
           event.projectName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-r from-accent to-nature-sky py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <Calendar className="h-12 w-12 mr-4" />
              <h1 className="font-heading font-bold text-5xl">
                Tree Planting Events
              </h1>
            </div>
            <p className="text-xl text-white/90">
              Join community tree planting events and make a direct impact
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="py-8 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events by name, location, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  No events found matching your search.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
