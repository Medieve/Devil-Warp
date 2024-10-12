function initializeTooltipObserver() {
    const validTooltipSelectors = ['[data-tooltip]', 'icon']; 
  
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Check if the node itself matches any valid target
            validTooltipSelectors.forEach((selector) => {
              if (node.matches(selector)) {
                setTippy(node);
              }
            });
            
            // Also check any child elements of the node
            node.querySelectorAll(validTooltipSelectors.join(',')).forEach((childNode) => {
              setTippy(childNode);
            });
          }
        });
      });
    });
  
    // Start observing the document body for any child node additions
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  function setTippy(element) {
    if (element._tippy) {
      return;
    }
    tippy(element, {
      content: element.getAttribute('data-tooltip') || 'Default Tooltip Text',
      delay: [200, 500],
      // other tippy options here
    });
  }