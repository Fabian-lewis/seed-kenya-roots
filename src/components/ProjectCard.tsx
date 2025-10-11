import { Project } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Target, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

  
const ProjectCard = ({ project }: ProjectCardProps) => {
  const treesPlanted = project.trees_planted ?? project.trees_planted ?? 0;
  const treesTarget = project.trees_target ?? project.trees_target ?? 1; // avoid divide by zero
  //const progress = Math.min((treesPlanted / treesTarget) * 100, 100);
  const co2Offset = project.co2_offset ?? project.co2_offset ?? 0;
  const progress = (project.trees_planted / project.trees_target) * 100;

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-accent text-accent-foreground';
      case 'In Progress':
        return 'bg-primary text-primary-foreground';
      case 'Funded':
        return 'bg-nature-earth text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="overflow-hidden hover-lift border border-border bg-card">
      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMTEuMDQ2LTguOTU0LTIwLTIwLTIwUzAtNC45NTQgMCA3czguOTU0IDIwIDIwIDIwIDIwLTguOTU0IDIwLTIwem0tMiAwYzAgOS45NDEtOC4wNTkgMTgtMTggMThTMCAyMy45NDEgMCAxNCA4LjA1OS00IDE4LTRzMTggOC4wNTkgMTggMTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <Badge className={`absolute top-4 right-4 ${getStatusColor(project.status)}`}>
          {project.status}
        </Badge>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
            {project.name}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{project.county}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {project.trees_planted} / {project.trees_target} trees
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Target</p>
              <p className="text-sm font-semibold text-foreground">
                {project.trees_target}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">CO₂ Offset</p>
              <p className="text-sm font-semibold text-foreground">
                {(project.co2_offset / 1000).toFixed(1)}t
              </p>
            </div>
          </div>
        </div>

        <Link to={`/projects/${project.id}`}>
          <Button variant="default" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProjectCard;
