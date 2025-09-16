import React, { useState } from 'react';
import { Calendar, BarChart3, Settings, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminHeader from '@/components/AdminHeader';
import TimetableGenerator from '@/components/admin/TimetableGenerator';
import ManageResources from '@/components/admin/ManageResources';
import CurrentSchedule from '@/components/admin/CurrentSchedule';
import Analytics from '@/components/admin/Analytics';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="generate" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Generate Timetable</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Manage Resources</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Current Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <TimetableGenerator />
          </TabsContent>

          <TabsContent value="resources">
            <ManageResources />
          </TabsContent>

          <TabsContent value="schedule">
            <CurrentSchedule />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;