import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  county: string;
  trees: number;
  survivalRate: number;
  ngo: string;
}

interface ImpactMapProps {
  projects: Project[];
}

const ImpactMap = ({ projects }: ImpactMapProps) => {
  return (
    <Card className="p-6">
      <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
        Impact Map
      </h3>
      
      {/* Map Placeholder */}
      <div className="relative bg-gradient-to-br from-nature-sky/20 to-primary/10 rounded-lg h-96 mb-6 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-primary mx-auto mb-4 animate-float" />
          <p className="text-muted-foreground">
            Interactive map visualization coming soon
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Showing {projects.length} supported projects across Kenya
          </p>
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-start justify-between p-4 bg-card/50 border border-border rounded-lg hover-lift"
          >
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">{project.name}</h4>
                <p className="text-sm text-muted-foreground">{project.county}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Managed by {project.ngo}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary">{project.trees.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">trees</p>
              <p className="text-xs text-nature-leaf mt-1">{project.survivalRate}% survival</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ImpactMap;
