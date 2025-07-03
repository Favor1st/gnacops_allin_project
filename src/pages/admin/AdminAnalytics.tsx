
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminAnalytics = () => {
  const membershipData = [
    { month: 'Jan', members: 120, revenue: 24000 },
    { month: 'Feb', members: 150, revenue: 30000 },
    { month: 'Mar', members: 180, revenue: 36000 },
    { month: 'Apr', members: 200, revenue: 40000 },
    { month: 'May', members: 220, revenue: 44000 },
    { month: 'Jun', members: 250, revenue: 50000 },
  ];

  const membershipTypes = [
    { name: 'Institutional', value: 45, color: '#D4AF37' },
    { name: 'Teacher Council', value: 30, color: '#228B22' },
    { name: 'Parent Council', value: 15, color: '#DC143C' },
    { name: 'Proprietor', value: 10, color: '#4169E1' },
  ];

  const marketplaceData = [
    { month: 'Jan', orders: 85, revenue: 12500 },
    { month: 'Feb', orders: 92, revenue: 15000 },
    { month: 'Mar', orders: 108, revenue: 18000 },
    { month: 'Apr', orders: 125, revenue: 22000 },
    { month: 'May', orders: 140, revenue: 25000 },
    { month: 'Jun', orders: 155, revenue: 28000 },
  ];

  return (
    <AdminLayout 
      title="Analytics Dashboard" 
      description="Comprehensive analytics and reporting"
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">GHS 406,189</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Marketplace Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">705</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68.5%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Membership Analytics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Membership Growth</CardTitle>
              <CardDescription>Monthly membership registrations and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={membershipData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="members" fill="#D4AF37" name="New Members" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Membership Distribution</CardTitle>
              <CardDescription>Members by category type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={membershipTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {membershipTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analytics */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Combined membership and marketplace revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={membershipData.map((item, index) => ({
                ...item,
                marketplaceRevenue: marketplaceData[index]?.revenue || 0
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#D4AF37" 
                  strokeWidth={2}
                  name="Membership Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="marketplaceRevenue" 
                  stroke="#228B22" 
                  strokeWidth={2}
                  name="Marketplace Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Marketplace Analytics */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Marketplace Performance</CardTitle>
            <CardDescription>Orders and revenue from marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketplaceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#228B22" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
