<script setup lang="ts">
// import { useArtifactEdit } from "@body";
// import { LayoutDashboard } from "@view/layouts";
// import EditTitle from "./edit-title.vue";
// import EditForm from "./edit-form.vue";

// const props = defineProps({
//   artifactId: {
//     type: String,
//     required: true,
//   },
// });
// const emit = defineEmits(["done", "close"]);

// const { task, artifact } = useArtifactEdit(props.artifactId);
// if (!artifact.value) emit("done");

// const handleSave = async (payload) => {
//   await task.run(payload);
//   emit("done");
// };
</script>
<template>
  <div>
    edit
    <!-- <template #title>
      <edit-title :name="artifact.name" @artifacts="$emit('done')" />
    </template>
    <template #default>
      <edit-form
        :artifact="artifact"
        @save="handleSave"
        @cancel="$emit('done')"
      />
    </template> -->
  </div>
</template>
