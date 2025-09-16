import React from 'react';
import { Calendar, BookOpen, Clock, FileText, Trophy, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';

const StudentDashboard = () => {
  const todayClasses = [
    {
      subject: "Computer Science 101",
      instructor: "Prof. Michael Chen",
      time: "09:00 - 10:30",
      room: "Smart Lab A-204",
      status: "upcoming"
    },
    {
      subject: "Mathematics 201",
      instructor: "Dr. Sarah Wilson",
      time: "11:00 - 12:30",
      room: "Classroom B-105",
      status: "upcoming"
    },
    {
      subject: "Physics Lab",
      instructor: "Dr. James Parker",
      time: "14:00 - 16:00",
      room: "Physics Lab C-301",
      status: "upcoming"
    }
  ];

  const assignments = [
    { 
      title: "Programming Assignment 3", 
      course: "CS 101", 
      dueDate: "2024-01-15", 
      status: "pending",
      daysLeft: 3
    },
    { 
      title: "Calculus Problem Set", 
      course: "Math 201", 
      dueDate: "2024-01-18", 
      status: "in-progress",
      daysLeft: 6
    },
    { 
      title: "Lab Report - Mechanics", 
      course: "Physics", 
      dueDate: "2024-01-20", 
      status: "pending",
      daysLeft: 8
    }
  ];

  const grades = [
    { course: "Computer Science 101", grade: "A-", progress: 88 },
    { course: "Mathematics 201", grade: "B+", progress: 85 },
    { course: "Physics Lab", grade: "A", progress: 92 }
  ];

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-card rounded-lg p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-nova-navy mb-2">Welcome back, Alex!</h2>
          <p className="text-nova-navy/70">You have 3 classes today and 3 assignments due this week. Let's make it a productive day!</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GPA</CardTitle>
              <Trophy className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-navy">3.7</div>
              <p className="text-xs text-muted-foreground">Current semester</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits</CardTitle>
              <BookOpen className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-navy">15</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Calendar className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-navy">94%</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <FileText className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-nova-navy">3</div>
              <p className="text-xs text-muted-foreground">Due this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-nova-navy" />
                <span>Today's Classes</span>
              </CardTitle>
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
                        <p className="text-sm text-muted-foreground">{class_.instructor}</p>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{class_.room}</span>
                        </div>
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

          {/* Assignments */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-nova-navy" />
                <span>Upcoming Assignments</span>
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
                        {assignment.daysLeft} days
                      </div>
                      <Badge 
                        variant={assignment.status === 'pending' ? 'destructive' : 'secondary'}
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Progress */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-nova-navy" />
              <span>Course Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {grades.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-nova-navy">{course.course}</span>
                    <Badge variant="secondary" className="text-nova-navy">
                      {course.grade}
                    </Badge>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{course.progress}% complete</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;