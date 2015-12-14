$(document).ready(function() {
    $("#menu").accordion({collapsible: false, active: false});
     $('#FaustUI').sortable();
});
//-----------------------------------------------------------------------------
// a function to build a slider
// a faust slider is a composite object that embeds a label, a 'range' input
// and a 'text' input displaying the slider value
// slider and text value are linked together to reflect the same value.
//-----------------------------------------------------------------------------
function makeslider(id, orientation, handler, min, max, value, step) 
{
	var slider = document.createElement('input');
	slider.id = id;
	slider.type	= "range";
	slider.min = min;
	slider.max = max;
	slider.value = value;
	slider.step = step;

	var valId = "v"+id;
	var textval = document.createElement('input');
	textval.id = valId;
	textval.type = "text";
	textval.value = value;
	textval.size = 6;
  
	textval.onchange = function() { $("#"+id).val(this.value); handler(this.value); };
	slider.onchange  = function() { $("#"+valId).val(this.value); handler(this.value); };
	slider.fTextValue = textval;
	return slider;
}

function makenumentry(id, handler, min, max, value, step) 
{
    var valId = "n"+id;
	var textval = document.createElement('input');
	textval.id = valId;
	textval.type = "text";
	textval.value = value;
	textval.size = 6;
  
	textval.onchange = function() { $("#"+id).val(this.value); handler(this.value); };
	return textval;
}

//-----------------------------------------------------------------------------
// a push button
//-----------------------------------------------------------------------------
function makebutton(label, id, handler) 
{
	var button = document.createElement('button');
	button.id = id;
	button.type = "button";
	button.innerHTML = label;
	button.value = 1;
	button.onmousedown = function() { handler(1); };
	button.onmouseup = function() { handler(0); };
	return button;
}

//-----------------------------------------------------------------------------
// a check box
//-----------------------------------------------------------------------------
function makecheckbox(label, id, handler) 
{
	var cbox = document.createElement('input');
	cbox.id	= id;
	cbox.type = "checkbox";
	cbox.value = 0;
	cbox.onchange = function() { this.value = (this.value == 1) ? 0 : 1; handler(this.value); };
	return cbox;
}

function makeCol(elt, classname) 
{
	var col = document.createElement('td');
	if (typeof elt == 'object') {
		col.appendChild(elt);
		elt.className = classname;
	}else {
        col.innerHTML = elt;
    }
	if (typeof classname != 'undefined') {
		col.className = classname;
    }
	return col;
}

//-----------------------------------------------------------------------------
// base UI builder
//-----------------------------------------------------------------------------

function DefaultJUI(div)  {

    this.openTabBox = function(label) 
    {
        console.log("openTabBox: " + label);
    }
    
    this.openHorizontalBox = function(label) 
    {
        console.log("openHorizontalBox: " + label);
	}
    
    this.openVerticalBox = function(label) 
    {
        console.log("openVerticalBox: " + label);
	}
    
    this.closeBox = function() 
    {
        console.log("closeBox");
    }
    
    this.addButton = function(label, handler) 
    {
       console.log("addButton: " + label);
	}
    
    this.addCheckButton = function(label, handler) 
    {
        console.log("addCheckButton: " + label);
	}
    
    this.addVerticalSlider = function(label, handler, init, min, max, step) 
    {
        console.log("addVerticalSlider: " + label);
	}
    
    this.addHorizontalSlider = function(label, handler, init, min, max, step) 
    {
        console.log("addHorizontalSlider: " + label);
	}
    
    this.addNumEntry = function(label, handler, init, min, max, step) 
    {
        console.log("addNumEntry: " + label);    
    }

    this.addHorizontalBargraph = function(label, handler,  min, max) 
    {
        console.log("addHorizontalBargraph: " + label);
    }
    
    this.addVerticalBargraph = function(label, handler,  min, max) 
    {
         console.log("addVerticalBargraph: " + label);
    }
    
    this.declare = function(handler, key, value) 
    {
         console.log("declare");
    }
}

function DefaultMeta(div)  {

    this.declare = function(key, value) 
    {
        iconsole.log("declare");
    }
}

//-----------------------------------------------------------------------------
// jQuery UI builder
//-----------------------------------------------------------------------------

function JUI(div)  {

    this.table = document.createElement('table');
    this.table.className = "ui";
    this.table.appendChild(document.createElement('tr'));
    div.appendChild(this.table);
    this.counter = 0;
     
    this.openTabBox = function(label) 
    {
        var row = document.createElement('tr');
        row.appendChild(document.createElement('td'));
        row.appendChild(document.createTextNode(label));
        this.table.appendChild(row);
    }
    
    this.openHorizontalBox = function(label) 
    {
        var row = document.createElement('tr');
        row.appendChild(document.createElement('td'));
        row.appendChild(document.createTextNode(label));
        this.table.appendChild(row);
	}
    
    this.openVerticalBox = function(label) 
    {
        var row = document.createElement('tr');
        row.appendChild(document.createElement('td'));
        row.appendChild(document.createTextNode(label));
        this.table.appendChild(row);
	}
    
    this.closeBox = function() 
    {}
    
    this.addButton = function(label, handler) 
    {
        var row = document.createElement('tr');
        row.appendChild(document.createElement('td'));
        row.appendChild(makebutton(label, "button" + this.counter++, handler));
        row.appendChild(document.createElement('td'));
		this.table.appendChild(row);
	}
    
    this.addCheckButton = function(label, handler) 
    {
        var row = document.createElement('tr');
        row.appendChild(document.createElement('td'));
        row.appendChild(makeCol(label, "label"));
        row.appendChild(makecheckbox(label, "button" + this.counter++, handler));
        row.appendChild(document.createElement('td'));
		this.table.appendChild(row);
	}
    
    this.addVerticalSlider = function(label, handler, init, min, max, step) 
    {
        var row = document.createElement('tr');
        var slider = makeslider("slider" + this.counter++, 'vertical', handler, min, max, init, step);
		row.appendChild(makeCol(label, "label"));
		row.appendChild(makeCol(slider), "control");
		row.appendChild(makeCol(slider.fTextValue), "value");
        this.table.appendChild(row);
	}
    
    this.addHorizontalSlider = function(label, handler, init, min, max, step) 
    {
        var row = document.createElement('tr');
        var slider = makeslider("slider" + this.counter++, 'horizontal', handler, min, max, init, step);
		row.appendChild(makeCol(label, "label"));
		row.appendChild(makeCol(slider), "control");
		row.appendChild(makeCol(slider.fTextValue), "value");
        this.table.appendChild(row);
	}
    
    this.addNumEntry = function(label, handler, init, min, max, step) 
    {
        var row = document.createElement('tr');
        row.appendChild(makeCol(label, "label"));
        row.appendChild(document.createElement('td'));
        row.appendChild(makenumentry("numentry" + this.counter++, handler, min, max, init, step));
        row.appendChild(document.createElement('td'));
        this.table.appendChild(row);
    }

    this.addHorizontalBargraph = function(label, handler,  min, max) 
    {}
    
    this.addVerticalBargraph = function(label, handler,  min, max) 
    {}
    
    this.declare = function(handler, key, value) 
    {}
}

function Meta(div)  {

    this.table = document.createElement('table');
    this.table.className = "ui";
    this.table.appendChild(document.createElement('tr'));
	div.appendChild(this.table);
      
    this.declare = function(key, value) 
    {
        if (key == "name" 
            || key == "version"
            || key == "copyright"
            || key == "author") {
            var row = document.createElement('tr');
            row.appendChild(document.createTextNode(key));
            row.appendChild(document.createElement('td'));
            row.appendChild(document.createTextNode(value));
            this.table.appendChild(row);
        }
	}
}


function FMI() {

    this.list = function()  // ===>  "/karplus/volume",   "/karplus/pitch"
    {
    
    }
    
    this.set = function(param, value) {}
    
    this.get = function(param) {}
    
}

//OSC GUTS------------------------------------------------------------------------
function oscSIG0() {
	
	this.iRec1 = new Int32Array(2);
	
	
	this.getNumInputs = function() {
		return 0;
		
	}
	this.getNumOutputs = function() {
		return 1;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 0;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.instanceInitoscSIG0 = function(samplingFreq) {
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec1[i] = 0;
			
		}
		
	}
	
	this.filloscSIG0 = function(count, output) {
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iRec1[0] = (1 + this.iRec1[1]);
			output[i] = Math.sin((9.58738e-05 * (this.iRec1[0] - 1)));
			this.iRec1[1] = this.iRec1[0];
			
		}
		
	}
}

newoscSIG0 = function() { return new oscSIG0(); }

var ftbl0oscSIG0 = new Float32Array(65536);

function osc() {
	
	this.fRec2 = new Float32Array(2);
	this.fRec0 = new Float32Array(2);
	this.fhslider0;
	this.fSamplingFreq;
	this.fConst0;
	this.fhslider1;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2009");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "osc");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 0;
		
	}
	this.getNumOutputs = function() {
		return 1;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
		var sig0 = newoscSIG0();
		sig0.instanceInitoscSIG0(samplingFreq);
		sig0.filloscSIG0(65536, ftbl0oscSIG0);
		
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = -96;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		this.fConst0 = (1 / Math.min(192000, Math.max(1, this.fSamplingFreq)));
		this.fhslider1 = 1000;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("Oscillator");
		ui_interface.declare("fhslider1", "unit", "Hz");
		ui_interface.addHorizontalSlider("freq", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 1000, 20, 24000, 1);
		ui_interface.declare("fhslider0", "unit", "dB");
		ui_interface.addHorizontalSlider("volume", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), -96, -96, 0, 0.1);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var output0 = outputs[0];
		var fSlow0 = (0.001 * Math.pow(10, (0.05 * this.fhslider0)));
		var fSlow1 = (this.fConst0 * this.fhslider1);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.fRec0[0] = ((0.999 * this.fRec0[1]) + fSlow0);
			var fTemp0 = (this.fRec2[1] + fSlow1);
			this.fRec2[0] = (fTemp0 - Math.floor(fTemp0));
			output0[i] = (this.fRec0[0] * ftbl0oscSIG0[(65536 * this.fRec2[0])]);
			this.fRec0[1] = this.fRec0[0];
			this.fRec2[1] = this.fRec2[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_osc = function(obj) 
{
    function process_aux_osc(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_osc;
}

function create_osc(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new osc();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_osc(this);
    
    return this.processor;
}
//Karplus Guts---------------------------------------------------------------
function karplus() {
	
	this.fRec0 = new Float32Array(3);
	this.fVec1 = new Float32Array(512);
	this.fRec2 = new Float32Array(2);
	this.fVec0 = new Float32Array(2);
	this.iRec1 = new Int32Array(2);
	this.fhslider0;
	this.fhslider1;
	this.fbutton0;
	this.fhslider2;
	this.IOTA;
	this.fhslider3;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2006");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "karplus");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 0;
		
	}
	this.getNumOutputs = function() {
		return 1;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 0.1;
		this.fhslider1 = 0.5;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec1[i] = 0;
			
		}
		this.fbutton0 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec0[i] = 0;
			
		}
		this.fhslider2 = 128;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		this.IOTA = 0;
		for (var i = 0; (i < 512); i = (i + 1)) {
			this.fVec1[i] = 0;
			
		}
		this.fhslider3 = 128;
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("karplus");
		ui_interface.openVerticalBox("excitator");
		ui_interface.declare("fhslider2", "unit", "f");
		ui_interface.addHorizontalSlider("excitation", function handler(obj) { function setval(val) { obj.fhslider2 = val; } return setval; }(this), 128, 2, 512, 1);
		ui_interface.addButton("play", function handler(obj) { function setval(val) { obj.fbutton0 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.addHorizontalSlider("level", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 0.5, 0, 1, 0.01);
		ui_interface.openVerticalBox("resonator");
		ui_interface.addHorizontalSlider("attenuation", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 0.1, 0, 1, 0.01);
		ui_interface.declare("fhslider3", "unit", "f");
		ui_interface.addHorizontalSlider("duration", function handler(obj) { function setval(val) { obj.fhslider3 = val; } return setval; }(this), 128, 2, 512, 1);
		ui_interface.closeBox();
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var output0 = outputs[0];
		var fSlow0 = (0.5 * (1 - this.fhslider0));
		var fSlow1 = (4.65661e-10 * this.fhslider1);
		var fSlow2 = this.fbutton0;
		var fSlow3 = (1 / this.fhslider2);
		var iSlow4 = ((this.fhslider3 - 1.5) & 4095);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iRec1[0] = (12345 + (1103515245 * this.iRec1[1]));
			this.fVec0[0] = fSlow2;
			this.fRec2[0] = ((this.fRec2[1] + ((fSlow2 - this.fVec0[1]) > 0)) - (fSlow3 * (this.fRec2[1] > 0)));
			this.fVec1[(this.IOTA & 511)] = ((fSlow0 * (this.fRec0[1] + this.fRec0[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec2[0] > 0))));
			this.fRec0[0] = this.fVec1[((this.IOTA - iSlow4) & 511)];
			output0[i] = this.fRec0[0];
			this.iRec1[1] = this.iRec1[0];
			this.fVec0[1] = this.fVec0[0];
			this.fRec2[1] = this.fRec2[0];
			this.IOTA = (this.IOTA + 1);
			this.fRec0[2] = this.fRec0[1];
			this.fRec0[1] = this.fRec0[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_karplus = function(obj) 
{
    function process_aux_karplus(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_karplus;
}

function create_karplus(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new karplus();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_karplus(this);
    
    return this.processor;
}
//Karplus32 Guts ------------------------------------------------------------
function karplus32() {
	
	this.fRec33 = new Float32Array(3);
	this.fVec32 = new Float32Array(4096);
	this.fRec32 = new Float32Array(3);
	this.fVec31 = new Float32Array(4096);
	this.fRec31 = new Float32Array(3);
	this.fVec30 = new Float32Array(4096);
	this.fRec30 = new Float32Array(3);
	this.fVec29 = new Float32Array(4096);
	this.fRec29 = new Float32Array(3);
	this.fVec28 = new Float32Array(4096);
	this.fRec28 = new Float32Array(3);
	this.fVec27 = new Float32Array(4096);
	this.fRec27 = new Float32Array(3);
	this.fVec26 = new Float32Array(4096);
	this.fRec26 = new Float32Array(3);
	this.fVec25 = new Float32Array(4096);
	this.fRec25 = new Float32Array(3);
	this.fVec24 = new Float32Array(4096);
	this.fRec24 = new Float32Array(3);
	this.fVec23 = new Float32Array(4096);
	this.fRec23 = new Float32Array(3);
	this.fVec22 = new Float32Array(4096);
	this.fRec22 = new Float32Array(3);
	this.fVec21 = new Float32Array(4096);
	this.fRec21 = new Float32Array(3);
	this.fVec20 = new Float32Array(4096);
	this.fRec20 = new Float32Array(3);
	this.fVec19 = new Float32Array(4096);
	this.fRec19 = new Float32Array(3);
	this.fVec18 = new Float32Array(2048);
	this.fRec18 = new Float32Array(3);
	this.fVec17 = new Float32Array(1024);
	this.fRec17 = new Float32Array(3);
	this.fVec16 = new Float32Array(4096);
	this.fRec16 = new Float32Array(3);
	this.fVec15 = new Float32Array(4096);
	this.fRec15 = new Float32Array(3);
	this.fVec14 = new Float32Array(4096);
	this.fRec14 = new Float32Array(3);
	this.fVec13 = new Float32Array(4096);
	this.fRec13 = new Float32Array(3);
	this.fVec12 = new Float32Array(4096);
	this.fRec12 = new Float32Array(3);
	this.fVec11 = new Float32Array(4096);
	this.fRec11 = new Float32Array(3);
	this.fVec10 = new Float32Array(4096);
	this.fRec10 = new Float32Array(3);
	this.fVec9 = new Float32Array(4096);
	this.fRec9 = new Float32Array(3);
	this.fVec8 = new Float32Array(4096);
	this.fRec8 = new Float32Array(3);
	this.fVec7 = new Float32Array(4096);
	this.fRec7 = new Float32Array(3);
	this.fVec6 = new Float32Array(4096);
	this.fRec6 = new Float32Array(3);
	this.fVec5 = new Float32Array(4096);
	this.fRec5 = new Float32Array(3);
	this.fVec4 = new Float32Array(4096);
	this.fRec4 = new Float32Array(3);
	this.fVec3 = new Float32Array(4096);
	this.fRec3 = new Float32Array(3);
	this.fVec2 = new Float32Array(2048);
	this.fRec0 = new Float32Array(3);
	this.fVec1 = new Float32Array(512);
	this.fRec2 = new Float32Array(2);
	this.fVec0 = new Float32Array(2);
	this.iRec1 = new Int32Array(2);
	this.fhslider0;
	this.fhslider1;
	this.fhslider2;
	this.fhslider3;
	this.fbutton0;
	this.fhslider4;
	this.IOTA;
	this.fhslider5;
	this.fhslider6;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2006");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "karplus32");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 0;
		
	}
	this.getNumOutputs = function() {
		return 2;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 0.5;
		this.fhslider1 = 1;
		this.fhslider2 = 0.1;
		this.fhslider3 = 0.5;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec1[i] = 0;
			
		}
		this.fbutton0 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec0[i] = 0;
			
		}
		this.fhslider4 = 128;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		this.IOTA = 0;
		for (var i = 0; (i < 512); i = (i + 1)) {
			this.fVec1[i] = 0;
			
		}
		this.fhslider5 = 128;
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec2[i] = 0;
			
		}
		this.fhslider6 = 32;
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec3[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec3[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec4[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec4[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec5[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec5[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec6[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec6[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec7[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec7[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec8[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec8[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec9[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec9[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec10[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec10[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec11[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec11[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec12[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec12[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec13[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec13[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec14[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec14[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec15[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec15[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec16[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec16[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec17[i] = 0;
			
		}
		for (var i = 0; (i < 1024); i = (i + 1)) {
			this.fVec17[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec18[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec18[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec19[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec19[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec20[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec20[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec21[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec21[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec22[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec22[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec23[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec23[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec24[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec24[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec25[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec25[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec26[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec26[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec27[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec27[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec28[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec28[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec29[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec29[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec30[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec30[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec31[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec31[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec32[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec32[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec33[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("karplus32");
		ui_interface.openVerticalBox("excitator");
		ui_interface.addHorizontalSlider("excitation (samples)", function handler(obj) { function setval(val) { obj.fhslider4 = val; } return setval; }(this), 128, 2, 512, 1);
		ui_interface.addButton("play", function handler(obj) { function setval(val) { obj.fbutton0 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.openVerticalBox("noise generator");
		ui_interface.addHorizontalSlider("level", function handler(obj) { function setval(val) { obj.fhslider3 = val; } return setval; }(this), 0.5, 0, 1, 0.1);
		ui_interface.closeBox();
		ui_interface.addHorizontalSlider("output volume", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 0.5, 0, 1, 0.1);
		ui_interface.openVerticalBox("resonator x32");
		ui_interface.addHorizontalSlider("attenuation", function handler(obj) { function setval(val) { obj.fhslider2 = val; } return setval; }(this), 0.1, 0, 1, 0.01);
		ui_interface.addHorizontalSlider("detune", function handler(obj) { function setval(val) { obj.fhslider6 = val; } return setval; }(this), 32, 0, 512, 1);
		ui_interface.addHorizontalSlider("duration (samples)", function handler(obj) { function setval(val) { obj.fhslider5 = val; } return setval; }(this), 128, 2, 512, 1);
		ui_interface.addHorizontalSlider("polyphony", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 1, 0, 32, 1);
		ui_interface.closeBox();
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = this.fhslider0;
		var fSlow1 = this.fhslider1;
		var iSlow2 = (fSlow1 > 0);
		var fSlow3 = (0.5 * (1 - this.fhslider2));
		var fSlow4 = (4.65661e-10 * this.fhslider3);
		var fSlow5 = this.fbutton0;
		var fSlow6 = (1 / this.fhslider4);
		var fSlow7 = this.fhslider5;
		var iSlow8 = ((fSlow7 - 1.5) & 4095);
		var iSlow9 = (fSlow1 > 2);
		var fSlow10 = this.fhslider6;
		var iSlow11 = (((fSlow7 + (2 * fSlow10)) - 1.5) & 4095);
		var iSlow12 = (fSlow1 > 4);
		var iSlow13 = (((fSlow7 + (4 * fSlow10)) - 1.5) & 4095);
		var iSlow14 = (fSlow1 > 6);
		var iSlow15 = (((fSlow7 + (6 * fSlow10)) - 1.5) & 4095);
		var iSlow16 = (fSlow1 > 8);
		var iSlow17 = (((fSlow7 + (8 * fSlow10)) - 1.5) & 4095);
		var iSlow18 = (fSlow1 > 10);
		var iSlow19 = (((fSlow7 + (10 * fSlow10)) - 1.5) & 4095);
		var iSlow20 = (fSlow1 > 12);
		var iSlow21 = (((fSlow7 + (12 * fSlow10)) - 1.5) & 4095);
		var iSlow22 = (fSlow1 > 14);
		var iSlow23 = (((fSlow7 + (14 * fSlow10)) - 1.5) & 4095);
		var iSlow24 = (fSlow1 > 16);
		var iSlow25 = (((fSlow7 + (16 * fSlow10)) - 1.5) & 4095);
		var iSlow26 = (fSlow1 > 18);
		var iSlow27 = (((fSlow7 + (18 * fSlow10)) - 1.5) & 4095);
		var iSlow28 = (fSlow1 > 20);
		var iSlow29 = (((fSlow7 + (20 * fSlow10)) - 1.5) & 4095);
		var iSlow30 = (fSlow1 > 22);
		var iSlow31 = (((fSlow7 + (22 * fSlow10)) - 1.5) & 4095);
		var iSlow32 = (fSlow1 > 24);
		var iSlow33 = (((fSlow7 + (24 * fSlow10)) - 1.5) & 4095);
		var iSlow34 = (fSlow1 > 26);
		var iSlow35 = (((fSlow7 + (26 * fSlow10)) - 1.5) & 4095);
		var iSlow36 = (fSlow1 > 28);
		var iSlow37 = (((fSlow7 + (28 * fSlow10)) - 1.5) & 4095);
		var iSlow38 = (fSlow1 > 30);
		var iSlow39 = (((fSlow7 + (30 * fSlow10)) - 1.5) & 4095);
		var iSlow40 = (fSlow1 > 1);
		var iSlow41 = (((fSlow7 + fSlow10) - 1.5) & 4095);
		var iSlow42 = (fSlow1 > 3);
		var iSlow43 = (((fSlow7 + (3 * fSlow10)) - 1.5) & 4095);
		var iSlow44 = (fSlow1 > 5);
		var iSlow45 = (((fSlow7 + (5 * fSlow10)) - 1.5) & 4095);
		var iSlow46 = (fSlow1 > 7);
		var iSlow47 = (((fSlow7 + (7 * fSlow10)) - 1.5) & 4095);
		var iSlow48 = (fSlow1 > 9);
		var iSlow49 = (((fSlow7 + (9 * fSlow10)) - 1.5) & 4095);
		var iSlow50 = (fSlow1 > 11);
		var iSlow51 = (((fSlow7 + (11 * fSlow10)) - 1.5) & 4095);
		var iSlow52 = (fSlow1 > 13);
		var iSlow53 = (((fSlow7 + (13 * fSlow10)) - 1.5) & 4095);
		var iSlow54 = (fSlow1 > 15);
		var iSlow55 = (((fSlow7 + (15 * fSlow10)) - 1.5) & 4095);
		var iSlow56 = (fSlow1 > 17);
		var iSlow57 = (((fSlow7 + (17 * fSlow10)) - 1.5) & 4095);
		var iSlow58 = (fSlow1 > 19);
		var iSlow59 = (((fSlow7 + (19 * fSlow10)) - 1.5) & 4095);
		var iSlow60 = (fSlow1 > 21);
		var iSlow61 = (((fSlow7 + (21 * fSlow10)) - 1.5) & 4095);
		var iSlow62 = (fSlow1 > 23);
		var iSlow63 = (((fSlow7 + (23 * fSlow10)) - 1.5) & 4095);
		var iSlow64 = (fSlow1 > 25);
		var iSlow65 = (((fSlow7 + (25 * fSlow10)) - 1.5) & 4095);
		var iSlow66 = (fSlow1 > 27);
		var iSlow67 = (((fSlow7 + (27 * fSlow10)) - 1.5) & 4095);
		var iSlow68 = (fSlow1 > 29);
		var iSlow69 = (((fSlow7 + (29 * fSlow10)) - 1.5) & 4095);
		var iSlow70 = (fSlow1 > 31);
		var iSlow71 = (((fSlow7 + (31 * fSlow10)) - 1.5) & 4095);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iRec1[0] = (12345 + (1103515245 * this.iRec1[1]));
			this.fVec0[0] = fSlow5;
			this.fRec2[0] = ((this.fRec2[1] + ((fSlow5 - this.fVec0[1]) > 0)) - (fSlow6 * (this.fRec2[1] > 0)));
			var fTemp0 = (fSlow4 * (this.iRec1[0] * ((this.fRec2[0] > 0) + 1.52588e-05)));
			this.fVec1[(this.IOTA & 511)] = ((fSlow3 * (this.fRec0[1] + this.fRec0[2])) + fTemp0);
			this.fRec0[0] = this.fVec1[((this.IOTA - iSlow8) & 511)];
			this.fVec2[(this.IOTA & 2047)] = (fTemp0 + (fSlow3 * (this.fRec3[1] + this.fRec3[2])));
			this.fRec3[0] = this.fVec2[((this.IOTA - iSlow11) & 2047)];
			this.fVec3[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec4[1] + this.fRec4[2])));
			this.fRec4[0] = this.fVec3[((this.IOTA - iSlow13) & 4095)];
			this.fVec4[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec5[1] + this.fRec5[2])));
			this.fRec5[0] = this.fVec4[((this.IOTA - iSlow15) & 4095)];
			this.fVec5[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec6[1] + this.fRec6[2])));
			this.fRec6[0] = this.fVec5[((this.IOTA - iSlow17) & 4095)];
			this.fVec6[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec7[1] + this.fRec7[2])));
			this.fRec7[0] = this.fVec6[((this.IOTA - iSlow19) & 4095)];
			this.fVec7[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec8[1] + this.fRec8[2])));
			this.fRec8[0] = this.fVec7[((this.IOTA - iSlow21) & 4095)];
			this.fVec8[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec9[1] + this.fRec9[2])));
			this.fRec9[0] = this.fVec8[((this.IOTA - iSlow23) & 4095)];
			this.fVec9[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec10[1] + this.fRec10[2])));
			this.fRec10[0] = this.fVec9[((this.IOTA - iSlow25) & 4095)];
			this.fVec10[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec11[1] + this.fRec11[2])));
			this.fRec11[0] = this.fVec10[((this.IOTA - iSlow27) & 4095)];
			this.fVec11[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec12[1] + this.fRec12[2])));
			this.fRec12[0] = this.fVec11[((this.IOTA - iSlow29) & 4095)];
			this.fVec12[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec13[1] + this.fRec13[2])));
			this.fRec13[0] = this.fVec12[((this.IOTA - iSlow31) & 4095)];
			this.fVec13[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec14[1] + this.fRec14[2])));
			this.fRec14[0] = this.fVec13[((this.IOTA - iSlow33) & 4095)];
			this.fVec14[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec15[1] + this.fRec15[2])));
			this.fRec15[0] = this.fVec14[((this.IOTA - iSlow35) & 4095)];
			this.fVec15[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec16[1] + this.fRec16[2])));
			this.fRec16[0] = this.fVec15[((this.IOTA - iSlow37) & 4095)];
			this.fVec16[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec17[1] + this.fRec17[2])));
			this.fRec17[0] = this.fVec16[((this.IOTA - iSlow39) & 4095)];
			output0[i] = (fSlow0 * ((((((((((((((((iSlow2 * this.fRec0[0]) + (iSlow9 * this.fRec3[0])) + (iSlow12 * this.fRec4[0])) + (iSlow14 * this.fRec5[0])) + (iSlow16 * this.fRec6[0])) + (iSlow18 * this.fRec7[0])) + (iSlow20 * this.fRec8[0])) + (iSlow22 * this.fRec9[0])) + (iSlow24 * this.fRec10[0])) + (iSlow26 * this.fRec11[0])) + (iSlow28 * this.fRec12[0])) + (iSlow30 * this.fRec13[0])) + (iSlow32 * this.fRec14[0])) + (iSlow34 * this.fRec15[0])) + (iSlow36 * this.fRec16[0])) + (iSlow38 * this.fRec17[0])));
			this.fVec17[(this.IOTA & 1023)] = (fTemp0 + (fSlow3 * (this.fRec18[1] + this.fRec18[2])));
			this.fRec18[0] = this.fVec17[((this.IOTA - iSlow41) & 1023)];
			this.fVec18[(this.IOTA & 2047)] = (fTemp0 + (fSlow3 * (this.fRec19[1] + this.fRec19[2])));
			this.fRec19[0] = this.fVec18[((this.IOTA - iSlow43) & 2047)];
			this.fVec19[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec20[1] + this.fRec20[2])));
			this.fRec20[0] = this.fVec19[((this.IOTA - iSlow45) & 4095)];
			this.fVec20[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec21[1] + this.fRec21[2])));
			this.fRec21[0] = this.fVec20[((this.IOTA - iSlow47) & 4095)];
			this.fVec21[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec22[1] + this.fRec22[2])));
			this.fRec22[0] = this.fVec21[((this.IOTA - iSlow49) & 4095)];
			this.fVec22[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec23[1] + this.fRec23[2])));
			this.fRec23[0] = this.fVec22[((this.IOTA - iSlow51) & 4095)];
			this.fVec23[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec24[1] + this.fRec24[2])));
			this.fRec24[0] = this.fVec23[((this.IOTA - iSlow53) & 4095)];
			this.fVec24[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec25[1] + this.fRec25[2])));
			this.fRec25[0] = this.fVec24[((this.IOTA - iSlow55) & 4095)];
			this.fVec25[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec26[1] + this.fRec26[2])));
			this.fRec26[0] = this.fVec25[((this.IOTA - iSlow57) & 4095)];
			this.fVec26[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec27[1] + this.fRec27[2])));
			this.fRec27[0] = this.fVec26[((this.IOTA - iSlow59) & 4095)];
			this.fVec27[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec28[1] + this.fRec28[2])));
			this.fRec28[0] = this.fVec27[((this.IOTA - iSlow61) & 4095)];
			this.fVec28[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec29[1] + this.fRec29[2])));
			this.fRec29[0] = this.fVec28[((this.IOTA - iSlow63) & 4095)];
			this.fVec29[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec30[1] + this.fRec30[2])));
			this.fRec30[0] = this.fVec29[((this.IOTA - iSlow65) & 4095)];
			this.fVec30[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec31[1] + this.fRec31[2])));
			this.fRec31[0] = this.fVec30[((this.IOTA - iSlow67) & 4095)];
			this.fVec31[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec32[1] + this.fRec32[2])));
			this.fRec32[0] = this.fVec31[((this.IOTA - iSlow69) & 4095)];
			this.fVec32[(this.IOTA & 4095)] = (fTemp0 + (fSlow3 * (this.fRec33[1] + this.fRec33[2])));
			this.fRec33[0] = this.fVec32[((this.IOTA - iSlow71) & 4095)];
			output1[i] = (fSlow0 * ((((((((((((((((iSlow40 * this.fRec18[0]) + (iSlow42 * this.fRec19[0])) + (iSlow44 * this.fRec20[0])) + (iSlow46 * this.fRec21[0])) + (iSlow48 * this.fRec22[0])) + (iSlow50 * this.fRec23[0])) + (iSlow52 * this.fRec24[0])) + (iSlow54 * this.fRec25[0])) + (iSlow56 * this.fRec26[0])) + (iSlow58 * this.fRec27[0])) + (iSlow60 * this.fRec28[0])) + (iSlow62 * this.fRec29[0])) + (iSlow64 * this.fRec30[0])) + (iSlow66 * this.fRec31[0])) + (iSlow68 * this.fRec32[0])) + (iSlow70 * this.fRec33[0])));
			this.iRec1[1] = this.iRec1[0];
			this.fVec0[1] = this.fVec0[0];
			this.fRec2[1] = this.fRec2[0];
			this.IOTA = (this.IOTA + 1);
			this.fRec0[2] = this.fRec0[1];
			this.fRec0[1] = this.fRec0[0];
			this.fRec3[2] = this.fRec3[1];
			this.fRec3[1] = this.fRec3[0];
			this.fRec4[2] = this.fRec4[1];
			this.fRec4[1] = this.fRec4[0];
			this.fRec5[2] = this.fRec5[1];
			this.fRec5[1] = this.fRec5[0];
			this.fRec6[2] = this.fRec6[1];
			this.fRec6[1] = this.fRec6[0];
			this.fRec7[2] = this.fRec7[1];
			this.fRec7[1] = this.fRec7[0];
			this.fRec8[2] = this.fRec8[1];
			this.fRec8[1] = this.fRec8[0];
			this.fRec9[2] = this.fRec9[1];
			this.fRec9[1] = this.fRec9[0];
			this.fRec10[2] = this.fRec10[1];
			this.fRec10[1] = this.fRec10[0];
			this.fRec11[2] = this.fRec11[1];
			this.fRec11[1] = this.fRec11[0];
			this.fRec12[2] = this.fRec12[1];
			this.fRec12[1] = this.fRec12[0];
			this.fRec13[2] = this.fRec13[1];
			this.fRec13[1] = this.fRec13[0];
			this.fRec14[2] = this.fRec14[1];
			this.fRec14[1] = this.fRec14[0];
			this.fRec15[2] = this.fRec15[1];
			this.fRec15[1] = this.fRec15[0];
			this.fRec16[2] = this.fRec16[1];
			this.fRec16[1] = this.fRec16[0];
			this.fRec17[2] = this.fRec17[1];
			this.fRec17[1] = this.fRec17[0];
			this.fRec18[2] = this.fRec18[1];
			this.fRec18[1] = this.fRec18[0];
			this.fRec19[2] = this.fRec19[1];
			this.fRec19[1] = this.fRec19[0];
			this.fRec20[2] = this.fRec20[1];
			this.fRec20[1] = this.fRec20[0];
			this.fRec21[2] = this.fRec21[1];
			this.fRec21[1] = this.fRec21[0];
			this.fRec22[2] = this.fRec22[1];
			this.fRec22[1] = this.fRec22[0];
			this.fRec23[2] = this.fRec23[1];
			this.fRec23[1] = this.fRec23[0];
			this.fRec24[2] = this.fRec24[1];
			this.fRec24[1] = this.fRec24[0];
			this.fRec25[2] = this.fRec25[1];
			this.fRec25[1] = this.fRec25[0];
			this.fRec26[2] = this.fRec26[1];
			this.fRec26[1] = this.fRec26[0];
			this.fRec27[2] = this.fRec27[1];
			this.fRec27[1] = this.fRec27[0];
			this.fRec28[2] = this.fRec28[1];
			this.fRec28[1] = this.fRec28[0];
			this.fRec29[2] = this.fRec29[1];
			this.fRec29[1] = this.fRec29[0];
			this.fRec30[2] = this.fRec30[1];
			this.fRec30[1] = this.fRec30[0];
			this.fRec31[2] = this.fRec31[1];
			this.fRec31[1] = this.fRec31[0];
			this.fRec32[2] = this.fRec32[1];
			this.fRec32[1] = this.fRec32[0];
			this.fRec33[2] = this.fRec33[1];
			this.fRec33[1] = this.fRec33[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_karplus32 = function(obj) 
{
    function process_aux_karplus32(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_karplus32;
}

function create_karplus32(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new karplus32();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_karplus32(this);
    
    return this.processor;
}
//Virtual Analog Oscillator Guts------------------------------------------------
this.faustpower2_f = function(value) {
	return (value * value);
	
}
this.faustpower3_f = function(value) {
	return ((value * value) * value);
	
}
this.faustpower4_f = function(value) {
	return (((value * value) * value) * value);
	
}

function virtual_analog_oscillators() {
	
	this.fRec124 = new Float32Array(2);
	this.fRec125 = new Float32Array(3);
	this.fRec126 = new Float32Array(3);
	this.fRec127 = new Float32Array(3);
	this.fRec117 = new Float32Array(2);
	this.fRec118 = new Float32Array(3);
	this.fRec119 = new Float32Array(3);
	this.fRec120 = new Float32Array(3);
	this.fRec121 = new Float32Array(3);
	this.fRec122 = new Float32Array(3);
	this.fRec123 = new Float32Array(3);
	this.fRec110 = new Float32Array(2);
	this.fRec111 = new Float32Array(3);
	this.fRec112 = new Float32Array(3);
	this.fRec113 = new Float32Array(3);
	this.fRec114 = new Float32Array(3);
	this.fRec115 = new Float32Array(3);
	this.fRec116 = new Float32Array(3);
	this.fRec103 = new Float32Array(2);
	this.fRec104 = new Float32Array(3);
	this.fRec105 = new Float32Array(3);
	this.fRec106 = new Float32Array(3);
	this.fRec107 = new Float32Array(3);
	this.fRec108 = new Float32Array(3);
	this.fRec109 = new Float32Array(3);
	this.fRec96 = new Float32Array(2);
	this.fRec97 = new Float32Array(3);
	this.fRec98 = new Float32Array(3);
	this.fRec99 = new Float32Array(3);
	this.fRec100 = new Float32Array(3);
	this.fRec101 = new Float32Array(3);
	this.fRec102 = new Float32Array(3);
	this.fRec89 = new Float32Array(2);
	this.fRec90 = new Float32Array(3);
	this.fRec91 = new Float32Array(3);
	this.fRec92 = new Float32Array(3);
	this.fRec93 = new Float32Array(3);
	this.fRec94 = new Float32Array(3);
	this.fRec95 = new Float32Array(3);
	this.fRec82 = new Float32Array(2);
	this.fRec83 = new Float32Array(3);
	this.fRec84 = new Float32Array(3);
	this.fRec85 = new Float32Array(3);
	this.fRec86 = new Float32Array(3);
	this.fRec87 = new Float32Array(3);
	this.fRec88 = new Float32Array(3);
	this.fRec75 = new Float32Array(2);
	this.fRec76 = new Float32Array(3);
	this.fRec77 = new Float32Array(3);
	this.fRec78 = new Float32Array(3);
	this.fRec79 = new Float32Array(3);
	this.fRec80 = new Float32Array(3);
	this.fRec81 = new Float32Array(3);
	this.fRec68 = new Float32Array(2);
	this.fRec69 = new Float32Array(3);
	this.fRec70 = new Float32Array(3);
	this.fRec71 = new Float32Array(3);
	this.fRec72 = new Float32Array(3);
	this.fRec73 = new Float32Array(3);
	this.fRec74 = new Float32Array(3);
	this.fRec61 = new Float32Array(2);
	this.fRec62 = new Float32Array(3);
	this.fRec63 = new Float32Array(3);
	this.fRec64 = new Float32Array(3);
	this.fRec65 = new Float32Array(3);
	this.fRec66 = new Float32Array(3);
	this.fRec67 = new Float32Array(3);
	this.fRec54 = new Float32Array(2);
	this.fRec55 = new Float32Array(3);
	this.fRec56 = new Float32Array(3);
	this.fRec57 = new Float32Array(3);
	this.fRec58 = new Float32Array(3);
	this.fRec59 = new Float32Array(3);
	this.fRec60 = new Float32Array(3);
	this.fRec47 = new Float32Array(2);
	this.fRec48 = new Float32Array(3);
	this.fRec49 = new Float32Array(3);
	this.fRec50 = new Float32Array(3);
	this.fRec51 = new Float32Array(3);
	this.fRec52 = new Float32Array(3);
	this.fRec53 = new Float32Array(3);
	this.fRec40 = new Float32Array(2);
	this.fRec41 = new Float32Array(3);
	this.fRec42 = new Float32Array(3);
	this.fRec43 = new Float32Array(3);
	this.fRec44 = new Float32Array(3);
	this.fRec45 = new Float32Array(3);
	this.fRec46 = new Float32Array(3);
	this.fRec33 = new Float32Array(2);
	this.fRec34 = new Float32Array(3);
	this.fRec35 = new Float32Array(3);
	this.fRec36 = new Float32Array(3);
	this.fRec37 = new Float32Array(3);
	this.fRec38 = new Float32Array(3);
	this.fRec39 = new Float32Array(3);
	this.fRec0 = new Float32Array(2);
	this.fRec1 = new Float32Array(3);
	this.fRec2 = new Float32Array(3);
	this.fRec3 = new Float32Array(3);
	this.fRec30 = new Float32Array(2);
	this.fRec32 = new Float32Array(2);
	this.fRec27 = new Float32Array(2);
	this.fRec29 = new Float32Array(2);
	this.fRec25 = new Float32Array(3);
	this.fRec26 = new Float32Array(3);
	this.fRec5 = new Float32Array(2);
	this.fRec6 = new Float32Array(2);
	this.fRec7 = new Float32Array(2);
	this.fRec8 = new Float32Array(2);
	this.fRec9 = new Float32Array(2);
	this.fRec24 = new Float32Array(2);
	this.fRec22 = new Float32Array(4);
	this.iRec23 = new Int32Array(2);
	this.fVec19 = new Float32Array(4096);
	this.fVec18 = new Float32Array(2);
	this.fVec17 = new Float32Array(2);
	this.fVec16 = new Float32Array(4096);
	this.fVec15 = new Float32Array(2);
	this.fVec14 = new Float32Array(2);
	this.fRec21 = new Float32Array(2);
	this.fVec13 = new Float32Array(4096);
	this.fVec12 = new Float32Array(2);
	this.fVec11 = new Float32Array(2);
	this.fRec20 = new Float32Array(2);
	this.fRec19 = new Float32Array(2);
	this.fRec18 = new Float32Array(2);
	this.fVec10 = new Float32Array(2);
	this.fRec17 = new Float32Array(2);
	this.fVec9 = new Float32Array(2);
	this.fRec16 = new Float32Array(2);
	this.fVec8 = new Float32Array(2);
	this.fRec15 = new Float32Array(2);
	this.fVec7 = new Float32Array(4096);
	this.fVec6 = new Float32Array(2);
	this.fRec14 = new Float32Array(2);
	this.fVec5 = new Float32Array(4096);
	this.fVec4 = new Float32Array(2);
	this.fRec13 = new Float32Array(2);
	this.fVec3 = new Float32Array(4096);
	this.fVec2 = new Float32Array(2);
	this.fRec11 = new Float32Array(2);
	this.fRec12 = new Float32Array(2);
	this.fVec1 = new Float32Array(2);
	this.fRec10 = new Float32Array(2);
	this.fRec4 = new Float32Array(2);
	this.iVec0 = new Int32Array(3);
	this.fhslider0;
	this.fSamplingFreq;
	this.iConst0;
	this.fConst1;
	this.fhslider1;
	this.fConst2;
	this.fConst3;
	this.fConst4;
	this.fConst5;
	this.fConst6;
	this.fConst7;
	this.fConst8;
	this.fConst9;
	this.fConst10;
	this.fConst11;
	this.fConst12;
	this.fConst13;
	this.fcheckbox0;
	this.fhslider2;
	this.fcheckbox1;
	this.fvslider0;
	this.fhslider3;
	this.fConst14;
	this.fvslider1;
	this.fConst15;
	this.fvslider2;
	this.fhslider4;
	this.IOTA;
	this.fConst16;
	this.fvslider3;
	this.fvslider4;
	this.fvslider5;
	this.fConst17;
	this.fvslider6;
	this.fConst18;
	this.fvslider7;
	this.fcheckbox2;
	this.fvslider8;
	this.fvslider9;
	this.fConst19;
	this.fhslider5;
	this.fhslider6;
	this.fcheckbox3;
	this.fConst20;
	this.fConst21;
	this.fConst22;
	this.fConst23;
	this.fConst24;
	this.fConst25;
	this.fConst26;
	this.fConst27;
	this.fConst28;
	this.fConst29;
	this.fConst30;
	this.fvbargraph0;
	this.fConst31;
	this.fConst32;
	this.fConst33;
	this.fConst34;
	this.fConst35;
	this.fConst36;
	this.fConst37;
	this.fConst38;
	this.fConst39;
	this.fConst40;
	this.fConst41;
	this.fConst42;
	this.fConst43;
	this.fConst44;
	this.fConst45;
	this.fConst46;
	this.fConst47;
	this.fConst48;
	this.fConst49;
	this.fConst50;
	this.fConst51;
	this.fConst52;
	this.fConst53;
	this.fConst54;
	this.fConst55;
	this.fConst56;
	this.fConst57;
	this.fConst58;
	this.fConst59;
	this.fConst60;
	this.fConst61;
	this.fConst62;
	this.fConst63;
	this.fConst64;
	this.fConst65;
	this.fConst66;
	this.fConst67;
	this.fConst68;
	this.fvbargraph1;
	this.fConst69;
	this.fConst70;
	this.fConst71;
	this.fConst72;
	this.fConst73;
	this.fConst74;
	this.fConst75;
	this.fConst76;
	this.fConst77;
	this.fConst78;
	this.fConst79;
	this.fConst80;
	this.fConst81;
	this.fConst82;
	this.fConst83;
	this.fConst84;
	this.fConst85;
	this.fConst86;
	this.fConst87;
	this.fConst88;
	this.fConst89;
	this.fConst90;
	this.fConst91;
	this.fConst92;
	this.fConst93;
	this.fConst94;
	this.fConst95;
	this.fConst96;
	this.fConst97;
	this.fConst98;
	this.fConst99;
	this.fConst100;
	this.fConst101;
	this.fConst102;
	this.fConst103;
	this.fConst104;
	this.fConst105;
	this.fConst106;
	this.fvbargraph2;
	this.fConst107;
	this.fConst108;
	this.fConst109;
	this.fConst110;
	this.fConst111;
	this.fConst112;
	this.fConst113;
	this.fConst114;
	this.fConst115;
	this.fConst116;
	this.fConst117;
	this.fConst118;
	this.fConst119;
	this.fConst120;
	this.fConst121;
	this.fConst122;
	this.fConst123;
	this.fConst124;
	this.fConst125;
	this.fConst126;
	this.fConst127;
	this.fConst128;
	this.fConst129;
	this.fConst130;
	this.fConst131;
	this.fConst132;
	this.fConst133;
	this.fConst134;
	this.fConst135;
	this.fConst136;
	this.fConst137;
	this.fConst138;
	this.fConst139;
	this.fConst140;
	this.fConst141;
	this.fConst142;
	this.fConst143;
	this.fConst144;
	this.fvbargraph3;
	this.fConst145;
	this.fConst146;
	this.fConst147;
	this.fConst148;
	this.fConst149;
	this.fConst150;
	this.fConst151;
	this.fConst152;
	this.fConst153;
	this.fConst154;
	this.fConst155;
	this.fConst156;
	this.fConst157;
	this.fConst158;
	this.fConst159;
	this.fConst160;
	this.fConst161;
	this.fConst162;
	this.fConst163;
	this.fConst164;
	this.fConst165;
	this.fConst166;
	this.fConst167;
	this.fConst168;
	this.fConst169;
	this.fConst170;
	this.fConst171;
	this.fConst172;
	this.fConst173;
	this.fConst174;
	this.fConst175;
	this.fConst176;
	this.fConst177;
	this.fConst178;
	this.fConst179;
	this.fConst180;
	this.fConst181;
	this.fConst182;
	this.fvbargraph4;
	this.fConst183;
	this.fConst184;
	this.fConst185;
	this.fConst186;
	this.fConst187;
	this.fConst188;
	this.fConst189;
	this.fConst190;
	this.fConst191;
	this.fConst192;
	this.fConst193;
	this.fConst194;
	this.fConst195;
	this.fConst196;
	this.fConst197;
	this.fConst198;
	this.fConst199;
	this.fConst200;
	this.fConst201;
	this.fConst202;
	this.fConst203;
	this.fConst204;
	this.fConst205;
	this.fConst206;
	this.fConst207;
	this.fConst208;
	this.fConst209;
	this.fConst210;
	this.fConst211;
	this.fConst212;
	this.fConst213;
	this.fConst214;
	this.fConst215;
	this.fConst216;
	this.fConst217;
	this.fConst218;
	this.fConst219;
	this.fConst220;
	this.fvbargraph5;
	this.fConst221;
	this.fConst222;
	this.fConst223;
	this.fConst224;
	this.fConst225;
	this.fConst226;
	this.fConst227;
	this.fConst228;
	this.fConst229;
	this.fConst230;
	this.fConst231;
	this.fConst232;
	this.fConst233;
	this.fConst234;
	this.fConst235;
	this.fConst236;
	this.fConst237;
	this.fConst238;
	this.fConst239;
	this.fConst240;
	this.fConst241;
	this.fConst242;
	this.fConst243;
	this.fConst244;
	this.fConst245;
	this.fConst246;
	this.fConst247;
	this.fConst248;
	this.fConst249;
	this.fConst250;
	this.fConst251;
	this.fConst252;
	this.fConst253;
	this.fConst254;
	this.fConst255;
	this.fConst256;
	this.fConst257;
	this.fConst258;
	this.fvbargraph6;
	this.fConst259;
	this.fConst260;
	this.fConst261;
	this.fConst262;
	this.fConst263;
	this.fConst264;
	this.fConst265;
	this.fConst266;
	this.fConst267;
	this.fConst268;
	this.fConst269;
	this.fConst270;
	this.fConst271;
	this.fConst272;
	this.fConst273;
	this.fConst274;
	this.fConst275;
	this.fConst276;
	this.fConst277;
	this.fConst278;
	this.fConst279;
	this.fConst280;
	this.fConst281;
	this.fConst282;
	this.fConst283;
	this.fConst284;
	this.fConst285;
	this.fConst286;
	this.fConst287;
	this.fConst288;
	this.fConst289;
	this.fConst290;
	this.fConst291;
	this.fConst292;
	this.fConst293;
	this.fConst294;
	this.fConst295;
	this.fConst296;
	this.fvbargraph7;
	this.fConst297;
	this.fConst298;
	this.fConst299;
	this.fConst300;
	this.fConst301;
	this.fConst302;
	this.fConst303;
	this.fConst304;
	this.fConst305;
	this.fConst306;
	this.fConst307;
	this.fConst308;
	this.fConst309;
	this.fConst310;
	this.fConst311;
	this.fConst312;
	this.fConst313;
	this.fConst314;
	this.fConst315;
	this.fConst316;
	this.fConst317;
	this.fConst318;
	this.fConst319;
	this.fConst320;
	this.fConst321;
	this.fConst322;
	this.fConst323;
	this.fConst324;
	this.fConst325;
	this.fConst326;
	this.fConst327;
	this.fConst328;
	this.fConst329;
	this.fConst330;
	this.fConst331;
	this.fConst332;
	this.fConst333;
	this.fConst334;
	this.fvbargraph8;
	this.fConst335;
	this.fConst336;
	this.fConst337;
	this.fConst338;
	this.fConst339;
	this.fConst340;
	this.fConst341;
	this.fConst342;
	this.fConst343;
	this.fConst344;
	this.fConst345;
	this.fConst346;
	this.fConst347;
	this.fConst348;
	this.fConst349;
	this.fConst350;
	this.fConst351;
	this.fConst352;
	this.fConst353;
	this.fConst354;
	this.fConst355;
	this.fConst356;
	this.fConst357;
	this.fConst358;
	this.fConst359;
	this.fConst360;
	this.fConst361;
	this.fConst362;
	this.fConst363;
	this.fConst364;
	this.fConst365;
	this.fConst366;
	this.fConst367;
	this.fConst368;
	this.fConst369;
	this.fConst370;
	this.fConst371;
	this.fConst372;
	this.fvbargraph9;
	this.fConst373;
	this.fConst374;
	this.fConst375;
	this.fConst376;
	this.fConst377;
	this.fConst378;
	this.fConst379;
	this.fConst380;
	this.fConst381;
	this.fConst382;
	this.fConst383;
	this.fConst384;
	this.fConst385;
	this.fConst386;
	this.fConst387;
	this.fConst388;
	this.fConst389;
	this.fConst390;
	this.fConst391;
	this.fConst392;
	this.fConst393;
	this.fConst394;
	this.fConst395;
	this.fConst396;
	this.fConst397;
	this.fConst398;
	this.fConst399;
	this.fConst400;
	this.fConst401;
	this.fConst402;
	this.fConst403;
	this.fConst404;
	this.fConst405;
	this.fConst406;
	this.fConst407;
	this.fConst408;
	this.fConst409;
	this.fConst410;
	this.fvbargraph10;
	this.fConst411;
	this.fConst412;
	this.fConst413;
	this.fConst414;
	this.fConst415;
	this.fConst416;
	this.fConst417;
	this.fConst418;
	this.fConst419;
	this.fConst420;
	this.fConst421;
	this.fConst422;
	this.fConst423;
	this.fConst424;
	this.fConst425;
	this.fConst426;
	this.fConst427;
	this.fConst428;
	this.fConst429;
	this.fConst430;
	this.fConst431;
	this.fConst432;
	this.fConst433;
	this.fConst434;
	this.fConst435;
	this.fConst436;
	this.fConst437;
	this.fConst438;
	this.fConst439;
	this.fConst440;
	this.fConst441;
	this.fConst442;
	this.fConst443;
	this.fConst444;
	this.fConst445;
	this.fConst446;
	this.fConst447;
	this.fConst448;
	this.fvbargraph11;
	this.fConst449;
	this.fConst450;
	this.fConst451;
	this.fConst452;
	this.fConst453;
	this.fConst454;
	this.fConst455;
	this.fConst456;
	this.fConst457;
	this.fConst458;
	this.fConst459;
	this.fConst460;
	this.fConst461;
	this.fConst462;
	this.fConst463;
	this.fConst464;
	this.fConst465;
	this.fConst466;
	this.fConst467;
	this.fConst468;
	this.fConst469;
	this.fConst470;
	this.fConst471;
	this.fConst472;
	this.fConst473;
	this.fConst474;
	this.fConst475;
	this.fConst476;
	this.fConst477;
	this.fConst478;
	this.fConst479;
	this.fConst480;
	this.fConst481;
	this.fConst482;
	this.fConst483;
	this.fConst484;
	this.fConst485;
	this.fConst486;
	this.fvbargraph12;
	this.fConst487;
	this.fConst488;
	this.fConst489;
	this.fConst490;
	this.fConst491;
	this.fConst492;
	this.fConst493;
	this.fConst494;
	this.fConst495;
	this.fConst496;
	this.fConst497;
	this.fConst498;
	this.fConst499;
	this.fConst500;
	this.fConst501;
	this.fConst502;
	this.fConst503;
	this.fConst504;
	this.fConst505;
	this.fConst506;
	this.fConst507;
	this.fConst508;
	this.fConst509;
	this.fConst510;
	this.fConst511;
	this.fConst512;
	this.fConst513;
	this.fConst514;
	this.fConst515;
	this.fConst516;
	this.fConst517;
	this.fConst518;
	this.fConst519;
	this.fConst520;
	this.fConst521;
	this.fConst522;
	this.fConst523;
	this.fConst524;
	this.fvbargraph13;
	this.fConst525;
	this.fConst526;
	this.fConst527;
	this.fConst528;
	this.fConst529;
	this.fConst530;
	this.fConst531;
	this.fConst532;
	this.fConst533;
	this.fConst534;
	this.fConst535;
	this.fConst536;
	this.fConst537;
	this.fConst538;
	this.fConst539;
	this.fConst540;
	this.fvbargraph14;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("effect.lib/author", "Julius O. Smith (jos at ccrma.stanford.edu)");
		m.declare("effect.lib/copyright", "Julius O. Smith III");
		m.declare("effect.lib/license", "STK-4.3");
		m.declare("effect.lib/name", "Faust Audio Effect Library");
		m.declare("effect.lib/version", "1.33");
		m.declare("filter.lib/author", "Julius O. Smith (jos at ccrma.stanford.edu)");
		m.declare("filter.lib/copyright", "Julius O. Smith III");
		m.declare("filter.lib/license", "STK-4.3");
		m.declare("filter.lib/name", "Faust Filter Library");
		m.declare("filter.lib/reference", "https://ccrma.stanford.edu/~jos/filters/");
		m.declare("filter.lib/version", "1.29");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("oscillator.lib/author", "Julius O. Smith (jos at ccrma.stanford.edu)");
		m.declare("oscillator.lib/copyright", "Julius O. Smith III");
		m.declare("oscillator.lib/license", "STK-4.3");
		m.declare("oscillator.lib/name", "Faust Oscillator Library");
		m.declare("oscillator.lib/version", "1.11");
	}

	this.getNumInputs = function() {
		return 1;
		
	}
	this.getNumOutputs = function() {
		return 2;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 50;
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.iVec0[i] = 0;
			
		}
		this.iConst0 = Math.min(192000, Math.max(1, this.fSamplingFreq));
		this.fConst1 = (1 / this.iConst0);
		this.fhslider1 = 0.1;
		this.fConst2 = Math.tan((31415.9 / this.iConst0));
		this.fConst3 = (1 / this.fConst2);
		this.fConst4 = (1 / (0.93514 + ((this.fConst3 + 0.157482) / this.fConst2)));
		this.fConst5 = faustpower2_f(this.fConst2);
		this.fConst6 = (50.0638 / this.fConst5);
		this.fConst7 = (0.93514 + this.fConst6);
		this.fConst8 = (1 / (1.45007 + ((this.fConst3 + 0.74313) / this.fConst2)));
		this.fConst9 = (11.0521 / this.fConst5);
		this.fConst10 = (1.45007 + this.fConst9);
		this.fConst11 = (1 / (4.07678 + ((3.18973 + this.fConst3) / this.fConst2)));
		this.fConst12 = (0.00176617 / this.fConst5);
		this.fConst13 = (2 * (0.000407678 - this.fConst12));
		this.fcheckbox0 = 0;
		this.fhslider2 = 5;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec4[i] = 0;
			
		}
		this.fcheckbox1 = 0;
		this.fvslider0 = 0;
		this.fhslider3 = -20;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec10[i] = 0;
			
		}
		this.fConst14 = this.iConst0;
		this.fvslider1 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec1[i] = 0;
			
		}
		this.fConst15 = (1 / this.fConst14);
		this.fvslider2 = 0.1;
		this.fhslider4 = 49;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec12[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec11[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec2[i] = 0;
			
		}
		this.IOTA = 0;
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec3[i] = 0;
			
		}
		this.fConst16 = (0.5 * this.fConst14);
		this.fvslider3 = -0.1;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec13[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec4[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec5[i] = 0;
			
		}
		this.fvslider4 = 0.1;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec14[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec6[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec7[i] = 0;
			
		}
		this.fvslider5 = 1;
		this.fConst17 = (2 / this.fConst14);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec15[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec8[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec16[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec9[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec17[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec10[i] = 0;
			
		}
		this.fvslider6 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec18[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec19[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec20[i] = 0;
			
		}
		this.fConst18 = (0.333333 * this.fConst14);
		this.fvslider7 = 0;
		this.fcheckbox2 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec11[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec12[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec13[i] = 0;
			
		}
		this.fvslider8 = 0.5;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec21[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec14[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec15[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec16[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec17[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec18[i] = 0;
			
		}
		for (var i = 0; (i < 4096); i = (i + 1)) {
			this.fVec19[i] = 0;
			
		}
		this.fvslider9 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec23[i] = 0;
			
		}
		for (var i = 0; (i < 4); i = (i + 1)) {
			this.fRec22[i] = 0;
			
		}
		this.fConst19 = (6.28319 / this.iConst0);
		this.fhslider5 = 25;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec24[i] = 0;
			
		}
		this.fhslider6 = 0.9;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec9[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec8[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec7[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec6[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec5[i] = 0;
			
		}
		this.fcheckbox3 = 0;
		this.fConst20 = (3.14159 / this.iConst0);
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec26[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec25[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec29[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec27[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec32[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec30[i] = 0;
			
		}
		this.fConst21 = (4.07678 + ((this.fConst3 - 3.18973) / this.fConst2));
		this.fConst22 = (1 / this.fConst5);
		this.fConst23 = (2 * (4.07678 - this.fConst22));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec3[i] = 0;
			
		}
		this.fConst24 = (0.000407678 + this.fConst12);
		this.fConst25 = (1.45007 + ((this.fConst3 - 0.74313) / this.fConst2));
		this.fConst26 = (2 * (1.45007 - this.fConst22));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		this.fConst27 = (2 * (1.45007 - this.fConst9));
		this.fConst28 = (0.93514 + ((this.fConst3 - 0.157482) / this.fConst2));
		this.fConst29 = (2 * (0.93514 - this.fConst22));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec1[i] = 0;
			
		}
		this.fConst30 = (2 * (0.93514 - this.fConst6));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		this.fConst31 = Math.tan((19790.8 / this.iConst0));
		this.fConst32 = (1 / this.fConst31);
		this.fConst33 = (1 / (0.93514 + ((0.157482 + this.fConst32) / this.fConst31)));
		this.fConst34 = faustpower2_f(this.fConst31);
		this.fConst35 = (50.0638 / this.fConst34);
		this.fConst36 = (0.93514 + this.fConst35);
		this.fConst37 = (1 / (1.45007 + ((0.74313 + this.fConst32) / this.fConst31)));
		this.fConst38 = (11.0521 / this.fConst34);
		this.fConst39 = (1.45007 + this.fConst38);
		this.fConst40 = (1 / (4.07678 + ((3.18973 + this.fConst32) / this.fConst31)));
		this.fConst41 = (0.00176617 / this.fConst34);
		this.fConst42 = (0.000407678 + this.fConst41);
		this.fConst43 = (1 / (1.06936 + ((0.168405 + this.fConst3) / this.fConst2)));
		this.fConst44 = (53.5362 + this.fConst22);
		this.fConst45 = (1 / (0.689621 + ((0.512479 + this.fConst3) / this.fConst2)));
		this.fConst46 = (7.62173 + this.fConst22);
		this.fConst47 = (1 / (0.245292 + ((0.782413 + this.fConst3) / this.fConst2)));
		this.fConst48 = (0.0001 / this.fConst5);
		this.fConst49 = (0.000433227 + this.fConst48);
		this.fConst50 = (0.245292 + ((this.fConst3 - 0.782413) / this.fConst2));
		this.fConst51 = (2 * (0.245292 - this.fConst22));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec39[i] = 0;
			
		}
		this.fConst52 = (2 * (0.000433227 - this.fConst48));
		this.fConst53 = (0.689621 + ((this.fConst3 - 0.512479) / this.fConst2));
		this.fConst54 = (2 * (0.689621 - this.fConst22));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec38[i] = 0;
			
		}
		this.fConst55 = (2 * (7.62173 - this.fConst22));
		this.fConst56 = (1.06936 + ((this.fConst3 - 0.168405) / this.fConst2));
		this.fConst57 = (2 * (1.06936 - this.fConst22));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec37[i] = 0;
			
		}
		this.fConst58 = (2 * (53.5362 - this.fConst22));
		this.fConst59 = (4.07678 + ((this.fConst32 - 3.18973) / this.fConst31));
		this.fConst60 = (1 / this.fConst34);
		this.fConst61 = (2 * (4.07678 - this.fConst60));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec36[i] = 0;
			
		}
		this.fConst62 = (2 * (0.000407678 - this.fConst41));
		this.fConst63 = (1.45007 + ((this.fConst32 - 0.74313) / this.fConst31));
		this.fConst64 = (2 * (1.45007 - this.fConst60));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec35[i] = 0;
			
		}
		this.fConst65 = (2 * (1.45007 - this.fConst38));
		this.fConst66 = (0.93514 + ((this.fConst32 - 0.157482) / this.fConst31));
		this.fConst67 = (2 * (0.93514 - this.fConst60));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec34[i] = 0;
			
		}
		this.fConst68 = (2 * (0.93514 - this.fConst35));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec33[i] = 0;
			
		}
		this.fConst69 = Math.tan((12467.4 / this.iConst0));
		this.fConst70 = (1 / this.fConst69);
		this.fConst71 = (1 / (0.93514 + ((0.157482 + this.fConst70) / this.fConst69)));
		this.fConst72 = faustpower2_f(this.fConst69);
		this.fConst73 = (50.0638 / this.fConst72);
		this.fConst74 = (0.93514 + this.fConst73);
		this.fConst75 = (1 / (1.45007 + ((0.74313 + this.fConst70) / this.fConst69)));
		this.fConst76 = (11.0521 / this.fConst72);
		this.fConst77 = (1.45007 + this.fConst76);
		this.fConst78 = (1 / (4.07678 + ((3.18973 + this.fConst70) / this.fConst69)));
		this.fConst79 = (0.00176617 / this.fConst72);
		this.fConst80 = (0.000407678 + this.fConst79);
		this.fConst81 = (1 / (1.06936 + ((0.168405 + this.fConst32) / this.fConst31)));
		this.fConst82 = (53.5362 + this.fConst60);
		this.fConst83 = (1 / (0.689621 + ((0.512479 + this.fConst32) / this.fConst31)));
		this.fConst84 = (7.62173 + this.fConst60);
		this.fConst85 = (1 / (0.245292 + ((0.782413 + this.fConst32) / this.fConst31)));
		this.fConst86 = (0.0001 / this.fConst34);
		this.fConst87 = (0.000433227 + this.fConst86);
		this.fConst88 = (0.245292 + ((this.fConst32 - 0.782413) / this.fConst31));
		this.fConst89 = (2 * (0.245292 - this.fConst60));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec46[i] = 0;
			
		}
		this.fConst90 = (2 * (0.000433227 - this.fConst86));
		this.fConst91 = (0.689621 + ((this.fConst32 - 0.512479) / this.fConst31));
		this.fConst92 = (2 * (0.689621 - this.fConst60));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec45[i] = 0;
			
		}
		this.fConst93 = (2 * (7.62173 - this.fConst60));
		this.fConst94 = (1.06936 + ((this.fConst32 - 0.168405) / this.fConst31));
		this.fConst95 = (2 * (1.06936 - this.fConst60));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec44[i] = 0;
			
		}
		this.fConst96 = (2 * (53.5362 - this.fConst60));
		this.fConst97 = (4.07678 + ((this.fConst70 - 3.18973) / this.fConst69));
		this.fConst98 = (1 / this.fConst72);
		this.fConst99 = (2 * (4.07678 - this.fConst98));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec43[i] = 0;
			
		}
		this.fConst100 = (2 * (0.000407678 - this.fConst79));
		this.fConst101 = (1.45007 + ((this.fConst70 - 0.74313) / this.fConst69));
		this.fConst102 = (2 * (1.45007 - this.fConst98));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec42[i] = 0;
			
		}
		this.fConst103 = (2 * (1.45007 - this.fConst76));
		this.fConst104 = (0.93514 + ((this.fConst70 - 0.157482) / this.fConst69));
		this.fConst105 = (2 * (0.93514 - this.fConst98));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec41[i] = 0;
			
		}
		this.fConst106 = (2 * (0.93514 - this.fConst73));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec40[i] = 0;
			
		}
		this.fConst107 = Math.tan((7853.98 / this.iConst0));
		this.fConst108 = (1 / this.fConst107);
		this.fConst109 = (1 / (0.93514 + ((0.157482 + this.fConst108) / this.fConst107)));
		this.fConst110 = faustpower2_f(this.fConst107);
		this.fConst111 = (50.0638 / this.fConst110);
		this.fConst112 = (0.93514 + this.fConst111);
		this.fConst113 = (1 / (1.45007 + ((0.74313 + this.fConst108) / this.fConst107)));
		this.fConst114 = (11.0521 / this.fConst110);
		this.fConst115 = (1.45007 + this.fConst114);
		this.fConst116 = (1 / (4.07678 + ((3.18973 + this.fConst108) / this.fConst107)));
		this.fConst117 = (0.00176617 / this.fConst110);
		this.fConst118 = (0.000407678 + this.fConst117);
		this.fConst119 = (1 / (1.06936 + ((0.168405 + this.fConst70) / this.fConst69)));
		this.fConst120 = (53.5362 + this.fConst98);
		this.fConst121 = (1 / (0.689621 + ((0.512479 + this.fConst70) / this.fConst69)));
		this.fConst122 = (7.62173 + this.fConst98);
		this.fConst123 = (1 / (0.245292 + ((0.782413 + this.fConst70) / this.fConst69)));
		this.fConst124 = (0.0001 / this.fConst72);
		this.fConst125 = (0.000433227 + this.fConst124);
		this.fConst126 = (0.245292 + ((this.fConst70 - 0.782413) / this.fConst69));
		this.fConst127 = (2 * (0.245292 - this.fConst98));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec53[i] = 0;
			
		}
		this.fConst128 = (2 * (0.000433227 - this.fConst124));
		this.fConst129 = (0.689621 + ((this.fConst70 - 0.512479) / this.fConst69));
		this.fConst130 = (2 * (0.689621 - this.fConst98));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec52[i] = 0;
			
		}
		this.fConst131 = (2 * (7.62173 - this.fConst98));
		this.fConst132 = (1.06936 + ((this.fConst70 - 0.168405) / this.fConst69));
		this.fConst133 = (2 * (1.06936 - this.fConst98));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec51[i] = 0;
			
		}
		this.fConst134 = (2 * (53.5362 - this.fConst98));
		this.fConst135 = (4.07678 + ((this.fConst108 - 3.18973) / this.fConst107));
		this.fConst136 = (1 / this.fConst110);
		this.fConst137 = (2 * (4.07678 - this.fConst136));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec50[i] = 0;
			
		}
		this.fConst138 = (2 * (0.000407678 - this.fConst117));
		this.fConst139 = (1.45007 + ((this.fConst108 - 0.74313) / this.fConst107));
		this.fConst140 = (2 * (1.45007 - this.fConst136));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec49[i] = 0;
			
		}
		this.fConst141 = (2 * (1.45007 - this.fConst114));
		this.fConst142 = (0.93514 + ((this.fConst108 - 0.157482) / this.fConst107));
		this.fConst143 = (2 * (0.93514 - this.fConst136));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec48[i] = 0;
			
		}
		this.fConst144 = (2 * (0.93514 - this.fConst111));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec47[i] = 0;
			
		}
		this.fConst145 = Math.tan((4947.7 / this.iConst0));
		this.fConst146 = (1 / this.fConst145);
		this.fConst147 = (1 / (0.93514 + ((0.157482 + this.fConst146) / this.fConst145)));
		this.fConst148 = faustpower2_f(this.fConst145);
		this.fConst149 = (50.0638 / this.fConst148);
		this.fConst150 = (0.93514 + this.fConst149);
		this.fConst151 = (1 / (1.45007 + ((0.74313 + this.fConst146) / this.fConst145)));
		this.fConst152 = (11.0521 / this.fConst148);
		this.fConst153 = (1.45007 + this.fConst152);
		this.fConst154 = (1 / (4.07678 + ((3.18973 + this.fConst146) / this.fConst145)));
		this.fConst155 = (0.00176617 / this.fConst148);
		this.fConst156 = (0.000407678 + this.fConst155);
		this.fConst157 = (1 / (1.06936 + ((0.168405 + this.fConst108) / this.fConst107)));
		this.fConst158 = (53.5362 + this.fConst136);
		this.fConst159 = (1 / (0.689621 + ((0.512479 + this.fConst108) / this.fConst107)));
		this.fConst160 = (7.62173 + this.fConst136);
		this.fConst161 = (1 / (0.245292 + ((0.782413 + this.fConst108) / this.fConst107)));
		this.fConst162 = (0.0001 / this.fConst110);
		this.fConst163 = (0.000433227 + this.fConst162);
		this.fConst164 = (0.245292 + ((this.fConst108 - 0.782413) / this.fConst107));
		this.fConst165 = (2 * (0.245292 - this.fConst136));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec60[i] = 0;
			
		}
		this.fConst166 = (2 * (0.000433227 - this.fConst162));
		this.fConst167 = (0.689621 + ((this.fConst108 - 0.512479) / this.fConst107));
		this.fConst168 = (2 * (0.689621 - this.fConst136));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec59[i] = 0;
			
		}
		this.fConst169 = (2 * (7.62173 - this.fConst136));
		this.fConst170 = (1.06936 + ((this.fConst108 - 0.168405) / this.fConst107));
		this.fConst171 = (2 * (1.06936 - this.fConst136));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec58[i] = 0;
			
		}
		this.fConst172 = (2 * (53.5362 - this.fConst136));
		this.fConst173 = (4.07678 + ((this.fConst146 - 3.18973) / this.fConst145));
		this.fConst174 = (1 / this.fConst148);
		this.fConst175 = (2 * (4.07678 - this.fConst174));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec57[i] = 0;
			
		}
		this.fConst176 = (2 * (0.000407678 - this.fConst155));
		this.fConst177 = (1.45007 + ((this.fConst146 - 0.74313) / this.fConst145));
		this.fConst178 = (2 * (1.45007 - this.fConst174));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec56[i] = 0;
			
		}
		this.fConst179 = (2 * (1.45007 - this.fConst152));
		this.fConst180 = (0.93514 + ((this.fConst146 - 0.157482) / this.fConst145));
		this.fConst181 = (2 * (0.93514 - this.fConst174));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec55[i] = 0;
			
		}
		this.fConst182 = (2 * (0.93514 - this.fConst149));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec54[i] = 0;
			
		}
		this.fConst183 = Math.tan((3116.85 / this.iConst0));
		this.fConst184 = (1 / this.fConst183);
		this.fConst185 = (1 / (0.93514 + ((0.157482 + this.fConst184) / this.fConst183)));
		this.fConst186 = faustpower2_f(this.fConst183);
		this.fConst187 = (50.0638 / this.fConst186);
		this.fConst188 = (0.93514 + this.fConst187);
		this.fConst189 = (1 / (1.45007 + ((0.74313 + this.fConst184) / this.fConst183)));
		this.fConst190 = (11.0521 / this.fConst186);
		this.fConst191 = (1.45007 + this.fConst190);
		this.fConst192 = (1 / (4.07678 + ((3.18973 + this.fConst184) / this.fConst183)));
		this.fConst193 = (0.00176617 / this.fConst186);
		this.fConst194 = (0.000407678 + this.fConst193);
		this.fConst195 = (1 / (1.06936 + ((0.168405 + this.fConst146) / this.fConst145)));
		this.fConst196 = (53.5362 + this.fConst174);
		this.fConst197 = (1 / (0.689621 + ((0.512479 + this.fConst146) / this.fConst145)));
		this.fConst198 = (7.62173 + this.fConst174);
		this.fConst199 = (1 / (0.245292 + ((0.782413 + this.fConst146) / this.fConst145)));
		this.fConst200 = (0.0001 / this.fConst148);
		this.fConst201 = (0.000433227 + this.fConst200);
		this.fConst202 = (0.245292 + ((this.fConst146 - 0.782413) / this.fConst145));
		this.fConst203 = (2 * (0.245292 - this.fConst174));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec67[i] = 0;
			
		}
		this.fConst204 = (2 * (0.000433227 - this.fConst200));
		this.fConst205 = (0.689621 + ((this.fConst146 - 0.512479) / this.fConst145));
		this.fConst206 = (2 * (0.689621 - this.fConst174));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec66[i] = 0;
			
		}
		this.fConst207 = (2 * (7.62173 - this.fConst174));
		this.fConst208 = (1.06936 + ((this.fConst146 - 0.168405) / this.fConst145));
		this.fConst209 = (2 * (1.06936 - this.fConst174));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec65[i] = 0;
			
		}
		this.fConst210 = (2 * (53.5362 - this.fConst174));
		this.fConst211 = (4.07678 + ((this.fConst184 - 3.18973) / this.fConst183));
		this.fConst212 = (1 / this.fConst186);
		this.fConst213 = (2 * (4.07678 - this.fConst212));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec64[i] = 0;
			
		}
		this.fConst214 = (2 * (0.000407678 - this.fConst193));
		this.fConst215 = (1.45007 + ((this.fConst184 - 0.74313) / this.fConst183));
		this.fConst216 = (2 * (1.45007 - this.fConst212));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec63[i] = 0;
			
		}
		this.fConst217 = (2 * (1.45007 - this.fConst190));
		this.fConst218 = (0.93514 + ((this.fConst184 - 0.157482) / this.fConst183));
		this.fConst219 = (2 * (0.93514 - this.fConst212));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec62[i] = 0;
			
		}
		this.fConst220 = (2 * (0.93514 - this.fConst187));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec61[i] = 0;
			
		}
		this.fConst221 = Math.tan((1963.5 / this.iConst0));
		this.fConst222 = (1 / this.fConst221);
		this.fConst223 = (1 / (0.93514 + ((0.157482 + this.fConst222) / this.fConst221)));
		this.fConst224 = faustpower2_f(this.fConst221);
		this.fConst225 = (50.0638 / this.fConst224);
		this.fConst226 = (0.93514 + this.fConst225);
		this.fConst227 = (1 / (1.45007 + ((0.74313 + this.fConst222) / this.fConst221)));
		this.fConst228 = (11.0521 / this.fConst224);
		this.fConst229 = (1.45007 + this.fConst228);
		this.fConst230 = (1 / (4.07678 + ((3.18973 + this.fConst222) / this.fConst221)));
		this.fConst231 = (0.00176617 / this.fConst224);
		this.fConst232 = (0.000407678 + this.fConst231);
		this.fConst233 = (1 / (1.06936 + ((0.168405 + this.fConst184) / this.fConst183)));
		this.fConst234 = (53.5362 + this.fConst212);
		this.fConst235 = (1 / (0.689621 + ((0.512479 + this.fConst184) / this.fConst183)));
		this.fConst236 = (7.62173 + this.fConst212);
		this.fConst237 = (1 / (0.245292 + ((0.782413 + this.fConst184) / this.fConst183)));
		this.fConst238 = (0.0001 / this.fConst186);
		this.fConst239 = (0.000433227 + this.fConst238);
		this.fConst240 = (0.245292 + ((this.fConst184 - 0.782413) / this.fConst183));
		this.fConst241 = (2 * (0.245292 - this.fConst212));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec74[i] = 0;
			
		}
		this.fConst242 = (2 * (0.000433227 - this.fConst238));
		this.fConst243 = (0.689621 + ((this.fConst184 - 0.512479) / this.fConst183));
		this.fConst244 = (2 * (0.689621 - this.fConst212));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec73[i] = 0;
			
		}
		this.fConst245 = (2 * (7.62173 - this.fConst212));
		this.fConst246 = (1.06936 + ((this.fConst184 - 0.168405) / this.fConst183));
		this.fConst247 = (2 * (1.06936 - this.fConst212));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec72[i] = 0;
			
		}
		this.fConst248 = (2 * (53.5362 - this.fConst212));
		this.fConst249 = (4.07678 + ((this.fConst222 - 3.18973) / this.fConst221));
		this.fConst250 = (1 / this.fConst224);
		this.fConst251 = (2 * (4.07678 - this.fConst250));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec71[i] = 0;
			
		}
		this.fConst252 = (2 * (0.000407678 - this.fConst231));
		this.fConst253 = (1.45007 + ((this.fConst222 - 0.74313) / this.fConst221));
		this.fConst254 = (2 * (1.45007 - this.fConst250));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec70[i] = 0;
			
		}
		this.fConst255 = (2 * (1.45007 - this.fConst228));
		this.fConst256 = (0.93514 + ((this.fConst222 - 0.157482) / this.fConst221));
		this.fConst257 = (2 * (0.93514 - this.fConst250));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec69[i] = 0;
			
		}
		this.fConst258 = (2 * (0.93514 - this.fConst225));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec68[i] = 0;
			
		}
		this.fConst259 = Math.tan((1236.92 / this.iConst0));
		this.fConst260 = (1 / this.fConst259);
		this.fConst261 = (1 / (0.93514 + ((0.157482 + this.fConst260) / this.fConst259)));
		this.fConst262 = faustpower2_f(this.fConst259);
		this.fConst263 = (50.0638 / this.fConst262);
		this.fConst264 = (0.93514 + this.fConst263);
		this.fConst265 = (1 / (1.45007 + ((0.74313 + this.fConst260) / this.fConst259)));
		this.fConst266 = (11.0521 / this.fConst262);
		this.fConst267 = (1.45007 + this.fConst266);
		this.fConst268 = (1 / (4.07678 + ((3.18973 + this.fConst260) / this.fConst259)));
		this.fConst269 = (0.00176617 / this.fConst262);
		this.fConst270 = (0.000407678 + this.fConst269);
		this.fConst271 = (1 / (1.06936 + ((0.168405 + this.fConst222) / this.fConst221)));
		this.fConst272 = (53.5362 + this.fConst250);
		this.fConst273 = (1 / (0.689621 + ((0.512479 + this.fConst222) / this.fConst221)));
		this.fConst274 = (7.62173 + this.fConst250);
		this.fConst275 = (1 / (0.245292 + ((0.782413 + this.fConst222) / this.fConst221)));
		this.fConst276 = (0.0001 / this.fConst224);
		this.fConst277 = (0.000433227 + this.fConst276);
		this.fConst278 = (0.245292 + ((this.fConst222 - 0.782413) / this.fConst221));
		this.fConst279 = (2 * (0.245292 - this.fConst250));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec81[i] = 0;
			
		}
		this.fConst280 = (2 * (0.000433227 - this.fConst276));
		this.fConst281 = (0.689621 + ((this.fConst222 - 0.512479) / this.fConst221));
		this.fConst282 = (2 * (0.689621 - this.fConst250));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec80[i] = 0;
			
		}
		this.fConst283 = (2 * (7.62173 - this.fConst250));
		this.fConst284 = (1.06936 + ((this.fConst222 - 0.168405) / this.fConst221));
		this.fConst285 = (2 * (1.06936 - this.fConst250));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec79[i] = 0;
			
		}
		this.fConst286 = (2 * (53.5362 - this.fConst250));
		this.fConst287 = (4.07678 + ((this.fConst260 - 3.18973) / this.fConst259));
		this.fConst288 = (1 / this.fConst262);
		this.fConst289 = (2 * (4.07678 - this.fConst288));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec78[i] = 0;
			
		}
		this.fConst290 = (2 * (0.000407678 - this.fConst269));
		this.fConst291 = (1.45007 + ((this.fConst260 - 0.74313) / this.fConst259));
		this.fConst292 = (2 * (1.45007 - this.fConst288));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec77[i] = 0;
			
		}
		this.fConst293 = (2 * (1.45007 - this.fConst266));
		this.fConst294 = (0.93514 + ((this.fConst260 - 0.157482) / this.fConst259));
		this.fConst295 = (2 * (0.93514 - this.fConst288));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec76[i] = 0;
			
		}
		this.fConst296 = (2 * (0.93514 - this.fConst263));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec75[i] = 0;
			
		}
		this.fConst297 = Math.tan((779.214 / this.iConst0));
		this.fConst298 = (1 / this.fConst297);
		this.fConst299 = (1 / (0.93514 + ((0.157482 + this.fConst298) / this.fConst297)));
		this.fConst300 = faustpower2_f(this.fConst297);
		this.fConst301 = (50.0638 / this.fConst300);
		this.fConst302 = (0.93514 + this.fConst301);
		this.fConst303 = (1 / (1.45007 + ((0.74313 + this.fConst298) / this.fConst297)));
		this.fConst304 = (11.0521 / this.fConst300);
		this.fConst305 = (1.45007 + this.fConst304);
		this.fConst306 = (1 / (4.07678 + ((3.18973 + this.fConst298) / this.fConst297)));
		this.fConst307 = (0.00176617 / this.fConst300);
		this.fConst308 = (0.000407678 + this.fConst307);
		this.fConst309 = (1 / (1.06936 + ((0.168405 + this.fConst260) / this.fConst259)));
		this.fConst310 = (53.5362 + this.fConst288);
		this.fConst311 = (1 / (0.689621 + ((0.512479 + this.fConst260) / this.fConst259)));
		this.fConst312 = (7.62173 + this.fConst288);
		this.fConst313 = (1 / (0.245292 + ((0.782413 + this.fConst260) / this.fConst259)));
		this.fConst314 = (0.0001 / this.fConst262);
		this.fConst315 = (0.000433227 + this.fConst314);
		this.fConst316 = (0.245292 + ((this.fConst260 - 0.782413) / this.fConst259));
		this.fConst317 = (2 * (0.245292 - this.fConst288));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec88[i] = 0;
			
		}
		this.fConst318 = (2 * (0.000433227 - this.fConst314));
		this.fConst319 = (0.689621 + ((this.fConst260 - 0.512479) / this.fConst259));
		this.fConst320 = (2 * (0.689621 - this.fConst288));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec87[i] = 0;
			
		}
		this.fConst321 = (2 * (7.62173 - this.fConst288));
		this.fConst322 = (1.06936 + ((this.fConst260 - 0.168405) / this.fConst259));
		this.fConst323 = (2 * (1.06936 - this.fConst288));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec86[i] = 0;
			
		}
		this.fConst324 = (2 * (53.5362 - this.fConst288));
		this.fConst325 = (4.07678 + ((this.fConst298 - 3.18973) / this.fConst297));
		this.fConst326 = (1 / this.fConst300);
		this.fConst327 = (2 * (4.07678 - this.fConst326));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec85[i] = 0;
			
		}
		this.fConst328 = (2 * (0.000407678 - this.fConst307));
		this.fConst329 = (1.45007 + ((this.fConst298 - 0.74313) / this.fConst297));
		this.fConst330 = (2 * (1.45007 - this.fConst326));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec84[i] = 0;
			
		}
		this.fConst331 = (2 * (1.45007 - this.fConst304));
		this.fConst332 = (0.93514 + ((this.fConst298 - 0.157482) / this.fConst297));
		this.fConst333 = (2 * (0.93514 - this.fConst326));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec83[i] = 0;
			
		}
		this.fConst334 = (2 * (0.93514 - this.fConst301));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec82[i] = 0;
			
		}
		this.fConst335 = Math.tan((490.874 / this.iConst0));
		this.fConst336 = (1 / this.fConst335);
		this.fConst337 = (1 / (0.93514 + ((0.157482 + this.fConst336) / this.fConst335)));
		this.fConst338 = faustpower2_f(this.fConst335);
		this.fConst339 = (50.0638 / this.fConst338);
		this.fConst340 = (0.93514 + this.fConst339);
		this.fConst341 = (1 / (1.45007 + ((0.74313 + this.fConst336) / this.fConst335)));
		this.fConst342 = (11.0521 / this.fConst338);
		this.fConst343 = (1.45007 + this.fConst342);
		this.fConst344 = (1 / (4.07678 + ((3.18973 + this.fConst336) / this.fConst335)));
		this.fConst345 = (0.00176617 / this.fConst338);
		this.fConst346 = (0.000407678 + this.fConst345);
		this.fConst347 = (1 / (1.06936 + ((0.168405 + this.fConst298) / this.fConst297)));
		this.fConst348 = (53.5362 + this.fConst326);
		this.fConst349 = (1 / (0.689621 + ((0.512479 + this.fConst298) / this.fConst297)));
		this.fConst350 = (7.62173 + this.fConst326);
		this.fConst351 = (1 / (0.245292 + ((0.782413 + this.fConst298) / this.fConst297)));
		this.fConst352 = (0.0001 / this.fConst300);
		this.fConst353 = (0.000433227 + this.fConst352);
		this.fConst354 = (0.245292 + ((this.fConst298 - 0.782413) / this.fConst297));
		this.fConst355 = (2 * (0.245292 - this.fConst326));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec95[i] = 0;
			
		}
		this.fConst356 = (2 * (0.000433227 - this.fConst352));
		this.fConst357 = (0.689621 + ((this.fConst298 - 0.512479) / this.fConst297));
		this.fConst358 = (2 * (0.689621 - this.fConst326));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec94[i] = 0;
			
		}
		this.fConst359 = (2 * (7.62173 - this.fConst326));
		this.fConst360 = (1.06936 + ((this.fConst298 - 0.168405) / this.fConst297));
		this.fConst361 = (2 * (1.06936 - this.fConst326));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec93[i] = 0;
			
		}
		this.fConst362 = (2 * (53.5362 - this.fConst326));
		this.fConst363 = (4.07678 + ((this.fConst336 - 3.18973) / this.fConst335));
		this.fConst364 = (1 / this.fConst338);
		this.fConst365 = (2 * (4.07678 - this.fConst364));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec92[i] = 0;
			
		}
		this.fConst366 = (2 * (0.000407678 - this.fConst345));
		this.fConst367 = (1.45007 + ((this.fConst336 - 0.74313) / this.fConst335));
		this.fConst368 = (2 * (1.45007 - this.fConst364));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec91[i] = 0;
			
		}
		this.fConst369 = (2 * (1.45007 - this.fConst342));
		this.fConst370 = (0.93514 + ((this.fConst336 - 0.157482) / this.fConst335));
		this.fConst371 = (2 * (0.93514 - this.fConst364));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec90[i] = 0;
			
		}
		this.fConst372 = (2 * (0.93514 - this.fConst339));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec89[i] = 0;
			
		}
		this.fConst373 = Math.tan((309.231 / this.iConst0));
		this.fConst374 = (1 / this.fConst373);
		this.fConst375 = (1 / (0.93514 + ((0.157482 + this.fConst374) / this.fConst373)));
		this.fConst376 = faustpower2_f(this.fConst373);
		this.fConst377 = (50.0638 / this.fConst376);
		this.fConst378 = (0.93514 + this.fConst377);
		this.fConst379 = (1 / (1.45007 + ((0.74313 + this.fConst374) / this.fConst373)));
		this.fConst380 = (11.0521 / this.fConst376);
		this.fConst381 = (1.45007 + this.fConst380);
		this.fConst382 = (1 / (4.07678 + ((3.18973 + this.fConst374) / this.fConst373)));
		this.fConst383 = (0.00176617 / this.fConst376);
		this.fConst384 = (0.000407678 + this.fConst383);
		this.fConst385 = (1 / (1.06936 + ((0.168405 + this.fConst336) / this.fConst335)));
		this.fConst386 = (53.5362 + this.fConst364);
		this.fConst387 = (1 / (0.689621 + ((0.512479 + this.fConst336) / this.fConst335)));
		this.fConst388 = (7.62173 + this.fConst364);
		this.fConst389 = (1 / (0.245292 + ((0.782413 + this.fConst336) / this.fConst335)));
		this.fConst390 = (0.0001 / this.fConst338);
		this.fConst391 = (0.000433227 + this.fConst390);
		this.fConst392 = (0.245292 + ((this.fConst336 - 0.782413) / this.fConst335));
		this.fConst393 = (2 * (0.245292 - this.fConst364));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec102[i] = 0;
			
		}
		this.fConst394 = (2 * (0.000433227 - this.fConst390));
		this.fConst395 = (0.689621 + ((this.fConst336 - 0.512479) / this.fConst335));
		this.fConst396 = (2 * (0.689621 - this.fConst364));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec101[i] = 0;
			
		}
		this.fConst397 = (2 * (7.62173 - this.fConst364));
		this.fConst398 = (1.06936 + ((this.fConst336 - 0.168405) / this.fConst335));
		this.fConst399 = (2 * (1.06936 - this.fConst364));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec100[i] = 0;
			
		}
		this.fConst400 = (2 * (53.5362 - this.fConst364));
		this.fConst401 = (4.07678 + ((this.fConst374 - 3.18973) / this.fConst373));
		this.fConst402 = (1 / this.fConst376);
		this.fConst403 = (2 * (4.07678 - this.fConst402));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec99[i] = 0;
			
		}
		this.fConst404 = (2 * (0.000407678 - this.fConst383));
		this.fConst405 = (1.45007 + ((this.fConst374 - 0.74313) / this.fConst373));
		this.fConst406 = (2 * (1.45007 - this.fConst402));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec98[i] = 0;
			
		}
		this.fConst407 = (2 * (1.45007 - this.fConst380));
		this.fConst408 = (0.93514 + ((this.fConst374 - 0.157482) / this.fConst373));
		this.fConst409 = (2 * (0.93514 - this.fConst402));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec97[i] = 0;
			
		}
		this.fConst410 = (2 * (0.93514 - this.fConst377));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec96[i] = 0;
			
		}
		this.fConst411 = Math.tan((194.803 / this.iConst0));
		this.fConst412 = (1 / this.fConst411);
		this.fConst413 = (1 / (0.93514 + ((0.157482 + this.fConst412) / this.fConst411)));
		this.fConst414 = faustpower2_f(this.fConst411);
		this.fConst415 = (50.0638 / this.fConst414);
		this.fConst416 = (0.93514 + this.fConst415);
		this.fConst417 = (1 / (1.45007 + ((0.74313 + this.fConst412) / this.fConst411)));
		this.fConst418 = (11.0521 / this.fConst414);
		this.fConst419 = (1.45007 + this.fConst418);
		this.fConst420 = (1 / (4.07678 + ((3.18973 + this.fConst412) / this.fConst411)));
		this.fConst421 = (0.00176617 / this.fConst414);
		this.fConst422 = (0.000407678 + this.fConst421);
		this.fConst423 = (1 / (1.06936 + ((0.168405 + this.fConst374) / this.fConst373)));
		this.fConst424 = (53.5362 + this.fConst402);
		this.fConst425 = (1 / (0.689621 + ((0.512479 + this.fConst374) / this.fConst373)));
		this.fConst426 = (7.62173 + this.fConst402);
		this.fConst427 = (1 / (0.245292 + ((0.782413 + this.fConst374) / this.fConst373)));
		this.fConst428 = (0.0001 / this.fConst376);
		this.fConst429 = (0.000433227 + this.fConst428);
		this.fConst430 = (0.245292 + ((this.fConst374 - 0.782413) / this.fConst373));
		this.fConst431 = (2 * (0.245292 - this.fConst402));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec109[i] = 0;
			
		}
		this.fConst432 = (2 * (0.000433227 - this.fConst428));
		this.fConst433 = (0.689621 + ((this.fConst374 - 0.512479) / this.fConst373));
		this.fConst434 = (2 * (0.689621 - this.fConst402));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec108[i] = 0;
			
		}
		this.fConst435 = (2 * (7.62173 - this.fConst402));
		this.fConst436 = (1.06936 + ((this.fConst374 - 0.168405) / this.fConst373));
		this.fConst437 = (2 * (1.06936 - this.fConst402));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec107[i] = 0;
			
		}
		this.fConst438 = (2 * (53.5362 - this.fConst402));
		this.fConst439 = (4.07678 + ((this.fConst412 - 3.18973) / this.fConst411));
		this.fConst440 = (1 / this.fConst414);
		this.fConst441 = (2 * (4.07678 - this.fConst440));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec106[i] = 0;
			
		}
		this.fConst442 = (2 * (0.000407678 - this.fConst421));
		this.fConst443 = (1.45007 + ((this.fConst412 - 0.74313) / this.fConst411));
		this.fConst444 = (2 * (1.45007 - this.fConst440));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec105[i] = 0;
			
		}
		this.fConst445 = (2 * (1.45007 - this.fConst418));
		this.fConst446 = (0.93514 + ((this.fConst412 - 0.157482) / this.fConst411));
		this.fConst447 = (2 * (0.93514 - this.fConst440));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec104[i] = 0;
			
		}
		this.fConst448 = (2 * (0.93514 - this.fConst415));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec103[i] = 0;
			
		}
		this.fConst449 = Math.tan((122.718 / this.iConst0));
		this.fConst450 = (1 / this.fConst449);
		this.fConst451 = (1 / (0.93514 + ((0.157482 + this.fConst450) / this.fConst449)));
		this.fConst452 = faustpower2_f(this.fConst449);
		this.fConst453 = (50.0638 / this.fConst452);
		this.fConst454 = (0.93514 + this.fConst453);
		this.fConst455 = (1 / (1.45007 + ((0.74313 + this.fConst450) / this.fConst449)));
		this.fConst456 = (11.0521 / this.fConst452);
		this.fConst457 = (1.45007 + this.fConst456);
		this.fConst458 = (1 / (4.07678 + ((3.18973 + this.fConst450) / this.fConst449)));
		this.fConst459 = (0.00176617 / this.fConst452);
		this.fConst460 = (0.000407678 + this.fConst459);
		this.fConst461 = (1 / (1.06936 + ((0.168405 + this.fConst412) / this.fConst411)));
		this.fConst462 = (53.5362 + this.fConst440);
		this.fConst463 = (1 / (0.689621 + ((0.512479 + this.fConst412) / this.fConst411)));
		this.fConst464 = (7.62173 + this.fConst440);
		this.fConst465 = (1 / (0.245292 + ((0.782413 + this.fConst412) / this.fConst411)));
		this.fConst466 = (0.0001 / this.fConst414);
		this.fConst467 = (0.000433227 + this.fConst466);
		this.fConst468 = (0.245292 + ((this.fConst412 - 0.782413) / this.fConst411));
		this.fConst469 = (2 * (0.245292 - this.fConst440));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec116[i] = 0;
			
		}
		this.fConst470 = (2 * (0.000433227 - this.fConst466));
		this.fConst471 = (0.689621 + ((this.fConst412 - 0.512479) / this.fConst411));
		this.fConst472 = (2 * (0.689621 - this.fConst440));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec115[i] = 0;
			
		}
		this.fConst473 = (2 * (7.62173 - this.fConst440));
		this.fConst474 = (1.06936 + ((this.fConst412 - 0.168405) / this.fConst411));
		this.fConst475 = (2 * (1.06936 - this.fConst440));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec114[i] = 0;
			
		}
		this.fConst476 = (2 * (53.5362 - this.fConst440));
		this.fConst477 = (4.07678 + ((this.fConst450 - 3.18973) / this.fConst449));
		this.fConst478 = (1 / this.fConst452);
		this.fConst479 = (2 * (4.07678 - this.fConst478));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec113[i] = 0;
			
		}
		this.fConst480 = (2 * (0.000407678 - this.fConst459));
		this.fConst481 = (1.45007 + ((this.fConst450 - 0.74313) / this.fConst449));
		this.fConst482 = (2 * (1.45007 - this.fConst478));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec112[i] = 0;
			
		}
		this.fConst483 = (2 * (1.45007 - this.fConst456));
		this.fConst484 = (0.93514 + ((this.fConst450 - 0.157482) / this.fConst449));
		this.fConst485 = (2 * (0.93514 - this.fConst478));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec111[i] = 0;
			
		}
		this.fConst486 = (2 * (0.93514 - this.fConst453));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec110[i] = 0;
			
		}
		this.fConst487 = Math.tan((77.3078 / this.iConst0));
		this.fConst488 = (1 / this.fConst487);
		this.fConst489 = (1 / (0.93514 + ((0.157482 + this.fConst488) / this.fConst487)));
		this.fConst490 = faustpower2_f(this.fConst487);
		this.fConst491 = (50.0638 / this.fConst490);
		this.fConst492 = (0.93514 + this.fConst491);
		this.fConst493 = (1 / (1.45007 + ((0.74313 + this.fConst488) / this.fConst487)));
		this.fConst494 = (11.0521 / this.fConst490);
		this.fConst495 = (1.45007 + this.fConst494);
		this.fConst496 = (1 / (4.07678 + ((3.18973 + this.fConst488) / this.fConst487)));
		this.fConst497 = (0.00176617 / this.fConst490);
		this.fConst498 = (0.000407678 + this.fConst497);
		this.fConst499 = (1 / (1.06936 + ((0.168405 + this.fConst450) / this.fConst449)));
		this.fConst500 = (53.5362 + this.fConst478);
		this.fConst501 = (1 / (0.689621 + ((0.512479 + this.fConst450) / this.fConst449)));
		this.fConst502 = (7.62173 + this.fConst478);
		this.fConst503 = (1 / (0.245292 + ((0.782413 + this.fConst450) / this.fConst449)));
		this.fConst504 = (0.0001 / this.fConst452);
		this.fConst505 = (0.000433227 + this.fConst504);
		this.fConst506 = (0.245292 + ((this.fConst450 - 0.782413) / this.fConst449));
		this.fConst507 = (2 * (0.245292 - this.fConst478));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec123[i] = 0;
			
		}
		this.fConst508 = (2 * (0.000433227 - this.fConst504));
		this.fConst509 = (0.689621 + ((this.fConst450 - 0.512479) / this.fConst449));
		this.fConst510 = (2 * (0.689621 - this.fConst478));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec122[i] = 0;
			
		}
		this.fConst511 = (2 * (7.62173 - this.fConst478));
		this.fConst512 = (1.06936 + ((this.fConst450 - 0.168405) / this.fConst449));
		this.fConst513 = (2 * (1.06936 - this.fConst478));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec121[i] = 0;
			
		}
		this.fConst514 = (2 * (53.5362 - this.fConst478));
		this.fConst515 = (4.07678 + ((this.fConst488 - 3.18973) / this.fConst487));
		this.fConst516 = (1 / this.fConst490);
		this.fConst517 = (2 * (4.07678 - this.fConst516));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec120[i] = 0;
			
		}
		this.fConst518 = (2 * (0.000407678 - this.fConst497));
		this.fConst519 = (1.45007 + ((this.fConst488 - 0.74313) / this.fConst487));
		this.fConst520 = (2 * (1.45007 - this.fConst516));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec119[i] = 0;
			
		}
		this.fConst521 = (2 * (1.45007 - this.fConst494));
		this.fConst522 = (0.93514 + ((this.fConst488 - 0.157482) / this.fConst487));
		this.fConst523 = (2 * (0.93514 - this.fConst516));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec118[i] = 0;
			
		}
		this.fConst524 = (2 * (0.93514 - this.fConst491));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec117[i] = 0;
			
		}
		this.fConst525 = (1 / (1.06936 + ((0.168405 + this.fConst488) / this.fConst487)));
		this.fConst526 = (53.5362 + this.fConst516);
		this.fConst527 = (1 / (0.689621 + ((0.512479 + this.fConst488) / this.fConst487)));
		this.fConst528 = (7.62173 + this.fConst516);
		this.fConst529 = (1 / (0.245292 + ((0.782413 + this.fConst488) / this.fConst487)));
		this.fConst530 = (0.0001 / this.fConst490);
		this.fConst531 = (0.000433227 + this.fConst530);
		this.fConst532 = (0.245292 + ((this.fConst488 - 0.782413) / this.fConst487));
		this.fConst533 = (2 * (0.245292 - this.fConst516));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec127[i] = 0;
			
		}
		this.fConst534 = (2 * (0.000433227 - this.fConst530));
		this.fConst535 = (0.689621 + ((this.fConst488 - 0.512479) / this.fConst487));
		this.fConst536 = (2 * (0.689621 - this.fConst516));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec126[i] = 0;
			
		}
		this.fConst537 = (2 * (7.62173 - this.fConst516));
		this.fConst538 = (1.06936 + ((this.fConst488 - 0.168405) / this.fConst487));
		this.fConst539 = (2 * (1.06936 - this.fConst516));
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec125[i] = 0;
			
		}
		this.fConst540 = (2 * (53.5362 - this.fConst516));
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec124[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("virtual_analog_oscillators");
		ui_interface.declare("0", "1", "");
		ui_interface.openVerticalBox("");
		ui_interface.declare("0", "0", "");
		ui_interface.declare("0", "tooltip", "See Faust's oscillator.lib for documentation and references");
		ui_interface.openVerticalBox("VIRTUAL ANALOG OSCILLATORS");
		ui_interface.declare("0", "0", "");
		ui_interface.openHorizontalBox("Signal Levels");
		ui_interface.declare("fvslider5", "0", "");
		ui_interface.declare("fvslider5", "style", "vslider");
		ui_interface.addVerticalSlider("Sawtooth", function handler(obj) { function setval(val) { obj.fvslider5 = val; } return setval; }(this), 1, 0, 1, 0.01);
		ui_interface.declare("0", "1", "");
		ui_interface.openVerticalBox("Pulse Train");
		ui_interface.declare("fcheckbox2", "0", "");
		ui_interface.declare("fcheckbox2", "tooltip", "When checked, use 3rd-order aliasing suppression (up from 2)      See if you can hear a difference with the freq high and swept");
		ui_interface.addCheckButton("Order 3", function handler(obj) { function setval(val) { obj.fcheckbox2 = val; } return setval; }(this));
		ui_interface.declare("fvslider7", "1", "");
		ui_interface.declare("fvslider7", "style", "vslider");
		ui_interface.addVerticalSlider("", function handler(obj) { function setval(val) { obj.fvslider7 = val; } return setval; }(this), 0, 0, 1, 0.01);
		ui_interface.declare("fvslider8", "2", "");
		ui_interface.declare("fvslider8", "style", "knob");
		ui_interface.addVerticalSlider("Duty Cycle", function handler(obj) { function setval(val) { obj.fvslider8 = val; } return setval; }(this), 0.5, 0, 1, 0.01);
		ui_interface.closeBox();
		ui_interface.declare("fvslider1", "2", "");
		ui_interface.declare("fvslider1", "style", "vslider");
		ui_interface.addVerticalSlider("Square", function handler(obj) { function setval(val) { obj.fvslider1 = val; } return setval; }(this), 0, 0, 1, 0.01);
		ui_interface.declare("fvslider6", "3", "");
		ui_interface.declare("fvslider6", "style", "vslider");
		ui_interface.addVerticalSlider("Triangle", function handler(obj) { function setval(val) { obj.fvslider6 = val; } return setval; }(this), 0, 0, 1, 0.01);
		ui_interface.declare("fvslider9", "4", "");
		ui_interface.declare("fvslider9", "style", "vslider");
		ui_interface.declare("fvslider9", "tooltip", "Pink Noise (or 1/f noise) is Constant-Q Noise, meaning that it has the same total power in every octave (uses only amplitude controls)");
		ui_interface.addVerticalSlider("Pink Noise", function handler(obj) { function setval(val) { obj.fvslider9 = val; } return setval; }(this), 0, 0, 1, 0.01);
		ui_interface.declare("fvslider0", "5", "");
		ui_interface.declare("fvslider0", "style", "vslider");
		ui_interface.addVerticalSlider("Ext Input", function handler(obj) { function setval(val) { obj.fvslider0 = val; } return setval; }(this), 0, 0, 1, 0.01);
		ui_interface.closeBox();
		ui_interface.declare("0", "1", "");
		ui_interface.openHorizontalBox("Signal Parameters");
		ui_interface.declare("0", "0", "");
		ui_interface.openVerticalBox("");
		ui_interface.declare("fhslider3", "1", "");
		ui_interface.declare("fhslider3", "style", "hslider");
		ui_interface.declare("fhslider3", "tooltip", "Sawtooth waveform amplitude");
		ui_interface.declare("fhslider3", "unit", "dB");
		ui_interface.addHorizontalSlider("Mix Amplitude", function handler(obj) { function setval(val) { obj.fhslider3 = val; } return setval; }(this), -20, -120, 10, 0.1);
		ui_interface.declare("fhslider4", "2", "");
		ui_interface.declare("fhslider4", "style", "hslider");
		ui_interface.declare("fhslider4", "tooltip", "Sawtooth frequency as a Piano Key (PK) number (A440 = key 49)");
		ui_interface.declare("fhslider4", "unit", "PK");
		ui_interface.addHorizontalSlider("Frequency", function handler(obj) { function setval(val) { obj.fhslider4 = val; } return setval; }(this), 49, 1, 88, 0.01);
		ui_interface.closeBox();
		ui_interface.declare("fvslider3", "3", "");
		ui_interface.declare("fvslider3", "style", "knob");
		ui_interface.declare("fvslider3", "tooltip", "Percentange frequency-shift up or down for second oscillator");
		ui_interface.declare("fvslider3", "unit", "%%");
		ui_interface.addVerticalSlider("Detuning 1", function handler(obj) { function setval(val) { obj.fvslider3 = val; } return setval; }(this), -0.1, -10, 10, 0.01);
		ui_interface.declare("fvslider4", "4", "");
		ui_interface.declare("fvslider4", "style", "knob");
		ui_interface.declare("fvslider4", "tooltip", "Percentange frequency-shift up or down for third detuned oscillator");
		ui_interface.declare("fvslider4", "unit", "%%");
		ui_interface.addVerticalSlider("Detuning 2", function handler(obj) { function setval(val) { obj.fvslider4 = val; } return setval; }(this), 0.1, -10, 10, 0.01);
		ui_interface.declare("fvslider2", "5", "");
		ui_interface.declare("fvslider2", "style", "knob");
		ui_interface.declare("fvslider2", "tooltip", "Portamento (frequency-glide) time-constant in seconds");
		ui_interface.declare("fvslider2", "unit", "sec");
		ui_interface.addVerticalSlider("Portamento", function handler(obj) { function setval(val) { obj.fvslider2 = val; } return setval; }(this), 0.1, 0.01, 1, 0.001);
		ui_interface.closeBox();
		ui_interface.closeBox();
		ui_interface.closeBox();
		ui_interface.declare("0", "2", "");
		ui_interface.openVerticalBox("");
		ui_interface.declare("0", "tooltip", "See Faust's effect.lib for info and references");
		ui_interface.openHorizontalBox("MOOG VCF (Voltage Controlled Filter)");
		ui_interface.declare("0", "0", "");
		ui_interface.openVerticalBox("");
		ui_interface.declare("0", "0", "");
		ui_interface.openHorizontalBox("");
		ui_interface.declare("fcheckbox0", "0", "");
		ui_interface.declare("fcheckbox0", "tooltip", "When this is checked, the Moog VCF has no effect");
		ui_interface.addCheckButton("Bypass", function handler(obj) { function setval(val) { obj.fcheckbox0 = val; } return setval; }(this));
		ui_interface.declare("fcheckbox1", "1", "");
		ui_interface.declare("fcheckbox1", "tooltip", "Select moog_vcf_2b (two-biquad) implementation, instead of the default moog_vcf (analog style) implementation");
		ui_interface.addCheckButton("Use Biquads", function handler(obj) { function setval(val) { obj.fcheckbox1 = val; } return setval; }(this));
		ui_interface.declare("fcheckbox3", "2", "");
		ui_interface.declare("fcheckbox3", "tooltip", "If using biquads, make them normalized ladders (moog_vcf_2bn)");
		ui_interface.addCheckButton("Normalized Ladders", function handler(obj) { function setval(val) { obj.fcheckbox3 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.declare("fhslider2", "1", "");
		ui_interface.declare("fhslider2", "tooltip", "output level in decibels");
		ui_interface.declare("fhslider2", "unit", "dB");
		ui_interface.addHorizontalSlider("VCF Output Level", function handler(obj) { function setval(val) { obj.fhslider2 = val; } return setval; }(this), 5, -60, 20, 0.1);
		ui_interface.closeBox();
		ui_interface.declare("fhslider5", "1", "");
		ui_interface.declare("fhslider5", "style", "knob");
		ui_interface.declare("fhslider5", "tooltip", "The VCF resonates at the corner frequency (specified in PianoKey (PK) units, with A440 = 49 PK).  The VCF response is flat below the corner frequency, and rolls off -24 dB per octave above.");
		ui_interface.declare("fhslider5", "unit", "PK");
		ui_interface.addHorizontalSlider("Corner Frequency", function handler(obj) { function setval(val) { obj.fhslider5 = val; } return setval; }(this), 25, 1, 88, 0.01);
		ui_interface.declare("fhslider6", "2", "");
		ui_interface.declare("fhslider6", "style", "knob");
		ui_interface.declare("fhslider6", "tooltip", "Amount of resonance near VCF corner frequency (specified between 0 and 1)");
		ui_interface.addHorizontalSlider("Corner Resonance", function handler(obj) { function setval(val) { obj.fhslider6 = val; } return setval; }(this), 0.9, 0, 1, 0.01);
		ui_interface.closeBox();
		ui_interface.closeBox();
		ui_interface.declare("0", "3", "");
		ui_interface.openVerticalBox("");
		ui_interface.declare("0", "0", "");
		ui_interface.declare("0", "tooltip", "See Faust's filter.lib for documentation and references");
		ui_interface.openHorizontalBox("CONSTANT-Q SPECTRUM ANALYZER (6E), 15 bands spanning LP, 19 octaves below 10000 Hz, HP");
		ui_interface.declare("fvbargraph14", "0", "");
		ui_interface.declare("fvbargraph14", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph14", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph14 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph13", "1", "");
		ui_interface.declare("fvbargraph13", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph13", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph13 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph12", "2", "");
		ui_interface.declare("fvbargraph12", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph12", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph12 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph11", "3", "");
		ui_interface.declare("fvbargraph11", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph11", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph11 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph10", "4", "");
		ui_interface.declare("fvbargraph10", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph10", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph10 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph9", "5", "");
		ui_interface.declare("fvbargraph9", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph9", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph9 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph8", "6", "");
		ui_interface.declare("fvbargraph8", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph8", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph8 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph7", "7", "");
		ui_interface.declare("fvbargraph7", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph7", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph7 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph6", "8", "");
		ui_interface.declare("fvbargraph6", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph6", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph6 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph5", "9", "");
		ui_interface.declare("fvbargraph5", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph5", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph5 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph4", "10", "");
		ui_interface.declare("fvbargraph4", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph4", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph4 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph3", "11", "");
		ui_interface.declare("fvbargraph3", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph3", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph3 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph2", "12", "");
		ui_interface.declare("fvbargraph2", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph2", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph2 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph1", "13", "");
		ui_interface.declare("fvbargraph1", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph1", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph1 = val; } return setval; }(this), -50, 10);
		ui_interface.declare("fvbargraph0", "14", "");
		ui_interface.declare("fvbargraph0", "tooltip", "Spectral Band Level in dB");
		ui_interface.declare("fvbargraph0", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph0 = val; } return setval; }(this), -50, 10);
		ui_interface.closeBox();
		ui_interface.declare("0", "1", "");
		ui_interface.openHorizontalBox("SPECTRUM ANALYZER CONTROLS");
		ui_interface.declare("fhslider1", "0", "");
		ui_interface.declare("fhslider1", "tooltip", "band-level averaging time in seconds");
		ui_interface.declare("fhslider1", "unit", "sec");
		ui_interface.addHorizontalSlider("Level Averaging Time", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 0.1, 0, 1, 0.01);
		ui_interface.declare("fhslider0", "1", "");
		ui_interface.declare("fhslider0", "tooltip", "Level offset in decibels");
		ui_interface.declare("fhslider0", "unit", "dB");
		ui_interface.addHorizontalSlider("Level dB Offset", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 50, 0, 100, 1);
		ui_interface.closeBox();
		ui_interface.closeBox();
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = this.fhslider0;
		var fSlow1 = Math.exp((0 - (this.fConst1 / this.fhslider1)));
		var fSlow2 = (1 - fSlow1);
		var iSlow3 = this.fcheckbox0;
		var fSlow4 = (0.001 * Math.pow(10, (0.05 * this.fhslider2)));
		var iSlow5 = this.fcheckbox1;
		var fSlow6 = this.fvslider0;
		var fSlow7 = (0.001 * Math.pow(10, (0.05 * this.fhslider3)));
		var fSlow8 = (this.fConst14 * this.fvslider1);
		var fSlow9 = Math.exp((0 - (this.fConst1 / this.fvslider2)));
		var fSlow10 = (440 * (Math.pow(2, (0.0833333 * (this.fhslider4 - 49))) * (1 - fSlow9)));
		var fSlow11 = (1 - (0.01 * this.fvslider3));
		var fSlow12 = (1 + (0.01 * this.fvslider4));
		var fSlow13 = (this.iConst0 * this.fvslider5);
		var fSlow14 = (1 / fSlow11);
		var fSlow15 = (this.fConst17 * fSlow11);
		var fSlow16 = (this.fConst14 / fSlow11);
		var fSlow17 = (1 / fSlow12);
		var fSlow18 = (this.fConst17 * fSlow12);
		var fSlow19 = (this.fConst14 / fSlow12);
		var fSlow20 = (0.0105409 * this.fvslider6);
		var fSlow21 = (this.fConst18 * this.fvslider7);
		var fSlow22 = this.fcheckbox2;
		var fSlow23 = (this.fConst14 * fSlow22);
		var fSlow24 = (0.01 * this.fvslider8);
		var fSlow25 = (1 - fSlow22);
		var fSlow26 = this.fvslider9;
		var fSlow27 = (0.44 * Math.pow(2, (0.0833333 * (this.fhslider5 - 49))));
		var fSlow28 = this.fhslider6;
		var fSlow29 = (0 - (4 * Math.max(0, Math.min(faustpower4_f(fSlow28), 0.999999))));
		var iSlow30 = this.fcheckbox3;
		var fSlow31 = Math.min(1.4128, (1.41421 * fSlow28));
		var fSlow32 = (1 + (fSlow31 * (1.41421 + fSlow31)));
		var fSlow33 = (1.41421 * fSlow31);
		var fSlow34 = (2 + fSlow33);
		var fSlow35 = (1 + (fSlow31 * (fSlow31 - 1.41421)));
		var fSlow36 = (2 - fSlow33);
		var fSlow37 = (1.998 * fSlow28);
		var fSlow38 = faustpower2_f((1.4128 * fSlow28));
		var fSlow39 = (1 + (fSlow37 + fSlow38));
		var fSlow40 = (2 + fSlow37);
		var fSlow41 = ((1 + fSlow38) - fSlow37);
		var fSlow42 = (2 - fSlow37);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iVec0[0] = 1;
			this.fRec4[0] = ((0.999 * this.fRec4[1]) + fSlow4);
			this.fRec10[0] = ((0.999 * this.fRec10[1]) + fSlow7);
			this.fVec1[0] = 0.25;
			this.fRec12[0] = ((fSlow9 * this.fRec12[1]) + fSlow10);
			var fTemp0 = Math.max(this.fRec12[0], 23.4489);
			var fTemp1 = fTemp0;
			this.fRec11[0] = function fmod(a, b) { return a % b; }((this.fRec11[1] + (this.fConst15 * fTemp1)), 1);
			var fTemp2 = (2 * this.fRec11[0]);
			var fTemp3 = (fTemp2 - 1);
			var fTemp4 = faustpower2_f(fTemp3);
			this.fVec2[0] = fTemp4;
			var fTemp5 = ((this.iVec0[1] * (fTemp4 - this.fVec2[1])) / fTemp1);
			this.fVec3[(this.IOTA & 4095)] = fTemp5;
			var fTemp6 = (0.25 * fTemp5);
			var fTemp7 = Math.max(0, Math.min(2047, (this.fConst16 / fTemp0)));
			var iTemp8 = fTemp7;
			var iTemp9 = (1 + iTemp8);
			var fTemp10 = ((fTemp6 - (0.25 * (this.fVec3[((this.IOTA - iTemp8) & 4095)] * (iTemp9 - fTemp7)))) - (0.25 * ((fTemp7 - iTemp8) * this.fVec3[((this.IOTA - iTemp9) & 4095)])));
			var fTemp11 = Math.max((fSlow11 * this.fRec12[0]), 23.4489);
			var fTemp12 = fTemp11;
			this.fRec13[0] = function fmod(a, b) { return a % b; }((this.fRec13[1] + (this.fConst15 * fTemp12)), 1);
			var fTemp13 = (2 * this.fRec13[0]);
			var fTemp14 = (fTemp13 - 1);
			var fTemp15 = faustpower2_f(fTemp14);
			this.fVec4[0] = fTemp15;
			var fTemp16 = ((this.iVec0[1] * (fTemp15 - this.fVec4[1])) / fTemp12);
			this.fVec5[(this.IOTA & 4095)] = fTemp16;
			var fTemp17 = (0.25 * fTemp16);
			var fTemp18 = Math.max(0, Math.min(2047, (this.fConst16 / fTemp11)));
			var iTemp19 = fTemp18;
			var iTemp20 = (1 + iTemp19);
			var fTemp21 = ((fTemp17 - (0.25 * (this.fVec5[((this.IOTA - iTemp19) & 4095)] * (iTemp20 - fTemp18)))) - (0.25 * ((fTemp18 - iTemp19) * this.fVec5[((this.IOTA - iTemp20) & 4095)])));
			var fTemp22 = Math.max((fSlow12 * this.fRec12[0]), 23.4489);
			var fTemp23 = fTemp22;
			this.fRec14[0] = function fmod(a, b) { return a % b; }((this.fRec14[1] + (this.fConst15 * fTemp23)), 1);
			var fTemp24 = (2 * this.fRec14[0]);
			var fTemp25 = (fTemp24 - 1);
			var fTemp26 = faustpower2_f(fTemp25);
			this.fVec6[0] = fTemp26;
			var fTemp27 = ((this.iVec0[1] * (fTemp26 - this.fVec6[1])) / fTemp23);
			this.fVec7[(this.IOTA & 4095)] = fTemp27;
			var fTemp28 = (0.25 * fTemp27);
			var fTemp29 = Math.max(0, Math.min(2047, (this.fConst16 / fTemp22)));
			var iTemp30 = fTemp29;
			var iTemp31 = (1 + iTemp30);
			var fTemp32 = ((fTemp28 - (0.25 * (this.fVec7[((this.IOTA - iTemp30) & 4095)] * (iTemp31 - fTemp29)))) - (0.25 * ((fTemp29 - iTemp30) * this.fVec7[((this.IOTA - iTemp31) & 4095)])));
			this.fRec15[0] = function fmod(a, b) { return a % b; }((1 + this.fRec15[1]), (this.fConst14 / this.fRec12[0]));
			var fTemp33 = faustpower2_f(((this.fConst17 * (this.fRec12[0] * this.fRec15[0])) - 1));
			this.fVec8[0] = fTemp33;
			this.fRec16[0] = function fmod(a, b) { return a % b; }((1 + this.fRec16[1]), (fSlow16 / this.fRec12[0]));
			var fTemp34 = faustpower2_f(((fSlow15 * (this.fRec12[0] * this.fRec16[0])) - 1));
			this.fVec9[0] = fTemp34;
			this.fRec17[0] = function fmod(a, b) { return a % b; }((1 + this.fRec17[1]), (fSlow19 / this.fRec12[0]));
			var fTemp35 = faustpower2_f(((fSlow18 * (this.fRec12[0] * this.fRec17[0])) - 1));
			this.fVec10[0] = fTemp35;
			this.fRec18[0] = ((this.fConst14 * fTemp32) + (0.999 * this.fRec18[1]));
			this.fRec19[0] = ((this.fConst14 * fTemp10) + (0.999 * this.fRec19[1]));
			this.fRec20[0] = ((this.fConst14 * fTemp21) + (0.999 * this.fRec20[1]));
			var fTemp36 = (1 + faustpower3_f(fTemp3));
			this.fVec11[0] = (fTemp36 - fTemp2);
			var fTemp37 = ((fTemp36 - (fTemp2 + this.fVec11[1])) / fTemp1);
			this.fVec12[0] = fTemp37;
			var fTemp38 = ((this.iVec0[2] * ((0.5 * fTemp37) - (0.5 * this.fVec12[1]))) / fTemp1);
			this.fVec13[(this.IOTA & 4095)] = fTemp38;
			this.fRec21[0] = ((0.99 * this.fRec21[1]) + fSlow24);
			var fTemp39 = Math.max(0, Math.min(2047, (this.fConst14 * (this.fRec21[0] / fTemp0))));
			var iTemp40 = fTemp39;
			var iTemp41 = (1 + iTemp40);
			var fTemp42 = (iTemp41 - fTemp39);
			var fTemp43 = (fTemp39 - iTemp40);
			var iTemp44 = iTemp41;
			var fTemp45 = (1 + faustpower3_f(fTemp14));
			this.fVec14[0] = (fTemp45 - fTemp13);
			var fTemp46 = ((fTemp45 - (fTemp13 + this.fVec14[1])) / fTemp12);
			this.fVec15[0] = fTemp46;
			var fTemp47 = ((this.iVec0[2] * ((0.5 * fTemp46) - (0.5 * this.fVec15[1]))) / fTemp12);
			this.fVec16[(this.IOTA & 4095)] = fTemp47;
			var fTemp48 = Math.max(0, Math.min(2047, (this.fConst14 * (this.fRec21[0] / fTemp11))));
			var iTemp49 = fTemp48;
			var iTemp50 = (1 + iTemp49);
			var fTemp51 = (iTemp50 - fTemp48);
			var fTemp52 = (fTemp48 - iTemp49);
			var iTemp53 = iTemp50;
			var fTemp54 = (1 + faustpower3_f(fTemp25));
			this.fVec17[0] = (fTemp54 - fTemp24);
			var fTemp55 = ((fTemp54 - (fTemp24 + this.fVec17[1])) / fTemp23);
			this.fVec18[0] = fTemp55;
			var fTemp56 = ((this.iVec0[2] * ((0.5 * fTemp55) - (0.5 * this.fVec18[1]))) / fTemp23);
			this.fVec19[(this.IOTA & 4095)] = fTemp56;
			var fTemp57 = Math.max(0, Math.min(2047, (this.fConst14 * (this.fRec21[0] / fTemp22))));
			var iTemp58 = fTemp57;
			var iTemp59 = (1 + iTemp58);
			var fTemp60 = (iTemp59 - fTemp57);
			var fTemp61 = (fTemp57 - iTemp58);
			var iTemp62 = iTemp59;
			this.iRec23[0] = (12345 + (1103515245 * this.iRec23[1]));
			this.fRec22[0] = (((0.522189 * this.fRec22[3]) + ((4.65661e-10 * this.iRec23[0]) + (2.49496 * this.fRec22[1]))) - (2.01727 * this.fRec22[2]));
			var fTemp63 = ((fSlow6 * input0[i]) + (this.fRec10[0] * ((((0.333333 * ((fSlow8 * ((fTemp10 + fTemp21) + fTemp32)) + (fSlow13 * ((this.fVec1[1] * (((fTemp33 - this.fVec8[1]) + (fSlow14 * (fTemp34 - this.fVec9[1]))) + (fSlow17 * (fTemp35 - this.fVec10[1])))) / this.fRec12[0])))) + (fSlow20 * (this.fRec18[0] + (this.fRec19[0] + this.fRec20[0])))) + (fSlow21 * ((fSlow23 * (((((0.0833333 * fTemp38) - (0.0833333 * (this.fVec13[((this.IOTA - iTemp40) & 4095)] * fTemp42))) - (0.0833333 * (fTemp43 * this.fVec13[((this.IOTA - iTemp44) & 4095)]))) + (((0.0833333 * fTemp47) - (0.0833333 * (this.fVec16[((this.IOTA - iTemp49) & 4095)] * fTemp51))) - (0.0833333 * (fTemp52 * this.fVec16[((this.IOTA - iTemp53) & 4095)])))) + (((0.0833333 * fTemp56) - (0.0833333 * (this.fVec19[((this.IOTA - iTemp58) & 4095)] * fTemp60))) - (0.0833333 * (fTemp61 * this.fVec19[((this.IOTA - iTemp62) & 4095)]))))) + (fSlow25 * ((((fTemp6 - (0.25 * (fTemp42 * this.fVec3[((this.IOTA - iTemp40) & 4095)]))) - (0.25 * (fTemp43 * this.fVec3[((this.IOTA - iTemp44) & 4095)]))) + ((fTemp17 - (0.25 * (fTemp51 * this.fVec5[((this.IOTA - iTemp49) & 4095)]))) - (0.25 * (fTemp52 * this.fVec5[((this.IOTA - iTemp53) & 4095)])))) + ((fTemp28 - (0.25 * (fTemp60 * this.fVec7[((this.IOTA - iTemp58) & 4095)]))) - (0.25 * (fTemp61 * this.fVec7[((this.IOTA - iTemp62) & 4095)])))))))) + (fSlow26 * (((0.049922 * this.fRec22[0]) + (0.0506127 * this.fRec22[2])) - ((0.0959935 * this.fRec22[1]) + (0.00440879 * this.fRec22[3])))))));
			var fTemp64 = (iSlow3?0:fTemp63);
			this.fRec24[0] = ((0.999 * this.fRec24[1]) + fSlow27);
			var fTemp65 = (this.fConst19 * this.fRec24[0]);
			var fTemp66 = (1 - fTemp65);
			this.fRec9[0] = (fTemp64 + ((fTemp66 * this.fRec9[1]) + (fSlow29 * this.fRec5[1])));
			this.fRec8[0] = (this.fRec9[0] + (fTemp66 * this.fRec8[1]));
			this.fRec7[0] = (this.fRec8[0] + (fTemp66 * this.fRec7[1]));
			this.fRec6[0] = (this.fRec7[0] + (this.fRec6[1] * fTemp66));
			this.fRec5[0] = (this.fRec6[0] * Math.pow(fTemp65, 4));
			var fTemp67 = Math.tan((this.fConst20 * Math.max(20, Math.min(10000, this.fRec24[0]))));
			var fTemp68 = (1 / fTemp67);
			var fTemp69 = (1 / faustpower2_f(fTemp67));
			var fTemp70 = (fSlow32 + ((fTemp68 + fSlow34) / fTemp67));
			this.fRec26[0] = (fTemp64 - (((this.fRec26[2] * (fSlow32 + ((fTemp68 - fSlow34) / fTemp67))) + (2 * (this.fRec26[1] * (fSlow32 - fTemp69)))) / fTemp70));
			var fTemp71 = (fSlow35 + ((fTemp68 + fSlow36) / fTemp67));
			this.fRec25[0] = (((this.fRec26[2] + (this.fRec26[0] + (2 * this.fRec26[1]))) / fTemp70) - (((2 * (this.fRec25[1] * (fSlow35 - fTemp69))) + (this.fRec25[2] * (fSlow35 + ((fTemp68 - fSlow36) / fTemp67)))) / fTemp71));
			var fTemp72 = Math.tan((this.fConst20 * Math.max(this.fRec24[0], 20)));
			var fTemp73 = (1 / fTemp72);
			var fTemp74 = (fSlow39 + ((fSlow40 + fTemp73) / fTemp72));
			var fTemp75 = ((fSlow39 + ((fTemp73 - fSlow40) / fTemp72)) / fTemp74);
			var fTemp76 = Math.max(-0.9999, Math.min(0.9999, fTemp75));
			var fTemp77 = (1 - faustpower2_f(fTemp76));
			var fTemp78 = Math.sqrt(Math.max(0, fTemp77));
			var fTemp79 = ((this.fRec27[1] * (0 - fTemp76)) + (fTemp64 * fTemp78));
			var fTemp80 = (1 / faustpower2_f(fTemp72));
			var fTemp81 = (fSlow39 - fTemp80);
			var fTemp82 = Math.max(-0.9999, Math.min(0.9999, (2 * (fTemp81 / (fTemp74 * (1 + fTemp75))))));
			var fTemp83 = (1 - faustpower2_f(fTemp82));
			var fTemp84 = Math.sqrt(Math.max(0, fTemp83));
			this.fRec29[0] = ((this.fRec29[1] * (0 - fTemp82)) + (fTemp79 * fTemp84));
			this.fRec27[0] = ((fTemp79 * fTemp82) + (this.fRec29[1] * fTemp84));
			var fRec28 = this.fRec29[0];
			var fTemp85 = (2 - (2 * (fTemp81 / fTemp74)));
			var fTemp86 = Math.sqrt(fTemp77);
			var fTemp87 = ((((fTemp64 * fTemp76) + (this.fRec27[1] * fTemp78)) + ((this.fRec27[0] * fTemp85) / fTemp86)) + ((fRec28 * ((1 - fTemp75) - (fTemp82 * fTemp85))) / (fTemp86 * Math.sqrt(fTemp83))));
			var fTemp88 = (fSlow41 + ((fTemp73 + fSlow42) / fTemp72));
			var fTemp89 = ((fSlow41 + ((fTemp73 - fSlow42) / fTemp72)) / fTemp88);
			var fTemp90 = Math.max(-0.9999, Math.min(0.9999, fTemp89));
			var fTemp91 = (1 - faustpower2_f(fTemp90));
			var fTemp92 = Math.sqrt(Math.max(0, fTemp91));
			var fTemp93 = ((this.fRec30[1] * (0 - fTemp90)) + ((fTemp87 * fTemp92) / fTemp74));
			var fTemp94 = (fSlow41 - fTemp80);
			var fTemp95 = Math.max(-0.9999, Math.min(0.9999, (2 * (fTemp94 / (fTemp88 * (1 + fTemp89))))));
			var fTemp96 = (1 - faustpower2_f(fTemp95));
			var fTemp97 = Math.sqrt(Math.max(0, fTemp96));
			this.fRec32[0] = ((this.fRec32[1] * (0 - fTemp95)) + (fTemp93 * fTemp97));
			this.fRec30[0] = ((fTemp93 * fTemp95) + (this.fRec32[1] * fTemp97));
			var fRec31 = this.fRec32[0];
			var fTemp98 = (2 - (2 * (fTemp94 / fTemp88)));
			var fTemp99 = Math.sqrt(fTemp91);
			var sel0;
			if (iSlow30 != 0) {
				sel0 = ((((((fTemp87 * fTemp90) / fTemp74) + (this.fRec30[1] * fTemp92)) + ((this.fRec30[0] * fTemp98) / fTemp99)) + ((fRec31 * ((1 - fTemp89) - (fTemp95 * fTemp98))) / (fTemp99 * Math.sqrt(fTemp96)))) / fTemp88);
				
			} else {
				sel0 = ((this.fRec25[2] + (this.fRec25[0] + (2 * this.fRec25[1]))) / fTemp71);
				
			}
			var sel1;
			if (iSlow3 != 0) {
				sel1 = fTemp63;
				
			} else {
				sel1 = (this.fRec4[0] * (iSlow5?sel0:this.fRec5[0]));
				
			}
			var fTemp100 = sel1;
			this.fRec3[0] = (fTemp100 - (this.fConst11 * ((this.fConst21 * this.fRec3[2]) + (this.fConst23 * this.fRec3[1]))));
			this.fRec2[0] = ((this.fConst11 * (((this.fConst13 * this.fRec3[1]) + (this.fConst24 * this.fRec3[0])) + (this.fConst24 * this.fRec3[2]))) - (this.fConst8 * ((this.fConst25 * this.fRec2[2]) + (this.fConst26 * this.fRec2[1]))));
			this.fRec1[0] = ((this.fConst8 * (((this.fConst10 * this.fRec2[0]) + (this.fConst27 * this.fRec2[1])) + (this.fConst10 * this.fRec2[2]))) - (this.fConst4 * ((this.fConst28 * this.fRec1[2]) + (this.fConst29 * this.fRec1[1]))));
			this.fRec0[0] = ((fSlow1 * this.fRec0[1]) + (fSlow2 * Math.abs((this.fConst4 * (((this.fConst7 * this.fRec1[0]) + (this.fConst30 * this.fRec1[1])) + (this.fConst7 * this.fRec1[2]))))));
			this.fvbargraph0 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec0[0])));
			this.fRec39[0] = (fTemp100 - (this.fConst47 * ((this.fConst50 * this.fRec39[2]) + (this.fConst51 * this.fRec39[1]))));
			this.fRec38[0] = ((this.fConst47 * (((this.fConst49 * this.fRec39[0]) + (this.fConst52 * this.fRec39[1])) + (this.fConst49 * this.fRec39[2]))) - (this.fConst45 * ((this.fConst53 * this.fRec38[2]) + (this.fConst54 * this.fRec38[1]))));
			this.fRec37[0] = ((this.fConst45 * (((this.fConst46 * this.fRec38[0]) + (this.fConst55 * this.fRec38[1])) + (this.fConst46 * this.fRec38[2]))) - (this.fConst43 * ((this.fConst56 * this.fRec37[2]) + (this.fConst57 * this.fRec37[1]))));
			var fTemp101 = (this.fConst43 * (((this.fConst44 * this.fRec37[0]) + (this.fConst58 * this.fRec37[1])) + (this.fConst44 * this.fRec37[2])));
			this.fRec36[0] = (fTemp101 - (this.fConst40 * ((this.fConst59 * this.fRec36[2]) + (this.fConst61 * this.fRec36[1]))));
			this.fRec35[0] = ((this.fConst40 * (((this.fConst42 * this.fRec36[0]) + (this.fConst62 * this.fRec36[1])) + (this.fConst42 * this.fRec36[2]))) - (this.fConst37 * ((this.fConst63 * this.fRec35[2]) + (this.fConst64 * this.fRec35[1]))));
			this.fRec34[0] = ((this.fConst37 * (((this.fConst39 * this.fRec35[0]) + (this.fConst65 * this.fRec35[1])) + (this.fConst39 * this.fRec35[2]))) - (this.fConst33 * ((this.fConst66 * this.fRec34[2]) + (this.fConst67 * this.fRec34[1]))));
			this.fRec33[0] = ((fSlow1 * this.fRec33[1]) + (fSlow2 * Math.abs((this.fConst33 * (((this.fConst36 * this.fRec34[0]) + (this.fConst68 * this.fRec34[1])) + (this.fConst36 * this.fRec34[2]))))));
			this.fvbargraph1 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec33[0])));
			this.fRec46[0] = (fTemp101 - (this.fConst85 * ((this.fConst88 * this.fRec46[2]) + (this.fConst89 * this.fRec46[1]))));
			this.fRec45[0] = ((this.fConst85 * (((this.fConst87 * this.fRec46[0]) + (this.fConst90 * this.fRec46[1])) + (this.fConst87 * this.fRec46[2]))) - (this.fConst83 * ((this.fConst91 * this.fRec45[2]) + (this.fConst92 * this.fRec45[1]))));
			this.fRec44[0] = ((this.fConst83 * (((this.fConst84 * this.fRec45[0]) + (this.fConst93 * this.fRec45[1])) + (this.fConst84 * this.fRec45[2]))) - (this.fConst81 * ((this.fConst94 * this.fRec44[2]) + (this.fConst95 * this.fRec44[1]))));
			var fTemp102 = (this.fConst81 * (((this.fConst82 * this.fRec44[0]) + (this.fConst96 * this.fRec44[1])) + (this.fConst82 * this.fRec44[2])));
			this.fRec43[0] = (fTemp102 - (this.fConst78 * ((this.fConst97 * this.fRec43[2]) + (this.fConst99 * this.fRec43[1]))));
			this.fRec42[0] = ((this.fConst78 * (((this.fConst80 * this.fRec43[0]) + (this.fConst100 * this.fRec43[1])) + (this.fConst80 * this.fRec43[2]))) - (this.fConst75 * ((this.fConst101 * this.fRec42[2]) + (this.fConst102 * this.fRec42[1]))));
			this.fRec41[0] = ((this.fConst75 * (((this.fConst77 * this.fRec42[0]) + (this.fConst103 * this.fRec42[1])) + (this.fConst77 * this.fRec42[2]))) - (this.fConst71 * ((this.fConst104 * this.fRec41[2]) + (this.fConst105 * this.fRec41[1]))));
			this.fRec40[0] = ((fSlow1 * this.fRec40[1]) + (fSlow2 * Math.abs((this.fConst71 * (((this.fConst74 * this.fRec41[0]) + (this.fConst106 * this.fRec41[1])) + (this.fConst74 * this.fRec41[2]))))));
			this.fvbargraph2 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec40[0])));
			this.fRec53[0] = (fTemp102 - (this.fConst123 * ((this.fConst126 * this.fRec53[2]) + (this.fConst127 * this.fRec53[1]))));
			this.fRec52[0] = ((this.fConst123 * (((this.fConst125 * this.fRec53[0]) + (this.fConst128 * this.fRec53[1])) + (this.fConst125 * this.fRec53[2]))) - (this.fConst121 * ((this.fConst129 * this.fRec52[2]) + (this.fConst130 * this.fRec52[1]))));
			this.fRec51[0] = ((this.fConst121 * (((this.fConst122 * this.fRec52[0]) + (this.fConst131 * this.fRec52[1])) + (this.fConst122 * this.fRec52[2]))) - (this.fConst119 * ((this.fConst132 * this.fRec51[2]) + (this.fConst133 * this.fRec51[1]))));
			var fTemp103 = (this.fConst119 * (((this.fConst120 * this.fRec51[0]) + (this.fConst134 * this.fRec51[1])) + (this.fConst120 * this.fRec51[2])));
			this.fRec50[0] = (fTemp103 - (this.fConst116 * ((this.fConst135 * this.fRec50[2]) + (this.fConst137 * this.fRec50[1]))));
			this.fRec49[0] = ((this.fConst116 * (((this.fConst118 * this.fRec50[0]) + (this.fConst138 * this.fRec50[1])) + (this.fConst118 * this.fRec50[2]))) - (this.fConst113 * ((this.fConst139 * this.fRec49[2]) + (this.fConst140 * this.fRec49[1]))));
			this.fRec48[0] = ((this.fConst113 * (((this.fConst115 * this.fRec49[0]) + (this.fConst141 * this.fRec49[1])) + (this.fConst115 * this.fRec49[2]))) - (this.fConst109 * ((this.fConst142 * this.fRec48[2]) + (this.fConst143 * this.fRec48[1]))));
			this.fRec47[0] = ((fSlow1 * this.fRec47[1]) + (fSlow2 * Math.abs((this.fConst109 * (((this.fConst112 * this.fRec48[0]) + (this.fConst144 * this.fRec48[1])) + (this.fConst112 * this.fRec48[2]))))));
			this.fvbargraph3 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec47[0])));
			this.fRec60[0] = (fTemp103 - (this.fConst161 * ((this.fConst164 * this.fRec60[2]) + (this.fConst165 * this.fRec60[1]))));
			this.fRec59[0] = ((this.fConst161 * (((this.fConst163 * this.fRec60[0]) + (this.fConst166 * this.fRec60[1])) + (this.fConst163 * this.fRec60[2]))) - (this.fConst159 * ((this.fConst167 * this.fRec59[2]) + (this.fConst168 * this.fRec59[1]))));
			this.fRec58[0] = ((this.fConst159 * (((this.fConst160 * this.fRec59[0]) + (this.fConst169 * this.fRec59[1])) + (this.fConst160 * this.fRec59[2]))) - (this.fConst157 * ((this.fConst170 * this.fRec58[2]) + (this.fConst171 * this.fRec58[1]))));
			var fTemp104 = (this.fConst157 * (((this.fConst158 * this.fRec58[0]) + (this.fConst172 * this.fRec58[1])) + (this.fConst158 * this.fRec58[2])));
			this.fRec57[0] = (fTemp104 - (this.fConst154 * ((this.fConst173 * this.fRec57[2]) + (this.fConst175 * this.fRec57[1]))));
			this.fRec56[0] = ((this.fConst154 * (((this.fConst156 * this.fRec57[0]) + (this.fConst176 * this.fRec57[1])) + (this.fConst156 * this.fRec57[2]))) - (this.fConst151 * ((this.fConst177 * this.fRec56[2]) + (this.fConst178 * this.fRec56[1]))));
			this.fRec55[0] = ((this.fConst151 * (((this.fConst153 * this.fRec56[0]) + (this.fConst179 * this.fRec56[1])) + (this.fConst153 * this.fRec56[2]))) - (this.fConst147 * ((this.fConst180 * this.fRec55[2]) + (this.fConst181 * this.fRec55[1]))));
			this.fRec54[0] = ((fSlow1 * this.fRec54[1]) + (fSlow2 * Math.abs((this.fConst147 * (((this.fConst150 * this.fRec55[0]) + (this.fConst182 * this.fRec55[1])) + (this.fConst150 * this.fRec55[2]))))));
			this.fvbargraph4 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec54[0])));
			this.fRec67[0] = (fTemp104 - (this.fConst199 * ((this.fConst202 * this.fRec67[2]) + (this.fConst203 * this.fRec67[1]))));
			this.fRec66[0] = ((this.fConst199 * (((this.fConst201 * this.fRec67[0]) + (this.fConst204 * this.fRec67[1])) + (this.fConst201 * this.fRec67[2]))) - (this.fConst197 * ((this.fConst205 * this.fRec66[2]) + (this.fConst206 * this.fRec66[1]))));
			this.fRec65[0] = ((this.fConst197 * (((this.fConst198 * this.fRec66[0]) + (this.fConst207 * this.fRec66[1])) + (this.fConst198 * this.fRec66[2]))) - (this.fConst195 * ((this.fConst208 * this.fRec65[2]) + (this.fConst209 * this.fRec65[1]))));
			var fTemp105 = (this.fConst195 * (((this.fConst196 * this.fRec65[0]) + (this.fConst210 * this.fRec65[1])) + (this.fConst196 * this.fRec65[2])));
			this.fRec64[0] = (fTemp105 - (this.fConst192 * ((this.fConst211 * this.fRec64[2]) + (this.fConst213 * this.fRec64[1]))));
			this.fRec63[0] = ((this.fConst192 * (((this.fConst194 * this.fRec64[0]) + (this.fConst214 * this.fRec64[1])) + (this.fConst194 * this.fRec64[2]))) - (this.fConst189 * ((this.fConst215 * this.fRec63[2]) + (this.fConst216 * this.fRec63[1]))));
			this.fRec62[0] = ((this.fConst189 * (((this.fConst191 * this.fRec63[0]) + (this.fConst217 * this.fRec63[1])) + (this.fConst191 * this.fRec63[2]))) - (this.fConst185 * ((this.fConst218 * this.fRec62[2]) + (this.fConst219 * this.fRec62[1]))));
			this.fRec61[0] = ((fSlow1 * this.fRec61[1]) + (fSlow2 * Math.abs((this.fConst185 * (((this.fConst188 * this.fRec62[0]) + (this.fConst220 * this.fRec62[1])) + (this.fConst188 * this.fRec62[2]))))));
			this.fvbargraph5 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec61[0])));
			this.fRec74[0] = (fTemp105 - (this.fConst237 * ((this.fConst240 * this.fRec74[2]) + (this.fConst241 * this.fRec74[1]))));
			this.fRec73[0] = ((this.fConst237 * (((this.fConst239 * this.fRec74[0]) + (this.fConst242 * this.fRec74[1])) + (this.fConst239 * this.fRec74[2]))) - (this.fConst235 * ((this.fConst243 * this.fRec73[2]) + (this.fConst244 * this.fRec73[1]))));
			this.fRec72[0] = ((this.fConst235 * (((this.fConst236 * this.fRec73[0]) + (this.fConst245 * this.fRec73[1])) + (this.fConst236 * this.fRec73[2]))) - (this.fConst233 * ((this.fConst246 * this.fRec72[2]) + (this.fConst247 * this.fRec72[1]))));
			var fTemp106 = (this.fConst233 * (((this.fConst234 * this.fRec72[0]) + (this.fConst248 * this.fRec72[1])) + (this.fConst234 * this.fRec72[2])));
			this.fRec71[0] = (fTemp106 - (this.fConst230 * ((this.fConst249 * this.fRec71[2]) + (this.fConst251 * this.fRec71[1]))));
			this.fRec70[0] = ((this.fConst230 * (((this.fConst232 * this.fRec71[0]) + (this.fConst252 * this.fRec71[1])) + (this.fConst232 * this.fRec71[2]))) - (this.fConst227 * ((this.fConst253 * this.fRec70[2]) + (this.fConst254 * this.fRec70[1]))));
			this.fRec69[0] = ((this.fConst227 * (((this.fConst229 * this.fRec70[0]) + (this.fConst255 * this.fRec70[1])) + (this.fConst229 * this.fRec70[2]))) - (this.fConst223 * ((this.fConst256 * this.fRec69[2]) + (this.fConst257 * this.fRec69[1]))));
			this.fRec68[0] = ((fSlow1 * this.fRec68[1]) + (fSlow2 * Math.abs((this.fConst223 * (((this.fConst226 * this.fRec69[0]) + (this.fConst258 * this.fRec69[1])) + (this.fConst226 * this.fRec69[2]))))));
			this.fvbargraph6 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec68[0])));
			this.fRec81[0] = (fTemp106 - (this.fConst275 * ((this.fConst278 * this.fRec81[2]) + (this.fConst279 * this.fRec81[1]))));
			this.fRec80[0] = ((this.fConst275 * (((this.fConst277 * this.fRec81[0]) + (this.fConst280 * this.fRec81[1])) + (this.fConst277 * this.fRec81[2]))) - (this.fConst273 * ((this.fConst281 * this.fRec80[2]) + (this.fConst282 * this.fRec80[1]))));
			this.fRec79[0] = ((this.fConst273 * (((this.fConst274 * this.fRec80[0]) + (this.fConst283 * this.fRec80[1])) + (this.fConst274 * this.fRec80[2]))) - (this.fConst271 * ((this.fConst284 * this.fRec79[2]) + (this.fConst285 * this.fRec79[1]))));
			var fTemp107 = (this.fConst271 * (((this.fConst272 * this.fRec79[0]) + (this.fConst286 * this.fRec79[1])) + (this.fConst272 * this.fRec79[2])));
			this.fRec78[0] = (fTemp107 - (this.fConst268 * ((this.fConst287 * this.fRec78[2]) + (this.fConst289 * this.fRec78[1]))));
			this.fRec77[0] = ((this.fConst268 * (((this.fConst270 * this.fRec78[0]) + (this.fConst290 * this.fRec78[1])) + (this.fConst270 * this.fRec78[2]))) - (this.fConst265 * ((this.fConst291 * this.fRec77[2]) + (this.fConst292 * this.fRec77[1]))));
			this.fRec76[0] = ((this.fConst265 * (((this.fConst267 * this.fRec77[0]) + (this.fConst293 * this.fRec77[1])) + (this.fConst267 * this.fRec77[2]))) - (this.fConst261 * ((this.fConst294 * this.fRec76[2]) + (this.fConst295 * this.fRec76[1]))));
			this.fRec75[0] = ((fSlow1 * this.fRec75[1]) + (fSlow2 * Math.abs((this.fConst261 * (((this.fConst264 * this.fRec76[0]) + (this.fConst296 * this.fRec76[1])) + (this.fConst264 * this.fRec76[2]))))));
			this.fvbargraph7 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec75[0])));
			this.fRec88[0] = (fTemp107 - (this.fConst313 * ((this.fConst316 * this.fRec88[2]) + (this.fConst317 * this.fRec88[1]))));
			this.fRec87[0] = ((this.fConst313 * (((this.fConst315 * this.fRec88[0]) + (this.fConst318 * this.fRec88[1])) + (this.fConst315 * this.fRec88[2]))) - (this.fConst311 * ((this.fConst319 * this.fRec87[2]) + (this.fConst320 * this.fRec87[1]))));
			this.fRec86[0] = ((this.fConst311 * (((this.fConst312 * this.fRec87[0]) + (this.fConst321 * this.fRec87[1])) + (this.fConst312 * this.fRec87[2]))) - (this.fConst309 * ((this.fConst322 * this.fRec86[2]) + (this.fConst323 * this.fRec86[1]))));
			var fTemp108 = (this.fConst309 * (((this.fConst310 * this.fRec86[0]) + (this.fConst324 * this.fRec86[1])) + (this.fConst310 * this.fRec86[2])));
			this.fRec85[0] = (fTemp108 - (this.fConst306 * ((this.fConst325 * this.fRec85[2]) + (this.fConst327 * this.fRec85[1]))));
			this.fRec84[0] = ((this.fConst306 * (((this.fConst308 * this.fRec85[0]) + (this.fConst328 * this.fRec85[1])) + (this.fConst308 * this.fRec85[2]))) - (this.fConst303 * ((this.fConst329 * this.fRec84[2]) + (this.fConst330 * this.fRec84[1]))));
			this.fRec83[0] = ((this.fConst303 * (((this.fConst305 * this.fRec84[0]) + (this.fConst331 * this.fRec84[1])) + (this.fConst305 * this.fRec84[2]))) - (this.fConst299 * ((this.fConst332 * this.fRec83[2]) + (this.fConst333 * this.fRec83[1]))));
			this.fRec82[0] = ((fSlow1 * this.fRec82[1]) + (fSlow2 * Math.abs((this.fConst299 * (((this.fConst302 * this.fRec83[0]) + (this.fConst334 * this.fRec83[1])) + (this.fConst302 * this.fRec83[2]))))));
			this.fvbargraph8 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec82[0])));
			this.fRec95[0] = (fTemp108 - (this.fConst351 * ((this.fConst354 * this.fRec95[2]) + (this.fConst355 * this.fRec95[1]))));
			this.fRec94[0] = ((this.fConst351 * (((this.fConst353 * this.fRec95[0]) + (this.fConst356 * this.fRec95[1])) + (this.fConst353 * this.fRec95[2]))) - (this.fConst349 * ((this.fConst357 * this.fRec94[2]) + (this.fConst358 * this.fRec94[1]))));
			this.fRec93[0] = ((this.fConst349 * (((this.fConst350 * this.fRec94[0]) + (this.fConst359 * this.fRec94[1])) + (this.fConst350 * this.fRec94[2]))) - (this.fConst347 * ((this.fConst360 * this.fRec93[2]) + (this.fConst361 * this.fRec93[1]))));
			var fTemp109 = (this.fConst347 * (((this.fConst348 * this.fRec93[0]) + (this.fConst362 * this.fRec93[1])) + (this.fConst348 * this.fRec93[2])));
			this.fRec92[0] = (fTemp109 - (this.fConst344 * ((this.fConst363 * this.fRec92[2]) + (this.fConst365 * this.fRec92[1]))));
			this.fRec91[0] = ((this.fConst344 * (((this.fConst346 * this.fRec92[0]) + (this.fConst366 * this.fRec92[1])) + (this.fConst346 * this.fRec92[2]))) - (this.fConst341 * ((this.fConst367 * this.fRec91[2]) + (this.fConst368 * this.fRec91[1]))));
			this.fRec90[0] = ((this.fConst341 * (((this.fConst343 * this.fRec91[0]) + (this.fConst369 * this.fRec91[1])) + (this.fConst343 * this.fRec91[2]))) - (this.fConst337 * ((this.fConst370 * this.fRec90[2]) + (this.fConst371 * this.fRec90[1]))));
			this.fRec89[0] = ((fSlow1 * this.fRec89[1]) + (fSlow2 * Math.abs((this.fConst337 * (((this.fConst340 * this.fRec90[0]) + (this.fConst372 * this.fRec90[1])) + (this.fConst340 * this.fRec90[2]))))));
			this.fvbargraph9 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec89[0])));
			this.fRec102[0] = (fTemp109 - (this.fConst389 * ((this.fConst392 * this.fRec102[2]) + (this.fConst393 * this.fRec102[1]))));
			this.fRec101[0] = ((this.fConst389 * (((this.fConst391 * this.fRec102[0]) + (this.fConst394 * this.fRec102[1])) + (this.fConst391 * this.fRec102[2]))) - (this.fConst387 * ((this.fConst395 * this.fRec101[2]) + (this.fConst396 * this.fRec101[1]))));
			this.fRec100[0] = ((this.fConst387 * (((this.fConst388 * this.fRec101[0]) + (this.fConst397 * this.fRec101[1])) + (this.fConst388 * this.fRec101[2]))) - (this.fConst385 * ((this.fConst398 * this.fRec100[2]) + (this.fConst399 * this.fRec100[1]))));
			var fTemp110 = (this.fConst385 * (((this.fConst386 * this.fRec100[0]) + (this.fConst400 * this.fRec100[1])) + (this.fConst386 * this.fRec100[2])));
			this.fRec99[0] = (fTemp110 - (this.fConst382 * ((this.fConst401 * this.fRec99[2]) + (this.fConst403 * this.fRec99[1]))));
			this.fRec98[0] = ((this.fConst382 * (((this.fConst384 * this.fRec99[0]) + (this.fConst404 * this.fRec99[1])) + (this.fConst384 * this.fRec99[2]))) - (this.fConst379 * ((this.fConst405 * this.fRec98[2]) + (this.fConst406 * this.fRec98[1]))));
			this.fRec97[0] = ((this.fConst379 * (((this.fConst381 * this.fRec98[0]) + (this.fConst407 * this.fRec98[1])) + (this.fConst381 * this.fRec98[2]))) - (this.fConst375 * ((this.fConst408 * this.fRec97[2]) + (this.fConst409 * this.fRec97[1]))));
			this.fRec96[0] = ((fSlow1 * this.fRec96[1]) + (fSlow2 * Math.abs((this.fConst375 * (((this.fConst378 * this.fRec97[0]) + (this.fConst410 * this.fRec97[1])) + (this.fConst378 * this.fRec97[2]))))));
			this.fvbargraph10 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec96[0])));
			this.fRec109[0] = (fTemp110 - (this.fConst427 * ((this.fConst430 * this.fRec109[2]) + (this.fConst431 * this.fRec109[1]))));
			this.fRec108[0] = ((this.fConst427 * (((this.fConst429 * this.fRec109[0]) + (this.fConst432 * this.fRec109[1])) + (this.fConst429 * this.fRec109[2]))) - (this.fConst425 * ((this.fConst433 * this.fRec108[2]) + (this.fConst434 * this.fRec108[1]))));
			this.fRec107[0] = ((this.fConst425 * (((this.fConst426 * this.fRec108[0]) + (this.fConst435 * this.fRec108[1])) + (this.fConst426 * this.fRec108[2]))) - (this.fConst423 * ((this.fConst436 * this.fRec107[2]) + (this.fConst437 * this.fRec107[1]))));
			var fTemp111 = (this.fConst423 * (((this.fConst424 * this.fRec107[0]) + (this.fConst438 * this.fRec107[1])) + (this.fConst424 * this.fRec107[2])));
			this.fRec106[0] = (fTemp111 - (this.fConst420 * ((this.fConst439 * this.fRec106[2]) + (this.fConst441 * this.fRec106[1]))));
			this.fRec105[0] = ((this.fConst420 * (((this.fConst422 * this.fRec106[0]) + (this.fConst442 * this.fRec106[1])) + (this.fConst422 * this.fRec106[2]))) - (this.fConst417 * ((this.fConst443 * this.fRec105[2]) + (this.fConst444 * this.fRec105[1]))));
			this.fRec104[0] = ((this.fConst417 * (((this.fConst419 * this.fRec105[0]) + (this.fConst445 * this.fRec105[1])) + (this.fConst419 * this.fRec105[2]))) - (this.fConst413 * ((this.fConst446 * this.fRec104[2]) + (this.fConst447 * this.fRec104[1]))));
			this.fRec103[0] = ((fSlow1 * this.fRec103[1]) + (fSlow2 * Math.abs((this.fConst413 * (((this.fConst416 * this.fRec104[0]) + (this.fConst448 * this.fRec104[1])) + (this.fConst416 * this.fRec104[2]))))));
			this.fvbargraph11 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec103[0])));
			this.fRec116[0] = (fTemp111 - (this.fConst465 * ((this.fConst468 * this.fRec116[2]) + (this.fConst469 * this.fRec116[1]))));
			this.fRec115[0] = ((this.fConst465 * (((this.fConst467 * this.fRec116[0]) + (this.fConst470 * this.fRec116[1])) + (this.fConst467 * this.fRec116[2]))) - (this.fConst463 * ((this.fConst471 * this.fRec115[2]) + (this.fConst472 * this.fRec115[1]))));
			this.fRec114[0] = ((this.fConst463 * (((this.fConst464 * this.fRec115[0]) + (this.fConst473 * this.fRec115[1])) + (this.fConst464 * this.fRec115[2]))) - (this.fConst461 * ((this.fConst474 * this.fRec114[2]) + (this.fConst475 * this.fRec114[1]))));
			var fTemp112 = (this.fConst461 * (((this.fConst462 * this.fRec114[0]) + (this.fConst476 * this.fRec114[1])) + (this.fConst462 * this.fRec114[2])));
			this.fRec113[0] = (fTemp112 - (this.fConst458 * ((this.fConst477 * this.fRec113[2]) + (this.fConst479 * this.fRec113[1]))));
			this.fRec112[0] = ((this.fConst458 * (((this.fConst460 * this.fRec113[0]) + (this.fConst480 * this.fRec113[1])) + (this.fConst460 * this.fRec113[2]))) - (this.fConst455 * ((this.fConst481 * this.fRec112[2]) + (this.fConst482 * this.fRec112[1]))));
			this.fRec111[0] = ((this.fConst455 * (((this.fConst457 * this.fRec112[0]) + (this.fConst483 * this.fRec112[1])) + (this.fConst457 * this.fRec112[2]))) - (this.fConst451 * ((this.fConst484 * this.fRec111[2]) + (this.fConst485 * this.fRec111[1]))));
			this.fRec110[0] = ((fSlow1 * this.fRec110[1]) + (fSlow2 * Math.abs((this.fConst451 * (((this.fConst454 * this.fRec111[0]) + (this.fConst486 * this.fRec111[1])) + (this.fConst454 * this.fRec111[2]))))));
			this.fvbargraph12 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec110[0])));
			this.fRec123[0] = (fTemp112 - (this.fConst503 * ((this.fConst506 * this.fRec123[2]) + (this.fConst507 * this.fRec123[1]))));
			this.fRec122[0] = ((this.fConst503 * (((this.fConst505 * this.fRec123[0]) + (this.fConst508 * this.fRec123[1])) + (this.fConst505 * this.fRec123[2]))) - (this.fConst501 * ((this.fConst509 * this.fRec122[2]) + (this.fConst510 * this.fRec122[1]))));
			this.fRec121[0] = ((this.fConst501 * (((this.fConst502 * this.fRec122[0]) + (this.fConst511 * this.fRec122[1])) + (this.fConst502 * this.fRec122[2]))) - (this.fConst499 * ((this.fConst512 * this.fRec121[2]) + (this.fConst513 * this.fRec121[1]))));
			var fTemp113 = (this.fConst499 * (((this.fConst500 * this.fRec121[0]) + (this.fConst514 * this.fRec121[1])) + (this.fConst500 * this.fRec121[2])));
			this.fRec120[0] = (fTemp113 - (this.fConst496 * ((this.fConst515 * this.fRec120[2]) + (this.fConst517 * this.fRec120[1]))));
			this.fRec119[0] = ((this.fConst496 * (((this.fConst498 * this.fRec120[0]) + (this.fConst518 * this.fRec120[1])) + (this.fConst498 * this.fRec120[2]))) - (this.fConst493 * ((this.fConst519 * this.fRec119[2]) + (this.fConst520 * this.fRec119[1]))));
			this.fRec118[0] = ((this.fConst493 * (((this.fConst495 * this.fRec119[0]) + (this.fConst521 * this.fRec119[1])) + (this.fConst495 * this.fRec119[2]))) - (this.fConst489 * ((this.fConst522 * this.fRec118[2]) + (this.fConst523 * this.fRec118[1]))));
			this.fRec117[0] = ((fSlow1 * this.fRec117[1]) + (fSlow2 * Math.abs((this.fConst489 * (((this.fConst492 * this.fRec118[0]) + (this.fConst524 * this.fRec118[1])) + (this.fConst492 * this.fRec118[2]))))));
			this.fvbargraph13 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec117[0])));
			this.fRec127[0] = (fTemp113 - (this.fConst529 * ((this.fConst532 * this.fRec127[2]) + (this.fConst533 * this.fRec127[1]))));
			this.fRec126[0] = ((this.fConst529 * (((this.fConst531 * this.fRec127[0]) + (this.fConst534 * this.fRec127[1])) + (this.fConst531 * this.fRec127[2]))) - (this.fConst527 * ((this.fConst535 * this.fRec126[2]) + (this.fConst536 * this.fRec126[1]))));
			this.fRec125[0] = ((this.fConst527 * (((this.fConst528 * this.fRec126[0]) + (this.fConst537 * this.fRec126[1])) + (this.fConst528 * this.fRec126[2]))) - (this.fConst525 * ((this.fConst538 * this.fRec125[2]) + (this.fConst539 * this.fRec125[1]))));
			this.fRec124[0] = ((fSlow1 * this.fRec124[1]) + (fSlow2 * Math.abs((this.fConst525 * (((this.fConst526 * this.fRec125[0]) + (this.fConst540 * this.fRec125[1])) + (this.fConst526 * this.fRec125[2]))))));
			this.fvbargraph14 = (fSlow0 + (20 * function log10(a) { return Math.log(a)/Math.log(10); }(this.fRec124[0])));
			var fTemp114 = fTemp100;
			output0[i] = fTemp114;
			output1[i] = fTemp114;
			this.iVec0[2] = this.iVec0[1];
			this.iVec0[1] = this.iVec0[0];
			this.fRec4[1] = this.fRec4[0];
			this.fRec10[1] = this.fRec10[0];
			this.fVec1[1] = this.fVec1[0];
			this.fRec12[1] = this.fRec12[0];
			this.fRec11[1] = this.fRec11[0];
			this.fVec2[1] = this.fVec2[0];
			this.IOTA = (this.IOTA + 1);
			this.fRec13[1] = this.fRec13[0];
			this.fVec4[1] = this.fVec4[0];
			this.fRec14[1] = this.fRec14[0];
			this.fVec6[1] = this.fVec6[0];
			this.fRec15[1] = this.fRec15[0];
			this.fVec8[1] = this.fVec8[0];
			this.fRec16[1] = this.fRec16[0];
			this.fVec9[1] = this.fVec9[0];
			this.fRec17[1] = this.fRec17[0];
			this.fVec10[1] = this.fVec10[0];
			this.fRec18[1] = this.fRec18[0];
			this.fRec19[1] = this.fRec19[0];
			this.fRec20[1] = this.fRec20[0];
			this.fVec11[1] = this.fVec11[0];
			this.fVec12[1] = this.fVec12[0];
			this.fRec21[1] = this.fRec21[0];
			this.fVec14[1] = this.fVec14[0];
			this.fVec15[1] = this.fVec15[0];
			this.fVec17[1] = this.fVec17[0];
			this.fVec18[1] = this.fVec18[0];
			this.iRec23[1] = this.iRec23[0];
			for (var j = 3; (j > 0); j = (j - 1)) {
				this.fRec22[j] = this.fRec22[(j - 1)];
				
			}
			this.fRec24[1] = this.fRec24[0];
			this.fRec9[1] = this.fRec9[0];
			this.fRec8[1] = this.fRec8[0];
			this.fRec7[1] = this.fRec7[0];
			this.fRec6[1] = this.fRec6[0];
			this.fRec5[1] = this.fRec5[0];
			this.fRec26[2] = this.fRec26[1];
			this.fRec26[1] = this.fRec26[0];
			this.fRec25[2] = this.fRec25[1];
			this.fRec25[1] = this.fRec25[0];
			this.fRec29[1] = this.fRec29[0];
			this.fRec27[1] = this.fRec27[0];
			this.fRec32[1] = this.fRec32[0];
			this.fRec30[1] = this.fRec30[0];
			this.fRec3[2] = this.fRec3[1];
			this.fRec3[1] = this.fRec3[0];
			this.fRec2[2] = this.fRec2[1];
			this.fRec2[1] = this.fRec2[0];
			this.fRec1[2] = this.fRec1[1];
			this.fRec1[1] = this.fRec1[0];
			this.fRec0[1] = this.fRec0[0];
			this.fRec39[2] = this.fRec39[1];
			this.fRec39[1] = this.fRec39[0];
			this.fRec38[2] = this.fRec38[1];
			this.fRec38[1] = this.fRec38[0];
			this.fRec37[2] = this.fRec37[1];
			this.fRec37[1] = this.fRec37[0];
			this.fRec36[2] = this.fRec36[1];
			this.fRec36[1] = this.fRec36[0];
			this.fRec35[2] = this.fRec35[1];
			this.fRec35[1] = this.fRec35[0];
			this.fRec34[2] = this.fRec34[1];
			this.fRec34[1] = this.fRec34[0];
			this.fRec33[1] = this.fRec33[0];
			this.fRec46[2] = this.fRec46[1];
			this.fRec46[1] = this.fRec46[0];
			this.fRec45[2] = this.fRec45[1];
			this.fRec45[1] = this.fRec45[0];
			this.fRec44[2] = this.fRec44[1];
			this.fRec44[1] = this.fRec44[0];
			this.fRec43[2] = this.fRec43[1];
			this.fRec43[1] = this.fRec43[0];
			this.fRec42[2] = this.fRec42[1];
			this.fRec42[1] = this.fRec42[0];
			this.fRec41[2] = this.fRec41[1];
			this.fRec41[1] = this.fRec41[0];
			this.fRec40[1] = this.fRec40[0];
			this.fRec53[2] = this.fRec53[1];
			this.fRec53[1] = this.fRec53[0];
			this.fRec52[2] = this.fRec52[1];
			this.fRec52[1] = this.fRec52[0];
			this.fRec51[2] = this.fRec51[1];
			this.fRec51[1] = this.fRec51[0];
			this.fRec50[2] = this.fRec50[1];
			this.fRec50[1] = this.fRec50[0];
			this.fRec49[2] = this.fRec49[1];
			this.fRec49[1] = this.fRec49[0];
			this.fRec48[2] = this.fRec48[1];
			this.fRec48[1] = this.fRec48[0];
			this.fRec47[1] = this.fRec47[0];
			this.fRec60[2] = this.fRec60[1];
			this.fRec60[1] = this.fRec60[0];
			this.fRec59[2] = this.fRec59[1];
			this.fRec59[1] = this.fRec59[0];
			this.fRec58[2] = this.fRec58[1];
			this.fRec58[1] = this.fRec58[0];
			this.fRec57[2] = this.fRec57[1];
			this.fRec57[1] = this.fRec57[0];
			this.fRec56[2] = this.fRec56[1];
			this.fRec56[1] = this.fRec56[0];
			this.fRec55[2] = this.fRec55[1];
			this.fRec55[1] = this.fRec55[0];
			this.fRec54[1] = this.fRec54[0];
			this.fRec67[2] = this.fRec67[1];
			this.fRec67[1] = this.fRec67[0];
			this.fRec66[2] = this.fRec66[1];
			this.fRec66[1] = this.fRec66[0];
			this.fRec65[2] = this.fRec65[1];
			this.fRec65[1] = this.fRec65[0];
			this.fRec64[2] = this.fRec64[1];
			this.fRec64[1] = this.fRec64[0];
			this.fRec63[2] = this.fRec63[1];
			this.fRec63[1] = this.fRec63[0];
			this.fRec62[2] = this.fRec62[1];
			this.fRec62[1] = this.fRec62[0];
			this.fRec61[1] = this.fRec61[0];
			this.fRec74[2] = this.fRec74[1];
			this.fRec74[1] = this.fRec74[0];
			this.fRec73[2] = this.fRec73[1];
			this.fRec73[1] = this.fRec73[0];
			this.fRec72[2] = this.fRec72[1];
			this.fRec72[1] = this.fRec72[0];
			this.fRec71[2] = this.fRec71[1];
			this.fRec71[1] = this.fRec71[0];
			this.fRec70[2] = this.fRec70[1];
			this.fRec70[1] = this.fRec70[0];
			this.fRec69[2] = this.fRec69[1];
			this.fRec69[1] = this.fRec69[0];
			this.fRec68[1] = this.fRec68[0];
			this.fRec81[2] = this.fRec81[1];
			this.fRec81[1] = this.fRec81[0];
			this.fRec80[2] = this.fRec80[1];
			this.fRec80[1] = this.fRec80[0];
			this.fRec79[2] = this.fRec79[1];
			this.fRec79[1] = this.fRec79[0];
			this.fRec78[2] = this.fRec78[1];
			this.fRec78[1] = this.fRec78[0];
			this.fRec77[2] = this.fRec77[1];
			this.fRec77[1] = this.fRec77[0];
			this.fRec76[2] = this.fRec76[1];
			this.fRec76[1] = this.fRec76[0];
			this.fRec75[1] = this.fRec75[0];
			this.fRec88[2] = this.fRec88[1];
			this.fRec88[1] = this.fRec88[0];
			this.fRec87[2] = this.fRec87[1];
			this.fRec87[1] = this.fRec87[0];
			this.fRec86[2] = this.fRec86[1];
			this.fRec86[1] = this.fRec86[0];
			this.fRec85[2] = this.fRec85[1];
			this.fRec85[1] = this.fRec85[0];
			this.fRec84[2] = this.fRec84[1];
			this.fRec84[1] = this.fRec84[0];
			this.fRec83[2] = this.fRec83[1];
			this.fRec83[1] = this.fRec83[0];
			this.fRec82[1] = this.fRec82[0];
			this.fRec95[2] = this.fRec95[1];
			this.fRec95[1] = this.fRec95[0];
			this.fRec94[2] = this.fRec94[1];
			this.fRec94[1] = this.fRec94[0];
			this.fRec93[2] = this.fRec93[1];
			this.fRec93[1] = this.fRec93[0];
			this.fRec92[2] = this.fRec92[1];
			this.fRec92[1] = this.fRec92[0];
			this.fRec91[2] = this.fRec91[1];
			this.fRec91[1] = this.fRec91[0];
			this.fRec90[2] = this.fRec90[1];
			this.fRec90[1] = this.fRec90[0];
			this.fRec89[1] = this.fRec89[0];
			this.fRec102[2] = this.fRec102[1];
			this.fRec102[1] = this.fRec102[0];
			this.fRec101[2] = this.fRec101[1];
			this.fRec101[1] = this.fRec101[0];
			this.fRec100[2] = this.fRec100[1];
			this.fRec100[1] = this.fRec100[0];
			this.fRec99[2] = this.fRec99[1];
			this.fRec99[1] = this.fRec99[0];
			this.fRec98[2] = this.fRec98[1];
			this.fRec98[1] = this.fRec98[0];
			this.fRec97[2] = this.fRec97[1];
			this.fRec97[1] = this.fRec97[0];
			this.fRec96[1] = this.fRec96[0];
			this.fRec109[2] = this.fRec109[1];
			this.fRec109[1] = this.fRec109[0];
			this.fRec108[2] = this.fRec108[1];
			this.fRec108[1] = this.fRec108[0];
			this.fRec107[2] = this.fRec107[1];
			this.fRec107[1] = this.fRec107[0];
			this.fRec106[2] = this.fRec106[1];
			this.fRec106[1] = this.fRec106[0];
			this.fRec105[2] = this.fRec105[1];
			this.fRec105[1] = this.fRec105[0];
			this.fRec104[2] = this.fRec104[1];
			this.fRec104[1] = this.fRec104[0];
			this.fRec103[1] = this.fRec103[0];
			this.fRec116[2] = this.fRec116[1];
			this.fRec116[1] = this.fRec116[0];
			this.fRec115[2] = this.fRec115[1];
			this.fRec115[1] = this.fRec115[0];
			this.fRec114[2] = this.fRec114[1];
			this.fRec114[1] = this.fRec114[0];
			this.fRec113[2] = this.fRec113[1];
			this.fRec113[1] = this.fRec113[0];
			this.fRec112[2] = this.fRec112[1];
			this.fRec112[1] = this.fRec112[0];
			this.fRec111[2] = this.fRec111[1];
			this.fRec111[1] = this.fRec111[0];
			this.fRec110[1] = this.fRec110[0];
			this.fRec123[2] = this.fRec123[1];
			this.fRec123[1] = this.fRec123[0];
			this.fRec122[2] = this.fRec122[1];
			this.fRec122[1] = this.fRec122[0];
			this.fRec121[2] = this.fRec121[1];
			this.fRec121[1] = this.fRec121[0];
			this.fRec120[2] = this.fRec120[1];
			this.fRec120[1] = this.fRec120[0];
			this.fRec119[2] = this.fRec119[1];
			this.fRec119[1] = this.fRec119[0];
			this.fRec118[2] = this.fRec118[1];
			this.fRec118[1] = this.fRec118[0];
			this.fRec117[1] = this.fRec117[0];
			this.fRec127[2] = this.fRec127[1];
			this.fRec127[1] = this.fRec127[0];
			this.fRec126[2] = this.fRec126[1];
			this.fRec126[1] = this.fRec126[0];
			this.fRec125[2] = this.fRec125[1];
			this.fRec125[1] = this.fRec125[0];
			this.fRec124[1] = this.fRec124[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_virtual_analog_oscillators = function(obj) 
{
    function process_aux_virtual_analog_oscillators(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_virtual_analog_oscillators;
}

function create_virtual_analog_oscillators(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new virtual_analog_oscillators();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_virtual_analog_oscillators(this);
    
    return this.processor;
}
//Osci Guts---------------------------------------------------------------------
function osciSIG0() {
	
	this.iRec1 = new Int32Array(2);
	
	
	this.getNumInputs = function() {
		return 0;
		
	}
	this.getNumOutputs = function() {
		return 1;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 0;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.instanceInitosciSIG0 = function(samplingFreq) {
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec1[i] = 0;
			
		}
		
	}
	
	this.fillosciSIG0 = function(count, output) {
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iRec1[0] = (1 + this.iRec1[1]);
			output[i] = Math.sin((9.58738e-05 * (this.iRec1[0] - 1)));
			this.iRec1[1] = this.iRec1[0];
			
		}
		
	}
}

newosciSIG0 = function() { return new osciSIG0(); }

var ftbl0osciSIG0 = new Float32Array(65537);

function osci() {
	
	this.fRec2 = new Float32Array(2);
	this.fRec0 = new Float32Array(2);
	this.fhslider0;
	this.fSamplingFreq;
	this.fConst0;
	this.fhslider1;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2009");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "osci");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 0;
		
	}
	this.getNumOutputs = function() {
		return 1;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
		var sig0 = newosciSIG0();
		sig0.instanceInitosciSIG0(samplingFreq);
		sig0.fillosciSIG0(65537, ftbl0osciSIG0);
		
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		this.fConst0 = (1 / Math.min(192000, Math.max(1, this.fSamplingFreq)));
		this.fhslider1 = 1000;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("Oscillator");
		ui_interface.declare("fhslider1", "unit", "Hz");
		ui_interface.addHorizontalSlider("freq", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 1000, 20, 24000, 1);
		ui_interface.declare("fhslider0", "unit", "dB");
		ui_interface.addHorizontalSlider("volume", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 0, -96, 0, 0.1);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var output0 = outputs[0];
		var fSlow0 = (0.001 * Math.pow(10, (0.05 * this.fhslider0)));
		var fSlow1 = (this.fConst0 * this.fhslider1);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.fRec0[0] = ((0.999 * this.fRec0[1]) + fSlow0);
			var fTemp0 = (this.fRec2[1] + fSlow1);
			this.fRec2[0] = (fTemp0 - Math.floor(fTemp0));
			var fTemp1 = (65536 * this.fRec2[0]);
			var iTemp2 = fTemp1;
			var fTemp3 = ftbl0osciSIG0[iTemp2];
			output0[i] = (this.fRec0[0] * (fTemp3 + ((fTemp1 - Math.floor(fTemp1)) * (ftbl0osciSIG0[(1 + iTemp2)] - fTemp3))));
			this.fRec0[1] = this.fRec0[0];
			this.fRec2[1] = this.fRec2[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_osci = function(obj) 
{
    function process_aux_osci(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_osci;
}

function create_osci(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new osci();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_osci(this);
    
    return this.processor;
}
//Harp Guts-------------------------------------------------------------------------
function harpe() {
	
	this.fRec22 = new Float32Array(3);
	this.fVec21 = new Float32Array(32);
	this.fRec23 = new Float32Array(2);
	this.iVec20 = new Int32Array(2);
	this.fRec20 = new Float32Array(3);
	this.fVec19 = new Float32Array(32);
	this.fRec21 = new Float32Array(2);
	this.iVec18 = new Int32Array(2);
	this.fRec18 = new Float32Array(3);
	this.fVec17 = new Float32Array(64);
	this.fRec19 = new Float32Array(2);
	this.iVec16 = new Int32Array(2);
	this.fRec16 = new Float32Array(3);
	this.fVec15 = new Float32Array(64);
	this.fRec17 = new Float32Array(2);
	this.iVec14 = new Int32Array(2);
	this.fRec14 = new Float32Array(3);
	this.fVec13 = new Float32Array(64);
	this.fRec15 = new Float32Array(2);
	this.iVec12 = new Int32Array(2);
	this.fRec12 = new Float32Array(3);
	this.fVec11 = new Float32Array(64);
	this.fRec13 = new Float32Array(2);
	this.iVec10 = new Int32Array(2);
	this.fRec10 = new Float32Array(3);
	this.fVec9 = new Float32Array(64);
	this.fRec11 = new Float32Array(2);
	this.iVec8 = new Int32Array(2);
	this.fRec8 = new Float32Array(3);
	this.fVec7 = new Float32Array(128);
	this.fRec9 = new Float32Array(2);
	this.iVec6 = new Int32Array(2);
	this.fRec6 = new Float32Array(3);
	this.fVec5 = new Float32Array(128);
	this.fRec7 = new Float32Array(2);
	this.iVec4 = new Int32Array(2);
	this.fRec4 = new Float32Array(3);
	this.fVec3 = new Float32Array(128);
	this.fRec5 = new Float32Array(2);
	this.iVec2 = new Int32Array(2);
	this.fRec0 = new Float32Array(3);
	this.fVec1 = new Float32Array(128);
	this.fRec2 = new Float32Array(2);
	this.iVec0 = new Int32Array(2);
	this.fRec3 = new Float32Array(2);
	this.iRec1 = new Int32Array(2);
	this.fhslider0;
	this.fhslider1;
	this.fhslider2;
	this.IOTA;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("name", "Harpe");
	}

	this.getNumInputs = function() {
		return 0;
		
	}
	this.getNumOutputs = function() {
		return 2;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 0.005;
		this.fhslider1 = 0.5;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec1[i] = 0;
			
		}
		this.fhslider2 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec3[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec0[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		this.IOTA = 0;
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec1[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec2[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec5[i] = 0;
			
		}
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec3[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec4[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec4[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec7[i] = 0;
			
		}
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec5[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec6[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec6[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec9[i] = 0;
			
		}
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec7[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec8[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec8[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec11[i] = 0;
			
		}
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec9[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec10[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec10[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec13[i] = 0;
			
		}
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec11[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec12[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec12[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec15[i] = 0;
			
		}
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec13[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec14[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec14[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec17[i] = 0;
			
		}
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec15[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec16[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec16[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec19[i] = 0;
			
		}
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec17[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec18[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec18[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec21[i] = 0;
			
		}
		for (var i = 0; (i < 32); i = (i + 1)) {
			this.fVec19[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec20[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec20[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec23[i] = 0;
			
		}
		for (var i = 0; (i < 32); i = (i + 1)) {
			this.fVec21[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec22[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("harpe");
		ui_interface.declare("fhslider0", "osc", "/1/fader3");
		ui_interface.addHorizontalSlider("attenuation", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 0.005, 0, 0.01, 0.001);
		ui_interface.declare("fhslider2", "osc", "/accxyz/1 -10 10");
		ui_interface.addHorizontalSlider("hand", function handler(obj) { function setval(val) { obj.fhslider2 = val; } return setval; }(this), 0, 0, 1, 0.01);
		ui_interface.declare("fhslider1", "osc", "/accxyz/0 -10 10");
		ui_interface.declare("fhslider1", "unit", "f");
		ui_interface.addHorizontalSlider("level", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 0.5, 0, 1, 0.01);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = (0.5 * (1 - this.fhslider0));
		var fSlow1 = (4.65661e-10 * faustpower2_f(this.fhslider1));
		var fSlow2 = (0.1 * this.fhslider2);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iRec1[0] = (12345 + (1103515245 * this.iRec1[1]));
			this.fRec3[0] = ((0.9 * this.fRec3[1]) + fSlow2);
			var fTemp0 = Math.min(this.fRec3[0], this.fRec3[1]);
			var fTemp1 = Math.max(this.fRec3[0], this.fRec3[1]);
			var iTemp2 = ((fTemp0 < 0.0454545) & (0.0454545 < fTemp1));
			this.iVec0[0] = iTemp2;
			this.fRec2[0] = ((this.fRec2[1] + ((iTemp2 - this.iVec0[1]) > 0)) - (0.00997732 * (this.fRec2[1] > 0)));
			this.fVec1[(this.IOTA & 127)] = ((fSlow0 * (this.fRec0[1] + this.fRec0[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec2[0] > 0))));
			this.fRec0[0] = this.fVec1[((this.IOTA - 99) & 127)];
			var iTemp3 = ((fTemp0 < 0.136364) & (0.136364 < fTemp1));
			this.iVec2[0] = iTemp3;
			this.fRec5[0] = ((this.fRec5[1] + ((iTemp3 - this.iVec2[1]) > 0)) - (0.0114609 * (this.fRec5[1] > 0)));
			this.fVec3[(this.IOTA & 127)] = ((fSlow0 * (this.fRec4[1] + this.fRec4[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec5[0] > 0))));
			this.fRec4[0] = this.fVec3[((this.IOTA - 86) & 127)];
			var iTemp4 = ((fTemp0 < 0.227273) & (0.227273 < fTemp1));
			this.iVec4[0] = iTemp4;
			this.fRec7[0] = ((this.fRec7[1] + ((iTemp4 - this.iVec4[1]) > 0)) - (0.0131652 * (this.fRec7[1] > 0)));
			this.fVec5[(this.IOTA & 127)] = ((fSlow0 * (this.fRec6[1] + this.fRec6[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec7[0] > 0))));
			this.fRec6[0] = this.fVec5[((this.IOTA - 74) & 127)];
			var iTemp5 = ((fTemp0 < 0.318182) & (0.318182 < fTemp1));
			this.iVec6[0] = iTemp5;
			this.fRec9[0] = ((this.fRec9[1] + ((iTemp5 - this.iVec6[1]) > 0)) - (0.0151228 * (this.fRec9[1] > 0)));
			this.fVec7[(this.IOTA & 127)] = ((fSlow0 * (this.fRec8[1] + this.fRec8[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec9[0] > 0))));
			this.fRec8[0] = this.fVec7[((this.IOTA - 65) & 127)];
			var iTemp6 = ((fTemp0 < 0.409091) & (0.409091 < fTemp1));
			this.iVec8[0] = iTemp6;
			this.fRec11[0] = ((this.fRec11[1] + ((iTemp6 - this.iVec8[1]) > 0)) - (0.0173715 * (this.fRec11[1] > 0)));
			this.fVec9[(this.IOTA & 63)] = ((fSlow0 * (this.fRec10[1] + this.fRec10[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec11[0] > 0))));
			this.fRec10[0] = this.fVec9[((this.IOTA - 56) & 63)];
			var iTemp7 = ((fTemp0 < 0.5) & (0.5 < fTemp1));
			this.iVec10[0] = iTemp7;
			this.fRec13[0] = ((this.fRec13[1] + ((iTemp7 - this.iVec10[1]) > 0)) - (0.0199546 * (this.fRec13[1] > 0)));
			this.fVec11[(this.IOTA & 63)] = ((fSlow0 * (this.fRec12[1] + this.fRec12[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec13[0] > 0))));
			this.fRec12[0] = this.fVec11[((this.IOTA - 49) & 63)];
			var fTemp8 = (0.707107 * this.fRec12[0]);
			var iTemp9 = ((fTemp0 < 0.590909) & (0.590909 < fTemp1));
			this.iVec12[0] = iTemp9;
			this.fRec15[0] = ((this.fRec15[1] + ((iTemp9 - this.iVec12[1]) > 0)) - (0.0229219 * (this.fRec15[1] > 0)));
			this.fVec13[(this.IOTA & 63)] = ((fSlow0 * (this.fRec14[1] + this.fRec14[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec15[0] > 0))));
			this.fRec14[0] = this.fVec13[((this.IOTA - 42) & 63)];
			var iTemp10 = ((fTemp0 < 0.681818) & (0.681818 < fTemp1));
			this.iVec14[0] = iTemp10;
			this.fRec17[0] = ((this.fRec17[1] + ((iTemp10 - this.iVec14[1]) > 0)) - (0.0263303 * (this.fRec17[1] > 0)));
			this.fVec15[(this.IOTA & 63)] = ((fSlow0 * (this.fRec16[1] + this.fRec16[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec17[0] > 0))));
			this.fRec16[0] = this.fVec15[((this.IOTA - 36) & 63)];
			var iTemp11 = ((fTemp0 < 0.772727) & (0.772727 < fTemp1));
			this.iVec16[0] = iTemp11;
			this.fRec19[0] = ((this.fRec19[1] + ((iTemp11 - this.iVec16[1]) > 0)) - (0.0302456 * (this.fRec19[1] > 0)));
			this.fVec17[(this.IOTA & 63)] = ((fSlow0 * (this.fRec18[1] + this.fRec18[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec19[0] > 0))));
			this.fRec18[0] = this.fVec17[((this.IOTA - 32) & 63)];
			var iTemp12 = ((fTemp0 < 0.863636) & (0.863636 < fTemp1));
			this.iVec18[0] = iTemp12;
			this.fRec21[0] = ((this.fRec21[1] + ((iTemp12 - this.iVec18[1]) > 0)) - (0.0347431 * (this.fRec21[1] > 0)));
			this.fVec19[(this.IOTA & 31)] = ((fSlow0 * (this.fRec20[1] + this.fRec20[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec21[0] > 0))));
			this.fRec20[0] = this.fVec19[((this.IOTA - 27) & 31)];
			var iTemp13 = ((fTemp0 < 0.954545) & (0.954545 < fTemp1));
			this.iVec20[0] = iTemp13;
			this.fRec23[0] = ((this.fRec23[1] + ((iTemp13 - this.iVec20[1]) > 0)) - (0.0399093 * (this.fRec23[1] > 0)));
			this.fVec21[(this.IOTA & 31)] = ((fSlow0 * (this.fRec22[1] + this.fRec22[2])) + (fSlow1 * (this.iRec1[0] * (this.fRec23[0] > 0))));
			this.fRec22[0] = this.fVec21[((this.IOTA - 24) & 31)];
			output0[i] = (((((((((((0.977008 * this.fRec0[0]) + (0.92932 * this.fRec4[0])) + (0.879049 * this.fRec6[0])) + (0.825723 * this.fRec8[0])) + (0.768706 * this.fRec10[0])) + fTemp8) + (0.639602 * this.fRec14[0])) + (0.564076 * this.fRec16[0])) + (0.476731 * this.fRec18[0])) + (0.369274 * this.fRec20[0])) + (0.213201 * this.fRec22[0]));
			output1[i] = ((0.977008 * this.fRec22[0]) + ((0.92932 * this.fRec20[0]) + ((0.879049 * this.fRec18[0]) + ((0.825723 * this.fRec16[0]) + ((0.768706 * this.fRec14[0]) + (fTemp8 + (((((0.213201 * this.fRec0[0]) + (0.369274 * this.fRec4[0])) + (0.476731 * this.fRec6[0])) + (0.564076 * this.fRec8[0])) + (0.639602 * this.fRec10[0]))))))));
			this.iRec1[1] = this.iRec1[0];
			this.fRec3[1] = this.fRec3[0];
			this.iVec0[1] = this.iVec0[0];
			this.fRec2[1] = this.fRec2[0];
			this.IOTA = (this.IOTA + 1);
			this.fRec0[2] = this.fRec0[1];
			this.fRec0[1] = this.fRec0[0];
			this.iVec2[1] = this.iVec2[0];
			this.fRec5[1] = this.fRec5[0];
			this.fRec4[2] = this.fRec4[1];
			this.fRec4[1] = this.fRec4[0];
			this.iVec4[1] = this.iVec4[0];
			this.fRec7[1] = this.fRec7[0];
			this.fRec6[2] = this.fRec6[1];
			this.fRec6[1] = this.fRec6[0];
			this.iVec6[1] = this.iVec6[0];
			this.fRec9[1] = this.fRec9[0];
			this.fRec8[2] = this.fRec8[1];
			this.fRec8[1] = this.fRec8[0];
			this.iVec8[1] = this.iVec8[0];
			this.fRec11[1] = this.fRec11[0];
			this.fRec10[2] = this.fRec10[1];
			this.fRec10[1] = this.fRec10[0];
			this.iVec10[1] = this.iVec10[0];
			this.fRec13[1] = this.fRec13[0];
			this.fRec12[2] = this.fRec12[1];
			this.fRec12[1] = this.fRec12[0];
			this.iVec12[1] = this.iVec12[0];
			this.fRec15[1] = this.fRec15[0];
			this.fRec14[2] = this.fRec14[1];
			this.fRec14[1] = this.fRec14[0];
			this.iVec14[1] = this.iVec14[0];
			this.fRec17[1] = this.fRec17[0];
			this.fRec16[2] = this.fRec16[1];
			this.fRec16[1] = this.fRec16[0];
			this.iVec16[1] = this.iVec16[0];
			this.fRec19[1] = this.fRec19[0];
			this.fRec18[2] = this.fRec18[1];
			this.fRec18[1] = this.fRec18[0];
			this.iVec18[1] = this.iVec18[0];
			this.fRec21[1] = this.fRec21[0];
			this.fRec20[2] = this.fRec20[1];
			this.fRec20[1] = this.fRec20[0];
			this.iVec20[1] = this.iVec20[0];
			this.fRec23[1] = this.fRec23[0];
			this.fRec22[2] = this.fRec22[1];
			this.fRec22[1] = this.fRec22[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_harpe = function(obj) 
{
    function process_aux_harpe(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_harpe;
}

function create_harpe(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new harpe();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_harpe(this);
    
    return this.processor;
}

//EFFECTS//////////////////////////////////////////////////////////////////////
//Freeverb Guts-----------------------------------------------------------------
function freeverb() {
	
	this.fRec24 = new Float32Array(2);
	this.fVec23 = new Float32Array(256);
	this.fRec26 = new Float32Array(2);
	this.fVec22 = new Float32Array(512);
	this.fRec28 = new Float32Array(2);
	this.fVec21 = new Float32Array(512);
	this.fRec30 = new Float32Array(2);
	this.fVec20 = new Float32Array(1024);
	this.fRec46 = new Float32Array(2);
	this.fVec19 = new Float32Array(2048);
	this.fRec47 = new Float32Array(2);
	this.fRec44 = new Float32Array(2);
	this.fVec18 = new Float32Array(2048);
	this.fRec45 = new Float32Array(2);
	this.fRec42 = new Float32Array(2);
	this.fVec17 = new Float32Array(2048);
	this.fRec43 = new Float32Array(2);
	this.fRec40 = new Float32Array(2);
	this.fVec16 = new Float32Array(2048);
	this.fRec41 = new Float32Array(2);
	this.fRec38 = new Float32Array(2);
	this.fVec15 = new Float32Array(2048);
	this.fRec39 = new Float32Array(2);
	this.fRec36 = new Float32Array(2);
	this.fVec14 = new Float32Array(2048);
	this.fRec37 = new Float32Array(2);
	this.fRec34 = new Float32Array(2);
	this.fVec13 = new Float32Array(2048);
	this.fRec35 = new Float32Array(2);
	this.fRec32 = new Float32Array(2);
	this.fVec12 = new Float32Array(2048);
	this.fRec33 = new Float32Array(2);
	this.fRec0 = new Float32Array(2);
	this.fVec11 = new Float32Array(256);
	this.fRec2 = new Float32Array(2);
	this.fVec10 = new Float32Array(512);
	this.fRec4 = new Float32Array(2);
	this.fVec9 = new Float32Array(512);
	this.fRec6 = new Float32Array(2);
	this.fVec8 = new Float32Array(1024);
	this.fRec22 = new Float32Array(2);
	this.fVec7 = new Float32Array(2048);
	this.fRec23 = new Float32Array(2);
	this.fRec20 = new Float32Array(2);
	this.fVec6 = new Float32Array(2048);
	this.fRec21 = new Float32Array(2);
	this.fRec18 = new Float32Array(2);
	this.fVec5 = new Float32Array(2048);
	this.fRec19 = new Float32Array(2);
	this.fRec16 = new Float32Array(2);
	this.fVec4 = new Float32Array(2048);
	this.fRec17 = new Float32Array(2);
	this.fRec14 = new Float32Array(2);
	this.fVec3 = new Float32Array(2048);
	this.fRec15 = new Float32Array(2);
	this.fRec12 = new Float32Array(2);
	this.fVec2 = new Float32Array(2048);
	this.fRec13 = new Float32Array(2);
	this.fRec10 = new Float32Array(2);
	this.fVec1 = new Float32Array(2048);
	this.fRec11 = new Float32Array(2);
	this.fRec8 = new Float32Array(2);
	this.fVec0 = new Float32Array(2048);
	this.fRec9 = new Float32Array(2);
	this.fhslider0;
	this.fhslider1;
	this.fhslider2;
	this.IOTA;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c) GRAME 2006");
		m.declare("license", "BSD");
		m.declare("name", "freeverb");
		m.declare("reference", "https://ccrma.stanford.edu/~jos/pasp/Freeverb.html");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 2;
		
	}
	this.getNumOutputs = function() {
		return 2;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 0.3333;
		this.fhslider1 = 0.5;
		this.fhslider2 = 0.5;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec9[i] = 0;
			
		}
		this.IOTA = 0;
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec0[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec8[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec11[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec1[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec10[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec13[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec2[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec12[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec15[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec3[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec14[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec17[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec4[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec16[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec19[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec5[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec18[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec21[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec6[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec20[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec23[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec7[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec22[i] = 0;
			
		}
		for (var i = 0; (i < 1024); i = (i + 1)) {
			this.fVec8[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec6[i] = 0;
			
		}
		for (var i = 0; (i < 512); i = (i + 1)) {
			this.fVec9[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec4[i] = 0;
			
		}
		for (var i = 0; (i < 512); i = (i + 1)) {
			this.fVec10[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		for (var i = 0; (i < 256); i = (i + 1)) {
			this.fVec11[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec33[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec12[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec32[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec35[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec13[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec34[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec37[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec14[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec36[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec39[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec15[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec38[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec41[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec16[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec40[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec43[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec17[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec42[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec45[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec18[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec44[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec47[i] = 0;
			
		}
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec19[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec46[i] = 0;
			
		}
		for (var i = 0; (i < 1024); i = (i + 1)) {
			this.fVec20[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec30[i] = 0;
			
		}
		for (var i = 0; (i < 512); i = (i + 1)) {
			this.fVec21[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec28[i] = 0;
			
		}
		for (var i = 0; (i < 512); i = (i + 1)) {
			this.fVec22[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec26[i] = 0;
			
		}
		for (var i = 0; (i < 256); i = (i + 1)) {
			this.fVec23[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec24[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("Freeverb");
		ui_interface.addHorizontalSlider("Damp", function handler(obj) { function setval(val) { obj.fhslider2 = val; } return setval; }(this), 0.5, 0, 1, 0.025);
		ui_interface.addHorizontalSlider("RoomSize", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 0.5, 0, 1, 0.025);
		ui_interface.addHorizontalSlider("Wet", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 0.3333, 0, 1, 0.025);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var input1 = inputs[1];
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = this.fhslider0;
		var fSlow1 = (0.7 + (0.28 * this.fhslider1));
		var fSlow2 = (0.4 * this.fhslider2);
		var fSlow3 = (1 - fSlow2);
		var fSlow4 = (1 - fSlow0);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.fRec9[0] = ((fSlow2 * this.fRec9[1]) + (fSlow3 * this.fRec8[1]));
			var fTemp0 = input0[i];
			var fTemp1 = input1[i];
			var fTemp2 = (0.015 * (fTemp0 + fTemp1));
			this.fVec0[(this.IOTA & 2047)] = ((fSlow1 * this.fRec9[0]) + fTemp2);
			this.fRec8[0] = this.fVec0[((this.IOTA - 1116) & 2047)];
			this.fRec11[0] = ((fSlow2 * this.fRec11[1]) + (fSlow3 * this.fRec10[1]));
			this.fVec1[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec11[0]));
			this.fRec10[0] = this.fVec1[((this.IOTA - 1188) & 2047)];
			this.fRec13[0] = ((fSlow2 * this.fRec13[1]) + (fSlow3 * this.fRec12[1]));
			this.fVec2[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec13[0]));
			this.fRec12[0] = this.fVec2[((this.IOTA - 1277) & 2047)];
			this.fRec15[0] = ((fSlow2 * this.fRec15[1]) + (fSlow3 * this.fRec14[1]));
			this.fVec3[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec15[0]));
			this.fRec14[0] = this.fVec3[((this.IOTA - 1356) & 2047)];
			this.fRec17[0] = ((fSlow2 * this.fRec17[1]) + (fSlow3 * this.fRec16[1]));
			this.fVec4[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec17[0]));
			this.fRec16[0] = this.fVec4[((this.IOTA - 1422) & 2047)];
			this.fRec19[0] = ((fSlow2 * this.fRec19[1]) + (fSlow3 * this.fRec18[1]));
			this.fVec5[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec19[0]));
			this.fRec18[0] = this.fVec5[((this.IOTA - 1491) & 2047)];
			this.fRec21[0] = ((fSlow2 * this.fRec21[1]) + (fSlow3 * this.fRec20[1]));
			this.fVec6[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec21[0]));
			this.fRec20[0] = this.fVec6[((this.IOTA - 1557) & 2047)];
			this.fRec23[0] = ((fSlow2 * this.fRec23[1]) + (fSlow3 * this.fRec22[1]));
			this.fVec7[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec23[0]));
			this.fRec22[0] = this.fVec7[((this.IOTA - 1617) & 2047)];
			var fTemp3 = (((((((this.fRec8[0] + this.fRec10[0]) + this.fRec12[0]) + this.fRec14[0]) + this.fRec16[0]) + this.fRec18[0]) + this.fRec20[0]) + this.fRec22[0]);
			this.fVec8[(this.IOTA & 1023)] = (fTemp3 + (0.5 * this.fRec6[1]));
			this.fRec6[0] = this.fVec8[((this.IOTA - 556) & 1023)];
			var fRec7 = (0 - (fTemp3 - this.fRec6[1]));
			this.fVec9[(this.IOTA & 511)] = (fRec7 + (0.5 * this.fRec4[1]));
			this.fRec4[0] = this.fVec9[((this.IOTA - 441) & 511)];
			var fRec5 = (this.fRec4[1] - fRec7);
			this.fVec10[(this.IOTA & 511)] = (fRec5 + (0.5 * this.fRec2[1]));
			this.fRec2[0] = this.fVec10[((this.IOTA - 341) & 511)];
			var fRec3 = (this.fRec2[1] - fRec5);
			this.fVec11[(this.IOTA & 255)] = (fRec3 + (0.5 * this.fRec0[1]));
			this.fRec0[0] = this.fVec11[((this.IOTA - 225) & 255)];
			var fRec1 = (this.fRec0[1] - fRec3);
			output0[i] = ((fSlow0 * fRec1) + (fSlow4 * fTemp0));
			this.fRec33[0] = ((fSlow2 * this.fRec33[1]) + (fSlow3 * this.fRec32[1]));
			this.fVec12[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec33[0]));
			this.fRec32[0] = this.fVec12[((this.IOTA - 1139) & 2047)];
			this.fRec35[0] = ((fSlow2 * this.fRec35[1]) + (fSlow3 * this.fRec34[1]));
			this.fVec13[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec35[0]));
			this.fRec34[0] = this.fVec13[((this.IOTA - 1211) & 2047)];
			this.fRec37[0] = ((fSlow2 * this.fRec37[1]) + (fSlow3 * this.fRec36[1]));
			this.fVec14[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec37[0]));
			this.fRec36[0] = this.fVec14[((this.IOTA - 1300) & 2047)];
			this.fRec39[0] = ((fSlow2 * this.fRec39[1]) + (fSlow3 * this.fRec38[1]));
			this.fVec15[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec39[0]));
			this.fRec38[0] = this.fVec15[((this.IOTA - 1379) & 2047)];
			this.fRec41[0] = ((fSlow2 * this.fRec41[1]) + (fSlow3 * this.fRec40[1]));
			this.fVec16[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec41[0]));
			this.fRec40[0] = this.fVec16[((this.IOTA - 1445) & 2047)];
			this.fRec43[0] = ((fSlow2 * this.fRec43[1]) + (fSlow3 * this.fRec42[1]));
			this.fVec17[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec43[0]));
			this.fRec42[0] = this.fVec17[((this.IOTA - 1514) & 2047)];
			this.fRec45[0] = ((fSlow2 * this.fRec45[1]) + (fSlow3 * this.fRec44[1]));
			this.fVec18[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec45[0]));
			this.fRec44[0] = this.fVec18[((this.IOTA - 1580) & 2047)];
			this.fRec47[0] = ((fSlow2 * this.fRec47[1]) + (fSlow3 * this.fRec46[1]));
			this.fVec19[(this.IOTA & 2047)] = (fTemp2 + (fSlow1 * this.fRec47[0]));
			this.fRec46[0] = this.fVec19[((this.IOTA - 1640) & 2047)];
			var fTemp4 = (((((((this.fRec32[0] + this.fRec34[0]) + this.fRec36[0]) + this.fRec38[0]) + this.fRec40[0]) + this.fRec42[0]) + this.fRec44[0]) + this.fRec46[0]);
			this.fVec20[(this.IOTA & 1023)] = (fTemp4 + (0.5 * this.fRec30[1]));
			this.fRec30[0] = this.fVec20[((this.IOTA - 579) & 1023)];
			var fRec31 = (0 - (fTemp4 - this.fRec30[1]));
			this.fVec21[(this.IOTA & 511)] = (fRec31 + (0.5 * this.fRec28[1]));
			this.fRec28[0] = this.fVec21[((this.IOTA - 464) & 511)];
			var fRec29 = (this.fRec28[1] - fRec31);
			this.fVec22[(this.IOTA & 511)] = (fRec29 + (0.5 * this.fRec26[1]));
			this.fRec26[0] = this.fVec22[((this.IOTA - 364) & 511)];
			var fRec27 = (this.fRec26[1] - fRec29);
			this.fVec23[(this.IOTA & 255)] = (fRec27 + (0.5 * this.fRec24[1]));
			this.fRec24[0] = this.fVec23[((this.IOTA - 248) & 255)];
			var fRec25 = (this.fRec24[1] - fRec27);
			output1[i] = ((fSlow0 * fRec25) + (fSlow4 * fTemp1));
			this.fRec9[1] = this.fRec9[0];
			this.IOTA = (this.IOTA + 1);
			this.fRec8[1] = this.fRec8[0];
			this.fRec11[1] = this.fRec11[0];
			this.fRec10[1] = this.fRec10[0];
			this.fRec13[1] = this.fRec13[0];
			this.fRec12[1] = this.fRec12[0];
			this.fRec15[1] = this.fRec15[0];
			this.fRec14[1] = this.fRec14[0];
			this.fRec17[1] = this.fRec17[0];
			this.fRec16[1] = this.fRec16[0];
			this.fRec19[1] = this.fRec19[0];
			this.fRec18[1] = this.fRec18[0];
			this.fRec21[1] = this.fRec21[0];
			this.fRec20[1] = this.fRec20[0];
			this.fRec23[1] = this.fRec23[0];
			this.fRec22[1] = this.fRec22[0];
			this.fRec6[1] = this.fRec6[0];
			this.fRec4[1] = this.fRec4[0];
			this.fRec2[1] = this.fRec2[0];
			this.fRec0[1] = this.fRec0[0];
			this.fRec33[1] = this.fRec33[0];
			this.fRec32[1] = this.fRec32[0];
			this.fRec35[1] = this.fRec35[0];
			this.fRec34[1] = this.fRec34[0];
			this.fRec37[1] = this.fRec37[0];
			this.fRec36[1] = this.fRec36[0];
			this.fRec39[1] = this.fRec39[0];
			this.fRec38[1] = this.fRec38[0];
			this.fRec41[1] = this.fRec41[0];
			this.fRec40[1] = this.fRec40[0];
			this.fRec43[1] = this.fRec43[0];
			this.fRec42[1] = this.fRec42[0];
			this.fRec45[1] = this.fRec45[0];
			this.fRec44[1] = this.fRec44[0];
			this.fRec47[1] = this.fRec47[0];
			this.fRec46[1] = this.fRec46[0];
			this.fRec30[1] = this.fRec30[0];
			this.fRec28[1] = this.fRec28[0];
			this.fRec26[1] = this.fRec26[0];
			this.fRec24[1] = this.fRec24[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_freeverb = function(obj) 
{
    function process_aux_freeverb(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_freeverb;
}

function create_freeverb(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new freeverb();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_freeverb(this);
    
    return this.processor;
}
//MultiBandFilter Guts--------------------------------------------------------------
this.faustpower2_f = function(value) {
	return (value * value);
	
}

function multibandfilter() {
	
	this.fRec0 = new Float32Array(3);
	this.fRec1 = new Float32Array(3);
	this.fRec2 = new Float32Array(3);
	this.fRec3 = new Float32Array(3);
	this.fRec4 = new Float32Array(3);
	this.fRec5 = new Float32Array(3);
	this.fRec6 = new Float32Array(3);
	this.fRec7 = new Float32Array(3);
	this.fRec8 = new Float32Array(3);
	this.fRec9 = new Float32Array(3);
	this.fSamplingFreq;
	this.fConst0;
	this.fentry0;
	this.fvslider0;
	this.fentry1;
	this.fentry2;
	this.fvslider1;
	this.fentry3;
	this.fentry4;
	this.fvslider2;
	this.fentry5;
	this.fentry6;
	this.fvslider3;
	this.fentry7;
	this.fentry8;
	this.fvslider4;
	this.fentry9;
	this.fentry10;
	this.fvslider5;
	this.fentry11;
	this.fentry12;
	this.fvslider6;
	this.fentry13;
	this.fentry14;
	this.fvslider7;
	this.fentry15;
	this.fentry16;
	this.fvslider8;
	this.fentry17;
	this.fentry18;
	this.fvslider9;
	this.fentry19;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("bandfilter.dsp/author", "Grame");
		m.declare("bandfilter.dsp/copyright", "(c)GRAME 2006");
		m.declare("bandfilter.dsp/license", "BSD");
		m.declare("bandfilter.dsp/name", "bandfilter");
		m.declare("bandfilter.dsp/version", "1.0");
		m.declare("copyright", "(c)GRAME 2006");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "multibandfilter");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 1;
		
	}
	this.getNumOutputs = function() {
		return 1;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fConst0 = (3.14159 / Math.min(192000, Math.max(1, this.fSamplingFreq)));
		this.fentry0 = 10000;
		this.fvslider0 = 0;
		this.fentry1 = 50;
		this.fentry2 = 9000;
		this.fvslider1 = 0;
		this.fentry3 = 50;
		this.fentry4 = 8000;
		this.fvslider2 = 0;
		this.fentry5 = 50;
		this.fentry6 = 7000;
		this.fvslider3 = 0;
		this.fentry7 = 50;
		this.fentry8 = 6000;
		this.fvslider4 = 0;
		this.fentry9 = 50;
		this.fentry10 = 5000;
		this.fvslider5 = 0;
		this.fentry11 = 50;
		this.fentry12 = 4000;
		this.fvslider6 = 0;
		this.fentry13 = 50;
		this.fentry14 = 3000;
		this.fvslider7 = 0;
		this.fentry15 = 50;
		this.fentry16 = 2000;
		this.fvslider8 = 0;
		this.fentry17 = 50;
		this.fentry18 = 1000;
		this.fvslider9 = 0;
		this.fentry19 = 50;
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec9[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec8[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec7[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec6[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec5[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec4[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec3[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec1[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openHorizontalBox("Multi Band Filter");
		ui_interface.openVerticalBox("peak 0");
		ui_interface.declare("fentry19", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry19 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry18", "style", "knob");
		ui_interface.declare("fentry18", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry18 = val; } return setval; }(this), 1000, 20, 20000, 1);
		ui_interface.declare("fvslider9", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider9 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		ui_interface.openVerticalBox("peak 1");
		ui_interface.declare("fentry17", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry17 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry16", "style", "knob");
		ui_interface.declare("fentry16", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry16 = val; } return setval; }(this), 2000, 20, 20000, 1);
		ui_interface.declare("fvslider8", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider8 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		ui_interface.openVerticalBox("peak 2");
		ui_interface.declare("fentry15", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry15 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry14", "style", "knob");
		ui_interface.declare("fentry14", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry14 = val; } return setval; }(this), 3000, 20, 20000, 1);
		ui_interface.declare("fvslider7", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider7 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		ui_interface.openVerticalBox("peak 3");
		ui_interface.declare("fentry13", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry13 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry12", "style", "knob");
		ui_interface.declare("fentry12", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry12 = val; } return setval; }(this), 4000, 20, 20000, 1);
		ui_interface.declare("fvslider6", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider6 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		ui_interface.openVerticalBox("peak 4");
		ui_interface.declare("fentry11", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry11 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry10", "style", "knob");
		ui_interface.declare("fentry10", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry10 = val; } return setval; }(this), 5000, 20, 20000, 1);
		ui_interface.declare("fvslider5", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider5 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		ui_interface.openVerticalBox("peak 5");
		ui_interface.declare("fentry9", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry9 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry8", "style", "knob");
		ui_interface.declare("fentry8", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry8 = val; } return setval; }(this), 6000, 20, 20000, 1);
		ui_interface.declare("fvslider4", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider4 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		ui_interface.openVerticalBox("peak 6");
		ui_interface.declare("fentry7", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry7 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry6", "style", "knob");
		ui_interface.declare("fentry6", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry6 = val; } return setval; }(this), 7000, 20, 20000, 1);
		ui_interface.declare("fvslider3", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider3 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		ui_interface.openVerticalBox("peak 7");
		ui_interface.declare("fentry5", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry5 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry4", "style", "knob");
		ui_interface.declare("fentry4", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry4 = val; } return setval; }(this), 8000, 20, 20000, 1);
		ui_interface.declare("fvslider2", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider2 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		ui_interface.openVerticalBox("peak 8");
		ui_interface.declare("fentry3", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry3 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry2", "style", "knob");
		ui_interface.declare("fentry2", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry2 = val; } return setval; }(this), 9000, 20, 20000, 1);
		ui_interface.declare("fvslider1", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider1 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		ui_interface.openVerticalBox("peak 9");
		ui_interface.declare("fentry1", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry1 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry0", "style", "knob");
		ui_interface.declare("fentry0", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry0 = val; } return setval; }(this), 10000, 20, 20000, 1);
		ui_interface.declare("fvslider0", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider0 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var output0 = outputs[0];
		var fSlow0 = Math.tan((this.fConst0 * this.fentry0));
		var fSlow1 = this.fentry1;
		var fSlow2 = (Math.pow(10, (0.05 * (0 - this.fvslider0))) / fSlow1);
		var fSlow3 = (1 / (1 + (fSlow0 * (fSlow0 + fSlow2))));
		var fSlow4 = (1 / fSlow1);
		var fSlow5 = (1 + (fSlow0 * (fSlow0 + fSlow4)));
		var fSlow6 = Math.tan((this.fConst0 * this.fentry2));
		var fSlow7 = this.fentry3;
		var fSlow8 = (Math.pow(10, (0.05 * (0 - this.fvslider1))) / fSlow7);
		var fSlow9 = (1 / (1 + (fSlow6 * (fSlow6 + fSlow8))));
		var fSlow10 = (1 / fSlow7);
		var fSlow11 = (1 + (fSlow6 * (fSlow6 + fSlow10)));
		var fSlow12 = Math.tan((this.fConst0 * this.fentry4));
		var fSlow13 = this.fentry5;
		var fSlow14 = (Math.pow(10, (0.05 * (0 - this.fvslider2))) / fSlow13);
		var fSlow15 = (1 / (1 + (fSlow12 * (fSlow12 + fSlow14))));
		var fSlow16 = (1 / fSlow13);
		var fSlow17 = (1 + (fSlow12 * (fSlow12 + fSlow16)));
		var fSlow18 = Math.tan((this.fConst0 * this.fentry6));
		var fSlow19 = this.fentry7;
		var fSlow20 = (Math.pow(10, (0.05 * (0 - this.fvslider3))) / fSlow19);
		var fSlow21 = (1 / (1 + (fSlow18 * (fSlow18 + fSlow20))));
		var fSlow22 = (1 / fSlow19);
		var fSlow23 = (1 + (fSlow18 * (fSlow18 + fSlow22)));
		var fSlow24 = Math.tan((this.fConst0 * this.fentry8));
		var fSlow25 = this.fentry9;
		var fSlow26 = (Math.pow(10, (0.05 * (0 - this.fvslider4))) / fSlow25);
		var fSlow27 = (1 / (1 + (fSlow24 * (fSlow24 + fSlow26))));
		var fSlow28 = (1 / fSlow25);
		var fSlow29 = (1 + (fSlow24 * (fSlow24 + fSlow28)));
		var fSlow30 = Math.tan((this.fConst0 * this.fentry10));
		var fSlow31 = this.fentry11;
		var fSlow32 = (Math.pow(10, (0.05 * (0 - this.fvslider5))) / fSlow31);
		var fSlow33 = (1 / (1 + (fSlow30 * (fSlow30 + fSlow32))));
		var fSlow34 = (1 / fSlow31);
		var fSlow35 = (1 + (fSlow30 * (fSlow30 + fSlow34)));
		var fSlow36 = Math.tan((this.fConst0 * this.fentry12));
		var fSlow37 = this.fentry13;
		var fSlow38 = (Math.pow(10, (0.05 * (0 - this.fvslider6))) / fSlow37);
		var fSlow39 = (1 / (1 + (fSlow36 * (fSlow36 + fSlow38))));
		var fSlow40 = (1 / fSlow37);
		var fSlow41 = (1 + (fSlow36 * (fSlow36 + fSlow40)));
		var fSlow42 = Math.tan((this.fConst0 * this.fentry14));
		var fSlow43 = this.fentry15;
		var fSlow44 = (Math.pow(10, (0.05 * (0 - this.fvslider7))) / fSlow43);
		var fSlow45 = (1 / (1 + (fSlow42 * (fSlow42 + fSlow44))));
		var fSlow46 = (1 / fSlow43);
		var fSlow47 = (1 + (fSlow42 * (fSlow42 + fSlow46)));
		var fSlow48 = Math.tan((this.fConst0 * this.fentry16));
		var fSlow49 = this.fentry17;
		var fSlow50 = (Math.pow(10, (0.05 * (0 - this.fvslider8))) / fSlow49);
		var fSlow51 = (1 / (1 + (fSlow48 * (fSlow48 + fSlow50))));
		var fSlow52 = (1 / fSlow49);
		var fSlow53 = (1 + (fSlow48 * (fSlow48 + fSlow52)));
		var fSlow54 = Math.tan((this.fConst0 * this.fentry18));
		var fSlow55 = this.fentry19;
		var fSlow56 = (Math.pow(10, (0.05 * (0 - this.fvslider9))) / fSlow55);
		var fSlow57 = (1 / (1 + (fSlow54 * (fSlow54 + fSlow56))));
		var fSlow58 = (2 * (faustpower2_f(fSlow54) - 1));
		var fSlow59 = (1 + (fSlow54 * (fSlow54 - fSlow56)));
		var fSlow60 = (1 / fSlow55);
		var fSlow61 = (1 + (fSlow54 * (fSlow54 + fSlow60)));
		var fSlow62 = (1 + (fSlow54 * (fSlow54 - fSlow60)));
		var fSlow63 = (1 + (fSlow48 * (fSlow48 - fSlow50)));
		var fSlow64 = (2 * (faustpower2_f(fSlow48) - 1));
		var fSlow65 = (1 + (fSlow48 * (fSlow48 - fSlow52)));
		var fSlow66 = (1 + (fSlow42 * (fSlow42 - fSlow44)));
		var fSlow67 = (2 * (faustpower2_f(fSlow42) - 1));
		var fSlow68 = (1 + (fSlow42 * (fSlow42 - fSlow46)));
		var fSlow69 = (1 + (fSlow36 * (fSlow36 - fSlow38)));
		var fSlow70 = (2 * (faustpower2_f(fSlow36) - 1));
		var fSlow71 = (1 + (fSlow36 * (fSlow36 - fSlow40)));
		var fSlow72 = (1 + (fSlow30 * (fSlow30 - fSlow32)));
		var fSlow73 = (2 * (faustpower2_f(fSlow30) - 1));
		var fSlow74 = (1 + (fSlow30 * (fSlow30 - fSlow34)));
		var fSlow75 = (1 + (fSlow24 * (fSlow24 - fSlow26)));
		var fSlow76 = (2 * (faustpower2_f(fSlow24) - 1));
		var fSlow77 = (1 + (fSlow24 * (fSlow24 - fSlow28)));
		var fSlow78 = (1 + (fSlow18 * (fSlow18 - fSlow20)));
		var fSlow79 = (2 * (faustpower2_f(fSlow18) - 1));
		var fSlow80 = (1 + (fSlow18 * (fSlow18 - fSlow22)));
		var fSlow81 = (1 + (fSlow12 * (fSlow12 - fSlow14)));
		var fSlow82 = (2 * (faustpower2_f(fSlow12) - 1));
		var fSlow83 = (1 + (fSlow12 * (fSlow12 - fSlow16)));
		var fSlow84 = (1 + (fSlow6 * (fSlow6 - fSlow8)));
		var fSlow85 = (2 * (faustpower2_f(fSlow6) - 1));
		var fSlow86 = (1 + (fSlow6 * (fSlow6 - fSlow10)));
		var fSlow87 = (1 + (fSlow0 * (fSlow0 - fSlow2)));
		var fSlow88 = (2 * (faustpower2_f(fSlow0) - 1));
		var fSlow89 = (1 + (fSlow0 * (fSlow0 - fSlow4)));
		for (var i = 0; (i < count); i = (i + 1)) {
			var fTemp0 = (fSlow58 * this.fRec9[1]);
			this.fRec9[0] = (input0[i] - (fSlow57 * ((fSlow59 * this.fRec9[2]) + fTemp0)));
			var fTemp1 = (fSlow64 * this.fRec8[1]);
			this.fRec8[0] = ((fSlow57 * ((fTemp0 + (fSlow61 * this.fRec9[0])) + (fSlow62 * this.fRec9[2]))) - (fSlow51 * ((fSlow63 * this.fRec8[2]) + fTemp1)));
			var fTemp2 = (fSlow67 * this.fRec7[1]);
			this.fRec7[0] = ((fSlow51 * (((fSlow53 * this.fRec8[0]) + fTemp1) + (fSlow65 * this.fRec8[2]))) - (fSlow45 * ((fSlow66 * this.fRec7[2]) + fTemp2)));
			var fTemp3 = (fSlow70 * this.fRec6[1]);
			this.fRec6[0] = ((fSlow45 * (((fSlow47 * this.fRec7[0]) + fTemp2) + (fSlow68 * this.fRec7[2]))) - (fSlow39 * ((fSlow69 * this.fRec6[2]) + fTemp3)));
			var fTemp4 = (fSlow73 * this.fRec5[1]);
			this.fRec5[0] = ((fSlow39 * (((fSlow41 * this.fRec6[0]) + fTemp3) + (fSlow71 * this.fRec6[2]))) - (fSlow33 * ((fSlow72 * this.fRec5[2]) + fTemp4)));
			var fTemp5 = (fSlow76 * this.fRec4[1]);
			this.fRec4[0] = ((fSlow33 * (((fSlow35 * this.fRec5[0]) + fTemp4) + (fSlow74 * this.fRec5[2]))) - (fSlow27 * ((fSlow75 * this.fRec4[2]) + fTemp5)));
			var fTemp6 = (fSlow79 * this.fRec3[1]);
			this.fRec3[0] = ((fSlow27 * (((fSlow29 * this.fRec4[0]) + fTemp5) + (fSlow77 * this.fRec4[2]))) - (fSlow21 * ((fSlow78 * this.fRec3[2]) + fTemp6)));
			var fTemp7 = (fSlow82 * this.fRec2[1]);
			this.fRec2[0] = ((fSlow21 * (((fSlow23 * this.fRec3[0]) + fTemp6) + (fSlow80 * this.fRec3[2]))) - (fSlow15 * ((fSlow81 * this.fRec2[2]) + fTemp7)));
			var fTemp8 = (fSlow85 * this.fRec1[1]);
			this.fRec1[0] = ((fSlow15 * (((fSlow17 * this.fRec2[0]) + fTemp7) + (fSlow83 * this.fRec2[2]))) - (fSlow9 * ((fSlow84 * this.fRec1[2]) + fTemp8)));
			var fTemp9 = (fSlow88 * this.fRec0[1]);
			this.fRec0[0] = ((fSlow9 * (((fSlow11 * this.fRec1[0]) + fTemp8) + (fSlow86 * this.fRec1[2]))) - (fSlow3 * ((fSlow87 * this.fRec0[2]) + fTemp9)));
			output0[i] = (fSlow3 * (((fSlow5 * this.fRec0[0]) + fTemp9) + (fSlow89 * this.fRec0[2])));
			this.fRec9[2] = this.fRec9[1];
			this.fRec9[1] = this.fRec9[0];
			this.fRec8[2] = this.fRec8[1];
			this.fRec8[1] = this.fRec8[0];
			this.fRec7[2] = this.fRec7[1];
			this.fRec7[1] = this.fRec7[0];
			this.fRec6[2] = this.fRec6[1];
			this.fRec6[1] = this.fRec6[0];
			this.fRec5[2] = this.fRec5[1];
			this.fRec5[1] = this.fRec5[0];
			this.fRec4[2] = this.fRec4[1];
			this.fRec4[1] = this.fRec4[0];
			this.fRec3[2] = this.fRec3[1];
			this.fRec3[1] = this.fRec3[0];
			this.fRec2[2] = this.fRec2[1];
			this.fRec2[1] = this.fRec2[0];
			this.fRec1[2] = this.fRec1[1];
			this.fRec1[1] = this.fRec1[0];
			this.fRec0[2] = this.fRec0[1];
			this.fRec0[1] = this.fRec0[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_multibandfilter = function(obj) 
{
    function process_aux_multibandfilter(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_multibandfilter;
}

function create_multibandfilter(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new multibandfilter();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_multibandfilter(this);
    
    return this.processor;
}
//PitchShifter------------------------------------------------------------------
function pitch_shifter() {
	
	this.fRec0 = new Float32Array(2);
	this.fVec0 = new Float32Array(65536);
	this.IOTA;
	this.fhslider0;
	this.fhslider1;
	this.fhslider2;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2006");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "pitch-shifter");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 1;
		
	}
	this.getNumOutputs = function() {
		return 1;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.IOTA = 0;
		for (var i = 0; (i < 65536); i = (i + 1)) {
			this.fVec0[i] = 0;
			
		}
		this.fhslider0 = 1000;
		this.fhslider1 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		this.fhslider2 = 10;
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("Pitch Shifter");
		ui_interface.addHorizontalSlider("shift (semitones)", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 0, -12, 12, 0.1);
		ui_interface.addHorizontalSlider("window (samples)", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 1000, 50, 10000, 1);
		ui_interface.addHorizontalSlider("xfade (samples)", function handler(obj) { function setval(val) { obj.fhslider2 = val; } return setval; }(this), 10, 1, 10000, 1);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var output0 = outputs[0];
		var fSlow0 = this.fhslider0;
		var fSlow1 = ((1 + fSlow0) - Math.pow(2, (0.0833333 * this.fhslider1)));
		var fSlow2 = (1 / this.fhslider2);
		var fSlow3 = (fSlow0 - 1);
		for (var i = 0; (i < count); i = (i + 1)) {
			var fTemp0 = input0[i];
			this.fVec0[(this.IOTA & 65535)] = fTemp0;
			this.fRec0[0] = function fmod(a, b) { return a % b; }((this.fRec0[1] + fSlow1), fSlow0);
			var iTemp1 = this.fRec0[0];
			var iTemp2 = (1 + iTemp1);
			var fTemp3 = Math.min((fSlow2 * this.fRec0[0]), 1);
			var fTemp4 = (fSlow0 + this.fRec0[0]);
			var iTemp5 = fTemp4;
			output0[i] = ((((this.fVec0[((this.IOTA - (iTemp1 & 65535)) & 65535)] * (iTemp2 - this.fRec0[0])) + ((this.fRec0[0] - iTemp1) * this.fVec0[((this.IOTA - (iTemp2 & 65535)) & 65535)])) * fTemp3) + (((this.fVec0[((this.IOTA - (iTemp5 & 65535)) & 65535)] * (0 - ((this.fRec0[0] + fSlow3) - iTemp5))) + ((fTemp4 - iTemp5) * this.fVec0[((this.IOTA - ((1 + iTemp5) & 65535)) & 65535)])) * (1 - fTemp3)));
			this.IOTA = (this.IOTA + 1);
			this.fRec0[1] = this.fRec0[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_pitch_shifter = function(obj) 
{
    function process_aux_pitch_shifter(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_pitch_shifter;
}

function create_pitch_shifter(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new pitch_shifter();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_pitch_shifter(this);
    
    return this.processor;
}
//Reverb Designer Guts--------------------------------------------------------------
this.faustpower2_f = function(value) {
	return (value * value);
	
}

function reverb_designer() {
	
	this.fRec15 = new Float32Array(3);
	this.fVec66 = new Float32Array(8192);
	this.fRec14 = new Float32Array(3);
	this.fVec65 = new Float32Array(8192);
	this.fRec13 = new Float32Array(3);
	this.fVec64 = new Float32Array(8192);
	this.fRec12 = new Float32Array(3);
	this.fVec63 = new Float32Array(8192);
	this.fRec11 = new Float32Array(3);
	this.fVec62 = new Float32Array(8192);
	this.fRec10 = new Float32Array(3);
	this.fVec61 = new Float32Array(8192);
	this.fRec9 = new Float32Array(3);
	this.fVec60 = new Float32Array(8192);
	this.fRec8 = new Float32Array(3);
	this.fVec59 = new Float32Array(8192);
	this.fRec7 = new Float32Array(3);
	this.fVec58 = new Float32Array(8192);
	this.fRec6 = new Float32Array(3);
	this.fVec57 = new Float32Array(8192);
	this.fRec5 = new Float32Array(3);
	this.fVec56 = new Float32Array(8192);
	this.fRec4 = new Float32Array(3);
	this.fVec55 = new Float32Array(8192);
	this.fRec3 = new Float32Array(3);
	this.fVec54 = new Float32Array(8192);
	this.fRec2 = new Float32Array(3);
	this.fVec53 = new Float32Array(8192);
	this.fRec1 = new Float32Array(3);
	this.fVec52 = new Float32Array(8192);
	this.fVec51 = new Float32Array(2);
	this.fRec0 = new Float32Array(3);
	this.fVec50 = new Float32Array(8192);
	this.fRec368 = new Float32Array(3);
	this.fRec369 = new Float32Array(2);
	this.fRec364 = new Float32Array(3);
	this.fRec365 = new Float32Array(2);
	this.fVec49 = new Float32Array(2);
	this.fRec366 = new Float32Array(3);
	this.fRec367 = new Float32Array(2);
	this.fRec359 = new Float32Array(3);
	this.fRec360 = new Float32Array(3);
	this.fRec361 = new Float32Array(2);
	this.fVec48 = new Float32Array(2);
	this.fRec362 = new Float32Array(3);
	this.fRec363 = new Float32Array(2);
	this.fRec353 = new Float32Array(3);
	this.fRec354 = new Float32Array(3);
	this.fRec355 = new Float32Array(3);
	this.fRec356 = new Float32Array(2);
	this.fVec47 = new Float32Array(2);
	this.fRec357 = new Float32Array(3);
	this.fRec358 = new Float32Array(2);
	this.fRec348 = new Float32Array(3);
	this.fRec349 = new Float32Array(3);
	this.fRec350 = new Float32Array(3);
	this.fRec351 = new Float32Array(3);
	this.fRec352 = new Float32Array(2);
	this.fRec346 = new Float32Array(3);
	this.fRec347 = new Float32Array(2);
	this.fRec342 = new Float32Array(3);
	this.fRec343 = new Float32Array(2);
	this.fVec46 = new Float32Array(2);
	this.fRec344 = new Float32Array(3);
	this.fRec345 = new Float32Array(2);
	this.fRec337 = new Float32Array(3);
	this.fRec338 = new Float32Array(3);
	this.fRec339 = new Float32Array(2);
	this.fVec45 = new Float32Array(2);
	this.fRec340 = new Float32Array(3);
	this.fRec341 = new Float32Array(2);
	this.fRec331 = new Float32Array(3);
	this.fRec332 = new Float32Array(3);
	this.fRec333 = new Float32Array(3);
	this.fRec334 = new Float32Array(2);
	this.fVec44 = new Float32Array(2);
	this.fRec335 = new Float32Array(3);
	this.fRec336 = new Float32Array(2);
	this.fRec326 = new Float32Array(3);
	this.fRec327 = new Float32Array(3);
	this.fRec328 = new Float32Array(3);
	this.fRec329 = new Float32Array(3);
	this.fRec330 = new Float32Array(2);
	this.fRec324 = new Float32Array(3);
	this.fRec325 = new Float32Array(2);
	this.fRec320 = new Float32Array(3);
	this.fRec321 = new Float32Array(2);
	this.fVec43 = new Float32Array(2);
	this.fRec322 = new Float32Array(3);
	this.fRec323 = new Float32Array(2);
	this.fRec315 = new Float32Array(3);
	this.fRec316 = new Float32Array(3);
	this.fRec317 = new Float32Array(2);
	this.fVec42 = new Float32Array(2);
	this.fRec318 = new Float32Array(3);
	this.fRec319 = new Float32Array(2);
	this.fRec309 = new Float32Array(3);
	this.fRec310 = new Float32Array(3);
	this.fRec311 = new Float32Array(3);
	this.fRec312 = new Float32Array(2);
	this.fVec41 = new Float32Array(2);
	this.fRec313 = new Float32Array(3);
	this.fRec314 = new Float32Array(2);
	this.fRec304 = new Float32Array(3);
	this.fRec305 = new Float32Array(3);
	this.fRec306 = new Float32Array(3);
	this.fRec307 = new Float32Array(3);
	this.fRec308 = new Float32Array(2);
	this.fRec302 = new Float32Array(3);
	this.fRec303 = new Float32Array(2);
	this.fRec298 = new Float32Array(3);
	this.fRec299 = new Float32Array(2);
	this.fVec40 = new Float32Array(2);
	this.fRec300 = new Float32Array(3);
	this.fRec301 = new Float32Array(2);
	this.fRec293 = new Float32Array(3);
	this.fRec294 = new Float32Array(3);
	this.fRec295 = new Float32Array(2);
	this.fVec39 = new Float32Array(2);
	this.fRec296 = new Float32Array(3);
	this.fRec297 = new Float32Array(2);
	this.fRec287 = new Float32Array(3);
	this.fRec288 = new Float32Array(3);
	this.fRec289 = new Float32Array(3);
	this.fRec290 = new Float32Array(2);
	this.fVec38 = new Float32Array(2);
	this.fRec291 = new Float32Array(3);
	this.fRec292 = new Float32Array(2);
	this.fRec282 = new Float32Array(3);
	this.fRec283 = new Float32Array(3);
	this.fRec284 = new Float32Array(3);
	this.fRec285 = new Float32Array(3);
	this.fRec286 = new Float32Array(2);
	this.fRec280 = new Float32Array(3);
	this.fRec281 = new Float32Array(2);
	this.fRec276 = new Float32Array(3);
	this.fRec277 = new Float32Array(2);
	this.fVec37 = new Float32Array(2);
	this.fRec278 = new Float32Array(3);
	this.fRec279 = new Float32Array(2);
	this.fRec271 = new Float32Array(3);
	this.fRec272 = new Float32Array(3);
	this.fRec273 = new Float32Array(2);
	this.fVec36 = new Float32Array(2);
	this.fRec274 = new Float32Array(3);
	this.fRec275 = new Float32Array(2);
	this.fRec265 = new Float32Array(3);
	this.fRec266 = new Float32Array(3);
	this.fRec267 = new Float32Array(3);
	this.fRec268 = new Float32Array(2);
	this.fVec35 = new Float32Array(2);
	this.fRec269 = new Float32Array(3);
	this.fRec270 = new Float32Array(2);
	this.fRec260 = new Float32Array(3);
	this.fRec261 = new Float32Array(3);
	this.fRec262 = new Float32Array(3);
	this.fRec263 = new Float32Array(3);
	this.fRec264 = new Float32Array(2);
	this.fRec258 = new Float32Array(3);
	this.fRec259 = new Float32Array(2);
	this.fRec254 = new Float32Array(3);
	this.fRec255 = new Float32Array(2);
	this.fVec34 = new Float32Array(2);
	this.fRec256 = new Float32Array(3);
	this.fRec257 = new Float32Array(2);
	this.fRec249 = new Float32Array(3);
	this.fRec250 = new Float32Array(3);
	this.fRec251 = new Float32Array(2);
	this.fVec33 = new Float32Array(2);
	this.fRec252 = new Float32Array(3);
	this.fRec253 = new Float32Array(2);
	this.fRec243 = new Float32Array(3);
	this.fRec244 = new Float32Array(3);
	this.fRec245 = new Float32Array(3);
	this.fRec246 = new Float32Array(2);
	this.fVec32 = new Float32Array(2);
	this.fRec247 = new Float32Array(3);
	this.fRec248 = new Float32Array(2);
	this.fRec238 = new Float32Array(3);
	this.fRec239 = new Float32Array(3);
	this.fRec240 = new Float32Array(3);
	this.fRec241 = new Float32Array(3);
	this.fRec242 = new Float32Array(2);
	this.fRec236 = new Float32Array(3);
	this.fRec237 = new Float32Array(2);
	this.fRec232 = new Float32Array(3);
	this.fRec233 = new Float32Array(2);
	this.fVec31 = new Float32Array(2);
	this.fRec234 = new Float32Array(3);
	this.fRec235 = new Float32Array(2);
	this.fRec227 = new Float32Array(3);
	this.fRec228 = new Float32Array(3);
	this.fRec229 = new Float32Array(2);
	this.fVec30 = new Float32Array(2);
	this.fRec230 = new Float32Array(3);
	this.fRec231 = new Float32Array(2);
	this.fRec221 = new Float32Array(3);
	this.fRec222 = new Float32Array(3);
	this.fRec223 = new Float32Array(3);
	this.fRec224 = new Float32Array(2);
	this.fVec29 = new Float32Array(2);
	this.fRec225 = new Float32Array(3);
	this.fRec226 = new Float32Array(2);
	this.fRec216 = new Float32Array(3);
	this.fRec217 = new Float32Array(3);
	this.fRec218 = new Float32Array(3);
	this.fRec219 = new Float32Array(3);
	this.fRec220 = new Float32Array(2);
	this.fRec214 = new Float32Array(3);
	this.fRec215 = new Float32Array(2);
	this.fRec210 = new Float32Array(3);
	this.fRec211 = new Float32Array(2);
	this.fVec28 = new Float32Array(2);
	this.fRec212 = new Float32Array(3);
	this.fRec213 = new Float32Array(2);
	this.fRec205 = new Float32Array(3);
	this.fRec206 = new Float32Array(3);
	this.fRec207 = new Float32Array(2);
	this.fVec27 = new Float32Array(2);
	this.fRec208 = new Float32Array(3);
	this.fRec209 = new Float32Array(2);
	this.fRec199 = new Float32Array(3);
	this.fRec200 = new Float32Array(3);
	this.fRec201 = new Float32Array(3);
	this.fRec202 = new Float32Array(2);
	this.fVec26 = new Float32Array(2);
	this.fRec203 = new Float32Array(3);
	this.fRec204 = new Float32Array(2);
	this.fRec194 = new Float32Array(3);
	this.fRec195 = new Float32Array(3);
	this.fRec196 = new Float32Array(3);
	this.fRec197 = new Float32Array(3);
	this.fRec198 = new Float32Array(2);
	this.fRec192 = new Float32Array(3);
	this.fRec193 = new Float32Array(2);
	this.fRec188 = new Float32Array(3);
	this.fRec189 = new Float32Array(2);
	this.fVec25 = new Float32Array(2);
	this.fRec190 = new Float32Array(3);
	this.fRec191 = new Float32Array(2);
	this.fRec183 = new Float32Array(3);
	this.fRec184 = new Float32Array(3);
	this.fRec185 = new Float32Array(2);
	this.fVec24 = new Float32Array(2);
	this.fRec186 = new Float32Array(3);
	this.fRec187 = new Float32Array(2);
	this.fRec177 = new Float32Array(3);
	this.fRec178 = new Float32Array(3);
	this.fRec179 = new Float32Array(3);
	this.fRec180 = new Float32Array(2);
	this.fVec23 = new Float32Array(2);
	this.fRec181 = new Float32Array(3);
	this.fRec182 = new Float32Array(2);
	this.fRec172 = new Float32Array(3);
	this.fRec173 = new Float32Array(3);
	this.fRec174 = new Float32Array(3);
	this.fRec175 = new Float32Array(3);
	this.fRec176 = new Float32Array(2);
	this.fRec170 = new Float32Array(3);
	this.fRec171 = new Float32Array(2);
	this.fRec166 = new Float32Array(3);
	this.fRec167 = new Float32Array(2);
	this.fVec22 = new Float32Array(2);
	this.fRec168 = new Float32Array(3);
	this.fRec169 = new Float32Array(2);
	this.fRec161 = new Float32Array(3);
	this.fRec162 = new Float32Array(3);
	this.fRec163 = new Float32Array(2);
	this.fVec21 = new Float32Array(2);
	this.fRec164 = new Float32Array(3);
	this.fRec165 = new Float32Array(2);
	this.fRec155 = new Float32Array(3);
	this.fRec156 = new Float32Array(3);
	this.fRec157 = new Float32Array(3);
	this.fRec158 = new Float32Array(2);
	this.fVec20 = new Float32Array(2);
	this.fRec159 = new Float32Array(3);
	this.fRec160 = new Float32Array(2);
	this.fRec150 = new Float32Array(3);
	this.fRec151 = new Float32Array(3);
	this.fRec152 = new Float32Array(3);
	this.fRec153 = new Float32Array(3);
	this.fRec154 = new Float32Array(2);
	this.fRec148 = new Float32Array(3);
	this.fRec149 = new Float32Array(2);
	this.fRec144 = new Float32Array(3);
	this.fRec145 = new Float32Array(2);
	this.fVec19 = new Float32Array(2);
	this.fRec146 = new Float32Array(3);
	this.fRec147 = new Float32Array(2);
	this.fRec139 = new Float32Array(3);
	this.fRec140 = new Float32Array(3);
	this.fRec141 = new Float32Array(2);
	this.fVec18 = new Float32Array(2);
	this.fRec142 = new Float32Array(3);
	this.fRec143 = new Float32Array(2);
	this.fRec133 = new Float32Array(3);
	this.fRec134 = new Float32Array(3);
	this.fRec135 = new Float32Array(3);
	this.fRec136 = new Float32Array(2);
	this.fVec17 = new Float32Array(2);
	this.fRec137 = new Float32Array(3);
	this.fRec138 = new Float32Array(2);
	this.fRec128 = new Float32Array(3);
	this.fRec129 = new Float32Array(3);
	this.fRec130 = new Float32Array(3);
	this.fRec131 = new Float32Array(3);
	this.fRec132 = new Float32Array(2);
	this.fRec126 = new Float32Array(3);
	this.fRec127 = new Float32Array(2);
	this.fRec122 = new Float32Array(3);
	this.fRec123 = new Float32Array(2);
	this.fVec16 = new Float32Array(2);
	this.fRec124 = new Float32Array(3);
	this.fRec125 = new Float32Array(2);
	this.fRec117 = new Float32Array(3);
	this.fRec118 = new Float32Array(3);
	this.fRec119 = new Float32Array(2);
	this.fVec15 = new Float32Array(2);
	this.fRec120 = new Float32Array(3);
	this.fRec121 = new Float32Array(2);
	this.fRec111 = new Float32Array(3);
	this.fRec112 = new Float32Array(3);
	this.fRec113 = new Float32Array(3);
	this.fRec114 = new Float32Array(2);
	this.fVec14 = new Float32Array(2);
	this.fRec115 = new Float32Array(3);
	this.fRec116 = new Float32Array(2);
	this.fRec106 = new Float32Array(3);
	this.fRec107 = new Float32Array(3);
	this.fRec108 = new Float32Array(3);
	this.fRec109 = new Float32Array(3);
	this.fRec110 = new Float32Array(2);
	this.fRec104 = new Float32Array(3);
	this.fRec105 = new Float32Array(2);
	this.fRec100 = new Float32Array(3);
	this.fRec101 = new Float32Array(2);
	this.fVec13 = new Float32Array(2);
	this.fRec102 = new Float32Array(3);
	this.fRec103 = new Float32Array(2);
	this.fRec95 = new Float32Array(3);
	this.fRec96 = new Float32Array(3);
	this.fRec97 = new Float32Array(2);
	this.fVec12 = new Float32Array(2);
	this.fRec98 = new Float32Array(3);
	this.fRec99 = new Float32Array(2);
	this.fRec89 = new Float32Array(3);
	this.fRec90 = new Float32Array(3);
	this.fRec91 = new Float32Array(3);
	this.fRec92 = new Float32Array(2);
	this.fVec11 = new Float32Array(2);
	this.fRec93 = new Float32Array(3);
	this.fRec94 = new Float32Array(2);
	this.fRec84 = new Float32Array(3);
	this.fRec85 = new Float32Array(3);
	this.fRec86 = new Float32Array(3);
	this.fRec87 = new Float32Array(3);
	this.fRec88 = new Float32Array(2);
	this.fRec82 = new Float32Array(3);
	this.fRec83 = new Float32Array(2);
	this.fRec78 = new Float32Array(3);
	this.fRec79 = new Float32Array(2);
	this.fVec10 = new Float32Array(2);
	this.fRec80 = new Float32Array(3);
	this.fRec81 = new Float32Array(2);
	this.fRec73 = new Float32Array(3);
	this.fRec74 = new Float32Array(3);
	this.fRec75 = new Float32Array(2);
	this.fVec9 = new Float32Array(2);
	this.fRec76 = new Float32Array(3);
	this.fRec77 = new Float32Array(2);
	this.fRec67 = new Float32Array(3);
	this.fRec68 = new Float32Array(3);
	this.fRec69 = new Float32Array(3);
	this.fRec70 = new Float32Array(2);
	this.fVec8 = new Float32Array(2);
	this.fRec71 = new Float32Array(3);
	this.fRec72 = new Float32Array(2);
	this.fRec62 = new Float32Array(3);
	this.fRec63 = new Float32Array(3);
	this.fRec64 = new Float32Array(3);
	this.fRec65 = new Float32Array(3);
	this.fRec66 = new Float32Array(2);
	this.fRec60 = new Float32Array(3);
	this.fRec61 = new Float32Array(2);
	this.fRec56 = new Float32Array(3);
	this.fRec57 = new Float32Array(2);
	this.fVec7 = new Float32Array(2);
	this.fRec58 = new Float32Array(3);
	this.fRec59 = new Float32Array(2);
	this.fRec51 = new Float32Array(3);
	this.fRec52 = new Float32Array(3);
	this.fRec53 = new Float32Array(2);
	this.fVec6 = new Float32Array(2);
	this.fRec54 = new Float32Array(3);
	this.fRec55 = new Float32Array(2);
	this.fRec45 = new Float32Array(3);
	this.fRec46 = new Float32Array(3);
	this.fRec47 = new Float32Array(3);
	this.fRec48 = new Float32Array(2);
	this.fVec5 = new Float32Array(2);
	this.fRec49 = new Float32Array(3);
	this.fRec50 = new Float32Array(2);
	this.fRec40 = new Float32Array(3);
	this.fRec41 = new Float32Array(3);
	this.fRec42 = new Float32Array(3);
	this.fRec43 = new Float32Array(3);
	this.fRec44 = new Float32Array(2);
	this.fRec38 = new Float32Array(3);
	this.fRec39 = new Float32Array(2);
	this.fRec34 = new Float32Array(3);
	this.fRec35 = new Float32Array(2);
	this.fVec4 = new Float32Array(2);
	this.fRec36 = new Float32Array(3);
	this.fRec37 = new Float32Array(2);
	this.fRec29 = new Float32Array(3);
	this.fRec30 = new Float32Array(3);
	this.fRec31 = new Float32Array(2);
	this.fVec3 = new Float32Array(2);
	this.fRec32 = new Float32Array(3);
	this.fRec33 = new Float32Array(2);
	this.fRec23 = new Float32Array(3);
	this.fRec24 = new Float32Array(3);
	this.fRec25 = new Float32Array(3);
	this.fRec26 = new Float32Array(2);
	this.fVec2 = new Float32Array(2);
	this.fRec27 = new Float32Array(3);
	this.fRec28 = new Float32Array(2);
	this.fRec18 = new Float32Array(3);
	this.fRec19 = new Float32Array(3);
	this.fRec20 = new Float32Array(3);
	this.fRec21 = new Float32Array(3);
	this.fRec22 = new Float32Array(2);
	this.fVec1 = new Float32Array(2);
	this.fVec0 = new Float32Array(2);
	this.fRec16 = new Float32Array(4);
	this.iRec17 = new Int32Array(2);
	this.fhslider0;
	this.fcheckbox0;
	this.fbutton0;
	this.fbutton1;
	this.fcheckbox1;
	this.fbutton2;
	this.fSamplingFreq;
	this.iConst0;
	this.fConst1;
	this.fConst2;
	this.fhslider1;
	this.fhslider2;
	this.fvslider0;
	this.fConst3;
	this.fhslider3;
	this.fhslider4;
	this.fhslider5;
	this.fhslider6;
	this.fvslider1;
	this.fvslider2;
	this.fvslider3;
	this.fvslider4;
	this.IOTA;
	this.fbutton3;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("effect.lib/author", "Julius O. Smith (jos at ccrma.stanford.edu)");
		m.declare("effect.lib/copyright", "Julius O. Smith III");
		m.declare("effect.lib/license", "STK-4.3");
		m.declare("effect.lib/name", "Faust Audio Effect Library");
		m.declare("effect.lib/version", "1.33");
		m.declare("filter.lib/author", "Julius O. Smith (jos at ccrma.stanford.edu)");
		m.declare("filter.lib/copyright", "Julius O. Smith III");
		m.declare("filter.lib/license", "STK-4.3");
		m.declare("filter.lib/name", "Faust Filter Library");
		m.declare("filter.lib/reference", "https://ccrma.stanford.edu/~jos/filters/");
		m.declare("filter.lib/version", "1.29");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("oscillator.lib/author", "Julius O. Smith (jos at ccrma.stanford.edu)");
		m.declare("oscillator.lib/copyright", "Julius O. Smith III");
		m.declare("oscillator.lib/license", "STK-4.3");
		m.declare("oscillator.lib/name", "Faust Oscillator Library");
		m.declare("oscillator.lib/version", "1.11");
	}

	this.getNumInputs = function() {
		return 2;
		
	}
	this.getNumOutputs = function() {
		return 2;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = -40;
		this.fcheckbox0 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec17[i] = 0;
			
		}
		for (var i = 0; (i < 4); i = (i + 1)) {
			this.fRec16[i] = 0;
			
		}
		this.fbutton0 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec0[i] = 0;
			
		}
		this.fbutton1 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec1[i] = 0;
			
		}
		this.fcheckbox1 = 0;
		this.fbutton2 = 0;
		this.iConst0 = Math.min(192000, Math.max(1, this.fSamplingFreq));
		this.fConst1 = (1 / this.iConst0);
		this.fConst2 = (0.00291545 * this.iConst0);
		this.fhslider1 = 46;
		this.fhslider2 = 63;
		this.fvslider0 = 2.7;
		this.fConst3 = (3.14159 / this.iConst0);
		this.fhslider3 = 4000;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec22[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec21[i] = 0;
			
		}
		this.fhslider4 = 2000;
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec20[i] = 0;
			
		}
		this.fhslider5 = 1000;
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec19[i] = 0;
			
		}
		this.fhslider6 = 500;
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec18[i] = 0;
			
		}
		this.fvslider1 = 3.8;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec28[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec27[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec2[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec26[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec25[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec24[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec23[i] = 0;
			
		}
		this.fvslider2 = 5;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec33[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec32[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec3[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec31[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec30[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec29[i] = 0;
			
		}
		this.fvslider3 = 8.4;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec37[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec36[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec4[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec35[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec34[i] = 0;
			
		}
		this.fvslider4 = 6.5;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec39[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec38[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec44[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec43[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec42[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec41[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec40[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec50[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec49[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec5[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec48[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec47[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec46[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec45[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec55[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec54[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec6[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec53[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec52[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec51[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec59[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec58[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec7[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec57[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec56[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec61[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec60[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec66[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec65[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec64[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec63[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec62[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec72[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec71[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec8[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec70[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec69[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec68[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec67[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec77[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec76[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec9[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec75[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec74[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec73[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec81[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec80[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec10[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec79[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec78[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec83[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec82[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec88[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec87[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec86[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec85[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec84[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec94[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec93[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec11[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec92[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec91[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec90[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec89[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec99[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec98[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec12[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec97[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec96[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec95[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec103[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec102[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec13[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec101[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec100[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec105[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec104[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec110[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec109[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec108[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec107[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec106[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec116[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec115[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec14[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec114[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec113[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec112[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec111[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec121[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec120[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec15[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec119[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec118[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec117[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec125[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec124[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec16[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec123[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec122[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec127[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec126[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec132[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec131[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec130[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec129[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec128[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec138[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec137[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec17[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec136[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec135[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec134[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec133[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec143[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec142[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec18[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec141[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec140[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec139[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec147[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec146[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec19[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec145[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec144[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec149[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec148[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec154[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec153[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec152[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec151[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec150[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec160[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec159[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec20[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec158[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec157[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec156[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec155[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec165[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec164[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec21[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec163[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec162[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec161[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec169[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec168[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec22[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec167[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec166[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec171[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec170[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec176[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec175[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec174[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec173[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec172[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec182[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec181[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec23[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec180[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec179[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec178[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec177[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec187[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec186[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec24[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec185[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec184[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec183[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec191[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec190[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec25[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec189[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec188[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec193[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec192[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec198[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec197[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec196[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec195[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec194[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec204[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec203[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec26[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec202[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec201[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec200[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec199[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec209[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec208[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec27[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec207[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec206[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec205[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec213[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec212[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec28[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec211[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec210[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec215[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec214[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec220[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec219[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec218[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec217[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec216[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec226[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec225[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec29[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec224[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec223[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec222[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec221[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec231[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec230[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec30[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec229[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec228[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec227[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec235[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec234[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec31[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec233[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec232[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec237[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec236[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec242[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec241[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec240[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec239[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec238[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec248[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec247[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec32[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec246[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec245[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec244[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec243[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec253[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec252[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec33[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec251[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec250[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec249[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec257[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec256[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec34[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec255[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec254[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec259[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec258[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec264[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec263[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec262[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec261[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec260[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec270[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec269[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec35[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec268[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec267[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec266[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec265[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec275[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec274[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec36[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec273[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec272[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec271[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec279[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec278[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec37[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec277[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec276[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec281[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec280[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec286[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec285[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec284[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec283[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec282[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec292[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec291[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec38[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec290[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec289[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec288[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec287[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec297[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec296[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec39[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec295[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec294[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec293[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec301[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec300[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec40[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec299[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec298[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec303[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec302[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec308[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec307[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec306[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec305[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec304[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec314[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec313[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec41[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec312[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec311[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec310[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec309[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec319[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec318[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec42[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec317[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec316[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec315[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec323[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec322[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec43[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec321[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec320[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec325[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec324[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec330[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec329[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec328[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec327[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec326[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec336[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec335[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec44[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec334[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec333[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec332[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec331[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec341[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec340[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec45[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec339[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec338[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec337[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec345[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec344[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec46[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec343[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec342[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec347[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec346[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec352[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec351[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec350[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec349[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec348[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec358[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec357[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec47[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec356[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec355[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec354[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec353[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec363[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec362[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec48[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec361[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec360[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec359[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec367[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec366[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec49[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec365[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec364[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec369[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec368[i] = 0;
			
		}
		this.IOTA = 0;
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec50[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		this.fbutton3 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec51[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec52[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec1[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec53[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec54[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec3[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec55[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec4[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec56[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec5[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec57[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec6[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec58[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec7[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec59[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec8[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec60[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec9[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec61[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec10[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec62[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec11[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec63[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec12[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec64[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec13[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec65[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec14[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec66[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec15[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("reverb_designer");
		ui_interface.declare("0", "tooltip", "See Faust's effect.lib for documentation and references");
		ui_interface.openVerticalBox("FEEDBACK DELAY NETWORK (FDN) REVERBERATOR, ORDER 16");
		ui_interface.declare("0", "1", "");
		ui_interface.openVerticalBox("Band Crossover Frequencies");
		ui_interface.declare("fhslider6", "0", "");
		ui_interface.declare("fhslider6", "tooltip", "Each delay-line signal is split into frequency-bands for separate decay-time control in each band");
		ui_interface.declare("fhslider6", "unit", "Hz");
		ui_interface.addHorizontalSlider("Band 0 upper edge in Hz", function handler(obj) { function setval(val) { obj.fhslider6 = val; } return setval; }(this), 500, 100, 10000, 1);
		ui_interface.declare("fhslider5", "1", "");
		ui_interface.declare("fhslider5", "tooltip", "Each delay-line signal is split into frequency-bands for separate decay-time control in each band");
		ui_interface.declare("fhslider5", "unit", "Hz");
		ui_interface.addHorizontalSlider("Band 1 upper edge in Hz", function handler(obj) { function setval(val) { obj.fhslider5 = val; } return setval; }(this), 1000, 100, 10000, 1);
		ui_interface.declare("fhslider4", "2", "");
		ui_interface.declare("fhslider4", "tooltip", "Each delay-line signal is split into frequency-bands for separate decay-time control in each band");
		ui_interface.declare("fhslider4", "unit", "Hz");
		ui_interface.addHorizontalSlider("Band 2 upper edge in Hz", function handler(obj) { function setval(val) { obj.fhslider4 = val; } return setval; }(this), 2000, 100, 10000, 1);
		ui_interface.declare("fhslider3", "3", "");
		ui_interface.declare("fhslider3", "tooltip", "Each delay-line signal is split into frequency-bands for separate decay-time control in each band");
		ui_interface.declare("fhslider3", "unit", "Hz");
		ui_interface.addHorizontalSlider("Band 3 upper edge in Hz", function handler(obj) { function setval(val) { obj.fhslider3 = val; } return setval; }(this), 4000, 100, 10000, 1);
		ui_interface.closeBox();
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("Band Decay Times (T60)");
		ui_interface.declare("fvslider3", "0", "");
		ui_interface.declare("fvslider3", "tooltip", "T60 is the 60dB decay-time in seconds. For concert halls, an overall reverberation time (T60) near 1.9 seconds is typical [Beranek 2004]. Here we may set T60 independently in each frequency band.  In real rooms, higher frequency bands generally decay faster due to absorption and scattering.");
		ui_interface.declare("fvslider3", "unit", "s");
		ui_interface.addVerticalSlider("0", function handler(obj) { function setval(val) { obj.fvslider3 = val; } return setval; }(this), 8.4, 0.1, 10, 0.1);
		ui_interface.declare("fvslider4", "1", "");
		ui_interface.declare("fvslider4", "tooltip", "T60 is the 60dB decay-time in seconds. For concert halls, an overall reverberation time (T60) near 1.9 seconds is typical [Beranek 2004]. Here we may set T60 independently in each frequency band.  In real rooms, higher frequency bands generally decay faster due to absorption and scattering.");
		ui_interface.declare("fvslider4", "unit", "s");
		ui_interface.addVerticalSlider("1", function handler(obj) { function setval(val) { obj.fvslider4 = val; } return setval; }(this), 6.5, 0.1, 10, 0.1);
		ui_interface.declare("fvslider2", "2", "");
		ui_interface.declare("fvslider2", "tooltip", "T60 is the 60dB decay-time in seconds. For concert halls, an overall reverberation time (T60) near 1.9 seconds is typical [Beranek 2004]. Here we may set T60 independently in each frequency band.  In real rooms, higher frequency bands generally decay faster due to absorption and scattering.");
		ui_interface.declare("fvslider2", "unit", "s");
		ui_interface.addVerticalSlider("2", function handler(obj) { function setval(val) { obj.fvslider2 = val; } return setval; }(this), 5, 0.1, 10, 0.1);
		ui_interface.declare("fvslider1", "3", "");
		ui_interface.declare("fvslider1", "tooltip", "T60 is the 60dB decay-time in seconds. For concert halls, an overall reverberation time (T60) near 1.9 seconds is typical [Beranek 2004]. Here we may set T60 independently in each frequency band.  In real rooms, higher frequency bands generally decay faster due to absorption and scattering.");
		ui_interface.declare("fvslider1", "unit", "s");
		ui_interface.addVerticalSlider("3", function handler(obj) { function setval(val) { obj.fvslider1 = val; } return setval; }(this), 3.8, 0.1, 10, 0.1);
		ui_interface.declare("fvslider0", "4", "");
		ui_interface.declare("fvslider0", "tooltip", "T60 is the 60dB decay-time in seconds. For concert halls, an overall reverberation time (T60) near 1.9 seconds is typical [Beranek 2004]. Here we may set T60 independently in each frequency band.  In real rooms, higher frequency bands generally decay faster due to absorption and scattering.");
		ui_interface.declare("fvslider0", "unit", "s");
		ui_interface.addVerticalSlider("4", function handler(obj) { function setval(val) { obj.fvslider0 = val; } return setval; }(this), 2.7, 0.1, 10, 0.1);
		ui_interface.closeBox();
		ui_interface.declare("0", "3", "");
		ui_interface.openVerticalBox("Room Dimensions");
		ui_interface.declare("fhslider1", "1", "");
		ui_interface.declare("fhslider1", "tooltip", "This length (in meters) determines the shortest delay-line used in the FDN reverberator.     	      Think of it as the shortest wall-to-wall separation in the room.");
		ui_interface.declare("fhslider1", "unit", "m");
		ui_interface.addHorizontalSlider("min acoustic ray length", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 46, 0.1, 63, 0.1);
		ui_interface.declare("fhslider2", "2", "");
		ui_interface.declare("fhslider2", "tooltip", "This length (in meters) determines the longest delay-line used in the FDN reverberator.     	      Think of it as the largest wall-to-wall separation in the room.");
		ui_interface.declare("fhslider2", "unit", "m");
		ui_interface.addHorizontalSlider("max acoustic ray length", function handler(obj) { function setval(val) { obj.fhslider2 = val; } return setval; }(this), 63, 0.1, 63, 0.1);
		ui_interface.closeBox();
		ui_interface.declare("0", "4", "");
		ui_interface.openHorizontalBox("Input Controls");
		ui_interface.declare("0", "1", "");
		ui_interface.openVerticalBox("Input Config");
		ui_interface.declare("fcheckbox1", "1", "");
		ui_interface.declare("fcheckbox1", "tooltip", "When this is checked, the stereo external audio inputs are disabled (good for hearing the impulse response or pink-noise response alone)");
		ui_interface.addCheckButton("Mute Ext Inputs", function handler(obj) { function setval(val) { obj.fcheckbox1 = val; } return setval; }(this));
		ui_interface.declare("fcheckbox0", "2", "");
		ui_interface.declare("fcheckbox0", "tooltip", "Pink Noise (or 1/f noise) is Constant-Q Noise (useful for adjusting the EQ sections)");
		ui_interface.addCheckButton("Pink Noise", function handler(obj) { function setval(val) { obj.fcheckbox0 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("Impulse Selection");
		ui_interface.declare("fbutton1", "1", "");
		ui_interface.declare("fbutton1", "tooltip", "Send impulse into LEFT channel");
		ui_interface.addButton("Left", function handler(obj) { function setval(val) { obj.fbutton1 = val; } return setval; }(this));
		ui_interface.declare("fbutton0", "2", "");
		ui_interface.declare("fbutton0", "tooltip", "Send impulse into LEFT and RIGHT channels");
		ui_interface.addButton("Center", function handler(obj) { function setval(val) { obj.fbutton0 = val; } return setval; }(this));
		ui_interface.declare("fbutton3", "3", "");
		ui_interface.declare("fbutton3", "tooltip", "Send impulse into RIGHT channel");
		ui_interface.addButton("Right", function handler(obj) { function setval(val) { obj.fbutton3 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.declare("0", "3", "");
		ui_interface.openVerticalBox("Reverb State");
		ui_interface.declare("fbutton2", "1", "");
		ui_interface.declare("fbutton2", "tooltip", "Hold down 'Quench' to clear the reverberator");
		ui_interface.addButton("Quench", function handler(obj) { function setval(val) { obj.fbutton2 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.closeBox();
		ui_interface.closeBox();
		ui_interface.declare("fhslider0", "3", "");
		ui_interface.declare("fhslider0", "tooltip", "Output scale factor");
		ui_interface.declare("fhslider0", "unit", "dB");
		ui_interface.addHorizontalSlider("Output Level (dB)", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), -40, -70, 20, 0.1);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var input1 = inputs[1];
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = Math.pow(10, (0.05 * this.fhslider0));
		var fSlow1 = (0.1 * this.fcheckbox0);
		var fSlow2 = this.fbutton0;
		var fSlow3 = this.fbutton1;
		var fSlow4 = (1 - this.fcheckbox1);
		var fSlow5 = (1 - (0.5 * this.fbutton2));
		var fSlow6 = (0.25 * fSlow5);
		var fSlow7 = this.fhslider1;
		var fSlow8 = (this.fhslider2 / fSlow7);
		var fSlow9 = Math.pow(2, Math.floor((0.5 + (1.4427 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0))))))));
		var fSlow10 = (0 - (6.90776 * fSlow9));
		var fSlow11 = this.fvslider0;
		var fSlow12 = Math.exp((this.fConst1 * (fSlow10 / fSlow11)));
		var fSlow13 = Math.tan((this.fConst3 * this.fhslider3));
		var fSlow14 = (1 / fSlow13);
		var fSlow15 = (1 + ((fSlow14 + 1) / fSlow13));
		var fSlow16 = (1 / fSlow15);
		var fSlow17 = (1 / faustpower2_f(fSlow13));
		var fSlow18 = (1 + fSlow14);
		var fSlow19 = (0 - ((1 - fSlow14) / fSlow18));
		var fSlow20 = (1 / fSlow18);
		var fSlow21 = (0 - fSlow14);
		var fSlow22 = (1 + ((fSlow14 - 1) / fSlow13));
		var fSlow23 = (2 * (1 - fSlow17));
		var fSlow24 = (2 * (0 - fSlow17));
		var fSlow25 = Math.tan((this.fConst3 * this.fhslider4));
		var fSlow26 = (1 / fSlow25);
		var fSlow27 = (1 / (1 + ((1 + fSlow26) / fSlow25)));
		var fSlow28 = (1 + ((fSlow26 - 1) / fSlow25));
		var fSlow29 = (1 / faustpower2_f(fSlow25));
		var fSlow30 = (2 * (1 - fSlow29));
		var fSlow31 = Math.tan((this.fConst3 * this.fhslider5));
		var fSlow32 = (1 / fSlow31);
		var fSlow33 = (1 / (1 + ((1 + fSlow32) / fSlow31)));
		var fSlow34 = (1 + ((fSlow32 - 1) / fSlow31));
		var fSlow35 = (1 / faustpower2_f(fSlow31));
		var fSlow36 = (2 * (1 - fSlow35));
		var fSlow37 = Math.tan((this.fConst3 * this.fhslider6));
		var fSlow38 = (1 / fSlow37);
		var fSlow39 = (1 / (1 + ((1 + fSlow38) / fSlow37)));
		var fSlow40 = (1 + ((fSlow38 - 1) / fSlow37));
		var fSlow41 = (1 / faustpower2_f(fSlow37));
		var fSlow42 = (2 * (1 - fSlow41));
		var fSlow43 = this.fvslider1;
		var fSlow44 = Math.exp((this.fConst1 * (fSlow10 / fSlow43)));
		var fSlow45 = (1 + ((1 + fSlow26) / fSlow25));
		var fSlow46 = (1 / fSlow45);
		var fSlow47 = (1 + fSlow26);
		var fSlow48 = (0 - ((1 - fSlow26) / fSlow47));
		var fSlow49 = (1 / fSlow47);
		var fSlow50 = (1 / (fSlow15 * fSlow25));
		var fSlow51 = (0 - fSlow26);
		var fSlow52 = (1 + ((fSlow26 - 1) / fSlow25));
		var fSlow53 = (2 * (0 - fSlow29));
		var fSlow54 = this.fvslider2;
		var fSlow55 = Math.exp((this.fConst1 * (fSlow10 / fSlow54)));
		var fSlow56 = (1 + ((1 + fSlow32) / fSlow31));
		var fSlow57 = (1 / fSlow56);
		var fSlow58 = (1 + fSlow32);
		var fSlow59 = (0 - ((1 - fSlow32) / fSlow58));
		var fSlow60 = (1 / fSlow58);
		var fSlow61 = (1 / (fSlow45 * fSlow31));
		var fSlow62 = (0 - fSlow32);
		var fSlow63 = (1 + ((fSlow32 - 1) / fSlow31));
		var fSlow64 = (2 * (0 - fSlow35));
		var fSlow65 = (1 / (1 + ((1 + fSlow38) / fSlow37)));
		var fSlow66 = this.fvslider3;
		var fSlow67 = Math.exp((this.fConst1 * (fSlow10 / fSlow66)));
		var fSlow68 = (1 + fSlow38);
		var fSlow69 = (0 - ((1 - fSlow38) / fSlow68));
		var fSlow70 = (1 / fSlow68);
		var fSlow71 = (1 + ((fSlow38 - 1) / fSlow37));
		var fSlow72 = this.fvslider4;
		var fSlow73 = Math.exp((this.fConst1 * (fSlow10 / fSlow72)));
		var fSlow74 = (1 / (fSlow56 * fSlow37));
		var fSlow75 = (0 - fSlow38);
		var fSlow76 = (2 * (0 - fSlow41));
		var fSlow77 = Math.pow(23, Math.floor((0.5 + (0.318929 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.533333))))))));
		var fSlow78 = (0 - (6.90776 * fSlow77));
		var fSlow79 = Math.exp((this.fConst1 * (fSlow78 / fSlow11)));
		var fSlow80 = Math.exp((this.fConst1 * (fSlow78 / fSlow43)));
		var fSlow81 = Math.exp((this.fConst1 * (fSlow78 / fSlow54)));
		var fSlow82 = Math.exp((this.fConst1 * (fSlow78 / fSlow66)));
		var fSlow83 = Math.exp((this.fConst1 * (fSlow78 / fSlow72)));
		var fSlow84 = Math.pow(11, Math.floor((0.5 + (0.417032 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.266667))))))));
		var fSlow85 = (0 - (6.90776 * fSlow84));
		var fSlow86 = Math.exp((this.fConst1 * (fSlow85 / fSlow11)));
		var fSlow87 = Math.exp((this.fConst1 * (fSlow85 / fSlow43)));
		var fSlow88 = Math.exp((this.fConst1 * (fSlow85 / fSlow54)));
		var fSlow89 = Math.exp((this.fConst1 * (fSlow85 / fSlow66)));
		var fSlow90 = Math.exp((this.fConst1 * (fSlow85 / fSlow72)));
		var fSlow91 = Math.pow(41, Math.floor((0.5 + (0.269283 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.8))))))));
		var fSlow92 = (0 - (6.90776 * fSlow91));
		var fSlow93 = Math.exp((this.fConst1 * (fSlow92 / fSlow11)));
		var fSlow94 = Math.exp((this.fConst1 * (fSlow92 / fSlow43)));
		var fSlow95 = Math.exp((this.fConst1 * (fSlow92 / fSlow54)));
		var fSlow96 = Math.exp((this.fConst1 * (fSlow92 / fSlow66)));
		var fSlow97 = Math.exp((this.fConst1 * (fSlow92 / fSlow72)));
		var fSlow98 = Math.pow(5, Math.floor((0.5 + (0.621335 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.133333))))))));
		var fSlow99 = (0 - (6.90776 * fSlow98));
		var fSlow100 = Math.exp((this.fConst1 * (fSlow99 / fSlow11)));
		var fSlow101 = Math.exp((this.fConst1 * (fSlow99 / fSlow43)));
		var fSlow102 = Math.exp((this.fConst1 * (fSlow99 / fSlow54)));
		var fSlow103 = Math.exp((this.fConst1 * (fSlow99 / fSlow66)));
		var fSlow104 = Math.exp((this.fConst1 * (fSlow99 / fSlow72)));
		var fSlow105 = Math.pow(31, Math.floor((0.5 + (0.291207 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.666667))))))));
		var fSlow106 = (0 - (6.90776 * fSlow105));
		var fSlow107 = Math.exp((this.fConst1 * (fSlow106 / fSlow11)));
		var fSlow108 = Math.exp((this.fConst1 * (fSlow106 / fSlow43)));
		var fSlow109 = Math.exp((this.fConst1 * (fSlow106 / fSlow54)));
		var fSlow110 = Math.exp((this.fConst1 * (fSlow106 / fSlow66)));
		var fSlow111 = Math.exp((this.fConst1 * (fSlow106 / fSlow72)));
		var fSlow112 = Math.pow(17, Math.floor((0.5 + (0.352956 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.4))))))));
		var fSlow113 = (0 - (6.90776 * fSlow112));
		var fSlow114 = Math.exp((this.fConst1 * (fSlow113 / fSlow11)));
		var fSlow115 = Math.exp((this.fConst1 * (fSlow113 / fSlow43)));
		var fSlow116 = Math.exp((this.fConst1 * (fSlow113 / fSlow54)));
		var fSlow117 = Math.exp((this.fConst1 * (fSlow113 / fSlow66)));
		var fSlow118 = Math.exp((this.fConst1 * (fSlow113 / fSlow72)));
		var fSlow119 = Math.pow(47, Math.floor((0.5 + (0.25973 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.933333))))))));
		var fSlow120 = (0 - (6.90776 * fSlow119));
		var fSlow121 = Math.exp((this.fConst1 * (fSlow120 / fSlow11)));
		var fSlow122 = Math.exp((this.fConst1 * (fSlow120 / fSlow43)));
		var fSlow123 = Math.exp((this.fConst1 * (fSlow120 / fSlow54)));
		var fSlow124 = Math.exp((this.fConst1 * (fSlow120 / fSlow66)));
		var fSlow125 = Math.exp((this.fConst1 * (fSlow120 / fSlow72)));
		var fSlow126 = Math.pow(3, Math.floor((0.5 + (0.910239 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.0666667))))))));
		var fSlow127 = (0 - (6.90776 * fSlow126));
		var fSlow128 = Math.exp((this.fConst1 * (fSlow127 / fSlow11)));
		var fSlow129 = Math.exp((this.fConst1 * (fSlow127 / fSlow43)));
		var fSlow130 = Math.exp((this.fConst1 * (fSlow127 / fSlow54)));
		var fSlow131 = Math.exp((this.fConst1 * (fSlow127 / fSlow66)));
		var fSlow132 = Math.exp((this.fConst1 * (fSlow127 / fSlow72)));
		var fSlow133 = Math.pow(29, Math.floor((0.5 + (0.296974 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.6))))))));
		var fSlow134 = (0 - (6.90776 * fSlow133));
		var fSlow135 = Math.exp((this.fConst1 * (fSlow134 / fSlow11)));
		var fSlow136 = Math.exp((this.fConst1 * (fSlow134 / fSlow43)));
		var fSlow137 = Math.exp((this.fConst1 * (fSlow134 / fSlow54)));
		var fSlow138 = Math.exp((this.fConst1 * (fSlow134 / fSlow66)));
		var fSlow139 = Math.exp((this.fConst1 * (fSlow134 / fSlow72)));
		var fSlow140 = Math.pow(13, Math.floor((0.5 + (0.389871 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.333333))))))));
		var fSlow141 = (0 - (6.90776 * fSlow140));
		var fSlow142 = Math.exp((this.fConst1 * (fSlow141 / fSlow11)));
		var fSlow143 = Math.exp((this.fConst1 * (fSlow141 / fSlow43)));
		var fSlow144 = Math.exp((this.fConst1 * (fSlow141 / fSlow54)));
		var fSlow145 = Math.exp((this.fConst1 * (fSlow141 / fSlow66)));
		var fSlow146 = Math.exp((this.fConst1 * (fSlow141 / fSlow72)));
		var fSlow147 = Math.pow(43, Math.floor((0.5 + (0.265873 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.866667))))))));
		var fSlow148 = (0 - (6.90776 * fSlow147));
		var fSlow149 = Math.exp((this.fConst1 * (fSlow148 / fSlow11)));
		var fSlow150 = Math.exp((this.fConst1 * (fSlow148 / fSlow43)));
		var fSlow151 = Math.exp((this.fConst1 * (fSlow148 / fSlow54)));
		var fSlow152 = Math.exp((this.fConst1 * (fSlow148 / fSlow66)));
		var fSlow153 = Math.exp((this.fConst1 * (fSlow148 / fSlow72)));
		var fSlow154 = Math.pow(7, Math.floor((0.5 + (0.513898 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.2))))))));
		var fSlow155 = (0 - (6.90776 * fSlow154));
		var fSlow156 = Math.exp((this.fConst1 * (fSlow155 / fSlow11)));
		var fSlow157 = Math.exp((this.fConst1 * (fSlow155 / fSlow43)));
		var fSlow158 = Math.exp((this.fConst1 * (fSlow155 / fSlow54)));
		var fSlow159 = Math.exp((this.fConst1 * (fSlow155 / fSlow66)));
		var fSlow160 = Math.exp((this.fConst1 * (fSlow155 / fSlow72)));
		var fSlow161 = Math.pow(37, Math.floor((0.5 + (0.276938 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.733333))))))));
		var fSlow162 = (0 - (6.90776 * fSlow161));
		var fSlow163 = Math.exp((this.fConst1 * (fSlow162 / fSlow11)));
		var fSlow164 = Math.exp((this.fConst1 * (fSlow162 / fSlow43)));
		var fSlow165 = Math.exp((this.fConst1 * (fSlow162 / fSlow54)));
		var fSlow166 = Math.exp((this.fConst1 * (fSlow162 / fSlow66)));
		var fSlow167 = Math.exp((this.fConst1 * (fSlow162 / fSlow72)));
		var fSlow168 = Math.pow(19, Math.floor((0.5 + (0.339623 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 0.466667))))))));
		var fSlow169 = (0 - (6.90776 * fSlow168));
		var fSlow170 = Math.exp((this.fConst1 * (fSlow169 / fSlow11)));
		var fSlow171 = Math.exp((this.fConst1 * (fSlow169 / fSlow43)));
		var fSlow172 = Math.exp((this.fConst1 * (fSlow169 / fSlow54)));
		var fSlow173 = Math.exp((this.fConst1 * (fSlow169 / fSlow66)));
		var fSlow174 = Math.exp((this.fConst1 * (fSlow169 / fSlow72)));
		var fSlow175 = Math.pow(53, Math.floor((0.5 + (0.251871 * Math.log((this.fConst2 * (fSlow7 * Math.pow(fSlow8, 1))))))));
		var fSlow176 = (0 - (6.90776 * fSlow175));
		var fSlow177 = Math.exp((this.fConst1 * (fSlow176 / fSlow11)));
		var fSlow178 = Math.exp((this.fConst1 * (fSlow176 / fSlow43)));
		var fSlow179 = Math.exp((this.fConst1 * (fSlow176 / fSlow54)));
		var fSlow180 = Math.exp((this.fConst1 * (fSlow176 / fSlow66)));
		var fSlow181 = Math.exp((this.fConst1 * (fSlow176 / fSlow72)));
		var iSlow182 = ((fSlow9 - 1) & 8191);
		var fSlow183 = this.fbutton3;
		var iSlow184 = ((fSlow126 - 1) & 8191);
		var iSlow185 = ((fSlow98 - 1) & 8191);
		var iSlow186 = ((fSlow154 - 1) & 8191);
		var iSlow187 = ((fSlow84 - 1) & 8191);
		var iSlow188 = ((fSlow140 - 1) & 8191);
		var iSlow189 = ((fSlow112 - 1) & 8191);
		var iSlow190 = ((fSlow168 - 1) & 8191);
		var iSlow191 = ((fSlow77 - 1) & 8191);
		var iSlow192 = ((fSlow133 - 1) & 8191);
		var iSlow193 = ((fSlow105 - 1) & 8191);
		var iSlow194 = ((fSlow161 - 1) & 8191);
		var iSlow195 = ((fSlow91 - 1) & 8191);
		var iSlow196 = ((fSlow147 - 1) & 8191);
		var iSlow197 = ((fSlow119 - 1) & 8191);
		var iSlow198 = ((fSlow175 - 1) & 8191);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iRec17[0] = (12345 + (1103515245 * this.iRec17[1]));
			this.fRec16[0] = (((0.522189 * this.fRec16[3]) + ((4.65661e-10 * this.iRec17[0]) + (2.49496 * this.fRec16[1]))) - (2.01727 * this.fRec16[2]));
			var fTemp0 = (fSlow1 * (((0.049922 * this.fRec16[0]) + (0.0506127 * this.fRec16[2])) - ((0.0959935 * this.fRec16[1]) + (0.00440879 * this.fRec16[3]))));
			this.fVec0[0] = fSlow2;
			var iTemp1 = ((fSlow2 - this.fVec0[1]) > 0);
			this.fVec1[0] = fSlow3;
			var iTemp2 = ((fSlow3 - this.fVec1[1]) > 0);
			var fTemp3 = (fSlow4 * input0[i]);
			this.fRec22[0] = ((fSlow19 * this.fRec22[1]) + (fSlow20 * ((fSlow14 * this.fRec0[1]) + (fSlow21 * this.fRec0[2]))));
			this.fRec21[0] = (this.fRec22[0] - (fSlow16 * ((fSlow22 * this.fRec21[2]) + (fSlow23 * this.fRec21[1]))));
			var fTemp4 = (fSlow30 * this.fRec20[1]);
			this.fRec20[0] = ((fSlow16 * (((fSlow17 * this.fRec21[0]) + (fSlow24 * this.fRec21[1])) + (fSlow17 * this.fRec21[2]))) - (fSlow27 * ((fSlow28 * this.fRec20[2]) + fTemp4)));
			var fTemp5 = (fSlow36 * this.fRec19[1]);
			this.fRec19[0] = ((this.fRec20[2] + (fSlow27 * (fTemp4 + (fSlow28 * this.fRec20[0])))) - (fSlow33 * ((fSlow34 * this.fRec19[2]) + fTemp5)));
			var fTemp6 = (fSlow42 * this.fRec18[1]);
			this.fRec18[0] = ((this.fRec19[2] + (fSlow33 * (fTemp5 + (fSlow34 * this.fRec19[0])))) - (fSlow39 * ((fSlow40 * this.fRec18[2]) + fTemp6)));
			this.fRec28[0] = ((fSlow19 * this.fRec28[1]) + (fSlow20 * (this.fRec0[1] + this.fRec0[2])));
			this.fRec27[0] = (this.fRec28[0] - (fSlow16 * ((fSlow22 * this.fRec27[2]) + (fSlow23 * this.fRec27[1]))));
			var fTemp7 = (this.fRec27[2] + (this.fRec27[0] + (2 * this.fRec27[1])));
			var fTemp8 = (fSlow16 * fTemp7);
			this.fVec2[0] = fTemp8;
			this.fRec26[0] = ((fSlow48 * this.fRec26[1]) + (fSlow49 * ((fSlow50 * fTemp7) + (fSlow51 * this.fVec2[1]))));
			this.fRec25[0] = (this.fRec26[0] - (fSlow46 * ((fSlow30 * this.fRec25[1]) + (fSlow52 * this.fRec25[2]))));
			var fTemp9 = (fSlow36 * this.fRec24[1]);
			this.fRec24[0] = ((fSlow46 * (((fSlow29 * this.fRec25[0]) + (fSlow53 * this.fRec25[1])) + (fSlow29 * this.fRec25[2]))) - (fSlow33 * ((fSlow34 * this.fRec24[2]) + fTemp9)));
			var fTemp10 = (fSlow42 * this.fRec23[1]);
			this.fRec23[0] = ((this.fRec24[2] + (fSlow33 * (fTemp9 + (fSlow34 * this.fRec24[0])))) - (fSlow39 * ((fSlow40 * this.fRec23[2]) + fTemp10)));
			this.fRec33[0] = ((fSlow48 * this.fRec33[1]) + (fSlow49 * (fTemp8 + this.fVec2[1])));
			this.fRec32[0] = (this.fRec33[0] - (fSlow46 * ((fSlow52 * this.fRec32[2]) + (fSlow30 * this.fRec32[1]))));
			var fTemp11 = (this.fRec32[2] + (this.fRec32[0] + (2 * this.fRec32[1])));
			var fTemp12 = (fSlow46 * fTemp11);
			this.fVec3[0] = fTemp12;
			this.fRec31[0] = ((fSlow59 * this.fRec31[1]) + (fSlow60 * ((fSlow61 * fTemp11) + (fSlow62 * this.fVec3[1]))));
			this.fRec30[0] = (this.fRec31[0] - (fSlow57 * ((fSlow36 * this.fRec30[1]) + (fSlow63 * this.fRec30[2]))));
			var fTemp13 = (fSlow42 * this.fRec29[1]);
			this.fRec29[0] = ((fSlow57 * (((fSlow35 * this.fRec30[0]) + (fSlow64 * this.fRec30[1])) + (fSlow35 * this.fRec30[2]))) - (fSlow39 * ((fSlow40 * this.fRec29[2]) + fTemp13)));
			this.fRec37[0] = ((fSlow59 * this.fRec37[1]) + (fSlow60 * (fTemp12 + this.fVec3[1])));
			this.fRec36[0] = (this.fRec37[0] - (fSlow57 * ((fSlow63 * this.fRec36[2]) + (fSlow36 * this.fRec36[1]))));
			var fTemp14 = (this.fRec36[2] + (this.fRec36[0] + (2 * this.fRec36[1])));
			var fTemp15 = (fSlow57 * fTemp14);
			this.fVec4[0] = fTemp15;
			this.fRec35[0] = ((fSlow69 * this.fRec35[1]) + (fSlow70 * (fTemp15 + this.fVec4[1])));
			this.fRec34[0] = (this.fRec35[0] - (fSlow65 * ((fSlow71 * this.fRec34[2]) + (fSlow42 * this.fRec34[1]))));
			this.fRec39[0] = ((fSlow69 * this.fRec39[1]) + (fSlow70 * ((fSlow74 * fTemp14) + (fSlow75 * this.fVec4[1]))));
			this.fRec38[0] = (this.fRec39[0] - (fSlow65 * ((fSlow42 * this.fRec38[1]) + (fSlow71 * this.fRec38[2]))));
			var fTemp16 = ((((fSlow12 * (this.fRec18[2] + (fSlow39 * (fTemp6 + (fSlow40 * this.fRec18[0]))))) + (fSlow44 * (this.fRec23[2] + (fSlow39 * (fTemp10 + (fSlow40 * this.fRec23[0])))))) + (fSlow55 * (this.fRec29[2] + (fSlow39 * (fTemp13 + (fSlow40 * this.fRec29[0])))))) + (fSlow65 * ((fSlow67 * (this.fRec34[2] + (this.fRec34[0] + (2 * this.fRec34[1])))) + (fSlow73 * (((fSlow41 * this.fRec38[0]) + (fSlow76 * this.fRec38[1])) + (fSlow41 * this.fRec38[2]))))));
			this.fRec44[0] = ((fSlow19 * this.fRec44[1]) + (fSlow20 * ((fSlow14 * this.fRec8[1]) + (fSlow21 * this.fRec8[2]))));
			this.fRec43[0] = (this.fRec44[0] - (fSlow16 * ((fSlow22 * this.fRec43[2]) + (fSlow23 * this.fRec43[1]))));
			var fTemp17 = (fSlow30 * this.fRec42[1]);
			this.fRec42[0] = ((fSlow16 * (((fSlow17 * this.fRec43[0]) + (fSlow24 * this.fRec43[1])) + (fSlow17 * this.fRec43[2]))) - (fSlow27 * ((fSlow28 * this.fRec42[2]) + fTemp17)));
			var fTemp18 = (fSlow36 * this.fRec41[1]);
			this.fRec41[0] = ((this.fRec42[2] + (fSlow27 * (fTemp17 + (fSlow28 * this.fRec42[0])))) - (fSlow33 * ((fSlow34 * this.fRec41[2]) + fTemp18)));
			var fTemp19 = (fSlow42 * this.fRec40[1]);
			this.fRec40[0] = ((this.fRec41[2] + (fSlow33 * (fTemp18 + (fSlow34 * this.fRec41[0])))) - (fSlow39 * ((fSlow40 * this.fRec40[2]) + fTemp19)));
			this.fRec50[0] = ((fSlow19 * this.fRec50[1]) + (fSlow20 * (this.fRec8[1] + this.fRec8[2])));
			this.fRec49[0] = (this.fRec50[0] - (fSlow16 * ((fSlow22 * this.fRec49[2]) + (fSlow23 * this.fRec49[1]))));
			var fTemp20 = (this.fRec49[2] + (this.fRec49[0] + (2 * this.fRec49[1])));
			var fTemp21 = (fSlow16 * fTemp20);
			this.fVec5[0] = fTemp21;
			this.fRec48[0] = ((fSlow48 * this.fRec48[1]) + (fSlow49 * ((fSlow51 * this.fVec5[1]) + (fSlow50 * fTemp20))));
			this.fRec47[0] = (this.fRec48[0] - (fSlow46 * ((fSlow52 * this.fRec47[2]) + (fSlow30 * this.fRec47[1]))));
			var fTemp22 = (fSlow36 * this.fRec46[1]);
			this.fRec46[0] = ((fSlow46 * (((fSlow29 * this.fRec47[0]) + (fSlow53 * this.fRec47[1])) + (fSlow29 * this.fRec47[2]))) - (fSlow33 * ((fSlow34 * this.fRec46[2]) + fTemp22)));
			var fTemp23 = (fSlow42 * this.fRec45[1]);
			this.fRec45[0] = ((this.fRec46[2] + (fSlow33 * (fTemp22 + (fSlow34 * this.fRec46[0])))) - (fSlow39 * ((fSlow40 * this.fRec45[2]) + fTemp23)));
			this.fRec55[0] = ((fSlow48 * this.fRec55[1]) + (fSlow49 * (this.fVec5[1] + fTemp21)));
			this.fRec54[0] = (this.fRec55[0] - (fSlow46 * ((fSlow52 * this.fRec54[2]) + (fSlow30 * this.fRec54[1]))));
			var fTemp24 = (this.fRec54[2] + (this.fRec54[0] + (2 * this.fRec54[1])));
			var fTemp25 = (fSlow46 * fTemp24);
			this.fVec6[0] = fTemp25;
			this.fRec53[0] = ((fSlow59 * this.fRec53[1]) + (fSlow60 * ((fSlow62 * this.fVec6[1]) + (fSlow61 * fTemp24))));
			this.fRec52[0] = (this.fRec53[0] - (fSlow57 * ((fSlow63 * this.fRec52[2]) + (fSlow36 * this.fRec52[1]))));
			var fTemp26 = (fSlow42 * this.fRec51[1]);
			this.fRec51[0] = ((fSlow57 * (((fSlow35 * this.fRec52[0]) + (fSlow64 * this.fRec52[1])) + (fSlow35 * this.fRec52[2]))) - (fSlow39 * ((fSlow40 * this.fRec51[2]) + fTemp26)));
			this.fRec59[0] = ((fSlow59 * this.fRec59[1]) + (fSlow60 * (this.fVec6[1] + fTemp25)));
			this.fRec58[0] = (this.fRec59[0] - (fSlow57 * ((fSlow63 * this.fRec58[2]) + (fSlow36 * this.fRec58[1]))));
			var fTemp27 = (this.fRec58[2] + (this.fRec58[0] + (2 * this.fRec58[1])));
			var fTemp28 = (fSlow57 * fTemp27);
			this.fVec7[0] = fTemp28;
			this.fRec57[0] = ((fSlow69 * this.fRec57[1]) + (fSlow70 * (this.fVec7[1] + fTemp28)));
			this.fRec56[0] = (this.fRec57[0] - (fSlow65 * ((fSlow71 * this.fRec56[2]) + (fSlow42 * this.fRec56[1]))));
			this.fRec61[0] = ((fSlow69 * this.fRec61[1]) + (fSlow70 * ((fSlow75 * this.fVec7[1]) + (fSlow74 * fTemp27))));
			this.fRec60[0] = (this.fRec61[0] - (fSlow65 * ((fSlow71 * this.fRec60[2]) + (fSlow42 * this.fRec60[1]))));
			var fTemp29 = ((((fSlow79 * (this.fRec40[2] + (fSlow39 * (fTemp19 + (fSlow40 * this.fRec40[0]))))) + (fSlow80 * (this.fRec45[2] + (fSlow39 * (fTemp23 + (fSlow40 * this.fRec45[0])))))) + (fSlow81 * (this.fRec51[2] + (fSlow39 * (fTemp26 + (fSlow40 * this.fRec51[0])))))) + (fSlow65 * ((fSlow82 * (this.fRec56[2] + (this.fRec56[0] + (2 * this.fRec56[1])))) + (fSlow83 * (((fSlow41 * this.fRec60[0]) + (fSlow76 * this.fRec60[1])) + (fSlow41 * this.fRec60[2]))))));
			var fTemp30 = (fTemp16 + fTemp29);
			this.fRec66[0] = ((fSlow19 * this.fRec66[1]) + (fSlow20 * ((fSlow14 * this.fRec4[1]) + (fSlow21 * this.fRec4[2]))));
			this.fRec65[0] = (this.fRec66[0] - (fSlow16 * ((fSlow22 * this.fRec65[2]) + (fSlow23 * this.fRec65[1]))));
			var fTemp31 = (fSlow30 * this.fRec64[1]);
			this.fRec64[0] = ((fSlow16 * (((fSlow17 * this.fRec65[0]) + (fSlow24 * this.fRec65[1])) + (fSlow17 * this.fRec65[2]))) - (fSlow27 * ((fSlow28 * this.fRec64[2]) + fTemp31)));
			var fTemp32 = (fSlow36 * this.fRec63[1]);
			this.fRec63[0] = ((this.fRec64[2] + (fSlow27 * (fTemp31 + (fSlow28 * this.fRec64[0])))) - (fSlow33 * ((fSlow34 * this.fRec63[2]) + fTemp32)));
			var fTemp33 = (fSlow42 * this.fRec62[1]);
			this.fRec62[0] = ((this.fRec63[2] + (fSlow33 * (fTemp32 + (fSlow34 * this.fRec63[0])))) - (fSlow39 * ((fSlow40 * this.fRec62[2]) + fTemp33)));
			this.fRec72[0] = ((fSlow19 * this.fRec72[1]) + (fSlow20 * (this.fRec4[1] + this.fRec4[2])));
			this.fRec71[0] = (this.fRec72[0] - (fSlow16 * ((fSlow22 * this.fRec71[2]) + (fSlow23 * this.fRec71[1]))));
			var fTemp34 = (this.fRec71[2] + (this.fRec71[0] + (2 * this.fRec71[1])));
			var fTemp35 = (fSlow16 * fTemp34);
			this.fVec8[0] = fTemp35;
			this.fRec70[0] = ((fSlow48 * this.fRec70[1]) + (fSlow49 * ((fSlow51 * this.fVec8[1]) + (fSlow50 * fTemp34))));
			this.fRec69[0] = (this.fRec70[0] - (fSlow46 * ((fSlow52 * this.fRec69[2]) + (fSlow30 * this.fRec69[1]))));
			var fTemp36 = (fSlow36 * this.fRec68[1]);
			this.fRec68[0] = ((fSlow46 * (((fSlow29 * this.fRec69[0]) + (fSlow53 * this.fRec69[1])) + (fSlow29 * this.fRec69[2]))) - (fSlow33 * ((fSlow34 * this.fRec68[2]) + fTemp36)));
			var fTemp37 = (fSlow42 * this.fRec67[1]);
			this.fRec67[0] = ((this.fRec68[2] + (fSlow33 * (fTemp36 + (fSlow34 * this.fRec68[0])))) - (fSlow39 * ((fSlow40 * this.fRec67[2]) + fTemp37)));
			this.fRec77[0] = ((fSlow48 * this.fRec77[1]) + (fSlow49 * (this.fVec8[1] + fTemp35)));
			this.fRec76[0] = (this.fRec77[0] - (fSlow46 * ((fSlow52 * this.fRec76[2]) + (fSlow30 * this.fRec76[1]))));
			var fTemp38 = (this.fRec76[2] + (this.fRec76[0] + (2 * this.fRec76[1])));
			var fTemp39 = (fSlow46 * fTemp38);
			this.fVec9[0] = fTemp39;
			this.fRec75[0] = ((fSlow59 * this.fRec75[1]) + (fSlow60 * ((fSlow62 * this.fVec9[1]) + (fSlow61 * fTemp38))));
			this.fRec74[0] = (this.fRec75[0] - (fSlow57 * ((fSlow63 * this.fRec74[2]) + (fSlow36 * this.fRec74[1]))));
			var fTemp40 = (fSlow42 * this.fRec73[1]);
			this.fRec73[0] = ((fSlow57 * (((fSlow35 * this.fRec74[0]) + (fSlow64 * this.fRec74[1])) + (fSlow35 * this.fRec74[2]))) - (fSlow39 * ((fSlow40 * this.fRec73[2]) + fTemp40)));
			this.fRec81[0] = ((fSlow59 * this.fRec81[1]) + (fSlow60 * (this.fVec9[1] + fTemp39)));
			this.fRec80[0] = (this.fRec81[0] - (fSlow57 * ((fSlow63 * this.fRec80[2]) + (fSlow36 * this.fRec80[1]))));
			var fTemp41 = (this.fRec80[2] + (this.fRec80[0] + (2 * this.fRec80[1])));
			var fTemp42 = (fSlow57 * fTemp41);
			this.fVec10[0] = fTemp42;
			this.fRec79[0] = ((fSlow69 * this.fRec79[1]) + (fSlow70 * (this.fVec10[1] + fTemp42)));
			this.fRec78[0] = (this.fRec79[0] - (fSlow65 * ((fSlow71 * this.fRec78[2]) + (fSlow42 * this.fRec78[1]))));
			this.fRec83[0] = ((fSlow69 * this.fRec83[1]) + (fSlow70 * ((fSlow75 * this.fVec10[1]) + (fSlow74 * fTemp41))));
			this.fRec82[0] = (this.fRec83[0] - (fSlow65 * ((fSlow71 * this.fRec82[2]) + (fSlow42 * this.fRec82[1]))));
			var fTemp43 = ((((fSlow86 * (this.fRec62[2] + (fSlow39 * (fTemp33 + (fSlow40 * this.fRec62[0]))))) + (fSlow87 * (this.fRec67[2] + (fSlow39 * (fTemp37 + (fSlow40 * this.fRec67[0])))))) + (fSlow88 * (this.fRec73[2] + (fSlow39 * (fTemp40 + (fSlow40 * this.fRec73[0])))))) + (fSlow65 * ((fSlow89 * (this.fRec78[2] + (this.fRec78[0] + (2 * this.fRec78[1])))) + (fSlow90 * (((fSlow41 * this.fRec82[0]) + (fSlow76 * this.fRec82[1])) + (fSlow41 * this.fRec82[2]))))));
			this.fRec88[0] = ((fSlow19 * this.fRec88[1]) + (fSlow20 * ((fSlow14 * this.fRec12[1]) + (fSlow21 * this.fRec12[2]))));
			this.fRec87[0] = (this.fRec88[0] - (fSlow16 * ((fSlow22 * this.fRec87[2]) + (fSlow23 * this.fRec87[1]))));
			var fTemp44 = (fSlow30 * this.fRec86[1]);
			this.fRec86[0] = ((fSlow16 * (((fSlow17 * this.fRec87[0]) + (fSlow24 * this.fRec87[1])) + (fSlow17 * this.fRec87[2]))) - (fSlow27 * ((fSlow28 * this.fRec86[2]) + fTemp44)));
			var fTemp45 = (fSlow36 * this.fRec85[1]);
			this.fRec85[0] = ((this.fRec86[2] + (fSlow27 * (fTemp44 + (fSlow28 * this.fRec86[0])))) - (fSlow33 * ((fSlow34 * this.fRec85[2]) + fTemp45)));
			var fTemp46 = (fSlow42 * this.fRec84[1]);
			this.fRec84[0] = ((this.fRec85[2] + (fSlow33 * (fTemp45 + (fSlow34 * this.fRec85[0])))) - (fSlow39 * ((fSlow40 * this.fRec84[2]) + fTemp46)));
			this.fRec94[0] = ((fSlow19 * this.fRec94[1]) + (fSlow20 * (this.fRec12[1] + this.fRec12[2])));
			this.fRec93[0] = (this.fRec94[0] - (fSlow16 * ((fSlow22 * this.fRec93[2]) + (fSlow23 * this.fRec93[1]))));
			var fTemp47 = (this.fRec93[2] + (this.fRec93[0] + (2 * this.fRec93[1])));
			var fTemp48 = (fSlow16 * fTemp47);
			this.fVec11[0] = fTemp48;
			this.fRec92[0] = ((fSlow48 * this.fRec92[1]) + (fSlow49 * ((fSlow51 * this.fVec11[1]) + (fSlow50 * fTemp47))));
			this.fRec91[0] = (this.fRec92[0] - (fSlow46 * ((fSlow52 * this.fRec91[2]) + (fSlow30 * this.fRec91[1]))));
			var fTemp49 = (fSlow36 * this.fRec90[1]);
			this.fRec90[0] = ((fSlow46 * (((fSlow29 * this.fRec91[0]) + (fSlow53 * this.fRec91[1])) + (fSlow29 * this.fRec91[2]))) - (fSlow33 * ((fSlow34 * this.fRec90[2]) + fTemp49)));
			var fTemp50 = (fSlow42 * this.fRec89[1]);
			this.fRec89[0] = ((this.fRec90[2] + (fSlow33 * (fTemp49 + (fSlow34 * this.fRec90[0])))) - (fSlow39 * ((fSlow40 * this.fRec89[2]) + fTemp50)));
			this.fRec99[0] = ((fSlow48 * this.fRec99[1]) + (fSlow49 * (this.fVec11[1] + fTemp48)));
			this.fRec98[0] = (this.fRec99[0] - (fSlow46 * ((fSlow52 * this.fRec98[2]) + (fSlow30 * this.fRec98[1]))));
			var fTemp51 = (this.fRec98[2] + (this.fRec98[0] + (2 * this.fRec98[1])));
			var fTemp52 = (fSlow46 * fTemp51);
			this.fVec12[0] = fTemp52;
			this.fRec97[0] = ((fSlow59 * this.fRec97[1]) + (fSlow60 * ((fSlow62 * this.fVec12[1]) + (fSlow61 * fTemp51))));
			this.fRec96[0] = (this.fRec97[0] - (fSlow57 * ((fSlow63 * this.fRec96[2]) + (fSlow36 * this.fRec96[1]))));
			var fTemp53 = (fSlow42 * this.fRec95[1]);
			this.fRec95[0] = ((fSlow57 * (((fSlow35 * this.fRec96[0]) + (fSlow64 * this.fRec96[1])) + (fSlow35 * this.fRec96[2]))) - (fSlow39 * ((fSlow40 * this.fRec95[2]) + fTemp53)));
			this.fRec103[0] = ((fSlow59 * this.fRec103[1]) + (fSlow60 * (this.fVec12[1] + fTemp52)));
			this.fRec102[0] = (this.fRec103[0] - (fSlow57 * ((fSlow63 * this.fRec102[2]) + (fSlow36 * this.fRec102[1]))));
			var fTemp54 = (this.fRec102[2] + (this.fRec102[0] + (2 * this.fRec102[1])));
			var fTemp55 = (fSlow57 * fTemp54);
			this.fVec13[0] = fTemp55;
			this.fRec101[0] = ((fSlow69 * this.fRec101[1]) + (fSlow70 * (this.fVec13[1] + fTemp55)));
			this.fRec100[0] = (this.fRec101[0] - (fSlow65 * ((fSlow71 * this.fRec100[2]) + (fSlow42 * this.fRec100[1]))));
			this.fRec105[0] = ((fSlow69 * this.fRec105[1]) + (fSlow70 * ((fSlow75 * this.fVec13[1]) + (fSlow74 * fTemp54))));
			this.fRec104[0] = (this.fRec105[0] - (fSlow65 * ((fSlow71 * this.fRec104[2]) + (fSlow42 * this.fRec104[1]))));
			var fTemp56 = ((((fSlow93 * (this.fRec84[2] + (fSlow39 * (fTemp46 + (fSlow40 * this.fRec84[0]))))) + (fSlow94 * (this.fRec89[2] + (fSlow39 * (fTemp50 + (fSlow40 * this.fRec89[0])))))) + (fSlow95 * (this.fRec95[2] + (fSlow39 * (fTemp53 + (fSlow40 * this.fRec95[0])))))) + (fSlow65 * ((fSlow96 * (this.fRec100[2] + (this.fRec100[0] + (2 * this.fRec100[1])))) + (fSlow97 * (((fSlow41 * this.fRec104[0]) + (fSlow76 * this.fRec104[1])) + (fSlow41 * this.fRec104[2]))))));
			var fTemp57 = (fTemp43 + fTemp56);
			var fTemp58 = (fTemp30 + fTemp57);
			this.fRec110[0] = ((fSlow19 * this.fRec110[1]) + (fSlow20 * ((fSlow14 * this.fRec2[1]) + (fSlow21 * this.fRec2[2]))));
			this.fRec109[0] = (this.fRec110[0] - (fSlow16 * ((fSlow22 * this.fRec109[2]) + (fSlow23 * this.fRec109[1]))));
			var fTemp59 = (fSlow30 * this.fRec108[1]);
			this.fRec108[0] = ((fSlow16 * (((fSlow17 * this.fRec109[0]) + (fSlow24 * this.fRec109[1])) + (fSlow17 * this.fRec109[2]))) - (fSlow27 * ((fSlow28 * this.fRec108[2]) + fTemp59)));
			var fTemp60 = (fSlow36 * this.fRec107[1]);
			this.fRec107[0] = ((this.fRec108[2] + (fSlow27 * (fTemp59 + (fSlow28 * this.fRec108[0])))) - (fSlow33 * ((fSlow34 * this.fRec107[2]) + fTemp60)));
			var fTemp61 = (fSlow42 * this.fRec106[1]);
			this.fRec106[0] = ((this.fRec107[2] + (fSlow33 * (fTemp60 + (fSlow34 * this.fRec107[0])))) - (fSlow39 * ((fSlow40 * this.fRec106[2]) + fTemp61)));
			this.fRec116[0] = ((fSlow19 * this.fRec116[1]) + (fSlow20 * (this.fRec2[1] + this.fRec2[2])));
			this.fRec115[0] = (this.fRec116[0] - (fSlow16 * ((fSlow22 * this.fRec115[2]) + (fSlow23 * this.fRec115[1]))));
			var fTemp62 = (this.fRec115[2] + (this.fRec115[0] + (2 * this.fRec115[1])));
			var fTemp63 = (fSlow16 * fTemp62);
			this.fVec14[0] = fTemp63;
			this.fRec114[0] = ((fSlow48 * this.fRec114[1]) + (fSlow49 * ((fSlow51 * this.fVec14[1]) + (fSlow50 * fTemp62))));
			this.fRec113[0] = (this.fRec114[0] - (fSlow46 * ((fSlow52 * this.fRec113[2]) + (fSlow30 * this.fRec113[1]))));
			var fTemp64 = (fSlow36 * this.fRec112[1]);
			this.fRec112[0] = ((fSlow46 * (((fSlow29 * this.fRec113[0]) + (fSlow53 * this.fRec113[1])) + (fSlow29 * this.fRec113[2]))) - (fSlow33 * ((fSlow34 * this.fRec112[2]) + fTemp64)));
			var fTemp65 = (fSlow42 * this.fRec111[1]);
			this.fRec111[0] = ((this.fRec112[2] + (fSlow33 * (fTemp64 + (fSlow34 * this.fRec112[0])))) - (fSlow39 * ((fSlow40 * this.fRec111[2]) + fTemp65)));
			this.fRec121[0] = ((fSlow48 * this.fRec121[1]) + (fSlow49 * (this.fVec14[1] + fTemp63)));
			this.fRec120[0] = (this.fRec121[0] - (fSlow46 * ((fSlow52 * this.fRec120[2]) + (fSlow30 * this.fRec120[1]))));
			var fTemp66 = (this.fRec120[2] + (this.fRec120[0] + (2 * this.fRec120[1])));
			var fTemp67 = (fSlow46 * fTemp66);
			this.fVec15[0] = fTemp67;
			this.fRec119[0] = ((fSlow59 * this.fRec119[1]) + (fSlow60 * ((fSlow62 * this.fVec15[1]) + (fSlow61 * fTemp66))));
			this.fRec118[0] = (this.fRec119[0] - (fSlow57 * ((fSlow63 * this.fRec118[2]) + (fSlow36 * this.fRec118[1]))));
			var fTemp68 = (fSlow42 * this.fRec117[1]);
			this.fRec117[0] = ((fSlow57 * (((fSlow35 * this.fRec118[0]) + (fSlow64 * this.fRec118[1])) + (fSlow35 * this.fRec118[2]))) - (fSlow39 * ((fSlow40 * this.fRec117[2]) + fTemp68)));
			this.fRec125[0] = ((fSlow59 * this.fRec125[1]) + (fSlow60 * (this.fVec15[1] + fTemp67)));
			this.fRec124[0] = (this.fRec125[0] - (fSlow57 * ((fSlow63 * this.fRec124[2]) + (fSlow36 * this.fRec124[1]))));
			var fTemp69 = (this.fRec124[2] + (this.fRec124[0] + (2 * this.fRec124[1])));
			var fTemp70 = (fSlow57 * fTemp69);
			this.fVec16[0] = fTemp70;
			this.fRec123[0] = ((fSlow69 * this.fRec123[1]) + (fSlow70 * (this.fVec16[1] + fTemp70)));
			this.fRec122[0] = (this.fRec123[0] - (fSlow65 * ((fSlow71 * this.fRec122[2]) + (fSlow42 * this.fRec122[1]))));
			this.fRec127[0] = ((fSlow69 * this.fRec127[1]) + (fSlow70 * ((fSlow75 * this.fVec16[1]) + (fSlow74 * fTemp69))));
			this.fRec126[0] = (this.fRec127[0] - (fSlow65 * ((fSlow71 * this.fRec126[2]) + (fSlow42 * this.fRec126[1]))));
			var fTemp71 = ((((fSlow100 * (this.fRec106[2] + (fSlow39 * (fTemp61 + (fSlow40 * this.fRec106[0]))))) + (fSlow101 * (this.fRec111[2] + (fSlow39 * (fTemp65 + (fSlow40 * this.fRec111[0])))))) + (fSlow102 * (this.fRec117[2] + (fSlow39 * (fTemp68 + (fSlow40 * this.fRec117[0])))))) + (fSlow65 * ((fSlow103 * (this.fRec122[2] + (this.fRec122[0] + (2 * this.fRec122[1])))) + (fSlow104 * (((fSlow41 * this.fRec126[0]) + (fSlow76 * this.fRec126[1])) + (fSlow41 * this.fRec126[2]))))));
			this.fRec132[0] = ((fSlow19 * this.fRec132[1]) + (fSlow20 * ((fSlow14 * this.fRec10[1]) + (fSlow21 * this.fRec10[2]))));
			this.fRec131[0] = (this.fRec132[0] - (fSlow16 * ((fSlow22 * this.fRec131[2]) + (fSlow23 * this.fRec131[1]))));
			var fTemp72 = (fSlow30 * this.fRec130[1]);
			this.fRec130[0] = ((fSlow16 * (((fSlow17 * this.fRec131[0]) + (fSlow24 * this.fRec131[1])) + (fSlow17 * this.fRec131[2]))) - (fSlow27 * ((fSlow28 * this.fRec130[2]) + fTemp72)));
			var fTemp73 = (fSlow36 * this.fRec129[1]);
			this.fRec129[0] = ((this.fRec130[2] + (fSlow27 * (fTemp72 + (fSlow28 * this.fRec130[0])))) - (fSlow33 * ((fSlow34 * this.fRec129[2]) + fTemp73)));
			var fTemp74 = (fSlow42 * this.fRec128[1]);
			this.fRec128[0] = ((this.fRec129[2] + (fSlow33 * (fTemp73 + (fSlow34 * this.fRec129[0])))) - (fSlow39 * ((fSlow40 * this.fRec128[2]) + fTemp74)));
			this.fRec138[0] = ((fSlow19 * this.fRec138[1]) + (fSlow20 * (this.fRec10[1] + this.fRec10[2])));
			this.fRec137[0] = (this.fRec138[0] - (fSlow16 * ((fSlow22 * this.fRec137[2]) + (fSlow23 * this.fRec137[1]))));
			var fTemp75 = (this.fRec137[2] + (this.fRec137[0] + (2 * this.fRec137[1])));
			var fTemp76 = (fSlow16 * fTemp75);
			this.fVec17[0] = fTemp76;
			this.fRec136[0] = ((fSlow48 * this.fRec136[1]) + (fSlow49 * ((fSlow51 * this.fVec17[1]) + (fSlow50 * fTemp75))));
			this.fRec135[0] = (this.fRec136[0] - (fSlow46 * ((fSlow52 * this.fRec135[2]) + (fSlow30 * this.fRec135[1]))));
			var fTemp77 = (fSlow36 * this.fRec134[1]);
			this.fRec134[0] = ((fSlow46 * (((fSlow29 * this.fRec135[0]) + (fSlow53 * this.fRec135[1])) + (fSlow29 * this.fRec135[2]))) - (fSlow33 * ((fSlow34 * this.fRec134[2]) + fTemp77)));
			var fTemp78 = (fSlow42 * this.fRec133[1]);
			this.fRec133[0] = ((this.fRec134[2] + (fSlow33 * (fTemp77 + (fSlow34 * this.fRec134[0])))) - (fSlow39 * ((fSlow40 * this.fRec133[2]) + fTemp78)));
			this.fRec143[0] = ((fSlow48 * this.fRec143[1]) + (fSlow49 * (this.fVec17[1] + fTemp76)));
			this.fRec142[0] = (this.fRec143[0] - (fSlow46 * ((fSlow52 * this.fRec142[2]) + (fSlow30 * this.fRec142[1]))));
			var fTemp79 = (this.fRec142[2] + (this.fRec142[0] + (2 * this.fRec142[1])));
			var fTemp80 = (fSlow46 * fTemp79);
			this.fVec18[0] = fTemp80;
			this.fRec141[0] = ((fSlow59 * this.fRec141[1]) + (fSlow60 * ((fSlow62 * this.fVec18[1]) + (fSlow61 * fTemp79))));
			this.fRec140[0] = (this.fRec141[0] - (fSlow57 * ((fSlow63 * this.fRec140[2]) + (fSlow36 * this.fRec140[1]))));
			var fTemp81 = (fSlow42 * this.fRec139[1]);
			this.fRec139[0] = ((fSlow57 * (((fSlow35 * this.fRec140[0]) + (fSlow64 * this.fRec140[1])) + (fSlow35 * this.fRec140[2]))) - (fSlow39 * ((fSlow40 * this.fRec139[2]) + fTemp81)));
			this.fRec147[0] = ((fSlow59 * this.fRec147[1]) + (fSlow60 * (this.fVec18[1] + fTemp80)));
			this.fRec146[0] = (this.fRec147[0] - (fSlow57 * ((fSlow63 * this.fRec146[2]) + (fSlow36 * this.fRec146[1]))));
			var fTemp82 = (this.fRec146[2] + (this.fRec146[0] + (2 * this.fRec146[1])));
			var fTemp83 = (fSlow57 * fTemp82);
			this.fVec19[0] = fTemp83;
			this.fRec145[0] = ((fSlow69 * this.fRec145[1]) + (fSlow70 * (this.fVec19[1] + fTemp83)));
			this.fRec144[0] = (this.fRec145[0] - (fSlow65 * ((fSlow71 * this.fRec144[2]) + (fSlow42 * this.fRec144[1]))));
			this.fRec149[0] = ((fSlow69 * this.fRec149[1]) + (fSlow70 * ((fSlow75 * this.fVec19[1]) + (fSlow74 * fTemp82))));
			this.fRec148[0] = (this.fRec149[0] - (fSlow65 * ((fSlow71 * this.fRec148[2]) + (fSlow42 * this.fRec148[1]))));
			var fTemp84 = ((((fSlow107 * (this.fRec128[2] + (fSlow39 * (fTemp74 + (fSlow40 * this.fRec128[0]))))) + (fSlow108 * (this.fRec133[2] + (fSlow39 * (fTemp78 + (fSlow40 * this.fRec133[0])))))) + (fSlow109 * (this.fRec139[2] + (fSlow39 * (fTemp81 + (fSlow40 * this.fRec139[0])))))) + (fSlow65 * ((fSlow110 * (this.fRec144[2] + (this.fRec144[0] + (2 * this.fRec144[1])))) + (fSlow111 * (((fSlow41 * this.fRec148[0]) + (fSlow76 * this.fRec148[1])) + (fSlow41 * this.fRec148[2]))))));
			var fTemp85 = (fTemp71 + fTemp84);
			this.fRec154[0] = ((fSlow19 * this.fRec154[1]) + (fSlow20 * ((fSlow14 * this.fRec6[1]) + (fSlow21 * this.fRec6[2]))));
			this.fRec153[0] = (this.fRec154[0] - (fSlow16 * ((fSlow22 * this.fRec153[2]) + (fSlow23 * this.fRec153[1]))));
			var fTemp86 = (fSlow30 * this.fRec152[1]);
			this.fRec152[0] = ((fSlow16 * (((fSlow17 * this.fRec153[0]) + (fSlow24 * this.fRec153[1])) + (fSlow17 * this.fRec153[2]))) - (fSlow27 * ((fSlow28 * this.fRec152[2]) + fTemp86)));
			var fTemp87 = (fSlow36 * this.fRec151[1]);
			this.fRec151[0] = ((this.fRec152[2] + (fSlow27 * (fTemp86 + (fSlow28 * this.fRec152[0])))) - (fSlow33 * ((fSlow34 * this.fRec151[2]) + fTemp87)));
			var fTemp88 = (fSlow42 * this.fRec150[1]);
			this.fRec150[0] = ((this.fRec151[2] + (fSlow33 * (fTemp87 + (fSlow34 * this.fRec151[0])))) - (fSlow39 * ((fSlow40 * this.fRec150[2]) + fTemp88)));
			this.fRec160[0] = ((fSlow19 * this.fRec160[1]) + (fSlow20 * (this.fRec6[1] + this.fRec6[2])));
			this.fRec159[0] = (this.fRec160[0] - (fSlow16 * ((fSlow22 * this.fRec159[2]) + (fSlow23 * this.fRec159[1]))));
			var fTemp89 = (this.fRec159[2] + (this.fRec159[0] + (2 * this.fRec159[1])));
			var fTemp90 = (fSlow16 * fTemp89);
			this.fVec20[0] = fTemp90;
			this.fRec158[0] = ((fSlow48 * this.fRec158[1]) + (fSlow49 * ((fSlow51 * this.fVec20[1]) + (fSlow50 * fTemp89))));
			this.fRec157[0] = (this.fRec158[0] - (fSlow46 * ((fSlow52 * this.fRec157[2]) + (fSlow30 * this.fRec157[1]))));
			var fTemp91 = (fSlow36 * this.fRec156[1]);
			this.fRec156[0] = ((fSlow46 * (((fSlow29 * this.fRec157[0]) + (fSlow53 * this.fRec157[1])) + (fSlow29 * this.fRec157[2]))) - (fSlow33 * ((fSlow34 * this.fRec156[2]) + fTemp91)));
			var fTemp92 = (fSlow42 * this.fRec155[1]);
			this.fRec155[0] = ((this.fRec156[2] + (fSlow33 * (fTemp91 + (fSlow34 * this.fRec156[0])))) - (fSlow39 * ((fSlow40 * this.fRec155[2]) + fTemp92)));
			this.fRec165[0] = ((fSlow48 * this.fRec165[1]) + (fSlow49 * (this.fVec20[1] + fTemp90)));
			this.fRec164[0] = (this.fRec165[0] - (fSlow46 * ((fSlow52 * this.fRec164[2]) + (fSlow30 * this.fRec164[1]))));
			var fTemp93 = (this.fRec164[2] + (this.fRec164[0] + (2 * this.fRec164[1])));
			var fTemp94 = (fSlow46 * fTemp93);
			this.fVec21[0] = fTemp94;
			this.fRec163[0] = ((fSlow59 * this.fRec163[1]) + (fSlow60 * ((fSlow62 * this.fVec21[1]) + (fSlow61 * fTemp93))));
			this.fRec162[0] = (this.fRec163[0] - (fSlow57 * ((fSlow63 * this.fRec162[2]) + (fSlow36 * this.fRec162[1]))));
			var fTemp95 = (fSlow42 * this.fRec161[1]);
			this.fRec161[0] = ((fSlow57 * (((fSlow35 * this.fRec162[0]) + (fSlow64 * this.fRec162[1])) + (fSlow35 * this.fRec162[2]))) - (fSlow39 * ((fSlow40 * this.fRec161[2]) + fTemp95)));
			this.fRec169[0] = ((fSlow59 * this.fRec169[1]) + (fSlow60 * (this.fVec21[1] + fTemp94)));
			this.fRec168[0] = (this.fRec169[0] - (fSlow57 * ((fSlow63 * this.fRec168[2]) + (fSlow36 * this.fRec168[1]))));
			var fTemp96 = (this.fRec168[2] + (this.fRec168[0] + (2 * this.fRec168[1])));
			var fTemp97 = (fSlow57 * fTemp96);
			this.fVec22[0] = fTemp97;
			this.fRec167[0] = ((fSlow69 * this.fRec167[1]) + (fSlow70 * (this.fVec22[1] + fTemp97)));
			this.fRec166[0] = (this.fRec167[0] - (fSlow65 * ((fSlow71 * this.fRec166[2]) + (fSlow42 * this.fRec166[1]))));
			this.fRec171[0] = ((fSlow69 * this.fRec171[1]) + (fSlow70 * ((fSlow75 * this.fVec22[1]) + (fSlow74 * fTemp96))));
			this.fRec170[0] = (this.fRec171[0] - (fSlow65 * ((fSlow71 * this.fRec170[2]) + (fSlow42 * this.fRec170[1]))));
			var fTemp98 = ((((fSlow114 * (this.fRec150[2] + (fSlow39 * (fTemp88 + (fSlow40 * this.fRec150[0]))))) + (fSlow115 * (this.fRec155[2] + (fSlow39 * (fTemp92 + (fSlow40 * this.fRec155[0])))))) + (fSlow116 * (this.fRec161[2] + (fSlow39 * (fTemp95 + (fSlow40 * this.fRec161[0])))))) + (fSlow65 * ((fSlow117 * (this.fRec166[2] + (this.fRec166[0] + (2 * this.fRec166[1])))) + (fSlow118 * (((fSlow41 * this.fRec170[0]) + (fSlow76 * this.fRec170[1])) + (fSlow41 * this.fRec170[2]))))));
			this.fRec176[0] = ((fSlow19 * this.fRec176[1]) + (fSlow20 * ((fSlow14 * this.fRec14[1]) + (fSlow21 * this.fRec14[2]))));
			this.fRec175[0] = (this.fRec176[0] - (fSlow16 * ((fSlow22 * this.fRec175[2]) + (fSlow23 * this.fRec175[1]))));
			var fTemp99 = (fSlow30 * this.fRec174[1]);
			this.fRec174[0] = ((fSlow16 * (((fSlow17 * this.fRec175[0]) + (fSlow24 * this.fRec175[1])) + (fSlow17 * this.fRec175[2]))) - (fSlow27 * ((fSlow28 * this.fRec174[2]) + fTemp99)));
			var fTemp100 = (fSlow36 * this.fRec173[1]);
			this.fRec173[0] = ((this.fRec174[2] + (fSlow27 * (fTemp99 + (fSlow28 * this.fRec174[0])))) - (fSlow33 * ((fSlow34 * this.fRec173[2]) + fTemp100)));
			var fTemp101 = (fSlow42 * this.fRec172[1]);
			this.fRec172[0] = ((this.fRec173[2] + (fSlow33 * (fTemp100 + (fSlow34 * this.fRec173[0])))) - (fSlow39 * ((fSlow40 * this.fRec172[2]) + fTemp101)));
			this.fRec182[0] = ((fSlow19 * this.fRec182[1]) + (fSlow20 * (this.fRec14[1] + this.fRec14[2])));
			this.fRec181[0] = (this.fRec182[0] - (fSlow16 * ((fSlow22 * this.fRec181[2]) + (fSlow23 * this.fRec181[1]))));
			var fTemp102 = (this.fRec181[2] + (this.fRec181[0] + (2 * this.fRec181[1])));
			var fTemp103 = (fSlow16 * fTemp102);
			this.fVec23[0] = fTemp103;
			this.fRec180[0] = ((fSlow48 * this.fRec180[1]) + (fSlow49 * ((fSlow51 * this.fVec23[1]) + (fSlow50 * fTemp102))));
			this.fRec179[0] = (this.fRec180[0] - (fSlow46 * ((fSlow52 * this.fRec179[2]) + (fSlow30 * this.fRec179[1]))));
			var fTemp104 = (fSlow36 * this.fRec178[1]);
			this.fRec178[0] = ((fSlow46 * (((fSlow29 * this.fRec179[0]) + (fSlow53 * this.fRec179[1])) + (fSlow29 * this.fRec179[2]))) - (fSlow33 * ((fSlow34 * this.fRec178[2]) + fTemp104)));
			var fTemp105 = (fSlow42 * this.fRec177[1]);
			this.fRec177[0] = ((this.fRec178[2] + (fSlow33 * (fTemp104 + (fSlow34 * this.fRec178[0])))) - (fSlow39 * ((fSlow40 * this.fRec177[2]) + fTemp105)));
			this.fRec187[0] = ((fSlow48 * this.fRec187[1]) + (fSlow49 * (this.fVec23[1] + fTemp103)));
			this.fRec186[0] = (this.fRec187[0] - (fSlow46 * ((fSlow52 * this.fRec186[2]) + (fSlow30 * this.fRec186[1]))));
			var fTemp106 = (this.fRec186[2] + (this.fRec186[0] + (2 * this.fRec186[1])));
			var fTemp107 = (fSlow46 * fTemp106);
			this.fVec24[0] = fTemp107;
			this.fRec185[0] = ((fSlow59 * this.fRec185[1]) + (fSlow60 * ((fSlow62 * this.fVec24[1]) + (fSlow61 * fTemp106))));
			this.fRec184[0] = (this.fRec185[0] - (fSlow57 * ((fSlow63 * this.fRec184[2]) + (fSlow36 * this.fRec184[1]))));
			var fTemp108 = (fSlow42 * this.fRec183[1]);
			this.fRec183[0] = ((fSlow57 * (((fSlow35 * this.fRec184[0]) + (fSlow64 * this.fRec184[1])) + (fSlow35 * this.fRec184[2]))) - (fSlow39 * ((fSlow40 * this.fRec183[2]) + fTemp108)));
			this.fRec191[0] = ((fSlow59 * this.fRec191[1]) + (fSlow60 * (this.fVec24[1] + fTemp107)));
			this.fRec190[0] = (this.fRec191[0] - (fSlow57 * ((fSlow63 * this.fRec190[2]) + (fSlow36 * this.fRec190[1]))));
			var fTemp109 = (this.fRec190[2] + (this.fRec190[0] + (2 * this.fRec190[1])));
			var fTemp110 = (fSlow57 * fTemp109);
			this.fVec25[0] = fTemp110;
			this.fRec189[0] = ((fSlow69 * this.fRec189[1]) + (fSlow70 * (this.fVec25[1] + fTemp110)));
			this.fRec188[0] = (this.fRec189[0] - (fSlow65 * ((fSlow71 * this.fRec188[2]) + (fSlow42 * this.fRec188[1]))));
			this.fRec193[0] = ((fSlow69 * this.fRec193[1]) + (fSlow70 * ((fSlow75 * this.fVec25[1]) + (fSlow74 * fTemp109))));
			this.fRec192[0] = (this.fRec193[0] - (fSlow65 * ((fSlow71 * this.fRec192[2]) + (fSlow42 * this.fRec192[1]))));
			var fTemp111 = ((((fSlow121 * (this.fRec172[2] + (fSlow39 * (fTemp101 + (fSlow40 * this.fRec172[0]))))) + (fSlow122 * (this.fRec177[2] + (fSlow39 * (fTemp105 + (fSlow40 * this.fRec177[0])))))) + (fSlow123 * (this.fRec183[2] + (fSlow39 * (fTemp108 + (fSlow40 * this.fRec183[0])))))) + (fSlow65 * ((fSlow124 * (this.fRec188[2] + (this.fRec188[0] + (2 * this.fRec188[1])))) + (fSlow125 * (((fSlow41 * this.fRec192[0]) + (fSlow76 * this.fRec192[1])) + (fSlow41 * this.fRec192[2]))))));
			var fTemp112 = (fTemp98 + fTemp111);
			var fTemp113 = (fTemp85 + fTemp112);
			var fTemp114 = (fTemp58 + fTemp113);
			this.fRec198[0] = ((fSlow19 * this.fRec198[1]) + (fSlow20 * ((fSlow14 * this.fRec1[1]) + (fSlow21 * this.fRec1[2]))));
			this.fRec197[0] = (this.fRec198[0] - (fSlow16 * ((fSlow22 * this.fRec197[2]) + (fSlow23 * this.fRec197[1]))));
			var fTemp115 = (fSlow30 * this.fRec196[1]);
			this.fRec196[0] = ((fSlow16 * (((fSlow17 * this.fRec197[0]) + (fSlow24 * this.fRec197[1])) + (fSlow17 * this.fRec197[2]))) - (fSlow27 * ((fSlow28 * this.fRec196[2]) + fTemp115)));
			var fTemp116 = (fSlow36 * this.fRec195[1]);
			this.fRec195[0] = ((this.fRec196[2] + (fSlow27 * (fTemp115 + (fSlow28 * this.fRec196[0])))) - (fSlow33 * ((fSlow34 * this.fRec195[2]) + fTemp116)));
			var fTemp117 = (fSlow42 * this.fRec194[1]);
			this.fRec194[0] = ((this.fRec195[2] + (fSlow33 * (fTemp116 + (fSlow34 * this.fRec195[0])))) - (fSlow39 * ((fSlow40 * this.fRec194[2]) + fTemp117)));
			this.fRec204[0] = ((fSlow19 * this.fRec204[1]) + (fSlow20 * (this.fRec1[1] + this.fRec1[2])));
			this.fRec203[0] = (this.fRec204[0] - (fSlow16 * ((fSlow22 * this.fRec203[2]) + (fSlow23 * this.fRec203[1]))));
			var fTemp118 = (this.fRec203[2] + (this.fRec203[0] + (2 * this.fRec203[1])));
			var fTemp119 = (fSlow16 * fTemp118);
			this.fVec26[0] = fTemp119;
			this.fRec202[0] = ((fSlow48 * this.fRec202[1]) + (fSlow49 * ((fSlow51 * this.fVec26[1]) + (fSlow50 * fTemp118))));
			this.fRec201[0] = (this.fRec202[0] - (fSlow46 * ((fSlow52 * this.fRec201[2]) + (fSlow30 * this.fRec201[1]))));
			var fTemp120 = (fSlow36 * this.fRec200[1]);
			this.fRec200[0] = ((fSlow46 * (((fSlow29 * this.fRec201[0]) + (fSlow53 * this.fRec201[1])) + (fSlow29 * this.fRec201[2]))) - (fSlow33 * ((fSlow34 * this.fRec200[2]) + fTemp120)));
			var fTemp121 = (fSlow42 * this.fRec199[1]);
			this.fRec199[0] = ((this.fRec200[2] + (fSlow33 * (fTemp120 + (fSlow34 * this.fRec200[0])))) - (fSlow39 * ((fSlow40 * this.fRec199[2]) + fTemp121)));
			this.fRec209[0] = ((fSlow48 * this.fRec209[1]) + (fSlow49 * (this.fVec26[1] + fTemp119)));
			this.fRec208[0] = (this.fRec209[0] - (fSlow46 * ((fSlow52 * this.fRec208[2]) + (fSlow30 * this.fRec208[1]))));
			var fTemp122 = (this.fRec208[2] + (this.fRec208[0] + (2 * this.fRec208[1])));
			var fTemp123 = (fSlow46 * fTemp122);
			this.fVec27[0] = fTemp123;
			this.fRec207[0] = ((fSlow59 * this.fRec207[1]) + (fSlow60 * ((fSlow62 * this.fVec27[1]) + (fSlow61 * fTemp122))));
			this.fRec206[0] = (this.fRec207[0] - (fSlow57 * ((fSlow63 * this.fRec206[2]) + (fSlow36 * this.fRec206[1]))));
			var fTemp124 = (fSlow42 * this.fRec205[1]);
			this.fRec205[0] = ((fSlow57 * (((fSlow35 * this.fRec206[0]) + (fSlow64 * this.fRec206[1])) + (fSlow35 * this.fRec206[2]))) - (fSlow39 * ((fSlow40 * this.fRec205[2]) + fTemp124)));
			this.fRec213[0] = ((fSlow59 * this.fRec213[1]) + (fSlow60 * (this.fVec27[1] + fTemp123)));
			this.fRec212[0] = (this.fRec213[0] - (fSlow57 * ((fSlow63 * this.fRec212[2]) + (fSlow36 * this.fRec212[1]))));
			var fTemp125 = (this.fRec212[2] + (this.fRec212[0] + (2 * this.fRec212[1])));
			var fTemp126 = (fSlow57 * fTemp125);
			this.fVec28[0] = fTemp126;
			this.fRec211[0] = ((fSlow69 * this.fRec211[1]) + (fSlow70 * (this.fVec28[1] + fTemp126)));
			this.fRec210[0] = (this.fRec211[0] - (fSlow65 * ((fSlow71 * this.fRec210[2]) + (fSlow42 * this.fRec210[1]))));
			this.fRec215[0] = ((fSlow69 * this.fRec215[1]) + (fSlow70 * ((fSlow75 * this.fVec28[1]) + (fSlow74 * fTemp125))));
			this.fRec214[0] = (this.fRec215[0] - (fSlow65 * ((fSlow71 * this.fRec214[2]) + (fSlow42 * this.fRec214[1]))));
			var fTemp127 = ((((fSlow128 * (this.fRec194[2] + (fSlow39 * (fTemp117 + (fSlow40 * this.fRec194[0]))))) + (fSlow129 * (this.fRec199[2] + (fSlow39 * (fTemp121 + (fSlow40 * this.fRec199[0])))))) + (fSlow130 * (this.fRec205[2] + (fSlow39 * (fTemp124 + (fSlow40 * this.fRec205[0])))))) + (fSlow65 * ((fSlow131 * (this.fRec210[2] + (this.fRec210[0] + (2 * this.fRec210[1])))) + (fSlow132 * (((fSlow41 * this.fRec214[0]) + (fSlow76 * this.fRec214[1])) + (fSlow41 * this.fRec214[2]))))));
			this.fRec220[0] = ((fSlow19 * this.fRec220[1]) + (fSlow20 * ((fSlow14 * this.fRec9[1]) + (fSlow21 * this.fRec9[2]))));
			this.fRec219[0] = (this.fRec220[0] - (fSlow16 * ((fSlow22 * this.fRec219[2]) + (fSlow23 * this.fRec219[1]))));
			var fTemp128 = (fSlow30 * this.fRec218[1]);
			this.fRec218[0] = ((fSlow16 * (((fSlow17 * this.fRec219[0]) + (fSlow24 * this.fRec219[1])) + (fSlow17 * this.fRec219[2]))) - (fSlow27 * ((fSlow28 * this.fRec218[2]) + fTemp128)));
			var fTemp129 = (fSlow36 * this.fRec217[1]);
			this.fRec217[0] = ((this.fRec218[2] + (fSlow27 * (fTemp128 + (fSlow28 * this.fRec218[0])))) - (fSlow33 * ((fSlow34 * this.fRec217[2]) + fTemp129)));
			var fTemp130 = (fSlow42 * this.fRec216[1]);
			this.fRec216[0] = ((this.fRec217[2] + (fSlow33 * (fTemp129 + (fSlow34 * this.fRec217[0])))) - (fSlow39 * ((fSlow40 * this.fRec216[2]) + fTemp130)));
			this.fRec226[0] = ((fSlow19 * this.fRec226[1]) + (fSlow20 * (this.fRec9[1] + this.fRec9[2])));
			this.fRec225[0] = (this.fRec226[0] - (fSlow16 * ((fSlow22 * this.fRec225[2]) + (fSlow23 * this.fRec225[1]))));
			var fTemp131 = (this.fRec225[2] + (this.fRec225[0] + (2 * this.fRec225[1])));
			var fTemp132 = (fSlow16 * fTemp131);
			this.fVec29[0] = fTemp132;
			this.fRec224[0] = ((fSlow48 * this.fRec224[1]) + (fSlow49 * ((fSlow51 * this.fVec29[1]) + (fSlow50 * fTemp131))));
			this.fRec223[0] = (this.fRec224[0] - (fSlow46 * ((fSlow52 * this.fRec223[2]) + (fSlow30 * this.fRec223[1]))));
			var fTemp133 = (fSlow36 * this.fRec222[1]);
			this.fRec222[0] = ((fSlow46 * (((fSlow29 * this.fRec223[0]) + (fSlow53 * this.fRec223[1])) + (fSlow29 * this.fRec223[2]))) - (fSlow33 * ((fSlow34 * this.fRec222[2]) + fTemp133)));
			var fTemp134 = (fSlow42 * this.fRec221[1]);
			this.fRec221[0] = ((this.fRec222[2] + (fSlow33 * (fTemp133 + (fSlow34 * this.fRec222[0])))) - (fSlow39 * ((fSlow40 * this.fRec221[2]) + fTemp134)));
			this.fRec231[0] = ((fSlow48 * this.fRec231[1]) + (fSlow49 * (this.fVec29[1] + fTemp132)));
			this.fRec230[0] = (this.fRec231[0] - (fSlow46 * ((fSlow52 * this.fRec230[2]) + (fSlow30 * this.fRec230[1]))));
			var fTemp135 = (this.fRec230[2] + (this.fRec230[0] + (2 * this.fRec230[1])));
			var fTemp136 = (fSlow46 * fTemp135);
			this.fVec30[0] = fTemp136;
			this.fRec229[0] = ((fSlow59 * this.fRec229[1]) + (fSlow60 * ((fSlow62 * this.fVec30[1]) + (fSlow61 * fTemp135))));
			this.fRec228[0] = (this.fRec229[0] - (fSlow57 * ((fSlow63 * this.fRec228[2]) + (fSlow36 * this.fRec228[1]))));
			var fTemp137 = (fSlow42 * this.fRec227[1]);
			this.fRec227[0] = ((fSlow57 * (((fSlow35 * this.fRec228[0]) + (fSlow64 * this.fRec228[1])) + (fSlow35 * this.fRec228[2]))) - (fSlow39 * ((fSlow40 * this.fRec227[2]) + fTemp137)));
			this.fRec235[0] = ((fSlow59 * this.fRec235[1]) + (fSlow60 * (this.fVec30[1] + fTemp136)));
			this.fRec234[0] = (this.fRec235[0] - (fSlow57 * ((fSlow63 * this.fRec234[2]) + (fSlow36 * this.fRec234[1]))));
			var fTemp138 = (this.fRec234[2] + (this.fRec234[0] + (2 * this.fRec234[1])));
			var fTemp139 = (fSlow57 * fTemp138);
			this.fVec31[0] = fTemp139;
			this.fRec233[0] = ((fSlow69 * this.fRec233[1]) + (fSlow70 * (fTemp139 + this.fVec31[1])));
			this.fRec232[0] = (this.fRec233[0] - (fSlow65 * ((fSlow71 * this.fRec232[2]) + (fSlow42 * this.fRec232[1]))));
			this.fRec237[0] = ((fSlow69 * this.fRec237[1]) + (fSlow70 * ((fSlow74 * fTemp138) + (fSlow75 * this.fVec31[1]))));
			this.fRec236[0] = (this.fRec237[0] - (fSlow65 * ((fSlow42 * this.fRec236[1]) + (fSlow71 * this.fRec236[2]))));
			var fTemp140 = ((((fSlow135 * (this.fRec216[2] + (fSlow39 * (fTemp130 + (fSlow40 * this.fRec216[0]))))) + (fSlow136 * (this.fRec221[2] + (fSlow39 * (fTemp134 + (fSlow40 * this.fRec221[0])))))) + (fSlow137 * (this.fRec227[2] + (fSlow39 * (fTemp137 + (fSlow40 * this.fRec227[0])))))) + (fSlow65 * ((fSlow138 * (this.fRec232[2] + (this.fRec232[0] + (2 * this.fRec232[1])))) + (fSlow139 * (((fSlow41 * this.fRec236[0]) + (fSlow76 * this.fRec236[1])) + (fSlow41 * this.fRec236[2]))))));
			var fTemp141 = (fTemp127 + fTemp140);
			this.fRec242[0] = ((fSlow19 * this.fRec242[1]) + (fSlow20 * ((fSlow14 * this.fRec5[1]) + (fSlow21 * this.fRec5[2]))));
			this.fRec241[0] = (this.fRec242[0] - (fSlow16 * ((fSlow22 * this.fRec241[2]) + (fSlow23 * this.fRec241[1]))));
			var fTemp142 = (fSlow30 * this.fRec240[1]);
			this.fRec240[0] = ((fSlow16 * (((fSlow17 * this.fRec241[0]) + (fSlow24 * this.fRec241[1])) + (fSlow17 * this.fRec241[2]))) - (fSlow27 * ((fSlow28 * this.fRec240[2]) + fTemp142)));
			var fTemp143 = (fSlow36 * this.fRec239[1]);
			this.fRec239[0] = ((this.fRec240[2] + (fSlow27 * (fTemp142 + (fSlow28 * this.fRec240[0])))) - (fSlow33 * ((fSlow34 * this.fRec239[2]) + fTemp143)));
			var fTemp144 = (fSlow42 * this.fRec238[1]);
			this.fRec238[0] = ((this.fRec239[2] + (fSlow33 * (fTemp143 + (fSlow34 * this.fRec239[0])))) - (fSlow39 * ((fSlow40 * this.fRec238[2]) + fTemp144)));
			this.fRec248[0] = ((fSlow19 * this.fRec248[1]) + (fSlow20 * (this.fRec5[1] + this.fRec5[2])));
			this.fRec247[0] = (this.fRec248[0] - (fSlow16 * ((fSlow22 * this.fRec247[2]) + (fSlow23 * this.fRec247[1]))));
			var fTemp145 = (this.fRec247[2] + (this.fRec247[0] + (2 * this.fRec247[1])));
			var fTemp146 = (fSlow16 * fTemp145);
			this.fVec32[0] = fTemp146;
			this.fRec246[0] = ((fSlow48 * this.fRec246[1]) + (fSlow49 * ((fSlow51 * this.fVec32[1]) + (fSlow50 * fTemp145))));
			this.fRec245[0] = (this.fRec246[0] - (fSlow46 * ((fSlow52 * this.fRec245[2]) + (fSlow30 * this.fRec245[1]))));
			var fTemp147 = (fSlow36 * this.fRec244[1]);
			this.fRec244[0] = ((fSlow46 * (((fSlow29 * this.fRec245[0]) + (fSlow53 * this.fRec245[1])) + (fSlow29 * this.fRec245[2]))) - (fSlow33 * ((fSlow34 * this.fRec244[2]) + fTemp147)));
			var fTemp148 = (fSlow42 * this.fRec243[1]);
			this.fRec243[0] = ((this.fRec244[2] + (fSlow33 * (fTemp147 + (fSlow34 * this.fRec244[0])))) - (fSlow39 * ((fSlow40 * this.fRec243[2]) + fTemp148)));
			this.fRec253[0] = ((fSlow48 * this.fRec253[1]) + (fSlow49 * (this.fVec32[1] + fTemp146)));
			this.fRec252[0] = (this.fRec253[0] - (fSlow46 * ((fSlow52 * this.fRec252[2]) + (fSlow30 * this.fRec252[1]))));
			var fTemp149 = (this.fRec252[2] + (this.fRec252[0] + (2 * this.fRec252[1])));
			var fTemp150 = (fSlow46 * fTemp149);
			this.fVec33[0] = fTemp150;
			this.fRec251[0] = ((fSlow59 * this.fRec251[1]) + (fSlow60 * ((fSlow62 * this.fVec33[1]) + (fSlow61 * fTemp149))));
			this.fRec250[0] = (this.fRec251[0] - (fSlow57 * ((fSlow63 * this.fRec250[2]) + (fSlow36 * this.fRec250[1]))));
			var fTemp151 = (fSlow42 * this.fRec249[1]);
			this.fRec249[0] = ((fSlow57 * (((fSlow35 * this.fRec250[0]) + (fSlow64 * this.fRec250[1])) + (fSlow35 * this.fRec250[2]))) - (fSlow39 * ((fSlow40 * this.fRec249[2]) + fTemp151)));
			this.fRec257[0] = ((fSlow59 * this.fRec257[1]) + (fSlow60 * (this.fVec33[1] + fTemp150)));
			this.fRec256[0] = (this.fRec257[0] - (fSlow57 * ((fSlow63 * this.fRec256[2]) + (fSlow36 * this.fRec256[1]))));
			var fTemp152 = (this.fRec256[2] + (this.fRec256[0] + (2 * this.fRec256[1])));
			var fTemp153 = (fSlow57 * fTemp152);
			this.fVec34[0] = fTemp153;
			this.fRec255[0] = ((fSlow69 * this.fRec255[1]) + (fSlow70 * (this.fVec34[1] + fTemp153)));
			this.fRec254[0] = (this.fRec255[0] - (fSlow65 * ((fSlow71 * this.fRec254[2]) + (fSlow42 * this.fRec254[1]))));
			this.fRec259[0] = ((fSlow69 * this.fRec259[1]) + (fSlow70 * ((fSlow75 * this.fVec34[1]) + (fSlow74 * fTemp152))));
			this.fRec258[0] = (this.fRec259[0] - (fSlow65 * ((fSlow71 * this.fRec258[2]) + (fSlow42 * this.fRec258[1]))));
			var fTemp154 = ((((fSlow142 * (this.fRec238[2] + (fSlow39 * (fTemp144 + (fSlow40 * this.fRec238[0]))))) + (fSlow143 * (this.fRec243[2] + (fSlow39 * (fTemp148 + (fSlow40 * this.fRec243[0])))))) + (fSlow144 * (this.fRec249[2] + (fSlow39 * (fTemp151 + (fSlow40 * this.fRec249[0])))))) + (fSlow65 * ((fSlow145 * (this.fRec254[2] + (this.fRec254[0] + (2 * this.fRec254[1])))) + (fSlow146 * (((fSlow41 * this.fRec258[0]) + (fSlow76 * this.fRec258[1])) + (fSlow41 * this.fRec258[2]))))));
			this.fRec264[0] = ((fSlow19 * this.fRec264[1]) + (fSlow20 * ((fSlow14 * this.fRec13[1]) + (fSlow21 * this.fRec13[2]))));
			this.fRec263[0] = (this.fRec264[0] - (fSlow16 * ((fSlow22 * this.fRec263[2]) + (fSlow23 * this.fRec263[1]))));
			var fTemp155 = (fSlow30 * this.fRec262[1]);
			this.fRec262[0] = ((fSlow16 * (((fSlow17 * this.fRec263[0]) + (fSlow24 * this.fRec263[1])) + (fSlow17 * this.fRec263[2]))) - (fSlow27 * ((fSlow28 * this.fRec262[2]) + fTemp155)));
			var fTemp156 = (fSlow36 * this.fRec261[1]);
			this.fRec261[0] = ((this.fRec262[2] + (fSlow27 * (fTemp155 + (fSlow28 * this.fRec262[0])))) - (fSlow33 * ((fSlow34 * this.fRec261[2]) + fTemp156)));
			var fTemp157 = (fSlow42 * this.fRec260[1]);
			this.fRec260[0] = ((this.fRec261[2] + (fSlow33 * (fTemp156 + (fSlow34 * this.fRec261[0])))) - (fSlow39 * ((fSlow40 * this.fRec260[2]) + fTemp157)));
			this.fRec270[0] = ((fSlow19 * this.fRec270[1]) + (fSlow20 * (this.fRec13[1] + this.fRec13[2])));
			this.fRec269[0] = (this.fRec270[0] - (fSlow16 * ((fSlow22 * this.fRec269[2]) + (fSlow23 * this.fRec269[1]))));
			var fTemp158 = (this.fRec269[2] + (this.fRec269[0] + (2 * this.fRec269[1])));
			var fTemp159 = (fSlow16 * fTemp158);
			this.fVec35[0] = fTemp159;
			this.fRec268[0] = ((fSlow48 * this.fRec268[1]) + (fSlow49 * ((fSlow51 * this.fVec35[1]) + (fSlow50 * fTemp158))));
			this.fRec267[0] = (this.fRec268[0] - (fSlow46 * ((fSlow52 * this.fRec267[2]) + (fSlow30 * this.fRec267[1]))));
			var fTemp160 = (fSlow36 * this.fRec266[1]);
			this.fRec266[0] = ((fSlow46 * (((fSlow29 * this.fRec267[0]) + (fSlow53 * this.fRec267[1])) + (fSlow29 * this.fRec267[2]))) - (fSlow33 * ((fSlow34 * this.fRec266[2]) + fTemp160)));
			var fTemp161 = (fSlow42 * this.fRec265[1]);
			this.fRec265[0] = ((this.fRec266[2] + (fSlow33 * (fTemp160 + (fSlow34 * this.fRec266[0])))) - (fSlow39 * ((fSlow40 * this.fRec265[2]) + fTemp161)));
			this.fRec275[0] = ((fSlow48 * this.fRec275[1]) + (fSlow49 * (this.fVec35[1] + fTemp159)));
			this.fRec274[0] = (this.fRec275[0] - (fSlow46 * ((fSlow52 * this.fRec274[2]) + (fSlow30 * this.fRec274[1]))));
			var fTemp162 = (this.fRec274[2] + (this.fRec274[0] + (2 * this.fRec274[1])));
			var fTemp163 = (fSlow46 * fTemp162);
			this.fVec36[0] = fTemp163;
			this.fRec273[0] = ((fSlow59 * this.fRec273[1]) + (fSlow60 * ((fSlow62 * this.fVec36[1]) + (fSlow61 * fTemp162))));
			this.fRec272[0] = (this.fRec273[0] - (fSlow57 * ((fSlow63 * this.fRec272[2]) + (fSlow36 * this.fRec272[1]))));
			var fTemp164 = (fSlow42 * this.fRec271[1]);
			this.fRec271[0] = ((fSlow57 * (((fSlow35 * this.fRec272[0]) + (fSlow64 * this.fRec272[1])) + (fSlow35 * this.fRec272[2]))) - (fSlow39 * ((fSlow40 * this.fRec271[2]) + fTemp164)));
			this.fRec279[0] = ((fSlow59 * this.fRec279[1]) + (fSlow60 * (this.fVec36[1] + fTemp163)));
			this.fRec278[0] = (this.fRec279[0] - (fSlow57 * ((fSlow63 * this.fRec278[2]) + (fSlow36 * this.fRec278[1]))));
			var fTemp165 = (this.fRec278[2] + (this.fRec278[0] + (2 * this.fRec278[1])));
			var fTemp166 = (fSlow57 * fTemp165);
			this.fVec37[0] = fTemp166;
			this.fRec277[0] = ((fSlow69 * this.fRec277[1]) + (fSlow70 * (this.fVec37[1] + fTemp166)));
			this.fRec276[0] = (this.fRec277[0] - (fSlow65 * ((fSlow71 * this.fRec276[2]) + (fSlow42 * this.fRec276[1]))));
			this.fRec281[0] = ((fSlow69 * this.fRec281[1]) + (fSlow70 * ((fSlow75 * this.fVec37[1]) + (fSlow74 * fTemp165))));
			this.fRec280[0] = (this.fRec281[0] - (fSlow65 * ((fSlow71 * this.fRec280[2]) + (fSlow42 * this.fRec280[1]))));
			var fTemp167 = ((((fSlow149 * (this.fRec260[2] + (fSlow39 * (fTemp157 + (fSlow40 * this.fRec260[0]))))) + (fSlow150 * (this.fRec265[2] + (fSlow39 * (fTemp161 + (fSlow40 * this.fRec265[0])))))) + (fSlow151 * (this.fRec271[2] + (fSlow39 * (fTemp164 + (fSlow40 * this.fRec271[0])))))) + (fSlow65 * ((fSlow152 * (this.fRec276[2] + (this.fRec276[0] + (2 * this.fRec276[1])))) + (fSlow153 * (((fSlow41 * this.fRec280[0]) + (fSlow76 * this.fRec280[1])) + (fSlow41 * this.fRec280[2]))))));
			var fTemp168 = (fTemp154 + fTemp167);
			var fTemp169 = (fTemp141 + fTemp168);
			this.fRec286[0] = ((fSlow19 * this.fRec286[1]) + (fSlow20 * ((fSlow14 * this.fRec3[1]) + (fSlow21 * this.fRec3[2]))));
			this.fRec285[0] = (this.fRec286[0] - (fSlow16 * ((fSlow22 * this.fRec285[2]) + (fSlow23 * this.fRec285[1]))));
			var fTemp170 = (fSlow30 * this.fRec284[1]);
			this.fRec284[0] = ((fSlow16 * (((fSlow17 * this.fRec285[0]) + (fSlow24 * this.fRec285[1])) + (fSlow17 * this.fRec285[2]))) - (fSlow27 * ((fSlow28 * this.fRec284[2]) + fTemp170)));
			var fTemp171 = (fSlow36 * this.fRec283[1]);
			this.fRec283[0] = ((this.fRec284[2] + (fSlow27 * (fTemp170 + (fSlow28 * this.fRec284[0])))) - (fSlow33 * ((fSlow34 * this.fRec283[2]) + fTemp171)));
			var fTemp172 = (fSlow42 * this.fRec282[1]);
			this.fRec282[0] = ((this.fRec283[2] + (fSlow33 * (fTemp171 + (fSlow34 * this.fRec283[0])))) - (fSlow39 * ((fSlow40 * this.fRec282[2]) + fTemp172)));
			this.fRec292[0] = ((fSlow19 * this.fRec292[1]) + (fSlow20 * (this.fRec3[1] + this.fRec3[2])));
			this.fRec291[0] = (this.fRec292[0] - (fSlow16 * ((fSlow22 * this.fRec291[2]) + (fSlow23 * this.fRec291[1]))));
			var fTemp173 = (this.fRec291[2] + (this.fRec291[0] + (2 * this.fRec291[1])));
			var fTemp174 = (fSlow16 * fTemp173);
			this.fVec38[0] = fTemp174;
			this.fRec290[0] = ((fSlow48 * this.fRec290[1]) + (fSlow49 * ((fSlow51 * this.fVec38[1]) + (fSlow50 * fTemp173))));
			this.fRec289[0] = (this.fRec290[0] - (fSlow46 * ((fSlow52 * this.fRec289[2]) + (fSlow30 * this.fRec289[1]))));
			var fTemp175 = (fSlow36 * this.fRec288[1]);
			this.fRec288[0] = ((fSlow46 * (((fSlow29 * this.fRec289[0]) + (fSlow53 * this.fRec289[1])) + (fSlow29 * this.fRec289[2]))) - (fSlow33 * ((fSlow34 * this.fRec288[2]) + fTemp175)));
			var fTemp176 = (fSlow42 * this.fRec287[1]);
			this.fRec287[0] = ((this.fRec288[2] + (fSlow33 * (fTemp175 + (fSlow34 * this.fRec288[0])))) - (fSlow39 * ((fSlow40 * this.fRec287[2]) + fTemp176)));
			this.fRec297[0] = ((fSlow48 * this.fRec297[1]) + (fSlow49 * (this.fVec38[1] + fTemp174)));
			this.fRec296[0] = (this.fRec297[0] - (fSlow46 * ((fSlow52 * this.fRec296[2]) + (fSlow30 * this.fRec296[1]))));
			var fTemp177 = (this.fRec296[2] + (this.fRec296[0] + (2 * this.fRec296[1])));
			var fTemp178 = (fSlow46 * fTemp177);
			this.fVec39[0] = fTemp178;
			this.fRec295[0] = ((fSlow59 * this.fRec295[1]) + (fSlow60 * ((fSlow62 * this.fVec39[1]) + (fSlow61 * fTemp177))));
			this.fRec294[0] = (this.fRec295[0] - (fSlow57 * ((fSlow63 * this.fRec294[2]) + (fSlow36 * this.fRec294[1]))));
			var fTemp179 = (fSlow42 * this.fRec293[1]);
			this.fRec293[0] = ((fSlow57 * (((fSlow35 * this.fRec294[0]) + (fSlow64 * this.fRec294[1])) + (fSlow35 * this.fRec294[2]))) - (fSlow39 * ((fSlow40 * this.fRec293[2]) + fTemp179)));
			this.fRec301[0] = ((fSlow59 * this.fRec301[1]) + (fSlow60 * (this.fVec39[1] + fTemp178)));
			this.fRec300[0] = (this.fRec301[0] - (fSlow57 * ((fSlow63 * this.fRec300[2]) + (fSlow36 * this.fRec300[1]))));
			var fTemp180 = (this.fRec300[2] + (this.fRec300[0] + (2 * this.fRec300[1])));
			var fTemp181 = (fSlow57 * fTemp180);
			this.fVec40[0] = fTemp181;
			this.fRec299[0] = ((fSlow69 * this.fRec299[1]) + (fSlow70 * (this.fVec40[1] + fTemp181)));
			this.fRec298[0] = (this.fRec299[0] - (fSlow65 * ((fSlow71 * this.fRec298[2]) + (fSlow42 * this.fRec298[1]))));
			this.fRec303[0] = ((fSlow69 * this.fRec303[1]) + (fSlow70 * ((fSlow75 * this.fVec40[1]) + (fSlow74 * fTemp180))));
			this.fRec302[0] = (this.fRec303[0] - (fSlow65 * ((fSlow71 * this.fRec302[2]) + (fSlow42 * this.fRec302[1]))));
			var fTemp182 = ((((fSlow156 * (this.fRec282[2] + (fSlow39 * (fTemp172 + (fSlow40 * this.fRec282[0]))))) + (fSlow157 * (this.fRec287[2] + (fSlow39 * (fTemp176 + (fSlow40 * this.fRec287[0])))))) + (fSlow158 * (this.fRec293[2] + (fSlow39 * (fTemp179 + (fSlow40 * this.fRec293[0])))))) + (fSlow65 * ((fSlow159 * (this.fRec298[2] + (this.fRec298[0] + (2 * this.fRec298[1])))) + (fSlow160 * (((fSlow41 * this.fRec302[0]) + (fSlow76 * this.fRec302[1])) + (fSlow41 * this.fRec302[2]))))));
			this.fRec308[0] = ((fSlow19 * this.fRec308[1]) + (fSlow20 * ((fSlow14 * this.fRec11[1]) + (fSlow21 * this.fRec11[2]))));
			this.fRec307[0] = (this.fRec308[0] - (fSlow16 * ((fSlow22 * this.fRec307[2]) + (fSlow23 * this.fRec307[1]))));
			var fTemp183 = (fSlow30 * this.fRec306[1]);
			this.fRec306[0] = ((fSlow16 * (((fSlow17 * this.fRec307[0]) + (fSlow24 * this.fRec307[1])) + (fSlow17 * this.fRec307[2]))) - (fSlow27 * ((fSlow28 * this.fRec306[2]) + fTemp183)));
			var fTemp184 = (fSlow36 * this.fRec305[1]);
			this.fRec305[0] = ((this.fRec306[2] + (fSlow27 * (fTemp183 + (fSlow28 * this.fRec306[0])))) - (fSlow33 * ((fSlow34 * this.fRec305[2]) + fTemp184)));
			var fTemp185 = (fSlow42 * this.fRec304[1]);
			this.fRec304[0] = ((this.fRec305[2] + (fSlow33 * (fTemp184 + (fSlow34 * this.fRec305[0])))) - (fSlow39 * ((fSlow40 * this.fRec304[2]) + fTemp185)));
			this.fRec314[0] = ((fSlow19 * this.fRec314[1]) + (fSlow20 * (this.fRec11[1] + this.fRec11[2])));
			this.fRec313[0] = (this.fRec314[0] - (fSlow16 * ((fSlow22 * this.fRec313[2]) + (fSlow23 * this.fRec313[1]))));
			var fTemp186 = (this.fRec313[2] + (this.fRec313[0] + (2 * this.fRec313[1])));
			var fTemp187 = (fSlow16 * fTemp186);
			this.fVec41[0] = fTemp187;
			this.fRec312[0] = ((fSlow48 * this.fRec312[1]) + (fSlow49 * ((fSlow51 * this.fVec41[1]) + (fSlow50 * fTemp186))));
			this.fRec311[0] = (this.fRec312[0] - (fSlow46 * ((fSlow52 * this.fRec311[2]) + (fSlow30 * this.fRec311[1]))));
			var fTemp188 = (fSlow36 * this.fRec310[1]);
			this.fRec310[0] = ((fSlow46 * (((fSlow29 * this.fRec311[0]) + (fSlow53 * this.fRec311[1])) + (fSlow29 * this.fRec311[2]))) - (fSlow33 * ((fSlow34 * this.fRec310[2]) + fTemp188)));
			var fTemp189 = (fSlow42 * this.fRec309[1]);
			this.fRec309[0] = ((this.fRec310[2] + (fSlow33 * (fTemp188 + (fSlow34 * this.fRec310[0])))) - (fSlow39 * ((fSlow40 * this.fRec309[2]) + fTemp189)));
			this.fRec319[0] = ((fSlow48 * this.fRec319[1]) + (fSlow49 * (this.fVec41[1] + fTemp187)));
			this.fRec318[0] = (this.fRec319[0] - (fSlow46 * ((fSlow52 * this.fRec318[2]) + (fSlow30 * this.fRec318[1]))));
			var fTemp190 = (this.fRec318[2] + (this.fRec318[0] + (2 * this.fRec318[1])));
			var fTemp191 = (fSlow46 * fTemp190);
			this.fVec42[0] = fTemp191;
			this.fRec317[0] = ((fSlow59 * this.fRec317[1]) + (fSlow60 * ((fSlow62 * this.fVec42[1]) + (fSlow61 * fTemp190))));
			this.fRec316[0] = (this.fRec317[0] - (fSlow57 * ((fSlow63 * this.fRec316[2]) + (fSlow36 * this.fRec316[1]))));
			var fTemp192 = (fSlow42 * this.fRec315[1]);
			this.fRec315[0] = ((fSlow57 * (((fSlow35 * this.fRec316[0]) + (fSlow64 * this.fRec316[1])) + (fSlow35 * this.fRec316[2]))) - (fSlow39 * ((fSlow40 * this.fRec315[2]) + fTemp192)));
			this.fRec323[0] = ((fSlow59 * this.fRec323[1]) + (fSlow60 * (this.fVec42[1] + fTemp191)));
			this.fRec322[0] = (this.fRec323[0] - (fSlow57 * ((fSlow63 * this.fRec322[2]) + (fSlow36 * this.fRec322[1]))));
			var fTemp193 = (this.fRec322[2] + (this.fRec322[0] + (2 * this.fRec322[1])));
			var fTemp194 = (fSlow57 * fTemp193);
			this.fVec43[0] = fTemp194;
			this.fRec321[0] = ((fSlow69 * this.fRec321[1]) + (fSlow70 * (this.fVec43[1] + fTemp194)));
			this.fRec320[0] = (this.fRec321[0] - (fSlow65 * ((fSlow71 * this.fRec320[2]) + (fSlow42 * this.fRec320[1]))));
			this.fRec325[0] = ((fSlow69 * this.fRec325[1]) + (fSlow70 * ((fSlow75 * this.fVec43[1]) + (fSlow74 * fTemp193))));
			this.fRec324[0] = (this.fRec325[0] - (fSlow65 * ((fSlow71 * this.fRec324[2]) + (fSlow42 * this.fRec324[1]))));
			var fTemp195 = ((((fSlow163 * (this.fRec304[2] + (fSlow39 * (fTemp185 + (fSlow40 * this.fRec304[0]))))) + (fSlow164 * (this.fRec309[2] + (fSlow39 * (fTemp189 + (fSlow40 * this.fRec309[0])))))) + (fSlow165 * (this.fRec315[2] + (fSlow39 * (fTemp192 + (fSlow40 * this.fRec315[0])))))) + (fSlow65 * ((fSlow166 * (this.fRec320[2] + (this.fRec320[0] + (2 * this.fRec320[1])))) + (fSlow167 * (((fSlow41 * this.fRec324[0]) + (fSlow76 * this.fRec324[1])) + (fSlow41 * this.fRec324[2]))))));
			var fTemp196 = (fTemp182 + fTemp195);
			this.fRec330[0] = ((fSlow19 * this.fRec330[1]) + (fSlow20 * ((fSlow14 * this.fRec7[1]) + (fSlow21 * this.fRec7[2]))));
			this.fRec329[0] = (this.fRec330[0] - (fSlow16 * ((fSlow22 * this.fRec329[2]) + (fSlow23 * this.fRec329[1]))));
			var fTemp197 = (fSlow30 * this.fRec328[1]);
			this.fRec328[0] = ((fSlow16 * (((fSlow17 * this.fRec329[0]) + (fSlow24 * this.fRec329[1])) + (fSlow17 * this.fRec329[2]))) - (fSlow27 * ((fSlow28 * this.fRec328[2]) + fTemp197)));
			var fTemp198 = (fSlow36 * this.fRec327[1]);
			this.fRec327[0] = ((this.fRec328[2] + (fSlow27 * (fTemp197 + (fSlow28 * this.fRec328[0])))) - (fSlow33 * ((fSlow34 * this.fRec327[2]) + fTemp198)));
			var fTemp199 = (fSlow42 * this.fRec326[1]);
			this.fRec326[0] = ((this.fRec327[2] + (fSlow33 * (fTemp198 + (fSlow34 * this.fRec327[0])))) - (fSlow39 * ((fSlow40 * this.fRec326[2]) + fTemp199)));
			this.fRec336[0] = ((fSlow19 * this.fRec336[1]) + (fSlow20 * (this.fRec7[1] + this.fRec7[2])));
			this.fRec335[0] = (this.fRec336[0] - (fSlow16 * ((fSlow22 * this.fRec335[2]) + (fSlow23 * this.fRec335[1]))));
			var fTemp200 = (this.fRec335[2] + (this.fRec335[0] + (2 * this.fRec335[1])));
			var fTemp201 = (fSlow16 * fTemp200);
			this.fVec44[0] = fTemp201;
			this.fRec334[0] = ((fSlow48 * this.fRec334[1]) + (fSlow49 * ((fSlow51 * this.fVec44[1]) + (fSlow50 * fTemp200))));
			this.fRec333[0] = (this.fRec334[0] - (fSlow46 * ((fSlow52 * this.fRec333[2]) + (fSlow30 * this.fRec333[1]))));
			var fTemp202 = (fSlow36 * this.fRec332[1]);
			this.fRec332[0] = ((fSlow46 * (((fSlow29 * this.fRec333[0]) + (fSlow53 * this.fRec333[1])) + (fSlow29 * this.fRec333[2]))) - (fSlow33 * ((fSlow34 * this.fRec332[2]) + fTemp202)));
			var fTemp203 = (fSlow42 * this.fRec331[1]);
			this.fRec331[0] = ((this.fRec332[2] + (fSlow33 * (fTemp202 + (fSlow34 * this.fRec332[0])))) - (fSlow39 * ((fSlow40 * this.fRec331[2]) + fTemp203)));
			this.fRec341[0] = ((fSlow48 * this.fRec341[1]) + (fSlow49 * (this.fVec44[1] + fTemp201)));
			this.fRec340[0] = (this.fRec341[0] - (fSlow46 * ((fSlow52 * this.fRec340[2]) + (fSlow30 * this.fRec340[1]))));
			var fTemp204 = (this.fRec340[2] + (this.fRec340[0] + (2 * this.fRec340[1])));
			var fTemp205 = (fSlow46 * fTemp204);
			this.fVec45[0] = fTemp205;
			this.fRec339[0] = ((fSlow59 * this.fRec339[1]) + (fSlow60 * ((fSlow62 * this.fVec45[1]) + (fSlow61 * fTemp204))));
			this.fRec338[0] = (this.fRec339[0] - (fSlow57 * ((fSlow63 * this.fRec338[2]) + (fSlow36 * this.fRec338[1]))));
			var fTemp206 = (fSlow42 * this.fRec337[1]);
			this.fRec337[0] = ((fSlow57 * (((fSlow35 * this.fRec338[0]) + (fSlow64 * this.fRec338[1])) + (fSlow35 * this.fRec338[2]))) - (fSlow39 * ((fSlow40 * this.fRec337[2]) + fTemp206)));
			this.fRec345[0] = ((fSlow59 * this.fRec345[1]) + (fSlow60 * (this.fVec45[1] + fTemp205)));
			this.fRec344[0] = (this.fRec345[0] - (fSlow57 * ((fSlow63 * this.fRec344[2]) + (fSlow36 * this.fRec344[1]))));
			var fTemp207 = (this.fRec344[2] + (this.fRec344[0] + (2 * this.fRec344[1])));
			var fTemp208 = (fSlow57 * fTemp207);
			this.fVec46[0] = fTemp208;
			this.fRec343[0] = ((fSlow69 * this.fRec343[1]) + (fSlow70 * (this.fVec46[1] + fTemp208)));
			this.fRec342[0] = (this.fRec343[0] - (fSlow65 * ((fSlow71 * this.fRec342[2]) + (fSlow42 * this.fRec342[1]))));
			this.fRec347[0] = ((fSlow69 * this.fRec347[1]) + (fSlow70 * ((fSlow75 * this.fVec46[1]) + (fSlow74 * fTemp207))));
			this.fRec346[0] = (this.fRec347[0] - (fSlow65 * ((fSlow71 * this.fRec346[2]) + (fSlow42 * this.fRec346[1]))));
			var fTemp209 = ((((fSlow170 * (this.fRec326[2] + (fSlow39 * (fTemp199 + (fSlow40 * this.fRec326[0]))))) + (fSlow171 * (this.fRec331[2] + (fSlow39 * (fTemp203 + (fSlow40 * this.fRec331[0])))))) + (fSlow172 * (this.fRec337[2] + (fSlow39 * (fTemp206 + (fSlow40 * this.fRec337[0])))))) + (fSlow65 * ((fSlow173 * (this.fRec342[2] + (this.fRec342[0] + (2 * this.fRec342[1])))) + (fSlow174 * (((fSlow41 * this.fRec346[0]) + (fSlow76 * this.fRec346[1])) + (fSlow41 * this.fRec346[2]))))));
			this.fRec352[0] = ((fSlow19 * this.fRec352[1]) + (fSlow20 * ((fSlow14 * this.fRec15[1]) + (fSlow21 * this.fRec15[2]))));
			this.fRec351[0] = (this.fRec352[0] - (fSlow16 * ((fSlow22 * this.fRec351[2]) + (fSlow23 * this.fRec351[1]))));
			var fTemp210 = (fSlow30 * this.fRec350[1]);
			this.fRec350[0] = ((fSlow16 * (((fSlow17 * this.fRec351[0]) + (fSlow24 * this.fRec351[1])) + (fSlow17 * this.fRec351[2]))) - (fSlow27 * ((fSlow28 * this.fRec350[2]) + fTemp210)));
			var fTemp211 = (fSlow36 * this.fRec349[1]);
			this.fRec349[0] = ((this.fRec350[2] + (fSlow27 * (fTemp210 + (fSlow28 * this.fRec350[0])))) - (fSlow33 * ((fSlow34 * this.fRec349[2]) + fTemp211)));
			var fTemp212 = (fSlow42 * this.fRec348[1]);
			this.fRec348[0] = ((this.fRec349[2] + (fSlow33 * (fTemp211 + (fSlow34 * this.fRec349[0])))) - (fSlow39 * ((fSlow40 * this.fRec348[2]) + fTemp212)));
			this.fRec358[0] = ((fSlow19 * this.fRec358[1]) + (fSlow20 * (this.fRec15[1] + this.fRec15[2])));
			this.fRec357[0] = (this.fRec358[0] - (fSlow16 * ((fSlow22 * this.fRec357[2]) + (fSlow23 * this.fRec357[1]))));
			var fTemp213 = (this.fRec357[2] + (this.fRec357[0] + (2 * this.fRec357[1])));
			var fTemp214 = (fSlow16 * fTemp213);
			this.fVec47[0] = fTemp214;
			this.fRec356[0] = ((fSlow48 * this.fRec356[1]) + (fSlow49 * ((fSlow51 * this.fVec47[1]) + (fSlow50 * fTemp213))));
			this.fRec355[0] = (this.fRec356[0] - (fSlow46 * ((fSlow52 * this.fRec355[2]) + (fSlow30 * this.fRec355[1]))));
			var fTemp215 = (fSlow36 * this.fRec354[1]);
			this.fRec354[0] = ((fSlow46 * (((fSlow29 * this.fRec355[0]) + (fSlow53 * this.fRec355[1])) + (fSlow29 * this.fRec355[2]))) - (fSlow33 * ((fSlow34 * this.fRec354[2]) + fTemp215)));
			var fTemp216 = (fSlow42 * this.fRec353[1]);
			this.fRec353[0] = ((this.fRec354[2] + (fSlow33 * (fTemp215 + (fSlow34 * this.fRec354[0])))) - (fSlow39 * ((fSlow40 * this.fRec353[2]) + fTemp216)));
			this.fRec363[0] = ((fSlow48 * this.fRec363[1]) + (fSlow49 * (this.fVec47[1] + fTemp214)));
			this.fRec362[0] = (this.fRec363[0] - (fSlow46 * ((fSlow52 * this.fRec362[2]) + (fSlow30 * this.fRec362[1]))));
			var fTemp217 = (this.fRec362[2] + (this.fRec362[0] + (2 * this.fRec362[1])));
			var fTemp218 = (fSlow46 * fTemp217);
			this.fVec48[0] = fTemp218;
			this.fRec361[0] = ((fSlow59 * this.fRec361[1]) + (fSlow60 * ((fSlow62 * this.fVec48[1]) + (fSlow61 * fTemp217))));
			this.fRec360[0] = (this.fRec361[0] - (fSlow57 * ((fSlow63 * this.fRec360[2]) + (fSlow36 * this.fRec360[1]))));
			var fTemp219 = (fSlow42 * this.fRec359[1]);
			this.fRec359[0] = ((fSlow57 * (((fSlow35 * this.fRec360[0]) + (fSlow64 * this.fRec360[1])) + (fSlow35 * this.fRec360[2]))) - (fSlow39 * ((fSlow40 * this.fRec359[2]) + fTemp219)));
			this.fRec367[0] = ((fSlow59 * this.fRec367[1]) + (fSlow60 * (this.fVec48[1] + fTemp218)));
			this.fRec366[0] = (this.fRec367[0] - (fSlow57 * ((fSlow63 * this.fRec366[2]) + (fSlow36 * this.fRec366[1]))));
			var fTemp220 = (this.fRec366[2] + (this.fRec366[0] + (2 * this.fRec366[1])));
			var fTemp221 = (fSlow57 * fTemp220);
			this.fVec49[0] = fTemp221;
			this.fRec365[0] = ((fSlow69 * this.fRec365[1]) + (fSlow70 * (this.fVec49[1] + fTemp221)));
			this.fRec364[0] = (this.fRec365[0] - (fSlow65 * ((fSlow71 * this.fRec364[2]) + (fSlow42 * this.fRec364[1]))));
			this.fRec369[0] = ((fSlow69 * this.fRec369[1]) + (fSlow70 * ((fSlow75 * this.fVec49[1]) + (fSlow74 * fTemp220))));
			this.fRec368[0] = (this.fRec369[0] - (fSlow65 * ((fSlow71 * this.fRec368[2]) + (fSlow42 * this.fRec368[1]))));
			var fTemp222 = ((((fSlow177 * (this.fRec348[2] + (fSlow39 * (fTemp212 + (fSlow40 * this.fRec348[0]))))) + (fSlow178 * (this.fRec353[2] + (fSlow39 * (fTemp216 + (fSlow40 * this.fRec353[0])))))) + (fSlow179 * (this.fRec359[2] + (fSlow39 * (fTemp219 + (fSlow40 * this.fRec359[0])))))) + (fSlow65 * ((fSlow180 * (this.fRec364[2] + (this.fRec364[0] + (2 * this.fRec364[1])))) + (fSlow181 * (((fSlow41 * this.fRec368[0]) + (fSlow76 * this.fRec368[1])) + (fSlow41 * this.fRec368[2]))))));
			var fTemp223 = (fTemp209 + fTemp222);
			var fTemp224 = (fTemp196 + fTemp223);
			var fTemp225 = (fTemp169 + fTemp224);
			this.fVec50[(this.IOTA & 8191)] = (fTemp0 + (iTemp1 + (iTemp2 + (fTemp3 + (fSlow6 * (fTemp114 + fTemp225))))));
			this.fRec0[0] = this.fVec50[((this.IOTA - iSlow182) & 8191)];
			this.fVec51[0] = fSlow183;
			var iTemp226 = ((fSlow183 - this.fVec51[1]) > 0);
			var fTemp227 = (fSlow4 * input1[i]);
			var fTemp228 = (iTemp1 + fTemp0);
			this.fVec52[(this.IOTA & 8191)] = (iTemp226 + (fTemp227 + ((fSlow5 * ((0.25 * fTemp114) - (0.25 * fTemp225))) + fTemp228)));
			this.fRec1[0] = this.fVec52[((this.IOTA - iSlow184) & 8191)];
			var fTemp229 = ((iTemp1 + (fTemp3 + iTemp2)) + fTemp0);
			var fTemp230 = ((0.25 * fTemp58) - (0.25 * fTemp113));
			var fTemp231 = ((0.25 * fTemp169) - (0.25 * fTemp224));
			this.fVec53[(this.IOTA & 8191)] = (fTemp229 + (fSlow5 * (fTemp230 + fTemp231)));
			this.fRec2[0] = this.fVec53[((this.IOTA - iSlow185) & 8191)];
			var fTemp232 = (iTemp226 + (fTemp227 + fTemp228));
			this.fVec54[(this.IOTA & 8191)] = (fTemp232 + (fSlow5 * (fTemp230 - fTemp231)));
			this.fRec3[0] = this.fVec54[((this.IOTA - iSlow186) & 8191)];
			var fTemp233 = ((0.25 * fTemp30) - (0.25 * fTemp57));
			var fTemp234 = ((0.25 * fTemp85) - (0.25 * fTemp112));
			var fTemp235 = (fTemp233 + fTemp234);
			var fTemp236 = ((0.25 * fTemp141) - (0.25 * fTemp168));
			var fTemp237 = ((0.25 * fTemp196) - (0.25 * fTemp223));
			var fTemp238 = (fTemp236 + fTemp237);
			this.fVec55[(this.IOTA & 8191)] = (fTemp229 + (fSlow5 * (fTemp235 + fTemp238)));
			this.fRec4[0] = this.fVec55[((this.IOTA - iSlow187) & 8191)];
			this.fVec56[(this.IOTA & 8191)] = (fTemp232 + (fSlow5 * (fTemp235 - fTemp238)));
			this.fRec5[0] = this.fVec56[((this.IOTA - iSlow188) & 8191)];
			var fTemp239 = (fTemp233 - fTemp234);
			var fTemp240 = (fTemp236 - fTemp237);
			this.fVec57[(this.IOTA & 8191)] = (fTemp229 + (fSlow5 * (fTemp239 + fTemp240)));
			this.fRec6[0] = this.fVec57[((this.IOTA - iSlow189) & 8191)];
			this.fVec58[(this.IOTA & 8191)] = (fTemp232 + (fSlow5 * (fTemp239 - fTemp240)));
			this.fRec7[0] = this.fVec58[((this.IOTA - iSlow190) & 8191)];
			var fTemp241 = ((0.25 * fTemp16) - (0.25 * fTemp29));
			var fTemp242 = ((0.25 * fTemp43) - (0.25 * fTemp56));
			var fTemp243 = (fTemp241 + fTemp242);
			var fTemp244 = ((0.25 * fTemp71) - (0.25 * fTemp84));
			var fTemp245 = ((0.25 * fTemp98) - (0.25 * fTemp111));
			var fTemp246 = (fTemp244 + fTemp245);
			var fTemp247 = (fTemp243 + fTemp246);
			var fTemp248 = ((0.25 * fTemp127) - (0.25 * fTemp140));
			var fTemp249 = ((0.25 * fTemp154) - (0.25 * fTemp167));
			var fTemp250 = (fTemp248 + fTemp249);
			var fTemp251 = ((0.25 * fTemp182) - (0.25 * fTemp195));
			var fTemp252 = ((0.25 * fTemp209) - (0.25 * fTemp222));
			var fTemp253 = (fTemp251 + fTemp252);
			var fTemp254 = (fTemp250 + fTemp253);
			this.fVec59[(this.IOTA & 8191)] = (fTemp229 + (fSlow5 * (fTemp247 + fTemp254)));
			this.fRec8[0] = this.fVec59[((this.IOTA - iSlow191) & 8191)];
			this.fVec60[(this.IOTA & 8191)] = (fTemp232 + (fSlow5 * (fTemp247 - fTemp254)));
			this.fRec9[0] = this.fVec60[((this.IOTA - iSlow192) & 8191)];
			var fTemp255 = (fTemp243 - fTemp246);
			var fTemp256 = (fTemp250 - fTemp253);
			this.fVec61[(this.IOTA & 8191)] = (fTemp229 + (fSlow5 * (fTemp255 + fTemp256)));
			this.fRec10[0] = this.fVec61[((this.IOTA - iSlow193) & 8191)];
			this.fVec62[(this.IOTA & 8191)] = (fTemp232 + (fSlow5 * (fTemp255 - fTemp256)));
			this.fRec11[0] = this.fVec62[((this.IOTA - iSlow194) & 8191)];
			var fTemp257 = (fTemp241 - fTemp242);
			var fTemp258 = (fTemp244 - fTemp245);
			var fTemp259 = (fTemp257 + fTemp258);
			var fTemp260 = (fTemp248 - fTemp249);
			var fTemp261 = (fTemp251 - fTemp252);
			var fTemp262 = (fTemp260 + fTemp261);
			this.fVec63[(this.IOTA & 8191)] = (fTemp229 + (fSlow5 * (fTemp259 + fTemp262)));
			this.fRec12[0] = this.fVec63[((this.IOTA - iSlow195) & 8191)];
			this.fVec64[(this.IOTA & 8191)] = (fTemp232 + (fSlow5 * (fTemp259 - fTemp262)));
			this.fRec13[0] = this.fVec64[((this.IOTA - iSlow196) & 8191)];
			var fTemp263 = (fTemp257 - fTemp258);
			var fTemp264 = (fTemp260 - fTemp261);
			this.fVec65[(this.IOTA & 8191)] = (fTemp229 + (fSlow5 * (fTemp263 + fTemp264)));
			this.fRec14[0] = this.fVec65[((this.IOTA - iSlow197) & 8191)];
			this.fVec66[(this.IOTA & 8191)] = (fTemp232 + (fSlow5 * (fTemp263 - fTemp264)));
			this.fRec15[0] = this.fVec66[((this.IOTA - iSlow198) & 8191)];
			output0[i] = (fSlow0 * (((((((this.fRec0[0] + this.fRec2[0]) + this.fRec4[0]) + this.fRec6[0]) + this.fRec8[0]) + this.fRec10[0]) + this.fRec12[0]) + this.fRec14[0]));
			output1[i] = (fSlow0 * (((((((this.fRec1[0] + this.fRec3[0]) + this.fRec5[0]) + this.fRec7[0]) + this.fRec9[0]) + this.fRec11[0]) + this.fRec13[0]) + this.fRec15[0]));
			this.iRec17[1] = this.iRec17[0];
			for (var j = 3; (j > 0); j = (j - 1)) {
				this.fRec16[j] = this.fRec16[(j - 1)];
				
			}
			this.fVec0[1] = this.fVec0[0];
			this.fVec1[1] = this.fVec1[0];
			this.fRec22[1] = this.fRec22[0];
			this.fRec21[2] = this.fRec21[1];
			this.fRec21[1] = this.fRec21[0];
			this.fRec20[2] = this.fRec20[1];
			this.fRec20[1] = this.fRec20[0];
			this.fRec19[2] = this.fRec19[1];
			this.fRec19[1] = this.fRec19[0];
			this.fRec18[2] = this.fRec18[1];
			this.fRec18[1] = this.fRec18[0];
			this.fRec28[1] = this.fRec28[0];
			this.fRec27[2] = this.fRec27[1];
			this.fRec27[1] = this.fRec27[0];
			this.fVec2[1] = this.fVec2[0];
			this.fRec26[1] = this.fRec26[0];
			this.fRec25[2] = this.fRec25[1];
			this.fRec25[1] = this.fRec25[0];
			this.fRec24[2] = this.fRec24[1];
			this.fRec24[1] = this.fRec24[0];
			this.fRec23[2] = this.fRec23[1];
			this.fRec23[1] = this.fRec23[0];
			this.fRec33[1] = this.fRec33[0];
			this.fRec32[2] = this.fRec32[1];
			this.fRec32[1] = this.fRec32[0];
			this.fVec3[1] = this.fVec3[0];
			this.fRec31[1] = this.fRec31[0];
			this.fRec30[2] = this.fRec30[1];
			this.fRec30[1] = this.fRec30[0];
			this.fRec29[2] = this.fRec29[1];
			this.fRec29[1] = this.fRec29[0];
			this.fRec37[1] = this.fRec37[0];
			this.fRec36[2] = this.fRec36[1];
			this.fRec36[1] = this.fRec36[0];
			this.fVec4[1] = this.fVec4[0];
			this.fRec35[1] = this.fRec35[0];
			this.fRec34[2] = this.fRec34[1];
			this.fRec34[1] = this.fRec34[0];
			this.fRec39[1] = this.fRec39[0];
			this.fRec38[2] = this.fRec38[1];
			this.fRec38[1] = this.fRec38[0];
			this.fRec44[1] = this.fRec44[0];
			this.fRec43[2] = this.fRec43[1];
			this.fRec43[1] = this.fRec43[0];
			this.fRec42[2] = this.fRec42[1];
			this.fRec42[1] = this.fRec42[0];
			this.fRec41[2] = this.fRec41[1];
			this.fRec41[1] = this.fRec41[0];
			this.fRec40[2] = this.fRec40[1];
			this.fRec40[1] = this.fRec40[0];
			this.fRec50[1] = this.fRec50[0];
			this.fRec49[2] = this.fRec49[1];
			this.fRec49[1] = this.fRec49[0];
			this.fVec5[1] = this.fVec5[0];
			this.fRec48[1] = this.fRec48[0];
			this.fRec47[2] = this.fRec47[1];
			this.fRec47[1] = this.fRec47[0];
			this.fRec46[2] = this.fRec46[1];
			this.fRec46[1] = this.fRec46[0];
			this.fRec45[2] = this.fRec45[1];
			this.fRec45[1] = this.fRec45[0];
			this.fRec55[1] = this.fRec55[0];
			this.fRec54[2] = this.fRec54[1];
			this.fRec54[1] = this.fRec54[0];
			this.fVec6[1] = this.fVec6[0];
			this.fRec53[1] = this.fRec53[0];
			this.fRec52[2] = this.fRec52[1];
			this.fRec52[1] = this.fRec52[0];
			this.fRec51[2] = this.fRec51[1];
			this.fRec51[1] = this.fRec51[0];
			this.fRec59[1] = this.fRec59[0];
			this.fRec58[2] = this.fRec58[1];
			this.fRec58[1] = this.fRec58[0];
			this.fVec7[1] = this.fVec7[0];
			this.fRec57[1] = this.fRec57[0];
			this.fRec56[2] = this.fRec56[1];
			this.fRec56[1] = this.fRec56[0];
			this.fRec61[1] = this.fRec61[0];
			this.fRec60[2] = this.fRec60[1];
			this.fRec60[1] = this.fRec60[0];
			this.fRec66[1] = this.fRec66[0];
			this.fRec65[2] = this.fRec65[1];
			this.fRec65[1] = this.fRec65[0];
			this.fRec64[2] = this.fRec64[1];
			this.fRec64[1] = this.fRec64[0];
			this.fRec63[2] = this.fRec63[1];
			this.fRec63[1] = this.fRec63[0];
			this.fRec62[2] = this.fRec62[1];
			this.fRec62[1] = this.fRec62[0];
			this.fRec72[1] = this.fRec72[0];
			this.fRec71[2] = this.fRec71[1];
			this.fRec71[1] = this.fRec71[0];
			this.fVec8[1] = this.fVec8[0];
			this.fRec70[1] = this.fRec70[0];
			this.fRec69[2] = this.fRec69[1];
			this.fRec69[1] = this.fRec69[0];
			this.fRec68[2] = this.fRec68[1];
			this.fRec68[1] = this.fRec68[0];
			this.fRec67[2] = this.fRec67[1];
			this.fRec67[1] = this.fRec67[0];
			this.fRec77[1] = this.fRec77[0];
			this.fRec76[2] = this.fRec76[1];
			this.fRec76[1] = this.fRec76[0];
			this.fVec9[1] = this.fVec9[0];
			this.fRec75[1] = this.fRec75[0];
			this.fRec74[2] = this.fRec74[1];
			this.fRec74[1] = this.fRec74[0];
			this.fRec73[2] = this.fRec73[1];
			this.fRec73[1] = this.fRec73[0];
			this.fRec81[1] = this.fRec81[0];
			this.fRec80[2] = this.fRec80[1];
			this.fRec80[1] = this.fRec80[0];
			this.fVec10[1] = this.fVec10[0];
			this.fRec79[1] = this.fRec79[0];
			this.fRec78[2] = this.fRec78[1];
			this.fRec78[1] = this.fRec78[0];
			this.fRec83[1] = this.fRec83[0];
			this.fRec82[2] = this.fRec82[1];
			this.fRec82[1] = this.fRec82[0];
			this.fRec88[1] = this.fRec88[0];
			this.fRec87[2] = this.fRec87[1];
			this.fRec87[1] = this.fRec87[0];
			this.fRec86[2] = this.fRec86[1];
			this.fRec86[1] = this.fRec86[0];
			this.fRec85[2] = this.fRec85[1];
			this.fRec85[1] = this.fRec85[0];
			this.fRec84[2] = this.fRec84[1];
			this.fRec84[1] = this.fRec84[0];
			this.fRec94[1] = this.fRec94[0];
			this.fRec93[2] = this.fRec93[1];
			this.fRec93[1] = this.fRec93[0];
			this.fVec11[1] = this.fVec11[0];
			this.fRec92[1] = this.fRec92[0];
			this.fRec91[2] = this.fRec91[1];
			this.fRec91[1] = this.fRec91[0];
			this.fRec90[2] = this.fRec90[1];
			this.fRec90[1] = this.fRec90[0];
			this.fRec89[2] = this.fRec89[1];
			this.fRec89[1] = this.fRec89[0];
			this.fRec99[1] = this.fRec99[0];
			this.fRec98[2] = this.fRec98[1];
			this.fRec98[1] = this.fRec98[0];
			this.fVec12[1] = this.fVec12[0];
			this.fRec97[1] = this.fRec97[0];
			this.fRec96[2] = this.fRec96[1];
			this.fRec96[1] = this.fRec96[0];
			this.fRec95[2] = this.fRec95[1];
			this.fRec95[1] = this.fRec95[0];
			this.fRec103[1] = this.fRec103[0];
			this.fRec102[2] = this.fRec102[1];
			this.fRec102[1] = this.fRec102[0];
			this.fVec13[1] = this.fVec13[0];
			this.fRec101[1] = this.fRec101[0];
			this.fRec100[2] = this.fRec100[1];
			this.fRec100[1] = this.fRec100[0];
			this.fRec105[1] = this.fRec105[0];
			this.fRec104[2] = this.fRec104[1];
			this.fRec104[1] = this.fRec104[0];
			this.fRec110[1] = this.fRec110[0];
			this.fRec109[2] = this.fRec109[1];
			this.fRec109[1] = this.fRec109[0];
			this.fRec108[2] = this.fRec108[1];
			this.fRec108[1] = this.fRec108[0];
			this.fRec107[2] = this.fRec107[1];
			this.fRec107[1] = this.fRec107[0];
			this.fRec106[2] = this.fRec106[1];
			this.fRec106[1] = this.fRec106[0];
			this.fRec116[1] = this.fRec116[0];
			this.fRec115[2] = this.fRec115[1];
			this.fRec115[1] = this.fRec115[0];
			this.fVec14[1] = this.fVec14[0];
			this.fRec114[1] = this.fRec114[0];
			this.fRec113[2] = this.fRec113[1];
			this.fRec113[1] = this.fRec113[0];
			this.fRec112[2] = this.fRec112[1];
			this.fRec112[1] = this.fRec112[0];
			this.fRec111[2] = this.fRec111[1];
			this.fRec111[1] = this.fRec111[0];
			this.fRec121[1] = this.fRec121[0];
			this.fRec120[2] = this.fRec120[1];
			this.fRec120[1] = this.fRec120[0];
			this.fVec15[1] = this.fVec15[0];
			this.fRec119[1] = this.fRec119[0];
			this.fRec118[2] = this.fRec118[1];
			this.fRec118[1] = this.fRec118[0];
			this.fRec117[2] = this.fRec117[1];
			this.fRec117[1] = this.fRec117[0];
			this.fRec125[1] = this.fRec125[0];
			this.fRec124[2] = this.fRec124[1];
			this.fRec124[1] = this.fRec124[0];
			this.fVec16[1] = this.fVec16[0];
			this.fRec123[1] = this.fRec123[0];
			this.fRec122[2] = this.fRec122[1];
			this.fRec122[1] = this.fRec122[0];
			this.fRec127[1] = this.fRec127[0];
			this.fRec126[2] = this.fRec126[1];
			this.fRec126[1] = this.fRec126[0];
			this.fRec132[1] = this.fRec132[0];
			this.fRec131[2] = this.fRec131[1];
			this.fRec131[1] = this.fRec131[0];
			this.fRec130[2] = this.fRec130[1];
			this.fRec130[1] = this.fRec130[0];
			this.fRec129[2] = this.fRec129[1];
			this.fRec129[1] = this.fRec129[0];
			this.fRec128[2] = this.fRec128[1];
			this.fRec128[1] = this.fRec128[0];
			this.fRec138[1] = this.fRec138[0];
			this.fRec137[2] = this.fRec137[1];
			this.fRec137[1] = this.fRec137[0];
			this.fVec17[1] = this.fVec17[0];
			this.fRec136[1] = this.fRec136[0];
			this.fRec135[2] = this.fRec135[1];
			this.fRec135[1] = this.fRec135[0];
			this.fRec134[2] = this.fRec134[1];
			this.fRec134[1] = this.fRec134[0];
			this.fRec133[2] = this.fRec133[1];
			this.fRec133[1] = this.fRec133[0];
			this.fRec143[1] = this.fRec143[0];
			this.fRec142[2] = this.fRec142[1];
			this.fRec142[1] = this.fRec142[0];
			this.fVec18[1] = this.fVec18[0];
			this.fRec141[1] = this.fRec141[0];
			this.fRec140[2] = this.fRec140[1];
			this.fRec140[1] = this.fRec140[0];
			this.fRec139[2] = this.fRec139[1];
			this.fRec139[1] = this.fRec139[0];
			this.fRec147[1] = this.fRec147[0];
			this.fRec146[2] = this.fRec146[1];
			this.fRec146[1] = this.fRec146[0];
			this.fVec19[1] = this.fVec19[0];
			this.fRec145[1] = this.fRec145[0];
			this.fRec144[2] = this.fRec144[1];
			this.fRec144[1] = this.fRec144[0];
			this.fRec149[1] = this.fRec149[0];
			this.fRec148[2] = this.fRec148[1];
			this.fRec148[1] = this.fRec148[0];
			this.fRec154[1] = this.fRec154[0];
			this.fRec153[2] = this.fRec153[1];
			this.fRec153[1] = this.fRec153[0];
			this.fRec152[2] = this.fRec152[1];
			this.fRec152[1] = this.fRec152[0];
			this.fRec151[2] = this.fRec151[1];
			this.fRec151[1] = this.fRec151[0];
			this.fRec150[2] = this.fRec150[1];
			this.fRec150[1] = this.fRec150[0];
			this.fRec160[1] = this.fRec160[0];
			this.fRec159[2] = this.fRec159[1];
			this.fRec159[1] = this.fRec159[0];
			this.fVec20[1] = this.fVec20[0];
			this.fRec158[1] = this.fRec158[0];
			this.fRec157[2] = this.fRec157[1];
			this.fRec157[1] = this.fRec157[0];
			this.fRec156[2] = this.fRec156[1];
			this.fRec156[1] = this.fRec156[0];
			this.fRec155[2] = this.fRec155[1];
			this.fRec155[1] = this.fRec155[0];
			this.fRec165[1] = this.fRec165[0];
			this.fRec164[2] = this.fRec164[1];
			this.fRec164[1] = this.fRec164[0];
			this.fVec21[1] = this.fVec21[0];
			this.fRec163[1] = this.fRec163[0];
			this.fRec162[2] = this.fRec162[1];
			this.fRec162[1] = this.fRec162[0];
			this.fRec161[2] = this.fRec161[1];
			this.fRec161[1] = this.fRec161[0];
			this.fRec169[1] = this.fRec169[0];
			this.fRec168[2] = this.fRec168[1];
			this.fRec168[1] = this.fRec168[0];
			this.fVec22[1] = this.fVec22[0];
			this.fRec167[1] = this.fRec167[0];
			this.fRec166[2] = this.fRec166[1];
			this.fRec166[1] = this.fRec166[0];
			this.fRec171[1] = this.fRec171[0];
			this.fRec170[2] = this.fRec170[1];
			this.fRec170[1] = this.fRec170[0];
			this.fRec176[1] = this.fRec176[0];
			this.fRec175[2] = this.fRec175[1];
			this.fRec175[1] = this.fRec175[0];
			this.fRec174[2] = this.fRec174[1];
			this.fRec174[1] = this.fRec174[0];
			this.fRec173[2] = this.fRec173[1];
			this.fRec173[1] = this.fRec173[0];
			this.fRec172[2] = this.fRec172[1];
			this.fRec172[1] = this.fRec172[0];
			this.fRec182[1] = this.fRec182[0];
			this.fRec181[2] = this.fRec181[1];
			this.fRec181[1] = this.fRec181[0];
			this.fVec23[1] = this.fVec23[0];
			this.fRec180[1] = this.fRec180[0];
			this.fRec179[2] = this.fRec179[1];
			this.fRec179[1] = this.fRec179[0];
			this.fRec178[2] = this.fRec178[1];
			this.fRec178[1] = this.fRec178[0];
			this.fRec177[2] = this.fRec177[1];
			this.fRec177[1] = this.fRec177[0];
			this.fRec187[1] = this.fRec187[0];
			this.fRec186[2] = this.fRec186[1];
			this.fRec186[1] = this.fRec186[0];
			this.fVec24[1] = this.fVec24[0];
			this.fRec185[1] = this.fRec185[0];
			this.fRec184[2] = this.fRec184[1];
			this.fRec184[1] = this.fRec184[0];
			this.fRec183[2] = this.fRec183[1];
			this.fRec183[1] = this.fRec183[0];
			this.fRec191[1] = this.fRec191[0];
			this.fRec190[2] = this.fRec190[1];
			this.fRec190[1] = this.fRec190[0];
			this.fVec25[1] = this.fVec25[0];
			this.fRec189[1] = this.fRec189[0];
			this.fRec188[2] = this.fRec188[1];
			this.fRec188[1] = this.fRec188[0];
			this.fRec193[1] = this.fRec193[0];
			this.fRec192[2] = this.fRec192[1];
			this.fRec192[1] = this.fRec192[0];
			this.fRec198[1] = this.fRec198[0];
			this.fRec197[2] = this.fRec197[1];
			this.fRec197[1] = this.fRec197[0];
			this.fRec196[2] = this.fRec196[1];
			this.fRec196[1] = this.fRec196[0];
			this.fRec195[2] = this.fRec195[1];
			this.fRec195[1] = this.fRec195[0];
			this.fRec194[2] = this.fRec194[1];
			this.fRec194[1] = this.fRec194[0];
			this.fRec204[1] = this.fRec204[0];
			this.fRec203[2] = this.fRec203[1];
			this.fRec203[1] = this.fRec203[0];
			this.fVec26[1] = this.fVec26[0];
			this.fRec202[1] = this.fRec202[0];
			this.fRec201[2] = this.fRec201[1];
			this.fRec201[1] = this.fRec201[0];
			this.fRec200[2] = this.fRec200[1];
			this.fRec200[1] = this.fRec200[0];
			this.fRec199[2] = this.fRec199[1];
			this.fRec199[1] = this.fRec199[0];
			this.fRec209[1] = this.fRec209[0];
			this.fRec208[2] = this.fRec208[1];
			this.fRec208[1] = this.fRec208[0];
			this.fVec27[1] = this.fVec27[0];
			this.fRec207[1] = this.fRec207[0];
			this.fRec206[2] = this.fRec206[1];
			this.fRec206[1] = this.fRec206[0];
			this.fRec205[2] = this.fRec205[1];
			this.fRec205[1] = this.fRec205[0];
			this.fRec213[1] = this.fRec213[0];
			this.fRec212[2] = this.fRec212[1];
			this.fRec212[1] = this.fRec212[0];
			this.fVec28[1] = this.fVec28[0];
			this.fRec211[1] = this.fRec211[0];
			this.fRec210[2] = this.fRec210[1];
			this.fRec210[1] = this.fRec210[0];
			this.fRec215[1] = this.fRec215[0];
			this.fRec214[2] = this.fRec214[1];
			this.fRec214[1] = this.fRec214[0];
			this.fRec220[1] = this.fRec220[0];
			this.fRec219[2] = this.fRec219[1];
			this.fRec219[1] = this.fRec219[0];
			this.fRec218[2] = this.fRec218[1];
			this.fRec218[1] = this.fRec218[0];
			this.fRec217[2] = this.fRec217[1];
			this.fRec217[1] = this.fRec217[0];
			this.fRec216[2] = this.fRec216[1];
			this.fRec216[1] = this.fRec216[0];
			this.fRec226[1] = this.fRec226[0];
			this.fRec225[2] = this.fRec225[1];
			this.fRec225[1] = this.fRec225[0];
			this.fVec29[1] = this.fVec29[0];
			this.fRec224[1] = this.fRec224[0];
			this.fRec223[2] = this.fRec223[1];
			this.fRec223[1] = this.fRec223[0];
			this.fRec222[2] = this.fRec222[1];
			this.fRec222[1] = this.fRec222[0];
			this.fRec221[2] = this.fRec221[1];
			this.fRec221[1] = this.fRec221[0];
			this.fRec231[1] = this.fRec231[0];
			this.fRec230[2] = this.fRec230[1];
			this.fRec230[1] = this.fRec230[0];
			this.fVec30[1] = this.fVec30[0];
			this.fRec229[1] = this.fRec229[0];
			this.fRec228[2] = this.fRec228[1];
			this.fRec228[1] = this.fRec228[0];
			this.fRec227[2] = this.fRec227[1];
			this.fRec227[1] = this.fRec227[0];
			this.fRec235[1] = this.fRec235[0];
			this.fRec234[2] = this.fRec234[1];
			this.fRec234[1] = this.fRec234[0];
			this.fVec31[1] = this.fVec31[0];
			this.fRec233[1] = this.fRec233[0];
			this.fRec232[2] = this.fRec232[1];
			this.fRec232[1] = this.fRec232[0];
			this.fRec237[1] = this.fRec237[0];
			this.fRec236[2] = this.fRec236[1];
			this.fRec236[1] = this.fRec236[0];
			this.fRec242[1] = this.fRec242[0];
			this.fRec241[2] = this.fRec241[1];
			this.fRec241[1] = this.fRec241[0];
			this.fRec240[2] = this.fRec240[1];
			this.fRec240[1] = this.fRec240[0];
			this.fRec239[2] = this.fRec239[1];
			this.fRec239[1] = this.fRec239[0];
			this.fRec238[2] = this.fRec238[1];
			this.fRec238[1] = this.fRec238[0];
			this.fRec248[1] = this.fRec248[0];
			this.fRec247[2] = this.fRec247[1];
			this.fRec247[1] = this.fRec247[0];
			this.fVec32[1] = this.fVec32[0];
			this.fRec246[1] = this.fRec246[0];
			this.fRec245[2] = this.fRec245[1];
			this.fRec245[1] = this.fRec245[0];
			this.fRec244[2] = this.fRec244[1];
			this.fRec244[1] = this.fRec244[0];
			this.fRec243[2] = this.fRec243[1];
			this.fRec243[1] = this.fRec243[0];
			this.fRec253[1] = this.fRec253[0];
			this.fRec252[2] = this.fRec252[1];
			this.fRec252[1] = this.fRec252[0];
			this.fVec33[1] = this.fVec33[0];
			this.fRec251[1] = this.fRec251[0];
			this.fRec250[2] = this.fRec250[1];
			this.fRec250[1] = this.fRec250[0];
			this.fRec249[2] = this.fRec249[1];
			this.fRec249[1] = this.fRec249[0];
			this.fRec257[1] = this.fRec257[0];
			this.fRec256[2] = this.fRec256[1];
			this.fRec256[1] = this.fRec256[0];
			this.fVec34[1] = this.fVec34[0];
			this.fRec255[1] = this.fRec255[0];
			this.fRec254[2] = this.fRec254[1];
			this.fRec254[1] = this.fRec254[0];
			this.fRec259[1] = this.fRec259[0];
			this.fRec258[2] = this.fRec258[1];
			this.fRec258[1] = this.fRec258[0];
			this.fRec264[1] = this.fRec264[0];
			this.fRec263[2] = this.fRec263[1];
			this.fRec263[1] = this.fRec263[0];
			this.fRec262[2] = this.fRec262[1];
			this.fRec262[1] = this.fRec262[0];
			this.fRec261[2] = this.fRec261[1];
			this.fRec261[1] = this.fRec261[0];
			this.fRec260[2] = this.fRec260[1];
			this.fRec260[1] = this.fRec260[0];
			this.fRec270[1] = this.fRec270[0];
			this.fRec269[2] = this.fRec269[1];
			this.fRec269[1] = this.fRec269[0];
			this.fVec35[1] = this.fVec35[0];
			this.fRec268[1] = this.fRec268[0];
			this.fRec267[2] = this.fRec267[1];
			this.fRec267[1] = this.fRec267[0];
			this.fRec266[2] = this.fRec266[1];
			this.fRec266[1] = this.fRec266[0];
			this.fRec265[2] = this.fRec265[1];
			this.fRec265[1] = this.fRec265[0];
			this.fRec275[1] = this.fRec275[0];
			this.fRec274[2] = this.fRec274[1];
			this.fRec274[1] = this.fRec274[0];
			this.fVec36[1] = this.fVec36[0];
			this.fRec273[1] = this.fRec273[0];
			this.fRec272[2] = this.fRec272[1];
			this.fRec272[1] = this.fRec272[0];
			this.fRec271[2] = this.fRec271[1];
			this.fRec271[1] = this.fRec271[0];
			this.fRec279[1] = this.fRec279[0];
			this.fRec278[2] = this.fRec278[1];
			this.fRec278[1] = this.fRec278[0];
			this.fVec37[1] = this.fVec37[0];
			this.fRec277[1] = this.fRec277[0];
			this.fRec276[2] = this.fRec276[1];
			this.fRec276[1] = this.fRec276[0];
			this.fRec281[1] = this.fRec281[0];
			this.fRec280[2] = this.fRec280[1];
			this.fRec280[1] = this.fRec280[0];
			this.fRec286[1] = this.fRec286[0];
			this.fRec285[2] = this.fRec285[1];
			this.fRec285[1] = this.fRec285[0];
			this.fRec284[2] = this.fRec284[1];
			this.fRec284[1] = this.fRec284[0];
			this.fRec283[2] = this.fRec283[1];
			this.fRec283[1] = this.fRec283[0];
			this.fRec282[2] = this.fRec282[1];
			this.fRec282[1] = this.fRec282[0];
			this.fRec292[1] = this.fRec292[0];
			this.fRec291[2] = this.fRec291[1];
			this.fRec291[1] = this.fRec291[0];
			this.fVec38[1] = this.fVec38[0];
			this.fRec290[1] = this.fRec290[0];
			this.fRec289[2] = this.fRec289[1];
			this.fRec289[1] = this.fRec289[0];
			this.fRec288[2] = this.fRec288[1];
			this.fRec288[1] = this.fRec288[0];
			this.fRec287[2] = this.fRec287[1];
			this.fRec287[1] = this.fRec287[0];
			this.fRec297[1] = this.fRec297[0];
			this.fRec296[2] = this.fRec296[1];
			this.fRec296[1] = this.fRec296[0];
			this.fVec39[1] = this.fVec39[0];
			this.fRec295[1] = this.fRec295[0];
			this.fRec294[2] = this.fRec294[1];
			this.fRec294[1] = this.fRec294[0];
			this.fRec293[2] = this.fRec293[1];
			this.fRec293[1] = this.fRec293[0];
			this.fRec301[1] = this.fRec301[0];
			this.fRec300[2] = this.fRec300[1];
			this.fRec300[1] = this.fRec300[0];
			this.fVec40[1] = this.fVec40[0];
			this.fRec299[1] = this.fRec299[0];
			this.fRec298[2] = this.fRec298[1];
			this.fRec298[1] = this.fRec298[0];
			this.fRec303[1] = this.fRec303[0];
			this.fRec302[2] = this.fRec302[1];
			this.fRec302[1] = this.fRec302[0];
			this.fRec308[1] = this.fRec308[0];
			this.fRec307[2] = this.fRec307[1];
			this.fRec307[1] = this.fRec307[0];
			this.fRec306[2] = this.fRec306[1];
			this.fRec306[1] = this.fRec306[0];
			this.fRec305[2] = this.fRec305[1];
			this.fRec305[1] = this.fRec305[0];
			this.fRec304[2] = this.fRec304[1];
			this.fRec304[1] = this.fRec304[0];
			this.fRec314[1] = this.fRec314[0];
			this.fRec313[2] = this.fRec313[1];
			this.fRec313[1] = this.fRec313[0];
			this.fVec41[1] = this.fVec41[0];
			this.fRec312[1] = this.fRec312[0];
			this.fRec311[2] = this.fRec311[1];
			this.fRec311[1] = this.fRec311[0];
			this.fRec310[2] = this.fRec310[1];
			this.fRec310[1] = this.fRec310[0];
			this.fRec309[2] = this.fRec309[1];
			this.fRec309[1] = this.fRec309[0];
			this.fRec319[1] = this.fRec319[0];
			this.fRec318[2] = this.fRec318[1];
			this.fRec318[1] = this.fRec318[0];
			this.fVec42[1] = this.fVec42[0];
			this.fRec317[1] = this.fRec317[0];
			this.fRec316[2] = this.fRec316[1];
			this.fRec316[1] = this.fRec316[0];
			this.fRec315[2] = this.fRec315[1];
			this.fRec315[1] = this.fRec315[0];
			this.fRec323[1] = this.fRec323[0];
			this.fRec322[2] = this.fRec322[1];
			this.fRec322[1] = this.fRec322[0];
			this.fVec43[1] = this.fVec43[0];
			this.fRec321[1] = this.fRec321[0];
			this.fRec320[2] = this.fRec320[1];
			this.fRec320[1] = this.fRec320[0];
			this.fRec325[1] = this.fRec325[0];
			this.fRec324[2] = this.fRec324[1];
			this.fRec324[1] = this.fRec324[0];
			this.fRec330[1] = this.fRec330[0];
			this.fRec329[2] = this.fRec329[1];
			this.fRec329[1] = this.fRec329[0];
			this.fRec328[2] = this.fRec328[1];
			this.fRec328[1] = this.fRec328[0];
			this.fRec327[2] = this.fRec327[1];
			this.fRec327[1] = this.fRec327[0];
			this.fRec326[2] = this.fRec326[1];
			this.fRec326[1] = this.fRec326[0];
			this.fRec336[1] = this.fRec336[0];
			this.fRec335[2] = this.fRec335[1];
			this.fRec335[1] = this.fRec335[0];
			this.fVec44[1] = this.fVec44[0];
			this.fRec334[1] = this.fRec334[0];
			this.fRec333[2] = this.fRec333[1];
			this.fRec333[1] = this.fRec333[0];
			this.fRec332[2] = this.fRec332[1];
			this.fRec332[1] = this.fRec332[0];
			this.fRec331[2] = this.fRec331[1];
			this.fRec331[1] = this.fRec331[0];
			this.fRec341[1] = this.fRec341[0];
			this.fRec340[2] = this.fRec340[1];
			this.fRec340[1] = this.fRec340[0];
			this.fVec45[1] = this.fVec45[0];
			this.fRec339[1] = this.fRec339[0];
			this.fRec338[2] = this.fRec338[1];
			this.fRec338[1] = this.fRec338[0];
			this.fRec337[2] = this.fRec337[1];
			this.fRec337[1] = this.fRec337[0];
			this.fRec345[1] = this.fRec345[0];
			this.fRec344[2] = this.fRec344[1];
			this.fRec344[1] = this.fRec344[0];
			this.fVec46[1] = this.fVec46[0];
			this.fRec343[1] = this.fRec343[0];
			this.fRec342[2] = this.fRec342[1];
			this.fRec342[1] = this.fRec342[0];
			this.fRec347[1] = this.fRec347[0];
			this.fRec346[2] = this.fRec346[1];
			this.fRec346[1] = this.fRec346[0];
			this.fRec352[1] = this.fRec352[0];
			this.fRec351[2] = this.fRec351[1];
			this.fRec351[1] = this.fRec351[0];
			this.fRec350[2] = this.fRec350[1];
			this.fRec350[1] = this.fRec350[0];
			this.fRec349[2] = this.fRec349[1];
			this.fRec349[1] = this.fRec349[0];
			this.fRec348[2] = this.fRec348[1];
			this.fRec348[1] = this.fRec348[0];
			this.fRec358[1] = this.fRec358[0];
			this.fRec357[2] = this.fRec357[1];
			this.fRec357[1] = this.fRec357[0];
			this.fVec47[1] = this.fVec47[0];
			this.fRec356[1] = this.fRec356[0];
			this.fRec355[2] = this.fRec355[1];
			this.fRec355[1] = this.fRec355[0];
			this.fRec354[2] = this.fRec354[1];
			this.fRec354[1] = this.fRec354[0];
			this.fRec353[2] = this.fRec353[1];
			this.fRec353[1] = this.fRec353[0];
			this.fRec363[1] = this.fRec363[0];
			this.fRec362[2] = this.fRec362[1];
			this.fRec362[1] = this.fRec362[0];
			this.fVec48[1] = this.fVec48[0];
			this.fRec361[1] = this.fRec361[0];
			this.fRec360[2] = this.fRec360[1];
			this.fRec360[1] = this.fRec360[0];
			this.fRec359[2] = this.fRec359[1];
			this.fRec359[1] = this.fRec359[0];
			this.fRec367[1] = this.fRec367[0];
			this.fRec366[2] = this.fRec366[1];
			this.fRec366[1] = this.fRec366[0];
			this.fVec49[1] = this.fVec49[0];
			this.fRec365[1] = this.fRec365[0];
			this.fRec364[2] = this.fRec364[1];
			this.fRec364[1] = this.fRec364[0];
			this.fRec369[1] = this.fRec369[0];
			this.fRec368[2] = this.fRec368[1];
			this.fRec368[1] = this.fRec368[0];
			this.IOTA = (this.IOTA + 1);
			this.fRec0[2] = this.fRec0[1];
			this.fRec0[1] = this.fRec0[0];
			this.fVec51[1] = this.fVec51[0];
			this.fRec1[2] = this.fRec1[1];
			this.fRec1[1] = this.fRec1[0];
			this.fRec2[2] = this.fRec2[1];
			this.fRec2[1] = this.fRec2[0];
			this.fRec3[2] = this.fRec3[1];
			this.fRec3[1] = this.fRec3[0];
			this.fRec4[2] = this.fRec4[1];
			this.fRec4[1] = this.fRec4[0];
			this.fRec5[2] = this.fRec5[1];
			this.fRec5[1] = this.fRec5[0];
			this.fRec6[2] = this.fRec6[1];
			this.fRec6[1] = this.fRec6[0];
			this.fRec7[2] = this.fRec7[1];
			this.fRec7[1] = this.fRec7[0];
			this.fRec8[2] = this.fRec8[1];
			this.fRec8[1] = this.fRec8[0];
			this.fRec9[2] = this.fRec9[1];
			this.fRec9[1] = this.fRec9[0];
			this.fRec10[2] = this.fRec10[1];
			this.fRec10[1] = this.fRec10[0];
			this.fRec11[2] = this.fRec11[1];
			this.fRec11[1] = this.fRec11[0];
			this.fRec12[2] = this.fRec12[1];
			this.fRec12[1] = this.fRec12[0];
			this.fRec13[2] = this.fRec13[1];
			this.fRec13[1] = this.fRec13[0];
			this.fRec14[2] = this.fRec14[1];
			this.fRec14[1] = this.fRec14[0];
			this.fRec15[2] = this.fRec15[1];
			this.fRec15[1] = this.fRec15[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_reverb_designer = function(obj) 
{
    function process_aux_reverb_designer(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_reverb_designer;
}

function create_reverb_designer(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new reverb_designer();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_reverb_designer(this);
    
    return this.processor;
}
//Zita Reverb------------------------------------------------------------------
function zita_rev1() {
	
	this.fRec44 = new Float32Array(3);
	this.fRec45 = new Float32Array(3);
	this.fRec43 = new Float32Array(2);
	this.fRec1 = new Float32Array(3);
	this.fRec2 = new Float32Array(3);
	this.fRec10 = new Float32Array(3);
	this.fRec9 = new Float32Array(3);
	this.fRec8 = new Float32Array(3);
	this.fRec7 = new Float32Array(3);
	this.fRec6 = new Float32Array(3);
	this.fRec5 = new Float32Array(3);
	this.fRec4 = new Float32Array(3);
	this.fRec3 = new Float32Array(3);
	this.fRec39 = new Float32Array(2);
	this.fVec17 = new Float32Array(1024);
	this.fVec16 = new Float32Array(8192);
	this.fRec41 = new Float32Array(2);
	this.fRec42 = new Float32Array(2);
	this.fRec35 = new Float32Array(2);
	this.fVec15 = new Float32Array(2048);
	this.fVec14 = new Float32Array(8192);
	this.fRec37 = new Float32Array(2);
	this.fRec38 = new Float32Array(2);
	this.fRec31 = new Float32Array(2);
	this.fVec13 = new Float32Array(2048);
	this.fVec12 = new Float32Array(8192);
	this.fRec33 = new Float32Array(2);
	this.fRec34 = new Float32Array(2);
	this.fRec27 = new Float32Array(2);
	this.fVec11 = new Float32Array(1024);
	this.fVec10 = new Float32Array(8192);
	this.fVec9 = new Float32Array(8192);
	this.fRec29 = new Float32Array(2);
	this.fRec30 = new Float32Array(2);
	this.fRec23 = new Float32Array(2);
	this.fVec8 = new Float32Array(2048);
	this.fVec7 = new Float32Array(16384);
	this.fRec25 = new Float32Array(2);
	this.fRec26 = new Float32Array(2);
	this.fRec19 = new Float32Array(2);
	this.fVec6 = new Float32Array(2048);
	this.fVec5 = new Float32Array(8192);
	this.fRec21 = new Float32Array(2);
	this.fRec22 = new Float32Array(2);
	this.fRec15 = new Float32Array(2);
	this.fVec4 = new Float32Array(2048);
	this.fVec3 = new Float32Array(16384);
	this.fRec17 = new Float32Array(2);
	this.fRec18 = new Float32Array(2);
	this.fRec11 = new Float32Array(2);
	this.fVec2 = new Float32Array(1024);
	this.fVec1 = new Float32Array(8192);
	this.fVec0 = new Float32Array(16384);
	this.fRec13 = new Float32Array(2);
	this.fRec14 = new Float32Array(2);
	this.fRec0 = new Float32Array(2);
	this.fvslider0;
	this.fSamplingFreq;
	this.iConst0;
	this.fConst1;
	this.fvslider1;
	this.fvslider2;
	this.fvslider3;
	this.fvslider4;
	this.fConst2;
	this.fConst3;
	this.fvslider5;
	this.fConst4;
	this.fvslider6;
	this.fvslider7;
	this.fConst5;
	this.fvslider8;
	this.IOTA;
	this.fConst6;
	this.iConst7;
	this.fConst8;
	this.fvslider9;
	this.iConst9;
	this.fConst10;
	this.fConst11;
	this.fConst12;
	this.iConst13;
	this.iConst14;
	this.fConst15;
	this.fConst16;
	this.fConst17;
	this.iConst18;
	this.iConst19;
	this.fConst20;
	this.fConst21;
	this.fConst22;
	this.iConst23;
	this.iConst24;
	this.fConst25;
	this.fConst26;
	this.fConst27;
	this.iConst28;
	this.iConst29;
	this.fConst30;
	this.fConst31;
	this.fConst32;
	this.iConst33;
	this.iConst34;
	this.fConst35;
	this.fConst36;
	this.fConst37;
	this.iConst38;
	this.iConst39;
	this.fConst40;
	this.fConst41;
	this.fConst42;
	this.iConst43;
	this.iConst44;
	this.fvslider10;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("effect.lib/author", "Julius O. Smith (jos at ccrma.stanford.edu)");
		m.declare("effect.lib/copyright", "Julius O. Smith III");
		m.declare("effect.lib/license", "STK-4.3");
		m.declare("effect.lib/name", "Faust Audio Effect Library");
		m.declare("effect.lib/version", "1.33");
		m.declare("filter.lib/author", "Julius O. Smith (jos at ccrma.stanford.edu)");
		m.declare("filter.lib/copyright", "Julius O. Smith III");
		m.declare("filter.lib/license", "STK-4.3");
		m.declare("filter.lib/name", "Faust Filter Library");
		m.declare("filter.lib/reference", "https://ccrma.stanford.edu/~jos/filters/");
		m.declare("filter.lib/version", "1.29");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "zita_rev1");
	}

	this.getNumInputs = function() {
		return 2;
		
	}
	this.getNumOutputs = function() {
		return 2;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fvslider0 = -20;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		this.iConst0 = Math.min(192000, Math.max(1, this.fSamplingFreq));
		this.fConst1 = (6.28319 / this.iConst0);
		this.fvslider1 = 315;
		this.fvslider2 = 0;
		this.fvslider3 = 315;
		this.fvslider4 = 0;
		this.fConst2 = Math.floor((0.5 + (0.219991 * this.iConst0)));
		this.fConst3 = ((0 - (6.90776 * this.fConst2)) / this.iConst0);
		this.fvslider5 = 2;
		this.fConst4 = (6.28319 / this.iConst0);
		this.fvslider6 = 6000;
		this.fvslider7 = 3;
		this.fConst5 = (3.14159 / this.iConst0);
		this.fvslider8 = 200;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec14[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec13[i] = 0;
			
		}
		this.IOTA = 0;
		for (var i = 0; (i < 16384); i = (i + 1)) {
			this.fVec0[i] = 0;
			
		}
		this.fConst6 = Math.floor((0.5 + (0.019123 * this.iConst0)));
		this.iConst7 = ((this.fConst2 - this.fConst6) & 16383);
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec1[i] = 0;
			
		}
		this.fConst8 = (0.001 * this.iConst0);
		this.fvslider9 = 60;
		for (var i = 0; (i < 1024); i = (i + 1)) {
			this.fVec2[i] = 0;
			
		}
		this.iConst9 = ((this.fConst6 - 1) & 1023);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec11[i] = 0;
			
		}
		this.fConst10 = Math.floor((0.5 + (0.256891 * this.iConst0)));
		this.fConst11 = ((0 - (6.90776 * this.fConst10)) / this.iConst0);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec18[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec17[i] = 0;
			
		}
		for (var i = 0; (i < 16384); i = (i + 1)) {
			this.fVec3[i] = 0;
			
		}
		this.fConst12 = Math.floor((0.5 + (0.027333 * this.iConst0)));
		this.iConst13 = ((this.fConst10 - this.fConst12) & 16383);
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec4[i] = 0;
			
		}
		this.iConst14 = ((this.fConst12 - 1) & 2047);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec15[i] = 0;
			
		}
		this.fConst15 = Math.floor((0.5 + (0.192303 * this.iConst0)));
		this.fConst16 = ((0 - (6.90776 * this.fConst15)) / this.iConst0);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec22[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec21[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec5[i] = 0;
			
		}
		this.fConst17 = Math.floor((0.5 + (0.029291 * this.iConst0)));
		this.iConst18 = ((this.fConst15 - this.fConst17) & 8191);
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec6[i] = 0;
			
		}
		this.iConst19 = ((this.fConst17 - 1) & 2047);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec19[i] = 0;
			
		}
		this.fConst20 = Math.floor((0.5 + (0.210389 * this.iConst0)));
		this.fConst21 = ((0 - (6.90776 * this.fConst20)) / this.iConst0);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec26[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec25[i] = 0;
			
		}
		for (var i = 0; (i < 16384); i = (i + 1)) {
			this.fVec7[i] = 0;
			
		}
		this.fConst22 = Math.floor((0.5 + (0.024421 * this.iConst0)));
		this.iConst23 = ((this.fConst20 - this.fConst22) & 16383);
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec8[i] = 0;
			
		}
		this.iConst24 = ((this.fConst22 - 1) & 2047);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec23[i] = 0;
			
		}
		this.fConst25 = Math.floor((0.5 + (0.125 * this.iConst0)));
		this.fConst26 = ((0 - (6.90776 * this.fConst25)) / this.iConst0);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec30[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec29[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec9[i] = 0;
			
		}
		this.fConst27 = Math.floor((0.5 + (0.013458 * this.iConst0)));
		this.iConst28 = ((this.fConst25 - this.fConst27) & 8191);
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec10[i] = 0;
			
		}
		for (var i = 0; (i < 1024); i = (i + 1)) {
			this.fVec11[i] = 0;
			
		}
		this.iConst29 = ((this.fConst27 - 1) & 1023);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec27[i] = 0;
			
		}
		this.fConst30 = Math.floor((0.5 + (0.127837 * this.iConst0)));
		this.fConst31 = ((0 - (6.90776 * this.fConst30)) / this.iConst0);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec34[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec33[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec12[i] = 0;
			
		}
		this.fConst32 = Math.floor((0.5 + (0.031604 * this.iConst0)));
		this.iConst33 = ((this.fConst30 - this.fConst32) & 8191);
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec13[i] = 0;
			
		}
		this.iConst34 = ((this.fConst32 - 1) & 2047);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec31[i] = 0;
			
		}
		this.fConst35 = Math.floor((0.5 + (0.174713 * this.iConst0)));
		this.fConst36 = ((0 - (6.90776 * this.fConst35)) / this.iConst0);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec38[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec37[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec14[i] = 0;
			
		}
		this.fConst37 = Math.floor((0.5 + (0.022904 * this.iConst0)));
		this.iConst38 = ((this.fConst35 - this.fConst37) & 8191);
		for (var i = 0; (i < 2048); i = (i + 1)) {
			this.fVec15[i] = 0;
			
		}
		this.iConst39 = ((this.fConst37 - 1) & 2047);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec35[i] = 0;
			
		}
		this.fConst40 = Math.floor((0.5 + (0.153129 * this.iConst0)));
		this.fConst41 = ((0 - (6.90776 * this.fConst40)) / this.iConst0);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec42[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec41[i] = 0;
			
		}
		for (var i = 0; (i < 8192); i = (i + 1)) {
			this.fVec16[i] = 0;
			
		}
		this.fConst42 = Math.floor((0.5 + (0.020346 * this.iConst0)));
		this.iConst43 = ((this.fConst40 - this.fConst42) & 8191);
		for (var i = 0; (i < 1024); i = (i + 1)) {
			this.fVec17[i] = 0;
			
		}
		this.iConst44 = ((this.fConst42 - 1) & 1023);
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec39[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec3[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec4[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec5[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec6[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec7[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec8[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec9[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec10[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec1[i] = 0;
			
		}
		this.fvslider10 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec43[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec45[i] = 0;
			
		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec44[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.declare("0", "0", "");
		ui_interface.declare("0", "tooltip", "~ ZITA REV1 FEEDBACK DELAY NETWORK (FDN) & SCHROEDER ALLPASS-COMB REVERBERATOR (8x8). See Faust's effect.lib for documentation and references");
		ui_interface.openHorizontalBox("Zita_Rev1");
		ui_interface.declare("0", "1", "");
		ui_interface.openHorizontalBox("Input");
		ui_interface.declare("fvslider9", "1", "");
		ui_interface.declare("fvslider9", "style", "knob");
		ui_interface.declare("fvslider9", "tooltip", "Delay in ms before reverberation begins");
		ui_interface.declare("fvslider9", "unit", "ms");
		ui_interface.addVerticalSlider("In Delay", function handler(obj) { function setval(val) { obj.fvslider9 = val; } return setval; }(this), 60, 20, 100, 1);
		ui_interface.closeBox();
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("Decay Times in Bands (see tooltips)");
		ui_interface.declare("fvslider8", "1", "");
		ui_interface.declare("fvslider8", "style", "knob");
		ui_interface.declare("fvslider8", "tooltip", "Crossover frequency (Hz) separating low and middle frequencies");
		ui_interface.declare("fvslider8", "unit", "Hz");
		ui_interface.addVerticalSlider("LF X", function handler(obj) { function setval(val) { obj.fvslider8 = val; } return setval; }(this), 200, 50, 1000, 1);
		ui_interface.declare("fvslider7", "2", "");
		ui_interface.declare("fvslider7", "style", "knob");
		ui_interface.declare("fvslider7", "tooltip", "T60 = time (in seconds) to decay 60dB in low-frequency band");
		ui_interface.declare("fvslider7", "unit", "s");
		ui_interface.addVerticalSlider("Low RT60", function handler(obj) { function setval(val) { obj.fvslider7 = val; } return setval; }(this), 3, 1, 8, 0.1);
		ui_interface.declare("fvslider5", "3", "");
		ui_interface.declare("fvslider5", "style", "knob");
		ui_interface.declare("fvslider5", "tooltip", "T60 = time (in seconds) to decay 60dB in middle band");
		ui_interface.declare("fvslider5", "unit", "s");
		ui_interface.addVerticalSlider("Mid RT60", function handler(obj) { function setval(val) { obj.fvslider5 = val; } return setval; }(this), 2, 1, 8, 0.1);
		ui_interface.declare("fvslider6", "4", "");
		ui_interface.declare("fvslider6", "style", "knob");
		ui_interface.declare("fvslider6", "tooltip", "Frequency (Hz) at which the high-frequency T60 is half the middle-band's T60");
		ui_interface.declare("fvslider6", "unit", "Hz");
		ui_interface.addVerticalSlider("HF Damping", function handler(obj) { function setval(val) { obj.fvslider6 = val; } return setval; }(this), 6000, 1500, 23520, 1);
		ui_interface.closeBox();
		ui_interface.declare("0", "3", "");
		ui_interface.openHorizontalBox("RM Peaking Equalizer 1");
		ui_interface.declare("fvslider3", "1", "");
		ui_interface.declare("fvslider3", "style", "knob");
		ui_interface.declare("fvslider3", "tooltip", "Center-frequency of second-order Regalia-Mitra peaking equalizer section 1");
		ui_interface.declare("fvslider3", "unit", "Hz");
		ui_interface.addVerticalSlider("Eq1 Freq", function handler(obj) { function setval(val) { obj.fvslider3 = val; } return setval; }(this), 315, 40, 2500, 1);
		ui_interface.declare("fvslider4", "2", "");
		ui_interface.declare("fvslider4", "style", "knob");
		ui_interface.declare("fvslider4", "tooltip", "Peak level in dB of second-order Regalia-Mitra peaking equalizer section 1");
		ui_interface.declare("fvslider4", "unit", "dB");
		ui_interface.addVerticalSlider("Eq1 Level", function handler(obj) { function setval(val) { obj.fvslider4 = val; } return setval; }(this), 0, -15, 15, 0.1);
		ui_interface.closeBox();
		ui_interface.declare("0", "4", "");
		ui_interface.openHorizontalBox("RM Peaking Equalizer 2");
		ui_interface.declare("fvslider1", "1", "");
		ui_interface.declare("fvslider1", "style", "knob");
		ui_interface.declare("fvslider1", "tooltip", "Center-frequency of second-order Regalia-Mitra peaking equalizer section 2");
		ui_interface.declare("fvslider1", "unit", "Hz");
		ui_interface.addVerticalSlider("Eq2 Freq", function handler(obj) { function setval(val) { obj.fvslider1 = val; } return setval; }(this), 315, 40, 2500, 1);
		ui_interface.declare("fvslider2", "2", "");
		ui_interface.declare("fvslider2", "style", "knob");
		ui_interface.declare("fvslider2", "tooltip", "Peak level in dB of second-order Regalia-Mitra peaking equalizer section 2");
		ui_interface.declare("fvslider2", "unit", "dB");
		ui_interface.addVerticalSlider("Eq2 Level", function handler(obj) { function setval(val) { obj.fvslider2 = val; } return setval; }(this), 0, -15, 15, 0.1);
		ui_interface.closeBox();
		ui_interface.declare("0", "5", "");
		ui_interface.openHorizontalBox("Output");
		ui_interface.declare("fvslider10", "1", "");
		ui_interface.declare("fvslider10", "style", "knob");
		ui_interface.declare("fvslider10", "tooltip", "-1 = dry, 1 = wet");
		ui_interface.addVerticalSlider("Dry/Wet Mix", function handler(obj) { function setval(val) { obj.fvslider10 = val; } return setval; }(this), 0, -1, 1, 0.01);
		ui_interface.declare("fvslider0", "2", "");
		ui_interface.declare("fvslider0", "style", "knob");
		ui_interface.declare("fvslider0", "tooltip", "Output scale factor");
		ui_interface.declare("fvslider0", "unit", "dB");
		ui_interface.addVerticalSlider("Level", function handler(obj) { function setval(val) { obj.fvslider0 = val; } return setval; }(this), -20, -70, 40, 0.1);
		ui_interface.closeBox();
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var input1 = inputs[1];
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = (0.001 * Math.pow(10, (0.05 * this.fvslider0)));
		var fSlow1 = this.fvslider1;
		var fSlow2 = Math.pow(10, (0.05 * this.fvslider2));
		var fSlow3 = (this.fConst1 * (fSlow1 / Math.sqrt(Math.max(0, fSlow2))));
		var fSlow4 = ((1 - fSlow3) / (1 + fSlow3));
		var fSlow5 = ((1 + fSlow4) * (0 - Math.cos((this.fConst1 * fSlow1))));
		var fSlow6 = this.fvslider3;
		var fSlow7 = Math.pow(10, (0.05 * this.fvslider4));
		var fSlow8 = (this.fConst1 * (fSlow6 / Math.sqrt(Math.max(0, fSlow7))));
		var fSlow9 = ((1 - fSlow8) / (1 + fSlow8));
		var fSlow10 = ((1 + fSlow9) * (0 - Math.cos((this.fConst1 * fSlow6))));
		var fSlow11 = this.fvslider5;
		var fSlow12 = Math.exp((this.fConst3 / fSlow11));
		var fSlow13 = faustpower2_f(fSlow12);
		var fSlow14 = Math.cos((this.fConst4 * this.fvslider6));
		var fSlow15 = (1 - (fSlow13 * fSlow14));
		var fSlow16 = (1 - fSlow13);
		var fSlow17 = (fSlow15 / fSlow16);
		var fSlow18 = Math.sqrt(Math.max(0, ((faustpower2_f(fSlow15) / faustpower2_f(fSlow16)) - 1)));
		var fSlow19 = (fSlow17 - fSlow18);
		var fSlow20 = (fSlow12 * ((1 + fSlow18) - fSlow17));
		var fSlow21 = this.fvslider7;
		var fSlow22 = ((Math.exp((this.fConst3 / fSlow21)) / fSlow12) - 1);
		var fSlow23 = (1 / Math.tan((this.fConst5 * this.fvslider8)));
		var fSlow24 = (1 + fSlow23);
		var fSlow25 = (0 - ((1 - fSlow23) / fSlow24));
		var fSlow26 = (1 / fSlow24);
		var iSlow27 = ((this.fConst8 * this.fvslider9) & 8191);
		var fSlow28 = Math.exp((this.fConst11 / fSlow11));
		var fSlow29 = faustpower2_f(fSlow28);
		var fSlow30 = (1 - (fSlow14 * fSlow29));
		var fSlow31 = (1 - fSlow29);
		var fSlow32 = (fSlow30 / fSlow31);
		var fSlow33 = Math.sqrt(Math.max(0, ((faustpower2_f(fSlow30) / faustpower2_f(fSlow31)) - 1)));
		var fSlow34 = (fSlow32 - fSlow33);
		var fSlow35 = (fSlow28 * ((1 + fSlow33) - fSlow32));
		var fSlow36 = ((Math.exp((this.fConst11 / fSlow21)) / fSlow28) - 1);
		var fSlow37 = Math.exp((this.fConst16 / fSlow11));
		var fSlow38 = faustpower2_f(fSlow37);
		var fSlow39 = (1 - (fSlow14 * fSlow38));
		var fSlow40 = (1 - fSlow38);
		var fSlow41 = (fSlow39 / fSlow40);
		var fSlow42 = Math.sqrt(Math.max(0, ((faustpower2_f(fSlow39) / faustpower2_f(fSlow40)) - 1)));
		var fSlow43 = (fSlow41 - fSlow42);
		var fSlow44 = (fSlow37 * ((1 + fSlow42) - fSlow41));
		var fSlow45 = ((Math.exp((this.fConst16 / fSlow21)) / fSlow37) - 1);
		var fSlow46 = Math.exp((this.fConst21 / fSlow11));
		var fSlow47 = faustpower2_f(fSlow46);
		var fSlow48 = (1 - (fSlow14 * fSlow47));
		var fSlow49 = (1 - fSlow47);
		var fSlow50 = (fSlow48 / fSlow49);
		var fSlow51 = Math.sqrt(Math.max(0, ((faustpower2_f(fSlow48) / faustpower2_f(fSlow49)) - 1)));
		var fSlow52 = (fSlow50 - fSlow51);
		var fSlow53 = (fSlow46 * ((1 + fSlow51) - fSlow50));
		var fSlow54 = ((Math.exp((this.fConst21 / fSlow21)) / fSlow46) - 1);
		var fSlow55 = Math.exp((this.fConst26 / fSlow11));
		var fSlow56 = faustpower2_f(fSlow55);
		var fSlow57 = (1 - (fSlow14 * fSlow56));
		var fSlow58 = (1 - fSlow56);
		var fSlow59 = (fSlow57 / fSlow58);
		var fSlow60 = Math.sqrt(Math.max(0, ((faustpower2_f(fSlow57) / faustpower2_f(fSlow58)) - 1)));
		var fSlow61 = (fSlow59 - fSlow60);
		var fSlow62 = (fSlow55 * ((1 + fSlow60) - fSlow59));
		var fSlow63 = ((Math.exp((this.fConst26 / fSlow21)) / fSlow55) - 1);
		var fSlow64 = Math.exp((this.fConst31 / fSlow11));
		var fSlow65 = faustpower2_f(fSlow64);
		var fSlow66 = (1 - (fSlow14 * fSlow65));
		var fSlow67 = (1 - fSlow65);
		var fSlow68 = (fSlow66 / fSlow67);
		var fSlow69 = Math.sqrt(Math.max(0, ((faustpower2_f(fSlow66) / faustpower2_f(fSlow67)) - 1)));
		var fSlow70 = (fSlow68 - fSlow69);
		var fSlow71 = (fSlow64 * ((1 + fSlow69) - fSlow68));
		var fSlow72 = ((Math.exp((this.fConst31 / fSlow21)) / fSlow64) - 1);
		var fSlow73 = Math.exp((this.fConst36 / fSlow11));
		var fSlow74 = faustpower2_f(fSlow73);
		var fSlow75 = (1 - (fSlow14 * fSlow74));
		var fSlow76 = (1 - fSlow74);
		var fSlow77 = (fSlow75 / fSlow76);
		var fSlow78 = Math.sqrt(Math.max(0, ((faustpower2_f(fSlow75) / faustpower2_f(fSlow76)) - 1)));
		var fSlow79 = (fSlow77 - fSlow78);
		var fSlow80 = (fSlow73 * ((1 + fSlow78) - fSlow77));
		var fSlow81 = ((Math.exp((this.fConst36 / fSlow21)) / fSlow73) - 1);
		var fSlow82 = Math.exp((this.fConst41 / fSlow11));
		var fSlow83 = faustpower2_f(fSlow82);
		var fSlow84 = (1 - (fSlow14 * fSlow83));
		var fSlow85 = (1 - fSlow83);
		var fSlow86 = (fSlow84 / fSlow85);
		var fSlow87 = Math.sqrt(Math.max(0, ((faustpower2_f(fSlow84) / faustpower2_f(fSlow85)) - 1)));
		var fSlow88 = (fSlow86 - fSlow87);
		var fSlow89 = (fSlow82 * ((1 + fSlow87) - fSlow86));
		var fSlow90 = ((Math.exp((this.fConst41 / fSlow21)) / fSlow82) - 1);
		var fSlow91 = (0.001 * this.fvslider10);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.fRec0[0] = ((0.999 * this.fRec0[1]) + fSlow0);
			var fTemp0 = (fSlow5 * this.fRec1[1]);
			var fTemp1 = (fSlow10 * this.fRec2[1]);
			this.fRec14[0] = ((fSlow25 * this.fRec14[1]) + (fSlow26 * (this.fRec10[1] + this.fRec10[2])));
			this.fRec13[0] = ((fSlow19 * this.fRec13[1]) + (fSlow20 * (this.fRec10[1] + (fSlow22 * this.fRec14[0]))));
			this.fVec0[(this.IOTA & 16383)] = (1e-20 + (0.353553 * this.fRec13[0]));
			var fTemp2 = input1[i];
			this.fVec1[(this.IOTA & 8191)] = fTemp2;
			var fTemp3 = (0.3 * this.fVec1[((this.IOTA - iSlow27) & 8191)]);
			var fTemp4 = (((0.6 * this.fRec11[1]) + this.fVec0[((this.IOTA - this.iConst7) & 16383)]) - fTemp3);
			this.fVec2[(this.IOTA & 1023)] = fTemp4;
			this.fRec11[0] = this.fVec2[((this.IOTA - this.iConst9) & 1023)];
			var fRec12 = (0 - (0.6 * fTemp4));
			this.fRec18[0] = ((fSlow25 * this.fRec18[1]) + (fSlow26 * (this.fRec6[1] + this.fRec6[2])));
			this.fRec17[0] = ((fSlow34 * this.fRec17[1]) + (fSlow35 * (this.fRec6[1] + (fSlow36 * this.fRec18[0]))));
			this.fVec3[(this.IOTA & 16383)] = (1e-20 + (0.353553 * this.fRec17[0]));
			var fTemp5 = (((0.6 * this.fRec15[1]) + this.fVec3[((this.IOTA - this.iConst13) & 16383)]) - fTemp3);
			this.fVec4[(this.IOTA & 2047)] = fTemp5;
			this.fRec15[0] = this.fVec4[((this.IOTA - this.iConst14) & 2047)];
			var fRec16 = (0 - (0.6 * fTemp5));
			this.fRec22[0] = ((fSlow25 * this.fRec22[1]) + (fSlow26 * (this.fRec8[1] + this.fRec8[2])));
			this.fRec21[0] = ((fSlow43 * this.fRec21[1]) + (fSlow44 * (this.fRec8[1] + (fSlow45 * this.fRec22[0]))));
			this.fVec5[(this.IOTA & 8191)] = (1e-20 + (0.353553 * this.fRec21[0]));
			var fTemp6 = (this.fVec5[((this.IOTA - this.iConst18) & 8191)] + (fTemp3 + (0.6 * this.fRec19[1])));
			this.fVec6[(this.IOTA & 2047)] = fTemp6;
			this.fRec19[0] = this.fVec6[((this.IOTA - this.iConst19) & 2047)];
			var fRec20 = (0 - (0.6 * fTemp6));
			this.fRec26[0] = ((fSlow25 * this.fRec26[1]) + (fSlow26 * (this.fRec4[1] + this.fRec4[2])));
			this.fRec25[0] = ((fSlow52 * this.fRec25[1]) + (fSlow53 * (this.fRec4[1] + (fSlow54 * this.fRec26[0]))));
			this.fVec7[(this.IOTA & 16383)] = (1e-20 + (0.353553 * this.fRec25[0]));
			var fTemp7 = (fTemp3 + ((0.6 * this.fRec23[1]) + this.fVec7[((this.IOTA - this.iConst23) & 16383)]));
			this.fVec8[(this.IOTA & 2047)] = fTemp7;
			this.fRec23[0] = this.fVec8[((this.IOTA - this.iConst24) & 2047)];
			var fRec24 = (0 - (0.6 * fTemp7));
			this.fRec30[0] = ((fSlow25 * this.fRec30[1]) + (fSlow26 * (this.fRec9[1] + this.fRec9[2])));
			this.fRec29[0] = ((fSlow61 * this.fRec29[1]) + (fSlow62 * (this.fRec9[1] + (fSlow63 * this.fRec30[0]))));
			this.fVec9[(this.IOTA & 8191)] = (1e-20 + (0.353553 * this.fRec29[0]));
			var fTemp8 = input0[i];
			this.fVec10[(this.IOTA & 8191)] = fTemp8;
			var fTemp9 = (0.3 * this.fVec10[((this.IOTA - iSlow27) & 8191)]);
			var fTemp10 = (this.fVec9[((this.IOTA - this.iConst28) & 8191)] - (fTemp9 + (0.6 * this.fRec27[1])));
			this.fVec11[(this.IOTA & 1023)] = fTemp10;
			this.fRec27[0] = this.fVec11[((this.IOTA - this.iConst29) & 1023)];
			var fRec28 = (0.6 * fTemp10);
			this.fRec34[0] = ((fSlow25 * this.fRec34[1]) + (fSlow26 * (this.fRec5[1] + this.fRec5[2])));
			this.fRec33[0] = ((fSlow70 * this.fRec33[1]) + (fSlow71 * (this.fRec5[1] + (fSlow72 * this.fRec34[0]))));
			this.fVec12[(this.IOTA & 8191)] = (1e-20 + (0.353553 * this.fRec33[0]));
			var fTemp11 = (this.fVec12[((this.IOTA - this.iConst33) & 8191)] - (fTemp9 + (0.6 * this.fRec31[1])));
			this.fVec13[(this.IOTA & 2047)] = fTemp11;
			this.fRec31[0] = this.fVec13[((this.IOTA - this.iConst34) & 2047)];
			var fRec32 = (0.6 * fTemp11);
			this.fRec38[0] = ((fSlow25 * this.fRec38[1]) + (fSlow26 * (this.fRec7[1] + this.fRec7[2])));
			this.fRec37[0] = ((fSlow79 * this.fRec37[1]) + (fSlow80 * (this.fRec7[1] + (fSlow81 * this.fRec38[0]))));
			this.fVec14[(this.IOTA & 8191)] = (1e-20 + (0.353553 * this.fRec37[0]));
			var fTemp12 = ((fTemp9 + this.fVec14[((this.IOTA - this.iConst38) & 8191)]) - (0.6 * this.fRec35[1]));
			this.fVec15[(this.IOTA & 2047)] = fTemp12;
			this.fRec35[0] = this.fVec15[((this.IOTA - this.iConst39) & 2047)];
			var fRec36 = (0.6 * fTemp12);
			this.fRec42[0] = ((fSlow25 * this.fRec42[1]) + (fSlow26 * (this.fRec3[1] + this.fRec3[2])));
			this.fRec41[0] = ((fSlow88 * this.fRec41[1]) + (fSlow89 * (this.fRec3[1] + (fSlow90 * this.fRec42[0]))));
			this.fVec16[(this.IOTA & 8191)] = (1e-20 + (0.353553 * this.fRec41[0]));
			var fTemp13 = ((this.fVec16[((this.IOTA - this.iConst43) & 8191)] + fTemp9) - (0.6 * this.fRec39[1]));
			this.fVec17[(this.IOTA & 1023)] = fTemp13;
			this.fRec39[0] = this.fVec17[((this.IOTA - this.iConst44) & 1023)];
			var fRec40 = (0.6 * fTemp13);
			var fTemp14 = (fRec40 + fRec36);
			var fTemp15 = (fRec28 + (fRec32 + fTemp14));
			this.fRec3[0] = (this.fRec11[1] + (this.fRec15[1] + (this.fRec19[1] + (this.fRec23[1] + (this.fRec27[1] + (this.fRec31[1] + (this.fRec35[1] + (this.fRec39[1] + (fRec12 + (fRec16 + (fRec20 + (fRec24 + fTemp15))))))))))));
			this.fRec4[0] = (0 - ((this.fRec11[1] + (this.fRec15[1] + (this.fRec19[1] + (this.fRec23[1] + (fRec12 + (fRec16 + (fRec24 + fRec20))))))) - (this.fRec27[1] + (this.fRec31[1] + (this.fRec35[1] + (this.fRec39[1] + fTemp15))))));
			var fTemp16 = (fRec32 + fRec28);
			this.fRec5[0] = (0 - ((this.fRec11[1] + (this.fRec15[1] + (this.fRec27[1] + (this.fRec31[1] + (fRec12 + (fRec16 + fTemp16)))))) - (this.fRec19[1] + (this.fRec23[1] + (this.fRec35[1] + (this.fRec39[1] + (fRec20 + (fRec24 + fTemp14))))))));
			this.fRec6[0] = (0 - ((this.fRec19[1] + (this.fRec23[1] + (this.fRec27[1] + (this.fRec31[1] + (fRec20 + (fRec24 + fTemp16)))))) - (this.fRec11[1] + (this.fRec15[1] + (this.fRec35[1] + (this.fRec39[1] + (fRec12 + (fRec16 + fTemp14))))))));
			var fTemp17 = (fRec36 + fRec28);
			var fTemp18 = (fRec40 + fRec32);
			this.fRec7[0] = (0 - ((this.fRec11[1] + (this.fRec19[1] + (this.fRec27[1] + (this.fRec35[1] + (fRec12 + (fRec20 + fTemp17)))))) - (this.fRec15[1] + (this.fRec23[1] + (this.fRec31[1] + (this.fRec39[1] + (fRec16 + (fRec24 + fTemp18))))))));
			this.fRec8[0] = (0 - ((this.fRec15[1] + (this.fRec23[1] + (this.fRec27[1] + (this.fRec35[1] + (fRec16 + (fRec24 + fTemp17)))))) - (this.fRec11[1] + (this.fRec19[1] + (this.fRec31[1] + (this.fRec39[1] + (fRec12 + (fRec20 + fTemp18))))))));
			var fTemp19 = (fRec36 + fRec32);
			var fTemp20 = (fRec40 + fRec28);
			this.fRec9[0] = (0 - ((this.fRec15[1] + (this.fRec19[1] + (this.fRec31[1] + (this.fRec35[1] + (fRec16 + (fRec20 + fTemp19)))))) - (this.fRec11[1] + (this.fRec23[1] + (this.fRec27[1] + (this.fRec39[1] + (fRec12 + (fRec24 + fTemp20))))))));
			this.fRec10[0] = (0 - ((this.fRec11[1] + (this.fRec23[1] + (this.fRec31[1] + (this.fRec35[1] + (fRec12 + (fRec24 + fTemp19)))))) - (this.fRec15[1] + (this.fRec19[1] + (this.fRec27[1] + (this.fRec39[1] + (fRec16 + (fRec20 + fTemp20))))))));
			var fTemp21 = (0.37 * (this.fRec4[0] + this.fRec5[0]));
			this.fRec2[0] = (0 - ((fTemp1 + (fSlow9 * this.fRec2[2])) - fTemp21));
			var fTemp22 = (fSlow9 * this.fRec2[0]);
			var fTemp23 = (0.5 * ((fTemp22 + (this.fRec2[2] + (fTemp21 + fTemp1))) + (fSlow7 * ((fTemp22 + (fTemp1 + this.fRec2[2])) - fTemp21))));
			this.fRec1[0] = (0 - ((fTemp0 + (fSlow4 * this.fRec1[2])) - fTemp23));
			var fTemp24 = (fSlow4 * this.fRec1[0]);
			this.fRec43[0] = ((0.999 * this.fRec43[1]) + fSlow91);
			var fTemp25 = (1 + this.fRec43[0]);
			var fTemp26 = (1 - (0.5 * fTemp25));
			output0[i] = (this.fRec0[0] * ((0.25 * (((fTemp24 + (this.fRec1[2] + (fTemp0 + fTemp23))) + (fSlow2 * ((fTemp24 + (fTemp0 + this.fRec1[2])) - fTemp23))) * fTemp25)) + (fTemp8 * fTemp26)));
			var fTemp27 = (fSlow5 * this.fRec44[1]);
			var fTemp28 = (fSlow10 * this.fRec45[1]);
			var fTemp29 = (0.37 * (this.fRec4[0] - this.fRec5[0]));
			this.fRec45[0] = (0 - ((fTemp28 + (fSlow9 * this.fRec45[2])) - fTemp29));
			var fTemp30 = (fSlow9 * this.fRec45[0]);
			var fTemp31 = (0.5 * ((fTemp30 + (this.fRec45[2] + (fTemp29 + fTemp28))) + (fSlow7 * ((fTemp30 + (fTemp28 + this.fRec45[2])) - fTemp29))));
			this.fRec44[0] = (0 - ((fTemp27 + (fSlow4 * this.fRec44[2])) - fTemp31));
			var fTemp32 = (fSlow4 * this.fRec44[0]);
			output1[i] = (this.fRec0[0] * ((0.25 * (fTemp25 * ((fTemp32 + (this.fRec44[2] + (fTemp27 + fTemp31))) + (fSlow2 * ((fTemp32 + (fTemp27 + this.fRec44[2])) - fTemp31))))) + (fTemp2 * fTemp26)));
			this.fRec0[1] = this.fRec0[0];
			this.fRec14[1] = this.fRec14[0];
			this.fRec13[1] = this.fRec13[0];
			this.IOTA = (this.IOTA + 1);
			this.fRec11[1] = this.fRec11[0];
			this.fRec18[1] = this.fRec18[0];
			this.fRec17[1] = this.fRec17[0];
			this.fRec15[1] = this.fRec15[0];
			this.fRec22[1] = this.fRec22[0];
			this.fRec21[1] = this.fRec21[0];
			this.fRec19[1] = this.fRec19[0];
			this.fRec26[1] = this.fRec26[0];
			this.fRec25[1] = this.fRec25[0];
			this.fRec23[1] = this.fRec23[0];
			this.fRec30[1] = this.fRec30[0];
			this.fRec29[1] = this.fRec29[0];
			this.fRec27[1] = this.fRec27[0];
			this.fRec34[1] = this.fRec34[0];
			this.fRec33[1] = this.fRec33[0];
			this.fRec31[1] = this.fRec31[0];
			this.fRec38[1] = this.fRec38[0];
			this.fRec37[1] = this.fRec37[0];
			this.fRec35[1] = this.fRec35[0];
			this.fRec42[1] = this.fRec42[0];
			this.fRec41[1] = this.fRec41[0];
			this.fRec39[1] = this.fRec39[0];
			this.fRec3[2] = this.fRec3[1];
			this.fRec3[1] = this.fRec3[0];
			this.fRec4[2] = this.fRec4[1];
			this.fRec4[1] = this.fRec4[0];
			this.fRec5[2] = this.fRec5[1];
			this.fRec5[1] = this.fRec5[0];
			this.fRec6[2] = this.fRec6[1];
			this.fRec6[1] = this.fRec6[0];
			this.fRec7[2] = this.fRec7[1];
			this.fRec7[1] = this.fRec7[0];
			this.fRec8[2] = this.fRec8[1];
			this.fRec8[1] = this.fRec8[0];
			this.fRec9[2] = this.fRec9[1];
			this.fRec9[1] = this.fRec9[0];
			this.fRec10[2] = this.fRec10[1];
			this.fRec10[1] = this.fRec10[0];
			this.fRec2[2] = this.fRec2[1];
			this.fRec2[1] = this.fRec2[0];
			this.fRec1[2] = this.fRec1[1];
			this.fRec1[1] = this.fRec1[0];
			this.fRec43[1] = this.fRec43[0];
			this.fRec45[2] = this.fRec45[1];
			this.fRec45[1] = this.fRec45[0];
			this.fRec44[2] = this.fRec44[1];
			this.fRec44[1] = this.fRec44[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_zita_rev1 = function(obj) 
{
    function process_aux_zita_rev1(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_zita_rev1;
}

function create_zita_rev1(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new zita_rev1();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_zita_rev1(this);
    
    return this.processor;
}
//Band Filter-------------------------------------------------------------------
function bandfilter() {
	
	this.fRec0 = new Float32Array(3);
	this.fSamplingFreq;
	this.fConst0;
	this.fentry0;
	this.fvslider0;
	this.fentry1;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2006");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "bandfilter");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 1;
		
	}
	this.getNumOutputs = function() {
		return 1;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fConst0 = (3.14159 / Math.min(192000, Math.max(1, this.fSamplingFreq)));
		this.fentry0 = 1000;
		this.fvslider0 = 0;
		this.fentry1 = 50;
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("Bandfilter");
		ui_interface.declare("fentry1", "style", "knob");
		ui_interface.addNumEntry("Q factor", function handler(obj) { function setval(val) { obj.fentry1 = val; } return setval; }(this), 50, 0.1, 100, 0.1);
		ui_interface.declare("fentry0", "style", "knob");
		ui_interface.declare("fentry0", "unit", "Hz");
		ui_interface.addNumEntry("freq", function handler(obj) { function setval(val) { obj.fentry0 = val; } return setval; }(this), 1000, 20, 20000, 1);
		ui_interface.declare("fvslider0", "unit", "dB");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider0 = val; } return setval; }(this), 0, -50, 50, 0.1);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var output0 = outputs[0];
		var fSlow0 = Math.tan((this.fConst0 * this.fentry0));
		var fSlow1 = this.fentry1;
		var fSlow2 = (Math.pow(10, (0.05 * (0 - this.fvslider0))) / fSlow1);
		var fSlow3 = (1 / (1 + (fSlow0 * (fSlow0 + fSlow2))));
		var fSlow4 = (1 / fSlow1);
		var fSlow5 = (1 + (fSlow0 * (fSlow0 + fSlow4)));
		var fSlow6 = (1 + (fSlow0 * (fSlow0 - fSlow2)));
		var fSlow7 = (2 * (faustpower2_f(fSlow0) - 1));
		var fSlow8 = (1 + (fSlow0 * (fSlow0 - fSlow4)));
		for (var i = 0; (i < count); i = (i + 1)) {
			var fTemp0 = (fSlow7 * this.fRec0[1]);
			this.fRec0[0] = (input0[i] - (fSlow3 * ((fSlow6 * this.fRec0[2]) + fTemp0)));
			output0[i] = (fSlow3 * (((fSlow5 * this.fRec0[0]) + fTemp0) + (fSlow8 * this.fRec0[2])));
			this.fRec0[2] = this.fRec0[1];
			this.fRec0[1] = this.fRec0[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_bandfilter = function(obj) 
{
    function process_aux_bandfilter(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_bandfilter;
}

function create_bandfilter(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new bandfilter();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_bandfilter(this);
    
    return this.processor;
}
//Utilities////////////////////////////////////////////////////////////////////
//Volume-------------------------------------------------------------------------
function volume() {
	
	this.fRec0 = new Float32Array(2);
	this.fvslider0;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2006");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "volume");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 1;
		
	}
	this.getNumOutputs = function() {
		return 1;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fvslider0 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("volume");
		ui_interface.addVerticalSlider("Volume", function handler(obj) { function setval(val) { obj.fvslider0 = val; } return setval; }(this), 0, -70, 4, 0.1);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var output0 = outputs[0];
		var fSlow0 = (0.001 * Math.pow(10, (0.05 * this.fvslider0)));
		for (var i = 0; (i < count); i = (i + 1)) {
			this.fRec0[0] = ((0.999 * this.fRec0[1]) + fSlow0);
			output0[i] = (input0[i] * this.fRec0[0]);
			this.fRec0[1] = this.fRec0[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_volume = function(obj) 
{
    function process_aux_volume(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_volume;
}

function create_volume(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new volume();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_volume(this);
    
    return this.processor;
}
//Switcher Guts-----------------------------------------------------------------
function switcher() {
	
	this.fhslider0;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2007");
		m.declare("license", "BSD");
		m.declare("name", "switch");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 4;
		
	}
	this.getNumOutputs = function() {
		return 2;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			case 2: {
				rate = 1;
				break;
			}
			case 3: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 0;
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("switcher");
		ui_interface.addHorizontalSlider("source 0 <-> source 1", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 0, 0, 1, 1);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var input1 = inputs[1];
		var input2 = inputs[2];
		var input3 = inputs[3];
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = this.fhslider0;
		var fSlow1 = (1 - fSlow0);
		for (var i = 0; (i < count); i = (i + 1)) {
			output0[i] = ((fSlow1 * input0[i]) + (fSlow0 * input2[i]));
			output1[i] = ((fSlow1 * input1[i]) + (fSlow0 * input3[i]));
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_switcher = function(obj) 
{
    function process_aux_switcher(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_switcher;
}

function create_switcher(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new switcher();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_switcher(this);
    
    return this.processor;
}
//Mixer Guts-------------------------------------------------------------------
function mixer() {
	
	this.fRec18 = new Float32Array(2);
	this.fRec0 = new Float32Array(2);
	this.fRec16 = new Float32Array(2);
	this.fRec17 = new Float32Array(2);
	this.fRec14 = new Float32Array(2);
	this.fRec15 = new Float32Array(2);
	this.fRec12 = new Float32Array(2);
	this.fRec13 = new Float32Array(2);
	this.fRec10 = new Float32Array(2);
	this.fRec11 = new Float32Array(2);
	this.fRec8 = new Float32Array(2);
	this.fRec9 = new Float32Array(2);
	this.fRec6 = new Float32Array(2);
	this.fRec7 = new Float32Array(2);
	this.fRec4 = new Float32Array(2);
	this.fRec5 = new Float32Array(2);
	this.fRec2 = new Float32Array(2);
	this.fRec3 = new Float32Array(2);
	this.fRec1 = new Float32Array(2);
	this.fSamplingFreq;
	this.fConst0;
	this.fvslider0;
	this.fentry0;
	this.fcheckbox0;
	this.fvslider1;
	this.fvbargraph0;
	this.fentry1;
	this.fcheckbox1;
	this.fvslider2;
	this.fvbargraph1;
	this.fentry2;
	this.fcheckbox2;
	this.fvslider3;
	this.fvbargraph2;
	this.fentry3;
	this.fcheckbox3;
	this.fvslider4;
	this.fvbargraph3;
	this.fentry4;
	this.fcheckbox4;
	this.fvslider5;
	this.fvbargraph4;
	this.fentry5;
	this.fcheckbox5;
	this.fvslider6;
	this.fvbargraph5;
	this.fentry6;
	this.fcheckbox6;
	this.fvslider7;
	this.fvbargraph6;
	this.fentry7;
	this.fcheckbox7;
	this.fvslider8;
	this.fvbargraph7;
	this.fvbargraph8;
	this.fvbargraph9;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2006");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "mixer");
		m.declare("panpot.dsp/author", "Grame");
		m.declare("panpot.dsp/copyright", "(c)GRAME 2006");
		m.declare("panpot.dsp/license", "BSD");
		m.declare("panpot.dsp/name", "panpot");
		m.declare("panpot.dsp/version", "1.0");
		m.declare("version", "1.0");
		m.declare("volume.dsp/author", "Grame");
		m.declare("volume.dsp/copyright", "(c)GRAME 2006");
		m.declare("volume.dsp/license", "BSD");
		m.declare("volume.dsp/name", "volume");
		m.declare("volume.dsp/version", "1.0");
		m.declare("vumeter.dsp/author", "Grame");
		m.declare("vumeter.dsp/copyright", "(c)GRAME 2006");
		m.declare("vumeter.dsp/license", "BSD");
		m.declare("vumeter.dsp/name", "vumeter");
		m.declare("vumeter.dsp/version", "1.0");
	}

	this.getNumInputs = function() {
		return 8;
		
	}
	this.getNumOutputs = function() {
		return 2;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			case 2: {
				rate = 1;
				break;
			}
			case 3: {
				rate = 1;
				break;
			}
			case 4: {
				rate = 1;
				break;
			}
			case 5: {
				rate = 1;
				break;
			}
			case 6: {
				rate = 1;
				break;
			}
			case 7: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fConst0 = (1 / Math.min(192000, Math.max(1, this.fSamplingFreq)));
		this.fvslider0 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec1[i] = 0;
			
		}
		this.fentry0 = 0;
		this.fcheckbox0 = 0;
		this.fvslider1 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec3[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		this.fentry1 = 0;
		this.fcheckbox1 = 0;
		this.fvslider2 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec5[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec4[i] = 0;
			
		}
		this.fentry2 = 0;
		this.fcheckbox2 = 0;
		this.fvslider3 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec7[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec6[i] = 0;
			
		}
		this.fentry3 = 0;
		this.fcheckbox3 = 0;
		this.fvslider4 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec9[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec8[i] = 0;
			
		}
		this.fentry4 = 0;
		this.fcheckbox4 = 0;
		this.fvslider5 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec11[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec10[i] = 0;
			
		}
		this.fentry5 = 0;
		this.fcheckbox5 = 0;
		this.fvslider6 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec13[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec12[i] = 0;
			
		}
		this.fentry6 = 0;
		this.fcheckbox6 = 0;
		this.fvslider7 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec15[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec14[i] = 0;
			
		}
		this.fentry7 = 0;
		this.fcheckbox7 = 0;
		this.fvslider8 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec17[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec16[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec18[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openHorizontalBox("mixer");
		ui_interface.openVerticalBox("Ch 0");
		ui_interface.declare("fentry0", "1", "");
		ui_interface.declare("fentry0", "style", "knob");
		ui_interface.addNumEntry("pan", function handler(obj) { function setval(val) { obj.fentry0 = val; } return setval; }(this), 0, -90, 90, 1);
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("");
		ui_interface.addVerticalSlider("Volume", function handler(obj) { function setval(val) { obj.fvslider1 = val; } return setval; }(this), 0, -70, 4, 0.1);
		ui_interface.declare("fvbargraph0", "2", "");
		ui_interface.declare("fvbargraph0", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph0 = val; } return setval; }(this), -70, 5);
		ui_interface.closeBox();
		ui_interface.addCheckButton("mute", function handler(obj) { function setval(val) { obj.fcheckbox0 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.openVerticalBox("Ch 1");
		ui_interface.declare("fentry1", "1", "");
		ui_interface.declare("fentry1", "style", "knob");
		ui_interface.addNumEntry("pan", function handler(obj) { function setval(val) { obj.fentry1 = val; } return setval; }(this), 0, -90, 90, 1);
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("");
		ui_interface.addVerticalSlider("Volume", function handler(obj) { function setval(val) { obj.fvslider2 = val; } return setval; }(this), 0, -70, 4, 0.1);
		ui_interface.declare("fvbargraph1", "2", "");
		ui_interface.declare("fvbargraph1", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph1 = val; } return setval; }(this), -70, 5);
		ui_interface.closeBox();
		ui_interface.addCheckButton("mute", function handler(obj) { function setval(val) { obj.fcheckbox1 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.openVerticalBox("Ch 2");
		ui_interface.declare("fentry2", "1", "");
		ui_interface.declare("fentry2", "style", "knob");
		ui_interface.addNumEntry("pan", function handler(obj) { function setval(val) { obj.fentry2 = val; } return setval; }(this), 0, -90, 90, 1);
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("");
		ui_interface.addVerticalSlider("Volume", function handler(obj) { function setval(val) { obj.fvslider3 = val; } return setval; }(this), 0, -70, 4, 0.1);
		ui_interface.declare("fvbargraph2", "2", "");
		ui_interface.declare("fvbargraph2", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph2 = val; } return setval; }(this), -70, 5);
		ui_interface.closeBox();
		ui_interface.addCheckButton("mute", function handler(obj) { function setval(val) { obj.fcheckbox2 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.openVerticalBox("Ch 3");
		ui_interface.declare("fentry3", "1", "");
		ui_interface.declare("fentry3", "style", "knob");
		ui_interface.addNumEntry("pan", function handler(obj) { function setval(val) { obj.fentry3 = val; } return setval; }(this), 0, -90, 90, 1);
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("");
		ui_interface.addVerticalSlider("Volume", function handler(obj) { function setval(val) { obj.fvslider4 = val; } return setval; }(this), 0, -70, 4, 0.1);
		ui_interface.declare("fvbargraph3", "2", "");
		ui_interface.declare("fvbargraph3", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph3 = val; } return setval; }(this), -70, 5);
		ui_interface.closeBox();
		ui_interface.addCheckButton("mute", function handler(obj) { function setval(val) { obj.fcheckbox3 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.openVerticalBox("Ch 4");
		ui_interface.declare("fentry4", "1", "");
		ui_interface.declare("fentry4", "style", "knob");
		ui_interface.addNumEntry("pan", function handler(obj) { function setval(val) { obj.fentry4 = val; } return setval; }(this), 0, -90, 90, 1);
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("");
		ui_interface.addVerticalSlider("Volume", function handler(obj) { function setval(val) { obj.fvslider5 = val; } return setval; }(this), 0, -70, 4, 0.1);
		ui_interface.declare("fvbargraph4", "2", "");
		ui_interface.declare("fvbargraph4", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph4 = val; } return setval; }(this), -70, 5);
		ui_interface.closeBox();
		ui_interface.addCheckButton("mute", function handler(obj) { function setval(val) { obj.fcheckbox4 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.openVerticalBox("Ch 5");
		ui_interface.declare("fentry5", "1", "");
		ui_interface.declare("fentry5", "style", "knob");
		ui_interface.addNumEntry("pan", function handler(obj) { function setval(val) { obj.fentry5 = val; } return setval; }(this), 0, -90, 90, 1);
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("");
		ui_interface.addVerticalSlider("Volume", function handler(obj) { function setval(val) { obj.fvslider6 = val; } return setval; }(this), 0, -70, 4, 0.1);
		ui_interface.declare("fvbargraph5", "2", "");
		ui_interface.declare("fvbargraph5", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph5 = val; } return setval; }(this), -70, 5);
		ui_interface.closeBox();
		ui_interface.addCheckButton("mute", function handler(obj) { function setval(val) { obj.fcheckbox5 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.openVerticalBox("Ch 6");
		ui_interface.declare("fentry6", "1", "");
		ui_interface.declare("fentry6", "style", "knob");
		ui_interface.addNumEntry("pan", function handler(obj) { function setval(val) { obj.fentry6 = val; } return setval; }(this), 0, -90, 90, 1);
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("");
		ui_interface.addVerticalSlider("Volume", function handler(obj) { function setval(val) { obj.fvslider7 = val; } return setval; }(this), 0, -70, 4, 0.1);
		ui_interface.declare("fvbargraph6", "2", "");
		ui_interface.declare("fvbargraph6", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph6 = val; } return setval; }(this), -70, 5);
		ui_interface.closeBox();
		ui_interface.addCheckButton("mute", function handler(obj) { function setval(val) { obj.fcheckbox6 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.openVerticalBox("Ch 7");
		ui_interface.declare("fentry7", "1", "");
		ui_interface.declare("fentry7", "style", "knob");
		ui_interface.addNumEntry("pan", function handler(obj) { function setval(val) { obj.fentry7 = val; } return setval; }(this), 0, -90, 90, 1);
		ui_interface.declare("0", "2", "");
		ui_interface.openHorizontalBox("");
		ui_interface.addVerticalSlider("Volume", function handler(obj) { function setval(val) { obj.fvslider8 = val; } return setval; }(this), 0, -70, 4, 0.1);
		ui_interface.declare("fvbargraph7", "2", "");
		ui_interface.declare("fvbargraph7", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph7 = val; } return setval; }(this), -70, 5);
		ui_interface.closeBox();
		ui_interface.addCheckButton("mute", function handler(obj) { function setval(val) { obj.fcheckbox7 = val; } return setval; }(this));
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("stereo out");
		ui_interface.openVerticalBox("L");
		ui_interface.declare("fvbargraph8", "2", "");
		ui_interface.declare("fvbargraph8", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph8 = val; } return setval; }(this), -70, 5);
		ui_interface.closeBox();
		ui_interface.openVerticalBox("R");
		ui_interface.declare("fvbargraph9", "2", "");
		ui_interface.declare("fvbargraph9", "unit", "dB");
		ui_interface.addVerticalBargraph("", function handler(obj) { function setval(val) { obj.fvbargraph9 = val; } return setval; }(this), -70, 5);
		ui_interface.closeBox();
		ui_interface.addVerticalSlider("Volume", function handler(obj) { function setval(val) { obj.fvslider0 = val; } return setval; }(this), 0, -70, 4, 0.1);
		ui_interface.closeBox();
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var input1 = inputs[1];
		var input2 = inputs[2];
		var input3 = inputs[3];
		var input4 = inputs[4];
		var input5 = inputs[5];
		var input6 = inputs[6];
		var input7 = inputs[7];
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = (0.001 * Math.pow(10, (0.05 * this.fvslider0)));
		var fSlow1 = (0.00555556 * (this.fentry0 - 90));
		var fSlow2 = Math.sqrt((0 - fSlow1));
		var fSlow3 = (1 - this.fcheckbox0);
		var fSlow4 = (0.001 * Math.pow(10, (0.05 * this.fvslider1)));
		var fSlow5 = (0.00555556 * (this.fentry1 - 90));
		var fSlow6 = Math.sqrt((0 - fSlow5));
		var fSlow7 = (1 - this.fcheckbox1);
		var fSlow8 = (0.001 * Math.pow(10, (0.05 * this.fvslider2)));
		var fSlow9 = (0.00555556 * (this.fentry2 - 90));
		var fSlow10 = Math.sqrt((0 - fSlow9));
		var fSlow11 = (1 - this.fcheckbox2);
		var fSlow12 = (0.001 * Math.pow(10, (0.05 * this.fvslider3)));
		var fSlow13 = (0.00555556 * (this.fentry3 - 90));
		var fSlow14 = Math.sqrt((0 - fSlow13));
		var fSlow15 = (1 - this.fcheckbox3);
		var fSlow16 = (0.001 * Math.pow(10, (0.05 * this.fvslider4)));
		var fSlow17 = (0.00555556 * (this.fentry4 - 90));
		var fSlow18 = Math.sqrt((0 - fSlow17));
		var fSlow19 = (1 - this.fcheckbox4);
		var fSlow20 = (0.001 * Math.pow(10, (0.05 * this.fvslider5)));
		var fSlow21 = (0.00555556 * (this.fentry5 - 90));
		var fSlow22 = Math.sqrt((0 - fSlow21));
		var fSlow23 = (1 - this.fcheckbox5);
		var fSlow24 = (0.001 * Math.pow(10, (0.05 * this.fvslider6)));
		var fSlow25 = (0.00555556 * (this.fentry6 - 90));
		var fSlow26 = Math.sqrt((0 - fSlow25));
		var fSlow27 = (1 - this.fcheckbox6);
		var fSlow28 = (0.001 * Math.pow(10, (0.05 * this.fvslider7)));
		var fSlow29 = (0.00555556 * (this.fentry7 - 90));
		var fSlow30 = Math.sqrt((0 - fSlow29));
		var fSlow31 = (1 - this.fcheckbox7);
		var fSlow32 = (0.001 * Math.pow(10, (0.05 * this.fvslider8)));
		var fSlow33 = Math.sqrt((1 + fSlow1));
		var fSlow34 = Math.sqrt((1 + fSlow5));
		var fSlow35 = Math.sqrt((1 + fSlow9));
		var fSlow36 = Math.sqrt((1 + fSlow13));
		var fSlow37 = Math.sqrt((1 + fSlow17));
		var fSlow38 = Math.sqrt((1 + fSlow21));
		var fSlow39 = Math.sqrt((1 + fSlow25));
		var fSlow40 = Math.sqrt((1 + fSlow29));
		for (var i = 0; (i < count); i = (i + 1)) {
			this.fRec1[0] = ((0.999 * this.fRec1[1]) + fSlow0);
			this.fRec3[0] = ((0.999 * this.fRec3[1]) + fSlow4);
			var fTemp0 = (fSlow3 * (input0[i] * this.fRec3[0]));
			this.fRec2[0] = Math.max((this.fRec2[1] - this.fConst0), Math.abs(fTemp0));
			this.fvbargraph0 = (20 * function log10(a) { return Math.log(a)/Math.log(10); }(Math.max(0.000316228, this.fRec2[0])));
			var fTemp1 = fTemp0;
			this.fRec5[0] = ((0.999 * this.fRec5[1]) + fSlow8);
			var fTemp2 = (fSlow7 * (input1[i] * this.fRec5[0]));
			this.fRec4[0] = Math.max((this.fRec4[1] - this.fConst0), Math.abs(fTemp2));
			this.fvbargraph1 = (20 * function log10(a) { return Math.log(a)/Math.log(10); }(Math.max(0.000316228, this.fRec4[0])));
			var fTemp3 = fTemp2;
			this.fRec7[0] = ((0.999 * this.fRec7[1]) + fSlow12);
			var fTemp4 = (fSlow11 * (input2[i] * this.fRec7[0]));
			this.fRec6[0] = Math.max((this.fRec6[1] - this.fConst0), Math.abs(fTemp4));
			this.fvbargraph2 = (20 * function log10(a) { return Math.log(a)/Math.log(10); }(Math.max(0.000316228, this.fRec6[0])));
			var fTemp5 = fTemp4;
			this.fRec9[0] = ((0.999 * this.fRec9[1]) + fSlow16);
			var fTemp6 = (fSlow15 * (input3[i] * this.fRec9[0]));
			this.fRec8[0] = Math.max((this.fRec8[1] - this.fConst0), Math.abs(fTemp6));
			this.fvbargraph3 = (20 * function log10(a) { return Math.log(a)/Math.log(10); }(Math.max(0.000316228, this.fRec8[0])));
			var fTemp7 = fTemp6;
			this.fRec11[0] = ((0.999 * this.fRec11[1]) + fSlow20);
			var fTemp8 = (fSlow19 * (input4[i] * this.fRec11[0]));
			this.fRec10[0] = Math.max((this.fRec10[1] - this.fConst0), Math.abs(fTemp8));
			this.fvbargraph4 = (20 * function log10(a) { return Math.log(a)/Math.log(10); }(Math.max(0.000316228, this.fRec10[0])));
			var fTemp9 = fTemp8;
			this.fRec13[0] = ((0.999 * this.fRec13[1]) + fSlow24);
			var fTemp10 = (fSlow23 * (input5[i] * this.fRec13[0]));
			this.fRec12[0] = Math.max((this.fRec12[1] - this.fConst0), Math.abs(fTemp10));
			this.fvbargraph5 = (20 * function log10(a) { return Math.log(a)/Math.log(10); }(Math.max(0.000316228, this.fRec12[0])));
			var fTemp11 = fTemp10;
			this.fRec15[0] = ((0.999 * this.fRec15[1]) + fSlow28);
			var fTemp12 = (fSlow27 * (input6[i] * this.fRec15[0]));
			this.fRec14[0] = Math.max((this.fRec14[1] - this.fConst0), Math.abs(fTemp12));
			this.fvbargraph6 = (20 * function log10(a) { return Math.log(a)/Math.log(10); }(Math.max(0.000316228, this.fRec14[0])));
			var fTemp13 = fTemp12;
			this.fRec17[0] = ((0.999 * this.fRec17[1]) + fSlow32);
			var fTemp14 = (fSlow31 * (input7[i] * this.fRec17[0]));
			this.fRec16[0] = Math.max((this.fRec16[1] - this.fConst0), Math.abs(fTemp14));
			this.fvbargraph7 = (20 * function log10(a) { return Math.log(a)/Math.log(10); }(Math.max(0.000316228, this.fRec16[0])));
			var fTemp15 = fTemp14;
			var fTemp16 = (this.fRec1[0] * ((((((((fSlow2 * fTemp1) + (fSlow6 * fTemp3)) + (fSlow10 * fTemp5)) + (fSlow14 * fTemp7)) + (fSlow18 * fTemp9)) + (fSlow22 * fTemp11)) + (fSlow26 * fTemp13)) + (fSlow30 * fTemp15)));
			this.fRec0[0] = Math.max((this.fRec0[1] - this.fConst0), Math.abs(fTemp16));
			this.fvbargraph8 = (20 * function log10(a) { return Math.log(a)/Math.log(10); }(Math.max(0.000316228, this.fRec0[0])));
			output0[i] = fTemp16;
			var fTemp17 = (this.fRec1[0] * ((((((((fSlow33 * fTemp1) + (fSlow34 * fTemp3)) + (fSlow35 * fTemp5)) + (fSlow36 * fTemp7)) + (fSlow37 * fTemp9)) + (fSlow38 * fTemp11)) + (fSlow39 * fTemp13)) + (fSlow40 * fTemp15)));
			this.fRec18[0] = Math.max((this.fRec18[1] - this.fConst0), Math.abs(fTemp17));
			this.fvbargraph9 = (20 * function log10(a) { return Math.log(a)/Math.log(10); }(Math.max(0.000316228, this.fRec18[0])));
			output1[i] = fTemp17;
			this.fRec1[1] = this.fRec1[0];
			this.fRec3[1] = this.fRec3[0];
			this.fRec2[1] = this.fRec2[0];
			this.fRec5[1] = this.fRec5[0];
			this.fRec4[1] = this.fRec4[0];
			this.fRec7[1] = this.fRec7[0];
			this.fRec6[1] = this.fRec6[0];
			this.fRec9[1] = this.fRec9[0];
			this.fRec8[1] = this.fRec8[0];
			this.fRec11[1] = this.fRec11[0];
			this.fRec10[1] = this.fRec10[0];
			this.fRec13[1] = this.fRec13[0];
			this.fRec12[1] = this.fRec12[0];
			this.fRec15[1] = this.fRec15[0];
			this.fRec14[1] = this.fRec14[0];
			this.fRec17[1] = this.fRec17[0];
			this.fRec16[1] = this.fRec16[0];
			this.fRec0[1] = this.fRec0[0];
			this.fRec18[1] = this.fRec18[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_mixer = function(obj) 
{
    function process_aux_mixer(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_mixer;
}

function create_mixer(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new mixer();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_mixer(this);
    
    return this.processor;
}
//Matrix Guts---------------------------------------------------------------------
function matrix() {
	
	this.fvslider0;
	this.fvslider1;
	this.fvslider2;
	this.fvslider3;
	this.fvslider4;
	this.fvslider5;
	this.fvslider6;
	this.fvslider7;
	this.fvslider8;
	this.fvslider9;
	this.fvslider10;
	this.fvslider11;
	this.fvslider12;
	this.fvslider13;
	this.fvslider14;
	this.fvslider15;
	this.fvslider16;
	this.fvslider17;
	this.fvslider18;
	this.fvslider19;
	this.fvslider20;
	this.fvslider21;
	this.fvslider22;
	this.fvslider23;
	this.fvslider24;
	this.fvslider25;
	this.fvslider26;
	this.fvslider27;
	this.fvslider28;
	this.fvslider29;
	this.fvslider30;
	this.fvslider31;
	this.fvslider32;
	this.fvslider33;
	this.fvslider34;
	this.fvslider35;
	this.fvslider36;
	this.fvslider37;
	this.fvslider38;
	this.fvslider39;
	this.fvslider40;
	this.fvslider41;
	this.fvslider42;
	this.fvslider43;
	this.fvslider44;
	this.fvslider45;
	this.fvslider46;
	this.fvslider47;
	this.fvslider48;
	this.fvslider49;
	this.fvslider50;
	this.fvslider51;
	this.fvslider52;
	this.fvslider53;
	this.fvslider54;
	this.fvslider55;
	this.fvslider56;
	this.fvslider57;
	this.fvslider58;
	this.fvslider59;
	this.fvslider60;
	this.fvslider61;
	this.fvslider62;
	this.fvslider63;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2006");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "matrix");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 8;
		
	}
	this.getNumOutputs = function() {
		return 8;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			case 2: {
				rate = 1;
				break;
			}
			case 3: {
				rate = 1;
				break;
			}
			case 4: {
				rate = 1;
				break;
			}
			case 5: {
				rate = 1;
				break;
			}
			case 6: {
				rate = 1;
				break;
			}
			case 7: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			case 2: {
				rate = 1;
				break;
			}
			case 3: {
				rate = 1;
				break;
			}
			case 4: {
				rate = 1;
				break;
			}
			case 5: {
				rate = 1;
				break;
			}
			case 6: {
				rate = 1;
				break;
			}
			case 7: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fvslider0 = -10;
		this.fvslider1 = -10;
		this.fvslider2 = -10;
		this.fvslider3 = -10;
		this.fvslider4 = -10;
		this.fvslider5 = -10;
		this.fvslider6 = -10;
		this.fvslider7 = -10;
		this.fvslider8 = -10;
		this.fvslider9 = -10;
		this.fvslider10 = -10;
		this.fvslider11 = -10;
		this.fvslider12 = -10;
		this.fvslider13 = -10;
		this.fvslider14 = -10;
		this.fvslider15 = -10;
		this.fvslider16 = -10;
		this.fvslider17 = -10;
		this.fvslider18 = -10;
		this.fvslider19 = -10;
		this.fvslider20 = -10;
		this.fvslider21 = -10;
		this.fvslider22 = -10;
		this.fvslider23 = -10;
		this.fvslider24 = -10;
		this.fvslider25 = -10;
		this.fvslider26 = -10;
		this.fvslider27 = -10;
		this.fvslider28 = -10;
		this.fvslider29 = -10;
		this.fvslider30 = -10;
		this.fvslider31 = -10;
		this.fvslider32 = -10;
		this.fvslider33 = -10;
		this.fvslider34 = -10;
		this.fvslider35 = -10;
		this.fvslider36 = -10;
		this.fvslider37 = -10;
		this.fvslider38 = -10;
		this.fvslider39 = -10;
		this.fvslider40 = -10;
		this.fvslider41 = -10;
		this.fvslider42 = -10;
		this.fvslider43 = -10;
		this.fvslider44 = -10;
		this.fvslider45 = -10;
		this.fvslider46 = -10;
		this.fvslider47 = -10;
		this.fvslider48 = -10;
		this.fvslider49 = -10;
		this.fvslider50 = -10;
		this.fvslider51 = -10;
		this.fvslider52 = -10;
		this.fvslider53 = -10;
		this.fvslider54 = -10;
		this.fvslider55 = -10;
		this.fvslider56 = -10;
		this.fvslider57 = -10;
		this.fvslider58 = -10;
		this.fvslider59 = -10;
		this.fvslider60 = -10;
		this.fvslider61 = -10;
		this.fvslider62 = -10;
		this.fvslider63 = -10;
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openTabBox("Matrix 8 x 8");
		ui_interface.openHorizontalBox("Output 0");
		ui_interface.addVerticalSlider("Input 0", function handler(obj) { function setval(val) { obj.fvslider0 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 1", function handler(obj) { function setval(val) { obj.fvslider1 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 2", function handler(obj) { function setval(val) { obj.fvslider2 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 3", function handler(obj) { function setval(val) { obj.fvslider3 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 4", function handler(obj) { function setval(val) { obj.fvslider4 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 5", function handler(obj) { function setval(val) { obj.fvslider5 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 6", function handler(obj) { function setval(val) { obj.fvslider6 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 7", function handler(obj) { function setval(val) { obj.fvslider7 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Output 1");
		ui_interface.addVerticalSlider("Input 0", function handler(obj) { function setval(val) { obj.fvslider8 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 1", function handler(obj) { function setval(val) { obj.fvslider9 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 2", function handler(obj) { function setval(val) { obj.fvslider10 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 3", function handler(obj) { function setval(val) { obj.fvslider11 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 4", function handler(obj) { function setval(val) { obj.fvslider12 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 5", function handler(obj) { function setval(val) { obj.fvslider13 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 6", function handler(obj) { function setval(val) { obj.fvslider14 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 7", function handler(obj) { function setval(val) { obj.fvslider15 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Output 2");
		ui_interface.addVerticalSlider("Input 0", function handler(obj) { function setval(val) { obj.fvslider16 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 1", function handler(obj) { function setval(val) { obj.fvslider17 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 2", function handler(obj) { function setval(val) { obj.fvslider18 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 3", function handler(obj) { function setval(val) { obj.fvslider19 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 4", function handler(obj) { function setval(val) { obj.fvslider20 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 5", function handler(obj) { function setval(val) { obj.fvslider21 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 6", function handler(obj) { function setval(val) { obj.fvslider22 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 7", function handler(obj) { function setval(val) { obj.fvslider23 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Output 3");
		ui_interface.addVerticalSlider("Input 0", function handler(obj) { function setval(val) { obj.fvslider24 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 1", function handler(obj) { function setval(val) { obj.fvslider25 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 2", function handler(obj) { function setval(val) { obj.fvslider26 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 3", function handler(obj) { function setval(val) { obj.fvslider27 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 4", function handler(obj) { function setval(val) { obj.fvslider28 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 5", function handler(obj) { function setval(val) { obj.fvslider29 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 6", function handler(obj) { function setval(val) { obj.fvslider30 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 7", function handler(obj) { function setval(val) { obj.fvslider31 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Output 4");
		ui_interface.addVerticalSlider("Input 0", function handler(obj) { function setval(val) { obj.fvslider32 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 1", function handler(obj) { function setval(val) { obj.fvslider33 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 2", function handler(obj) { function setval(val) { obj.fvslider34 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 3", function handler(obj) { function setval(val) { obj.fvslider35 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 4", function handler(obj) { function setval(val) { obj.fvslider36 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 5", function handler(obj) { function setval(val) { obj.fvslider37 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 6", function handler(obj) { function setval(val) { obj.fvslider38 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 7", function handler(obj) { function setval(val) { obj.fvslider39 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Output 5");
		ui_interface.addVerticalSlider("Input 0", function handler(obj) { function setval(val) { obj.fvslider40 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 1", function handler(obj) { function setval(val) { obj.fvslider41 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 2", function handler(obj) { function setval(val) { obj.fvslider42 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 3", function handler(obj) { function setval(val) { obj.fvslider43 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 4", function handler(obj) { function setval(val) { obj.fvslider44 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 5", function handler(obj) { function setval(val) { obj.fvslider45 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 6", function handler(obj) { function setval(val) { obj.fvslider46 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 7", function handler(obj) { function setval(val) { obj.fvslider47 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Output 6");
		ui_interface.addVerticalSlider("Input 0", function handler(obj) { function setval(val) { obj.fvslider48 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 1", function handler(obj) { function setval(val) { obj.fvslider49 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 2", function handler(obj) { function setval(val) { obj.fvslider50 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 3", function handler(obj) { function setval(val) { obj.fvslider51 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 4", function handler(obj) { function setval(val) { obj.fvslider52 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 5", function handler(obj) { function setval(val) { obj.fvslider53 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 6", function handler(obj) { function setval(val) { obj.fvslider54 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 7", function handler(obj) { function setval(val) { obj.fvslider55 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Output 7");
		ui_interface.addVerticalSlider("Input 0", function handler(obj) { function setval(val) { obj.fvslider56 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 1", function handler(obj) { function setval(val) { obj.fvslider57 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 2", function handler(obj) { function setval(val) { obj.fvslider58 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 3", function handler(obj) { function setval(val) { obj.fvslider59 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 4", function handler(obj) { function setval(val) { obj.fvslider60 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 5", function handler(obj) { function setval(val) { obj.fvslider61 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 6", function handler(obj) { function setval(val) { obj.fvslider62 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.addVerticalSlider("Input 7", function handler(obj) { function setval(val) { obj.fvslider63 = val; } return setval; }(this), -10, -96, 4, 0.1);
		ui_interface.closeBox();
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var input1 = inputs[1];
		var input2 = inputs[2];
		var input3 = inputs[3];
		var input4 = inputs[4];
		var input5 = inputs[5];
		var input6 = inputs[6];
		var input7 = inputs[7];
		var output0 = outputs[0];
		var output1 = outputs[1];
		var output2 = outputs[2];
		var output3 = outputs[3];
		var output4 = outputs[4];
		var output5 = outputs[5];
		var output6 = outputs[6];
		var output7 = outputs[7];
		var fSlow0 = Math.pow(10, (0.05 * this.fvslider0));
		var fSlow1 = Math.pow(10, (0.05 * this.fvslider1));
		var fSlow2 = Math.pow(10, (0.05 * this.fvslider2));
		var fSlow3 = Math.pow(10, (0.05 * this.fvslider3));
		var fSlow4 = Math.pow(10, (0.05 * this.fvslider4));
		var fSlow5 = Math.pow(10, (0.05 * this.fvslider5));
		var fSlow6 = Math.pow(10, (0.05 * this.fvslider6));
		var fSlow7 = Math.pow(10, (0.05 * this.fvslider7));
		var fSlow8 = Math.pow(10, (0.05 * this.fvslider8));
		var fSlow9 = Math.pow(10, (0.05 * this.fvslider9));
		var fSlow10 = Math.pow(10, (0.05 * this.fvslider10));
		var fSlow11 = Math.pow(10, (0.05 * this.fvslider11));
		var fSlow12 = Math.pow(10, (0.05 * this.fvslider12));
		var fSlow13 = Math.pow(10, (0.05 * this.fvslider13));
		var fSlow14 = Math.pow(10, (0.05 * this.fvslider14));
		var fSlow15 = Math.pow(10, (0.05 * this.fvslider15));
		var fSlow16 = Math.pow(10, (0.05 * this.fvslider16));
		var fSlow17 = Math.pow(10, (0.05 * this.fvslider17));
		var fSlow18 = Math.pow(10, (0.05 * this.fvslider18));
		var fSlow19 = Math.pow(10, (0.05 * this.fvslider19));
		var fSlow20 = Math.pow(10, (0.05 * this.fvslider20));
		var fSlow21 = Math.pow(10, (0.05 * this.fvslider21));
		var fSlow22 = Math.pow(10, (0.05 * this.fvslider22));
		var fSlow23 = Math.pow(10, (0.05 * this.fvslider23));
		var fSlow24 = Math.pow(10, (0.05 * this.fvslider24));
		var fSlow25 = Math.pow(10, (0.05 * this.fvslider25));
		var fSlow26 = Math.pow(10, (0.05 * this.fvslider26));
		var fSlow27 = Math.pow(10, (0.05 * this.fvslider27));
		var fSlow28 = Math.pow(10, (0.05 * this.fvslider28));
		var fSlow29 = Math.pow(10, (0.05 * this.fvslider29));
		var fSlow30 = Math.pow(10, (0.05 * this.fvslider30));
		var fSlow31 = Math.pow(10, (0.05 * this.fvslider31));
		var fSlow32 = Math.pow(10, (0.05 * this.fvslider32));
		var fSlow33 = Math.pow(10, (0.05 * this.fvslider33));
		var fSlow34 = Math.pow(10, (0.05 * this.fvslider34));
		var fSlow35 = Math.pow(10, (0.05 * this.fvslider35));
		var fSlow36 = Math.pow(10, (0.05 * this.fvslider36));
		var fSlow37 = Math.pow(10, (0.05 * this.fvslider37));
		var fSlow38 = Math.pow(10, (0.05 * this.fvslider38));
		var fSlow39 = Math.pow(10, (0.05 * this.fvslider39));
		var fSlow40 = Math.pow(10, (0.05 * this.fvslider40));
		var fSlow41 = Math.pow(10, (0.05 * this.fvslider41));
		var fSlow42 = Math.pow(10, (0.05 * this.fvslider42));
		var fSlow43 = Math.pow(10, (0.05 * this.fvslider43));
		var fSlow44 = Math.pow(10, (0.05 * this.fvslider44));
		var fSlow45 = Math.pow(10, (0.05 * this.fvslider45));
		var fSlow46 = Math.pow(10, (0.05 * this.fvslider46));
		var fSlow47 = Math.pow(10, (0.05 * this.fvslider47));
		var fSlow48 = Math.pow(10, (0.05 * this.fvslider48));
		var fSlow49 = Math.pow(10, (0.05 * this.fvslider49));
		var fSlow50 = Math.pow(10, (0.05 * this.fvslider50));
		var fSlow51 = Math.pow(10, (0.05 * this.fvslider51));
		var fSlow52 = Math.pow(10, (0.05 * this.fvslider52));
		var fSlow53 = Math.pow(10, (0.05 * this.fvslider53));
		var fSlow54 = Math.pow(10, (0.05 * this.fvslider54));
		var fSlow55 = Math.pow(10, (0.05 * this.fvslider55));
		var fSlow56 = Math.pow(10, (0.05 * this.fvslider56));
		var fSlow57 = Math.pow(10, (0.05 * this.fvslider57));
		var fSlow58 = Math.pow(10, (0.05 * this.fvslider58));
		var fSlow59 = Math.pow(10, (0.05 * this.fvslider59));
		var fSlow60 = Math.pow(10, (0.05 * this.fvslider60));
		var fSlow61 = Math.pow(10, (0.05 * this.fvslider61));
		var fSlow62 = Math.pow(10, (0.05 * this.fvslider62));
		var fSlow63 = Math.pow(10, (0.05 * this.fvslider63));
		for (var i = 0; (i < count); i = (i + 1)) {
			var fTemp0 = input0[i];
			var fTemp1 = input1[i];
			var fTemp2 = input2[i];
			var fTemp3 = input3[i];
			var fTemp4 = input4[i];
			var fTemp5 = input5[i];
			var fTemp6 = input6[i];
			var fTemp7 = input7[i];
			output0[i] = ((((((((fSlow0 * fTemp0) + (fSlow1 * fTemp1)) + (fSlow2 * fTemp2)) + (fSlow3 * fTemp3)) + (fSlow4 * fTemp4)) + (fSlow5 * fTemp5)) + (fSlow6 * fTemp6)) + (fSlow7 * fTemp7));
			output1[i] = ((((((((fSlow8 * fTemp0) + (fSlow9 * fTemp1)) + (fSlow10 * fTemp2)) + (fSlow11 * fTemp3)) + (fSlow12 * fTemp4)) + (fSlow13 * fTemp5)) + (fSlow14 * fTemp6)) + (fSlow15 * fTemp7));
			output2[i] = ((((((((fSlow16 * fTemp0) + (fSlow17 * fTemp1)) + (fSlow18 * fTemp2)) + (fSlow19 * fTemp3)) + (fSlow20 * fTemp4)) + (fSlow21 * fTemp5)) + (fSlow22 * fTemp6)) + (fSlow23 * fTemp7));
			output3[i] = ((((((((fSlow24 * fTemp0) + (fSlow25 * fTemp1)) + (fSlow26 * fTemp2)) + (fSlow27 * fTemp3)) + (fSlow28 * fTemp4)) + (fSlow29 * fTemp5)) + (fSlow30 * fTemp6)) + (fSlow31 * fTemp7));
			output4[i] = ((((((((fSlow32 * fTemp0) + (fSlow33 * fTemp1)) + (fSlow34 * fTemp2)) + (fSlow35 * fTemp3)) + (fSlow36 * fTemp4)) + (fSlow37 * fTemp5)) + (fSlow38 * fTemp6)) + (fSlow39 * fTemp7));
			output5[i] = ((((((((fSlow40 * fTemp0) + (fSlow41 * fTemp1)) + (fSlow42 * fTemp2)) + (fSlow43 * fTemp3)) + (fSlow44 * fTemp4)) + (fSlow45 * fTemp5)) + (fSlow46 * fTemp6)) + (fSlow47 * fTemp7));
			output6[i] = ((((((((fSlow48 * fTemp0) + (fSlow49 * fTemp1)) + (fSlow50 * fTemp2)) + (fSlow51 * fTemp3)) + (fSlow52 * fTemp4)) + (fSlow53 * fTemp5)) + (fSlow54 * fTemp6)) + (fSlow55 * fTemp7));
			output7[i] = ((((((((fSlow56 * fTemp0) + (fSlow57 * fTemp1)) + (fSlow58 * fTemp2)) + (fSlow59 * fTemp3)) + (fSlow60 * fTemp4)) + (fSlow61 * fTemp5)) + (fSlow62 * fTemp6)) + (fSlow63 * fTemp7));
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_matrix = function(obj) 
{
    function process_aux_matrix(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_matrix;
}

function create_matrix(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new matrix();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_matrix(this);
    
    return this.processor;
}
//Deltap guts---------------------------------------------------------------------
function tapiir() {
	
	this.fRec5 = new Float32Array(2);
	this.fVec5 = new Float32Array(524288);
	this.fRec4 = new Float32Array(2);
	this.fVec4 = new Float32Array(524288);
	this.fRec3 = new Float32Array(2);
	this.fVec3 = new Float32Array(524288);
	this.fRec2 = new Float32Array(2);
	this.fVec2 = new Float32Array(524288);
	this.fRec1 = new Float32Array(2);
	this.fVec1 = new Float32Array(524288);
	this.fRec0 = new Float32Array(2);
	this.fVec0 = new Float32Array(524288);
	this.fvslider0;
	this.fvslider1;
	this.fvslider2;
	this.fvslider3;
	this.fvslider4;
	this.fvslider5;
	this.fvslider6;
	this.fvslider7;
	this.fvslider8;
	this.fvslider9;
	this.fvslider10;
	this.IOTA;
	this.fSamplingFreq;
	this.iConst0;
	this.fvslider11;
	this.fvslider12;
	this.fvslider13;
	this.fvslider14;
	this.fvslider15;
	this.fvslider16;
	this.fvslider17;
	this.fvslider18;
	this.fvslider19;
	this.fvslider20;
	this.fvslider21;
	this.fvslider22;
	this.fvslider23;
	this.fvslider24;
	this.fvslider25;
	this.fvslider26;
	this.fvslider27;
	this.fvslider28;
	this.fvslider29;
	this.fvslider30;
	this.fvslider31;
	this.fvslider32;
	this.fvslider33;
	this.fvslider34;
	this.fvslider35;
	this.fvslider36;
	this.fvslider37;
	this.fvslider38;
	this.fvslider39;
	this.fvslider40;
	this.fvslider41;
	this.fvslider42;
	this.fvslider43;
	this.fvslider44;
	this.fvslider45;
	this.fvslider46;
	this.fvslider47;
	this.fvslider48;
	this.fvslider49;
	this.fvslider50;
	this.fvslider51;
	this.fvslider52;
	this.fvslider53;
	this.fvslider54;
	this.fvslider55;
	this.fvslider56;
	this.fvslider57;
	this.fvslider58;
	this.fvslider59;
	this.fvslider60;
	this.fvslider61;
	this.fvslider62;
	this.fvslider63;
	this.fvslider64;
	this.fvslider65;
	this.fvslider66;
	this.fvslider67;
	this.fvslider68;
	this.fvslider69;
	this.fvslider70;
	this.fvslider71;
	this.fvslider72;
	this.fvslider73;
	this.fvslider74;
	this.fvslider75;
	this.fvslider76;
	this.fvslider77;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2006");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "tapiir");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 2;
		
	}
	this.getNumOutputs = function() {
		return 2;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			case 1: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fvslider0 = 1;
		this.fvslider1 = 0;
		this.fvslider2 = 1;
		this.fvslider3 = 0;
		this.fvslider4 = 0;
		this.fvslider5 = 0;
		this.fvslider6 = 0;
		this.fvslider7 = 0;
		this.fvslider8 = 0;
		this.fvslider9 = 1;
		this.fvslider10 = 1;
		this.IOTA = 0;
		for (var i = 0; (i < 524288); i = (i + 1)) {
			this.fVec0[i] = 0;
			
		}
		this.iConst0 = Math.min(192000, Math.max(1, this.fSamplingFreq));
		this.fvslider11 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		this.fvslider12 = 1;
		this.fvslider13 = 0;
		this.fvslider14 = 0;
		this.fvslider15 = 0;
		this.fvslider16 = 0;
		this.fvslider17 = 0;
		this.fvslider18 = 0;
		this.fvslider19 = 1;
		this.fvslider20 = 1;
		for (var i = 0; (i < 524288); i = (i + 1)) {
			this.fVec1[i] = 0;
			
		}
		this.fvslider21 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec1[i] = 0;
			
		}
		this.fvslider22 = 1;
		this.fvslider23 = 0;
		this.fvslider24 = 0;
		this.fvslider25 = 0;
		this.fvslider26 = 0;
		this.fvslider27 = 0;
		this.fvslider28 = 0;
		this.fvslider29 = 1;
		this.fvslider30 = 1;
		for (var i = 0; (i < 524288); i = (i + 1)) {
			this.fVec2[i] = 0;
			
		}
		this.fvslider31 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		this.fvslider32 = 1;
		this.fvslider33 = 0;
		this.fvslider34 = 0;
		this.fvslider35 = 0;
		this.fvslider36 = 0;
		this.fvslider37 = 0;
		this.fvslider38 = 0;
		this.fvslider39 = 1;
		this.fvslider40 = 1;
		for (var i = 0; (i < 524288); i = (i + 1)) {
			this.fVec3[i] = 0;
			
		}
		this.fvslider41 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec3[i] = 0;
			
		}
		this.fvslider42 = 1;
		this.fvslider43 = 0;
		this.fvslider44 = 0;
		this.fvslider45 = 0;
		this.fvslider46 = 0;
		this.fvslider47 = 0;
		this.fvslider48 = 0;
		this.fvslider49 = 1;
		this.fvslider50 = 1;
		for (var i = 0; (i < 524288); i = (i + 1)) {
			this.fVec4[i] = 0;
			
		}
		this.fvslider51 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec4[i] = 0;
			
		}
		this.fvslider52 = 1;
		this.fvslider53 = 0;
		this.fvslider54 = 0;
		this.fvslider55 = 0;
		this.fvslider56 = 0;
		this.fvslider57 = 0;
		this.fvslider58 = 0;
		this.fvslider59 = 1;
		this.fvslider60 = 1;
		for (var i = 0; (i < 524288); i = (i + 1)) {
			this.fVec5[i] = 0;
			
		}
		this.fvslider61 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec5[i] = 0;
			
		}
		this.fvslider62 = 0;
		this.fvslider63 = 0;
		this.fvslider64 = 0;
		this.fvslider65 = 0;
		this.fvslider66 = 0;
		this.fvslider67 = 1;
		this.fvslider68 = 1;
		this.fvslider69 = 1;
		this.fvslider70 = 0;
		this.fvslider71 = 0;
		this.fvslider72 = 0;
		this.fvslider73 = 0;
		this.fvslider74 = 0;
		this.fvslider75 = 0;
		this.fvslider76 = 1;
		this.fvslider77 = 1;
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("Tapiir");
		ui_interface.openTabBox("");
		ui_interface.openHorizontalBox("Tap 0");
		ui_interface.addVerticalSlider("delay (sec)", function handler(obj) { function setval(val) { obj.fvslider11 = val; } return setval; }(this), 0, 0, 5, 0.01);
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider2 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 0", function handler(obj) { function setval(val) { obj.fvslider9 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 1", function handler(obj) { function setval(val) { obj.fvslider10 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 0", function handler(obj) { function setval(val) { obj.fvslider3 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 1", function handler(obj) { function setval(val) { obj.fvslider4 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 2", function handler(obj) { function setval(val) { obj.fvslider5 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 3", function handler(obj) { function setval(val) { obj.fvslider6 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 4", function handler(obj) { function setval(val) { obj.fvslider7 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 5", function handler(obj) { function setval(val) { obj.fvslider8 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Tap 1");
		ui_interface.addVerticalSlider("delay (sec)", function handler(obj) { function setval(val) { obj.fvslider21 = val; } return setval; }(this), 0, 0, 5, 0.01);
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider12 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 0", function handler(obj) { function setval(val) { obj.fvslider19 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 1", function handler(obj) { function setval(val) { obj.fvslider20 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 0", function handler(obj) { function setval(val) { obj.fvslider13 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 1", function handler(obj) { function setval(val) { obj.fvslider14 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 2", function handler(obj) { function setval(val) { obj.fvslider15 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 3", function handler(obj) { function setval(val) { obj.fvslider16 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 4", function handler(obj) { function setval(val) { obj.fvslider17 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 5", function handler(obj) { function setval(val) { obj.fvslider18 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Tap 2");
		ui_interface.addVerticalSlider("delay (sec)", function handler(obj) { function setval(val) { obj.fvslider31 = val; } return setval; }(this), 0, 0, 5, 0.01);
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider22 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 0", function handler(obj) { function setval(val) { obj.fvslider29 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 1", function handler(obj) { function setval(val) { obj.fvslider30 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 0", function handler(obj) { function setval(val) { obj.fvslider23 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 1", function handler(obj) { function setval(val) { obj.fvslider24 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 2", function handler(obj) { function setval(val) { obj.fvslider25 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 3", function handler(obj) { function setval(val) { obj.fvslider26 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 4", function handler(obj) { function setval(val) { obj.fvslider27 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 5", function handler(obj) { function setval(val) { obj.fvslider28 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Tap 3");
		ui_interface.addVerticalSlider("delay (sec)", function handler(obj) { function setval(val) { obj.fvslider41 = val; } return setval; }(this), 0, 0, 5, 0.01);
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider32 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 0", function handler(obj) { function setval(val) { obj.fvslider39 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 1", function handler(obj) { function setval(val) { obj.fvslider40 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 0", function handler(obj) { function setval(val) { obj.fvslider33 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 1", function handler(obj) { function setval(val) { obj.fvslider34 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 2", function handler(obj) { function setval(val) { obj.fvslider35 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 3", function handler(obj) { function setval(val) { obj.fvslider36 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 4", function handler(obj) { function setval(val) { obj.fvslider37 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 5", function handler(obj) { function setval(val) { obj.fvslider38 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Tap 4");
		ui_interface.addVerticalSlider("delay (sec)", function handler(obj) { function setval(val) { obj.fvslider51 = val; } return setval; }(this), 0, 0, 5, 0.01);
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider42 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 0", function handler(obj) { function setval(val) { obj.fvslider49 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 1", function handler(obj) { function setval(val) { obj.fvslider50 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 0", function handler(obj) { function setval(val) { obj.fvslider43 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 1", function handler(obj) { function setval(val) { obj.fvslider44 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 2", function handler(obj) { function setval(val) { obj.fvslider45 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 3", function handler(obj) { function setval(val) { obj.fvslider46 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 4", function handler(obj) { function setval(val) { obj.fvslider47 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 5", function handler(obj) { function setval(val) { obj.fvslider48 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("Tap 5");
		ui_interface.addVerticalSlider("delay (sec)", function handler(obj) { function setval(val) { obj.fvslider61 = val; } return setval; }(this), 0, 0, 5, 0.01);
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider52 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 0", function handler(obj) { function setval(val) { obj.fvslider59 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 1", function handler(obj) { function setval(val) { obj.fvslider60 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 0", function handler(obj) { function setval(val) { obj.fvslider53 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 1", function handler(obj) { function setval(val) { obj.fvslider54 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 2", function handler(obj) { function setval(val) { obj.fvslider55 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 3", function handler(obj) { function setval(val) { obj.fvslider56 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 4", function handler(obj) { function setval(val) { obj.fvslider57 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 5", function handler(obj) { function setval(val) { obj.fvslider58 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.closeBox();
		ui_interface.closeBox();
		ui_interface.openVerticalBox("outputs");
		ui_interface.openHorizontalBox("output 0");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider0 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 0", function handler(obj) { function setval(val) { obj.fvslider67 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 1", function handler(obj) { function setval(val) { obj.fvslider68 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 0", function handler(obj) { function setval(val) { obj.fvslider1 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 1", function handler(obj) { function setval(val) { obj.fvslider62 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 2", function handler(obj) { function setval(val) { obj.fvslider63 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 3", function handler(obj) { function setval(val) { obj.fvslider64 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 4", function handler(obj) { function setval(val) { obj.fvslider65 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 5", function handler(obj) { function setval(val) { obj.fvslider66 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.closeBox();
		ui_interface.openHorizontalBox("output 1");
		ui_interface.addVerticalSlider("gain", function handler(obj) { function setval(val) { obj.fvslider69 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 0", function handler(obj) { function setval(val) { obj.fvslider76 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("input 1", function handler(obj) { function setval(val) { obj.fvslider77 = val; } return setval; }(this), 1, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 0", function handler(obj) { function setval(val) { obj.fvslider70 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 1", function handler(obj) { function setval(val) { obj.fvslider71 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 2", function handler(obj) { function setval(val) { obj.fvslider72 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 3", function handler(obj) { function setval(val) { obj.fvslider73 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 4", function handler(obj) { function setval(val) { obj.fvslider74 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.addVerticalSlider("tap 5", function handler(obj) { function setval(val) { obj.fvslider75 = val; } return setval; }(this), 0, 0, 1, 0.1);
		ui_interface.closeBox();
		ui_interface.closeBox();
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var input1 = inputs[1];
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = this.fvslider0;
		var fSlow1 = this.fvslider1;
		var fSlow2 = this.fvslider2;
		var fSlow3 = this.fvslider3;
		var fSlow4 = this.fvslider4;
		var fSlow5 = this.fvslider5;
		var fSlow6 = this.fvslider6;
		var fSlow7 = this.fvslider7;
		var fSlow8 = this.fvslider8;
		var fSlow9 = this.fvslider9;
		var fSlow10 = this.fvslider10;
		var iSlow11 = ((this.iConst0 * this.fvslider11) & 524287);
		var fSlow12 = this.fvslider12;
		var fSlow13 = this.fvslider13;
		var fSlow14 = this.fvslider14;
		var fSlow15 = this.fvslider15;
		var fSlow16 = this.fvslider16;
		var fSlow17 = this.fvslider17;
		var fSlow18 = this.fvslider18;
		var fSlow19 = this.fvslider19;
		var fSlow20 = this.fvslider20;
		var iSlow21 = ((this.iConst0 * this.fvslider21) & 524287);
		var fSlow22 = this.fvslider22;
		var fSlow23 = this.fvslider23;
		var fSlow24 = this.fvslider24;
		var fSlow25 = this.fvslider25;
		var fSlow26 = this.fvslider26;
		var fSlow27 = this.fvslider27;
		var fSlow28 = this.fvslider28;
		var fSlow29 = this.fvslider29;
		var fSlow30 = this.fvslider30;
		var iSlow31 = ((this.iConst0 * this.fvslider31) & 524287);
		var fSlow32 = this.fvslider32;
		var fSlow33 = this.fvslider33;
		var fSlow34 = this.fvslider34;
		var fSlow35 = this.fvslider35;
		var fSlow36 = this.fvslider36;
		var fSlow37 = this.fvslider37;
		var fSlow38 = this.fvslider38;
		var fSlow39 = this.fvslider39;
		var fSlow40 = this.fvslider40;
		var iSlow41 = ((this.iConst0 * this.fvslider41) & 524287);
		var fSlow42 = this.fvslider42;
		var fSlow43 = this.fvslider43;
		var fSlow44 = this.fvslider44;
		var fSlow45 = this.fvslider45;
		var fSlow46 = this.fvslider46;
		var fSlow47 = this.fvslider47;
		var fSlow48 = this.fvslider48;
		var fSlow49 = this.fvslider49;
		var fSlow50 = this.fvslider50;
		var iSlow51 = ((this.iConst0 * this.fvslider51) & 524287);
		var fSlow52 = this.fvslider52;
		var fSlow53 = this.fvslider53;
		var fSlow54 = this.fvslider54;
		var fSlow55 = this.fvslider55;
		var fSlow56 = this.fvslider56;
		var fSlow57 = this.fvslider57;
		var fSlow58 = this.fvslider58;
		var fSlow59 = this.fvslider59;
		var fSlow60 = this.fvslider60;
		var iSlow61 = ((this.iConst0 * this.fvslider61) & 524287);
		var fSlow62 = this.fvslider62;
		var fSlow63 = this.fvslider63;
		var fSlow64 = this.fvslider64;
		var fSlow65 = this.fvslider65;
		var fSlow66 = this.fvslider66;
		var fSlow67 = this.fvslider67;
		var fSlow68 = this.fvslider68;
		var fSlow69 = this.fvslider69;
		var fSlow70 = this.fvslider70;
		var fSlow71 = this.fvslider71;
		var fSlow72 = this.fvslider72;
		var fSlow73 = this.fvslider73;
		var fSlow74 = this.fvslider74;
		var fSlow75 = this.fvslider75;
		var fSlow76 = this.fvslider76;
		var fSlow77 = this.fvslider77;
		for (var i = 0; (i < count); i = (i + 1)) {
			var fTemp0 = input0[i];
			var fTemp1 = input1[i];
			this.fVec0[(this.IOTA & 524287)] = (fSlow2 * ((((((((fSlow3 * this.fRec0[1]) + (fSlow4 * this.fRec1[1])) + (fSlow5 * this.fRec2[1])) + (fSlow6 * this.fRec3[1])) + (fSlow7 * this.fRec4[1])) + (fSlow8 * this.fRec5[1])) + (fSlow9 * fTemp0)) + (fSlow10 * fTemp1)));
			this.fRec0[0] = this.fVec0[((this.IOTA - iSlow11) & 524287)];
			this.fVec1[(this.IOTA & 524287)] = (fSlow12 * ((((((((fSlow13 * this.fRec0[1]) + (fSlow14 * this.fRec1[1])) + (fSlow15 * this.fRec2[1])) + (fSlow16 * this.fRec3[1])) + (fSlow17 * this.fRec4[1])) + (fSlow18 * this.fRec5[1])) + (fSlow19 * fTemp0)) + (fSlow20 * fTemp1)));
			this.fRec1[0] = this.fVec1[((this.IOTA - iSlow21) & 524287)];
			this.fVec2[(this.IOTA & 524287)] = (fSlow22 * ((((((((fSlow23 * this.fRec0[1]) + (fSlow24 * this.fRec1[1])) + (fSlow25 * this.fRec2[1])) + (fSlow26 * this.fRec3[1])) + (fSlow27 * this.fRec4[1])) + (fSlow28 * this.fRec5[1])) + (fSlow29 * fTemp0)) + (fSlow30 * fTemp1)));
			this.fRec2[0] = this.fVec2[((this.IOTA - iSlow31) & 524287)];
			this.fVec3[(this.IOTA & 524287)] = (fSlow32 * ((((((((fSlow33 * this.fRec0[1]) + (fSlow34 * this.fRec1[1])) + (fSlow35 * this.fRec2[1])) + (fSlow36 * this.fRec3[1])) + (fSlow37 * this.fRec4[1])) + (fSlow38 * this.fRec5[1])) + (fSlow39 * fTemp0)) + (fSlow40 * fTemp1)));
			this.fRec3[0] = this.fVec3[((this.IOTA - iSlow41) & 524287)];
			this.fVec4[(this.IOTA & 524287)] = (fSlow42 * ((((((((fSlow43 * this.fRec0[1]) + (fSlow44 * this.fRec1[1])) + (fSlow45 * this.fRec2[1])) + (fSlow46 * this.fRec3[1])) + (fSlow47 * this.fRec4[1])) + (fSlow48 * this.fRec5[1])) + (fSlow49 * fTemp0)) + (fSlow50 * fTemp1)));
			this.fRec4[0] = this.fVec4[((this.IOTA - iSlow51) & 524287)];
			this.fVec5[(this.IOTA & 524287)] = (fSlow52 * ((((((((fSlow53 * this.fRec0[1]) + (fSlow54 * this.fRec1[1])) + (fSlow55 * this.fRec2[1])) + (fSlow56 * this.fRec3[1])) + (fSlow57 * this.fRec4[1])) + (fSlow58 * this.fRec5[1])) + (fSlow59 * fTemp0)) + (fSlow60 * fTemp1)));
			this.fRec5[0] = this.fVec5[((this.IOTA - iSlow61) & 524287)];
			output0[i] = (fSlow0 * ((((((((fSlow1 * this.fRec0[0]) + (fSlow62 * this.fRec1[0])) + (fSlow63 * this.fRec2[0])) + (fSlow64 * this.fRec3[0])) + (fSlow65 * this.fRec4[0])) + (fSlow66 * this.fRec5[0])) + (fSlow67 * fTemp0)) + (fSlow68 * fTemp1)));
			output1[i] = (fSlow69 * ((((((((fSlow70 * this.fRec0[0]) + (fSlow71 * this.fRec1[0])) + (fSlow72 * this.fRec2[0])) + (fSlow73 * this.fRec3[0])) + (fSlow74 * this.fRec4[0])) + (fSlow75 * this.fRec5[0])) + (fSlow76 * fTemp0)) + (fSlow77 * fTemp1)));
			this.IOTA = (this.IOTA + 1);
			this.fRec0[1] = this.fRec0[0];
			this.fRec1[1] = this.fRec1[0];
			this.fRec2[1] = this.fRec2[0];
			this.fRec3[1] = this.fRec3[0];
			this.fRec4[1] = this.fRec4[0];
			this.fRec5[1] = this.fRec5[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_tapiir = function(obj) 
{
    function process_aux_tapiir(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_tapiir;
}

function create_tapiir(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new tapiir();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_tapiir(this);
    
    return this.processor;
}
//Capture Guts---------------------------------------------------------------------
function capture() {
	
	this.fRec2 = new Float32Array(2);
	this.fRec0 = new Float32Array(2);
	this.iRec1 = new Int32Array(2);
	this.iVec1 = new Int32Array(2);
	this.fVec0 = new Float32Array(524288);
	this.fbutton0;
	this.IOTA;
	this.fhslider0;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
		m.declare("author", "Grame");
		m.declare("copyright", "(c)GRAME 2006");
		m.declare("license", "BSD");
		m.declare("math.lib/author", "GRAME");
		m.declare("math.lib/copyright", "GRAME");
		m.declare("math.lib/license", "LGPL with exception");
		m.declare("math.lib/name", "Math Library");
		m.declare("math.lib/version", "1.0");
		m.declare("music.lib/author", "GRAME");
		m.declare("music.lib/copyright", "GRAME");
		m.declare("music.lib/license", "LGPL with exception");
		m.declare("music.lib/name", "Music Library");
		m.declare("music.lib/version", "1.0");
		m.declare("name", "capture");
		m.declare("version", "1.0");
	}

	this.getNumInputs = function() {
		return 1;
		
	}
	this.getNumOutputs = function() {
		return 1;
		
	}
	this.getInputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	this.getOutputRate = function(channel) {
		var rate;
		switch (channel) {
			case 0: {
				rate = 1;
				break;
			}
			default: {
				rate = -1;
				break;
			}
			
		}
		return rate;
		
	}
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fbutton0 = 0;
		this.IOTA = 0;
		for (var i = 0; (i < 524288); i = (i + 1)) {
			this.fVec0[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iVec1[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec1[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec0[i] = 0;
			
		}
		this.fhslider0 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("Audio Capture");
		ui_interface.addButton("Capture", function handler(obj) { function setval(val) { obj.fbutton0 = val; } return setval; }(this));
		ui_interface.addHorizontalSlider("level (db)", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 0, -96, 4, 0.1);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var input0 = inputs[0];
		var output0 = outputs[0];
		var fSlow0 = this.fbutton0;
		var fSlow1 = (1 - fSlow0);
		var iSlow2 = fSlow0;
		var fSlow3 = (0.001 * Math.pow(10, (0.05 * this.fhslider0)));
		for (var i = 0; (i < count); i = (i + 1)) {
			this.fVec0[(this.IOTA & 524287)] = ((fSlow1 * this.fRec0[1]) + (fSlow0 * input0[i]));
			this.iVec1[0] = iSlow2;
			this.iRec1[0] = ((iSlow2 + this.iRec1[1]) * ((iSlow2 - this.iVec1[1]) <= 0));
			this.fRec0[0] = this.fVec0[((this.IOTA - ((this.iRec1[0] - 1) & 524287)) & 524287)];
			this.fRec2[0] = ((0.999 * this.fRec2[1]) + fSlow3);
			output0[i] = (this.fRec0[0] * this.fRec2[0]);
			this.IOTA = (this.IOTA + 1);
			this.iVec1[1] = this.iVec1[0];
			this.iRec1[1] = this.iRec1[0];
			this.fRec0[1] = this.fRec0[0];
			this.fRec2[1] = this.fRec2[0];
			
		}
		
	}
	
}


<!-- WebAudio API -->

process_capture = function(obj) 
{
    function process_aux_capture(event) 
    {
        var count;
        
        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */
        
        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }
         
        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }
        
        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }
        
        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_capture;
}

function create_capture(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new capture();
    
    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);
    
    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());
    
    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());
    
    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_capture(this);
    
    return this.processor;
}
