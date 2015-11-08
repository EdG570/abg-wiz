var ph = '';
var co2 = '';
var bicarb = '';
var target = '';
var mv = '';


$(document).ready(function(){
  

  $('form').submit(function(event) {
    event.preventDefault();

    //Clears previous results on submission
    $('#results').find('h3').remove();
    $('#mv-result').find('h3').remove();
    $('form').children('p').remove();
    $('form').css('padding-top', '3em');

    //Store values from user inputs and resets fields on submission
    ph = $('input[name="ph"]').val();
    $(this).children('#ph').val('');

    co2 = $('input[name="co2"]').val();
    $(this).children('#co2').val('');

    bicarb = $('input[name="bicarb"]').val();
    $(this).children('#bicarb').val('');

    target = $('input[name="target"]').val();
    $(this).children('#target').val('');

    mv = $('input[name="mv"]').val();
    $(this).children('#mv').val('');
    //end store values

    ph = parseFloat(ph);
    co2 = parseInt(co2);
    bicarb = parseFloat(bicarb);
    target = parseInt(target);
    mv = parseFloat(mv);

    //If user input isNaN prepends statement to the user to re-enter data
    if(isNaN(ph) || isNaN(co2) || isNaN(bicarb)) {
      console.log('Not a number');
      $('form').prepend("<p>Sorry, that's not a number. Please enter a number and try again.</p>");
      $('form').css('padding-top', '1em');
    }
    else {

    analyze(); //If user input is valid function is called to analyze data

    }

  });

  //Slides down hidden info box when link is clicked
  $('#info-link').on('click', function(){
    $('#info-page').slideToggle(1500);
  });

});

function analyze() {

  console.log('Analyzing');

//Creates object for analyzing abg results
  var abg = {
    bicarb: {
      low: (bicarb < 22),
      normal: (bicarb >= 22 && bicarb <= 26),
      high: (bicarb > 26)
    },

    ph: {
      low: (ph < 7.35),
      normal: (ph >= 7.35 && ph <=7.45),
      high: (ph > 7.45)
    },

    co2: {
      low: (co2 < 35),
      normal: (co2 >= 35 && co2 <= 45),
      high: (co2 > 45)
    }

  };

  //Conditional statements for interpreting ABG results
  if( abg.ph.normal && abg.co2.normal && abg.bicarb.normal ) {
      $('#analysis').after("<h3>Normal Blood Gas</h3>");
    }

  else if( abg.ph.low && abg.co2.high && abg.bicarb.normal ) {
     $('#analysis').after("<h3>Acute Respiratory Acidosis</h3>");
  }

  else if( abg.ph.low && abg.co2.high && abg.bicarb.high ) {
    $('#analysis').after("<h3>Partially Compensated Respiratory Acidosis</h3>");
  }

  else if( abg.ph.low && abg.co2.high && abg.bicarb.low ) {
    $('#analysis').after("<h3>Combined Metabolic & Respiratory Acidosis</h3>");
  }

  else if( abg.ph.normal && abg.co2.high && abg.bicarb.high ) {
    $('#analysis').after("<h3>Compensated Respiratory Acidosis</h3>");
  }

  else if( abg.ph.high && abg.co2.low && abg.bicarb.normal ) {
    $('#analysis').after("<h3>Acute Respiratory Alkalosis</h3>");
  }

  else if( abg.ph.high && abg.co2.low && abg.bicarb.high ) {
    $('#analysis').after("<h3>Combined Respiratory & Metabolic Alkalosis</h3>");
  }

  else if( abg.ph.high && abg.co2.low && abg.bicarb.low ) {
    $('#analysis').after("<h3>Partially Compensated Respiratory Alkalosis</h3>");
  }

  else if( abg.ph.normal && abg.co2.low && abg.bicarb.low ) {
    $('#analysis').after("<h3>Compensated Respiratory Alkalosis</h3>");
  }

  else if( abg.ph.low && abg.co2.normal && abg.bicarb.low ) {
    $('#analysis').after("<h3>Acute Metabolic Acidosis</h3>");
  }

  else if( abg.ph.low && abg.co2.low && abg.bicarb.low ) {
    $('#analysis').after("<h3>Partially Compensated Metabolic Acidosis</h3>");
  }

  else if( abg.ph.normal && abg.co2.low && abg.bicarb.low ) {
    $('#analysis').after("<h3>Partially Compensated Metabolic Acidosis</h3>");
  }

  else if( abg.ph.high && abg.co2.normal && abg.bicarb.high ) {
    $('#analysis').after("<h3>Acute Metabolic Alkalosis</h3>");
  }

  else if( abg.ph.high && abg.co2.high && abg.bicarb.high ) {
    $('#analysis').after("<h3>Partially Compensated Metabolic Alkalosis</h3>");
  }

  else if( abg.ph.normal && abg.co2.high && abg.bicarb.high ) {
    $('#analysis').after("<h3>Compensated Metabolic Acidosis</h3>");
  }

  //If user doesn't input required data for calculation response is appended
  if(isNaN(target) || isNaN(mv)) {
    $('#mv-result').append('<h3>No data was entered to calculate MV</h3>');
    $('#results').show();
    $('#mv-result').show();
  } else{

  findTarget();

  }
}

//Calculates minute ventilation adjustments for a target PaCO2
function findTarget(targetMV) {
  targetMV = (mv * co2) / (target);
  $('#mv-result').append('<h3>Your target MV to obtain a PaCO2 of ' + target + ' is ' + targetMV + ' L/min.</h3>');
  
  $('#results').show();
  $('#mv-result').show();
}