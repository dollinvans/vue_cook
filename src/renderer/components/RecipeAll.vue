<template>
  <v-layout>
    <v-flex xs12>
        <v-container fluid grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 xl2 v-for="(item, n) in items" :key="n">
              <v-card v-bind:id="item.id">
                <v-card-media class="white--text" v-bind:src="item.srci"  height="150px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{item.headline}}</div>
                    <span class="grey--text">{{item.subheadline}}</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon @click="loadDocs(n)" router :to="'./recDet'" slot="activator">
                    <v-icon>open_in_new</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </v-layout> 
</template>
<script>

export default {
  name: 'all',
    components: {
      
    },
  data() {
    
    return {
      items: []

    };
  },
  created: function(i) {
    var uuid = sessionStorage.getItem("re_uuid");

    var items = this.items;

    this.$bucket
      .db("test")
      .allDocs({ include_docs: true, attachments: true })
      .then(function(result) {
        var allDocsNr = result.rows.length;

        for (var i = 0; i < allDocsNr; i++) {
          var file = result.rows[i].doc._attachments.filename.data;
          var type = result.rows[i].doc._attachments.filename.content_type;
          var url = "data:"+type+";base64,"+file;
          items.push({
            id:result.rows[i].doc._id,
            headline: result.rows[i].doc.title,
            subheadline: result.rows[i].doc.subtitle,
            srci: url
          });
        }
      });
  },
  methods: {
    loadDocs(n) {
     var act_uuid = this.$data.items[n].id;
     sessionStorage.setItem("act-re_uuid", act_uuid);
    
    }
  }
};
</script>
<style scoped>
</style>
