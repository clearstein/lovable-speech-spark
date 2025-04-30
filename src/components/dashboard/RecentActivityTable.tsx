
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ActivityLog {
  id: string;
  user: string;
  userType: string;
  action: string;
  createdAt: string;
}

interface RecentActivityTableProps {
  activityLogs: ActivityLog[];
}

const RecentActivityTable = ({ activityLogs }: RecentActivityTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>The latest events across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-medium text-muted-foreground border-b">
                <th className="p-2 pl-0">User</th>
                <th className="p-2">Type</th>
                <th className="p-2">Action</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.map(log => (
                <tr key={log.id} className="border-b">
                  <td className="p-2 pl-0">{log.user}</td>
                  <td className="p-2">{log.userType}</td>
                  <td className="p-2">{log.action}</td>
                  <td className="p-2">{log.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityTable;
