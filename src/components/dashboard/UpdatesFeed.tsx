import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Share2, Download } from 'lucide-react';

interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
}

interface UpdatesFeedProps {
  updates: Update[];
}

const UpdatesFeed = ({ updates }: UpdatesFeedProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-2xl text-foreground">
          Project Updates & Media
        </h3>
        <Button variant="outline" size="sm" className="hover-scale">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="space-y-6">
        {updates.map((update) => (
          <div
            key={update.id}
            className="flex flex-col md:flex-row gap-4 p-5 bg-gradient-to-r from-card to-card/50 border border-border rounded-lg hover-lift"
          >
            <img
              src={update.image}
              alt={update.title}
              className="w-full md:w-48 h-32 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-heading font-semibold text-lg text-foreground">
                  {update.title}
                </h4>
                <Button variant="ghost" size="sm" className="hover-scale">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {update.content}
              </p>
              <div className="flex items-center text-xs text-muted-foreground pt-2">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(update.date)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Share your impact story on social media
        </p>
        <div className="flex items-center justify-center space-x-3">
          <Button variant="outline" size="sm" className="hover-scale">
            Share on LinkedIn
          </Button>
          <Button variant="outline" size="sm" className="hover-scale">
            Share on Twitter
          </Button>
          <Button variant="outline" size="sm" className="hover-scale">
            Download Infographic
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default UpdatesFeed;
