import { AppError, useService, useTask } from "@lib";

export function useDeleteArtifact() {
  const artifactsDataset = useService("artifacts");

  const deleteArtifactTask = useTask((id) =>
    deleteArtifact({ id, artifactsDataset })
  );

  return deleteArtifactTask;
}

function deleteArtifact({ id, artifactsDataSet }) {

  const artifacts = Array.from(artifactsDataset.items.value());
  const ids = artifacts.reduce((acc, artifact) => {
    
  }, [id]);


  return artifactsDataset.del(ids);
}
