
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SearchIcon, PlusCircle, Edit, Trash2, UserPlus, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Mock data for patients
const mockPatients = [
  {
    id: "1",
    name: "Alex Smith",
    date_of_birth: "2015-06-12",
    therapist: { id: "2", name: "Dr. Emma Johnson" },
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Jamie Davis",
    date_of_birth: "2018-03-22",
    therapist: { id: "2", name: "Dr. Emma Johnson" },
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Sophia Chen",
    date_of_birth: "2016-11-05",
    therapist: { id: "3", name: "Dr. Michael Brown" },
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    name: "Ryan Johnson",
    date_of_birth: "2017-08-17",
    therapist: { id: "4", name: "Sarah Williams" },
    created_at: new Date().toISOString()
  },
];

const PatientsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Use react-query with mock data
  const { data: patients = [], isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: () => {
      // Simulate API delay
      return new Promise(resolve => {
        setTimeout(() => resolve(mockPatients), 500);
      });
    }
  });

  const filteredPatients = patients.length > 0 ? patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

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
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => {
                  // Calculate age if date_of_birth exists
                  let age = "N/A";
                  if (patient.date_of_birth) {
                    const dob = new Date(patient.date_of_birth);
                    const ageDiff = Date.now() - dob.getTime();
                    const ageDate = new Date(ageDiff);
                    age = Math.abs(ageDate.getUTCFullYear() - 1970).toString();
                  }

                  return (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">
                        {patient.name}
                      </TableCell>
                      <TableCell>{age}</TableCell>
                      <TableCell>{patient.therapist ? patient.therapist.name : "Unassigned"}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full bg-muted rounded-full h-2 mr-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${Math.floor(Math.random() * 100)}%` }}></div>
                          </div>
                          <span className="text-xs">{Math.floor(Math.random() * 100)}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <p className="text-muted-foreground">No patients found</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" />
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
            Showing {filteredPatients.length || 0} patients
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PatientsPage;
