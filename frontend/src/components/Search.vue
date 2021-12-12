<template>
  <v-row justify="center" class="search-btn">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Search
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Search facilities</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="facilityName"
                  label="Facility name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['飲食店', '公園', 'ショッピングセンター', '宿泊施設', 'レジャー施設']"
                  v-model="type"
                  label="Type"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="requiredTime"
                  label="Required time (minutes)"
                  hint="Time from your home to facility"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                v-model="badWeather"
                label="Bad weather"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                v-model="stroller"
                label="Stroller"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                v-model="nursingRoom"
                label="Nursing room"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                v-model="diaperStand"
                label="Diaper stand"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-textarea
                outlined
                auto-grow
                label="Comment"
                v-model="comment"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="searchData"
          >
            Search
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import axios from 'axios'

  export default {
    data: () => ({
      dialog: false,
      facilityName: "",
      type: "",
      badWeather: false,
      requiredTime: "",
      stroller: false,
      nursingRoom: false,
      diaperStand: false,
      comment: "",
    }),
    methods: {
      searchData() {
        let params = new FormData()
        params.append('name', this.facilityName)
        params.append('type', this.type)
        params.append('bad_weather', this.badWeather)
        params.append('time', this.requiredTime)
        params.append('stroller', this.stroller)
        params.append('nursing_room', this.nursingRoom)
        params.append('diaper_stand', this.diaperStand)
        params.append('comment', this.comment)

        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = "X-CSRFToken"

        axios
            .post(
            `/api/search/`,
            params
            )
            .then((response) => {
              console.log(response.data)
              this.$store.commit("updateFacilities", response.data)
              this.$router.push('facilities')
            })
            .catch((error) => {
            console.log(error);
            alert("検索に失敗しました");
            })
        },
    }
  }
</script>

<style scoped>
.search-btn{
  margin: 0;
  padding: 100px;
}
</style>