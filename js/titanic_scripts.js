(function () {
  'use strict';

  var records = csvToObjects(titanic, ['passengerId', 'survived', 'pclass', 'name', 'gender', 'age', 'ticket', 'fare'], true);

  var parsedRecords = records.map(function(passenger) {
    var parsedPass = {};
    parsedPass.passengerId = parseFloat(passenger.passengerId);
    if(parseFloat(passenger.survived) === 0) {
      parsedPass.survived = false;
    } else {
      parsedPass.survived = true;
    }
    parsedPass.pclass = parseFloat(passenger.pclass);
    parsedPass.name = passenger.name;
    parsedPass.gender = passenger.gender;
    parsedPass.age = parseFloat(passenger.age);
    parsedPass.ticket = passenger.ticket;
    parsedPass.fare = parseFloat(passenger.fare);
    return parsedPass;
  });

  //Number of Passengers by Category

  var numOf = function(attributes) {
    return (_.where(parsedRecords, attributes)).length
  }
  var numPass = parsedRecords.length;
  var numMalePass = numOf({gender: 'male'});
  var numFemalePass = numOf({gender: 'female'});
  var numSurvivors = numOf({survived: true});
  var numSurvivedMale = numOf({survived: true, gender: 'male'});
  var numSurvivedFemale = numOf({survived: true, gender: 'female'});

  //Fare

  var totalFare = _.pluck(parsedRecords, 'fare').reduce(function(a, b) {
      return a+b;
    });

  var averageFare = Math.round(totalFare/numPass*100)/100;

  var percent = function(subgroup) {
    return Math.round(subgroup/numPass * 100);
  }

  var percentMale = percent(numMalePass);
  var percentFemale = percent(numFemalePass);
  var percentSurvived = percent(numSurvivors);

  //Percent of Survivors

  var percentOfSurvivors = function(subgroup) {
    return Math.round(subgroup/numSurvivors * 100);
  }

  var percentSurvivedMale = percentOfSurvivors(numSurvivedMale);
  var percentSurvivedFemale = percentOfSurvivors(numSurvivedFemale);

  //Age

  var recordsWithAge = parsedRecords.filter(function hasAge(record) {
    if ('age' in record && typeof(record.age) === 'number' && !isNaN(record.age)) {
      return true;
    } else {
      return false;
    }
  });

  var averageAge = function (attribute) {
    return Math.round(_.pluck(_.where(recordsWithAge, attribute), 'age')
      .reduce(function(a, b) {
        return a+b;
      })/(_.where(recordsWithAge, attribute).length));
  }

  var averagePassAge = averageAge();
  var averageMaleAge = averageAge({gender: 'male'});
  var averageFemaleAge = averageAge({gender: 'female'});
  var averageSurvivorAge = averageAge({survived: true});

  //HTML Insertion

  var stats = "<h1>Titanic</h1><p>Average Fare: " + averageFare.toString() + "</p><p>Percent Male: " + percentMale.toString() + "</p><p>Percent Female: " + percentFemale.toString() + "</p><p>Percent Survived: " + percentSurvived.toString() + "</p><p>Percent of Survivors that were Male: " + percentSurvivedMale.toString() + "</p><p>Percent of Survivors that were Female: " + percentSurvivedFemale.toString() + "</p><p>Average Passenger Age: " + averagePassAge.toString() + "</p><p>Average Male Age: " + averageMaleAge.toString() +  "</p>";

  document.querySelector(".main-content").innerHTML = stats;

})();
