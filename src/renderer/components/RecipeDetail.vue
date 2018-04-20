<template>
  <v-layout>
    <v-flex xs12>
      <v-card flat v-for="(item, n) in items" :key="n">
        <v-card-media class="white--text" height="500px" v-bind:src="item.srci">

          <v-layout column align-center justify-center>
            <h1 class="white--text display-3">{{item.title}}</h1>
            <h4 class="white--text headline">{{item.subtitle}}</h4>

            <!--  <v-card class="white--text elevation-0">
              <v-card-title primary-title>
               <h1 class="grey--white display-3">{{item.title}}</h1>
      
              </v-card-title>
              <v-card-text class="text-xs-center">
                <h4 class="grey--white">{{item.subtitle}}</h4>
              </v-card-text>

            </v-card> -->
          </v-layout>

        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">Number 10</span>
            <br>
            <span>Whitehaven Beach</span>
            <br>
            <span>Whitsunday Island, Whitsunday Islands</span>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="stepper stepper--vertical" v-for="(step, i) in steps" :key="i">
            <div class="stepper__step stepper__step--active">
              <span class="stepper__step__step primary">{{i + 1}}</span>
              <div class="stepper__label headline">
                {{step.step_name}}
              </div>
            </div>
            <div class="stepper__content">
              <div class="stepper__wrapper" style="height: auto;">
                <v-text-field
                class="custom_textfield"
                style="height: auto;"
                name="input-1"
                readonly
                no-resize        
                textarea
                v-bind:rows="step.rowi"
                v-model="step.description"
              ></v-text-field>        
              </div>
            </div>       
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      steps: []
    };
  },
  created: function(i) {
    var act_uuid = sessionStorage.getItem("act-re_uuid");
    var srci = this.srci;
    var items = this.items;
    var steps = this.steps;
    console.log("ein GITLABTEST");

    this.$bucket
      .db("test")
      .get(act_uuid, {
        attachments: true
      })
      .then(function(result) {
        var file = result._attachments.filename.data;
        var type = result._attachments.filename.content_type;
        var url = "data:" + type + ";base64," + file;
        var allStepsNr = result.steps.length;

        items.push({
          srci: url,
          title: result.title,
          subtitle: result.subtitle
        });

        for (var i = 0; i < allStepsNr; i++) {
          var lines = result.steps[i].description.split(/\r*\n/);
          var lines_count = lines.length;

          steps.push({
            step_name: result.steps[i].step_name,
            description: result.steps[i].description,
            rowi: lines_count
          });
        }
      });
  }
};
</script>
<style>
.card__media__background {
  background-position-y: top !important;
}

.opacity {
  background-color: rgba(0, 0, 0, 0.19) !important;
  border-radius: 0%;
}

.stepper {
  box-shadow: none !important;
}

.stepper--vertical {
  padding: 0px 0px 0px 0px !important;
}
.stepper__content {
  border-left: grey 1px solid !important;
  padding: 0px 60px 0px 23px !important;
}

.input-group__input {
  padding-top: 0px !important;
  border: none !important;
}

.custom_textfield {
  padding: 0px !important;
}
</style>