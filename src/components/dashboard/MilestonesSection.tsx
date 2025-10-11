import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, CheckCircle2, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Milestone {
  title: string;
  achieved: boolean;
  date?: string;
  progress?: number;
}

interface MilestonesSectionProps {
  milestones: Milestone[];
}

const MilestonesSection = ({ milestones }: MilestonesSectionProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="h-6 w-6 text-primary" />
        <h3 className="font-heading font-bold text-2xl text-foreground">
          Milestones & Achievements
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`p-5 border rounded-lg ${
              milestone.achieved 
                ? 'bg-gradient-to-br from-nature-leaf/10 to-primary/5 border-nature-leaf/30' 
                : 'bg-card border-border'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                {milestone.achieved ? (
                  <CheckCircle2 className="h-6 w-6 text-nature-leaf mt-1" />
                ) : (
                  <Clock className="h-6 w-6 text-muted-foreground mt-1" />
                )}
                <div>
                  <h4 className="font-heading font-semibold text-lg text-foreground">
                    {milestone.title}
                  </h4>
                  {milestone.date && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Achieved on {new Date(milestone.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  )}
                </div>
              </div>
              <Badge variant={milestone.achieved ? "default" : "secondary"}>
                {milestone.achieved ? 'Completed' : 'In Progress'}
              </Badge>
            </div>

            {!milestone.achieved && milestone.progress && (
              <div className="space-y-2 mt-3">
                <Progress value={milestone.progress} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">
                  {milestone.progress}% complete
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MilestonesSection;
