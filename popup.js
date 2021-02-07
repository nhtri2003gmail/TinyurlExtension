$("#Copy-Button").hide()
$("#resultInput").hide()
$("#CopyInfo").hide()
$(function(){
	$('#Create-Button').click(function(){
		$("#CopyInfo").hide()
		var URL = $('#URL').val();
		var Alias = $('#Alias').val();
		var API_token = "YZL5mxnqe8bKBJ1BBhBhQWnRI8d1a44JKwOgqW9B6mQ4zWwkWKlYfBLRW72C";
		var payload = '{"url": "' + URL + '", "domain": "tiny.one", "alias": "' + Alias + '","tags": ""}';
		console.log(payload);
		console.log(JSON.parse(payload));
		console.log($.type(JSON.parse(payload)));
		$.ajax({
			url: 'https://api.tinyurl.com/create',
			type: "POST",
			headers: {
				"Authorization": "Bearer " + API_token,
				"accept": "application/json",
				"Content-Type": "application/json",
			},
			datatype: 'json',
			data: payload,
			success: function(data){
				$("#result").text("");
				$("#Copy-Button").show();
				$("#resultInput").show();
				$("#resultInput").val(data.data.tiny_url)

			},
			error: function(data){
				var Errors = JSON.parse(data.responseText).errors;
				var i;
				var text = "Number of errors: <b>" + Errors.length + "</b><br/>";
				for (i=0; i<Errors.length; i++){
					text += "- " + Errors[i] + "<br/>"
				};
				$("#resultInput").val("");
				$("#Copy-Button").hide();
				$("#resultInput").hide();
				$("#result").html(text)
			},
		});
		
	});
	$("#Copy-Button").click(function(){
		var copyText = document.getElementById("resultInput");
  		copyText.select();
  		copyText.setSelectionRange(0, 99999);
  		document.execCommand("copy");
		$("#CopyInfo").show()
	})
});