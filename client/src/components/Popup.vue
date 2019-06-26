<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add new request</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Request</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Document Type" v-model="documentType" prepend-icon="folder"></v-text-field>

          <v-menu>
            <v-text-field :value="formattedDate" slot="activator" label="Due date" prepend-icon="date_range"></v-text-field>
            <v-date-picker v-model="metadata.dueDate"></v-date-picker>
          </v-menu>

          <v-textarea label="Information" v-model="metadata.content" prepend-icon="edit"></v-textarea>
          <v-btn flat class="success mx-0 mt-3" @click.prevent="submit" :loading="loading">Add Request</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import RequestDocumentService from '../services/RequestDocumentService'

export default {
  data() {
    return {
      documentType: '',
      metadata: {
        content: '',
        dueDate: null,
        requesterId: ''
      },
      loading: false,
      dialog: false
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true

        const data = {
          documentType : this.documentType,
          metadata : {
            content: this.metadata.content,
            dueDate: this.metadata.dueDate,
            requesterId: this.$store.state.userId
          },
          requesterName: this.$store.state.email
        }

        RequestDocumentService.createRequestDocument(data)
        .then(res => {
          this.loading = false
          if (res.status == 200) {
            this.dialog = false
            this.$emit('requestAdded')
            this.clearForm()
          }
        })
        .catch(() => {
          this.$emit('requestError')
          this.loading = false
          this.dialog = false
        })
      }
    },
    clearForm() {
      this.documentType = ''
      this.metadata.content = ''
      this.metadata.dueDate = null
    }
  },
  computed: {
    formattedDate() {
      return this.metadata.dueDate ? format(this.metadata.dueDate, 'Do MMM YYYY') : ''
    }
  }
}
</script>