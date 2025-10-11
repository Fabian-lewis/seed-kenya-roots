import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  gradient?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description,
  gradient = 'from-primary/20 to-accent/20'
}: StatsCardProps) => {
  return (
    <Card className={`p-6 border border-border bg-gradient-to-br ${gradient} hover-lift`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-heading font-bold text-foreground">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="bg-card/80 backdrop-blur-sm p-3 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
