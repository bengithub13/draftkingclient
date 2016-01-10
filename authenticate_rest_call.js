

var global_Jsession_id;

function authenticate_rest_call(){

 var formData= 'j_username=benpoon'  + '&j_password=pass1';
  var self = this;
        //self.URI="http://localhost:8181/draftking/services/playerhomestats/all";
        //self.URI="http://100.12.28.216:8181/draftking/j_spring_security_check";
        self.URI="http://localhost:8181/draftking/j_spring_security_check";
        self.tasks = ko.observableArray();
        console.log("authentication_rest_call invoked");
        

        self.ajax = function(uri, method, data) {
            var request = {
                url: uri,
                type: method,
  //              accepts: "application/json",
                accepts:"text/html",
                cache: false,
                processData: false,
                contentType: 'application/x-www-form-urlencoded',
                data: data,
				//dataType: 'json',
				dataType:"text",
				xhrFields:{
				withCredentials: true},

                error: function(jqXHR,textStatus,errorThrown) {
                console.log("error ajax call " +textStatus +" "+ errorThrown);
                },

                success:function(data,textStatus,jqXHR) {
                    console.log("successful ajax call");
               //     saveSessionId();
				$("#myModal").modal('toggle');
                }

            };

            console.log("calling ajax call!!!"+ "performing a method "+method );
           // return $.ajax(request);
        return $.ajax(request);
         
            };
           
         //   console.log("calling ajax call!!!"+ "performing a method "+method );
          
          //  return $.ajax(request);
     
        

/*
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

*/
 
         self.ajax(self.URI, 'POST',formData).done(function(data) {

         console.log("done with authetication call ");

/*
            for (var i = 0; i < data.tasks.length; i++) {
                self.tasks.push({
                    playerName: ko.observable(data.tasks[i].playerName),
                    team: ko.observable(data.tasks[i].team),
                    position: ko.observable(data.tasks[i].position)
                  
                });
            }
 */
        });


//return false;

    }
   