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

	value == '' ? btn.classList.remove('activated') : btn.classList.add('activated');
	jsonOutputElem.innerHTML = `"${name}" : {\n`;
}

// complete step
function completeStep1() {
	step1Elem.classList.add('readonly');
	step2Elem.classList.remove('readonly');
	step3Elem.classList.remove('readonly');
}

// prepare textarea text to be translatable
function prepareInputText() {
	const langBtns = document.querySelectorAll('.langBtn');

	if (jsonObjectInput.value !== '') {
		langBtns.forEach((btn) => {
			btn.classList.add('activated');
		});
	} else {
		langBtns.forEach((btn) => {
			btn.classList.remove('activated');
		});
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
function jsonOutput(attr, output) {
	let attrVal = attr;
	let outputVal = output;
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

	// step classes

	step1Elem.classList.remove('readonly');

	// hidden classes
	//readonly classe
	//input values
	jsonObjectName.value = '';
	jsonObjectInput.value = '';
	jsonOutputElem.value = '';

	//activated classes
	const resetBtn = document.getElementById('reset');
	resetBtn.classList.remove('activated');

	const completeStep1Btn = document.getElementById('completeStep1');
	completeStep1Btn.classList.remove('activated');

	const translateBtn = document.getElementById('langAll');
	translateBtn.classList.remove('activated');

	const langBtns = document.querySelectorAll('.langBtn');

	langBtns.forEach((btn) => {
		btn.classList.remove('btn-status');
	});
}
