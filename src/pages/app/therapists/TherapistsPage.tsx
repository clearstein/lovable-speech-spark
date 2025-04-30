
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, UserPlus, Edit, Trash2 } from "lucide-react";
import { getTherapists } from "@/services/therapist-service";
import AddTherapistDialog from "@/components/therapists/AddTherapistDialog";
import EditTherapistDialog from "@/components/therapists/EditTherapistDialog";
import DeleteTherapistDialog from "@/components/therapists/DeleteTherapistDialog";
import { Therapist } from "@/types/therapist";

const TherapistsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

  const { data: therapists = [], isLoading } = useQuery({
    queryKey: ['therapists'],
    queryFn: getTherapists
  });

  const filteredTherapists = therapists.filter(therapist => 
    therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (therapist.specialty && therapist.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenEditDialog = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setIsDeleteDialogOpen(true);
  };

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
          <h1 className="text-3xl font-bold">Therapists</h1>
          <p className="text-muted-foreground">Manage speech therapists</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Therapist
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Therapist Listing</CardTitle>
          <CardDescription>
            View and manage all registered therapists in the system
          </CardDescription>
          <div className="mt-2 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search therapists..."
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
                <TableHead>License</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Patients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTherapists.length > 0 ? (
                filteredTherapists.map((therapist) => (
                  <TableRow key={therapist.id}>
                    <TableCell className="font-medium">
                      {therapist.name}
                    </TableCell>
                    <TableCell>{therapist.license || "N/A"}</TableCell>
                    <TableCell>{therapist.specialty || "General"}</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>
                      <Badge variant={therapist.active ? "default" : "secondary"}>
                        {therapist.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleOpenEditDialog(therapist)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleOpenDeleteDialog(therapist)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <p className="text-muted-foreground">No therapists found</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      onClick={() => setIsAddDialogOpen(true)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add your first therapist
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTherapists.length} therapists
          </p>
        </CardFooter>
      </Card>

      {/* Add Therapist Dialog */}
      <AddTherapistDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
      />

      {/* Edit Therapist Dialog */}
      <EditTherapistDialog 
        isOpen={isEditDialogOpen} 
        onClose={() => setIsEditDialogOpen(false)}
        therapist={selectedTherapist}
      />

      {/* Delete Therapist Dialog */}
      <DeleteTherapistDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        therapistId={selectedTherapist?.id || null}
        therapistName={selectedTherapist?.name || "this therapist"}
      />
    </div>
  );
};

export default TherapistsPage;
