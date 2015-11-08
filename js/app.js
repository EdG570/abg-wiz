var ph = '';
var co2 = '';
var bicarb = '';
var target = '';
var mv = '';


$(document).ready(function(){
  

  $('form').submit(function(event) {
    event.preventDefault();

    $('#results').find('h3').remove();
    $('#mv-result').find('h3').remove();
    $('form').children('p').remove();

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

    ph = parseFloat(ph);
    co2 = parseInt(co2);
    bicarb = parseFloat(bicarb);
    target = parseInt(target);
    mv = parseFloat(mv);

    if(isNaN(ph) || isNaN(co2) || isNaN(bicarb)) {
      console.log('Not a number');
      $('form').prepend("<p>Sorry, that's not a number. Please enter a number and try again.</p>");
    }
    else {

    analyze();

    }

  });

});

function analyze() {

  console.log('Analyzing');

  var bicarbNormal = (bicarb >= 22 && bicarb <= 26);
  var phNormal = (ph >= 7.35 && ph <= 7.45);
  var co2Normal = (co2 >= 35 && co2 <= 45);
  var phHigh = ph > 7.45;
  var phLow = ph < 7.35;
  var co2High = co2 > 45;
  var co2Low = co2 < 35;
  var bicarbLow = bicarb < 22;
  var bicarbHigh = bicarb > 26;

  if( phNormal && co2Normal && bicarbNormal ) {
      $('#analysis').after("<h3>Normal Blood Gas</h3>");
    }

  else if( phLow && co2High && bicarbNormal ) {
     $('#analysis').after("<h3>Acute Respiratory Acidosis</h3>");
  }

  else if( phLow && co2High && bicarbHigh ) {
    $('#analysis').after("<h3>Partially Compensated Respiratory Acidosis</h3>");
  }

  else if(phLow && co2High && bicarbLow) {
    $('#analysis').after("<h3>Combined Metabolic & Respiratory Acidosis</h3>");
  }

  else if( phNormal && co2High && bicarbHigh ) {
    $('#analysis').after("<h3>Compensated Respiratory Acidosis</h3>");
  }

  else if( phHigh && co2Low && bicarbNormal ) {
    $('#analysis').after("<h3>Acute Respiratory Alkalosis</h3>");
  }

  else if( phHigh && co2Low && bicarbHigh ) {
    $('#analysis').after("<h3>Combined Respiratory & Metabolic Alkalosis</h3>");
  }

  else if( phHigh && co2Low && bicarbLow ) {
    $('#analysis').after("<h3>Partially Compensated Respiratory Alkalosis</h3>");
  }

  else if( phNormal && co2Low && bicarbLow ) {
    $('#analysis').after("<h3>Compensated Respiratory Alkalosis</h3>");
  }

  else if( phLow && co2Normal && bicarbLow) {
    $('#analysis').after("<h3>Acute Metabolic Acidosis</h3>");
  }

  else if( phLow && co2Low && bicarbLow) {
    $('#analysis').after("<h3>Partially Compensated Metabolic Acidosis</h3>");
  }

  else if( phNormal && co2Low && bicarbLow) {
    $('#analysis').after("<h3>Partially Compensated Metabolic Acidosis</h3>");
  }

  else if( phHigh && co2Normal && bicarbHigh) {
    $('#analysis').after("<h3>Acute Metabolic Alkalosis</h3>");
  }

  else if( phHigh && co2High && bicarbHigh) {
    $('#analysis').after("<h3>Partially Compensated Metabolic Alkalosis</h3>");
  }

  else if( phNormal && co2High && bicarbHigh) {
    $('#analysis').after("<h3>Compensated Metabolic Acidosis</h3>");
  }

  if(isNaN(target) || isNaN(mv)) {
    $('#mv-result').append('<h3>No data was entered to calculate MV</h3>');
    $('#results').show();
    $('#mv-result').show();
  } else{

  findTarget();

  }
}


function findTarget(targetMV) {
  targetMV = (mv * co2) / (target);
  $('#mv-result').append('<h3>Your target MV to obtain a PaCO2 of ' + target + ' is ' + targetMV + ' L/min.</h3>');
  
  $('#results').show();
  $('#mv-result').show();
}