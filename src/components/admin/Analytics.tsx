import React from 'react';
import { BarChart3, Users, GraduationCap, Building, TrendingUp, Clock, BookOpen, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Analytics = () => {
  const stats = [
    {
      title: "Total Teachers",
      value: "156",
      change: "+8",
      changeType: "increase",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Students",
      value: "2,847",
      change: "+127",
      changeType: "increase", 
      icon: GraduationCap,
      color: "text-green-600"
    },
    {
      title: "Classrooms",
      value: "89",
      change: "+2",
      changeType: "increase",
      icon: Building,
      color: "text-purple-600"
    },
    {
      title: "Avg. Utilization",
      value: "87%",
      change: "+5%",
      changeType: "increase",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const workloadData = [
    { name: "Dr. Sarah Johnson", department: "CS", workload: 92, classes: 18 },
    { name: "Prof. Michael Chen", department: "CS", workload: 88, classes: 16 },
    { name: "Dr. Emily Davis", department: "EE", workload: 85, classes: 15 },
    { name: "Prof. Robert Wilson", department: "ME", workload: 78, classes: 14 },
    { name: "Dr. Lisa Anderson", department: "CE", workload: 95, classes: 19 },
    { name: "Prof. David Brown", department: "CS", workload: 82, classes: 16 },
    { name: "Dr. Jennifer White", department: "EE", workload: 90, classes: 17 },
    { name: "Prof. Thomas Green", department: "ME", workload: 75, classes: 13 }
  ];

  const departmentStats = [
    { name: "Computer Science", students: 824, faculty: 42, utilization: 94 },
    { name: "Electrical Engineering", students: 756, faculty: 38, utilization: 89 },
    { name: "Mechanical Engineering", students: 698, faculty: 40, utilization: 85 },
    { name: "Civil Engineering", students: 569, faculty: 36, utilization: 82 }
  ];

  const timeSlotUsage = [
    { slot: "9:00-10:00", usage: 95 },
    { slot: "10:00-11:00", usage: 92 },
    { slot: "11:30-12:30", usage: 88 },
    { slot: "1:30-2:30", usage: 85 },
    { slot: "2:30-3:30", usage: 78 },
    { slot: "3:30-4:30", usage: 65 }
  ];

  const getWorkloadColor = (workload: number) => {
    if (workload >= 90) return "text-red-600";
    if (workload >= 80) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-nova-navy">Analytics Dashboard</h2>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-all hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-navy">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teacher Workload Distribution */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Teacher Workload Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workloadData.map((teacher, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{teacher.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">({teacher.department})</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${getWorkloadColor(teacher.workload)}`}>
                        {teacher.workload}%
                      </span>
                      <div className="text-xs text-muted-foreground">
                        {teacher.classes} classes/week
                      </div>
                    </div>
                  </div>
                  <Progress value={teacher.workload} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Department Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index} className="p-4 border border-nova-beige/30 rounded-lg">
                  <h4 className="font-semibold text-nova-navy mb-2">{dept.name}</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Students</div>
                      <div className="font-bold">{dept.students}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Faculty</div>
                      <div className="font-bold">{dept.faculty}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Utilization</div>
                      <div className="font-bold text-green-600">{dept.utilization}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Slot Usage */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Time Slot Usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeSlotUsage.map((slot, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{slot.slot}</span>
                    <span className="font-bold">{slot.usage}%</span>
                  </div>
                  <Progress value={slot.usage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>System Health & Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Overall System Efficiency</span>
                  <span className="text-sm font-bold text-green-600">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Schedule Conflicts</span>
                  <span className="text-sm font-bold text-yellow-600">3%</span>
                </div>
                <Progress value={3} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Resource Utilization</span>
                  <span className="text-sm font-bold text-blue-600">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Faculty Satisfaction</span>
                  <span className="text-sm font-bold text-green-600">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>

              <div className="mt-4 pt-4 border-t border-nova-beige/30">
                <div className="text-sm text-muted-foreground">
                  <div>Last system update: March 15, 2024</div>
                  <div>Next maintenance: March 30, 2024</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;