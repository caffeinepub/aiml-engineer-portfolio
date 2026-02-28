import { useMutation, useQuery } from "@tanstack/react-query";
import type { FAQEntry } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useVisitorCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["visitorCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getVisitorCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIncrementVisitorCount() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return BigInt(0);
      return actor.incrementVisitorCount();
    },
  });
}

export function useSubmitMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.submitMessage(name, email, message);
    },
  });
}

export function useGetFAQAnswer() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (keyword: string) => {
      if (!actor) return null;
      return actor.getFAQAnswer(keyword);
    },
  });
}

export function useGetAllFAQEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<FAQEntry[]>({
    queryKey: ["faqEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFAQEntries();
    },
    enabled: !!actor && !isFetching,
  });
}
