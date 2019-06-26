<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add new request</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Request</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Document Type" v-model="documentType" prepend-icon="folder" :rules="inputRules"></v-text-field>

          <v-menu>
            <v-text-field :value="formattedDate" slot="activator" label="Due date" prepend-icon="date_range" :rules="inputRules"></v-text-field>
            <v-date-picker v-model="metadata.dueDate"></v-date-picker>
          </v-menu>

          <v-textarea label="Information" v-model="metadata.content" prepend-icon="edit" :rules="inputRules"></v-textarea>
          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add Request</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format'

export default {
  data() {
    return {
      documentType: '',
      metadata: {
        content: '',
        dueDate: null
      },
      inputRules: [
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true

        // Submit to backend to be stored in database
        confirm('Are You Sure?')
        setTimeout(() => {
          this.loading = false
          this.dialog = false
          this.$emit('requestAdded')
        }, 3000)
        
      }
    }
  },
  computed: {
    formattedDate() {
      return this.metadata.dueDate ? format(this.metadata.dueDate, 'Do MMM YYYY') : ''
    }
  }
}
</script>