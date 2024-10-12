  Macro.add('sequence', {
    tags: null,   // This line here
    handler() {
        
      let output = '<<nobr>><div class="sequence">';
      for (let i = 0; i < this.payload.length; i++) {
        let node = this.payload[i];
        $(this).wiki(node);
      }
      output += `
        <div class="modal">
          <p id="modal-text"></p>
        </div>
      </div><</nobr>>
      `;
      this.output.append(output);
    }
  });
  
  Macro.add('idea', {
    tags: null,   // This line here
    handler(passage, text) {
      let setNode = this.payload[0];
      let output = '';
      if (setNode && setNode.name === 'set') {
        output += setNode.execute();
      }
      output += `
        <label class="idea">
          <<link "${text}">>
            <<replace #modal-text>><<include "${passage}">><</replace>>
          <</link>>
        </label>
      `;
      return output;
    }
  });