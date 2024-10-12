
// For some context, function is being passed a choice.object, which is an object with the following properties:
// choice.has = ["dom", "dom"];
// choice.requires = ["dom", "dom"];

setup.findTagPairs = function(choice, _i) {
    const pairs = [];
    const tags = choice.has;
    const requires = choice.requires;
    // setup.log("=====Finding Tag Pairs For " +choice.passage + " =====");
    // setup.log("The choice currently has: "+tags);
    // setup.log("The choice currently requires: "+requires);
    // setup.log("===========================");

    // For each term in tagDictionary, look for pairs between tags and requires in the choice object
    setup.tagDictionary.forEach( term => {
        let _tags = tags.slice();
        let _requires = requires.slice();
        // setup.log(">>> Looking for "+term+" pairs >>>");
        // setup.log("The choice currently has: "+_tags);

        // for each element in _tags, try to find a unique pair in _requires, count the number of pairs found
        _tags.forEach( tag => {
            if (tag === term) {
                let index = _requires.indexOf(term);
                if (index > -1) {
                    _requires.splice(index, 1);
                    pairs.push(term);
                }
            }
        });
        // Find the number of icons with the "on" class and the term class, and compare to the number of pairs found, adding the "on" class to the first icon if the number of icons is less than the number of pairs found or removing the "on" class if the number of icons is greater than the number of pairs found; repeat until the number of icons with the "on" class is equal to the number of pairs found
        
        // setup.log("There are currently "+$('#choice_'+_i).find("> .rewards icon."+term+".on").length+" "+term+" icons that are on. We need "+pairs.filter(item => item === term).length+" "+term+" icons to be on.");

        while ($('#choice_'+_i).find("> .rewards icon."+term+".on").length < pairs.filter(item => item === term).length) {
          let $icon = $('#choice_'+_i).find("> .rewards icon."+term+":not(.on)").first();
          if (!$icon.length) {
            setup.log("ERROR: Undefined element for "+term);
            break;
          }
          setup.log("Adding "+term+" icon to", $icon[0]);
          $icon.addClass("on");
          
        };

        while ($('#choice_'+_i).find("> .rewards icon."+term+".on").length > pairs.filter(item => item === term).length) {
          $('#choice_'+_i).find("> .rewards icon."+term+".on").last().removeClass("on");
          // setup.log("Removing "+term+" icon");
        };
    });
    // setup.log("Choice "+_i+" has pairs of: "+pairs);
    return pairs;
}

setup.checkAnguish = function(choice, _i) {
  // if choice.current is equal or greater than choice.value, find <icon> elements with the "anguish" class in the current choice and add the "on" class to them
  if (choice.current >= choice.value) {
    $('#choice_'+_i).find("> .rewards icon.Anguish").addClass("on");
    // Add the 'success' class to the choice element
    $('#choice_'+_i).addClass("success");
  } else {
    // if choice.current is not equal or greater than choice.value, find <icon> elements with the "anguish" class in the current choice and remove the "on" class from them
    $('#choice_'+_i).find("> .rewards icon.Anguish").removeClass("on");
    // remove success class from choice element
    $('#choice_'+_i).removeClass("success");
  }
}
// A function that is called when final choices have been made and all pairs are collected to be put into a final consequences object. 
setup.getConsequences = function(choices) {
    let _consequences =  new consequences();
    // Add pairs from choices to consequences object
    choices.forEach( choice => {
      const index = choices.indexOf(choice);
      // Run setup.findTagPairs on each choice object and add found pairs to consequences object
      setup.findTagPairs(choice, index).forEach( pair => {
        if (_consequences[pair] === undefined) {
          _consequences[pair] = 1;
        } else {
          _consequences[pair] += 1;
        }
      });
      const roll = Math.floor(Math.random() * 100) + 1;
      // if choice.current is not equal or greater than choice.value, count the number of "anguish" in choice.requires and add that number to the "anguish" property of the consequences object
      if (roll > choice.value) {
        // console log what we are looking for in the next if
        console.log("Choice index of " + index + "rolled a " + roll + " and failed the roll");
        _consequences["choice_"+index] = false;
        if ($('#choice_' + index).find('.rewards icon.Anguish').length) {
          if (_consequences.Anguish === undefined) {
            _consequences.Anguish = 0;
          }
          _consequences.Anguish += choice.value
          console.log("Roll: ", roll, "Value: ", choice.value, "Anguish: ", _consequences.Anguish);
        }
      } else {
        _consequences["choice_"+index] = true;
      }

    });
    
    setup.log("Consequences: ", _consequences)
    return _consequences;
};