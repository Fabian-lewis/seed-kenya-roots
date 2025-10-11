export const mockCorporateData = {
  company: {
    name: "Safaricom PLC",
    logo: "https://via.placeholder.com/120x40/22c55e/ffffff?text=Company+Logo",
    tier: "Legacy Partner",
    joinDate: "2024-01-15"
  },
  impact: {
    treesPlanted: 45230,
    carbonOffset: 1356.9, // tons
    communitiesSupported: 12,
    employeeVolunteers: 847
  },
  projects: [
    {
      id: "1",
      name: "Karura Forest Expansion",
      county: "Nairobi",
      trees: 12000,
      survivalRate: 94,
      lat: -1.2341,
      lng: 36.8506,
      ngo: "Kenya Forest Service"
    },
    {
      id: "2",
      name: "Aberdare Reforestation",
      county: "Nyeri",
      trees: 18500,
      survivalRate: 91,
      lat: -0.3667,
      lng: 36.7167,
      ngo: "Green Belt Movement"
    },
    {
      id: "3",
      name: "Ngong Hills Green Project",
      county: "Kajiado",
      trees: 8200,
      survivalRate: 89,
      lat: -1.3833,
      lng: 36.6500,
      ngo: "Nature Kenya"
    },
    {
      id: "4",
      name: "Kakamega Forest Conservation",
      county: "Kakamega",
      trees: 6530,
      survivalRate: 96,
      lat: 0.2827,
      lng: 34.7519,
      ngo: "Friends of Kakamega Forest"
    }
  ],
  campaigns: [
    {
      id: "1",
      name: "10K Trees Challenge",
      goal: 10000,
      current: 8500,
      startDate: "2024-06-01",
      endDate: "2024-12-31",
      status: "active" as const
    },
    {
      id: "2",
      name: "Employee Green Week",
      goal: 5000,
      current: 5000,
      startDate: "2024-03-15",
      endDate: "2024-03-22",
      status: "completed" as const
    },
    {
      id: "3",
      name: "Carbon Neutral 2025",
      goal: 50000,
      current: 23230,
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      status: "active" as const
    }
  ],
  monthlyTrends: [
    { month: "Jan", trees: 3200, carbon: 96 },
    { month: "Feb", trees: 4100, carbon: 123 },
    { month: "Mar", trees: 5800, carbon: 174 },
    { month: "Apr", trees: 4500, carbon: 135 },
    { month: "May", trees: 6200, carbon: 186 },
    { month: "Jun", trees: 7100, carbon: 213 },
    { month: "Jul", trees: 5900, carbon: 177 },
    { month: "Aug", trees: 8430, carbon: 252.9 }
  ],
  financialBreakdown: [
    { category: "Tree Planting", percentage: 65, amount: 1950000 },
    { category: "Logistics & Transport", percentage: 20, amount: 600000 },
    { category: "Research & Monitoring", percentage: 10, amount: 300000 },
    { category: "Operations", percentage: 5, amount: 150000 }
  ],
  milestones: [
    { title: "10,000 Trees", achieved: true, date: "2024-03-20" },
    { title: "25,000 Trees", achieved: true, date: "2024-06-15" },
    { title: "50,000 Trees", achieved: false, progress: 90 },
    { title: "1,000 Volunteers", achieved: false, progress: 85 }
  ],
  updates: [
    {
      id: "1",
      title: "Karura Forest Project Update",
      content: "Successfully planted 2,000 indigenous trees with 100 volunteers from your team.",
      date: "2024-08-15",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"
    },
    {
      id: "2",
      title: "Aberdare Restoration Milestone",
      content: "Reached 91% survival rate - above national average. Your contribution is making a difference!",
      date: "2024-08-10",
      image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400"
    },
    {
      id: "3",
      title: "Community Impact Report",
      content: "Your partnership has supported 12 communities with sustainable livelihoods and environmental education.",
      date: "2024-08-01",
      image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=400"
    }
  ]
};
