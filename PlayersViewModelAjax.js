

var global_Jsession_id;

function PlayersVieweModelAjax(){
//var formData = new FormData();
//formData.append("j_username", "benpoon");
//formData.append("j_password", "pass1"); // number 123456 is immediately converted to a string "12	
   
 var formData= 'j_username=benpoon'  + '&j_password=pass1';
  var self = this;
        self.URI="http://localhost:8181/draftking/services/playerhomestats/all";
        //self.URI="http://100.12.28.216:8181/draftking/j_spring_security_check";
        //self.URI="http://localhost:8181/draftking/j_spring_security_check";
       
        self.tasks = ko.observableArray();

        self.ajax = function(uri, method, data) {
            var request = {
                url: uri,
                type: method,
                //method:"POST",
                 contentType: "application/json",
        // This will override the content type header, 
        // regardless of whether content is actually sent.;,
        // Defaults to 'application/x-www-form-urlencoded';,
 //               contentType: "multipart/form-data",
               // params: {j_username: 'benpoon', j_password: 'pass1', ajax: true},
                //accepts: "application/json",
                accepts:"text/html",
                cache: false,
                dataType: 'jsonp',
                processData: false,                 //need to set this to false if passing formdata so this isnt processed as a query string.
               // contentType: false,
               // contentType: 'application/x-www-form-urlencoded',
              //  data: JSON.stringify(data),
                data: data,
                 xhrFields: {withCredentials: true},
                beforeSend: function (xhr) {
              //      xhr.setRequestHeader("j_username","benpoon");
              //      xhr.setRequestHeader("j_password","pass1");
                },
                error: function(jqXHR,textStatus,errorThrown) {
                    console.log("ajax error " + jqXHR.status);
                    saveSessionId();
                },

                success:function(data,textStatus,jqXHR) {
                    console.log("successful ajax call");
                    saveSessionId();
                    
                }
            };
           
            console.log("calling ajax call!!!"+ "performing a method "+method );
          //  console.log("data username=" +formData.getAll('j_username'));
          //  console.log("data password=" +formData.getAll('j_password'));
            return $.ajax(request);
           // $.post(uri,function (data,status){
           //     console.log("authetication http status = "+ status);
           // });
        };


        function saveSessionId(){
           global_Jsession_id= getCookie("JSESSIONID");
           console.log("jessionid="+global_Jsession_id);
        }

        self.beginAdd = function() {
            alert("Add");
        };
        self.beginEdit = function(task) {
            alert("Edit: " + task.title());
        };
        self.remove = function(task) {
            alert("Remove: " + task.title());
        };
        self.markInProgress = function(task) {
            task.done(false);
        };
        self.markDone = function(task) {
            task.done(true);
        };

        //   new authenticate_rest_call();
          self.ajax(self.URI, 'GET').done(function(data){

           // self.ajax(self.URI, 'GET',formData).done(function(data) {
                    
                    for (var i = 0; i < data.tasks.length; i++){
                    self.tasks.push({
                    playerName: ko.observable(data.tasks[i].playerName),
                    team: ko.observable(data.tasks[i].team),
                    position: ko.observable(data.tasks[i].position)
                    });
                    }
            
            
             });

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    console.log("looking for cookie :  "+cname);
    console.log("cookie parsed out = "+ca[0]);
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if(c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    console.log("nothing in cookie");
    return "";
}


    }
   // ko.applyBindings(new PlayersVieweModelAjax());