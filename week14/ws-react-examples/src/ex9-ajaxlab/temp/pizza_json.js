function getCustomerInfo() {
	var phone = $("#phone").val();
	if (phone == "") {
		$("#address").val("");
		$("#order").val("");
	}
	else {
		$.ajax({
	 		type: "GET",
			url: "lookupCustomer_json.jsp?phone=" + phone,            
			dataType: "json",
			success: updatePage,
			error: function(jqXHR, textStatus, errorThrown) {
				var message = jqXHR.getResponseHeader("Status");
				if ((message == null) || (message.length <= 0)) {
					alert("Error! Request status is " + jqXHR.status);
				} else {
					alert(message);	
				}
			}
		});
	}
}

function updatePage(customer) { //responseText) {
	alert("responseText: " + customer); // responseText);
	//var customer = JSON.parse(responseText);
	var address = customer.name + "\n"
				+ customer.address.street + "\n"
				+ customer.address.city + ", " 
				+ customer.address.state + " " 
				+ customer.address.zipCode;
				
	/* Update the HTML web form */
	$("#address").val(address);
	$("#greeting").text("Hi, "+ customer.name + "! ");
	$("#order").val(customer.recentOrder);
}

function submitOrder() {
	var phone = $("#phone").val();
	var address = $("#address").val();
	var order = $("#order").val();
	var data = {
		phone: phone, 
		address: { street: address },	// city, state, zipCode는 생략 -> null 값을 가짐				
		recentOrder: order
	};
	
	var jsonText = JSON.stringify(data);
	alert(jsonText);
	
	$.ajax({
 		type: "POST",
		url: "placeOrder_json.jsp",
		contentType: "application/json; charset=UTF-8", 
		data: jsonText,
		dataType: "json",
		success: showConfirmation,
		error: function(jqXHR, textStatus, errorThrown) {
			var message = jqXHR.getResponseHeader("Status");
			if ((message == null) || (message.length <= 0)) {
				alert("Error! Request status is " + jqXHR.status);
			} else {
				alert(message);	
			}
		}
	});
}

function showConfirmation(response) {
	// Create some confirmation text
	var p = document.createElement("p");
	p.innerHTML = "Your order should arrive within " +
			response + " minutes. Enjoy your pizza!";
	var span = document.createElement("span");
	$(span).append(p);
	$("#main-page > span").remove();
	$("#main-page").append(span);
	
	// Or you can replace the form with the confirmation as below:
	// $("#order-form").replaceWith(p);	
}