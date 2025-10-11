import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImpactOverview from '@/components/dashboard/ImpactOverview';
import ImpactMap from '@/components/dashboard/ImpactMap';
import CampaignManager from '@/components/dashboard/CampaignManager';
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts';
import MilestonesSection from '@/components/dashboard/MilestonesSection';
import UpdatesFeed from '@/components/dashboard/UpdatesFeed';
import { mockCorporateData } from '@/data/corporateMockData';
import { Button } from '@/components/ui/button';
import { Download, Settings } from 'lucide-react';

const CorporateDashboard = () => {
  const { company, impact, projects, campaigns, monthlyTrends, financialBreakdown, milestones, updates } = mockCorporateData;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-nature-sky/5">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-primary via-nature-leaf to-primary-light py-12 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-12 bg-white/90 px-4 py-2 rounded-lg"
                />
                <div>
                  <h1 className="font-heading font-bold text-4xl">
                    {company.name}
                  </h1>
                  <p className="text-white/90 mt-1">
                    {company.tier} • Member since {new Date(company.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="secondary" className="hover-scale">
                  <Download className="h-4 w-4 mr-2" />
                  ESG Report
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-scale">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Impact Overview */}
          <ImpactOverview impact={impact} />

          {/* Map and Campaigns Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImpactMap projects={projects} />
            <CampaignManager campaigns={campaigns} />
          </div>

          {/* Analytics Charts */}
          <AnalyticsCharts 
            monthlyTrends={monthlyTrends} 
            financialBreakdown={financialBreakdown} 
          />

          {/* Milestones */}
          <MilestonesSection milestones={milestones} />

          {/* Updates Feed */}
          <UpdatesFeed updates={updates} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CorporateDashboard;
