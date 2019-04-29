<template>
  <v-container text-xs-center grid-list-xl>
    <v-layout text-xs-left>
      <v-flex md6 sm12>
        <v-card class="mb-4">
          <v-card-title primary-title>
            <section style="width: 100%;">
              <h3 class="headline mb-0" style="text-transform: capitalize;">{{teamName.replace(/_/g, ' ')}}</h3>
              <v-list v-if="team" two-line dense class="member-list">
                <template v-for="(member, index) in team.members">
                  <v-list-tile :key="index" @click="noop" class="member-list__member">
                    <v-list-tile-content>
                      <span class="member-list__name">
                        {{member}}
                        <v-icon color="error" icon @click="deleteMember(member)" class="member-list__delete">cancel</v-icon>
                      </span>
                    </v-list-tile-content>
                    <v-text-field label="Rating" class="member-list__rating" @change="calculateAverage" data-rating min="1" max="10" type="number" color="blue lighten-2"></v-text-field>
                  </v-list-tile>
                </template>
                <v-list-tile @click="noop">
                  <v-list-tile-content>
                    <v-form @submit.prevent="addMember(name)" class="member-list__add-member">
                      <span class="member-list__name">
                        <v-text-field label="New Name" v-model="name" color="blue lighten-2" @click:append="addMember(name)" :append-icon="showAddIcon ? '' : 'add_circle'" required></v-text-field>
                      </span>
                    </v-form>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </section>
          </v-card-title>
        </v-card>
        <v-card>
          <v-card-title primary-title>
            <section style="width: 100%;">
              <h2 class="headline mb-3">This Week's Rating</h2>
              <div class="average-rating">
                <h3 class="average-rating__title">Average: {{ average }}</h3>
                <v-form @submit.prevent="submitAverage(average)" class="average-rating__submit">
                  <input type="hidden" name="todays_average" :value="average">
                  <v-btn color="success" type="submit" :disabled="submitted">{{submitted ? 'Submitted' : 'Submit'}}</v-btn>
                </v-form>
              </div>
            </section>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex md6 sm12>
        <v-card class="mb-4">
          <v-card-title primary-title>
            <section style="width: 100%;">
              <h3 class="headline mb-3">The Trend</h3>
              <v-sparkline v-if="team && allRatings.length > 1" :value="justRatings" :gradient="gradient" gradient-direction="bottom" line-width="2" smooth="1" auto-draw :auto-draw-duration="graphTime"></v-sparkline>
              <p v-else>Not enough information to create a trend chart.</p>
            </section>
          </v-card-title>
        </v-card>
        <v-card>
          <v-card-title primary-title>
            <section style="width: 100%;">
              <h2 class="headline mb-3">All Ratings</h2>
              <h3 v-if="allRatings.length > 0" class="average-rating__title">Overall Rating: {{ overallRating }}</h3>
              <v-data-table v-if="team && allRatings.length > 0" :headers="ratingsHeaders" :items="allRatings" :pagination.sync="ratingsPagination">
                <template v-slot:items="props">
                  <td>{{formattedDate(props.item.date)}}</td>
                  <td class="text-xs-right">{{props.item.rating}}</td>
                </template>
              </v-data-table>
              <p v-else>No Ratings Available</p>
            </section>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import { db, fb } from '../main'

export default {
  name: 'Team',
  data () {
    return {
      team: null,
      name: '',
      average: '0.0',
      submitted: false,
      ratingsHeaders: [
        { text: 'Date', align: 'left', value: 'date' },
        { text: 'Rating', align: 'right', sortable: false, value: 'rating' }
      ],
      ratingsPagination: {
        descending: true
      },
      gradient: ['#2196F3', '#BBDEFB'],
      graphTime: 3000
    }
  },
  firestore() {
    return {
      team: db.collection('teams').doc(this.teamName)
    }
  },
  props: {
    teamName: String
  },
  computed: {
    allRatings() {
      if (!this.team) return []
      return this.team.ratings
    },
    justRatings() {
      if (!this.team) return []
      return this.team.ratings.map((rating) => parseFloat(rating.rating))
    },
    overallRating() {
      if (!this.team || this.justRatings.length <= 0) return 0.0
      return (this.justRatings.reduce((t, n) => t + n) / this.justRatings.length).toFixed(2)
    },
    showAddIcon() {
      return this.name === ''
    }
  },
  methods: {
    addMember(name) {
      let t = db.collection('teams').doc(this.teamName)
      t.update({
        members: fb.firestore.FieldValue.arrayUnion(name)
      })
      this.name = ''
    },
    deleteMember(name) {
      let t = db.collection('teams').doc(this.teamName)
      t.update({
        members: fb.firestore.FieldValue.arrayRemove(name)
      })
    },
    calculateAverage () {
      let ratings = []
      document.querySelectorAll('[data-rating]').forEach(function(rating) {
        if (rating.value) {
          ratings.push(parseInt(rating.value))
        }
      })
      this.average = (ratings.reduce((t, n) => t + n) / ratings.length).toFixed(1)
    },
    submitAverage(average) {
      let t = db.collection('teams').doc(this.teamName)
      let date = new Date()
      t.update({
        ratings: fb.firestore.FieldValue.arrayUnion({ date: date, rating: average })
      })
      this.submitted = true
    },
    formattedDate(date) {
      return new Date(date.seconds * 1000).toDateString()
    },
    noop() {}
  }
}
</script>

<style lang="scss" scoped>
.member-list {}

    .member-list__member {}

      .member-list__name {}

        .member-list__delete {
          opacity: 0;
          transition: opacity 0.2s ease-in;
          vertical-align: top;

          .member-list__name:hover & {
            opacity: 1;
          }

          &:focus {
            opacity: 1;
          }
        }

      .member-list__rating {
        margin: 0;
        max-width: 100px;
      }

      .member-list__add-member {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

.average-rating {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
