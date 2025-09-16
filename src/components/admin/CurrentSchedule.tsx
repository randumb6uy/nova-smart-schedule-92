import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const CurrentSchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');

  const scheduleData = [
    { time: "9:00-10:00", monday: "Math (C101)", tuesday: "Physics (C102)", wednesday: "Chemistry (L201)", thursday: "English (C103)", friday: "History (C104)" },
    { time: "10:00-11:00", monday: "Physics (C102)", tuesday: "Chemistry (L201)", wednesday: "Math (C101)", thursday: "History (C104)", friday: "English (C103)" },
    { time: "11:30-12:30", monday: "Chemistry (L201)", tuesday: "English (C103)", wednesday: "Physics (C102)", thursday: "Math (C101)", friday: "Lab (L301)" },
    { time: "1:30-2:30", monday: "English (C103)", tuesday: "History (C104)", wednesday: "English (C103)", thursday: "Physics (C102)", friday: "Chemistry (L201)" },
    { time: "2:30-3:30", monday: "Lab (L301)", tuesday: "Math (C101)", wednesday: "History (C104)", thursday: "Chemistry (L201)", friday: "Math (C101)" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-nova-navy">Current Schedule</h2>
      
      {/* Search and Filter Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schedules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="electrical">Electrical Engineering</SelectItem>
                <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                <SelectItem value="civil">Civil Engineering</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">First Year</SelectItem>
                <SelectItem value="2">Second Year</SelectItem>
                <SelectItem value="3">Third Year</SelectItem>
                <SelectItem value="4">Fourth Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedDivision} onValueChange={setSelectedDivision}>
              <SelectTrigger>
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Division A</SelectItem>
                <SelectItem value="b">Division B</SelectItem>
                <SelectItem value="c">Division C</SelectItem>
                <SelectItem value="d">Division D</SelectItem>
                <SelectItem value="e">Division E</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <Button variant="nova-outline" onClick={() => {
              setSearchTerm('');
              setSelectedDepartment('');
              setSelectedYear('');
              setSelectedDivision('');
            }}>
              Clear Filters
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Showing schedule for: Computer Science - Third Year - Division A
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Display */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Weekly Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-nova-beige/50">
                  <th className="border border-gray-200 p-3 text-left font-semibold">Time</th>
                  <th className="border border-gray-200 p-3 text-center font-semibold">Monday</th>
                  <th className="border border-gray-200 p-3 text-center font-semibold">Tuesday</th>
                  <th className="border border-gray-200 p-3 text-center font-semibold">Wednesday</th>
                  <th className="border border-gray-200 p-3 text-center font-semibold">Thursday</th>
                  <th className="border border-gray-200 p-3 text-center font-semibold">Friday</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((slot, index) => (
                  <tr key={index} className="hover:bg-nova-beige/20 transition-colors">
                    <td className="border border-gray-200 p-3 font-medium bg-nova-beige/30">{slot.time}</td>
                    <td className="border border-gray-200 p-3 text-center">{slot.monday}</td>
                    <td className="border border-gray-200 p-3 text-center">{slot.tuesday}</td>
                    <td className="border border-gray-200 p-3 text-center">{slot.wednesday}</td>
                    <td className="border border-gray-200 p-3 text-center">{slot.thursday}</td>
                    <td className="border border-gray-200 p-3 text-center">{slot.friday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Last updated: March 15, 2024 at 2:30 PM
            </div>
            
            <div className="flex space-x-2">
              <Button variant="nova-outline">
                Export PDF
              </Button>
              <Button variant="nova-outline">
                Print Schedule
              </Button>
              <Button>
                Edit Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
              <span>Theory Classes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span>Practical/Lab</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
              <span>Tutorials</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
              <span>Free Period</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentSchedule;