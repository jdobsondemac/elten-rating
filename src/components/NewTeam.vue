<template>
  <v-container text-xs-center grid-list-xl>
    <v-layout text-xs-left>
      <v-flex xs6 offset-xs3>
        <v-card class="mb-4">
          <v-card-title primary-title>
            <section style="width: 100%;">
              <h3 class="headline mb-0" style="text-transform: capitalize;">Add Team</h3>
              <v-form @submit.prevent="addTeam(teamName)">
                <v-text-field label="Team Name" v-model="teamName" append-icon="add_circle" @click:append="addTeam(teamName)" color="blue lighten-2"></v-text-field>
              </v-form>
            </section>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-snackbar v-model="snackbar.show" top :color="snackbar.color" :timeout="snackbar.timeout">{{ snackbar.text}}</v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import { db, fb } from '../main'

export default {
  name: 'NewTeam',
  data() {
    return {
      teamName: '',
      snackbar: {
        show: false,
        color: 'success',
        text: 'Team successfully added!',
        timeout: 5000
      }
    }
  },
  methods: {
    addTeam (teamName) {
      db.collection('teams')
        .doc(this.formatTeamName(teamName))
        .set({members: [], ratings: []})
        .then((success) => {
          this.snackbar.show = true
        })
        .catch((error) => {
          this.snackbar.color = 'error'
          this.snackbar.text = 'An error has occured. Please try again.'
          this.snackbar.show = true
          console.log('Team Creation Error: ' + error)
        })
      this.teamName = ''
    },
    formatTeamName(string) {
      let s;
      s = string.replace(/[^\w\s]/g, "");
      s = s.replace(/\s+/g, " ");
      return s.toLowerCase().split(' ').join('_');
    }
  }
}
</script>
