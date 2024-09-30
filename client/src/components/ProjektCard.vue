   <template>
   <q-card class="my-card" flat bordered>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{props.project.projectName}}</div>
          <div class="text-caption text-grey">
          </div>
        </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn color="accent" type="outline" icon="show_chart" />
      </q-card-actions>
    </q-card>
   </template>

   <script setup>
    const props = defineProps({
    project: Object,
    });

   </script>