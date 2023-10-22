import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFromSkeleton from "./loading";

const IssueFrom = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFromSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueFrom issue={issue} />;
};

export default EditIssuePage;
