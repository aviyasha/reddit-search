$(document).ready(function() {
	$('#input-reddit-search').keypress(function (e) {
	  if (e.which == 13) {
	    $('#submit-reddit-search').trigger( "click" );
	  }
	});
	
	$('#submit-reddit-search').click(function(){
		$('#submit-reddit-search').attr("disabled", true);
		$(".spinner").show();
		$.ajax({
			type: "GET",
  		url: "/home/reddit_search",
  		data: {
  			"query": $('#input-reddit-search').val()
  		},
  		success: function(data) {
  			$('#submit-reddit-search').attr("disabled", false);
  			$(".spinner").hide();
  			$('#search-results').html("<br><h3>Results:</h3><hr>");
  			
  			if (data['count'] != 0) {
					var i = 0;
			  	for(var i in data['results']) {
						var panelBody = "<div class='panel-body'><div class='row'>";
						
						panelBody += "<div class='col-md-10'><p><b>Title: </b>" + data['results'][i]['title'] + "</p>";
						if (data['results'][i]['selftext']) {
							panelBody += "<p><b>Self Text: </b>" + data['results'][i]['selftext'] + "</p>";
						}
						panelBody += "<p><a href=" + data['results'][i]['url'] + " class='break' target='_blank'><b>Go to URL page</b></a></p></div>";
						
						if (data['results'][i]['preview']) {
							var imageSource = data['results'][i]['preview']['images'][0]['source']['url'];
							panelBody += "<div class='col-md-2'><p><a href=" + imageSource + " class='break' target='_blank'><img src=" + imageSource + " class='img-thumbnail'></a></p></div>";	
						}
						panelBody += "</div></div>";
						
						$('#search-results').append(
							"<br><div class='panel panel-default'><div class='panel-heading'>" + 
							"<p><b>Author: </b>" + data['results'][i]['author'] + "</p>" +
							"</div>" + panelBody + "</div>"
						);	
					}
				} else {
					$('#search-results').append("<p>No matching results</p>");
				}
  		},
  		error: function(xhr) {
        alert(xhr.responseText);
        $('#submit-reddit-search').attr("disabled", false);
  			$(".spinner").hide();
      }
		});
	});
});
