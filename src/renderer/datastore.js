export function create_UUID() {
    var dt = new Date().getTime();
    /*  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid; */
    var re_uuid = "re-" + dt;
    sessionStorage.setItem("re_uuid", re_uuid);
    console.log(sessionStorage.getItem("re_uuid"));
    alert("Es wurde ein neues Rezept erstellt");
    
    return re_uuid;
  }
