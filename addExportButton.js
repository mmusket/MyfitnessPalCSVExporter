

console.log('Magic time!'); 
$('input[type="submit"]').after('<input id="exportButton" class="button" type="button" value="csv export" style="width: 138px;margin-top: 2px;"/>')

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};



function getHeader() {

	var titles = ['Date','Meal']; 
	var table = $('.table0:first').find('thead').find('td')
								  .each(function(id,value){
										titles.push($(value).text());
				 });	
	return titles;
}


function getData() {

	var csvData = []; 	
    var dates = []; 
    $('h2.main-title-2').each(function(id,value){	
		var d = new Date($(value).text());
		dates.push(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
		});
		
		
	var currentMeal = '';
	var dateCounter = 0; 
	$('.table0#food').each(function(i,table){
		$(table).find('tbody').find('tr').each(function(id,row){	
	    
			if($(row).children().length == 1)
			{
				currentMeal = $(row).find('td').text();	         			
			}
			else
			{			   
				var csvrow = '{0}, {1}, '.format(dates[dateCounter],currentMeal);
				var rowValues = []; 
				$(row).find('td').each(function(item,value){
				    if($(this).hasClass == 'first')
						rowValues.push( $(value).text().replace(/,/g,' ')); 
					else
						rowValues.push( $(value).text().replace(/,/g,'')); 
				});	
				csvrow += rowValues.join(', '); 				
				csvData.push(csvrow + '\r\n');  				
			}
		});	
		dateCounter +=1 ; 
	});
	
	
	
	return csvData; 
}



$('#exportButton').click(function() {     
	
	var csv = getHeader().join(', ') + '\r\n' ; 
	$.each(getData(),function(i,v){
		csv += v; 
	});		
		
	location.href='data:application/csv; charset=utf-8,' + encodeURIComponent(csv);
	 
  
  
	console.log('Finished Extraction'); 
});






