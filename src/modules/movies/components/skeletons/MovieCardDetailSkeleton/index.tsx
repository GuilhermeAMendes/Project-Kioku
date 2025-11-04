// Components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardDetailSkeleton() {
  return (
    <Card className="h-full w-full overflow-hidden flex flex-col justify-between">
      <CardHeader className="pb-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center p-6">
        <Skeleton className="w-20 h-20 rounded-md" />
      </CardContent>
      <CardFooter className="p-4 pt-2 flex flex-col items-start gap-3">
        <div className="flex justify-between items-center w-full">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <Skeleton className="h-4 w-1/2" />
      </CardFooter>
    </Card>
  );
}
