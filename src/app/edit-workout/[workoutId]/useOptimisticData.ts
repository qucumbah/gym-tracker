import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

export function useOptimisticData<T>(
  data: T,
  pushFn: (newData: T) => Promise<void>
) {
  const router = useRouter();
  const [optimisticData, setOptimisticData] = useState<T | null>(null);

  const returnData = optimisticData ?? data;

  const update = useCallback(
    (updateFn: (oldData: T) => T) => {
      const oldData = returnData;
      const newData = updateFn(oldData);
      setOptimisticData(newData);
    },
    [returnData]
  );

  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, startTransition] = useTransition();

  const sync = useCallback(async () => {
    if (optimisticData !== null) {
      setIsPushing(true);
      await pushFn(optimisticData);
    }

    startTransition(() => {
      setIsPushing(false);
      setOptimisticData(null);
      router.refresh();
    });
  }, [optimisticData, pushFn]);

  const discard = useCallback(() => {
    setOptimisticData(null);
  }, [data]);

  return {
    data: returnData,
    update,
    sync,
    discard,
    isLoading: isPushing || isPulling,
    isOutdated: optimisticData !== null,
  };
}
