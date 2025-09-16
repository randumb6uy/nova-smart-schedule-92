import React, { useState } from 'react';
import { Calendar, Download, FileText, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const TimetableGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTimetables, setGeneratedTimetables] = useState<any[]>([]);
  const [showDummyData, setShowDummyData] = useState(false);

  const generateTimetables = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTimetables = [
      {
        id: 1,
        name: "Optimized Schedule A",
        efficiency: "94%",
        conflicts: 0,
        schedule: [
          { time: "9:00-10:00", monday: "Math", tuesday: "Physics", wednesday: "Chemistry", thursday: "English", friday: "History" },
          { time: "10:00-11:00", monday: "Physics", tuesday: "Chemistry", wednesday: "Math", thursday: "History", friday: "English" },
          { time: "11:30-12:30", monday: "Chemistry", tuesday: "English", wednesday: "Physics", thursday: "Math", friday: "Lab" },
          { time: "1:30-2:30", monday: "English", tuesday: "History", wednesday: "English", thursday: "Physics", friday: "Chemistry" },
          { time: "2:30-3:30", monday: "Lab", tuesday: "Math", wednesday: "History", thursday: "Chemistry", friday: "Math" }
        ]
      },
      {
        id: 2,
        name: "Balanced Schedule B",
        efficiency: "91%",
        conflicts: 2,
        schedule: [
          { time: "9:00-10:00", monday: "Chemistry", tuesday: "Math", wednesday: "Physics", thursday: "History", friday: "English" },
          { time: "10:00-11:00", monday: "English", tuesday: "Physics", wednesday: "Chemistry", thursday: "Math", friday: "History" },
          { time: "11:30-12:30", monday: "Math", tuesday: "History", wednesday: "English", thursday: "Physics", friday: "Lab" },
          { time: "1:30-2:30", monday: "Physics", tuesday: "Chemistry", wednesday: "Math", thursday: "English", friday: "Chemistry" },
          { time: "2:30-3:30", monday: "History", tuesday: "Lab", wednesday: "History", thursday: "Lab", friday: "Physics" }
        ]
      },
      {
        id: 3,
        name: "Faculty-Optimized C",
        efficiency: "88%",
        conflicts: 1,
        schedule: [
          { time: "9:00-10:00", monday: "Physics", tuesday: "Chemistry", wednesday: "Math", thursday: "English", friday: "History" },
          { time: "10:00-11:00", monday: "Math", tuesday: "English", wednesday: "Physics", thursday: "Chemistry", friday: "Lab" },
          { time: "11:30-12:30", monday: "History", tuesday: "Physics", wednesday: "Chemistry", thursday: "Math", friday: "English" },
          { time: "1:30-2:30", monday: "Chemistry", tuesday: "Math", wednesday: "History", thursday: "Physics", friday: "Math" },
          { time: "2:30-3:30", monday: "English", tuesday: "History", wednesday: "Lab", thursday: "History", friday: "Chemistry" }
        ]
      }
    ];
    
    setGeneratedTimetables(mockTimetables);
    setIsGenerating(false);
  };

  const selectTimetable = (id: number) => {
    console.log('Selected timetable:', id);
    // Handle timetable selection
  };

  const rejectTimetable = (id: number) => {
    setGeneratedTimetables(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-nova-navy mb-6">Timetable Generator</h2>
        
        {/* Input Form */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="electrical">Electrical Engineering</SelectItem>
                    <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                    <SelectItem value="civil">Civil Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">First Year</SelectItem>
                    <SelectItem value="2">Second Year</SelectItem>
                    <SelectItem value="3">Third Year</SelectItem>
                    <SelectItem value="4">Fourth Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="division">Division</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Division" />
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
              
              <div className="space-y-2">
                <Label htmlFor="students">Total Students</Label>
                <Input type="number" placeholder="50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="classes">Classes per Day</Label>
                <Input type="number" placeholder="5" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="constraints">Time Constraints</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="9:00 AM - 4:00 PM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-4">9:00 AM - 4:00 PM</SelectItem>
                    <SelectItem value="8-3">8:00 AM - 3:00 PM</SelectItem>
                    <SelectItem value="10-5">10:00 AM - 5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <Button 
                onClick={generateTimetables} 
                disabled={isGenerating}
                className="flex items-center space-x-2"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Calendar className="h-4 w-4" />
                )}
                <span>{isGenerating ? 'Generating...' : 'Generate Timetable'}</span>
              </Button>
              
              <Button variant="nova-outline">
                View Previous Timetables
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Timetables */}
      {generatedTimetables.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-nova-navy">Generated Timetables</h3>
          
          {generatedTimetables.map((timetable) => (
            <Card key={timetable.id} className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{timetable.name}</CardTitle>
                    <div className="flex space-x-4 text-sm text-muted-foreground mt-1">
                      <span>Efficiency: {timetable.efficiency}</span>
                      <span>Conflicts: {timetable.conflicts}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => selectTimetable(timetable.id)}>
                      Select
                    </Button>
                    <Button variant="destructive" onClick={() => rejectTimetable(timetable.id)}>
                      Reject
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-nova-beige/50">
                        <th className="border border-gray-200 p-2 text-left">Time</th>
                        <th className="border border-gray-200 p-2 text-center">Monday</th>
                        <th className="border border-gray-200 p-2 text-center">Tuesday</th>
                        <th className="border border-gray-200 p-2 text-center">Wednesday</th>
                        <th className="border border-gray-200 p-2 text-center">Thursday</th>
                        <th className="border border-gray-200 p-2 text-center">Friday</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timetable.schedule.map((slot: any, index: number) => (
                        <tr key={index}>
                          <td className="border border-gray-200 p-2 font-medium">{slot.time}</td>
                          <td className="border border-gray-200 p-2 text-center">{slot.monday}</td>
                          <td className="border border-gray-200 p-2 text-center">{slot.tuesday}</td>
                          <td className="border border-gray-200 p-2 text-center">{slot.wednesday}</td>
                          <td className="border border-gray-200 p-2 text-center">{slot.thursday}</td>
                          <td className="border border-gray-200 p-2 text-center">{slot.friday}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex space-x-4">
            <Button variant="nova-outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
            <Button variant="nova-outline" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Export to Excel</span>
            </Button>
          </div>
        </div>
      )}

      {/* Dummy Data Panel */}
      <Card className="shadow-soft">
        <Collapsible open={showDummyData} onOpenChange={setShowDummyData}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-nova-beige/20 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <span>Sample Data Overview</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${showDummyData ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-nova-navy mb-2">Departments & Structure</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Computer Science (4 years, 5 divisions each)</li>
                    <li>• Electrical Engineering (4 years, 5 divisions each)</li>
                    <li>• Mechanical Engineering (4 years, 5 divisions each)</li>
                    <li>• Civil Engineering (4 years, 5 divisions each)</li>
                    <li>• ~50 students per division</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-nova-navy mb-2">Faculty Distribution</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 156 total faculty members</li>
                    <li>• CS: 42 faculty</li>
                    <li>• EE: 38 faculty</li>
                    <li>• ME: 40 faculty</li>
                    <li>• CE: 36 faculty</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-nova-navy mb-2">Resources</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 89 active classrooms</li>
                    <li>• 24 specialized labs</li>
                    <li>• 12 seminar halls</li>
                    <li>• 6 auditoriums</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default TimetableGenerator;