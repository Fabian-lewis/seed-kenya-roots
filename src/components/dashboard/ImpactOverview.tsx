import { TreePine, Wind, Users, Heart } from 'lucide-react';
import StatsCard from '@/components/StatsCard';

interface ImpactOverviewProps {
  impact: {
    treesPlanted: number;
    carbonOffset: number;
    communitiesSupported: number;
    employeeVolunteers: number;
  };
}

const ImpactOverview = ({ impact }: ImpactOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <p className="text-xl text-muted-foreground italic">
          "He who plants a tree plants hope."
        </p>
        <p className="text-sm text-muted-foreground mt-2">— Lucy Larcom</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Trees Planted"
          value={impact.treesPlanted.toLocaleString()}
          icon={TreePine}
          description="Total contribution"
          gradient="from-primary/20 to-primary-light/20"
        />
        <StatsCard
          title="Carbon Offset"
          value={`${impact.carbonOffset.toLocaleString()} tons`}
          icon={Wind}
          description="CO₂ removed"
          gradient="from-accent/20 to-nature-sky/20"
        />
        <StatsCard
          title="Communities"
          value={impact.communitiesSupported}
          icon={Heart}
          description="Schools supported"
          gradient="from-nature-earth/20 to-secondary/20"
        />
        <StatsCard
          title="Volunteers"
          value={impact.employeeVolunteers.toLocaleString()}
          icon={Users}
          description="Employee participants"
          gradient="from-nature-leaf/20 to-primary/20"
        />
      </div>
    </div>
  );
};

export default ImpactOverview;
