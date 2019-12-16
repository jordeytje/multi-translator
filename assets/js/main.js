const bodyElem = document.querySelector('body');

const jsonOutputElem = document.getElementById('json-output');
const jsonObjectName = document.getElementById('object-name');

const jsonObjectInput = document.getElementById('text-input');
const jsonObjectInputElem = document.getElementById('text-input-elem');

const googleTranslater = document.querySelector('#google_translate_element');

const langContainerElem = document.querySelector('.lang-container');

const step1Elem = document.getElementById('step1');
const step2Elem = document.getElementById('step2');
const step3Elem = document.getElementById('step3');

const resetBtn = document.getElementById('reset');

var btnCounter = -1;

jsonOutputElem.placeholder = `"${jsonObjectName.value}" : {\n    "": ""\n}\n`;

// set object name
function setObjectName() {
	const value = `${jsonObjectName.value}`;
	const name = value.replace(/ /g, '_');
	const btn = document.getElementById('completeStep1');
	console.log(value);

	value == '' ? btn.classList.remove('activated') : btn.classList.add('activated');
	jsonOutputElem.value = `"${name}": {\n`;
}

// complete step
function completeStep1() {
	step1Elem.classList.add('readonly');
	step2Elem.classList.remove('readonly');
	step3Elem.classList.remove('readonly');
}

// prepare textarea text to be translatable
function prepareInputText() {
	const langAllBtn = document.getElementById('langAll');

	if (jsonObjectInput.value !== '') {
		langAllBtn.classList.add('activated');
	} else {
		langAllBtn.classList.remove('activated');
	}

	jsonObjectInputElem.innerText = `${jsonObjectInput.value}`;
}

// translate input
function translateInput(lang, btnId) {
	if (btnId == 'langAll') {
		step2Elem.classList.add('readonly');
		step3Elem.classList.add('readonly');

		incrementCounter();
		controlBtns();
		return false;
	}

	const options = googleTranslater.querySelectorAll('select option');
	const btn = document.getElementById(btnId);

	incrementCounter();

	// get requested language
	options.forEach((option) => {
		var event = new Event('change');

		if (option.innerHTML == lang) {
			option.selected = true;
			option.parentElement.dispatchEvent(event);

			setTimeout(function() {
				jsonOutput(option.value, jsonObjectInputElem.children[0].innerText);
				btn.classList.add('btn-done');
			}, 750);
		}
	});
}

// update JSON output
function jsonOutput(attr, rawOutput) {
	let attrVal = attr;
	let output = rawOutput.replace(/"/g, '\\"');
	const outputVal = output;
	var event = new Event('change');

	// convert attr to format
	attrVal == 'ga' ? (attrVal = 'it') : null;
	attrVal == 'zh-TW' ? (attrVal = 'ch') : null;

	if (attrVal == 'ch') {
		jsonOutputElem.value += `    "${attrVal}": "${outputVal}"\n}`;
	} else {
		jsonOutputElem.value += `    "${attrVal}": "${outputVal}", \n`;
	}

	jsonOutputElem.dispatchEvent(event);
}

// copy JSON content
function copyJson() {
	jsonOutputElem.select();
	document.execCommand('copy');
}

// run all languages
function controlBtns() {
	if (btnCounter == 6) {
		resetBtn.classList.add('activated');

		return false;
	}
	const btnList = [ 'langEn', 'langIt', 'langDe', 'langFr', 'langEs', 'langCh' ];
	let btn = document.getElementById(`${btnList[btnCounter]}`);

	btn.click();
}

// language btn counter
function incrementCounter() {
	btnCounter++;
}

function reset() {
	console.log('reset');

	// counter
	btnCounter = -1;

	// step / readonly classes
	step1Elem.classList.remove('readonly');

	// input values
	jsonObjectName.value = '';
	jsonObjectInput.value = '';
	jsonOutputElem.value = '';

	// activated classes
	const resetBtn = document.getElementById('reset');
	resetBtn.classList.remove('activated');

	const completeStep1Btn = document.getElementById('completeStep1');
	completeStep1Btn.classList.remove('activated');

	const translateBtn = document.getElementById('langAll');
	translateBtn.classList.remove('activated');

	const langAllBtn = document.getElementById('langAll');
	langAllBtn.classList.remove('activated');

	const statusBtnsContainerElem = document.querySelector('.status-btns');
	const statusBtns = statusBtnsContainerElem.querySelectorAll('.btn');

	statusBtns.forEach((btn) => {
		btn.classList.remove('btn-done');
	});
}
