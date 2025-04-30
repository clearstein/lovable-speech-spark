
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "@/services/patient-service";
import { getTherapists } from "@/services/therapist-service";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Therapist } from "@/types/therapist";

interface AddPatientDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPatientDialog = ({ isOpen, onClose }: AddPatientDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    date_of_birth: "",
    therapist_id: "",
    active: true
  });
  
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const queryClient = useQueryClient();
  
  const { data: therapists = [], isLoading: therapistsLoading } = useQuery({
    queryKey: ['therapists'],
    queryFn: getTherapists
  });
  
  const createPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: (data) => {
      if (!data) {
        toast.error("Failed to create patient record. Please try again.");
        return;
      }
      
      toast.success(`${data.name} has been successfully added as a patient`);
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      onClose();
      resetForm();
    },
    onError: (error: any) => {
      console.error("Error creating patient:", error);
      
      // Handle specific error messages
      if (error?.message?.includes('User already registered')) {
        setValidationError('This email is already registered. Please use a different email.');
      } else if (error?.message?.includes('Password should be at least')) {
        setValidationError('Password should be at least 6 characters long.');
      } else {
        toast.error(error?.message || "An unexpected error occurred");
      }
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError(null);
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, active: checked }));
  };
  
  const handleTherapistChange = (value: string) => {
    setFormData(prev => ({ ...prev, therapist_id: value }));
  };
  
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      date_of_birth: "",
      therapist_id: "",
      active: true
    });
    setValidationError(null);
  };
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      setValidationError("Name is required");
      return false;
    }
    
    if (!formData.email.trim()) {
      setValidationError("Email is required");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError("Please enter a valid email address");
      return false;
    }
    
    if (!formData.password) {
      setValidationError("Password is required");
      return false;
    }
    
    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters long");
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    createPatientMutation.mutate(formData);
  };
  
  const handleClose = () => {
    if (!createPatientMutation.isPending) {
      resetForm();
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              Create a new patient account. They will be able to log in using these credentials.
            </DialogDescription>
          </DialogHeader>
          
          {validationError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}
          
          {createPatientMutation.isError && !validationError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to create patient. Please try again.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date_of_birth" className="text-right">Date of Birth</Label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="therapist_id" className="text-right">Therapist</Label>
              <Select
                value={formData.therapist_id}
                onValueChange={handleTherapistChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a therapist" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {therapists.map((therapist: Therapist) => (
                    <SelectItem key={therapist.id} value={therapist.id}>
                      {therapist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">Active</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="active" className="cursor-pointer">
                  {formData.active ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={createPatientMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={createPatientMutation.isPending}
            >
              {createPatientMutation.isPending ? "Creating..." : "Create Patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
