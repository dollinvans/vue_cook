import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import VuePouchDB from 'vue-pouch-db';

import App from './App'
import router from './router'
import store from './store'


Vue.use(Vuetify)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(VuePouchDB)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false



var remoteDB = "http://192.168.0.45:5984/my-db";
// Bucket Config / Startup Object
const bucket = new VuePouchDB.Bucket({
  config: {
    // Remote Server
    remote: "remoteDB",

    // Is DB Remote Only?, default: false
    remoteOnly: false,

    // db.allDocs({options})
    allDocs: {
      include_docs: true,
      attachments: true
    },

    // new Pouch({options})
    options: {
      ajax: {
        cache: true
      }
    },

    // Pouch.sync({option}) for every Instance
    sync: {
      since: 0,
      live:  true,
      retry: true
    },

    // db.changes({option})
    changes: {
      since: 'now',
      live: true,
      include_docs: true
    },

    // db.changes().on(() => {})
    onChanges(change) {
      console.log("Change: ", change);
    },
    onPaused(error) {
      console.log("Paused", error);
    },
    onActive() {
      console.log("Active");
    },
    onDenied(error) {
      console.log("Denied", error);
    },
    onComplete() {
      console.log("Completed");
    },
    onError(error) {
      console.log("Error", error);
    },
    cancel(cancel) {
      // Something bad Happens, cancel this!
    }
  },

  // Plugins
  plugins: [],

 

  // Databases
  test: {
    // Is remote only ?
    remoteOnly: false
    
  },


/*   projects: {   
    sync: {
      pull: {
        filter: 'projects/by_user',
        query_params: { "name": "sadiqevani" }
      }
    }

  } */
});


/* eslint-disable no-new */
new Vue({
  components: { App },
  bucket,
  router,
  store,
  template: '<App/>'
}).$mount('#app')

