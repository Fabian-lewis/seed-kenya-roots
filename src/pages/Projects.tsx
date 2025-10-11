import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProjects } from '@/data/mockData';
import { Search } from 'lucide-react';
import { supabase } from '@/services/supabaseClient'

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching projects:', error);
      else setProjects(data || []);

      setLoading(false);
    };

    fetchProjects();
  }, []);


  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.county.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary to-primary-light py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-5xl mb-4">
              Reforestation Projects
            </h1>
            <p className="text-xl text-white/90">
              Discover and support reforestation initiatives across Kenya
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by project name or county..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Funded">Funded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Loading projects...</p>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  No projects found matching your criteria.
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

export default Projects;
