Config.cleanupWikifierOutput = false;
Config.passages.nobr = true;
setup.release = false;
var scriptsLoaded = false;
setup.tagDictionary = ["Physicality", "Cognition", "Magnetism", "Suspicion", "Anguish"];


$(document).on(':storyready', function () {
  console.log("Story ready");
  importScripts([
    'https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js',
    'https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js',
    'https://unpkg.com/@popperjs/core@2',
    'https://unpkg.com/tippy.js@6'
    ])
    .then(function () {
        initializeTooltipObserver();  // Start observing the document for new elements
      });
});

//slow video after waiting 100ms
setTimeout(function() {
  let video = document.getElementById("ink-corner");
  video.playbackRate = 0.5;
}, 100);

// Debounce function to limit how often the callback is invoked
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

/*
    setup.log(...)
    setup.warn(...)
    setup.error(...)
    setup.debug(...)
    setup.table(...)
*/
(function () {
    /* Controls whether logging is enabled. */
    const isEnabled = true;

    /* Logging method generation. */
    [
        'log', 'warn', 'error', 'debug', 'table'
    ].forEach(name => {
        Object.defineProperty(setup, name, {
            value : isEnabled
                ? (...args) => console[name](...args)
                : () => { /* no-op */ }
        });
    });
})();

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
// particlesJS.load('story', 'particles.json');



// Choice constructor
window.choice = class choice {
    constructor(Config = null){
      this.current = 0;
      this.value = 0;
      this.has = [];
      this.requires = [];
      this.speaker = "vessel";
    
      if(Config != null) {
        Object.keys(Config).forEach(function (pn) {
          this[pn] = clone(Config[pn]);
        }, this);
      }
    }
    clone(){
      return new this.constructor(this);
    }
  
    toJSON(){
      const ownData = {};
      Object.keys(this).forEach(function (pn) {
        ownData[pn] = clone(this[pn]);
      }, this);
      return JSON.reviveWrapper(`new ${this.constructor.name}($ReviveData$)`, ownData);
    }
  };

// Consequence class
window.consequences = class consequences {
  constructor(Config = null){
    this.Physicality = 0;
    this.Cognition = 0;
    this.Magnetism = 0;
    this.Anguish = 0;
    this.Suspicion = 0;
  
    if(Config != null) {
      Object.keys(Config).forEach(function (pn) {
        this[pn] = clone(Config[pn]);
      }, this);
    }
  }
  clone(){
    return new this.constructor(this);
  }

  toJSON(){
    const ownData = {};
    Object.keys(this).forEach(function (pn) {
      ownData[pn] = clone(this[pn]);
    }, this);
    return JSON.reviveWrapper(`new ${this.constructor.name}($ReviveData$)`, ownData);
  }
};

// Array intersection, expect result to be first string that is in both arrays
setup.ArrayIntersect = function(array1, array2) {
  const filteredArray = array1.filter(value => array2.includes(value));
  return filteredArray;
}

// Function to capitalize the first letter of each string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}