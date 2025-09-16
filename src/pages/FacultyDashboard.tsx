import React from 'react';
import { Calendar, Users, BookOpen, Clock, FileText, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';

const FacultyDashboard = () => {
  const todayClasses = [
    {
      subject: "Computer Science 101",
      time: "09:00 - 10:30",
      room: "Smart Lab A-204",
      students: 45,
      status: "upcoming"
    },
    {
      subject: "Data Structures",
      time: "11:00 - 12:30",
      room: "Classroom B-105",
      students: 38,
      status: "upcoming"
    },
    {
      subject: "Algorithm Design",
      time: "14:00 - 15:30",
      room: "Smart Lab A-206",
      students: 42,
      status: "upcoming"
    }
  ];

  const assignments = [
    { title: "Programming Assignment 3", course: "CS 101", dueDate: "2024-01-15", submitted: 35, total: 45 },
    { title: "Data Structure Project", course: "DS 201", dueDate: "2024-01-20", submitted: 28, total: 38 },
    { title: "Algorithm Analysis", course: "AD 301", dueDate: "2024-01-25", submitted: 40, total: 42 }
  ];

  return (
    <DashboardLayout title="Faculty Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-card rounded-lg p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-nova-navy mb-2">Good morning, Prof. Chen!</h2>
          <p className="text-nova-navy/70">You have 3 classes scheduled for today. Ready to inspire minds?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-navy">125</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-navy">3</div>
              <p className="text-xs text-muted-foreground">Spring 2024 semester</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <FileText className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-navy">12</div>
              <p className="text-xs text-muted-foreground">Assignments to grade</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-nova-navy" />
                <span>Today's Schedule</span>
              </CardTitle>
              <Button variant="nova-outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-nova-beige/20 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-nova-navy text-white rounded-lg">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-nova-navy">{class_.subject}</h4>
                      <p className="text-sm text-muted-foreground">{class_.room}</p>
                      <p className="text-xs text-muted-foreground">{class_.students} students enrolled</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-nova-navy">{class_.time}</p>
                    <Badge variant="secondary">Upcoming</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assignments Overview */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-nova-navy" />
              <span>Assignment Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold text-nova-navy">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-nova-navy">
                      {assignment.submitted}/{assignment.total}
                    </div>
                    <p className="text-xs text-muted-foreground">Submitted</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-nova-navy h-2 rounded-full" 
                        style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;