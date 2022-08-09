



async function getResponse() {
	const ip_range = [1,5,9,13,17,21,25,29,33,37,41,45,49,53,57,61,65,69,73,77,81,85,89,93,97,101,105,109,113,117,121,125,129,133,137,141,145,149,153,157,161,165,169,173,177,181,185,189,193,197,201,205,209,213,217,221,225,229,233,237,241,245,249,253]
//list of ip address that we need to check
	const response = await fetch("data.json");
	const data = await response.json();
	let ip_list_of_address = data	
	const table = document.getElementById("myTable");
	let ip_split = [ ]
	let ip_arr_last_nb = [ ]
	let result_filtered_ip = [ ]
	let result_ip_id = [ ]
	let ip_address = `${ip_list_of_address[0].split(".", 3).join(".")}.`

//get last nb from ip address
for (let i = 0 ; i < ip_list_of_address.length; i++) {
	ip_split.push(ip_list_of_address[i].split(".", 4))
}

for (let i = 0 ; i < ip_split.length; i++) {
	ip_arr_last_nb.push(ip_split[i][3])
}

//conver array string to numbers values
const ip_address_str_nb = ip_arr_last_nb.map(str => {
    return Number(str);
});

//filter odd numbers form arrays
const ip_odds = ip_address_str_nb.filter(number => {
    return number % 2 !== 0;
});

//filter existent of ip address

result_filtered_ip = ip_range.filter(item => !ip_odds.includes(item));

// find network id

console.log("ip address"+ip_address)
let mask_ip = "255.255.255.252"
for (let i = 0 ; i < result_filtered_ip.length; i++) {
	result_ip_id.push(result_filtered_ip[i]-1)
}

// display result in table

for(let i = 0 ; i < result_ip_id.length; i++) {

  table.innerHTML += `
	<tr>
		<td>${ip_address}${result_ip_id[i]}</td>
		<td>${mask_ip}</td>
	</tr>`

}

// count number ip address

document.getElementById("ipcount").innerHTML = `list of available IP address : ${result_ip_id.length}`
}

getResponse()