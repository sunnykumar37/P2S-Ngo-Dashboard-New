// NGODashboard.js - Main Component
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import PieChartComponent from './components/PieChartComponent';
import LineChartComponent from './components/LineChartComponent';
import BarChartComponent from './components/BarChartComponent';
import DonorTable from './components/DonorTable';
import ProjectsTable from './components/ProjectsTable';
import { PieChart, LineChart, BarChart, Users, DollarSign, Award, Calendar } from 'lucide-react';

const NGODashboard = () => {
  const [activeTimeRange, setActiveTimeRange] = useState('weekly');

  // Sample data
  const stats = [
    { id: 1, title: 'Total Donors', value: '783', icon: <Users size={20} />, color: 'bg-green-100 text-green-600' },
    { id: 2, title: 'Funds Raised', value: '$125,430', icon: <DollarSign size={20} />, color: 'bg-blue-100 text-blue-600' },
    { id: 3, title: 'Active Projects', value: '42', icon: <Award size={20} />, color: 'bg-purple-100 text-purple-600' },
    { id: 4, title: 'Upcoming Events', value: '8', icon: <Calendar size={20} />, color: 'bg-red-100 text-red-600' },
  ];

  const handleTimeRangeChange = (range) => {
    setActiveTimeRange(range);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">NGO Dashboard</h1>
            <p className="text-gray-500">Overview of organization performance and impact</p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map(stat => (
              <StatCard 
                key={stat.id} 
                title={stat.title} 
                value={stat.value} 
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Donation Distribution</h2>
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1 rounded text-sm ${activeTimeRange === 'weekly' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                    onClick={() => handleTimeRangeChange('weekly')}
                  >
                    Weekly
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm ${activeTimeRange === 'monthly' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                    onClick={() => handleTimeRangeChange('monthly')}
                  >
                    Monthly
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm ${activeTimeRange === 'yearly' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                    onClick={() => handleTimeRangeChange('yearly')}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              <PieChartComponent />
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Funds Overview</h2>
                <select className="px-3 py-1 border rounded text-sm">
                  <option>Last 12 months</option>
                  <option>Last 6 months</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <LineChartComponent />
            </div>
          </div>
          
          {/* Projects and Donors Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Recent Projects</h2>
                <button className="text-blue-600 text-sm hover:underline">View All</button>
              </div>
              <ProjectsTable />
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Top Donors</h2>
                <button className="text-blue-600 text-sm hover:underline">View All</button>
              </div>
              <DonorTable />
            </div>
          </div>
          
          {/* Impact Metrics */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Impact Metrics</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-600">By Region</button>
                <button className="px-3 py-1 rounded text-sm bg-gray-100">By Program</button>
              </div>
            </div>
            <BarChartComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default NGODashboard;

// Header.js
import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Bell size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Settings size={20} />
          </button>
          <div className="flex items-center">
            <img
              src="/api/placeholder/32/32"
              alt="User"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// Sidebar.js
import React from 'react';
import { Home, Users, BarChart2, FileText, Settings, Calendar, DollarSign, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <Users size={20} />, label: 'Beneficiaries' },
    { icon: <DollarSign size={20} />, label: 'Donations' },
    { icon: <FileText size={20} />, label: 'Projects' },
    { icon: <Calendar size={20} />, label: 'Events' },
    { icon: <BarChart2 size={20} />, label: 'Reports' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold mr-2">N</div>
          <h1 className="text-xl font-bold">NGO Portal</h1>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center px-4 py-3 text-sm ${
                  item.active
                    ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <ul>
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
              <span className="mr-3"><HelpCircle size={20} /></span>
              Help & Support
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
              <span className="mr-3"><LogOut size={20} /></span>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

// StatCard.js
import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;

// PieChartComponent.js
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PieChartComponent = () => {
  const data = [
    { name: 'Education', value: 35 },
    { name: 'Healthcare', value: 25 },
    { name: 'Food Security', value: 20 },
    { name: 'Clean Water', value: 15 },
    { name: 'Emergency Relief', value: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;

// LineChartComponent.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = () => {
  const data = [
    { name: 'Jan', donations: 4000, expenses: 2400 },
    { name: 'Feb', donations: 3000, expenses: 1398 },
    { name: 'Mar', donations: 2000, expenses: 9800 },
    { name: 'Apr', donations: 2780, expenses: 3908 },
    { name: 'May', donations: 1890, expenses: 4800 },
    { name: 'Jun', donations: 2390, expenses: 3800 },
    { name: 'Jul', donations: 3490, expenses: 4300 },
    { name: 'Aug', donations: 4000, expenses: 2400 },
    { name: 'Sep', donations: 3000, expenses: 1398 },
    { name: 'Oct', donations: 2000, expenses: 9800 },
    { name: 'Nov', donations: 2780, expenses: 3908 },
    { name: 'Dec', donations: 1890, expenses: 4800 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="donations" stroke="#0088FE" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="expenses" stroke="#FF8042" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;

// BarChartComponent.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = () => {
  const data = [
    { name: 'North', beneficiaries: 4000, projects: 24 },
    { name: 'South', beneficiaries: 3000, projects: 13 },
    { name: 'East', beneficiaries: 2000, projects: 9 },
    { name: 'West', beneficiaries: 2780, projects: 39 },
    { name: 'Central', beneficiaries: 1890, projects: 48 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#0088FE" />
        <YAxis yAxisId="right" orientation="right" stroke="#FF8042" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="beneficiaries" fill="#0088FE" name="Beneficiaries Reached" />
        <Bar yAxisId="right" dataKey="projects" fill="#FF8042" name="Active Projects" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

// DonorTable.js
import React from 'react';

const DonorTable = () => {
  const donors = [
    { id: 1, name: 'Jane Smith Foundation', amount: '$25,000', date: '2025-03-15', status: 'Received' },
    { id: 2, name: 'Global Relief Corp', amount: '$18,500', date: '2025-03-10', status: 'Received' },
    { id: 3, name: 'Robert Johnson', amount: '$10,000', date: '2025-03-05', status: 'Pending' },
    { id: 4, name: 'Helping Hands Inc', amount: '$7,500', date: '2025-02-28', status: 'Received' },
    { id: 5, name: 'Future Fund', amount: '$5,000', date: '2025-02-25', status: 'Received' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {donors.map((donor) => (
            <tr key={donor.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donor.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  donor.status === 'Received' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {donor.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonorTable;

// ProjectsTable.js
import React from 'react';

const ProjectsTable = () => {
  const projects = [
    { 
      id: 1, 
      name: 'Clean Water Initiative', 
      budget: '$45,000', 
      progress: 75, 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Education for All', 
      budget: '$30,000', 
      progress: 50, 
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'Healthcare Outreach', 
      budget: '$25,000', 
      progress: 90, 
      status: 'Active' 
    },
    { 
      id: 4, 
      name: 'Food Security Program', 
      budget: '$20,000', 
      progress: 30, 
      status: 'Active' 
    },
    { 
      id: 5, 
      name: 'Community Development', 
      budget: '$15,000', 
      progress: 60, 
      status: 'Active' 
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.budget}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{project.progress}%</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {project.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
