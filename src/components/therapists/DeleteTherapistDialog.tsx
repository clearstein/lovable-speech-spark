
import React from "react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTherapist } from "@/services/therapist-service";
import { toast } from "@/hooks/use-toast";

interface DeleteTherapistDialogProps {
  isOpen: boolean;
  onClose: () => void;
  therapistId: string | null;
  therapistName: string;
}

const DeleteTherapistDialog = ({ isOpen, onClose, therapistId, therapistName }: DeleteTherapistDialogProps) => {
  const queryClient = useQueryClient();
  
  const deleteTherapistMutation = useMutation({
    mutationFn: deleteTherapist,
    onSuccess: () => {
      toast({
        title: "Therapist deleted",
        description: "The therapist has been successfully deleted"
      });
      queryClient.invalidateQueries({ queryKey: ['therapists'] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Failed to delete therapist",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    }
  });
  
  const handleDelete = () => {
    if (therapistId) {
      deleteTherapistMutation.mutate(therapistId);
    }
  };
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this therapist?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete {therapistName}'s account and all associated data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteTherapistMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={deleteTherapistMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteTherapistMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTherapistDialog;
