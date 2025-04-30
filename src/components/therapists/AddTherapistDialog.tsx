
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTherapist } from "@/services/therapist-service";
import { toast } from "@/hooks/use-toast";

interface AddTherapistDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTherapistDialog = ({ isOpen, onClose }: AddTherapistDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    license: "",
    specialty: "",
    active: true
  });
  
  const queryClient = useQueryClient();
  
  const createTherapistMutation = useMutation({
    mutationFn: createTherapist,
    onSuccess: () => {
      toast({
        title: "Therapist created",
        description: "The therapist has been successfully created"
      });
      queryClient.invalidateQueries({ queryKey: ['therapists'] });
      onClose();
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Failed to create therapist",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, active: checked }));
  };
  
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      license: "",
      specialty: "",
      active: true
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTherapistMutation.mutate(formData);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Therapist</DialogTitle>
            <DialogDescription>
              Create a new therapist account. They will be able to log in using these credentials.
            </DialogDescription>
          </DialogHeader>
          
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
              <Label htmlFor="license" className="text-right">License</Label>
              <Input
                id="license"
                name="license"
                value={formData.license}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialty" className="text-right">Specialty</Label>
              <Input
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="col-span-3"
              />
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
              onClick={onClose}
              disabled={createTherapistMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={createTherapistMutation.isPending}
            >
              {createTherapistMutation.isPending ? "Creating..." : "Create Therapist"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTherapistDialog;
