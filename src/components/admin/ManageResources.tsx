import React, { useState } from 'react';
import { Users, BookOpen, Building, Plus, Search, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ManageResources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const facultyData = [
    { id: 1, name: "Dr. Sarah Johnson", department: "Computer Science", workload: "85%", availability: "Available", subjects: 3, leaves: 0 },
    { id: 2, name: "Prof. Michael Chen", department: "Computer Science", workload: "92%", availability: "Busy", subjects: 4, leaves: 1 },
    { id: 3, name: "Dr. Emily Davis", department: "Electrical", workload: "78%", availability: "Available", subjects: 2, leaves: 0 },
    { id: 4, name: "Prof. Robert Wilson", department: "Mechanical", workload: "88%", availability: "Available", subjects: 3, leaves: 0 },
    { id: 5, name: "Dr. Lisa Anderson", department: "Civil", workload: "95%", availability: "Overloaded", subjects: 5, leaves: 2 }
  ];

  const departments = [
    {
      name: "Computer Science",
      subjects: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering", "Machine Learning", "Computer Networks"]
    },
    {
      name: "Electrical Engineering", 
      subjects: ["Circuit Analysis", "Digital Electronics", "Power Systems", "Control Systems", "Signal Processing", "Electromagnetics"]
    },
    {
      name: "Mechanical Engineering",
      subjects: ["Thermodynamics", "Fluid Mechanics", "Manufacturing", "Machine Design", "Heat Transfer", "Mechanics of Materials"]
    },
    {
      name: "Civil Engineering",
      subjects: ["Structural Analysis", "Concrete Technology", "Surveying", "Environmental Engineering", "Transportation", "Geotechnical"]
    }
  ];

  const rooms = [
    { id: "C101", type: "Classroom", capacity: 60, status: "Available", department: "Computer Science" },
    { id: "C102", type: "Classroom", capacity: 45, status: "Occupied", department: "Computer Science" },
    { id: "L201", type: "Lab", capacity: 30, status: "Available", department: "Computer Science" },
    { id: "E101", type: "Classroom", capacity: 55, status: "Available", department: "Electrical" },
    { id: "E201", type: "Lab", capacity: 25, status: "Maintenance", department: "Electrical" },
    { id: "M101", type: "Classroom", capacity: 50, status: "Available", department: "Mechanical" },
    { id: "M301", type: "Lab", capacity: 20, status: "Available", department: "Mechanical" },
    { id: "A001", type: "Auditorium", capacity: 200, status: "Available", department: "General" }
  ];

  const getWorkloadColor = (workload: string) => {
    const percentage = parseInt(workload);
    if (percentage >= 95) return "destructive";
    if (percentage >= 85) return "secondary";
    return "default";
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "Available": return "default";
      case "Busy": return "secondary";
      case "Overloaded": return "destructive";
      default: return "default";
    }
  };

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "default";
      case "Occupied": return "secondary";
      case "Maintenance": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-nova-navy">Manage Resources</h2>
      
      <Tabs defaultValue="faculty" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faculty" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Faculty</span>
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Subjects</span>
          </TabsTrigger>
          <TabsTrigger value="rooms" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Buildings & Rooms</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faculty" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Faculty Overview</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="nova-outline" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    View Complaints
                  </Button>
                  <Button variant="nova-outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Leave Requests
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Faculty
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search faculty by name or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Workload</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Pending Leaves</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyData.map((faculty) => (
                    <TableRow key={faculty.id}>
                      <TableCell className="font-medium">{faculty.name}</TableCell>
                      <TableCell>{faculty.department}</TableCell>
                      <TableCell>
                        <Badge variant={getWorkloadColor(faculty.workload)}>
                          {faculty.workload}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getAvailabilityColor(faculty.availability)}>
                          {faculty.availability}
                        </Badge>
                      </TableCell>
                      <TableCell>{faculty.subjects}</TableCell>
                      <TableCell>{faculty.leaves}</TableCell>
                      <TableCell>
                        <Button variant="nova-outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Subjects by Department</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map((dept, index) => (
                  <Card key={index} className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {dept.subjects.map((subject, subIndex) => (
                          <div key={subIndex} className="flex items-center justify-between p-2 rounded border border-nova-beige/30">
                            <span className="text-sm">{subject}</span>
                            <Button variant="nova-outline" size="sm">
                              Assign Faculty
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Classrooms & Labs</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.id}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>{room.capacity} students</TableCell>
                      <TableCell>{room.department}</TableCell>
                      <TableCell>
                        <Badge variant={getRoomStatusColor(room.status)}>
                          {room.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="nova-outline" size="sm">
                            Edit
                          </Button>
                          <Button 
                            variant={room.status === "Available" ? "destructive" : "default"} 
                            size="sm"
                          >
                            {room.status === "Available" ? "Mark Unavailable" : "Mark Available"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageResources;