import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, Target, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Campaign {
  id: string;
  name: string;
  goal: number;
  current: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
}

interface CampaignManagerProps {
  campaigns: Campaign[];
}

const CampaignManager = ({ campaigns }: CampaignManagerProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-2xl text-foreground">
          Campaign Management
        </h3>
        <Button className="hover-scale">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const progress = (campaign.current / campaign.goal) * 100;
          const isCompleted = campaign.status === 'completed';

          return (
            <div
              key={campaign.id}
              className="p-5 bg-gradient-to-r from-card to-card/50 border border-border rounded-lg hover-lift"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${isCompleted ? 'bg-nature-leaf/20' : 'bg-primary/20'}`}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-nature-leaf" />
                    ) : (
                      <Target className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-foreground">
                      {campaign.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </p>
                  </div>
                </div>
                <Badge variant={isCompleted ? "default" : "secondary"}>
                  {isCompleted ? 'Completed' : 'Active'}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">
                    {campaign.current.toLocaleString()} / {campaign.goal.toLocaleString()} trees
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">
                  {progress.toFixed(1)}% achieved
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CampaignManager;
