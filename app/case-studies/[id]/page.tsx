import { redirect } from "next/navigation";
import { findProject } from "@/data/portfolio";
export default async function LegacyProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = findProject(id);
  redirect(project ? `/?project=${project.id}#work` : "/#work");
}
