<template>
  <v-container grid-list-xl>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-card color="" class="">
          <v-card-title primary-title>
            <v-text-field class="headline" label="Rezept Name" v-model="title" single-line hide-details full-width></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs7>
                  <v-flex xs12>
                    <v-text-field class="" label="Untertitel" v-model="subtitle"></v-text-field>
                  </v-flex>
                  <v-layout row>
                    <v-flex xs2>
                      <v-text-field class="" label="Menge" v-model.number="menge" mask="##"></v-text-field>
                    </v-flex>
                    <v-flex xs7>
                      <v-slider label="" :max="50" v-model="menge"></v-slider>
                    </v-flex>
                    <v-flex xs3>
                      <v-select :items="items" v-model="einheit" label="Select" single-line></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs5>
                  <v-card flat>
                    <v-card-media class="white--text" height="250px">
                      <img id="thumb-img-1" src="dist/electron/imgs/placeholder.png">
                      <input style="display:none" @change="changeIMG" type="file" id="thumb-file-1" ref="fileInput">
                    </v-card-media>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <span class="btn_group-img">
                        <v-btn icon @click="addIMG" class="round-icon_btn" id="add_image">
                          <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon @click="removeIMG" class="round-icon_btn" id="remove_image">
                          <v-icon>close</v-icon>
                        </v-btn>
                        <v-btn icon @click.native.stop="dialog = true" class="round-icon_btn" id="big_image">
                          <v-icon>zoom_out_map</v-icon>
                        </v-btn>
                      </span>
                      <v-dialog v-model="dialog"  max-width="100%">
                        <v-card>                      
                          <v-card-text>
                            <img src="dist/electron/imgs/placeholder.png" id="thumb-img-1-modal">
                            </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
                            <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn flat dark>Listen now</v-btn>
          </v-card-actions>
        </v-card>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            <div class="headline">Zubereitungsschritte</div>
          </v-card-title>
          <v-card-text>
            <v-expansion-panel popout expand focusable>
              <v-expansion-panel-content v-for="(step,i) in steps" :key="i">
                <div slot="header">
                  <span class="step_number">{{i + 1}}</span>

                </div>
                <v-card>
                  <v-btn @click="removeElement(i)" flat icon class="round-icon_btn close">
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-card-text>
                    <v-text-field label="Schritt Name" class="foobar" v-model="step.step_name"></v-text-field>
                    <v-text-field name="input-7-1" label="Beschreibung" v-model="step.description" multi-line auto-grow></v-text-field>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn fab @click="addRow" class="">
              <v-icon style="line-height: 2.25">add</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn @click="saveDoc">submit</v-btn>
  </v-container>
</template>

<script>
  export default {
    name: "Adding",

    data() {
      return {
        title: "",
        subtitle: "",
        menge: 1,
        einheit: null,
        dialog: false,
        items: [{
            text: "Personen"
          },
          {
            text: "Portionen"
          },
          {
            text: "Stück"
          }
        ],
        uuid: "",
        steps: [],
        description: "",
        filename: [{
          content_type: "",

          data: ""
        }]
      };
    },
    created: function (i) {
      var dt = new Date().getTime();
      var re_uuid = "re-" + dt;
      sessionStorage.setItem("re_uuid", re_uuid);

      this.steps.push({});
    },
    methods: {
      saveDoc() {
        this.create_UUID().then(this.addDocs());
      },
      create_UUID() {
        return new Promise((resolve, reject) => {
          this.$data.uuid = sessionStorage.getItem("re_uuid");
          console.log("Neues rezept erstellt mit:" + this.$data.uuid);
        });
      },
      addDocs(arg) {
        var input = document.getElementById("thumb-file-1");
        var file_input = input.files[0]; // file is a Blob
        var file_type;
        var file;

        if (file_input) {
          var url = URL.createObjectURL(file_input);
          file = file_input;
          file_type = file.type;
        } else {
          file_type = "image/png";
          file =
            "iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMV…4bAAAAHElEQVRYhe3BgQAAAADDoPlTX+EAVQEAAAAAfAYUUAABHmXVxwAAAABJRU5ErkJggg=="
        }

        return new Promise((resolve, reject) => {
          this.$bucket.db("test").put({
              _id: this.$data.uuid,
              title: this.$data.title,
              subtitle: this.$data.subtitle,
              menge: this.$data.menge,
              einheit: this.$data.einheit,
              steps: this.$data.steps,
              _attachments: {
                filename: {
                  content_type: file_type,
                  data: file
                }
              }
            },
            function () {}
          );
        });
      },
      addIMG() {
        var input = document.getElementById("thumb-file-1");
        this.$refs.fileInput.click();
      },
      changeIMG() {
        var input = document.getElementById("thumb-file-1");
        var file = input.files[0]; // file is a Blob
        var url = URL.createObjectURL(file);
        document.getElementById("thumb-img-1").setAttribute("src", url);
        document.getElementById("thumb-img-1-modal").setAttribute("src", url);
      },
      removeIMG() {
        document
          .getElementById("thumb-img-1")
          .setAttribute("src", "dist/electron/imgs/placeholder.png");
        var input = document.getElementById("thumb-file-1");
        input.value = "";
      },
      addRow(i) {
        this.steps.push({});
      },
      removeElement(i) {
        this.steps.splice(i, 1);
      }
    }
  };
</script>
<style scoped>
  .round-icon_btn {
    box-shadow: 0 4px 5px -2px rgba(0, 0, 0, 0.2),
    0 7px 10px 1px rgba(0, 0, 0, 0.14), 0 2px 16px 1px rgba(0, 0, 0, 0.12) !important;
    background-color: white !important;
  }

  .close {
    position: relative;
    left: 97%;
    bottom: 79px;
    background-color: #e57373 !important;
    display: block !important;
  }

  .add {
    background-color: grey !important;
  }

  #thumb-img-1 {
    object-fit: cover;
  }

  #thumb-img-1-modal{
    width: 100%;
    height:100%;
  }

  .btn_group-img {
    position: relative;
    bottom: 20px;
  }

  .step_number {
    font-size: 20px;
  }
</style>