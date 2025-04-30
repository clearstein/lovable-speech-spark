
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, UserPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Mock data for patients
const mockPatients = [
  {
    id: "1",
    name: "Alex Johnson",
    age: 8,
    therapist: "Dr. Emma Johnson",
    status: "active",
    lastSession: "2023-04-28"
  },
  {
    id: "2",
    name: "Lily Chen",
    age: 6,
    therapist: "Dr. Michael Brown",
    status: "active",
    lastSession: "2023-04-27"
  },
  {
    id: "3",
    name: "Ethan Smith",
    age: 10,
    therapist: "Sarah Williams",
    status: "inactive",
    lastSession: "2023-04-20"
  }
];

const PatientsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: patients = [], isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: () => {
      // For now, return mock data
      // In a real app, this would call an API
      return Promise.resolve(mockPatients);
    }
  });

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.therapist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Patients</h1>
          <p className="text-muted-foreground">Manage speech therapy patients</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Patient Listing</CardTitle>
          <CardDescription>
            View and manage all patients in the system
          </CardDescription>
          <div className="mt-2 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search patients..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Therapist</TableHead>
                <TableHead>Last Session</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      {patient.name}
                    </TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.therapist}</TableCell>
                    <TableCell>{patient.lastSession}</TableCell>
                    <TableCell>
                      <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                        {patient.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <p className="text-muted-foreground">No patients found</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add your first patient
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPatients.length} patients
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PatientsPage;
