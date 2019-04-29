<template>
  <v-app dark :style="elton ? 'background: url(elton.gif) left/200px;' : ''">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Elten</span>
        <span class="font-weight-light">Rating</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-tabs v-model="activeTab" align-with-title v-if="teams">
        <v-tab ripple v-for="(team, i) in teams" :key="i">{{team.id.replace(/_/g, ' ')}}</v-tab>
        <v-tab>
          <v-icon>add</v-icon>
        </v-tab>
        <v-tab-item v-for="(team, i) in teams" :key="i" lazy>
          <Team :teamName="team.id"/>
        </v-tab-item>
        <v-tab-item lazy>
          <NewTeam/>
        </v-tab-item>
      </v-tabs>
    </v-content>
    <v-footer class="pa-3" app>
      <v-switch v-model="elton" hint="Eltonify"></v-switch>
      <v-spacer></v-spacer>
      <span>&copy; {{ currentYear }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { db, fb } from './main'
import Team from './components/Team';
import NewTeam from './components/NewTeam';

export default {
  name: 'App',
  components: {
    Team,
    NewTeam
  },
  data () {
    return {
      teams: [],
      activeTab: null,
      elton: false
    }
  },
  firestore() {
    return {
      teams: db.collection('teams')
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>
