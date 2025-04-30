
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTherapist } from "@/services/therapist-service";
import { toast } from "@/hooks/use-toast";
import { Therapist } from "@/types/therapist";

interface EditTherapistDialogProps {
  isOpen: boolean;
  onClose: () => void;
  therapist: Therapist | null;
}

const EditTherapistDialog = ({ isOpen, onClose, therapist }: EditTherapistDialogProps) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    license: "",
    specialty: "",
    active: true
  });
  
  useEffect(() => {
    if (therapist) {
      setFormData({
        id: therapist.id,
        name: therapist.name,
        license: therapist.license || "",
        specialty: therapist.specialty || "",
        active: therapist.active
      });
    }
  }, [therapist]);
  
  const queryClient = useQueryClient();
  
  const updateTherapistMutation = useMutation({
    mutationFn: updateTherapist,
    onSuccess: () => {
      toast({
        title: "Therapist updated",
        description: "The therapist has been successfully updated"
      });
      queryClient.invalidateQueries({ queryKey: ['therapists'] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Failed to update therapist",
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTherapistMutation.mutate(formData);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Therapist</DialogTitle>
            <DialogDescription>
              Update therapist information.
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
              disabled={updateTherapistMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={updateTherapistMutation.isPending}
            >
              {updateTherapistMutation.isPending ? "Updating..." : "Update Therapist"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTherapistDialog;
