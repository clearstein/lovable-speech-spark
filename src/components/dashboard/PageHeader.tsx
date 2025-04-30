
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const PageHeader = ({ 
  title, 
  description, 
  buttonText, 
  onButtonClick 
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {buttonText && (
        <Button onClick={onButtonClick}>
          <UserRound className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
