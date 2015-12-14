$(document).ready( function() {
	$(".project-image").change(function(){
		var filename = $(this).val().replace(/.*\\/, "");
		$("#project-filename").val(filename);
	});
});